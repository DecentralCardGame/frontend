<template>
  <div>
    <div v-if="$route.params.id==null"
      v-cloak
      @drop.prevent="dropIt"
      @dragover.prevent
    >
      What the hell is this? <br>
      Well, you can drop cards in json format here to display them and drop jpgs or pngs on the cards to give them images. If you are happy with the cards you can download by clicking on them or create a print sheet of 9 cards by clicking. Optimal resolution is 780 x 500 pixel.
      <button
        type="button"
        class="btn"
        @click="bundleSVGs()"
      >
        Download Print Sheet
      </button>
      <div class="gallery__view">
        <div
          v-for="(card, index) in cards"
          v-cloak
          :key="index"
          @drop.prevent="addImage($event, index)"
          @dragover.prevent
          @click="saveSingleCard(index)"
        >
          <CardComponent
            :id="'card'+index"
            :model="card"
            :image-u-r-l="cardImgs[index]"
          />
        </div>
      </div>
    </div>

    <div v-else>
      <CardComponent
        :id="'card'"
        :model="cards[0]"
        :image-u-r-l="cards[0].image"
      />
    </div>

  </div>

</template>

<script>
import * as R from 'ramda'
import { saveAs } from 'file-saver'
import * as svg1 from 'save-svg-as-png'
import CardComponent from '@/components/CardComponent'
import { uploadImg } from '../components/utils/utils.js'
import { sampleCard, sampleGradientImg } from '../components/utils/sampleCards.js'

export default {
  name: 'CardMinter',
  components: {CardComponent},
  data () {
    return {
      cards: [sampleCard],
      cardImgs: [sampleGradientImg]
    }
  },
  mounted () {
    let id = parseInt(this.$route.params.id)
    if (typeof id === 'number' && !isNaN(id))  {
      this.getCard(this.$http, this.$route.params.id)
        .then(res => {
          let parsedCard = this.parseCard(res.card)
          console.log('currentCard', res)
          if (parsedCard) {
            this.cards = []
            this.cards.push(parsedCard)

            let clickedCard = document.getElementById('card')
            svg1.svgAsPngUri(clickedCard, {scale: 5})
              .then(res => {
                console.log(res)
              })
          }
        })
    }
  },
  methods: {
    bundleSVGs () {
      let svgMain = document.createElement('svg')
      // svgMain.setAttribute('viewbox', '0 0 210 600')
      // svgMain.setAttribute('width', 210)
      // svgMain.setAttribute('height', 297)

      for (let i = 0; i < Math.min(this.cards.length, 9); i++) {
        let svg = document.getElementById('card' + i)
        svg.setAttribute('width', '29%')

        // svg.setAttribute('width', '154')
        // svg.setAttribute('transform','translate(' + 520*(i%3) + ',' + (850*Math.floor(i/3)-850) + ')')  // works for plain svg
        // svg.setAttribute('transform','translate(' + 154 + ',' + 250 + ')')

        svgMain.appendChild(svg)
      }

      // var blob = new Blob([document.getElementById('card0').outerHTML], {type: 'text/plain;charset=utf-8'})
      var blob = new Blob([svgMain.outerHTML], {type: 'text/plain;charset=utf-8'})
      saveAs(blob, 'cardes.svg')
    },
    saveSingleCard (index) {
      let clickedCard = document.getElementById('card' + index)
      svg1.saveSvgAsPng(clickedCard, this.cards[index].name + '.png', {scale: 5})
    },
    addImage (e, index) {
      let that = this
      let file = e.dataTransfer.files[0]

      if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
        uploadImg(file, (result) => {
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

        this.cards = []
        this.cardImgs = Array(newCards.length).fill(sampleGradientImg)

        newCards.forEach(card => {
          that.cards.push(card)
        })
      }
      reader.readAsText(json)

      // read images
      R.forEachObjIndexed( (image, index) => {
        uploadImg(image, (result) => {
          this.cardImgs.splice(index, 1, result)
        })
      }, images)
    }
  }
}
</script>

<style scoped>
.gallery__view {
  text-shadow: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
}
</style>
