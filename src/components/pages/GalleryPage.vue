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
// import * as R from 'ramda'
import ContentContainerComponent from '@/components/ContentContainerComponent'
import CardComponent from '@/components/CardComponent'
import { parseCard } from '../cardChain.js'
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
    this.$http.get('cardservice/cards')
      .then(res => {
        res.data.forEach(card => {
          this.cards.push(parseCard(JSON.parse(card)))
        })
      })
  },
  methods: {
    getSampleImg () {
      return sampleImg
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
