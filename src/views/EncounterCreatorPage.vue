<template>
  <div class="flex text-white max-lg:flex-col justify-center">
    <div
      v-if="loggedIn"
      class="self-start lg:sticky top-0 min-w-[25rem] flex justify-center lg:p-16 h-[100vh] mt-0 bg-[#552026] 
            max-lg:w-full max-lg:h-full max-lg:p-4 "
    >
      <div class="max-w-[18rem]">
          Build your Encounter by selecting Cards for a draw list.
          The opponent of the encounter will draw cards exactly in this order.
        <div class="my-5" v-if="true">
          1. Step - Select HQ
        </div>
        <div
          v-if="filtersVisible"
          class="space-y-6 justify-self-center"
        >
          <GalleryFilterImageChooser v-if="!hqSelected" :options="classOptions" />

          <GalleryFilterImageChooser v-if="hqSelected" :options="typeOptions" />

          <div class="">
            <p>Search for</p>
            <div class="space-y-4">
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

          <div class="">
            <BaseCCButton
              :type="Color.RED"
              @click="publish()"
            >
              Publish Encounter
            </BaseCCButton>
          </div>

          <div class="space-y-4">

          </div>

        </div>
        
      </div>
    </div>

    <div class="bg-black lg:w-[75%] py-8 md:p-8 lg:p-16 text-white grow">
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
        class="p-16"
        :cards-2per-page="galleryFilters.cardsPerPage"
        :all-card-ids="revertSort ? cardList.toReversed() : cardList"
        @card-clicked="addCardToEncounter"
      />

      
    </div>


    <div
      class="self-start lg:sticky top-0 min-w-[25rem] flex flex-col justify-center lg:p-16 h-[100vh] mt-0 bg-[#552026] 
            max-lg:w-full max-lg:h-full max-lg:p-4 "
    >
      Draw List:
      <div class="h-6 p-5 mb-10 bg-black"
        v-for="(item, index) in drawList" :key="item.id" 
        draggable
        @click=removeCard(index)
      > 
        {{ item.name }} - {{ item.cost }}
      </div>



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
import { onMounted, watch, ref } from "vue";
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
import { Card } from "@/model/Card";
import CardviewModal from "@/components/modals/CardviewModal.vue";
import SortDirectionButton from "@/components/elements/SortDirectionButton.vue";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useAddress } from "@/def-composables/useAddress";
import { useQuery } from "@/def-composables/useQuery";
import { useTx } from "@/def-composables/useTx";

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
const { encounterDo, encounterCreate, encounterClose } = useTx();

const { queryQEncounter, queryQEncounterWithImage, queryQEncounters, queryQEncountersWithImage } = useQuery();

const drawList = ref([]);

let filtersVisible = ref(true);

let hqSelected = ref(false);


watch(drawList.value, () => {
  let hq = undefined;
  drawList.value.forEach((item, index) => {
    if (item.type == "Headquarter") {
      if (hq) drawList.value.splice(index, 1)
      else hq = item;
    }
  })
  if (hq) {
    galleryFilters.value.hq = false;
    galleryFilters.value.nature = hq.class.Nature;
    galleryFilters.value.mysticism = hq.class.Mysticism;
    galleryFilters.value.technology = hq.class.Technology;
    galleryFilters.value.culture = hq.class.Culture;
    hqSelected.value = true;

    // remove all cards that do not match hqs color identity
    drawList.value.forEach( (item, index) => {
      for (let [key, value] of Object.entries(hq.class)) {
        if (value == false && item.class[key] == true) {
          drawList.value.splice(index, 1)
        } 
      }
    })
  }
  else {
    galleryFilters.value.hq = true;
    galleryFilters.value.place = false;
    galleryFilters.value.action = false;
    galleryFilters.value.entity = false;
    galleryFilters.value.nature = true;
    galleryFilters.value.mysticism = true;
    galleryFilters.value.technology = true;
    galleryFilters.value.culture = true;
    hqSelected.value = false;
  }
})

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
  //console.log("address", address)
  galleryFilters.value.owner = '';address;
  
  galleryFilters.value.status = "playable";[Status.prototype];
  galleryFilters.value.hq = true;

  let filters = pageQueryFromGalleryFilters();
  console.log("pagequeryfilters", filters);

  loadQueryCardList(filters);
  console.log("galleryFilters", galleryFilters)

  queryQEncounters()
    .then((res) => {
      console.log("queryQEncounter res", res);
    })

});

const addCardToEncounter = (card: Card) => {
  console.log("card", card)
  drawList.value.push({
    id: card.id,
    name: card.CardName,
    cost: card.Delay || card.CastingCost,
    type: card.type,
    class: card.Class
  })
  console.log("drawlist: " , drawList)
}

const startDrag = (evt, item) => {
  console.log("startDrag", evt, item)
}

const onDrop = (evt, list) => {
  console.log("onDrop", evt, list)
}

const removeCard = (index) => {
  drawList.value.splice(index, 1)
}

const publish = () => {
  console.log("publish")
  let name = "test"
  let drawlist = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10,11,11,11,12,12,12,13,13,13,14]
  let parameters = {}
  let image = ""
  encounterCreate(name, drawlist, parameters, image, (res) =>{
    console.log("res", res)
  },
  (err) => {
    console.log("err", err)
  });
}

</script>
