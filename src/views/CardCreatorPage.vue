<template>
  <div class="bg-pink-950">
    <div class="p-8 text-white text-lg font-normal font-['Roboto']">
      Card Creator
    </div>
    <div
      class="grid grid-cols-3 grid-rows-9 p-8  text-white text-center text-lg font-normal font-['Roboto'] bg-white bg-opacity-20 shadow"
    >
      <!-- Progress Bar -->
      <div class="w-11/12 h-12 col-start-1 col-span-3 mx-auto">
        <div
          class="bg-red-600 bg-red-600 rounded-full h-1 flex items-center justify-between"
        >
          <div
            v-for="(item, idx) in progressBar"
            class="flex justify-between bg-red-600 rounded-full h-1 items-center relative"
            @click="activeStep = idx"
          >
            <div
              v-if="item == 'done' || item == 'active'"
              class="bg-red-600 rounded-full h-6 w-6 rounded-full shadow flex items-center justify-center -ml-2"
            >
              <img
                v-if="item == 'active'"
                src="@/assets/figma/CCLogoSmallInvert.png"
                alt="check"
              />
            </div>
            <div
              v-if="item == 'open'"
              class="bg-white dark:bg-gray-700 h-6 w-6 rounded-full shadow flex items-center justify-center -mr-3 relative"
            >
              <div class="h-3 w-3 bg-red-600 rounded-full rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Class Selection -->
      <div v-if="activeStep==0"
        class="row-start-2 col-start-1 col-span-3"
      >
        <div class="pt-8 p-3 text-xs font-bold">CLASSES</div>
        <div class="text-xs">Select one or multiple classes for your card.</div>

        <div class="flex justify-between">
          <div
            v-for="item in ['Technology', 'Culture', 'Nature', 'Mysticism']"
            class="p-5"
            :class="{ grayscale: model.Class[item] }"
            @click="
              model.Class[item] = !model.Class[item];
            "
          >
            <img class="h-32" :src="'src/assets/figma/' + item + 'Icon.svg'" />
            <div class="p-5 text-xs font-bold uppercase">{{ item }}</div>
          </div>
        </div>
      </div>

      <!-- Type Selection -->
      <div v-if="activeStep==1"
        class="row-start-2 col-start-1 col-span-3">
        <div class="pt-8 p-3 text-xs font-bold">TYPE</div>
        <div class="text-xs">Select the type of card you want.</div>

        <div class="flex justify-between">
          <div
            v-for="item in ['Headquarter', 'Entity', 'Action', 'Place']"
            class="p-5"
            @click="
              model.type = item
            "
          >
            <img v-show="item!==model.type"
              class="scale-[1]"
              :src="'src/assets/figma/' + item + 'Off.png'" />
            <img v-show="item==model.type"
              class="scale-[1]"
              :src="'src/assets/figma/' + item + 'On.png'" />
            <div class="p-5 text-xs font-bold uppercase">{{ item }}</div>
          </div>
        </div>
      </div>

      <!-- Card Name -->
      <div v-if="activeStep==2"
        class="row-start-3 row-span-6 col-start-1 col-span-1 flex"
      >
        <div class="p-8">
          <CardComponent
            id="card"
            :active-step="activeStep"
            :display-notes="true"
            :image-u-r-l="getCardImage()"
            :model="model"
          />
        </div>
        <div class="row-start-3 col-start-2 col-span-2">
          <div class="pt-8 p-3 text-xs font-bold">NAME</div>
          <div class="text-xs">Pick a name for your card.</div>
          <div class="bg-zinc-300 bg-opacity-20 shadow-inner">
            <input
              class=" bg-transparent text-white text-opacity-50 text-xs font-normal font-['Roboto']"
              v-model="model.CardName"
              maxLength="25"
            >
          </div>
        </div>

      </div>


      <!-- Image Upload -->
      <div v-if="activeStep==3"
        @drop.prevent="onDrop"
        @dragover.prevent="dragActive=true; console.log('dragover')"
        @dragleave.prevent="dragActive=false"
        :class="{ 'bg-white bg-opacity-50': dragActive }">


          <div
            v-if="true || artistMode"
            class="creator-input-single-column"
          >
            <label
              v-if="!artistMode"
              class="input--checkbox-label__left"
            >
              <input
                v-model="designateArtist"
                class="input--checkbox__left"
                type="checkbox"
              >
              Designate other Artist (not yourself) <br>
            </label>
            <div
              v-if="designateArtist && !artistMode"
            >
              <span class="creator-text"><b>Address:</b> </span>
              <input
                v-model="artistAddress"
              >
            </div>

            <div
              v-if="!designateArtist || artistMode"
            >
              <span class="creator-text">
                Please upload an image. <br>By uploading you confirm you have the rights to upload this image.
              </span>
            </div>
            <div
              v-if="!designateArtist || artistMode"
            >
              <BaseCCButton>Choose a file without copyright violation
              </BaseCCButton>
              <input
                id="file"
                class="inputfile"
                name="file"
                type="file"
                @change="inputFile"
              >
              <label
                class="button--file"
                for="file"
              >
              </label>
            </div>
        </div>

        <div
          v-if="!designateArtist || artistMode"
        >
          <cropper
            class="cropper"
            :src="cropImage"
            :auto-zoom="true"
            :stencil-size="{
              width: cardBounds.x,
              height: model.fullArt ? cardBounds.y : cardBounds.x
            }"
            :canvas="{
              height: model.fullArt ? cardBounds.y : cardBounds.x,
              width: cardBounds.x
            }"
            :default-size="{
              width: cardBounds.x,
              height: model.fullArt ? cardBounds.y : cardBounds.x,
            }"
            image-restriction="fit-area"
            @change="changeCrop"
          />
        </div>
      </div>



      <!-- Navigation Buttons -->
      <div
        class="row-start-6 col-start-3 flex flex-row space-x-3 justify-end">
        <NavigateCCButtons
          class="scale-150"
          @forward="activeStep = Math.min(activeStep+1, progressBar.length-1)"
          @backward="activeStep = Math.max(activeStep-1, 0)"
         >
        </NavigateCCButtons>

        <BaseCCButton
          :type="ButtonType.RED"
          @click="activeStep = Math.min(activeStep+1, progressBar.length-1)"
        >Next</BaseCCButton>
      </div>


    </div>
  </div>

  <!--

    <div>
      <div
        v-if="!artistMode"
        class="progress-container"
      >
        <div class="progress">
          <div
            :class="classStepPassed(0)"
            @click="activeStep = 0"
          >
            Name, Flavor and Type
          </div>
          <div
            :class="classStepPassed(1)"
            @click="activeStep = 1"
          >
            Artwork
          </div>
          <div
            :class="classStepPassed(2)"
            @click="activeStep = 2"
          >
            Costs and Properties
          </div>
          <div
            :class="classStepPassed(3)"
            @click="activeStep = 3"
          >
            Abilities and Effects
          </div>
          <div
            :class="classStepPassed(4)"
            @click="activeStep = 4"
          >
            Summary and Publish
          </div>
        </div>
      </div>

      <div class="creator">
        <div class="creator-input">
          Name, Flavor and Type section
          <div
            v-if="activeStep == 0 && !artistMode"
            class="creator-input-container ccbutton"
          >

            <span class="creator-text"><b>Name:</b> </span>
            <input
              v-model="model.CardName"
              maxLength="25"
            >

            <span class="creator-text">
              <br><b>Flavor Text:</b>
            </span>
            <input
              v-model="model.FlavourText"
            >

            <span
              v-if="cardRules.Card"
              class="creator-text"
            >
              My <b>type</b> is:
            </span>
            <select
              v-if="cardRules.Card"
              v-model="model.type"
              @change="
                resetAbilities();
              "
            >
              <option
                v-for="val in getTypes()"
                :key="val"
              >
                {{ val }}
              </option>
            </select>


            <div class="creator-text">
              <b>Classes:</b> <br>
            </div>
            <div>
              <label class="input--checkbox-label__left">
                <input
                  v-model="model.Class.Technology"
                  class="input--checkbox__left"
                  type="checkbox"
                >
                Technology <br>
              </label>
              <label class="input--checkbox-label__left">
                <input
                  v-model="model.Class.Nature"
                  class="input--checkbox__left"
                  type="checkbox"
                >
                Nature <br>
              </label>
              <label class="input--checkbox-label__left">
                <input
                  v-model="model.Class.Culture"
                  class="input--checkbox__left"
                  type="checkbox"
                >
                Culture <br>
              </label>
              <label class="input--checkbox-label__left">
                <input
                  v-model="model.Class.Mysticism"
                  class="input--checkbox__left"
                  type="checkbox"
                >
                Mysticism <br>
              </label>
            </div>
          </div>


          <div
            v-if="activeStep == 1 || artistMode"
            class="creator-input-single-column"
          >
            <label
              v-if="!artistMode"
              class="input--checkbox-label__left"
            >
              <input
                v-model="designateArtist"
                class="input--checkbox__left"
                type="checkbox"
              >
              Designate other Artist (not yourself) <br>
            </label>
            <div
              v-if="designateArtist && !artistMode"
            >
              <span class="creator-text"><b>Address:</b> </span>
              <input
                v-model="artistAddress"
              >
            </div>

            <div
              v-if="!designateArtist || artistMode"
            >
              <span class="creator-text">
                Please upload an image. <br>By uploading you confirm you have the rights to upload this image.
              </span>
            </div>
            <div
              v-if="!designateArtist || artistMode"
            >
              <input
                id="file"
                class="inputfile"
                name="file"
                type="file"
                @change="inputFile"
              >
              <label
                class="button--file"
                for="file"
              >Choose a file without copyright violation
              </label>
            </div>
            <div
              v-if="!designateArtist || artistMode"
            >
              <cropper
                class="cropper"
                :src="cropImage"
                :auto-zoom="true"
                :stencil-size="{
                  width: cardBounds.x,
                  height: model.fullArt ? cardBounds.y : cardBounds.x
                }"
                :canvas="{
                  height: model.fullArt ? cardBounds.y : cardBounds.x,
                  width: cardBounds.x
                }"
                :default-size="{
                  width: cardBounds.x,
                  height: model.fullArt ? cardBounds.y : cardBounds.x,
                }"
                image-restriction="fit-area"
                @change="changeCrop"
              />
            </div>


            <div
              v-if="activeStep == 1 && !designateArtist && false"
            >

              <span class="creator-text">
                My <b>beauty</b> must not be covered by borders
              </span>
              <input
                v-model="model.fullArt"
                type="checkbox"
              >
            </div>
            <div
              v-if="artistMode"
              class="creator-nav-container ccbutton"
              align="center"
            >
              <button
                @click="saveSubmit()"
              >
                Update Artwork
              </button>
            </div>
          </div>


          <div
            v-if="activeStep == 2 && !artistMode"
            class="creator-input-container"
          >

            <span
              v-if="cardRules.Card.children[getRulesType()] &&
                cardRules.Card.children[getRulesType()].children.CastingCost"
              class="creator-text"
            >
              <b>Casting Cost:</b>
            </span>
            <div
              v-if="
                cardRules.Card.children[getRulesType()] &&
                  cardRules.Card.children[getRulesType()].children.CastingCost
              "
            >
              <select
                v-model="model.CastingCost"
              >
                <option
                  v-for="n in getGenericCardRange('CastingCost')"
                  :key="n"
                  :value="n"
                >
                  {{ n }}
                </option>
              </select>
              Mana
            </div>

            <div
              v-if="
                cardRules.Card.children[getRulesType()] &&
                  cardRules.Card.children[getRulesType()].children.AdditionalCost
              "
              class="creator-text"
            >
              <input
                v-model="isAdditionalCostVisible"
                type="checkbox"
                class="input--checkbox__right"
                @change="toggleAdditionalCost"
              >
              Special Cost:
            </div>
            <div
              v-if="!isAdditionalCostVisible &&
                cardRules.Card.children[getRulesType()] &&
                cardRules.Card.children[getRulesType()].children.AdditionalCost"
            >

            </div>
            <div
              v-if="isAdditionalCostVisible"
            >
              <select
                @change="setAdditionalCost($event);"
              >
                <option
                  disabled
                  selected="true"
                  value=""
                >
                  Select Special Cost
                </option>
                <option
                  v-for="n in getSpecialCostRange()"
                  :key="n"
                  :value="n"
                >
                  {{ printAdditionalCost(n) }}
                </option>
              </select>

              <span
                v-if="model.AdditionalCost.DiscardCost"
                class="creator-text"
              >
                <select
                  v-model="model.AdditionalCost.DiscardCost.Amount"
                  @change="updateAdditionalCostText();"
                >
                  <option
                    v-for="n in getGenericCostRange('DiscardCost')"
                    :key="n"
                    :value="n"
                  >
                    {{ n }}
                  </option>
                </select>

                cards from your hand.
              </span>

              <span
                v-if="model.AdditionalCost.SacrificeCost"
              >
                <select
                  v-model="model.AdditionalCost.SacrificeCost.Amount"
                  @change="updateAdditionalCostText();"
                >
                  <option
                    v-for="n in getGenericCostRange('SacrificeCost')"
                    :key="n"
                    :value="n"
                  >
                    {{ n }}
                  </option>
                </select>
                Entitites.
              </span>

              <span
                v-if="model.AdditionalCost.VoidCost"
              >
                <select
                  v-model="model.AdditionalCost.VoidCost.Amount"
                  @change="updateAdditionalCostText();"
                >
                  <option
                    v-for="n in getGenericCostRange('VoidCost')"
                    :key="n"
                    :value="n"
                  >
                    {{ n }}
                  </option>
                </select>
                cards from your graveyard.
              </span>
            </div>


            <span
              v-if="model.type === 'Headquarter'"
              class="creator-text"
            >
              <b>Delay</b> of Activation: <br>
            </span>
            <div
              v-if="
                cardRules.Card.children[getRulesType()] &&
                  cardRules.Card.children[getRulesType()].children.Delay
              "
            >
              <span class="creator-text">
                <select
                  v-model="model.Delay"
                >
                  <option
                    v-for="n in getHQDelayRange()"
                    :key="n"
                    :value="n"
                  >
                    {{ n }}
                  </option>
                </select>

                turns.<br>
              </span>
            </div>


            <span
              v-if="model.type === 'Entity' && cardRules.Card.children[getRulesType()]"
              class="creator-text"
            >
              <b>Attack:</b>
            </span>
            <div
              v-if="model.type === 'Entity' && cardRules.Card.children[getRulesType()]"
            >
              <select
                v-model="model.Attack"
              >
                <option
                  v-for="n in getGenericCardRange('Attack')"
                  :key="n"
                  :value="n"
                >
                  {{ n }}
                </option>
              </select>
            </div>


            <span
              v-if="model.type !== 'Action' && cardRules.Card.children[getRulesType()]"
              class="creator-text"
            >
              <b>Defense:</b> <br>
              <br>
            </span>
            <div
              v-if="model.type !== 'Action' && cardRules.Card.children[getRulesType()]"
            >
              <select
                v-model="model.Health"
              >
                <option
                  v-for="n in getGenericCardRange('Health')"
                  :key="n"
                  :value="n"
                >
                  {{ n }}
                </option>
              </select>
            </div>


            <span
              v-if="cardRules.Card"
              class="creator-text"
            >
              <b>Tags:</b> </span>
            <div
              v-if="cardRules.Card"
            >
              <select
                v-model="model.tagDummy"
                class="tag-select"
                @change="updateTags"
              >
                <option
                  v-for="tag in getTags(0)"
                  :key="tag"
                >
                  {{ tag }}
                </option>
              </select>
              <select
                v-if="model.Tags && model.Tags[0]"
                v-model="model.Tags[1]"
                class="tag-select"
                @change="updateTags"
              >
                <option
                  v-for="tag in getTags(1)"
                  :key="tag"
                >
                  {{ tag }}
                </option>
              </select>
              <select
                v-if="model.Tags && model.Tags[1]"
                v-model="model.Tags[2]"
                class="tag-select tag-select-last"
                @change="updateTags"
              >
                <option
                  v-for="tag in getTags(2)"
                  :key="tag"
                >
                  {{ tag }}
                </option>
              </select>
            </div>
          </div>


          <div
            v-if="activeStep == 3 && !artistMode"
          >
            <p>
              In this step, you craft the heart of your card. Press the button to
              add <b>abilities / effects</b> to your card.
            </p>
            <div>
              <div
                v-for="(abilityEntry, index) in abilities"
                :key="abilityEntry.ability"
              >
                <AbilityComponent
                  class="ability-frame"
                  :abilities="abilities"
                  :ability-prop="abilityEntry"
                  :dialog-prop="abilityDialog"
                  :model="model"
                  @update:ability="updateAbility($event, index)"
                />
              </div>
            </div>
            <div v-if="model.type === 'Action'">
              <button
                class="btn btn-abilitycreator"
                type="button"
                @click="showAbilityModal('root')"
              >
                Add Effect
              </button>
            </div>
            <div
              v-else
              class="creator-text"
            >
              <button
                class="btn btn-abilitycreator"
                type="button"
                @click="showAbilityModal('root')"
              >
                Add Ability
              </button>
            </div>
            <div class="ability-modal-container">
              <AbilityModal
                v-if="isAbilityModalVisible"
                :abilities-prop="abilities"
                :ability="ability"
                :dialog-prop="abilityDialog"
                :cardmodel="model"
                @close="closeAbilityModal"
                @update:ability="ability = $event"
              />
            </div>
          </div>


          <div
            v-if="activeStep == 4 && !artistMode"
            class="creator-input-container"
          >
            <span class="creator-text">
              <b>Notes</b> for the Council
            </span>
            <input
              v-model="model.notes"
            >

            <span v-if="address=='cc14km80077s0hch3sh38wh2hfk7kxfau4456r3ej'"
              class="creator-text">
              Balance Anchor 
            </span>
              
            <input
              v-if="address=='cc14km80077s0hch3sh38wh2hfk7kxfau4456r3ej'"
              v-model="model.balanceAnchor"
              type="checkbox"
              class="input--checkbox__right"
            >

          </div>

          <div
            v-if="activeStep == 4 && mode == Mode.EDIT && !abilities"
            class="creator-input-container"
          >
            <span class="creator-text">
              Clear Abilities
            </span>
            <div>
              <input
                v-model="clearAbilities"
                type="checkbox"
              >
            </div>
          </div>


          <div
            v-if="!artistMode"
            class="creator-nav-container ccbutton"
            align="center"
          >
            <button
              v-if="activeStep > 0"
              class="back"
              @click="activeStep--"
            >
              Go Back
            </button>
            <button
              v-if="activeStep < 4"
              @click="activeStep++"
            >
              Next Step >
            </button>
            <button
              v-if="activeStep == 4 && this.mode == Mode.CREATE"
              @click="showBuyFrameModal"
            >
              Buy a Card Frame
            </button>
            <button
              v-if="activeStep == 4 && this.mode == Mode.CREATE"
              @click="saveSubmit()"
            >
              Publish Your Card
            </button>

            <button
              v-if="activeStep == 4 && this.mode == Mode.EDIT"
              @click="saveSubmit()"
            >
              Update Your Card
            </button>

            <button
              v-if="activeStep == 4 && this.mode == Mode.EDIT"
              @click="resetCard()"
            >
              Discard Changes
            </button>

            <button
              v-show="activeStep == 4 && this.mode == Mode.CREATE"
              @click="resetCard()"
            >
              Discard Draft
            </button>
          </div>
        </div>
        <div class="creator-preview">
          <CardComponent
            id="card"
            :active-step="activeStep"
            :display-notes="true"
            :image-u-r-l="getCardImage()"
            :model="model"
          />
        </div>
      </div>
      <div class="ability-modal-container">
        <BuyFrameModal
          v-if="isBuyFrameModalVisible"
          @close="closeBuyFrameModal"
        />
      </div>
    </div>
  </div>
  -->
</template>

<script lang="ts">
import * as R from "ramda";

import mergeImages from "merge-images";
import CardComponent from "../components/elements/CardComponent.vue";
import BuyFrameModal from "../components/modals/BuyFrameModal.vue";
import AbilityModal from "../components/modals/AbilityModal.vue";
import AbilityComponent from "../components/elements/AbilityComponent.vue";
import { env } from "@/env";

import { atPath, uploadImg } from "@/components/utils/utils.js";

import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { Card } from "@/model/Card";
import { useCardCreatorCards } from "@/def-composables/useCardCreatorCards";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useCardsRules } from "@/def-composables/useCardRules";
import { useAddress } from "@/def-composables/useAddress";
import { useTx } from "@/def-composables/useTx";
import { useNotifications } from "@/def-composables/useNotifications";
import { validAddress } from "@/utils/validation";
import { useQuery } from "@/def-composables/useQuery";
import { isASCII } from "@/utils/utils";

import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";
import NavigateCCButtons from "@/components/elements/CCButton/NavigateCCButtons.vue";

const { saveCardContent, addArtwork } = useTx();
const { queryQUser } = useQuery();

enum Mode {
  EDIT = 0,
  CREATE = 1,
}

export default {
  name: "CardCreator",
  components: {
    NavigateCCButtons,
    BaseCCButton,
    CardComponent,
    AbilityComponent,
    BuyFrameModal,
    AbilityModal,
    Cropper,
  },
  data() {
    return {
      progressBar: [
        "done",
        "done",
        "active",
        "open",
        "open",
        "open",
        "open",
        "open",
      ],
      dragActive: false,
      isAbilityModalVisible: false,
      isBuyFrameModalVisible: false,
      isAdditionalCostVisible: false,
      clearAbilities: false,
      activeStep: 0,
      ability: {},
      abilities: [],
      abilityDialog: {},
      model: new Card(),
      artistMode: false,
      designateArtist: false,
      artistAddress: "cc1...",
      cardBounds: { x: env.cardImgSizeX, y: env.cardImgSizeY },
      cropImage: "",
      cardID: 0,
      mode: Mode.CREATE,
      Mode: Mode,
    };
  },
  setup() {
    const { editCard, draft } = useCardCreatorCards();
    const { loggedIn } = useLoggedIn();
    const { rules } = useCardsRules();
    const { address } = useAddress();
    const { notifyInfo, notifyFail } = useNotifications();

    return {
      cardCreatorEditCard: editCard.card,
      cardCreatorDraft: draft.card,
      cardRules: rules,
      loggedIn,
      address,
      notifyInfo,
      notifyFail,
    };
  },
  computed: {
    ButtonType() {
      return ButtonType
    }
  },
  watch: {
    activeStep() {
      this.progressBar.forEach((item, idx) => {
        this.progressBar[idx] = idx > this.activeStep ? "open" : idx < this.activeStep ? "done" : "active"
      })
    },
    model() {
      if (this.mode === Mode.EDIT) {
        this.cardCreatorEditCard = this.model;
      } else {
        this.cardCreatorDraft = this.model;
      }
      this.setMode();
    },
  },
  mounted() {
    console.log("print model after mounted", this.model);
    if (!this.loggedIn) {
      this.notifyInfo("Not logged in", "You must login to create a card.");
    }

    if (!this.cardRules) {
      // here comes a synchronous wait and it is intended
      const end = Date.now() + 1000;
      while (Date.now() < end && !this.cardRules.Card) continue;

      // if waiting did not help, route back to / (without cardRules.Card this page makes no sense)
      if (!this.cardRules)
        this.notifyFail(
          "CardRules",
          "CardRules were not properly loaded. This is really bad."
        );
      this.$router.push("/");
    } else {
      console.log("cardRules:", this.cardRules);
    }

    this.setMode();

    // here a card is loaded if edit card via gallery was selected
    if (this.mode == Mode.EDIT) {
      this.model = this.cardCreatorEditCard;
      if (!this.model.AdditionalCost) this.model.AdditionalCost = {};
      console.log("edit card: ", this.model);

      this.cropImage = this.model.image;

      if (this.model.Tags[0]) this.model.tagDummy = this.model.Tags[0];

      this.designateArtist = this.model.artist != this.model.owner;
      if (this.designateArtist) {
        this.artistAddress = this.model.artist;
        if (this.artistAddress === this.address) this.artistMode = true;
      }
      return;
    } else {
      this.model = this.cardCreatorDraft;
      console.log("loaded model:", this.model, R.is(Object, this.model));

      if (this.model.image) {
        this.cropImage = this.cardCreatorDraft.image;
      }
    }
  },
  methods: {
    getHQDelayRange() {
      return R.range(
        this.cardRules.Card.children[this.getRulesType()].children.Delay.min ||
          0,
        this.cardRules.Card.children[this.getRulesType()].children.Delay.max + 1
      );
    },
    getGenericCostRange(key: string) {
      return R.range(
        this.cardRules.Card.children[this.getRulesType()].children
          .AdditionalCost.children[key].children.Amount.min || 0,
        this.cardRules.Card.children[this.getRulesType()].children
          .AdditionalCost.children[key].children.Amount.max + 1
      );
    },
    getSpecialCostRange() {
      return R.keys(
        this.cardRules.Card.children[this.getRulesType()].children
          .AdditionalCost.children
      );
    },
    getGenericCardRange(key: string): number[] {
      let range: number[] = [];
      for (
        let i =
          this.cardRules.Card.children[this.getRulesType()].children[key].min ||
          0;
        i <
        this.cardRules.Card.children[this.getRulesType()].children[key].max + 1;
        i++
      ) {
        range.push(i);
      }
      return range;
    },
    setMode() {
      if (this.cardCreatorEditCard.isEditCard()) {
        this.mode = Mode.EDIT;
      } else {
        this.mode = Mode.CREATE;
      }
    },
    changeCrop({ canvas }) {
      mergeImages(["/BG.png", canvas.toDataURL("image/jpeg", 0.9)]).then(
        (b64) => {
          this.srcToFile(b64, "image.jpg", "image/jpeg").then((file) => {
            uploadImg(file, env.cardImgMaxKB, (result) => {
              if (result.startsWith("Error")) {
                this.notifyFail("Failed to Upload", result);
                return;
              }
              this.model.image = result;
            });
          });
        }
      );
    },
    srcToFile(src, fileName, mimeType) {
      return fetch(src)
        .then(function (res) {
          return res.arrayBuffer();
        })
        .then(function (buf) {
          return new File([buf], fileName, { type: mimeType });
        });
    },
    toggleAdditionalCost() {
      if (!this.isAdditionalCostVisible) {
        this.model.AdditionalCost = {};
      }
    },
    setAdditionalCost(event) {
      this.model.AdditionalCost = {};
      this.model.AdditionalCost[event.target.value] = {
        Amount: 0,
      };
      this.updateAdditionalCostText();
    },
    printAdditionalCost(wholeString) {
      let countUppers = (x) =>
        R.sum(R.map((x) => (x === R.toUpper(x) ? 1 : 0), R.split("", x)));

      let printString = "";
      while (
        countUppers(printString) < 2 &&
        printString.length < wholeString.length
      ) {
        printString = R.take(printString.length + 1, wholeString);
      }

      return printString.length > 1 ? R.dropLast(1, printString) : "";
    },
    showBuyFrameModal() {
      if (!this.address) {
        this.notifyFail(
          "Unable to buy Card Frame",
          "You must be logged in with an activated account for this."
        );
      } else this.isBuyFrameModalVisible = true;
    },
    closeBuyFrameModal() {
      this.isBuyFrameModalVisible = false;
    },
    showAbilityModal(type) {
      let atRules = R.curry(atPath)(this.cardRules.Card);

      this.isAbilityModalVisible = true;

      if (type === "root") {
        if (this.abilities.length >= 3) {
          this.notifyFail(
            "Number of Abilities",
            "A card can only have a maximum of 3 Abilities."
          );
          this.isAbilityModalVisible = false;
          return;
        }
        if (this.model.type === "no type" || this.model.type === undefined) {
          this.notifyFail(
            "No Type",
            "Card has no type, please pick a type before setting abilities."
          );
          this.isAbilityModalVisible = false;
          return;
        }

        let newAbility = {
          path: [
            "children",
            this.getRulesType(),
            "children",
            this.getRulesType() === "Action" ? "Effects" : "Abilities",
            "children",
            this.getRulesType() === "Action" ? "Effect" : "Ability",
            "children",
          ],
        };

        let options = atRules(newAbility.path);

        let dialog = {
          title: this.model.type === "Action" ? "New Effect" : "New Ability",
          description: atRules(R.dropLast(1, newAbility.path)).description,
          type: "root",
          options: options,
          rulesPath: newAbility.path,
          abilityPath: [],
        };

        console.log("dialog", dialog);

        // this is the bugfix for replay selection bug
        R.forEachObjIndexed(function (option) {
          if (option.selected) delete option.selected;
        }, dialog.options);

        this.abilityDialog = dialog;
      } else {
        console.error("modal type unknown: ", type);
      }
    },
    closeAbilityModal() {
      console.log("ability after close modal: ", this.ability);
      this.isAbilityModalVisible = false;
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
    updateAbility($event, index) {
      this.ability = $event;
      this.abilities[index] = $event;

      // this is the delete case
      if ($event === null) {
        this.abilities.splice(index, 1);
      }
      console.log("abilities after update", this.abilities);

      let keywordCount = R.length(
        R.flatten(R.pluck("keywords", this.abilities))
      );
      if (keywordCount >= 6 && keywordCount <= 8) {
        this.notifyInfo(
          "Number of Keywords",
          "You have added " +
            keywordCount +
            " Keywords to this card. 8 is the maximum."
        );
      } else if (keywordCount > 8) {
        this.notifyFail(
          "Number of Keywords",
          "You have added more than 8 Keywords to this card. Please limit to 8."
        );
      }

      this.updateRulesTexts();
    },
    updateRulesTexts() {
      this.model.Keywords = R.pluck("keywords", this.abilities);
      this.model.RulesTexts = R.map(
        this.interactionTextToString,
        this.abilities
      );

      this.updateAdditionalCostText();
    },
    updateAdditionalCostText() {
      let setOrPrepend = (text) => {
        if (
          this.model.RulesTexts[0] &&
          R.equals("Extra", R.take(5, this.model.RulesTexts[0]))
        )
          this.model.RulesTexts[0] = text;
        else this.model.RulesTexts = R.prepend(text, this.model.RulesTexts);
      };

      if (this.model.AdditionalCost && !R.isEmpty(this.model.AdditionalCost)) {
        if (this.model.AdditionalCost.SacrificeCost) {
          let text =
            "Extra Cost - Sacrifice " +
            this.model.AdditionalCost.SacrificeCost.Amount +
            " Entity.";
          setOrPrepend(text);
        } else if (this.model.AdditionalCost.DiscardCost) {
          let text =
            "Extra Cost - Discard " +
            this.model.AdditionalCost.DiscardCost.Amount +
            " Card.";
          setOrPrepend(text);
        } else if (this.model.AdditionalCost.VoidCost) {
          let text =
            "Extra Cost - Void " +
            this.model.AdditionalCost.VoidCost.Amount +
            " Card.";
          setOrPrepend(text);
        }
      } else {
        if (
          this.model.RulesTexts[0] &&
          R.equals("Extra", R.take(5, this.model.RulesTexts[0]))
        )
          this.model.RulesTexts = R.drop(1, this.model.RulesTexts);
      }
    },
    getCardImage() {
      return this.model.image;
    },
    resetAbilities() {
      this.abilities = [];
    },
    getRulesType() {
      //return this.model.type === "Headquarter" ? "Headquarter" : this.model.type;
      return this.model.type;
    },
    getTypes() {
      return R.keys(this.cardRules.Card.children);
    },
    getTags(idx) {
      if (this.cardRules.Card) {
        let usedTags = [];
        let allTags =
          this.cardRules.Card.children.Action.children.Tags.children.Tag.enum;
        if (this.model.Tags[idx]) {
          // all tags already used except self
          usedTags = R.without(this.model.Tags[idx], this.model.Tags);
        }
        // if this is the last dropdown, allow to select nothing
        if (R.length(R.filter((x) => x, this.model.Tags)) === idx + 1) {
          return R.append("", R.without(usedTags, allTags));
        } else {
          // otherwise nothing is not an option (user must remove the last tag and not one in the middle)
          return R.without(usedTags, allTags);
        }
      } else {
        console.error("shit cardschema not available");
        return [];
      }
    },
    updateTags() {
      if (!this.model.Tags) {
        this.model.Tags = [];
      }
      this.model.Tags.splice(0, 1, this.model.tagDummy);
    },
    interactionTextToString(ability) {
      console.log("converting ability:", ability);
      let string = "";
      ability.interaction.forEach((entry) => {
        if (entry.btn.type !== "expandArray")
          string += entry.pre + entry.btn.label + entry.post;
      });
      return string;
    },
    saveSubmit() {
      // if the artist is just uploading a new image, this is easy:
      if (this.artistMode) {
        if (!this.model.image) {
          this.notifyFail(
            "No Image",
            "Card has no image, please upload an image."
          );
          return;
        }
        addArtwork(
          this.model.id,
          this.model.image,
          this.model.fullArt,
          this.resetCard,
          (err) => {
            this.notifyFail("Update Artwork failed", err);
            console.error(err);
          }
        );
        return;
      }

      // otherwise: check all things that must be entered:
      if (!this.model.CardName) {
        this.notifyFail("No Name", "Card has no name, please enter a name.");
        return;
      }
      if (!this.model.type || this.model.type === "no type") {
        this.notifyFail("Wrong Type", "please pick a type");
        return;
      }
      if (!this.designateArtist && !this.model.image) {
        this.notifyFail(
          "No Image",
          "Card has no image, please upload an image."
        );
        return;
      }
      if (
        this.designateArtist &&
        !this.$cardChain.validAddress(this.artistAddress)
      ) {
        this.notifyFail(
          "Invalid Address",
          "The address given for designated artist is invalid."
        );
        return;
      }
      if (this.designateArtist && !validAddress(this.artistAddress)) {
        this.notifyFail(
          "Invalid Address",
          "The address given for designated artist is invalid."
        );
        return;
      }
      if (!this.model.Tags[0]) {
        this.notifyFail(
          "No Tags",
          "Card has no Tag, please pick at least one tag."
        );
        return;
      }
      if (!this.model.FlavourText[0] && !this.abilities) {
        this.notifyFail(
          "No Flavor Text",
          "Card has no flavor text and no abilities, please enter something."
        );
        return;
      }
      if (R.length(R.flatten(R.pluck("keywords", this.abilities))) > 8) {
        this.notifyFail(
          "Too many Keywords",
          "Card has too many Keywords. You must reduce to 8 or less."
        );
        return;
      }
      // in the following part we check things that are only required for specific card types
      if (this.model.type !== "Headquarter") {
        if (R.isNil(this.model.CastingCost) || this.model.CastingCost < 0) {
          this.notifyFail(
            "No Cost",
            "Card has no Casting Cost, please pick a number."
          );
          return;
        }
      }
      if (this.model.type !== "Action") {
        if (R.isNil(this.model.Health)) {
          this.notifyFail(
            "No Health",
            "Card has no Health, please pick a number."
          );
          return;
        }
      }
      if (this.model.type === "Entity") {
        if (R.isNil(this.model.Attack)) {
          this.notifyFail(
            "No Attack",
            "Card has no Attack, please pick a number."
          );
          return;
        }
      }

      // finalize abilties or effects
      // this should potentially moved to somewhere else? maybe where abilities are saved
      let newModel = this.model;

      if (this.model.type !== "Action") {
        // check if the old abilities should be restored
        if (
          this.mode == Mode.EDIT &&
          !this.clearAbilities &&
          R.isEmpty(this.abilities)
        ) {
          newModel.Abilities = R.clone(this.cardCreatorEditCard.Abilities);
        }
        // this writes the relevant part of the abilities in the new model
        else {
          newModel.Abilities = R.map(
            R.pick(
              R.keys(
                this.cardRules.Card.children.Entity.children.Abilities.children
                  .Ability.children
              )
            ),
            this.abilities
          );
        }
      } else if (this.model.type === "Action") {
        // check if the old effects should be restored
        if (
          this.mode == Mode.EDIT &&
          !this.clearAbilities &&
          R.isEmpty(this.abilities)
        ) {
          newModel.Effects = R.clone(this.cardCreatorEditCard.Effects);
        }
        // this writes the relevant part of the effects in the new model
        else {
          newModel.Effects = R.map(
            R.pick(
              R.keys(
                this.cardRules.definitions.Card.children.Action.children.Effects
                  .children.Effect.children
              )
            ),
            this.abilities
          );
        }
      }

      // check if the old Keywords and RulesTexts should be restored
      let checkZeroAmount = () => {
        return (
          (this.model.AdditionalCost.SacrificeCost &&
            this.model.AdditionalCost.SacrificeCost.Amount == 0) ||
          (this.model.AdditionalCost.DiscardCost &&
            this.model.AdditionalCost.DiscardCost.Amount == 0) ||
          (this.model.AdditionalCost.VoidCost &&
            this.model.AdditionalCost.VoidCost.Amount == 0)
        );
      };
      if (
        this.mode == Mode.EDIT &&
        !this.clearAbilities &&
        R.isEmpty(this.abilities)
      ) {
        newModel.Keywords = this.cardCreatorEditCard.Keywords;
        newModel.RulesTexts = this.cardCreatorEditCard.RulesTexts;

        if (this.isAdditionalCostVisible) {
          if (checkZeroAmount()) {
            this.model.AdditionalCost = {};
          }
          this.updateAdditionalCostText();
        }
      } else {
        if (checkZeroAmount()) {
          this.model.AdditionalCost = {};
        }
        this.updateRulesTexts();
      }

      newModel.image = this.model.image;
      newModel.balanceAnchor = this.model.balanceAnchor;

      let checkASCII = (string, origin) => {
        string.split("").forEach((char) => {
          if (!isASCII(char)) {
            console.error("char " + char + " is not ASCII compatible.");
            this.notifyFail(
              "INVALID CHARACTER",
              "You used symbol " +
                char +
                " in " +
                origin +
                " and it is not supported."
            );
          }
        });
      };

      checkASCII(newModel.FlavourText, "Flavour Text");
      checkASCII(newModel.CardName, "Card Name");

      let newCard = newModel.toChainCard();
      newCard.artist = this.designateArtist ? this.artistAddress : this.address;
      console.log("newCard", newCard);

      // check if a card is edited with pre-existing ID
      if (this.mode == Mode.EDIT) {
        let handleErr = (err) => {
          this.notifyFail("Update Card failed", err);
          console.error(err);
        };

        saveCardContent(this.model.id, newCard, this.resetCard, handleErr);
        if (!this.designateArtist)
          addArtwork(
            this.model.id,
            newCard.image,
            newCard.fullArt,
            this.resetCard,
            handleErr
          );
      } else if (!this.address) {
        this.notifyFail(
          "Unable publish Card",
          "You must be logged in with an activated account!"
        );
      } else {
        queryQUser(this.address)
          .then((res: User) => {
            if (R.isEmpty(res.ownedCardSchemes)) {
              this.notifyFail(
                "YOU MUST CONSTRUCT ADDITIONAL PYLONS",
                "You don't own any Card Frames. Please buy one before publishing."
              );
              throw new Error(
                "account " + this.address + " does not own Card Frames"
              );
            } else {
              let id = +res.ownedCardSchemes[0];
              let handleErr = (err) => {
                this.notifyFail("Publish Card failed", err);
                console.error(err);
              };

              saveCardContent(id, newCard, this.resetCard, handleErr);
              if (!this.designateArtist)
                addArtwork(
                  id,
                  newCard.image,
                  newCard.fullArt,
                  this.resetCard,
                  handleErr
                );
            }
          })
          .catch((err) => {
            console.error(err);
            this.notifyFail("Publish Card failed", err);
          });
      }
    },
    resetCard() {
      this.model = new Card();
      this.artistMode = false;
      this.cropImage = "";
    },
    onDrop(event) {
      console.log("ondrop worked")
      let file = event.dataTransfer.files[0];

      uploadImg(file, env.cardImgMaxKB, (result) => {
        if (result.startsWith("Error")) {
          this.notifyFail("Failed to Upload", result);
          return;
        }
        this.cropImage = result;
      });
    },
    inputFile(event) {
      let file = event.target.files[0];

      uploadImg(file, env.cardImgMaxKB, (result) => {
        if (result.startsWith("Error")) {
          this.notifyFail("Failed to Upload", result);
          return;
        }
        this.cropImage = result;
      });
    },
    classStepPassed(n) {
      let exportClass = "progress-item";

      if (this.activeStep > n) {
        if (
          n === 0 &&
          this.model.CardName &&
          this.model.CardName !== "Name" &&
          this.model.image
        )
          exportClass += " progress-item-finished";
        else if (
          n === 1 &&
          this.model.Tags[0] &&
          this.model.type &&
          this.model.type !== "no type"
        )
          exportClass += " progress-item-finished";
        else if (n === 2) {
          if (
            this.model.type !== "Headquarter" &&
            (R.isNil(this.model.CastingCost) || this.model.CastingCost < 0)
          )
            return exportClass;
          if (this.model.type !== "Action" && R.isNil(this.model.Health))
            return exportClass;
          if (this.model.type === "Entity" && R.isNil(this.model.Attack))
            return exportClass;

          exportClass += " progress-item-finished";
        } else if (n === 3) {
          exportClass += " progress-item-finished";
        }
      } else if (this.activeStep === n) {
        exportClass += " progress-item-current";
      }
      return exportClass;
    },
  },
};
</script>
