<template>
  <div class="card-generator-container">
    <h2 class="header__h2">
      Card Creator
    </h2>
    <p class="header__p">
      With our card creator, you can design and craft your own cards by
      following a simple step-by-step wizard which takes you through the whole
      process.
    </p>
    <br>
    <div>
      <div class="progress-container">
        <div class="progress">
          <div
            :class="classStepPassed(0)"
            @click="activeStep = 0"
          >
            Name, Artwork and Flavor
          </div>
          <div
            :class="classStepPassed(1)"
            @click="activeStep = 1"
          >
            Type, Tags and Class
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
          <div
            v-if="activeStep == 0"
            class="creator-input-container ccbutton"
          >
            <!-- Name -->
            <span class="creator-text">Hey, my <b>name</b> is</span>
            <input
              v-model="model.CardName"
              @change="saveDraft"
            >
            <!-- Artwork -->
            <span class="creator-text">
              Everybody needs a <b>face</b>, so do I. Please upload an image. By uploading you confirm you have the rights to upload this image.
            </span>

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
            >Choose a file without copyright violation</label>
          </div>
          <div
            v-if="activeStep == 0"
          >
            <cropper
              class="cropper"
              :src="cropImage"
              :auto-zoom="true"
              :stencil-size="{
                width: 838,
                height: model.fullArt ? 1300 : 838
              }"
              :canvas="{
                height: model.fullArt ? 1300 : 838,
                width: 838
              }"
              :default-size="{
                width: 838,
                height: model.fullArt ? 1300 : 838,
              }"
              image-restriction="fit-area"
              @change="changeCrop"
            />
          </div>
          <div
            v-if="activeStep == 0"
          >
            <!-- FullArt -->
            <span class="creator-text">
              My <b>beauty</b> must not be covered by borders
            </span>
            <input
              v-model="model.fullArt"
              type="checkbox"
              @change="saveDraft()"
            >
          </div>
          <div
            v-if="activeStep == 0"
            class="creator-input-container"
          >
            <!-- Flavor -->
            <span class="creator-text">
              <br>My <b>flavor</b> is best expressed by the following sentences:
            </span>
            <input
              v-model="model.FlavourText"
              @change="saveDraft"
            >
          </div>

          <div
            v-if="activeStep == 1"
            class="creator-input-container"
          >
            <!-- Classes -->
            <div class="creator-text">
              My <b>Classes</b> are: <br>
            </div>
            <div>
              <label class="input--checkbox-label__left">
                <input
                  v-model="model.Class.Technology"
                  class="input--checkbox__left"
                  type="checkbox"
                  @change="saveDraft"
                >
                Technology <br>
              </label>
              <label class="input--checkbox-label__left">
                <input
                  v-model="model.Class.Nature"
                  class="input--checkbox__left"
                  type="checkbox"
                  @change="saveDraft"
                >
                Nature <br>
              </label>
              <label class="input--checkbox-label__left">
                <input
                  v-model="model.Class.Culture"
                  class="input--checkbox__left"
                  type="checkbox"
                  @change="saveDraft"
                >
                Culture <br>
              </label>
              <label class="input--checkbox-label__left">
                <input
                  v-model="model.Class.Mysticism"
                  class="input--checkbox__left"
                  type="checkbox"
                  @change="saveDraft"
                >
                Mysticism <br>
              </label>
            </div>

            <!-- Type -->
            <span
              v-if="$cardRules"
              class="creator-text"
            >
              My <b>type</b> is
            </span>
            <select
              v-if="$cardRules"
              v-model="model.type"
              @change="
                resetAbilities();
                saveDraft();
              "
            >
              <option
                v-for="val in getTypes()"
                :key="val"
              >
                {{ val }}
              </option>
            </select>

            <!-- Tag -->
            <span
              v-if="$cardRules"
              class="creator-text"
            >
              People like to <b>tag</b> me as</span>
            <div
              v-if="$cardRules"
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
            v-if="activeStep == 2"
            class="creator-input-container"
          >
            <!-- Mana Cost -->
            <div>
              <span
                v-if="$cardRules.children[getRulesType()] &&
                  $cardRules.children[getRulesType()].children.CastingCost"
                class="creator-text"
              >As I am quite awesome to get me rolling you need to
                <b>pay</b>:
              </span>
            </div>
            <div
              v-if="
                $cardRules.children[getRulesType()] &&
                  $cardRules.children[getRulesType()].children.CastingCost
              "
            >
              <select
                v-model="model.CastingCost"
                @change="saveDraft"
              >
                <option
                  v-for="n in R.range(
                    $cardRules.children[getRulesType()].children.CastingCost.min || 0,
                    $cardRules.children[getRulesType()].children.CastingCost.max + 1
                  )"
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
                $cardRules.children[getRulesType()] &&
                  $cardRules.children[getRulesType()].children.AdditionalCost
              "
            >
              Special cost:
              <input
                v-model="isAdditionalCostVisible"
                type="checkbox"
                class="input--checkbox__right"
                @change="toggleAdditionalCost"
              >
            </div>

            <div>
              <div
                v-if="isAdditionalCostVisible"
              >
                To spawn me you need to
                <select
                  @change="setAdditionalCost($event); saveDraft();"
                >
                  <option
                    disabled
                    selected="true"
                    value=""
                  >
                    Select Special Cost
                  </option>
                  <option
                    v-for="n in R.keys(
                      $cardRules.children[getRulesType()].children.AdditionalCost.children
                    )"
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
                    @change="updateAdditionalCostText(); saveDraft();"
                  >
                    <option
                      v-for="n in R.range(
                        $cardRules.children[getRulesType()].children.AdditionalCost.children.DiscardCost.children.Amount.min || 0,
                        $cardRules.children[getRulesType()].children.AdditionalCost.children.DiscardCost.children.Amount.max + 1
                      )"
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
                    @change="updateAdditionalCostText(); saveDraft();"
                  >
                    <option
                      v-for="n in R.range(
                        $cardRules.children[getRulesType()].children.AdditionalCost.children.SacrificeCost.children.Amount.min || 0,
                        $cardRules.children[getRulesType()].children.AdditionalCost.children.SacrificeCost.children.Amount.max + 1
                      )"
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
                    @change="updateAdditionalCostText(); saveDraft();"
                  >
                    <option
                      v-for="n in R.range(
                        $cardRules.children[getRulesType()].children.AdditionalCost.children.VoidCost.children.Amount.min || 0,
                        $cardRules.children[getRulesType()].children.AdditionalCost.children.VoidCost.children.Amount.max + 1
                      )"
                      :key="n"
                      :value="n"
                    >
                      {{ n }}
                    </option>
                  </select>
                  cards from your graveyard.
                </span>
              </div>
            </div>

            <!-- HQ Delay -->
            <div v-if="model.type === 'Headquarter'">
              <span class="creator-text">

                As I am quite awesome, I can use my abilities after a <b>Delay</b> of <br>
              </span>
            </div>
            <div
              v-if="
                $cardRules.children[getRulesType()] &&
                  $cardRules.children[getRulesType()].children.Delay
              "
            >
              <span class="creator-text">
                <select

                  v-model="model.Delay"
                  @change="saveDraft"
                >
                  <option
                    v-for="n in R.range(
                      $cardRules.children[getRulesType()].children.Delay.min || 0,
                      $cardRules.children[getRulesType()].children.Delay.max + 1
                    )"
                    :key="n"
                    :value="n"
                  >
                    {{ n }}
                  </option>
                </select>

                turns.<br>
              </span>
            </div>

            <!-- Attack & Health -->
            <div>
              <span v-if="model.type === 'Entity'">
                I have an <b>Attack</b> of <br>
                <br>
              </span>

              <span v-if="model.type === 'Entity'"> and </span>
              <span v-if="model.type !== 'Action'">
                I have a <b>Defense</b> of <br>
                <br>
              </span>
            </div>
            <div>
              <div>
                <div
                  v-if="model.type === 'Entity' && $cardRules.children[getRulesType()]"
                >
                  <select
                    v-model="model.Attack"
                    @change="saveDraft"
                  >
                    <option
                      v-for="n in R.range(
                        $cardRules.children[getRulesType()].children.Attack.min || 0,
                        $cardRules.children[getRulesType()].children.Attack.max + 1
                      )"
                      :key="n"
                      :value="n"
                    >
                      {{ n }}
                    </option>
                  </select>
                  <br>
                  <br>
                </div>

                <select
                  v-if="
                    model.type !== 'Action' && $cardRules.children[getRulesType()]
                  "
                  v-model="model.Health"
                  @change="saveDraft"
                >
                  <option
                    v-for="n in R.range(
                      $cardRules.children[getRulesType()].children.Health.min || 0,
                      $cardRules.children[getRulesType()].children.Health.max + 1
                    )"
                    :key="n"
                    :value="n"
                  >
                    {{ n }}
                  </option>
                </select>
              </div>
            </div>
          </div>


          <div
            v-if="activeStep == 3"
          >
            <!-- Abilities -->
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
            v-if="activeStep == 4"
            class="creator-input-container"
          >
            <p>
              Uh, uh, uh. I like my looks, i like my feels, let us get some
              victorieeessss. Seriously, thanks for creating and being part of the
              community. Be brave and publish me! P.S. I would like to give the
              council the following <b>notes</b> for this card (optional):
            </p>
            <input
              v-model="model.notes"
              @change="saveDraft"
            >
          </div>

          <div v-if="activeStep == 4 && isEditCardMode() && R.isEmpty(abilities)">
            Clear Abilities of this card
            <input
              v-model="clearAbilities"
              type="checkbox"
            >
          </div>

          <div
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
              v-if="activeStep == 4 && !model.id"
              @click="showBuyFrameModal"
            >
              Buy a Card Frame
            </button>
            <button
              v-if="activeStep == 4 && !model.id"
              @click="saveSubmit()"
            >
              Publish Your Card
            </button>

            <button
              v-if="activeStep == 4 && model.id"
              @click="saveSubmit()"
            >
              Update Your Card
            </button>

            <button
              v-if="activeStep == 4 && model.id"
              @click="resetCard()"
            >
              Discard Changes
            </button>

            <button
              v-show="activeStep == 4"
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
            :image-u-r-l="getCardImage"
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
</template>

<script>
import * as R from "ramda";

import mergeImages from 'merge-images';
import CardComponent from "../components/elements/CardComponent";
import BuyFrameModal from "../components/modals/BuyFrameModal.vue";
import AbilityModal from "../components/modals/AbilityModal.vue";
import AbilityComponent from "../components/elements/AbilityComponent.vue";

import {
  atPath,
  emptyCard,
  uploadImg,
} from "@/components/utils/utils.js";

import { sampleGradientImg } from '../components/utils/sampleCards.js'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';


export default {
  name: "NewCardPage",
  components: { CardComponent, AbilityComponent, BuyFrameModal, AbilityModal, Cropper },
  data() {
    return {
      isAbilityModalVisible: false,
      isBuyFrameModalVisible: false,
      isAdditionalCostVisible: false,
      clearAbilities: false,
      activeStep: 0,
      ability: {},
      abilities: [],
      abilityDialog: {},
      cropImage: sampleGradientImg,
      model: R.clone(emptyCard),
      cardID: 0,
    };
  },
  computed: {
    getCardImage() {
      return this.$store.getters[this.isEditCardMode()
            ? "getCardCreatorEditCard"
            : "getCardCreatorDraft"].image
    },
  },
  mounted() {
    if (!this.$store.getters["getLoggedIn"]) {
      this.notifyInfo('Not logged in', 'You must login to create a card.')
    }

    if (!this.$cardRules) {
      // here comes a synchronous wait and it is intended
      const end = Date.now() + 1000
      while (Date.now() < end && !this.$cardRules) continue

      // if waiting did not help, route back to / (without $cardRules this page makes no sense)
      if (!this.$cardRules)
        this.notifyFail("CardRules", "CardRules were not properly loaded. This is really bad.")
        this.$router.push("/");
    } else {
      console.log("cardRules:", this.$cardRules);
    }

    // here a card is loaded if edit card via gallery was selected
    if (this.isEditCardMode()) {
      console.log("edit card: ", this.$store.getters['getCardCreatorEditCard']);
      this.model = R.merge(
        this.model,
        this.$store.getters['getCardCreatorEditCard']
      );

      this.cropImage = this.$store.getters['getCardCreatorEditCard'].image

      if (this.model.Tags[0])
        this.model.tagDummy = this.model.Tags[0]

      console.log("loaded card", this.model)
      return;
    }
    if (
      !R.isEmpty(this.$store.getters['getCardCreatorDraft']) &&
      this.$store.getters['getCardCreatorDraft'].model
    ) {
      this.model = JSON.parse(this.$store.getters['getCardCreatorDraft'].model);

      console.log("loaded model:", this.model, R.is(Object, this.model));

      // if the loaded model is not an object, something is 100% wrong
      if (!R.is(Object, this.model)) {
        console.error("loaded model is not an object, overwriting with empty model")
        this.model = R.clone(emptyCard)
      }

      // this is automated fix for old (and wrong) data in store
      if (this.isEditCardMode()) {
        console.log("automated fix!");
        this.$store.commit("setCardCreatorDraft", R.clone(emptyCard));
      }
    }
    if (
      !R.isEmpty(this.$store.getters['getCardCreatorDraft']) &&
      this.$store.getters['getCardCreatorDraft'].image
    ) {
      console.log("getCardCreatorDraft", this.$store.getters['getCardCreatorDraft'])
      this.cropImage = this.$store.getters['getCardCreatorDraft'].image
    }
  },
  methods: {
    changeCrop({canvas}) {
      mergeImages(['/BG.png', canvas.toDataURL('image/jpeg', 0.9)])
      .then(b64 => {
        //console.log(b64)
        this.srcToFile(b64, "image.jpg", "image/jpeg")
        .then(file => {
          uploadImg(file, process.env.VUE_APP_CARDIMG_MAXKB, (result) => {
            this.$store.commit(
              this.isEditCardMode() ? "setCardCreatorEditCardImg" : "setCardCreatorDraftImg",
              result)
          })
        })
      })
    },
    srcToFile(src, fileName, mimeType){
      return (fetch(src)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], fileName, {type:mimeType});})
      );
    },
    toggleAdditionalCost() {
      if (!this.isAdditionalCostVisible) {
        this.model.AdditionalCost = emptyCard.AdditionalCost
      }
    },
    setAdditionalCost(event) {
      this.model.AdditionalCost = {}
      this.model.AdditionalCost[event.target.value] = {
        Amount: 0
      }
      this.updateAdditionalCostText()
    },
    printAdditionalCost(wholeString) {
      let countUppers = x => R.sum(R.map(
        x => x === R.toUpper(x) ? 1 : 0,
        R.split('', x)))

      let printString = ''
      while (countUppers(printString) < 2 && printString.length < wholeString.length ) {
        printString = R.take(printString.length + 1, wholeString)
      }

      return printString.length > 1 ? R.dropLast(1, printString) : ''
    },
    showBuyFrameModal() {
      this.isBuyFrameModalVisible = true;
    },
    closeBuyFrameModal() {
      this.isBuyFrameModalVisible = false;
    },
    showAbilityModal(type) {
      let atRules = R.curry(atPath)(this.$cardRules)

      this.isAbilityModalVisible = true

      if (type === "root") {
        if (this.abilities.length >= 3) {
          this.notifyFail("Number of Abilities", "A card can only have a maximum of 3 Abilities.")
          this.isAbilityModalVisible = false
          return
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
      window.scrollTo({top:0, left:0, behavior:"smooth"})
    },
    updateAbility($event, index) {
      this.ability = $event;
      this.abilities[index] = $event;

      // this is the delete case
      if ($event === null) {
        this.abilities.splice(index, 1);
      }
      console.log("abilities after update", this.abilities);

      let keywordCount = R.length(R.flatten(R.pluck("keywords", this.abilities)))
      if (keywordCount >= 6 && keywordCount <= 8) {
        this.notifyInfo("Number of Keywords", "You have added "+keywordCount+" Keywords to this card. 8 is the maximum.")
      }
      else if (keywordCount > 8) {
        this.notifyFail("Number of Keywords", "You have added more than 8 Keywords to this card. Please limit to 8.")
      }

      this.updateRulesTexts()
    },
    updateRulesTexts() {
      this.model.Keywords = R.pluck("keywords", this.abilities);
      this.model.RulesTexts = R.map(this.interactionTextToString, this.abilities);

      this.updateAdditionalCostText()
    },
    updateAdditionalCostText() {
      let setOrPrepend = (text) => {
        if (this.model.RulesTexts[0] && R.equals("Extra", R.take(5, this.model.RulesTexts[0])))
            this.model.RulesTexts[0] = text
          else
            this.model.RulesTexts = R.prepend(text, this.model.RulesTexts)
      }

      if (!R.isEmpty(this.model.AdditionalCost)) {
        if (this.model.AdditionalCost.SacrificeCost) {
          let text = "Extra Cost - Sacrifice " + this.model.AdditionalCost.SacrificeCost.Amount + " Entity."
          setOrPrepend(text)
        }
        else if (this.model.AdditionalCost.DiscardCost) {
          let text = "Extra Cost - Discard " + this.model.AdditionalCost.DiscardCost.Amount + " Card."
          setOrPrepend(text)
        }
        else if (this.model.AdditionalCost.VoidCost) {
          let text = "Extra Cost - Void " + this.model.AdditionalCost.VoidCost.Amount + " Card."
          setOrPrepend(text)
        }
      }
      else {
        if (this.model.RulesTexts[0] && R.equals("Extra", R.take(5, this.model.RulesTexts[0])))
          this.model.RulesTexts = R.drop(1, this.model.RulesTexts)
      }
    },
    resetAbilities() {
      console.log("RESET ABILITIES")
      this.abilities = [];
    },
    getRulesType() {
      //return this.model.type === "Headquarter" ? "Headquarter" : this.model.type;
      return this.model.type;
    },
    getTypes() {
      return R.keys(this.$cardRules.children);
    },
    getTags(idx) {
      if (this.$cardRules) {
        let usedTags = [];
        let allTags = this.$cardRules.children.Action.children.Tags.children.Tag
          .enum;
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
        this.model.Tags = []
      }
      this.model.Tags.splice(0, 1, this.model.tagDummy)
      this.saveDraft()
    },
    interactionTextToString(ability) {
      console.log("converting ability:", ability)
      let string = ""
      ability.interaction.forEach((entry) => {
        if (entry.btn.type !== "expandArray")
          string += entry.pre + entry.btn.label + entry.post;
      });
      return string
    },
    saveSubmit() {
      // first check all things that must be entered:
      if (!this.model.CardName) {
        this.notifyFail("No Name", "Card has no name, please enter a name.");
        return;
      }
      if (!this.model.type || this.model.type === "no type") {
        this.notifyFail("Wrong Type", "please pick a type");
        return;
      }
      if (!this.getCardImage) {
        this.notifyFail(
          "No Image",
          "Card has no image, please upload an image."
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
      if (!this.model.FlavourText[0] && !this.model.abilities) {
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
            "Card has no ressource cost, please pick a number."
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
        if (this.isEditCardMode() && !this.clearAbilities && R.isEmpty(this.abilities)) {
          newModel.Abilities = R.clone(this.$store.getters['getCardCreatorEditCard'].Abilities)
        }
        // this writes the relevant part of the abilities in the new model
        else {
          newModel.Abilities = R.map(
            R.pick(
              R.keys(
                this.$cardRules.children.Entity.children.Abilities.children
                  .Ability.children
              )
            ),
            this.abilities
          );
        }

      } else if (this.model.type === "Action") {
        // check if the old effects should be restored
        if (this.isEditCardMode() && !this.clearAbilities && R.isEmpty(this.abilities)) {
          newModel.Effects = R.clone(this.$store.getters['getCardCreatorEditCard'].Abilities)
        }
        // this writes the relevant part of the effects in the new model
        else {
          newModel.Effects = R.map(
            R.pick(
              R.keys(
                this.$cardRules.children.Action.children.Effects.children.Effect.children
              )
            ),
            this.abilities
          );
        }
      }

      // check if the old Keywords and RulesTexts should be restored
      let checkZeroAmount = () => {
        return (this.model.AdditionalCost.SacrificeCost && this.model.AdditionalCost.SacrificeCost.Amount == 0) ||
          (this.model.AdditionalCost.DiscardCost && this.model.AdditionalCost.DiscardCost.Amount == 0) ||
          (this.model.AdditionalCost.VoidCost && this.model.AdditionalCost.VoidCost.Amount == 0)
      }
      if (this.isEditCardMode() && !this.clearAbilities && R.isEmpty(this.abilities)) {
        newModel.Keywords = this.$store.getters['getCardCreatorEditCard'].Keywords
        newModel.RulesTexts = this.$store.getters['getCardCreatorEditCard'].RulesTexts

        if (this.isAdditionalCostVisible) {
          if (checkZeroAmount()) {
            this.model.AdditionalCost = {}
          }
          this.updateAdditionalCostText()
        }
      }
      else {
        if (checkZeroAmount()) {
          this.model.AdditionalCost = {}
        }
        this.updateRulesTexts()
      }

      let newCard = this.$cardChain.cardWebModelToCardobject(
        newModel,
        this.getCardImage
      )
      console.log("newCard", newCard)

      // check if a card is edited with pre-existing ID
      if (this.isEditCardMode()) {
        Promise.all([
            this.$cardChain.saveContentToCardTx(newCard, this.model.id),
            this.$cardChain.saveArtworkToCard(this.model.id, newCard.image, newCard.fullArt)
          ])
          .then(this.$cardChain.updateUserCredits())
          .then(this.resetCard())
          .catch((err) => {
            this.notifyFail("Update Card failed", err)
            console.error(err)
          })
      } else {
        this.$cardChain
          .saveContentToUnusedCardSchemeTx(newCard)
          .then(this.$cardChain.updateUserCredits())
          .then(this.resetCard)
          .catch((err) => {
            this.notifyFail("Publish Card failed", err)
            console.error(err)
          });
      }
    },
    saveDraft() {
      this.$store.commit(
        this.isEditCardMode()
          ? "setCardCreatorEditCardModel"
          : "setCardCreatorDraftModel",
        JSON.stringify(this.model)
      );
    },
    resetCard() {
      this.$store.commit(
        this.isEditCardMode() ? "setCardCreatorEditCard" : "setCardCreatorDraft",
        {}
      )
      this.model = R.clone(emptyCard)
      this.cropImage = sampleGradientImg
      this.$store.commit(
        this.isEditCardMode() ? "setCardCreatorEditCardImg" : "setCardCreatorDraftImg",
        ""
      )
    },
    isEditCardMode() {
      return !R.isEmpty(this.$store.getters['getCardCreatorEditCard']);
    },
    inputFile(event) {
      let file = event.target.files[0]

      uploadImg(file, process.env.VUE_APP_CARDIMG_MAXKB, (result) => {
        this.cropImage = result
      })
    },
    classStepPassed(n) {
      let exportClass = "progress-item"

      if (this.activeStep > n) {
        if (n === 0 && this.model.CardName && this.model.CardName !== "Name" && this.getCardImage)
          exportClass += " progress-item-finished"

        else if (n === 1 && this.model.Tags[0] && this.model.type && this.model.type !== "no type")
          exportClass += " progress-item-finished"

        else if (n === 2) {
          if (this.model.type !== "Headquarter" && (R.isNil(this.model.CastingCost) || this.model.CastingCost < 0))
            return exportClass
          if (this.model.type !== "Action" && R.isNil(this.model.Health))
            return exportClass
          if (this.model.type === "Entity" && R.isNil(this.model.Attack))
            return exportClass

          exportClass += " progress-item-finished"
        }
        else if (n === 3) {
            exportClass += " progress-item-finished";
        }
      }
      else if (this.activeStep === n) {
        exportClass += " progress-item-current";
      }
      return exportClass;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.cropper {
  height: 300px;
  width: 40vw;
  margin: 1rem;
  border: $border-thickness solid rgba(255, 255, 255, 0.7);
  @media (max-width: 480px) {
    width: 80vw;
  }
}

.button--file {
  z-index: 1;
  font-family: $font-family-header;
  background-color: transparent;
  color: $black;
  font-size: 1em;
  padding: 0.5rem 1em;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all $animation-duration ease-out;
  &:after {
    z-index: -1;
    background: linear-gradient(to right, $main-color-a 50%, $white 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all $animation-duration ease-out;
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: skewX($skew);
    box-shadow: $border-thickness-bold $border-thickness-bold 0 black;
  }
  &:hover {
    color: $white;
    &:after {
      background-position: left bottom;
    }
  }
}


.noWidth {
  width: 0%
}

.creator {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr;
  gap: 2rem 4rem;
  @media (min-width: 480px) {
    grid-template-areas: "creator-input creator-preview";
  }
}

.creator-input-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 1rem 1rem;
  grid-template-areas: ". ." ". .";
}

.creator-text {
  text-align: right;
}

@media (max-width: 480px) {
  .creator-input-container {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-template-areas: ".";
  }

  .creator {
    display: grid;
    padding: 1rem;
    grid-template-columns: 1fr;
    grid-template-areas: "";
  }

  .creator-text {
    text-align: left;
  }
}

.progress {
  display: flex;
  font-size: 1rem;
  text-shadow: none;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    flex-flow: column;
    font-size: 1em;
  }
}

.progress-item {
  cursor: pointer;
  margin: 0.25rem;
  border: $border-thickness solid rgba(255, 255, 255, 0.7);
  padding: 0.25rem 0.5rem;

  &.progress-item-finished {
    color: $gray;
  }

  &.progress-item-current {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: $white;
  }
}

.progress-container {
  display: flex;
  justify-content: center;
}

.inputfile {
  display: none;
}

.ability {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid $white;
  border-radius: 4px;
  color: $white;
  resize: vertical;
  background-color: transparent;
  font-size: $font-size;
}

.creator-nav-container {
  margin-top: 2rem;
  //display: flex;
  //justify-content: center;
  width: 100%;

  button.back {
    color: $white;
    text-decoration: underline;

    &:after {
      background: transparent;
      box-shadow: none;
    }
  }
}

.ability-modal-container {
  position: relative;
  z-index: 3;
}

.ability-frame {
  position: relative;
  padding: $font-size;
  border: $border-thickness solid $white;
  margin: 1rem 0;
}

.btn-abilitycreator {
  z-index: 1;
  background-color: transparent;
  color: $white;
  border: $border-thickness dotted $white;
  font-size: 1em;
  padding: 0.3em 1em;
  width: 100%;
  cursor: pointer;
  position: relative;
  transition: all $animation-duration ease-out;

  &:after {
    display: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
  .input--checkbox__left {
    position: absolute;
    display: inline-block;
    margin-left: -25px;
  }
  .input--checkbox-label__left {
    margin-left: 25px;
  }
  .input--checkbox__right {
    position: absolute;
    display: inline-block;
    margin-top: 1px;
  }

.tag-select {
  width: 100%;
  margin-bottom: 1rem;

  &.tag-select-last {
    margin-bottom: 0;
  }
}
</style>
