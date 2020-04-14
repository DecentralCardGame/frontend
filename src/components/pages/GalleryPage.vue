<template>
  <div>
    <div class="gallery-view">
      <div v-for="(card, index) in cards" v-bind:key="index" width="75%">
        <CardComponent v-bind:model="card" v-bind:imageURL="card.Image" v-bind:id="'card'+index" width="75%"></CardComponent>
      </div>
      <div>
        <button v-show="currentId > 1" @click="prevPage">back</button>
        <button v-show="!forwardStop" @click="nextPage">next</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import CardComponent from '@/components/CardComponent'
import { parseCard, getCard } from '../cardChain.js'
import { sampleImg } from '../utils.js'

const cardsPerPage = 4

export default {
  name: 'GalleryPage',
  components: {CardComponent},
  data () {
    return {
      cards: [],
      cardImgs: [],
      sampleImage: sampleImg,
      browsingForward: true,
      currentId: 1,
      pageStartId: 1,
      forwardStop: false
    }
  },
  mounted () {
    this.fillPage()
  },
  methods: {
    getSampleImg () {
      return sampleImg
    },
    getNextCard () {
      if (this.currentId === 1 && !this.browsingForward) return

      getCard(this.$http, this.currentId)
        .then(res => {
          let card = res.card
          if (card.Content) {
            this.cards.push(parseCard(card))
            console.log('pushed: ', R.last(this.cards))
          } else if (!card.Owner) {
            console.log('card without content and owner: ', res)
          } else {
            console.log('card without content: ', res)
            this.getNextCard()
          }
        })
        .catch(res => {
          // if (browsingForward) this.forwardStop = true
          console.error(res)
        })

      if (this.browsingForward) {
        this.currentId++
      } else {
        if (this.currentId > 1) {
          this.currentId--
        }
      }
    },
    fillPage () {
      Promise.all(R.times(this.getNextCard, cardsPerPage))
        .catch(() => {
          R.all(x => x)([3, 3, 3, 3])
        })
    },
    nextPage () {
      console.log('pageStartid: ', this.pageStartId, 'currentId:', this.currentId)

      this.browsingForward = true
      this.pageStartId = this.currentId

      this.cards = []
      this.fillPage()
    },
    prevPage () {
      console.log('pageid: ', this.pageStartId, 'currentId:', this.currentId)

      this.browsingForward = false
      this.pageStartId = this.currentId
      this.forwardStop = false

      this.cards = []
      this.fillPage()
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
