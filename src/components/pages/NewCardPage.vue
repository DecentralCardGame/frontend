<template>
  <div class="card-generator-container">
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
          <span class="creator-text">Hey, my Name is</span>
          <input
            v-model="model.name"
            value="Card Name"
            @change="saveDraft"
          >
          <span class="creator-text">My type is</span>
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
          <span class="creator-text">People like to tag me as</span>
          <div>
            <select
              v-model="model.tagDummy"
              @change="updateTags"
            >
              <option
                v-for="tag in getTags(0)"
                :key="tag"
              >
                {{ tag }}
              </option>
            </select>
            <span v-if="model.tag && model.tag[0]"> , </span>
            <select
              v-if="model.tag && model.tag[0]"
              v-model="model.tag[1]"
              @change="updateTags"
            >
              <option
                v-for="tag in getTags(1)"
                :key="tag"
              >
                {{ tag }}
              </option>
            </select>
            <span v-if="model.tag && model.tag[1]" />
            <select
              v-if="model.tag && model.tag[1]"
              v-model="model.tag[2]"
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
          <span class="creator-text">My rarity is</span>
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
            v-if="$cardRules.children[R.toLower(model.type)] && $cardRules.children[R.toLower(model.type)].children.castingCost"
            class="creator-text"
          >As I am quite awesome to get me rolling you need to invest:</span>

          <select
            v-if="$cardRules.children[R.toLower(model.type)] && $cardRules.children[R.toLower(model.type)].children.castingCost"
            v-model="model.costAmount"
            @change="saveDraft"
          >
            <option
              v-for="n in R.range($cardRules.children[R.toLower(model.type)].children.castingCost.min, $cardRules.children[R.toLower(model.type)].children.castingCost.max + 1)"
              :key="n"
              :value="n"
            >
              {{ n }}
            </option>
          </select>
          <span class="creator-text">
            <span
                v-if="model.type==='HQ'"
                class="creator-text"
            >As I am quite awesome I can grow to a maximum size of:</span>
            My classes are:
          </span>
          <div>
            <input
              v-model="model.cost.lumber"
              type="checkbox"
              @change="saveDraft"
            >
            <label for="checkbox"> Lumber </label> <br>
            <input
              v-model="model.cost.food"
              type="checkbox"
              @change="saveDraft"
            >
            <label for="checkbox"> Food </label> <br>
            <input
              v-model="model.cost.iron"
              type="checkbox"
              @change="saveDraft"
            >
            <label for="checkbox"> Iron </label> <br>
            <input
              v-model="model.cost.mana"
              type="checkbox"
              @change="saveDraft"
            >
            <label for="checkbox"> Mana </label> <br>
            <input
              v-model="model.cost.energy"
              type="checkbox"
              @change="saveDraft"
            >
            <label for="checkbox"> Energy </label> <br>
            <span v-if="model.type==='Entity'"> I have an attack of</span>
            <select
              v-if="model.type==='Entity' && $cardRules.children[R.toLower(model.type)]"
              v-model="model.attack"
              @change="saveDraft"
            >
              <option
                v-for="n in R.range($cardRules.children[R.toLower(model.type)].children.attack.min, $cardRules.children[R.toLower(model.type)].children.attack.max + 1)"
                :key="n"
                :value="n"
              >
                {{ n }}
              </option>
            </select>
            <span v-if="model.type==='Entity'"> and </span>
            <span v-if="model.type!=='Action'"> I sadly die after someone suckerpunchs me for </span>
            <select
              v-if="model.type!=='Action' && $cardRules.children[R.toLower(model.type)]"
              v-model="model.health"
              @change="saveDraft"
            >
              <option
                v-for="n in R.range($cardRules.children[R.toLower(model.type)].children.health.min, $cardRules.children[R.toLower(model.type)].children.health.max + 1)"
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
          class="creator-input-container"
        >
          <div v-if="model.type === 'Action'"
            class="creator-text">
            <button
              type="button"
              class="btn"
              @click="showAbilityModal('root')"
            >
              New Effect
            </button>
          </div>
          <div v-else
            class="creator-text">
            <button
              type="button"
              class="btn"
              @click="showAbilityModal('root')"
            >
              New Ability
            </button>
          </div>
          <div
            v-for="ability in abilities"
            :key="ability.ability"
          >
            <AbilityComponent
              v-bind:ability="ability"
              v-bind:dialog="abilityDialog"
              v-bind:abilities="abilities"
              @update:ability="updateAbility($event)"
            />
          </div>
        </div>
        <div
          v-if="activeStep == 3"
          class="creator-input-container"
        >
          <span class="creator-text">
            Everybody needs a face,
            so do I, pls upload a file
          </span>
          <input
            id="file"
            type="file"
            name="file"
            class="inputfile"
            @change="inputFile"
          >
          <label
            for="file"
            class="button-file"
          >Choose a file</label>
          <span class="creator-text">
            My flavor is best expressed by
            the following sentences:
          </span>
          <input
            v-model="model.text"
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
            council the following notes for this card:
          </span>
          <input
            v-model="model.notes"
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
            back
          </button>
          <button
            v-if="activeStep < 4"
            @click="activeStep++"
          >
            next
          </button>
          <button
            v-if="activeStep == 4"
            type="button"
            class="btn"
            @click="showBuySchemeModal"
          >
            Buy Card Scheme
          </button>
          <BuySchemeModal
            v-if="isBuySchemeModalVisible"
            @close="closeBuySchemeModal"
          />
          <button
            v-if="activeStep == 4"
            @click="saveSubmit()"
          >
            Publish
          </button>
        </div>
      </div>
      <div class="creator-preview">
        <CardComponent
          id="card"
          :model="model"
          :active-step="activeStep"
          :image-u-r-l="cardImageUrl"
          :display-notes="true"
        />
      </div>
    </div>
    <div class="ability-modal-container">
      <AbilityModal
        v-if="isAbilityModalVisible"
        v-bind:dialog="abilityDialog"
        v-bind:ability="ability"
        v-bind:abilities="abilities"
        @update:ability="ability = $event"
        @close="closeAbilityModal"
      />
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import CardComponent from '../CardComponent'
import BuySchemeModal from '../BuySchemeModal.vue'
import AbilityModal from '../AbilityModal.vue'
import AbilityComponent from '../AbilityComponent.vue'

// eslint-disable-next-line no-unused-vars
import { buyCardSchemeTx, saveContentToUnusedCardSchemeTx } from '../cardChain.js'
import { sampleImg, emptyCard, notify, uploadImg, climbRulesTree, atPath } from '../utils.js'

export default {
  name: 'NewCardPage',
  components: {CardComponent, AbilityComponent, BuySchemeModal, AbilityModal},
  data () {
    return {
      isAbilityModalVisible: false,
      isBuySchemeModalVisible: false,
      activeStep: 0,
      ability: {},
      abilities: [],
      abilityDialog: {},
      cardImageUrl: sampleImg,
      model: {
        name: 'Name',
        text: '',
        abilities: [],
        notes: '',
        article: 'the',
        surname: 'Surname',
        type: 'No Type',
        tag: [],
        tagDummy: '',
        cost: {
          lumber: false,
          food: false,
          iron: false,
          mana: false,
          energy: false
        },
        costAmount: -1,
        health: 0,
        attack: 0
      },
      cardID: 0
    }
  },
  computed: {
  },
  mounted () {
    if (localStorage.cardDraft) {
      this.model = JSON.parse(localStorage.cardDraft)
    }
    if (localStorage.cardImg) {
      this.cardImageUrl = JSON.parse(localStorage.cardImg)
    }
  },
  methods: {
    showBuySchemeModal () {
      this.isBuySchemeModalVisible = true
    },
    closeBuySchemeModal () {
      this.isBuySchemeModalVisible = false
    },
    showAbilityModal (type) {
      let atRules = R.curry(atPath)(this.$cardRules)

      console.log('abilities', this.abilities)

      this.isAbilityModalVisible = true

      if (type === 'root') {
        if (this.model.type === 'No Type' || this.model.type === undefined) {
          notify.fail('No Type', 'Card has no type, please pick a type before setting abilities.')
          this.isAbilityModalVisible = false
          return
        }

        let newAbility = {
          path: ['children', R.toLower(this.model.type), 'children', R.toLower(this.model.type) === 'action' ? 'effects' : 'abilities']
        }

        newAbility.path = climbRulesTree(this.$cardRules, newAbility.path)

        let options = atRules(newAbility.path)

        let dialog = {
          title: this.model.type === 'Action' ? 'New Effect' : 'New Ability',
          description: atRules(R.dropLast(1, newAbility.path)).description,
          type: 'root',
          options: options,
          rulesPath: newAbility.path,
          abilityPath: []
        }

        this.abilityDialog = dialog

      } else {
        console.log('modal type unknown: ', type)
      }
    },
    closeAbilityModal () {
      console.log('ability after close modal: ', this.ability)
      this.isAbilityModalVisible = false
    },
    updateAbility($event) {
      this.ability = $event
    },
    resetAbilities () {
      this.abilities = []
    },
    getTypes () {
      return R.values(R.pluck('name', this.$cardRules.children))
    },
    getTags (idx) {
      if (this.$cardRules) {
        let usedTags = []
        let allTags = this.$cardRules.children.action.children.tags.children.tag.children
        if (this.model.tag[idx]) {
          // all tags already used except self
          usedTags = R.without(this.model.tag[idx], this.model.tag)
        }
        // if this is the last dropdown, allow to select nothing
        if (R.length(R.filter(x => x, this.model.tag)) === idx + 1) {
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
    updateTags () {
      if (!this.model.tag) {
        this.model.tag = []
      }
      this.model.tag.splice(0, 1, this.model.tagDummy)
      this.saveDraft()
    },
    saveSubmit () {
      if (!this.model.name) {
        notify.fail('No Name', 'Card has no name, please enter a name.')
        return
      }
      if (!this.model.type || this.model.type === 'No Type') {
        notify.fail('Wrong Type', 'please pick a type')
        return
      }
      if (!this.model.name) {
        notify.fail('No Name', 'Card has no name, please enter a name.')
        return
      }     

      let newCard = {
        model: {
          [this.model.type]: {
            'Name': this.model.name,
            'Tags': R.reject(R.isNil, this.model.tag),
            'Text': this.model.text,
            'CostType': {
              'Lumber': this.model.cost.lumber == true,
              'Energy': this.model.cost.energy == true,
              'Food': this.model.cost.food == true,
              'Iron': this.model.cost.iron == true,
              'Mana': this.model.cost.mana == true
            }
          }
        },
        image: this.cardImageUrl ? this.cardImageUrl : 'nix'
      }
      if (this.model.type !== 'headquarter') {
        if (R.isNil(this.model.costAmount) || this.model.costAmount < 0) {
          notify.fail('No Cost', 'Card has no ressource cost, please pick a number.')
          return
        }
        newCard.model[this.model.type].CastingCost = this.model.costAmount
      }
      if (this.model.type !== 'Action') {
        if (R.isNil(this.model.health)) {
          notify.fail('No Health', 'Card has no health, please pick a number.')
          return
        }
        newCard.model[this.model.type].Abilities = []
        newCard.model[this.model.type].Health = this.model.health
      }
      if (this.model.type === 'Entity') {
        if (R.isNil(this.model.attack)) {
          notify.fail('No Attack', 'Card has no Attack, please pick a number.')
          return
        }
        newCard.model[this.model.type].Abilities = []
        newCard.model[this.model.type].Attack = this.model.attack
      } else if (this.model.type === 'headquarter') {
        newCard.model[this.model.type].Abilities = []
        newCard.model[this.model.type].Growth = 0       // TODO implement this
        newCard.model[this.model.type].Wisdom = 0       // TODO implement this

      } else if (this.model.type === 'Action') {
        newCard.model[this.model.type].Effects = []
      }

      if (!this.model.tag[0]) {
        notify.fail('No Tags', 'Card has no Tag, please pick at least one tag.')
        return
      }
      if (!this.model.text[0]) {
        notify.fail('No Flavor Text', 'Card has no (flavor) Text, please enter something.')
        return
      }

      if (this.model.type === 'headquarter') {
        
        newCard.model.Headquarter = newCard.model.headquarter
        newCard.model.headquarter = undefined
        
        console.log('newCard:',newCard)
      }

      saveContentToUnusedCardSchemeTx(this.$http, newCard, () => {
        localStorage.cardDraft = ''
        localStorage.cardImg = ''
        this.model = emptyCard
        this.cardImageUrl = sampleImg
      })
    },
    saveDraft () {
      localStorage.cardDraft = JSON.stringify(this.model)
    },
    inputFile (event) {
      let file = event.target.files[0]
      uploadImg(file, (result) => {
        this.cardImageUrl = result
        localStorage.cardImg = JSON.stringify(result)
      })
    },
    classStepPassed (n) {
      let exportClass = "progress-item";
      if (this.activeStep > n) {
        exportClass += " progress-item-active"
      } if (this.activeStep === n) {
        exportClass += " progress-item-current"
      }
      return exportClass
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/variables";

  .creator {
    line-height: 1.5em;
    text-shadow: none;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 1fr;
    gap: 2rem 2rem;
    grid-template-areas: "creator-input creator-preview";
  }

  .creator-input-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);
    gap: 1rem 1rem;
    grid-template-areas: ". ." ". .";
  }

  @media (max-width: 480px) {
    .creator {
      line-height: 1.5em;
      display: grid;
      grid-template-columns: 1fr;
    }
  }

  .creator-text {
    text-align: right;
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
    margin: 0.3em;
    border: 4px solid rgba(255,255,255,0.7);;
    padding: 0.2em;
    transform: skewX(-15deg);

    &.progress-item-active {
      background-color: rgba(255,255,255,0.3);
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
    font-family: "Museo", sans-serif;
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
</style>
