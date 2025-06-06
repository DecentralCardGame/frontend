<template>
  <div class="flex text-white max-lg:flex-col justify-center">
    <div
      class="self-start lg:sticky top-0 min-w-[25rem] flex justify-center my-auto h-[100vh] mt-0 bg-[#552026] 
            max-lg:w-full max-lg:h-full max-lg:p-4 max-h-[90vh] max-h-[80vh] overflow-y-auto overflow-x-hidden"
    >
      <div class="">
        <div class="flex flex-row justify-center items-center lg:invisible max-lg:pt-2 max-lg:pb-6">
          <BaseCCButton
            :type="Color.RED"
            @click="filtersVisible = !filtersVisible"
          >
            Gallery Filters
          </BaseCCButton>
        </div>
        <div
          v-if="filtersVisible"
          class="space-y-6 justify-self-center"
        >

          <GalleryFilterImageChooser :options="classOptions" />
          <Checkbox v-model="galleryFilters.multiClass">
            exclusive class matching
          </Checkbox>
          <GalleryFilterImageChooser :options="typeOptions" />
          <div class="">
            <p>Search for</p>
            <div class="">
              <CCInput
                v-model="galleryFilters.nameContains"
                placeholder="name"
              />
              <br>
              <CCInput
                v-model="galleryFilters.notesContains"
                placeholder="notes"
              />
              <br>
              <CCInput
                v-model="galleryFilters.keywordsContains"
                placeholder="keywords"
              />
            </div>
          </div>
          <CCInput
            v-model="galleryFilters.owner"
            placeholder="owner"
            :max-length="41"
          />
          <Checkbox
            v-if="loggedIn"
            :model-value="galleryFilters.owner === address"
            @update:model-value="
              (v: boolean) => (galleryFilters.owner = v ? address : '')
            "
          >
            My Cards
          </Checkbox>
          <div class="space-y-4">
            Rarity:
            <Dropdown
              v-model="galleryFilters.rarity"
              :display-fn="
                (v?) => (typeof v === 'undefined' ? '?' : CardRarity[v])
              "
              :options="[
                undefined,
                CardRarity.common,
                CardRarity.uncommon,
                CardRarity.rare,
                CardRarity.exceptional,
                CardRarity.unique,
              ]"
            />
            <br>
            Status:
            <Dropdown
              v-model="galleryFilters.status"
              :display-fn="(v) => (v == 'playable' ? 'playable' : Status[v])"
              :options="
                new Array<GalleryStatus>(
                  'playable',
                  Status.prototype,
                  Status.trial,
                  Status.permanent,
                  Status.bannedSoon,
                  Status.bannedVerySoon,
                  Status.banned,
                )
              "
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-black lg:w-[75%] py-8 md:p-8 lg:p-16 text-white grow max-h-[90vh] overflow-y-auto">
      <div class="mx-16">
        <div class="relative h-8 flex flex-row justify-between">
          <div class="flex justify-center max-md:hidden md:justify-between">
            <p class="md:text-xl lg:text-lg xl:text-xl  my-auto">
              {{ cardList.length }} Results
            </p>
          </div>
          <div>
            <p class="md:text-4xl lg:text-2xl xl:text-4xl  text-center">
              Gallery
            </p>
          </div>
          <div class="flex space-x-2">
            <p class="md:text-xl xl:text-xl lg:text-lg my-auto max-md:hidden">
              Sort by
            </p>
            <Dropdown
              v-model="galleryFilters.sortBy"
              class="my-auto"
              :type="Color.RED"
              :options="['Name', 'CastingCost', 'Id']"
              :display-fn="(v) => (v == 'CastingCost' ? 'Casting cost' : v)"
            />
            <SortDirectionButton
              v-model="revertSort"
              class="my-auto"
            />
          </div>
        </div>
        <div class="mt-8 h-1 rounded w-full bg-white" />
      </div>
        <GalleryComponent
          :cards-2per-page="galleryFilters.cardsPerPage"
          :all-card-ids="revertSort ? cardList.toReversed() : cardList"
          @card-clicked="openCardviewModel"
        />
    </div>
  </div>
  <CardviewModal
    v-if="isCardViewModalVisible"
    :id="cardViewModalCardId"
    @close="isCardViewModalVisible = false"
  />
</template>

<script setup lang="ts">
import * as R from "ramda";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import GalleryComponent from "@/components/elements/GalleryComponent.vue";
import techActive from "@/assets/figma/ClassesButtons/tech.png";
import techInactive from "@/assets/figma/ClassesButtons/tech_unselected.png";
import cultureActive from "@/assets/figma/ClassesButtons/culture.png";
import cultureInactive from "@/assets/figma/ClassesButtons/culture_unselected.png";
import natureActive from "@/assets/figma/ClassesButtons/nature.png";
import natureInactive from "@/assets/figma/ClassesButtons/nature_unselected.png";
import mystActive from "@/assets/figma/ClassesButtons/myst.png";
import mystInactive from "@/assets/figma/ClassesButtons/myst_unselected.png";
import hqActive from "@/assets/figma/TypesButtons/hq.png";
import hqInactive from "@/assets/figma/TypesButtons/hq_unselected.png";
import entityActive from "@/assets/figma/TypesButtons/entity.png";
import entityInactive from "@/assets/figma/TypesButtons/entity_unselected.png";
import actionActive from "@/assets/figma/TypesButtons/action.png";
import actionInactive from "@/assets/figma/TypesButtons/action_unselected.png";
import placeActive from "@/assets/figma/TypesButtons/place.png";
import placeInactive from "@/assets/figma/TypesButtons/place_unselected.png";
import type { GalleryFilterImageChooserOptions } from "@/components/elements/Gallery/types";
import type { GalleryFilters, GalleryStatus } from "@/model/GalleryFilters";
import GalleryFilterImageChooser from "@/components/elements/Gallery/GalleryFilterImageChooser.vue";
import Dropdown from "@/components/elements/Dropdown/Dropdown.vue";
import { Color } from "@/components/utils/color";
import Checkbox from "@/components/elements/Checkbox.vue";
import { useGallery } from "@/def-composables/useGallery";
import { normalizeQuery } from "@/utils/utils";
import CCInput from "@/components/elements/CCInput/CCInput.vue";
import {
  CardRarity,
  Status,
} from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/card";
import CardviewModal from "@/components/modals/CardviewModal.vue";
import { Card } from "@/model/Card";
import SortDirectionButton from "@/components/elements/SortDirectionButton.vue";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useAddress } from "@/def-composables/useAddress";

const route = useRoute();
const router = useRouter();
const { loggedIn } = useLoggedIn();
const { address } = useAddress();
const isCardViewModalVisible = ref(false);
const cardViewModalCardId = ref(-1);
const {
  cardList,
  loadQueryCardList,
  galleryFilters,
  pageQueryFromGalleryFilters,
  galleryFiltersFromPageQuery,
} = useGallery();

let filtersVisible = ref(true);

const revertSort = ref(false);

const classOptions: GalleryFilterImageChooserOptions<GalleryFilters> = [
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

const typeOptions: GalleryFilterImageChooserOptions<GalleryFilters> = [
  {
    active: hqActive,
    inactive: hqInactive,
    label: "hq",
    name: "hq",
  },
  {
    active: entityActive,
    inactive: entityInactive,
    label: "ent",
    name: "entity",
  },
  {
    active: actionActive,
    inactive: actionInactive,
    label: "act",
    name: "action",
  },
  {
    active: placeActive,
    inactive: placeInactive,
    label: "pla",
    name: "place",
  },
];

onMounted(() => {
  const query = route.query
  if (!R.isEmpty(query)) {
    if ((query as {cards?: number[]}).cards) {
      cardList.value = (query as {cards?: number[]}).cards!
    } else {
      galleryFiltersFromPageQuery(normalizeQuery(route.query));
      router.push({ path: "gallery", query: query });
      loadQueryCardList(pageQueryFromGalleryFilters());
    }
  } else if (cardList.value.length == 0) {
    router.push({ path: "gallery", query: query });
    loadQueryCardList(pageQueryFromGalleryFilters());
  } else {
    router.push({ path: "gallery", query: pageQueryFromGalleryFilters() });
  }
});

const openCardviewModel = (card: Card) => {
  cardViewModalCardId.value = Number(card.id);
  //router.replace({ name: "CardView", params: { id: cardId } });
  isCardViewModalVisible.value = true;
};
</script>
