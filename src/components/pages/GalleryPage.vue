<template>
  <div>
    <GalleryModal
      v-if="isGalleryModalVisible"
      @close="closeGalleryModal"
      @download="downloadPng"
      @edit="edit"
      @voteOP="vote('overpowered')"
      @voteUP="vote('underpowered')"
      @voteFair="vote('fair_enough')"
      @voteInappropriate="vote('inappropriate')"
    />
    <div>
        <button @click="filters.visible = !filters.visible">Filters</button>
      </div>
      <div v-show="filters.visible">
        <select v-model="filters.status">
          <option disabled value="">select status</option>
          <option>prototype</option>
          <option>trial</option>
          <option>permanent</option>
          <option></option>
        </select>  
        <br>
        <input v-model="filters.nameContains" placeholder="card name contains">  
        <br>
        <input v-model="filters.owner" placeholder="card owner is">
        <br>
        <button v-show="filters.visible" @click="loadCardList">Apply</button>
      </div>
    <div class="gallery-view">
      <div
        v-for="(card, index) in cards"
        :key="index"
        width="75%"
        @click="showGalleryModal(); clickedIndex = index;"
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
import state from '../cardState'
import GalleryModal from '../GalleryModal.vue'
import CardComponent from '@/components/CardComponent'
import { parseCard, getCard, getCardList, voteCardTx } from '../cardChain.js'
import { sampleImg, saveCardAsPng } from '../utils.js'

const cardsPerPage = 20

export default {
  name: 'GalleryPage',
  components: {CardComponent, GalleryModal},
  data () {
    return {
      clickedIndex: Number,
      isGalleryModalVisible: false,
      pageId: 0,
      currentId: 0,
      cardList: [],
      cards: [],
      browsingForward: true,
      browsingBackward: true,
      filters: {
        visible: false,
        nameContains: "",
        status: "",
        owner: ""
      }
    }
  },
  mounted () {
    this.loadCardList()
  },
  methods: {
    loadCardList() {
      return getCardList(this.$http, this.filters.owner, this.filters.status, this.filters.nameContains)
        .then(res => {
          this.cardList = res.cardList
          this.pageId = 0
          this.currentId = 0
          this.cards = []
        })
        .then(() => {
          this.fillPage()
        })
    },
    getSampleImg () {
      return sampleImg
    },
    getNextCard () {
      if (this.pageId + this.currentId >= this.cardList.length) return

      let cardId = this.cardList[this.cardList.length - 1 - this.pageId - this.currentId]
      getCard(this.$http, cardId)
        .then(res => {
          let card = res.card
          card.id = cardId
          if (card.Content) {
            this.cards.push(parseCard(card))

            console.log(this.cards)
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
    },
    showGalleryModal () {
      this.isGalleryModalVisible = true
    },
    closeGalleryModal () {
      this.isGalleryModalVisible = false
    },
    edit () {
      state.card = this.cards[this.clickedIndex]
      
      this.$router.push('newCard')
    },
    downloadPng () {
      saveCardAsPng(document.getElementById('card' + this.clickedIndex), this.cards[this.clickedIndex].name)
    },
    vote (type) {
      voteCardTx(this.$http, this.cards[this.clickedIndex].id, type)
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
