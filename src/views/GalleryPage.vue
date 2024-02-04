<template>
  <div class="flex">
    <div class="flex justify-center p-16 w-[35rem] bg-[#552026] max-md:hidden">
      <div>
        <button
          v-for="classButton in classButtons"
          class="text-white font-bold uppercase px-2"
          :key="classButton.label"
          @click="
            galleryFilters[classButton.name] = !galleryFilters[classButton.name]
          "
        >
          <img
            :src="
              galleryFilters[classButton.name]
                ? classButton.active
                : classButton.inactive
            "
            class="w-12"
            :alt="classButton.name + ' classbutton'"
          />
          {{ classButton.label }}
        </button>
      </div>
    </div>
    <div class="bg-black py-8 md:p-8 lg:p-16 text-white">
      <div class="mx-16">
        <div class="flex justify-center md:justify-between">
          <p class="text-xl my-auto max-md:hidden">
            {{ state.cardList.length }} Results
          </p>
          <p class="text-5xl text-center">Gallery</p>
          <p class="text-xl my-auto max-md:hidden">Sort by</p>
        </div>
        <div class="mt-8 h-1 rounded w-full bg-white"></div>
      </div>

      <GalleryComponent
        class="p-16"
        :cards-per-page="galleryFilters.cardsPerPage"
        :all-card-ids="state.cardList"
      />
    </div>
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
import techActive from "@/assets/figma/ClassesButtons/tech.png";
import techInactive from "@/assets/figma/ClassesButtons/tech_unselected.png";
import cultureActive from "@/assets/figma/ClassesButtons/culture.png";
import cultureInactive from "@/assets/figma/ClassesButtons/culture_unselected.png";
import natureActive from "@/assets/figma/ClassesButtons/nature.png";
import natureInactive from "@/assets/figma/ClassesButtons/nature_unselected.png";
import mystActive from "@/assets/figma/ClassesButtons/myst.png";
import mystInactive from "@/assets/figma/ClassesButtons/myst_unselected.png";

const { queryQCards } = useQuery();
const { loggedIn } = useLoggedIn();
const { address } = useAddress();
const { galleryFilters, toggleGalleryFilters, resetGalleryFilters } =
  useGalleryFilters;
const route = useRoute();
const router = useRouter();

const classButtons: Array<{
  active: any;
  inactive: any;
  label: string;
  name: string;
}> = [
  {
    active: techActive,
    inactive: techInactive,
    label: "tec",
    name: "technology",
  },
  {
    active: cultureActive,
    inactive: cultureInactive,
    label: "cul",
    name: "culture",
  },
  {
    active: natureActive,
    inactive: natureInactive,
    label: "nat",
    name: "nature",
  },
  {
    active: mystActive,
    inactive: mystInactive,
    label: "mys",
    name: "mysticism",
  },
];

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

const loadCardList = () => loadQueryCardList(getDefaultQuery());

const normalizeQuery = (query: PageQuery): PageQuery => {
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
  Promise.all(requestedCards).then((res) => {
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
  });
};

const resetFilters = () => {
  console.log("reset filters");
  resetGalleryFilters();
  loadCardList();
};
</script>
