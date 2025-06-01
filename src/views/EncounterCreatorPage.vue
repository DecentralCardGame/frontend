<template>
  <div class="flex text-white max-lg:flex-col justify-center">
    <!-- left panel - filters -->
    <div class="self-start lg:sticky top-0 min-w-[25rem] flex justify-center 
      lg:p-16 h-[100vh] mt-0 bg-[#552026] max-lg:w-full max-lg:h-full max-lg:p-4 max-h-[90vh] overflow-y-auto overflow-x-hidden"
    >
      <div v-if="!loggedIn">
          You are not logged in. <br>
          Please login to create an encounter.
      </div>
      <div v-if="loggedIn"
        class="max-w-[18rem]">
          Build your Encounter by selecting Cards for a draw list.
          The AI of the encounter will draw cards exactly in this order.
        <div class="my-5" v-if="!hqSelected">
          1. Step - Select HQ <br>
          Use the class filters below to show matching HQs only.
        </div>
        <div class="my-5" v-if="hqSelected">
          2. Step - Add Cards <br>
          Use the type filters below to show matching Card types only.
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
        </div>
      </div>
    </div>

    <!-- middle panel - card selection -->
    <div class="bg-black lg:w-[75%] py-8 md:p-8 lg:p-16 text-white grow max-h-[90vh] overflow-y-auto overflow-x-hidden">
      <div class="mx-16">
        <div class="relative h-8 flex flex-row justify-between">
          <div class="flex justify-start max-md:hidden md:justify-between">
            <p class="md:text-xl lg:text-lg xl:text-xl  my-auto">
              {{ cardList.length }} Results
            </p>
          </div>
          <div>
            <p class="md:text-4xl lg:text-2xl xl:text-4xl  text-center">
              Encounter
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

    <!-- right panel - enter specs -->
    <div
      class="self-start lg:sticky top-0 min-w-[25rem] flex flex-col justify-start lg:p-14 max-h-[100vh] mt-0 bg-[#552026] 
            max-lg:w-full max-lg:h-full max-lg:p-4 max-h-[90vh] overflow-y-auto relative"
    >
      <CCInput
        class="my-5"
        v-model="encounterName"
        placeholder="Encounter Title"
      />
      <div class="flex flex-row items-center justify-between">
        <div>
        <Dropdown
          v-model="encounterType"
          class="my-auto"
          :type="Color.RED"
          :options="['Constructed', 'DraftRun', 'Campaign']"
        />
        </div>
        <div v-if="encounterType == 'DraftRun' || encounterType == 'Campaign'"
          class="flex flex-row items-center">
          <p class="m-1">Level:</p>
          <CCInput
            
            class="w-10"
            v-model="encounterLevel"
            placeholder="Level"
          />
        </div>
      </div>
      
      <!-- image upload -->
      <div class="mb-5">
        <div v-if="cropImage == ''">
          <label for="dropzone-file">
            <div
              class="h-[24rem] flex px-24 bg-white bg-opacity-[15%] hover:bg-pink-950 text-white text-opacity-50 text-2xl font-bold border-4 border-gray-100 border-opacity-50"
            >
              <span class="flex items-center">upload image</span>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              @change="inputFile"
            >
          </label>
        </div>
        <img
          v-if="cropImage !== ''"
          class="h-[24rem] object-scale-down"
          width="300"
          height="400"
          :src="cropImage"
          alt="check"
        >
      </div>
      <div>
        <BaseCCButton
          :type="Color.RED"
          @click="publish()"
        >
          Publish Encounter
        </BaseCCButton>
      </div>
      <!-- Added cards section -->
      <span class="my-4"> Cards added - {{ cardsAdded }}/40 </span>
      <div
        v-for="(item, index) in drawList" :key="item.id" 
      >
        <div class="flex flex-row w-full h-6 mb-2 select-none cursor-grab"
          draggable="true"
          @drop="onDrop($event, index)"
          @dragover.prevent
          @dragenter.prevent
          @dragstart="startDrag($event, index)"
          @click="removeCard(index)"
        >
          <div class="w-6 flex-none bg-transparent">
            {{item.count}}x  
          </div>
          <div class="flex-1 flex items-center justify-between text-black bg-white items-center w-full p-0 m-0">
            <!-- Left Section -->
            <div class="flex items-center">
              <img
                :src="getMiniFrame(item)"
                class="w-[1.6rem] h-full"
              >
            </div>
            <!-- Center Text -->
            <span class="flex-1 text-center">{{ item.name }}</span>
            <!-- Right Section (Blue Circle + Image) -->
            <div class="flex items-center">
              <div class="w-5 h-5 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full text-sm">
                {{ item.cost }}
              </div>
              <img
                :src="getMiniFrame(item)"
                class="w-[1.6rem] h-full scale-x-[-1] translate-x-[10%]"
              >
            </div>
          </div>
        </div>
      </div>
      <!-- this creates an empty drop area below the list -->
      <div class="h-8"
        @drop="onDrop($event, drawList.length-1)"
        @dragover.prevent
        @dragenter.prevent>
      </div>

      <div class="h-[100vh] bg-[#552026]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as R from "ramda";
import { env } from "@/env";
import { onMounted, watch, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCards } from "@/def-composables/useCards";
import {useNotifications} from "@/def-composables/useNotifications";
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
import { uploadImg } from "@/components/utils/utils.js";
import CCInput from "@/components/elements/CCInput/CCInput.vue";
import {
  CardRarity,
  cardTypeToJSON,
  Status,
} from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/card";
import { Card } from "@/model/Card";
import CardviewModal from "@/components/modals/CardviewModal.vue";
import SortDirectionButton from "@/components/elements/SortDirectionButton.vue";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useAddress } from "@/def-composables/useAddress";
import { useQuery } from "@/def-composables/useQuery";
import { useTx } from "@/def-composables/useTx";

const {notifyFail} = useNotifications()
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
const { getCard } = useCards();
const { queryQEncounter, queryQEncounterWithImage, queryQEncounters, queryQEncountersWithImage } = useQuery();

const drawList = ref([]);
let cropImage = ref('');
let encounterName = ref('');
let encounterType = ref('Constructed');
let encounterLevel = ref(0);
let filtersVisible = ref(true);
let dragFrom = -1;
let hqSelected = ref(false);
let cardsAdded = 0;

watch(drawList.value, () => {
  let hq = undefined;
  drawList.value.forEach((item, index) => {
    if (item.type == "Headquarter") {
      if (hq) drawList.value.splice(index, 1)
      else hq = item;
    }
  })
  if (hq) {
    // change filters to cards only matching HQ
    galleryFilters.value.nature = hq.class.Nature;
    galleryFilters.value.mysticism = hq.class.Mysticism;
    galleryFilters.value.technology = hq.class.Technology;
    galleryFilters.value.culture = hq.class.Culture;
    galleryFilters.value.hq = false;
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
  updateCardsAdded();
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
  galleryFilters.value.owner = address;
  galleryFilters.value.status = "playable";[Status.prototype];
  galleryFilters.value.hq = true;

  let filters = pageQueryFromGalleryFilters();

  loadQueryCardList(filters);

  queryQEncounterWithImage(route.query.id)
    .then((res) => {
      cropImage.value = res.encounter.image;
      encounterName = res.encounter.encounter.name;
      
      let parameters = res.encounter.encounter.parameters;
      encounterType = ref(R.find(x => x.key == "type")(parameters).value ?? "Constructed");
      encounterLevel = ref(R.find(x => x.key == "level")(parameters).value ?? "0");

      res.encounter.encounter.Drawlist.forEach(entry => {
        loadCard(entry).then(res => {
          addCardToEncounter(res);
        })
      });
    });
});

const inputFile = (event) => {
  let file = event.target.files[0]; 

  uploadImg(file, env.cardImgMaxKB, (result) => {
    if (result.startsWith("Error")) {
      notifyFail("Failed to Upload", result);
      return;
    }
    cropImage.value = result;
  }, 1920, 1080);
}

const loadCard = async (cardId: number) => {
  let card: Card = await getCard(cardId);
  if (card.Content) {
    return card;
  } else if (!card.owner) {
    console.error("card without content and owner: ", card);
  } else {
    console.error("card without content: ", card);
  }
  return card;
};

const addCardToEncounter = (card: Card) => {
  if (!R.isEmpty(drawList.value) && R.last(drawList.value).id == card.id && card.type != "Headquarter") {
    R.last(drawList.value).count++;
  }
  else {
    let newEntry = {
      id: card.id,
      name: card.CardName,
      cost: card.Delay || card.CastingCost,
      type: card.type,
      class: card.Class,
      count: 1,
      };
    if (card.type != "Headquarter")
      drawList.value.push(newEntry);
    else
      drawList.value.splice(0,0, newEntry);
  }
  updateCardsAdded();
}

const startDrag = (evt, index) => {
  dragFrom = index;
}

const onDrop = (evt, targetIndex) => {
  if (targetIndex == 0) targetIndex = 1;
  drawList.value = R.move(dragFrom, targetIndex, drawList.value);

  let newList = []
  for (let entry of drawList.value) {
    if (R.last(newList) && R.last(newList).id == entry.id) R.last(newList).count += entry.count;
    else newList.push(entry);
  }
  drawList.value.splice(0, drawList.value.length, ...newList);
  updateCardsAdded();
}

const removeCard = (index) => {
  if(drawList.value[index].count == 1)
    drawList.value.splice(index, 1);
  else 
    drawList.value[index].count--;
  updateCardsAdded();
}

const getMiniFrame = (item) => {
  var cardClass = ""
  if (item.type == "Headquarter")
    return "icon/minicardframe/HQFrame.png";
  else {
    if (R.countBy((x) => x === true)(R.values(item.class)).true > 1)
      cardClass = "MultiClass";
    else {
      for (var property in item.class) {
        if (item.class[property] === true) {
          cardClass = property;
          break;
        }
      }
    }
  }
  return "icon/minicardframe/"+item.type+"Frame"+cardClass+".png";
}

const updateCardsAdded = () => {
  cardsAdded = R.reduce(R.add, 0, R.pluck("count", drawList.value));
}

const publish = () => {
  // before publishing check stuff
  if (!hqSelected.value) {
    notifyFail(
      "HQ",
      "An Encounter needs a HQ. Add one please.",
    );
    return;
  }
  if (encounterName === "") {
    notifyFail(
      "Name",
      "An Encounter needs a Name. Add one please.",
    );
    return;
  }

  // unfold drawlist
  let cards = R.flatten( R.map(x => R.repeat(x.id, x.count), drawList.value) )

  let parameters = {type: encounterType, level: encounterLevel}

  encounterCreate(encounterName, cards, parameters, cropImage.value, (res) => {
    console.log("success", res)
  },
  (err) => {
    console.error("err", err)
    notifyFail("Failed to Upload", err.message);
  });
}

</script>
