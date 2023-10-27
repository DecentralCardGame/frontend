<template>
  <div class="gallery">
    <h2 class="header__h2">Gallery</h2>
    <p class="header__p">
      In the gallery, you can view cards that were created by the community.
    </p>
    <br />
    <div v-show="galleryFilters.visible" class="gallery__filter-box ccbutton">
      <div class="gallery__filter__item">
        <select v-model="galleryFilters.status">
          <option value="">any card status</option>
          <option>Prototype</option>
          <option>Trial</option>
          <option>Permanent</option>
          <option>Playable</option>
          <option>Unplayable</option>
        </select>
      </div>
      <div class="gallery__filter__item">
        <select v-model="galleryFilters.cardType">
          <option value="">any card type</option>
          <option>Headquarter</option>
          <option>Entity</option>
          <option>Action</option>
          <option>Place</option>
        </select>
      </div>
      <div class="gallery__filter__item">
        <select v-model="galleryFilters.sortBy">
          <option value="">default sort</option>
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
          />
        </div>
      </div>
      <div>
        <div class="gallery__filter__item">
          <input
            v-model="galleryFilters.keywordsContains"
            placeholder="Ability/Effect contains"
          />
        </div>
      </div>
      <div class="gallery__filter__item">
        <input
          v-model="galleryFilters.notesContains"
          placeholder="Notes contain"
        />
      </div>
      <div class="gallery__filter__item">
        <input
          v-model="galleryFilters.owner"
          placeholder="Owner is"
          @click="galleryFilters.owner = address"
        />
      </div>

      <div class="gallery__filter__item">
        <div class="no--wrap">
          <label class="gallery-checkbox__label">
            <input
              v-model="galleryFilters.classesVisible"
              class="gallery-checkbox"
              type="checkbox"
              @input="
                galleryFilters.classesVisible = !galleryFilters.classesVisible
              "
            />
            Filter classes
            <br />
          </label>
        </div>

        <span
          v-if="galleryFilters.classesVisible"
          class="clickable-option"
          @click="galleryFilters.classORLogic = !galleryFilters.classORLogic"
        >
          <br /><br />
          {{ galleryFilters.classORLogic ? "Any: " : "All: " }}
        </span>
        <span
          v-if="galleryFilters.classesVisible"
          :class="{
            'clickable-option': true,
            negated: !galleryFilters.mysticism,
          }"
          @click="galleryFilters.mysticism = !galleryFilters.mysticism"
        >
          Mysticism
        </span>
        <span
          v-if="galleryFilters.classesVisible"
          :class="{
            'clickable-option': true,
            negated: !galleryFilters.technology,
          }"
          @click="galleryFilters.technology = !galleryFilters.technology"
        >
          Technology
        </span>
        <span
          v-if="galleryFilters.classesVisible"
          :class="{ 'clickable-option': true, negated: !galleryFilters.nature }"
          @click="galleryFilters.nature = !galleryFilters.nature"
        >
          Nature
        </span>
        <span
          v-if="galleryFilters.classesVisible"
          :class="{
            'clickable-option': true,
            negated: !galleryFilters.culture,
          }"
          @click="galleryFilters.culture = !galleryFilters.culture"
        >
          Culture
        </span>
      </div>

      <div class="gallery__filter__item">
        <input
          placeholder="cards per page"
          @input="galleryFilters.cardsPerPage = $event.target.value"
        />
      </div>
      <div class="gallery__filter__item">
        <button @click="resetFilters">Clear Filters</button>
      </div>
      <div class="gallery__filter__item">
        <button @click="loadCardList">Apply</button>
      </div>
    </div>
    <div class="button-container button-container--top ccbutton">
      <button v-show="state.browsingBackward" @click="prevPage">back</button>
      <button @click="toggleGalleryFilters">
        {{ galleryFilters.visible ? "hide" : "show" }}
        filters
      </button>
      <button v-show="loggedIn" @click="loadMyCardList()">My Cards</button>
      <button
        v-show="$route.query.notesContains != 'Finished'"
        @click="loadSpecialCardList('Finished')"
      >
        Alpha Set
      </button>
      <button
        v-show="$route.query.notesContains == 'Finished'"
        @click="loadSpecialCardList('')"
      >
        All Cards
      </button>
      <button v-show="state.browsingForward" @click="nextPage">next</button>
    </div>
    <div class="gallery__view">
      <div
        v-for="(card, index) in state.cards"
        :key="index"
        @click="
          state.clickedIndex = index;
          showGalleryModal();
        "
      >
        <div
          class="cardContainer"
          @click="
            showGalleryModal();
            state.clickedIndex = index;
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
      <button v-show="state.browsingBackward" @click="prevPage">back</button>
      <button v-show="state.browsingForward" @click="nextPage">next</button>
    </div>
    <div
      v-if="state.isGalleryModalVisible"
      class="container-modal"
      @click="closeGalleryModal"
    >
      <div class="ability-modal-container">
        <GalleryModal
          :is-owner="state.isOwner"
          :is-artist="state.isArtist"
          :keyword-descriptions="state.keywordDescriptions"
          :model="state.cards[state.clickedIndex]"
          :image-u-r-l="state.cards[state.clickedIndex].image"
          @close="closeGalleryModal"
          @cardview="cardview"
          @edit="edit"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as R from "ramda";
import GalleryModal from "@/components/modals/GalleryModal.vue";
import CardComponent from "@/components/elements/CardComponent.vue";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useAddress } from "@/def-composables/useAddress";
import { useGalleryFilters } from "@/def-composables/useGalleryFilters";
import { useLastInputEvent } from "@/def-composables/useLastInputEvent";
import { useQuery } from "@/def-composables/useQuery";
import { useCardsRules } from "@/def-composables/useCardRules";
import { useCardCreatorCards } from "@/def-composables/useCardCreatorCards";
import type { Card } from "@/model/Card";
import { onMounted, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const { queryQCards, queryQCard } = useQuery();
const { loggedIn } = useLoggedIn();
const { address } = useAddress();
const { rules } = useCardsRules();
const { editCard } = useCardCreatorCards();
const { galleryFilters, toggleGalleryFilters, resetGalleryFilters } =
  useGalleryFilters;
const { lastInputEvent } = useLastInputEvent();
const route = useRoute();
const router = useRouter();

type PageQuery = {
  status: string;
  owner: string;
  cardType: string;
  classes: string;
  sortBy: string;
  nameContains: string;
  keywordsContains: string;
  notesContains: string;
};

const initialState: {
  clickedIndex: number;
  isGalleryModalVisible: boolean;
  pageId: number;
  cardList: Array<number>;
  cards: Array<Card>;
  browsingForward: boolean;
  browsingBackward: boolean;
  isOwner: boolean;
  isArtist: boolean;
  leavePageLock: boolean;
  keywordDescriptions: string[][];
} = {
  clickedIndex: 0,
  isGalleryModalVisible: false,
  pageId: 0,
  cardList: [],
  cards: [],
  browsingForward: true,
  browsingBackward: true,
  isOwner: false,
  isArtist: false,
  leavePageLock: false,
  keywordDescriptions: [],
};

const state = reactive(initialState);

onMounted(() => {
  console.log("Yees galleryFilters", galleryFilters);

  if (!R.isEmpty(route.query)) {
    if (route.query.cardList) {
      state.cardList = (route.query.cardList as string[]).map((v) => Number(v));
      fillPage();
    } else {
      loadQueryCardList(normalizeQuery(route.query as PageQuery));
    }
  } else {
    loadCardList();
  }
});

watch(lastInputEvent, () => {
  let event = lastInputEvent.value;

  if (event.which == 5) {
    state.leavePageLock = true; // Forward Mouse special button
    nextPage();
  } else if (event.which == 4) {
    // Backward Mouse special button
    state.leavePageLock = true;
    prevPage();
  } else if (event.which == 13) {
    // Enter
    loadCardList();
  } else {
    state.leavePageLock = false;
  }
});

const loadCardList = () => {
  let q = getDefaultQuery();
  loadQueryCardList(q);
};

const getCard = (currentId: number) => {
  let cardId =
    state.cardList[state.cardList.length - 1 - state.pageId - currentId];
  return queryQCard(cardId).then((res) => {
    let card = res;
    card.id = cardId;
    if (card.Content) {
      let candidate = card;
      state.cards.push(candidate);
      return candidate;
    } else if (!card.owner) {
      console.error("card without content and owner: ", res);
      return res;
    } else {
      console.error("card without content: ", res);
      return res;
    }
  });
};
const normalizeQuery = (query: PageQuery): PageQuery => {
  return {
    status: query.status ? query.status.toLowerCase() : "playable", // default playable
    owner: query.owner ? query.owner : "",
    cardType: query.cardType ? query.cardType : "",
    classes: query.classes ? query.classes : "",
    sortBy: query.sortBy
      ? query.sortBy.replace(/\s+/g, "").replace(/\(.*?\)/g, "")
      : "",
    nameContains: query.nameContains ? query.nameContains : "",
    keywordsContains: query.keywordsContains ? query.keywordsContains : "",
    notesContains: query.notesContains
      ? query.notesContains
      : query.status ||
        query.owner ||
        query.cardType ||
        query.classes ||
        query.sortBy ||
        query.nameContains ||
        query.keywordsContains ||
        query.notesContains
      ? ""
      : loggedIn.value
      ? ""
      : "Finished", // non-logged in users (noobs), without any filters, will only see the alpha set
  };
};
const fillPage = () => {
  state.browsingForward =
    state.pageId + galleryFilters.cardsPerPage < state.cardList.length;
  state.browsingBackward = state.pageId > 0;

  let requestedCards = R.map(
    (n: number) => getCard(n),
    R.times(
      R.identity,
      R.min(galleryFilters.cardsPerPage, state.cardList.length - state.pageId)
    )
  );

  Promise.all(requestedCards)
    .then((res) => {
      // here the asynchronous order of this.cards gets overwritten by the ordered requestedCards,
      // therefore the clickedindex must be adjusted (if something was clicked)
      if (!R.equals(state.cards[state.clickedIndex], res[state.clickedIndex])) {
        state.clickedIndex = R.findIndex(
          R.propEq("id", state.cards[state.clickedIndex].id)
        )(res);
      }
      state.cards = res;
      console.log("cards on page", state.cards);
      console.log("all card names:", R.pluck("CardName", res));
    })
    .catch(() => {
      console.error("NOT ALL CARDS WERE PROPERLY LOADED");
    });
};
const nextPage = () => {
  if (!state.browsingForward) return;

  state.pageId += galleryFilters.cardsPerPage;
  state.cards = [];
  fillPage();
  window.scrollTo(0, 0);
};
const prevPage = () => {
  if (!state.browsingBackward) return;

  state.pageId -= galleryFilters.cardsPerPage;
  state.cards = [];
  fillPage();
  window.scrollTo(0, 0);
};
const showGalleryModal = () => {
  state.isGalleryModalVisible = true;

  state.isOwner = state.cards[state.clickedIndex].owner === address.value;

  state.keywordDescriptions = [];
  const firstLetterToLower = (s: string) => {
    return s[0].toLowerCase() + s.substring(1);
  };
  state.cards[state.clickedIndex].Keywords.forEach((ability) => {
    ability.forEach((keyword) => {
      state.keywordDescriptions.push([
        keyword,
        rules.value.definitions[firstLetterToLower(keyword)].description,
      ]);
    });
  });
};
const closeGalleryModal = () => (state.isGalleryModalVisible = false);
const loadMyCardList = () =>
  loadSpecialCardList(galleryFilters.notesContains, address.value);
const getDefaultQuery = (): PageQuery => {
  let classes =
    (galleryFilters.classORLogic ? "OR," : "") +
    (galleryFilters.mysticism ? "Mysticism," : "") +
    (galleryFilters.nature ? "Nature," : "") +
    (galleryFilters.technology ? "Technology," : "") +
    (galleryFilters.culture ? "Culture," : "");

  let q = galleryFilters;
  q.classes = q.classesVisible ? classes : "";
  return normalizeQuery(q);
};
const loadSpecialCardList = (notes: string, owner: string = "") => {
  let q = getDefaultQuery();
  q.notesContains = notes;
  if (owner) {
    q.owner = owner;
  }
  loadQueryCardList(q);
};
const loadQueryCardList = (query: PageQuery) => {
  router.push({ path: "gallery", query: query });

  let requestedCards = [
    queryQCards(query.status, {
      owner: query.owner,
      cardType: query.cardType,
      classes: query.classes,
      sortBy: query.sortBy,
      nameContains: query.nameContains,
      keywordsContains: query.keywordsContains,
      notesContains: query.notesContains,
    }),
  ];
  Promise.all(requestedCards)
    .then((res) => {
      let cardList: number[] = R.reduce<unknown, number[]>(
        R.concat,
        [],
        R.pluck("cardsList", res)
      );

      if (R.any((x) => R.includes(x, galleryFilters.sortBy), ["A-Z", "↑"])) {
        state.cardList = R.reverse(cardList).map((v) => Number(v));
      } else {
        state.cardList = cardList;
      }
      state.pageId = 0;
      state.cards = [];
    })
    .then(fillPage);
};
const edit = () => {
  editCard.card.value = state.cards[state.clickedIndex];
  router.push("cardCreator");
};
const cardview = () =>
  router.push("cardview/" + state.cards[state.clickedIndex].id);
const resetFilters = () => {
  console.log("reset filters");
  resetGalleryFilters();
  loadCardList();
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
