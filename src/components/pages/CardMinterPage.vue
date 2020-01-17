<template>
  <div v-cloak @drop.prevent="dropIt" @dragover.prevent>
    <button
      type="button" class="btn" @click="bundleSVGs()"> Download Print Sheet 
    </button>
  
    <div class="gallery-view">
      <div v-for="(card, index) in cards" v-cloak @drop.prevent="addFile($event, index)" @dragover.prevent>
        <CardComponent v-bind:model="card" v-bind:imageURL="cardImgs[index]" v-bind:id="'card'+index" ></CardComponent>
      </div>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver'
import ContentContainerComponent from '@/components/ContentContainerComponent'
import CardComponent from '@/components/CardComponent'
import { cardJson, sampleImg } from '../utils.js'
//import * as imgs from '../../assets/cardImg/base64img.js'


export default {
  name: 'CardMinter',
  components: {CardComponent, ContentContainerComponent},
  data () {
    return {
      cards: [cardJson[0]], //cardJson,
      cardImgs: [
        sampleImg
      ]
    }
  },
  mounted () {
    
  },
  methods: {
    bundleSVGs () {

      let that = this

      htmlToImage.toCanvas(document.getElementById('card0'))
      .then(function (canvas) {
        canvas.width = 1530;
        canvas.height = 2400;
        let ctx = canvas.getContext('2d')

        let cardids = R.map(x => 'card'+x, R.range(0,Math.min(9, that.cards.length)))
        let canvases = []
        
        cardids.forEach(function(id) {
          canvases.push(htmlToImage.toCanvas(document.getElementById(id)))
        })

        Promise.all(canvases).then(function(canvasen) {
          canvasen.forEach(function(canvasae, index) {
            ctx.drawImage(canvasae, 510*(index%3), 800*Math.floor(index/3))

            /*
            console.log(that.cardImgs[index])
            if(that.cardImgs[index]) {
              var image = new Image()
              image.onload = function() {
                ctx.drawImage(image, 310*(index%3), 500*Math.floor(index/3))
              }
              image.src = that.cardImgs[index]
            }
            */
          })
        }).then(x => {
          download(canvas, 'cards.png');
        })
      });

      /*
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
    addFile(e, index) {
      let that = this
      let file = e.dataTransfer.files[0]

      if(file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
        const reader = new FileReader()
        reader.onloadend = function() {
          that.cardImgs.splice(index, 1, reader.result)
        }
        reader.onerror = error => console.error(error)
        reader.readAsDataURL(file)
      }
    },
    dropIt(drop) {
      
      let file = drop.dataTransfer.files[0]

      let that = this

      if(file.type === 'application/json') {
        console.log('json!')
        var reader = new FileReader()
        reader.onloadend = function(data) {
          let newCards = JSON.parse(this.result)

          that.cards = []
          that.cardImgs = Array(newCards.length).fill(sampleImg)
          that.cardImgs.push({})     

          newCards.forEach(function(card) {
            that.cards.push(card)
          })
        }
        reader.readAsText(file)
      } else {
        console.log('no json: ', file)
      }
      
    }
  }
}

function download(canvas, filename) {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement('a'), e;

  /// the key here is to set the download attribute of the a tag
  lnk.download = filename;

  /// convert canvas content to data-uri for link. When download
  /// attribute is set the content pointed to by link will be
  /// pushed as "download" in HTML5 capable browsers
  lnk.href = canvas.toDataURL("image/png;base64");

  /// create a "fake" click-event to trigger the download
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
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
