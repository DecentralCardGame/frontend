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
      v-show="$store.getters.getGalleryFilter.visible"
      class="gallery__filter-box"
    >
      <div class="gallery__filter__item">
        <select v-model="$store.getters.getGalleryFilter.status">
          <option value="">
            any card status
          </option>
          <option>Prototype</option>
          <option>Trial</option>
          <option>Permanent</option>
        </select>
      </div>
      <div class="gallery__filter__item">
        <select v-model="$store.getters.getGalleryFilter.cardType">
          <option value="">
            any card type
          </option>
          <option>Headquarter</option>
          <option>Entity</option>
          <option>Action</option>
          <option>Place</option>
        </select>
      </div>
      <div>
        <div class="gallery__filter__item">
          <select v-model="$store.getters.getGalleryFilter.sortBy">
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
      </div>
      <div>
        <div class="gallery__filter__item">
          <input
            v-model="$store.getters.getGalleryFilter.nameContains"
            placeholder="Name contains"
          >
        </div>
      </div>
      <div>
        <div class="gallery__filter__item">
          <input
            v-model="$store.getters.getGalleryFilter.keywordsContains"
            placeholder="Ability/Effect contains"
          >
        </div>
      </div>
      <div class="gallery__filter__item">
        <input
          v-model="$store.getters.getGalleryFilter.notesContains"
          placeholder="Notes contain"
        >
      </div>
      <div class="gallery__filter__item">
        <input
          v-model="$store.getters.getGalleryFilter.owner"
          placeholder="Owner is"
          @click="$store.getters.getGalleryFilter.owner = getOwnAddress()"
        >
      </div>

      <div class="gallery__filter__item">
        <div class="no--wrap">
          <label class="gallery-checkbox__label"> 
            <input
              v-model="$store.getters.getGalleryFilter.classesVisible"
              class="gallery-checkbox"
              type="checkbox"
              @input="$store.getters.getGalleryFilter.classesVisible = !$store.getters.getGalleryFilter.classesVisible "
            > 
            Filter Classes
            <br>
          </label>
        </div>

        <span
          v-if="$store.getters.getGalleryFilter.classesVisible"
          class="clickable-option"
          @click="$store.getters.getGalleryFilter.classORLogic = !$store.getters.getGalleryFilter.classORLogic"
        >
          <br><br>
          {{ $store.getters.getGalleryFilter.classORLogic? "Any: " : "All: " }}
        </span>
        <span
          v-if="$store.getters.getGalleryFilter.classesVisible"
          :class="{ 'clickable-option': true, 'negated': !$store.getters.getGalleryFilter.mysticism }"
          @click="$store.getters.getGalleryFilter.mysticism = !$store.getters.getGalleryFilter.mysticism"
        >
          Mysticism
        </span>
        <span
          v-if="$store.getters.getGalleryFilter.classesVisible"
          :class="{ 'clickable-option': true, 'negated': !$store.getters.getGalleryFilter.technology }"
          @click="$store.getters.getGalleryFilter.technology = !$store.getters.getGalleryFilter.technology"
        >
          Technology
        </span>
        <span
          v-if="$store.getters.getGalleryFilter.classesVisible"
          :class="{ 'clickable-option': true, 'negated': !$store.getters.getGalleryFilter.nature }"
          @click="$store.getters.getGalleryFilter.nature = !$store.getters.getGalleryFilter.nature"
        >
          Nature
        </span>
        <span
          v-if="$store.getters.getGalleryFilter.classesVisible"
          :class="{ 'clickable-option': true, 'negated': !$store.getters.getGalleryFilter.culture }"
          @click="$store.getters.getGalleryFilter.culture = !$store.getters.getGalleryFilter.culture"
        >
          Culture
        </span>
      </div>

      <div class="gallery__filter__item">
        <input
          placeholder="cards per page"
          @input="$store.getters.getGalleryFilter.cardsPerPage = $event.target.value"
        >
      </div>
      <div class="gallery__filter__item">
        <button @click="resetFilters">
          Clear Filters
        </button>
      </div>
      <div class="gallery__filter__item">
        <button @click="loadCardList">
          Apply
        </button>
      </div>
    </div>
    <div class="button-container button-container--top">
      <button
        v-show="browsingBackward"
        @click="prevPage"
      >
        back
      </button>
      <button @click="$store.commit('toggleGalleryFilter')">
        {{ $store.getters.getGalleryFilter.visible ? "hide" : "show" }}
        filters
      </button>
      <button @click="loadSpecialCardList('Finished')">
        Alpha Set
      </button>
      <button @click="loadSpecialCardList('Artwork')">
        Artwork Needed
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
    <div class="button-container button-container--bottom">
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

<script>
import * as R from "ramda";
import GalleryModal from "../components/modals/GalleryModal.vue";
import CardComponent from "@/components/elements/CardComponent";
import { saveCardAsPng, creditsFromCoins } from "../components/utils/utils.js";

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
      votableCards: [],
      canVote: false,
      isOwner: false,
      leavePageLock: false,
      keywordDescriptions: []
    };
  },
  // this watch together with the following beforeRouteLeave make browsing
  // through the Gallery with mouse back and forward (x1, x2) buttons possible
  watch: {
    "$store.state.lastInputEvent": function () {
      let event = this.$store.state.lastInputEvent

      if (event.which == 5) {
        this.leavePageLock = true
        this.nextPage()
      } else if (event.which == 4) {
        this.leavePageLock = true
        this.prevPage()
      } else if (event.which == 13) {
        this.loadCardList()
      } else {
        this.leavePageLock = false
      }
    },
  },
  mounted() {
    let params = this.$route.params.params
    
    if (params == "alphaset") {
      this.loadSpecialCardList("Finished")
    }
    else if (params == "artworkneeded") {
      this.loadSpecialCardList("Artwork")
    }
    else {
      this.loadCardList();
    }

    this.loadVotableCards();
  },
  methods: {
    loadVotableCards() {
      this.$cardChain
        .getVotableCards(this.$store.getters.getUserAddress)
        .then((res) => {
          console.log("getVotableCards:", res);
          if (res.noVoteRights) {
            this.votableCards = [];
          } else {
            this.votableCards = res.votables;
          }
        });
    },
    loadCardList() {
      let classes =
        (this.$store.getters.getGalleryFilter.classORLogic ? "OR," : "") +
        (this.$store.getters.getGalleryFilter.mysticism ? "Mysticism," : "") +
        (this.$store.getters.getGalleryFilter.nature ? "Nature," : "") +
        (this.$store.getters.getGalleryFilter.technology ? "Technology," : "") +
        (this.$store.getters.getGalleryFilter.culture ? "Culture," : "")
      return this.$cardChain
        .getCardList(
          this.$store.getters.getGalleryFilter.owner,
          this.$store.getters.getGalleryFilter.status,
          this.$store.getters.getGalleryFilter.cardType,
          this.$store.getters.getGalleryFilter.classesVisible ? classes : "",
          this.$store.getters.getGalleryFilter.sortBy.replace(/\s+/g, "").replace(/\(.*?\)/g, ""),
          this.$store.getters.getGalleryFilter.nameContains,
          this.$store.getters.getGalleryFilter.keywordsContains,
          this.$store.getters.getGalleryFilter.notesContains
        )
        .then((res) => {
          if (R.any(x => R.includes(x, this.$store.getters.getGalleryFilter.sortBy), ["A-Z", "↑"])) {
            this.cardList = R.reverse(res.cardList)
          } 
          else {
            this.cardList = res.cardList
          }
          this.pageId = 0
          this.cards = []
        })
        .then(() => {
          this.fillPage()
        })
    },
    getCard(currentId) {
      let cardId = this.cardList[
        this.cardList.length - 1 - this.pageId - currentId
      ];
      return this.$cardChain
        .getCard(cardId)
        .then((res) => {
          let card = res.card
          card.id = cardId
          if (card.Content) {
            let candidate = this.$cardChain.cardObjectToWebModel(card)
            this.cards.push(candidate)
            return candidate
          } else if (!card.Owner) {
            console.error("card without content and owner: ", res)
            return res
          } else {
            console.error("card without content: ", res)
            return res
          }
        })
    },
    fillPage() {
      if (this.pageId + this.$store.getters.getGalleryFilter.cardsPerPage >= this.cardList.length)
        this.browsingForward = false;
      else this.browsingForward = true;
      if (this.pageId <= 0) this.browsingBackward = false;
      else this.browsingBackward = true;

      let requestedCards = R.map(n => this.getCard(n),
          R.times(R.identity, R.min(this.$store.getters.getGalleryFilter.cardsPerPage, this.cardList.length - this.pageId)) 
        )

      Promise.all(requestedCards)
      .then((res) => {
        // here the asynchronous order of this.cards gets overwritten by the ordered requestedCards,
        // therefore the clickedindex must be adjusted (if something was clicked)
        if (!R.equals(this.cards[this.clickedIndex], res[this.clickedIndex] )) {
          this.clickedIndex = R.findIndex(R.propEq('id', this.cards[this.clickedIndex].id))(res)
        }
        this.cards = res
        console.log("all card names:", R.pluck("CardName", res))
      })
      .catch(res => {
        console.log("NOT ALL CARDS WERE PROPERLY LOADED")
        console.log("all card names:", R.pluck("CardName", res))
      })
      console.log("all cards:", this.cards)
    },
    nextPage() {
      if (!this.browsingForward) return;

      this.pageId += this.$store.getters.getGalleryFilter.cardsPerPage;
      this.cards = [];
      this.fillPage();
      window.scrollTo(0, 0)
    },
    prevPage() {
      if (!this.browsingBackward) return;

      this.pageId -= this.$store.getters.getGalleryFilter.cardsPerPage;
      this.cards = [];
      this.fillPage();
      window.scrollTo(0, 0);
    },
    showGalleryModal() {
      this.isGalleryModalVisible = true
      
      this.canVote = R.any(
        (x) => x == this.cards[this.clickedIndex].id,
        R.pluck("CardId", this.votableCards)
      )
      this.isOwner =
        this.cards[this.clickedIndex].Owner ===
        this.$store.getters.getUserAddress
      
      this.keywordDescriptions = []
      let firstLetterToLower = string => {
        return string[0].toLowerCase() + string.substring(1)
      }
      this.cards[this.clickedIndex].Keywords.forEach(ability => {
        ability.forEach(keyword => {
          this.keywordDescriptions.push([keyword, this.$rulesDefinitions[firstLetterToLower(keyword)].description])
        })
      })
    },
    closeGalleryModal() {
      this.isGalleryModalVisible = false;
    },
    loadSpecialCardList(notes) {
      let classes =
        (this.$store.getters.getGalleryFilter.classORLogic ? "OR," : "") +
        (this.$store.getters.getGalleryFilter.mysticism ? "Mysticism," : "") +
        (this.$store.getters.getGalleryFilter.nature ? "Nature," : "") +
        (this.$store.getters.getGalleryFilter.technology ? "Technology," : "") +
        (this.$store.getters.getGalleryFilter.culture ? "Culture," : "")
        
      let requestedCards = [
        // owners are hardcoded here because these are the alpha creators
        this.$cardChain.getCardList(
          this.$store.getters.getGalleryFilter.owner,
          this.$store.getters.getGalleryFilter.status,
          this.$store.getters.getGalleryFilter.cardType,
          this.$store.getters.getGalleryFilter.classesVisible ? classes : "",
          this.$store.getters.getGalleryFilter.sortBy.replace(/\s+/g, "").replace(/\(.*?\)/g, ""),
          this.$store.getters.getGalleryFilter.nameContains,
          this.$store.getters.getGalleryFilter.keywordsContains,
          notes
        )
      ]

      Promise.all(requestedCards)
      .then((res) => {
        let cardList = R.reduce(R.concat, [], R.pluck("cardList", res))

        console.log("cardlistyes:", cardList)
        if (R.any(x => R.includes(x, this.$store.getters.getGalleryFilter.sortBy), ["A-Z", "↑"])) {
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
      console.log("editing:", this.cards[this.clickedIndex])
      this.$store.commit(
        "setCardCreatorEditCard",
        this.cards[this.clickedIndex]
      );
      this.$router.push("newCard")
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
        .then((acc) => {
          this.creditsAvailable = creditsFromCoins(acc.coins);
          this.$store.commit("setUserCredits", this.creditsAvailable);
        });
    },
    getOwnAddress() {
      return this.$store.getters.getUserAddress;
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
