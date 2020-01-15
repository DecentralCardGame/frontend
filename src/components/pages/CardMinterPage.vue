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
    },
    addFile(e, index) {
    
      let file = e.dataTransfer.files[0]
      let cardImageUrl = URL.createObjectURL(file)

      console.log('file: ', file)
      this.cardImgs.splice(index, 1, cardImageUrl)

      console.log(this.cardImgs)
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
          
          console.log(that.cards)
        }
        reader.readAsText(file)
      } else {
        console.log('no json')
        console.log(file)
      }
      
    }
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
