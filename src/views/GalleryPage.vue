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
    </div>
    <GalleryComponent
      :cards-per-page="galleryFilters.cardsPerPage"
      :all-card-ids="state.cardList"
      :rarity-filter="state.rarity"
    />
  </div>
</template>

<script setup lang="ts">
import * as R from "ramda";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useAddress } from "@/def-composables/useAddress";
import { useGalleryFilters } from "@/def-composables/useGalleryFilters";
import { useQuery } from "@/def-composables/useQuery";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import GalleryComponent from "@/components/elements/GalleryComponent.vue";

const { queryQCards } = useQuery();
const { loggedIn } = useLoggedIn();
const { address } = useAddress();
const { galleryFilters, toggleGalleryFilters, resetGalleryFilters } =
  useGalleryFilters;
const route = useRoute();
const router = useRouter();

type PageQuery = {
  status: string;
  owner: string;
  cardType: string;
  classes: string;
  sortBy: string;
  rarity: string;
  nameContains: string;
  keywordsContains: string;
  notesContains: string;
};

const initialState: {
  cardList: Array<number>;
} = {
  cardList: [],
};

const state = reactive(initialState);

onMounted(() => {
  if (!R.isEmpty(route.query)) {
    if (route.query.cardList) {
      state.cardList = (route.query.cardList as string[]).map((v) => Number(v));
    } else {
      loadQueryCardList(normalizeQuery(route.query as PageQuery));
    }
  } else {
    loadCardList();
  }
});

const loadCardList = () => loadQueryCardList(getDefaultQuery())

const normalizeQuery = (query: PageQuery): PageQuery => {
  state.rarity = query.rarity
  return {
    status: query.status ? query.status.toLowerCase() : "playable", // default playable
    owner: query.owner ? query.owner : "",
    cardType: query.cardType ? query.cardType : "",
    classes: query.classes ? query.classes : "",
    sortBy: query.sortBy
      ? query.sortBy.replace(/\s+/g, "").replace(/\(.*?\)/g, "")
      : "",
    rarity: query.rarity,
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
      : "Finished", // non-logged in users (noobs), without any filters, will only see the alpha set, this is a HACK to cheat in notesContains
  };
};

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
        state.cardList = R.reverse(cardList);
      }
    })
};

const resetFilters = () => {
  console.log("reset filters");
  resetGalleryFilters();
  loadCardList();
};
</script>