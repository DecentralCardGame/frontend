<template>
  <div>
    <button
      type="button" class="btn" @click="bundleSVGs()"> Download Print Sheet 
    </button>
  
    <div class="gallery-view">
      <div v-for="(card, index) in sampleCards">
        <CardComponent v-bind:model="card" v-bind:imageURL="cardImgs[card.image]" v-bind:id="'card'+index" ></CardComponent>
      </div>
    </div>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import ContentContainerComponent from '@/components/ContentContainerComponent'
import CardComponent from '@/components/CardComponent'
import { cardJson } from '../utils.js'
import * as imgs from '../../assets/cardImg/base64img.js'


export default {
  name: 'CardMinter',
  components: {CardComponent, ContentContainerComponent},
  data () {
    return {
      sampleCards: cardJson,
      cardImgs: imgs
    }
  },
  mounted () {
    console.log(this.sampleCards)
  },
  methods: {
    bundleSVGs () {      
      let svgMain = document.createElement("svg");
      // svgMain.setAttribute('viewbox', '0 0 630 720')
      // svgMain.setAttribute('width', '1570')
      // svgMain.setAttribute('height', '2600')

      for (let i = 0; i < Math.min(this.sampleCards.length, 9); i++) {

        let svg = document.getElementById('card'+i)
        
        svg.setAttribute('width', '300')

        // svg.setAttribute('transform','translate(' + 520*(i%3) + ',' + (850*Math.floor(i/3)-850) + ')');  // works for plain svg

        svg.setAttribute('transform','translate(' + (-65*(i%3)) + ',' + (80*Math.floor(i/3)) + ')');

        svgMain.appendChild(svg)
      }


      // var blob = new Blob([document.getElementById('card0').outerHTML], {type: 'text/plain;charset=utf-8'})
      var blob = new Blob([svgMain.outerHTML], {type: 'text/plain;charset=utf-8'})
      saveAs(blob, 'card.svg')
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
