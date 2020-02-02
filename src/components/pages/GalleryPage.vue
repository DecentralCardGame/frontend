<template>
  <div>
    <div class="gallery-view">
      <div v-for="(card, index) in cards" v-bind:key="index">
        <CardComponent v-bind:model="card" v-bind:imageURL="sampleImage" v-bind:id="'card'+index"></CardComponent>
      </div>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import ContentContainerComponent from '@/components/ContentContainerComponent'
import CardComponent from '@/components/CardComponent'
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
    let that = this

    this.$http.get('cardservice/cards')
      .then(res => {
        // console.log(res)

        let relevantCards = R.filter(item => item.Content, R.map(item => JSON.parse(item), res.data))

        let contentLens = R.lensProp('Content')
        let parseContent = item => R.set(contentLens, JSON.parse(atob(item.Content)), item)
        relevantCards = R.map(parseContent, relevantCards)

        relevantCards.forEach(function (card) {
          let cardType = R.keys(card.Content)
          console.log(cardType[0])
          if (cardType) {
            card = R.merge(card, card.Content[cardType[0]])
            console.log(card)
          }
          console.log(card)

          let parsedCard = {
            'name': card.Name,
            'type': cardType[0],
            'health': card.Health || 0,
            'attack': card.Attack || 0,
            'speed': card.CastSpeed,
            'cost': {
              'lumber': 2,
              'iron': 3,
              'mana': 1,
              'energy': 1,
              'food': 1,
              'generic': 1
            },
            'abilities': [],
            'tag': card.Tag,
            'text': card.Text,
            'image': ''
          }
          that.cards.push(parsedCard)
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
}
</style>
