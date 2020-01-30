<template>
  <div v-cloak @drop.prevent="dropIt" @dragover.prevent>
    What the hell is this? <br>
    Well, you can drop cards in json format here to display them and drop jpgs or pngs on the cards to give them images. If you are happy with the cards you can download by clicking on them or create a print sheet of 9 cards by clicking
    <button
      type="button" class="btn" @click="bundleSVGs()">Download Print Sheet
    </button>
    <div class="gallery-view">
      <div v-for="(card, index) in cards" v-cloak @drop.prevent="addImage($event, index)" @dragover.prevent v-on:click="saveSingleCard(index)" v-bind:key="index">
        <CardComponent v-bind:model="card" v-bind:imageURL="cardImgs[index]" v-bind:id="'card'+index"></CardComponent>
      </div>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import htmlToImage from 'html-to-image'
import ContentContainerComponent from '@/components/ContentContainerComponent'
import CardComponent from '@/components/CardComponent'
import { sampleCard, sampleImg } from '../utils.js'

export default {
  name: 'CardMinter',
  components: {CardComponent, ContentContainerComponent},
  data () {
    return {
      cards: [sampleCard],
      cardImgs: [sampleImg]
    }
  },
  mounted () {
  },
  methods: {
    bundleSVGs () {
      let that = this

      htmlToImage.toCanvas(document.getElementById('card0'))
        .then(function (canvas) {
          canvas.width = 1530
          canvas.height = 2400
          let ctx = canvas.getContext('2d')

          let cardids = R.map(x => 'card' + x, R.range(0, Math.min(9, that.cards.length)))
          let canvases = []

          cardids.forEach(function (id) {
            canvases.push(htmlToImage.toCanvas(document.getElementById(id)))
          })

          Promise.all(canvases).then(function (canvasen) {
            canvasen.forEach(function (canvasae, index) {
              ctx.drawImage(canvasae, 510 * (index % 3), 800 * Math.floor(index / 3))
            })
          }).then(x => {
            download(canvas, 'cards.png')
          })
        })

      /* old svg code
      let svgMain = document.createElement("svg");
      // svgMain.setAttribute('viewbox', '0 0 210 600')
      // svgMain.setAttribute('width', 210)
      // svgMain.setAttribute('height', 297)

      for (let i = 0; i < Math.min(this.cards.length, 9); i++) {

        let svg = document.getElementById('card'+i)

        // svg.setAttribute('width', '154')
        // svg.setAttribute('transform','translate(' + 520*(i%3) + ',' + (850*Math.floor(i/3)-850) + ')');  // works for plain svg
        // svg.setAttribute('transform','translate(' + 154 + ',' + 250 + ')');

        svgMain.appendChild(svg)
      }

      // var blob = new Blob([document.getElementById('card0').outerHTML], {type: 'text/plain;charset=utf-8'})
      var blob = new Blob([svgMain.outerHTML], {type: 'text/plain;charset=utf-8'})
      saveAs(blob, 'card.svg')
      */
    },
    saveSingleCard (index) {
      let that = this

      htmlToImage.toCanvas(document.getElementById('card' + index))
        .then(function (canvas) {
          let ctx = canvas.getContext('2d')
          ctx.drawImage(canvas, 0, 0)
          download(canvas, that.cards[index].name + '.png')
        })
    },
    addImage (e, index) {
      let that = this
      let file = e.dataTransfer.files[0]

      if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
        uploadImg(file, function (result) {
          that.cardImgs.splice(index, 1, result)
        })
      }
    },
    dropIt (drop) {
      let json = null
      let images = []

      // sort images and json
      R.forEach(function (file) {
        if (file.type === 'application/json') {
          json = file
        } else if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
          images.push(file)
        }
      }, drop.dataTransfer.files)

      if (json === null) {
        console.log('no json')
        return
      }

      let that = this

      // read json
      var reader = new FileReader()
      reader.onloadend = function () {
        let newCards = JSON.parse(this.result)

        that.cards = []
        that.cardImgs = Array(newCards.length).fill(sampleImg)
        // that.cardImgs.push({})

        newCards.forEach(function (card) {
          that.cards.push(card)
        })
      }
      reader.readAsText(json)

      // read images
      R.forEachObjIndexed(function (image, index) {
        uploadImg(image, function (result) {
          that.cardImgs.splice(index, 1, result)
        })
      }, images)
    }
  }
}

function uploadImg (file, saveCallback) {
  const reader = new FileReader()

  reader.onload = function (readerEvent) {
    var image = new Image()
    image.onload = function (imageEvent) {
      // Resize the image
      let canvas = document.createElement('canvas')
      let maxSize = 100
      let width = image.width
      let height = image.height
      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width
          width = maxSize
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height
          height = maxSize
        }
      }
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(image, 0, 0, width, height)
      let dataUrl = canvas.toDataURL('image/jpeg')
      saveCallback(dataUrl)
    }
    image.src = readerEvent.target.result
  }
  reader.onerror = error => console.error(error)
  reader.readAsDataURL(file)
}

function download (canvas, filename) {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement('a')
  var e

  /// the key here is to set the download attribute of the a tag
  lnk.download = filename

  /// convert canvas content to data-uri for link. When download
  /// attribute is set the content pointed to by link will be
  /// pushed as "download" in HTML5 capable browsers
  lnk.href = canvas.toDataURL('image/png;base64')

  /// create a "fake" click-event to trigger the download
  if (document.createEvent) {
    e = document.createEvent('MouseEvents')
    e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)

    lnk.dispatchEvent(e)
  } else if (lnk.fireEvent) {
    lnk.fireEvent('onclick')
  }
}
</script>

<style scoped>
.gallery-view {
  text-shadow: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
}
</style>
