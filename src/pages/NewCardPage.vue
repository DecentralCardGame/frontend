<template>
  <div class="card-generator-container">
    <h2 class="header__h2">Card Creator</h2>
    <p class="header__p">With our card creator, you can design and craft your own cards by following a simple
      step-by-step wizard which
      takes you through the whole process.</p>
    <br>
    <div class="progress-container">
      <div class="progress">
        <div
            :class="classStepPassed(0)"
            @click="activeStep = 0"
        >
          Name, Type, Tags and Rarity
        </div>
        <div
            :class="classStepPassed(1)"
            @click="activeStep = 1"
        >
          Costs and Properties
        </div>
        <div
            :class="classStepPassed(2)"
            @click="activeStep = 2"
        >
          Rulings and Abilities
        </div>
        <div
            :class="classStepPassed(3)"
            @click="activeStep = 3"
        >
          Style and Flavor
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
            class="creator-input-container"
        >
          <span class="creator-text">Hey, my <b>name</b> is</span>
          <input
              v-model="model.CardName"
              value="Card Name"
              @change="saveDraft"
          >
          <span class="creator-text">My <b>type</b> is</span>
          <select
              v-model="model.type"
              @change="resetAbilities(); saveDraft();"
          >
            <option
                v-for="val in getTypes()"
                :key="val"
            >
              {{ val }}
            </option>
          </select>
          <span class="creator-text">People like to <b>tag</b> me as</span>
          <div>
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
          <span class="creator-text">My <b>rarity</b> is</span>
          <select @change="saveDraft">
            <option>Common</option>
            <option>Rare</option>
            <option>Legendary</option>
          </select>
        </div>
        <div
            v-if="activeStep == 1"
            class="creator-input-container"
        >
          <span
              v-if="$cardRules.children[getRulesType()] && $cardRules.children[getRulesType()].children.CastingCost"
              class="creator-text"
          >As I am quite awesome to get me rolling you need to <b>invest</b>:</span>

          <select
              v-if="$cardRules.children[getRulesType()] && $cardRules.children[getRulesType()].children.CastingCost"
              v-model="model.CastingCost"
              @change="saveDraft"
          >
            <option
                v-for="n in R.range($cardRules.children[getRulesType()].children.CastingCost.min, $cardRules.children[getRulesType()].children.CastingCost.max + 1)"
                :key="n"
                :value="n"
            >
              {{ n }}
            </option>
          </select>
          <span class="creator-text">
            <span
                v-show="model.type==='HQ'"
                class="creator-text"
            >

              As I am quite awesome, I generate <br>
              <select
                  v-if="$cardRules.children[getRulesType()] && $cardRules.children[getRulesType()].children.Growth"
                  v-model="model.Growth"
                  @change="saveDraft"
              >
                <option
                    v-for="n in R.range($cardRules.children[getRulesType()].children.Growth.min, $cardRules.children[getRulesType()].children.Growth.max + 1)"
                    :key="n"
                    :value="n"
                >
                  {{ n }}
                </option>
              </select>

              Growth and<br>
              <select
                  v-if="$cardRules.children[getRulesType()] && $cardRules.children[getRulesType()].children.Wisdom"
                  v-model="model.Wisdom"
                  @change="saveDraft"
              >
                <option
                    v-for="n in R.range($cardRules.children[getRulesType()].children.Wisdom.min, $cardRules.children[getRulesType()].children.Wisdom.max + 1)"
                    :key="n"
                    :value="n"
                >
                  {{ n }}
                </option>
              </select>
              Wisdom. <br>
              Whoever sides with me, starts with an impressive hand size of
              <select
                  v-if="$cardRules.children[getRulesType()] && $cardRules.children[getRulesType()].children.StartingHandSize"
                  v-model="model.StartingHandSize"
                  @change="saveDraft"
              >
                <option
                    v-for="n in R.range($cardRules.children[getRulesType()].children.StartingHandSize.min, $cardRules.children[getRulesType()].children.StartingHandSize.max + 1)"
                    :key="n"
                    :value="n"
                >
                  {{ n }}
                </option>
              </select>
              <br>

            </span>

            My classes are:
          </span>
          <div>
            <input
                v-model="model.CostType.Lumber"
                type="checkbox"
                @change="saveDraft"
            >
            <label for="checkbox"> Lumber </label> <br>
            <input
                v-model="model.CostType.Food"
                type="checkbox"
                @change="saveDraft"
            >
            <label for="checkbox"> Food </label> <br>
            <input
                v-model="model.CostType.Iron"
                type="checkbox"
                @change="saveDraft"
            >
            <label for="checkbox"> Iron </label> <br>
            <input
                v-model="model.CostType.Mana"
                type="checkbox"
                @change="saveDraft"
            >
            <label for="checkbox"> Mana </label> <br>
            <input
                v-model="model.CostType.Energy"
                type="checkbox"
                @change="saveDraft"
            >
            <label for="checkbox"> Energy </label> <br>
            <span v-if="model.type==='Entity'"> I have an <b>Attack</b> of </span>
            <select
                v-if="model.type==='Entity' && $cardRules.children[getRulesType()]"
                v-model="model.Attack"
                @change="saveDraft"
            >
              <option
                  v-for="n in R.range($cardRules.children[getRulesType()].children.Attack.min, $cardRules.children[getRulesType()].children.Attack.max + 1)"
                  :key="n"
                  :value="n"
              >
                {{ n }}
              </option>
            </select>
            <span v-if="model.type==='Entity'"> and </span>
            <span v-if="model.type!=='Action'"> I sadly <b>die</b> after someone suckerpunchs me for </span>
            <select
                v-if="model.type!=='Action' && $cardRules.children[getRulesType()]"
                v-model="model.Health"
                @change="saveDraft"
            >
              <option
                  v-for="n in R.range($cardRules.children[getRulesType()].children.Health.min, $cardRules.children[getRulesType()].children.Health.max + 1)"
                  :key="n"
                  :value="n"
              >
                {{ n }}
              </option>
            </select>
            <span v-if="model.type!=='Action'"> damage. </span>
          </div>
        </div>
        <div
            v-if="activeStep == 2"
        >
          <p>In this step, you craft the heart of your card. Press the button to add <b>abilities / effects</b> to your
            card.</p>
          <div>
            <div
                v-for="(ability, index) in abilities"
                :key="ability.ability"
            >
              <AbilityComponent
                  class="ability-frame"
                  v-bind:abilities="abilities"
                  v-bind:ability="ability"
                  v-bind:dialog="abilityDialog"
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
          <div v-else
               class="creator-text">
            <button
                class="btn btn-abilitycreator"
                type="button"
                @click="showAbilityModal('root')"
            >
              Add Ability
            </button>
          </div>
        </div>
        <div
            v-if="activeStep == 3"
            class="creator-input-container"
        >
          <span class="creator-text">
            Everybody needs a <b>face</b>,
            so do I. Please upload an image
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
          >Choose a file</label>
          <span class="creator-text">
            My <b>flavor</b> is best expressed by
            the following sentences:
          </span>
          <input
              v-model="model.FlavourText"
              value="Card Name"
              @change="saveDraft"
          >
        </div>
        <div
            v-if="activeStep == 4"
            class="creator-input-container"
        >
          <span class="creator-text">
            Uh, uh, uh. I like my looks,
            i like my feels, let us get some
            victorieeessss.
            Seriously,
            thanks for creating and being
            part of the community.
            Be brave and publish me!
            P.S. I would like to give the
            council the following notes for this card (optional):
          </span>
          <input
              v-model="model.Notes"
              value="Card Name"
              @change="saveDraft"
          >
        </div>
        <div class="creator-nav-container">
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
              class="btn"
              type="button"
              @click="showBuySchemeModal"
          >
            Buy Card Scheme
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
        </div>
      </div>
      <div class="creator-preview">
        <CardComponent
            id="card"
            :active-step="activeStep"
            :display-notes="true"
            :image-u-r-l="cardImageUrl"
            :model="model"
        />
      </div>
    </div>
    <div class="ability-modal-container">
      <AbilityModal
          v-if="isAbilityModalVisible"
          v-bind:abilities="abilities"
          v-bind:ability="ability"
          v-bind:dialog="abilityDialog"
          @close="closeAbilityModal"
          @update:ability="ability = $event"
      />
      <BuySchemeModal
          v-if="isBuySchemeModalVisible"
          @close="closeBuySchemeModal"
      />
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import state from '../components/utils/cardState'
import CardComponent from '../components/CardComponent'
import BuySchemeModal from '../components/modals/BuySchemeModal.vue'
import AbilityModal from '../components/modals/AbilityModal.vue'
import AbilityComponent from '../components/AbilityComponent.vue'

// eslint-disable-next-line no-unused-vars
import { atPath, emptyCard, notify, uploadImg, creditsFromCoins } from '../components/utils/utils.js'
import { sampleGradientImg } from '../components/utils/sampleCards.js'

export default {
  name: 'NewCardPage',
  components: {CardComponent, AbilityComponent, BuySchemeModal, AbilityModal},
  data() {
    return {
      isAbilityModalVisible: false,
      isBuySchemeModalVisible: false,
      activeStep: 0,
      ability: {},
      abilities: [],
      abilityDialog: {},
      cardImageUrl: sampleGradientImg,
      model: emptyCard,
      cardID: 0
    }
  },
  computed: {},
  mounted() {
    // here a card is loaded if edit card via gallery was selected
    if (state.card) {
      if (state.card.type === 'Headquarter') state.card.type = 'HQ'
      this.model = R.merge(this.model, state.card)
      this.cardImageUrl = this.model.image
      state.card = null
      return
    }
    if (localStorage.cardDraft) {
      this.model = JSON.parse(localStorage.cardDraft)
    }
    if (localStorage.cardImg) {
      this.cardImageUrl = JSON.parse(localStorage.cardImg)
    }
  },
  methods: {
    showBuySchemeModal() {
      this.isBuySchemeModalVisible = true
    },
    closeBuySchemeModal() {
      this.isBuySchemeModalVisible = false
    },
    showAbilityModal(type) {
      let atRules = R.curry(atPath)(this.$cardRules)

      console.log('abilities', this.abilities)

      this.isAbilityModalVisible = true

      if (type === 'root') {
        if (this.model.type === 'no type' || this.model.type === undefined) {
          notify.fail('No Type', 'Card has no type, please pick a type before setting abilities.')
          this.isAbilityModalVisible = false
          return
        }

        let newAbility = {
          path: ['children', this.getRulesType(), 'children', this.getRulesType() === 'Action' ? 'Effects' : 'Abilities', 'children', this.getRulesType() === 'Action' ? 'Effect' : 'Ability', 'children']
        }

        let options = atRules(newAbility.path)

        let dialog = {
          title: this.model.type === 'Action' ? 'New Effect' : 'New Ability',
          description: atRules(R.dropLast(1, newAbility.path)).description,
          type: 'root',
          options: options,
          rulesPath: newAbility.path,
          abilityPath: []
        }

        // this is the bugfix for replay selection bug
        R.forEachObjIndexed(function (option) {
          if (option.selected)
            delete option.selected
        }, dialog.options)

        this.abilityDialog = dialog
      } else {
        console.log('modal type unknown: ', type)
      }
    },
    closeAbilityModal() {
      console.log('ability after close modal: ', this.ability)
      this.isAbilityModalVisible = false
    },
    updateAbility($event, index) {
      this.ability = $event
      if ($event === null) {
        this.abilities.splice(index, 1)
      }
    },
    resetAbilities() {
      this.abilities = []
    },
    getRulesType() {
      return this.model.type === 'HQ' ? 'Headquarter' : this.model.type
    },
    getTypes() {
      return R.values(R.pluck('name', this.$cardRules.children))
    },
    getTags(idx) {
      if (this.$cardRules) {
        let usedTags = []
        let allTags = this.$cardRules.children.Action.children.Tags.children.Tag.children
        if (this.model.Tags[idx]) {
          // all tags already used except self
          usedTags = R.without(this.model.Tags[idx], this.model.Tags)
        }
        // if this is the last dropdown, allow to select nothing
        if (R.length(R.filter(x => x, this.model.Tags)) === idx + 1) {
          return R.append('', R.without(usedTags, allTags))
        } else {
          // otherwise nothing is not an option (user must remove the last tag and not one in the middle)
          return R.without(usedTags, allTags)
        }
      } else {
        console.error('shit cardschema not available')
        return []
      }
    },
    updateTags() {
      if (!this.model.Tags) {
        this.model.Tags = []
      }
      this.model.Tags.splice(0, 1, this.model.tagDummy)
      this.saveDraft()
    },
    saveSubmit() {
      if (!this.model.CardName) {
        notify.fail('No Name', 'Card has no name, please enter a name.')
        return
      }
      if (!this.model.type || this.model.type === 'no type') {
        notify.fail('Wrong Type', 'please pick a type')
        return
      }
      if (!this.model.CardName) {
        notify.fail('No Name', 'Card has no name, please enter a name.')
        return
      }

      let newCard = {
        model: {
          [this.getRulesType()]: {
            'CardName': this.model.CardName,
            'Tags': R.reject(R.isNil, this.model.Tags),
            'FlavourText': this.model.FlavourText,
            'CostType': {
              'Lumber': this.model.CostType.Lumber == true,
              'Energy': this.model.CostType.Energy == true,
              'Food': this.model.CostType.Food == true,
              'Iron': this.model.CostType.Iron == true,
              'Mana': this.model.CostType.Mana == true
            }
          }
        },
        image: this.cardImageUrl ? this.cardImageUrl : 'nix',
        Notes: this.model.Notes
      }
      if (this.model.type !== 'HQ') {
        if (R.isNil(this.model.CastingCost) || this.model.CastingCost < 0) {
          notify.fail('No Cost', 'Card has no ressource cost, please pick a number.')
          return
        }
        newCard.model[this.getRulesType()].CastingCost = this.model.CastingCost
      }
      if (this.model.type !== 'Action') {
        if (R.isNil(this.model.Health)) {
          notify.fail('No Health', 'Card has no Health, please pick a number.')
          return
        }
        newCard.model[this.getRulesType()].Abilities = R.map(R.pick(R.keys(this.$cardRules.children.Entity.children.Abilities.children.Ability.children)), this.abilities)
        newCard.model[this.getRulesType()].Health = this.model.Health
      }
      if (this.model.type === 'Entity') {
        if (R.isNil(this.model.Attack)) {
          notify.fail('No Attack', 'Card has no Attack, please pick a number.')
          return
        }
        newCard.model[this.getRulesType()].Attack = this.model.Attack
      } else if (this.model.type === 'HQ') {
        newCard.model[this.getRulesType()].Growth = this.model.Growth
        newCard.model[this.getRulesType()].Wisdom = this.model.Wisdom
        newCard.model[this.getRulesType()].StartingHandSize = this.model.StartingHandSize
      } else if (this.model.type === 'Action') {
        newCard.model[this.getRulesType()].Effects = R.map(R.pick(R.keys(this.$cardRules.children.Action.children.Effects.children.Effect.children)), this.abilities)
      }

      if (!this.model.Tags[0]) {
        notify.fail('No Tags', 'Card has no Tag, please pick at least one tag.')
        return
      }
      if (!this.model.FlavourText[0]) {
        notify.fail('No Flavor Text', 'Card has no (flavor) Text, please enter something.')
        return
      }

      // check if a card is edited with pre-existing ID
      if (this.model.id) {
        newCard.id = this.model.id
        this.saveContentToCardWithIdTx(this.$http, newCard, () => {})
        .then(acc => {
          this.creditsAvailable = creditsFromCoins(acc.coins)
          this.$store.commit('setUserCredits', this.creditsAvailable)  

          localStorage.cardDraft = ''
          localStorage.cardImg = ''
          this.model = emptyCard
          this.cardImageUrl = sampleGradientImg
        })
        .catch(err => {
          console.log(err)
        })
        
      } else {
        this.saveContentToUnusedCardSchemeTx(this.$http, newCard, () => {})
        .then(acc => {
          this.creditsAvailable = creditsFromCoins(acc.coins)
          this.$store.commit('setUserCredits', this.creditsAvailable) 

          localStorage.cardDraft = ''
          localStorage.cardImg = ''
          this.model = emptyCard
          this.cardImageUrl = sampleGradientImg
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    saveDraft() {
      localStorage.cardDraft = JSON.stringify(this.model)
    },
    inputFile(event) {
      let file = event.target.files[0]
      uploadImg(file, (result) => {
        this.cardImageUrl = result
        localStorage.cardImg = JSON.stringify(result)
      })
    },
    classStepPassed(n) {
      let exportClass = "progress-item";
      if (this.activeStep > n) {
        exportClass += " progress-item-active"
      }
      if (this.activeStep === n) {
        exportClass += " progress-item-current"
      }
      return exportClass
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

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

  &.progress-item-active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &.progress-item-current {
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
  display: flex;
  justify-content: center;
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

.tag-select {
  width: 100%;
  margin-bottom: 1rem;

  &.tag-select-last {
    margin-bottom: 0;
  }
}
</style>
