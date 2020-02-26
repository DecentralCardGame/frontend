<template>
  <div>
    <div class="gallery-view">
      <div v-for="(card, index) in cards" v-bind:key="index">
        <CardComponent v-bind:model="card" v-bind:imageURL="card.image" v-bind:id="'card'+index"></CardComponent>
      </div>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import ContentContainerComponent from '@/components/ContentContainerComponent'
import CardComponent from '@/components/CardComponent'
import { parseCard, getCard } from '../cardChain.js'
import { sampleImg } from '../utils.js'

export default {
  name: 'GalleryPage',
  components: {CardComponent, ContentContainerComponent},
  data () {
    return {
      cards: [],
      cardImgs: [],
      sampleImage: sampleImg
    }
  },
  mounted () {
    

    this.fillPage()
    
    this.$http.get('cardservice/cards')
      .then(res => {
        let relevantCards = R.filter(item => item.Content, R.map(item => JSON.parse(item), res.data))
        relevantCards.forEach(card => {
          this.cards.push(parseCard(card))
        })
      })
  },
  methods: {
    getSampleImg () {
      return sampleImg
    },
    fillPage () {
      const getCardById = R.curry(getCard)(this.$http, R.__)
      let cardes = R.times(getCardById, 5);
      console.log(cardes)
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
