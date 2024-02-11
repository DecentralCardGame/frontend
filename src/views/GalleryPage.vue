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
    <div class="bg-black py-8 md:p-8 lg:p-16 text-white grow">
      <div class="mx-16">
        <div class="flex justify-center md:justify-between">
          <p class="text-xl my-auto max-md:hidden">
            {{ cardList.length }} Results
          </p>
          <p class="text-5xl text-center">Gallery</p>
          <p class="text-xl my-auto max-md:hidden">Sort by</p>
        </div>
        <div class="mt-8 h-1 rounded w-full bg-white"></div>
      </div>

      <GalleryComponent
        class="p-16"
        :cards-per-page="galleryFilters.cardsPerPage"
        :all-card-ids="cardList"
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
import {
  normalizeQuery,
  type PageQuery,
  useGallery,
} from "@/def-composables/useGallery";

const { queryQCards } = useQuery();
const { loggedIn } = useLoggedIn();
const { address } = useAddress();
const { galleryFilters, toggleGalleryFilters, resetGalleryFilters } =
  useGalleryFilters;
const route = useRoute();
const router = useRouter();
const { cardList, loadQueryCardList, pageQueryFromGalleryFilters } =
  useGallery();

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

const TypeButtons: Array<{
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

onMounted(() => {
  if (!R.isEmpty(route.query)) {
    if (route.query.cardList) {
      cardList.value = (route.query.cardList as string[]).map((v) => Number(v));
    } else {
      loadQueryCardList(normalizeQuery(route.query));
    }
  } else {
    loadCardList();
  }
});

const loadCardList = () => loadQueryCardList(pageQueryFromGalleryFilters());

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

const resetFilters = () => {
  console.log("reset filters");
  resetGalleryFilters();
  loadCardList();
};
</script>
