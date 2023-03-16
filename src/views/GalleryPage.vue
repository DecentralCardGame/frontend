<template>
  <div class="gallery">
    <h2 class="header__h2">
      Gallery
    </h2>
    <p class="header__p">
      In the gallery, you can view cards that were created by the community.
    </p>
    <br>
    <div
      v-show="galleryFilters.visible"
      class="gallery__filter-box ccbutton"
    >
      <div class="gallery__filter__item">
        <select v-model="galleryFilters.status">
          <option value="">
            any card status
          </option>
          <option>Prototype</option>
          <option>Trial</option>
          <option>Permanent</option>
          <option>Playable</option>
          <option>Unplayable</option>
        </select>
      </div>
      <div class="gallery__filter__item">
        <select v-model="galleryFilters.cardType">
          <option value="">
            any card type
          </option>
          <option>Headquarter</option>
          <option>Entity</option>
          <option>Action</option>
          <option>Place</option>
        </select>
      </div>
      <div class="gallery__filter__item">
        <select v-model="galleryFilters.sortBy">
          <option value="">
            default sort
          </option>
          <option>Name (A-Z)</option>
          <option>Name (Z-A)</option>
          <option>Casting Cost (↑)</option>
          <option>Casting Cost (↓)</option>
          <option>Id (↑)</option>
          <option>Id (↓)</option>
        </select>
      </div>
      <div>
        <div class="gallery__filter__item">
          <input
            v-model="galleryFilters.nameContains"
            placeholder="Name contains"
          >
        </div>
      </div>
      <div>
        <div class="gallery__filter__item">
          <input
            v-model="galleryFilters.keywordsContains"
            placeholder="Ability/Effect contains"
          >
        </div>
      </div>
      <div class="gallery__filter__item">
        <input
          v-model="galleryFilters.notesContains"
          placeholder="Notes contain"
        >
      </div>
      <div class="gallery__filter__item">
        <input
          v-model="galleryFilters.owner"
          placeholder="Owner is"
          @click="galleryFilters.owner = getOwnAddress()"
        >
      </div>

      <div class="gallery__filter__item">
        <div class="no--wrap">
          <label class="gallery-checkbox__label">
            <input
              v-model="galleryFilters.classesVisible"
              class="gallery-checkbox"
              type="checkbox"
              @input="galleryFilters.classesVisible = !galleryFilters.classesVisible "
            >
            Filter Classes
            <br>
          </label>
        </div>

        <span
          v-if="galleryFilters.classesVisible"
          class="clickable-option"
          @click="galleryFilters.classORLogic = !galleryFilters.classORLogic"
        >
          <br><br>
          {{ galleryFilters.classORLogic? "Any: " : "All: " }}
        </span>
        <span
          v-if="galleryFilters.classesVisible"
          :class="{ 'clickable-option': true, 'negated': !galleryFilters.mysticism }"
          @click="galleryFilters.mysticism = !galleryFilters.mysticism"
        >
          Mysticism
        </span>
        <span
          v-if="galleryFilters.classesVisible"
          :class="{ 'clickable-option': true, 'negated': !galleryFilters.technology }"
          @click="galleryFilters.technology = !galleryFilters.technology"
        >
          Technology
        </span>
        <span
          v-if="galleryFilters.classesVisible"
          :class="{ 'clickable-option': true, 'negated': !galleryFilters.nature }"
          @click="galleryFilters.nature = !galleryFilters.nature"
        >
          Nature
        </span>
        <span
          v-if="galleryFilters.classesVisible"
          :class="{ 'clickable-option': true, 'negated': !galleryFilters.culture }"
          @click="galleryFilters.culture = !galleryFilters.culture"
        >
          Culture
        </span>
      </div>

      <div class="gallery__filter__item">
        <input
          placeholder="cards per page"
          @input="galleryFilters.cardsPerPage = $event.target.value"
        >
      </div>
      <div class="gallery__filter__item">
        <button
          @click="resetFilters"
        >
          Clear Filters
        </button>
      </div>
      <div class="gallery__filter__item">
        <button @click="loadCardList">
          Apply
        </button>
      </div>
    </div>
    <div class="button-container button-container--top ccbutton">
      <button
        v-show="browsingBackward"
        @click="prevPage"
      >
        back
      </button>
      <button
        @click="toggleGalleryFilters"
      >
        {{ galleryFilters.visible ? "hide" : "show" }}
        filters
      </button>
      <button
        v-show="loggedIn"
        @click="loadMyCardList()"
      >
        My Cards
      </button>
      <button
        v-show="$route.query.notesContains!='Finished'"
        @click="loadSpecialCardList('Finished')"
      >
        Alpha Set
      </button>
      <button
        v-show="$route.query.notesContains=='Finished'"
        @click="loadSpecialCardList('')"
      >
        All Cards
      </button>
      <button
        v-show="browsingForward"
        @click="nextPage"
      >
        next
      </button>
    </div>
    <div class="gallery__view">
      <div
        v-for="(card, index) in cards"
        :key="index"
        @click="
          clickedIndex = index;
          showGalleryModal();
        "
      >
        <div
          class="cardContainer"
          @click="
            showGalleryModal();
            clickedIndex = index;
          "
        >
          <div class="cardContainer--element">
            <CardComponent
              :id="'card' + index"
              :model="card"
              :image-u-r-l="card.image"
              hover-behavior="none"
              class="gallery__view__card"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="button-container button-container--bottom ccbutton">
      <button
        v-show="browsingBackward"
        @click="prevPage"
      >
        back
      </button>
      <button
        v-show="browsingForward"
        @click="nextPage"
      >
        next
      </button>
    </div>
    <div
      v-if="isGalleryModalVisible"
      class="container-modal"
      @click="closeGalleryModal"
    >
      <div class="ability-modal-container">
        <GalleryModal
          :can-vote="canVote"
          :is-owner="isOwner"
          :keyword-descriptions="keywordDescriptions"
          :model="cards[clickedIndex]"
          :image-u-r-l="cards[clickedIndex].image"
          @close="closeGalleryModal"
          @download="downloadPng"
          @cardview="cardview"
          @edit="edit"
          @voteOP="vote('overpowered')"
          @voteUP="vote('underpowered')"
          @voteFair="vote('fair_enough')"
          @voteInappropriate="vote('inappropriate')"
        />
      </div>
    </div>
  </div>
</template>

<script lang=ts>
import * as R from "ramda";
import GalleryModal from "../components/modals/GalleryModal.vue";
import CardComponent from "@/components/elements/CardComponent.vue";
import { saveCardAsPng, creditsFromCoins } from "../components/utils/utils.js";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useAddress } from "@/def-composables/useAddress";
import { useGalleryFilters } from "@/def-composables/useGalleryFilters";
import { useQuery } from "@/def-composables/useQuery";
import { useCardsRules } from "@/def-composables/useCardRules";
import { useCardCreatorCards } from "@/def-composables/useCardCreatorCards";

const { queryQCards, queryQCard } = useQuery()

export default {
  name: "GalleryPage",
  components: { CardComponent, GalleryModal },
  beforeRouteLeave(to, from, next) {
    if (this.leavePageLock) next(false);
    else next();
  },
  data() {
    return {
      clickedIndex: 0,
      isGalleryModalVisible: false,
      pageId: 0,
      cardList: [],
      cards: [],
      browsingForward: true,
      browsingBackward: true,
      canVote: false,
      isOwner: false,
      leavePageLock: false,
      keywordDescriptions: [],
      votableCards: []
    };
  },
  // this watch together with the following beforeRouteLeave make browsing
  // through the Gallery with mouse back and forward (x1, x2) buttons possible
  watch: {
    '$store.state.lastInputEvent': function () {
      let event = this.$store.state.lastInputEvent

      if (event.which == 5) {
        this.leavePageLock = true // Forward Mouse special button
        this.nextPage()
      } else if (event.which == 4) { // Backward Mouse special button
        this.leavePageLock = true
        this.prevPage()
      } else if (event.which == 13) { // Enter
        this.loadCardList()
      } else {
        this.leavePageLock = false
      }
    },
    loggedIn (_, newLoggedIn) {
      if (newLoggedIn) {
        this.loadVotableCards()
      }
    }
  },
  setup() {
    const { loggedIn } = useLoggedIn()
    const { address } = useAddress()
    const { rules } = useCardsRules()
    const { editCard } = useCardCreatorCards()
    const { galleryFilters, toggleGalleryFilters } = useGalleryFilters

    return { loggedIn, address, galleryFilters, toggleGalleryFilters, cardRules: rules, cardCreatorEditCard: editCard.card }
  },
  mounted() {

    console.log("Yees", this.galleryFilters)

    let query = this.$route.query
    if (!R.isEmpty(query)) {
      if (query.cardList) {
        this.cardList = query.cardList
        this.fillPage()
      } else {
        this.loadQueryCardList(this.normalizeQuery(query))
      }
    } else {
      this.loadCardList()
    }

    this.loadVotableCards()
  },
  methods: {
    loadVotableCards() {
      if(this.loggedIn) {
        this.$cardChain
        .getVotableCards(this.$store.getters['common/wallet/address'])
        .then((res) => {
          if (res.noVoteRights) {
            this.votableCards = [];
          } else {
            this.votableCards = res.votables;
          }
        })
      }
      else {
        this.votableCards = [];
      }

    },
    loadCardList() {
      let query = this.getDefaultQuery()
      this.loadQueryCardList(query)
    },
    getCard(currentId) {
      let cardId = this.cardList[
        this.cardList.length - 1 - this.pageId - currentId
      ];
      return queryQCard(cardId)
        .then((res) => {
          let card = res
          card.id = cardId
          if (card.Content) {
            let candidate = card
            this.cards.push(candidate)
            return candidate
          } else if (!card.owner) {
            console.error("card without content and owner: ", res)
            return res
          } else {
            console.error("card without content: ", res)
            return res
          }
        })
    },
    normalizeQuery(query) {
      return {
        status: query.status ? query.status.toLowerCase() : "playable", // default playable
        owner: query.owner ? query.owner : "",
        cardType: query.cardType ? query.cardType : "",
        classes: query.classes ? query.classes : "",
        sortBy: query.sortBy ? query.sortBy.replace(/\s+/g, "").replace(/\(.*?\)/g, "") : "",
        nameContains: query.nameContains ? query.nameContains : "",
        keywordsContains: query.keywordsContains ? query.keywordsContains : "",
        notesContains: query.notesContains ? query.notesContains :
          query.status || query.owner || query.cardType || query.classes || query.sortBy || query.nameContains || query.keywordsContains || query.notesContains ? "" :
          this.loggedIn ? "" : "Finished" // non-logged in users (noobs), without any filters, will only see the alpha set
      }
    },
    fillPage() {
      if (this.pageId + this.galleryFilters.cardsPerPage >= this.cardList.length)
        this.browsingForward = false;
      else this.browsingForward = true;
      if (this.pageId <= 0) this.browsingBackward = false;
      else this.browsingBackward = true;

      let requestedCards = R.map(n => this.getCard(n),
          R.times(R.identity, R.min(this.galleryFilters.cardsPerPage, this.cardList.length - this.pageId))
        )

      Promise.all(requestedCards)
      .then((res) => {
        // here the asynchronous order of this.cards gets overwritten by the ordered requestedCards,
        // therefore the clickedindex must be adjusted (if something was clicked)
        if (!R.equals(this.cards[this.clickedIndex], res[this.clickedIndex] )) {
          this.clickedIndex = R.findIndex(R.propEq('id', this.cards[this.clickedIndex].id))(res)
        }
        this.cards = res
        console.log("cards on page", this.cards)
        console.log("all card names:", R.pluck("CardName", res))
      })
      .catch(res => {
        console.error("NOT ALL CARDS WERE PROPERLY LOADED")
        console.log("all card names:", R.pluck("CardName", res))
      })
    },
    nextPage() {
      if (!this.browsingForward) return;

      this.pageId += this.galleryFilters.cardsPerPage;
      this.cards = [];
      this.fillPage();
      window.scrollTo(0, 0)
    },
    prevPage() {
      if (!this.browsingBackward) return;

      this.pageId -= this.galleryFilters.cardsPerPage;
      this.cards = [];
      this.fillPage();
      window.scrollTo(0, 0);
    },
    showGalleryModal() {
      this.isGalleryModalVisible = true

      console.log("votablecards", this.votableCards)
      if (!R.isEmpty(this.votableCards)) {
        this.canVote = R.any(
          (x) => x == this.cards[this.clickedIndex].id,
          R.pluck("cardId", this.votableCards.voteRights)
        )
      }

      this.isOwner =
        this.cards[this.clickedIndex].owner === this.address

      this.keywordDescriptions = []
      let firstLetterToLower = string => {
        return string[0].toLowerCase() + string.substring(1)
      }
      this.cards[this.clickedIndex].Keywords.forEach(ability => {
        ability.forEach(keyword => {
          this.keywordDescriptions.push([keyword, this.cardRules.definitions[firstLetterToLower(keyword)].description])
        })
      })
    },
    closeGalleryModal() {
      this.isGalleryModalVisible = false;
    },
    loadMyCardList() {
      this.loadSpecialCardList(this.galleryFilters.notes, this.address)
    },
    getDefaultQuery() {
      let classes =
        (this.galleryFilters.classORLogic ? "OR," : "") +
        (this.galleryFilters.mysticism ? "Mysticism," : "") +
        (this.galleryFilters.nature ? "Nature," : "") +
        (this.galleryFilters.technology ? "Technology," : "") +
        (this.galleryFilters.culture ? "Culture," : "")

      let query = this.galleryFilters
      query.classes = query.classesVisible ? classes : ""
      return this.normalizeQuery(query)
    },
    loadSpecialCardList(notes, owner) {
      var query = this.getDefaultQuery()
      query.notesContains = notes
      if (owner) {
        query.owner = owner
      }
      this.loadQueryCardList(query)
    },
    loadQueryCardList(query) {
      this.$router.push({ path: 'gallery', query: query })

      let requestedCards = [
        queryQCards(
        query.status,
        {
          owner: query.owner,
          cardType: query.cardType,
          classes: query.classes,
          sortBy: query.sortBy,
          nameContains: query.nameContains,
          keywordsContains: query.keywordsContains,
          notesContains: query.notesContains
        }
      )
      ]
      Promise.all(requestedCards)
      .then((res) => {
        let cardList = R.reduce(R.concat, [], R.pluck("cardsList", res))

        if (R.any(x => R.includes(x, this.galleryFilters.sortBy), ["A-Z", "↑"])) {
          this.cardList = R.reverse(cardList)
        }
        else {
          this.cardList = cardList
        }
        this.pageId = 0
        this.cards = []
      })
      .then(() => {
        this.fillPage()
      })
    },
    edit() {
      this.cardCreatorEditCard = this.cards[this.clickedIndex]
      this.$router.push("cardCreator")
    },
    cardview() {
      this.$router.push('cardview/' + this.cards[this.clickedIndex].id)
    },
    downloadPng() {
      saveCardAsPng(
        document.getElementById("card" + this.clickedIndex),
        this.cards[this.clickedIndex].CardName
      );
    },
    vote(type) {
      this.$cardChain
        .voteCardTx(this.cards[this.clickedIndex].id, type)
        .then(_ => {
          this.$cardChain.updateUserCredits()
        })
    },
    getOwnAddress() {
      return this.$store.getters['common/wallet/address'];
    },
    resetFilters() {
      console.log("reset filters");
      this.$store.commit("resetGalleryFilter");

      this.loadCardList();
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/variables";

.gallery__view {
  margin: 1rem 0;
  text-shadow: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: auto;
  grid-column-gap: 4rem;
  grid-row-gap: 1rem;
}

.gallery__filter__item {
  width: 20%;
}

.no--wrap {
  display: inline;
  float: left;
  white-space: nowrap;
}

.clickable-option {
  display: inline;
  white-space: nowrap;
  font-weight: bold;
  cursor: pointer;
}

.negated {
  text-decoration: line-through;
  font-weight: normal;
}

.cardContainer {
  position: relative;
  display: flex;
}

.cardContainer--element {
  position: relative;
  flex-grow: 1;
  max-width: 350px;
}

.button-container--top {
  margin-bottom: 2rem;
}

.button-container--bottom {
  margin-top: 2rem;
}
.container-modal {
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  @media (max-width: 480px) {
    bottom:0;
    overflow-y: scroll;
  }
}
.gallery-checkbox {
  position: absolute;
  display: inline-block;
  margin-left: -25px;
}
.gallery-checkbox__label {
margin-left: 25px;
}
.ability-modal-container {
  margin: auto;
  margin-top: 5vh;
  max-width: 800px;
  max-height: 95vh;
  @media (max-width: 480px) {
    margin-top: 0;
    max-height:300vh;
    height:auto;
  }
  //OLD:
  // position: relative;
   z-index: 3;
}

</style>
