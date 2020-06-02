<template>
  <div>
    <div class="gallery-view">
      <div
        v-for="(card, index) in cards"
        :key="index"
        width="75%"
      >
        <CardComponent
          :id="'card'+index"
          :model="card"
          :image-u-r-l="card.image"
          width="75%"
        />
      </div>
      <div>
        <button v-show="browsingBackward" @click="prevPage">back</button>
        <button v-show="browsingForward" @click="nextPage">next</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import CardComponent from '@/components/CardComponent'
import { parseCard, getCard, getCardList } from '../cardChain.js'
import { sampleImg } from '../utils.js'

const cardsPerPage = 2

export default {
  name: 'GalleryPage',
  components: {CardComponent},
  data () {
    return {
      pageId: 0,
      currentId: 0,
      cardList: [],
      cards: [],
      cardImgs: [],
      sampleImage: sampleImg,
      browsingForward: true,
      browsingBackward: true,
    }
  },
  mounted () {
    this.getPrototypeCardList()
      .then(() => {
        this.fillPage()
      })
  },
  methods: {
    getSampleImg () {
      return sampleImg
    },
    getPrototypeCardList () {
      return getCardList(this.$http, 'prototype')
        .then(res => {
          this.cardList = res.cardList
          console.log(this.cardList)
        })
    },
    getNextCard () {
      if (this.pageId + this.currentId >= this.cardList.length) return

      getCard(this.$http, this.cardList[this.pageId + this.currentId])
        .then(res => {
          let card = res.card
          if (card.Content) {
            this.cards.push(parseCard(card))
          } else if (!card.Owner) {
            console.error('card without content and owner: ', res)
          } else {
            console.error('card without content: ', res)
          }
        })
        .catch(res => {
          console.error(res)
        })

      this.currentId++
    },
    fillPage () {
      if (this.pageId + cardsPerPage >= this.cardList.length) this.browsingForward = false
      else this.browsingForward = true
      if (this.pageId <= 0) this.browsingBackward = false
      else this.browsingBackward = true

      Promise.all(R.times(this.getNextCard, cardsPerPage))
    },
    nextPage () {
      this.pageId += cardsPerPage
      this.currentId = 0
      this.cards = []
      this.fillPage()
    },
    prevPage () {
      this.pageId -= cardsPerPage
      this.currentId = 0
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
