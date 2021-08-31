<template>
  <div class="gallery">
    <h2 class="header__h2">
      Gallery
    </h2>
    <p class="header__p">
      In the gallery, you can view cards that were created by the community.
    </p>
    <br>
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
      <button
        v-show="browsingForward"
        @click="nextPage"
      >
        next
      </button>
    </div>
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
            <option>Name</option>
            <option>Casting Cost</option>
            <option>Id</option>
          </select>
        </div>
      </div>
      <div>
        <div class="gallery__filter__item">
          <input
            v-model="$store.getters.getGalleryFilter.nameContains"
            placeholder="card name contains"
          >
        </div>
      </div>
      <div class="gallery__filter__item">
        <input
          v-model="$store.getters.getGalleryFilter.notesContains"
          placeholder="card notes contain"
        >
      </div>
      <div class="gallery__filter__item">
        <input
          v-model="$store.getters.getGalleryFilter.owner"
          placeholder="card owner is"
          @click="$store.getters.getGalleryFilter.owner = getOwnAddress()"
        >
      </div>

      <div class="gallery__filter__item">
        <div class="no--wrap">
          <input
            v-model="$store.getters.getGalleryFilter.classesVisible"
            type="checkbox"
            @input="$store.getters.getGalleryFilter.classesVisible = !$store.getters.getGalleryFilter.classesVisible "
          >Filter Classes <br>
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
          <CardComponent
            :id="'card' + index"
            :model="card"
            :image-u-r-l="card.image"
            class="gallery__view__card"
            width="100%"
          />
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
    <div class="ability-modal-container">
      <GalleryModal
        v-if="isGalleryModalVisible"
        :can-vote="canVote"
        :is-owner="isOwner"
        :keywordDescriptions="keywordDescriptions"
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
</template>

<script>
import * as R from "ramda";
import GalleryModal from "../components/modals/GalleryModal.vue";
import CardComponent from "@/components/elements/CardComponent";
import { saveCardAsPng, creditsFromCoins } from "../components/utils/utils.js";

export default {
  name: "GalleryPage",
  components: { CardComponent, GalleryModal },
  data() {
    return {
      clickedIndex: 0,
      isGalleryModalVisible: false,
      pageId: 0,
      currentId: 0,
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
      let event = this.$store.state.lastInputEvent;

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
  beforeRouteLeave(to, from, next) {
    if (this.leavePageLock) next(false);
    else next();
  },
  mounted() {
    this.loadCardList();
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
        (this.$store.getters.getGalleryFilter.culture ? "Culture," : "");
      return this.$cardChain
        .getCardList(
          this.$store.getters.getGalleryFilter.owner,
          this.$store.getters.getGalleryFilter.status,
          this.$store.getters.getGalleryFilter.cardType,
          this.$store.getters.getGalleryFilter.classesVisible ? classes : "",
          this.$store.getters.getGalleryFilter.sortBy.replace(/\s+/g, ""),
          this.$store.getters.getGalleryFilter.nameContains,
          this.$store.getters.getGalleryFilter.notesContains
        )
        .then((res) => {
          this.cardList = res.cardList;
          this.pageId = 0;
          this.currentId = 0;
          this.cards = [];
        })
        .then(() => {
          this.fillPage();
        });
    },
    getNextCard() {
      if (this.pageId + this.currentId >= this.cardList.length) return;

      let cardId = this.cardList[
        this.cardList.length - 1 - this.pageId - this.currentId
      ];
      this.currentId++;
      return this.$cardChain
        .getCard(cardId)
        .then((res) => {
          let card = res.card;
          card.id = cardId;
          if (card.Content) {
            let candidate = this.$cardChain.cardObjectToWebModel(card);
            //if (this.applyFilters(candidate))
            this.cards.push(candidate);
          } else if (!card.Owner) {
            console.error("card without content and owner: ", res);
          } else {
            console.error("card without content: ", res);
          }
        })
        .catch((res) => {
          console.error(res);
        });
    },
    fillPage() {
      if (
        this.pageId + this.$store.getters.getGalleryFilter.cardsPerPage >=
        this.cardList.length
      )
        this.browsingForward = false;
      else this.browsingForward = true;
      if (this.pageId <= 0) this.browsingBackward = false;
      else this.browsingBackward = true;

      Promise.all(
        R.times(
          this.getNextCard,
          this.$store.getters.getGalleryFilter.cardsPerPage
        )
      ).then(() => {
        if (this.$store.getters.getGalleryFilter.sortBy === "Name") {
          this.cards.sort((x, y) =>
            x.CardName.toUpperCase() < y.CardName.toUpperCase() ? 1 : -1
          );
        } else if (
          this.$store.getters.getGalleryFilter.sortBy === "Casting Cost"
        ) {
          this.cards.sort(
            (x, y) =>
              (y.CastingCost ? y.CastingCost + y.nerflevel : 0) -
              (x.CastingCost ? x.CastingCost + x.nerflevel : 0)
          );
          console.log("cards after sort", this.cards);
        } else if (this.$store.getters.getGalleryFilter.sortBy === "Id") {
          this.cards.sort((x, y) => y.id - x.id);
        }
      });
      console.log("all cards:", this.cards);
    },
    nextPage() {
      if (!this.browsingForward) return;

      this.pageId += this.$store.getters.getGalleryFilter.cardsPerPage;
      this.currentId = 0;
      this.cards = [];
      this.fillPage();
      window.scrollTo(0, 0);
    },
    prevPage() {
      if (!this.browsingBackward) return;

      this.pageId -= this.$store.getters.getGalleryFilter.cardsPerPage;
      this.currentId = 0;
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
    edit() {
      console.log("editing:", this.cards[this.clickedIndex])
      this.$store.commit(
        "setCardCreatorEditCard",
        this.cards[this.clickedIndex]
      );
      this.$router.push("newCard");
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
  max-width: 500px;
  width: "20%";
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
