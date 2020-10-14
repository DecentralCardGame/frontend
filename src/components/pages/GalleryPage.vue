<template>
  <div>
    <h2 class="header--h2">Gallery</h2>
    <p class="header--p">In the gallery, you can view cards that were created by the community.</p>
    <br>
      <div class="button-container">
        <button v-show="browsingBackward" @click="prevPage">back</button>
        <button @click="filters.visible = !filters.visible">
          {{ filters.visible ? 'hide' : 'show' }}
          filters
        </button>
        <button v-show="browsingForward" @click="nextPage">next</button>
      </div>
      <div v-show="filters.visible" class="filter-box">
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
        <input v-model="filters.owner" v-on:click="filters.owner=getOwnAddress()" placeholder="card owner is">
        <br>
        <button v-show="filters.visible" @click="loadCardList">Apply</button>
      </div>
    <div class="gallery-view">
      <div
        v-for="(card, index) in cards"
        :key="index"
        @click="clickedIndex = index; showGalleryModal();"
      >
        <div
          @click="showGalleryModal(); clickedIndex = index;"
          width="20%"
        >
        <CardComponent
          :id="'card'+index"
          :model="card"
          :image-u-r-l="card.image"
          class="card"
          width="100%"
        />
        </div>
      </div>
    </div>
    <div class="button-container">
      <button v-show="browsingBackward" @click="prevPage">back</button>
      <button v-show="browsingForward" @click="nextPage">next</button>
    </div>
    <div class="ability-modal-container">
      <GalleryModal
          v-if="isGalleryModalVisible"
          @close="closeGalleryModal"
          @download="downloadPng"
          @edit="edit"
          @voteOP="vote('overpowered')"
          @voteUP="vote('underpowered')"
          @voteFair="vote('fair_enough')"
          @voteInappropriate="vote('inappropriate')"
          v-bind:canVote="canVote"
          v-bind:isOwner="isOwner"
      />
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import state from '../cardState'
import GalleryModal from '../GalleryModal.vue'
import CardComponent from '@/components/CardComponent'
import { parseCard, getCard, getCardList, voteCardTx, getVotableCards } from '../cardChain.js'
import { saveCardAsPng } from '../utils.js'

const cardsPerPage = 20

export default {
  name: 'GalleryPage',
  components: {CardComponent, GalleryModal},
  data () {
    return {
      clickedIndex: 0,
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
      },
      votableCards: [],
      canVote: false,
      isOwner: false
    }
  },
  mounted () {
    this.loadCardList()
    this.loadVotableCards()
  },
  methods: {
    loadVotableCards() {
      getVotableCards(this.$http, localStorage.address)
        .then(res => {
          console.log('getVotableCards:', res)
          if (res.noVoteRights) {
            this.votableCards = []
          } else {
            this.votableCards = res.votables
          }
        })
    },
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
    getNextCard () {
      if (this.pageId + this.currentId >= this.cardList.length) return

      let cardId = this.cardList[this.cardList.length - 1 - this.pageId - this.currentId]
      getCard(this.$http, cardId)
        .then(res => {
          let card = res.card
          card.id = cardId
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
      console.log('all cards:', this.cards)
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
      this.canVote = R.any(x => x == this.cards[this.clickedIndex].id, R.pluck('CardId', this.votableCards))
      this.isOwner = this.cards[this.clickedIndex].Owner === localStorage.address
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
    },
    getOwnAddress () {
      return localStorage.address
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/variables";

.gallery-view {
  margin: 1rem 0;
  text-shadow: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
}

.card:hover {
  cursor: pointer;
}

.filter-box {
  margin-top: 1rem;
  border: $border-thickness solid $white;
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
}

.ability-modal-container {
  position: relative;
  z-index: 3;
}
</style>
