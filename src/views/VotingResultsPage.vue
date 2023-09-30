<template>
  <div class="gallery">
    <h2 class="header__h2">Voting Results</h2>
    <p class="header__p">
      Here you can see the outome of the last week's voting. <br /><br />
      Total Votes: {{ TotalVotes }} <br />
      Total <b>Fair Enough</b> Votes: {{ TotalFairEnoughVotes }} <br />
      Total <b>Inappropriate</b> Votes: {{ TotalInappropriateVotes }} <br />
      Total <b>Overpowered</b> Votes: {{ TotalOverpoweredVotes }} <br />
      Total <b>Underpowered</b> Votes: {{ TotalUnderpoweredVotes }} <br />
      <br />
      Nerfed Mana Costs are <span style="color: #ff0000">red</span> and buffed
      Mana Costs are <span style="color: #3cb38f">green</span>. <br />
      Banned Cards have their Mana Cost removed.
    </p>
    <br />
    <div class="button-container button-container--top">
      <button v-show="browsingBackward" @click="prevPage">back</button>
      <button v-show="browsingForward" @click="nextPage">next</button>
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
      <button v-show="browsingBackward" @click="prevPage">back</button>
      <button v-show="browsingForward" @click="nextPage">next</button>
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
          :is-artist="isArtist"
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

<script lang="ts">
import * as R from "ramda";
import { useQuery } from "@/def-composables/useQuery";
import GalleryModal from "@/components/modals/GalleryModal.vue";
import CardComponent from "@/components/elements/CardComponent.vue";
import { useLastInputEvent } from "@/def-composables/useLastInputEvent";
import { saveCardAsPng } from "@/components/utils/utils.js";
import { useAddress } from "@/def-composables/useAddress";
import { useVoting } from "@/def-composables/useVoting";
import { useNotifications } from "@/def-composables/useNotifications";
import { useGalleryFilters } from "@/def-composables/useGalleryFilters";
const { notifyInfo, notifyFail, notifySuccess } = useNotifications();
const { queryQCards, queryQCard } = useQuery();
const { add } = useVoting();

export default {
  name: "VotingResultsPage",
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
      isArtist: false,
      leavePageLock: false,
      keywordDescriptions: [],
      TotalVotes: 0,
      TotalFairEnoughVotes: 0,
      TotalInappropriateVotes: 0,
      TotalOverpoweredVotes: 0,
      TotalUnderpoweredVotes: 0,
    };
  },
  setup() {
    const { address } = useAddress();
    const { lastInputEvent } = useLastInputEvent();
    const { queryQVotingResults } = useQuery();
    const { galleryFilters } = useGalleryFilters;
    const { editCard } = useCardCreatorCards();

    return {
      lastInputEvent,
      address,
      queryQVotingResults,
      cardCreatorEditCard: editCard.card,
    };
  },
  // this watch together with the following beforeRouteLeave make browsing
  // through the Gallery with mouse back and forward (x1, x2) buttons possible
  watch: {
    lastInputEvent() {
      let event = this.lastInputEvent;

      if (event.which == 5) {
        this.leavePageLock = true;
        this.nextPage();
      } else if (event.which == 4) {
        this.leavePageLock = true;
        this.prevPage();
      } else if (event.which == 13) {
        this.loadCardList();
      } else {
        this.leavePageLock = false;
      }
    },
  },
  mounted() {
    this.loadCardList();
  },
  methods: {
    loadCardList() {
      console.log(this.queryQVotingResults);
      return this.queryQVotingResults({})
        .then((res) => {
          console.log("res", res);
          this.TotalVotes = res.lastVotingResults.totalVotes;
          this.TotalFairEnoughVotes =
            res.lastVotingResults.totalFairEnoughVotes;
          this.TotalInappropriateVotes =
            res.lastVotingResults.totalInappropriateVotes;
          this.TotalOverpoweredVotes =
            res.lastVotingResults.totalOverpoweredVotes;
          this.TotalUnderpoweredVotes =
            res.lastVotingResults.totalUnderpoweredVotes;
          this.cardList = res.lastVotingResults.cardResults;
        })
        .then(() => {
          this.fillPage();
        });
    },
    getCard(currentId) {
      let cardId =
        this.cardList[this.cardList.length - 1 - this.pageId - currentId]
          .cardId;
      return queryQCard(cardId).then((res) => {
        let card = res;
        card.id = cardId;
        if (card.content) {
          let candidate = card;
          candidate.isNerfed =
            this.cardList[this.cardList.length - 1 - this.pageId - currentId]
              .result === "nerf";
          candidate.isBuffed =
            this.cardList[this.cardList.length - 1 - this.pageId - currentId]
              .result === "buff";
          candidate.isBanned =
            this.cardList[this.cardList.length - 1 - this.pageId - currentId]
              .result === "ban";
          this.cards.push(candidate);
          return candidate;
        } else if (!card.owner) {
          console.error("card without content and owner: ", res);
          return res;
        } else {
          console.error("card without content: ", res);
          return res;
        }
      });
    },
    fillPage() {
      if (
        this.pageId + this.galleryFilters.cardsPerPage >=
        this.cardList.length
      )
        this.browsingForward = false;
      else this.browsingForward = true;
      if (this.pageId <= 0) this.browsingBackward = false;
      else this.browsingBackward = true;

      let requestedCards = R.map(
        (n) => this.getCard(n),
        R.times(
          R.identity,
          R.min(
            this.galleryFilters.cardsPerPage,
            this.cardList.length - this.pageId
          )
        )
      );

      Promise.all(requestedCards).then((res) => {
        // here the asynchronous order of this.cards gets overwritten by the ordered requestedCards,
        // therefore the clickedindex must be adjusted (if something was clicked)
        if (!R.equals(this.cards[this.clickedIndex], res[this.clickedIndex])) {
          this.clickedIndex = R.findIndex(
            R.propEq("id", this.cards[this.clickedIndex].id)
          )(res);
        }
        this.cards = res;
      });
      console.log("all cards:", this.cards);
    },
    nextPage() {
      if (!this.browsingForward) return;

      this.pageId += this.galleryFilters.cardsPerPage;
      this.cards = [];
      this.fillPage();
      window.scrollTo(0, 0);
    },
    prevPage() {
      if (!this.browsingBackward) return;

      this.pageId -= this.galleryFilters.cardsPerPage;
      this.cards = [];
      this.fillPage();
      window.scrollTo(0, 0);
    },
    showGalleryModal() {
      this.isGalleryModalVisible = true;

      this.canVote = R.any(
        (x) => x == this.cards[this.clickedIndex].id,
        R.pluck("cardId", this.votableCards)
      );

      this.isOwner = this.cards[this.clickedIndex].owner === this.address;
      this.isArtist = this.cards[this.clickedIndex].artist === this.address;

      this.keywordDescriptions = [];
      let firstLetterToLower = (string) => {
        return string[0].toLowerCase() + string.substring(1);
      };
      this.cards[this.clickedIndex].Keywords.forEach((ability) => {
        ability.forEach((keyword) => {
          this.keywordDescriptions.push([
            keyword,
            this.$rulesDefinitions[firstLetterToLower(keyword)].description,
          ]);
        });
      });
    },
    closeGalleryModal() {
      this.isGalleryModalVisible = false;
    },
    edit() {
      this.cardCreatorEditCard = this.cards[this.clickedIndex];
      this.$router.push("cardCreator");
    },
    cardview() {
      this.$router.push("cardview/" + this.cards[this.clickedIndex].id);
    },
    downloadPng() {
      saveCardAsPng(
        document.getElementById("card" + this.clickedIndex),
        this.cards[this.clickedIndex].CardName
      );
    },
    vote(type) {
      this.add(this.cards[this.clickedIndex].id, type);
      this.notifyInfo(
        "Vote saved",
        "Don't forget to send your votes on the Voting page!"
      );
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
  position: relative;
  display: flex;
}

.cardContainer--element {
  position: relative;
  flex-grow: 1;
  max-width: 300px;
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
    bottom: 0;
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
    max-height: 300vh;
    height: auto;
  }
  //OLD:
  // position: relative;
  z-index: 3;
}
</style>
