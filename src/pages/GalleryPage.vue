<template>
  <div class="gallery">
    <h2 class="header__h2">Gallery</h2>
    <p class="header__p">In the gallery, you can view cards that were created by the community.</p>
    <br>
      <div class="button-container button-container--top">
        <button v-show="browsingBackward" @click="prevPage">back</button>
        <button @click="filters.visible = !filters.visible">
          {{ filters.visible ? 'hide' : 'show' }}
          filters
        </button>
        <button v-show="browsingForward" @click="nextPage">next</button>
      </div>
      <div v-show="filters.visible" class="gallery__filter-box">
        <div>
          <select v-model="filters.status">
            <option disabled value="">select status</option>
            <option>Prototype</option>
            <option>Trial</option>
            <option>Permanent</option>
          </select>
          <br>
          <select v-model="filters.type">
            <option disabled value="">select type</option>
            <option>HQ</option>
            <option>Entity</option>
            <option>Action</option>
            <option>Place</option>
          </select>
          <br>
          <select v-model="filters.sortBy">
            <option disabled value="">sort by</option>
            <option>Name</option>
            <option>Casting Cost</option>
            <option>Id</option>
          </select>
        </div>
        <div>
          <input v-model="filters.nameContains" placeholder="card name contains">
          <br>
          <input v-model="filters.notesContains" placeholder="card notes contains">
          <br>
          <input v-model="filters.owner" v-on:click="filters.owner=getOwnAddress()" placeholder="card owner is">
          <br>
          <input  @input="filters.cardsPerPage = $event.target.value" placeholder="cards per page">
          <br>
          <button @click="loadCardList">Apply</button>
          <br>
          <button @click="resetFilters">Clear Filters</button>
        </div>
      </div>
    <div class="gallery__view">
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
            class="gallery__view__card"
            width="100%"
          />
        </div>
      </div>
    </div>
    <div class="button-container button-container--bottom">
      <button v-show="browsingBackward" @click="prevPage">back</button>
      <button v-show="browsingForward" @click="nextPage">next</button>
    </div>
    <div class="ability-modal-container">
      <GalleryModal
        v-if="isGalleryModalVisible"
        v-bind:canVote="canVote"
        v-bind:isOwner="isOwner"
        @close="closeGalleryModal"
        @download="downloadPng"
        @edit="edit"
        @voteOP="vote('overpowered')"
        @voteUP="vote('underpowered')"
        @voteFair="vote('fair_enough')"
        @voteInappropriate="vote('inappropriate')"
      />
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import GalleryModal from '../components/modals/GalleryModal.vue'
import CardComponent from '@/components/CardComponent'
import { saveCardAsPng, creditsFromCoins } from '../components/utils/utils.js'

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
        notesContains: "",
        status: "",
        sortBy: "",
        type: "",
        owner: "",
        cardsPerPage: 20
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
      this.$cardChain.getVotableCards(this.$store.getters.getUserAddress)
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
      return this.$cardChain.getCardList(this.filters.owner, this.filters.status, this.filters.nameContains)
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
      this.currentId++
      return this.$cardChain.getCard(cardId)
        .then(res => {
          let card = res.card
          card.id = cardId
          if (card.Content) {
            let candidate = this.$cardChain.parseCard(card)
            if (this.applyFilters(candidate))
              this.cards.push(candidate)
          } else if (!card.Owner) {
            console.error('card without content and owner: ', res)
          } else {
            console.error('card without content: ', res)
          }
        })
        .catch(res => {
          console.error(res)
        })
    },
    applyFilters (card) {
      if (this.filters.notesContains && !card.Notes.includes(this.filters.notesContains)) return false 
      if (this.filters.type === 'HQ' && card.type !== 'Headquarter') return false
      if (this.filters.type === 'Entity' && card.type !== 'Entity') return false
      if (this.filters.type === 'Action' && card.type !== 'Action') return false
      if (this.filters.type === 'Place' && card.type !== 'Place') return false
      return true
    },
    fillPage () {
      if (this.pageId + this.filters.cardsPerPage >= this.cardList.length) this.browsingForward = false
      else this.browsingForward = true
      if (this.pageId <= 0) this.browsingBackward = false
      else this.browsingBackward = true

      Promise.all(R.times(this.getNextCard, this.filters.cardsPerPage))
        .then(() => {
          if (this.filters.sortBy === 'Name') {
            this.cards.sort((x,y) => x.CardName.toUpperCase() > y.CardName.toUpperCase() ? 1 : -1)
          } else if (this.filters.sortBy === 'Casting Cost') {
            console.log('cards before sort', this.cards)
            this.cards.sort((x,y) => (x.CastingCost? x.CastingCost+x.nerflevel : 0) - (y.CastingCost? y.CastingCost+ y.nerflevel : 0))
            console.log('cards after sort', this.cards)
          } else if (this.filters.sortBy === 'Id') {
            this.cards.sort((x,y) => x.id - y.id)
          }
        })
      console.log('all cards:', this.cards)
    },
    nextPage () {
      this.pageId += this.filters.cardsPerPage
      this.currentId = 0
      this.cards = []
      this.fillPage()
      window.scrollTo(0,0);
    },
    prevPage () {
      this.pageId -= this.filters.cardsPerPage
      this.currentId = 0
      this.cards = []
      this.fillPage()
      window.scrollTo(0,0);
    },
    showGalleryModal () {
      this.isGalleryModalVisible = true
      this.canVote = R.any(x => x == this.cards[this.clickedIndex].id, R.pluck('CardId', this.votableCards))
      this.isOwner = this.cards[this.clickedIndex].Owner === this.$store.getters.getUserAddress
    },
    closeGalleryModal () {
      this.isGalleryModalVisible = false
    },
    edit () {
      this.$store.commit('setCardCreatorEditCard', this.cards[this.clickedIndex])
      this.$router.push('newCard')
    },
    downloadPng () {
      saveCardAsPng(document.getElementById('card' + this.clickedIndex), this.cards[this.clickedIndex].name)
    },
    vote (type) {
      this.$cardChain.voteCardTx(this.cards[this.clickedIndex].id, type)
      .then(acc => {
        this.creditsAvailable = creditsFromCoins(acc.coins)
        this.$store.commit('setUserCredits', this.creditsAvailable) 
      })
    },
    getOwnAddress () {
      return this.$store.getters.getUserAddress
    },
    resetFilters () {
      this.filters = {
        visible: false,
        nameContains: "",
        status: "",
        sortBy: "",
        owner: "",
        cardsPerPage: 20
      }
      this.loadCardList()
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/variables";

.gallery__view {
  margin: 1rem 0;
  text-shadow: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: auto;
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
}

.gallery__view__card:hover {
  cursor: pointer;
}

.gallery__filter-box {
  margin-top: 1rem;
  margin-bottom: 2rem;
  border: $border-thickness solid $white;
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
}

.ability-modal-container {
  position: relative;
  z-index: 3;
}

.button-container--top {
  margin-bottom: 2rem;
}

.button-container--bottom {
  margin-top: 2rem;
}
</style>
