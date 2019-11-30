<template>
  <div class="card-generator-container">
    <div class="progress">
      <div @click="activeStep = 0" class="progress-item">Name, Type, Tags and Rarity</div>
      <div @click="activeStep = 1" class="progress-item">Costs and Properties</div>
      <div @click="activeStep = 2" class="progress-item">Rulings and Abilities</div>
      <div @click="activeStep = 3" class="progress-item">Style, Flavor and Notes</div>
      <div @click="activeStep = 4" class="progress-item">Summary and Publish</div>
    </div>
    <div class="creator">
      <div class="col-settings">
        <div v-if="activeStep == 0"><br>
          Hey, my Name is <input v-model="model.name" value="Card Name">
          and I am the
          <select v-model="model.article">
            <option>the</option>
            <option>a</option>
          </select>
          <input v-model="model.surname" value="Surname">.
          My type is
          <select v-model="model.type">
            <option v-for="type in rules.oneOf" v-bind:key="type.required[0]">{{ type.required[0] }}</option>
          </select>.<br>
          People like to tag me as ...<br>
          <select>
            <option>Legendary</option>
          </select>
          is my rarity.
        </div>
        <div v-if="activeStep == 1"><br>
          As I am quite awesome my costs are the following:
          <select v-model="model.cost.lumber">
            <option v-bind:key="n" v-for="n in getNumbers(1,this.remainingCosts, this.model.cost.lumber)" :value="n">{{n}}</option>
          </select> Lumber,
          <select v-model="model.cost.food">
            <option v-bind:key="n" v-for="n in getNumbers(1, this.remainingCosts, this.model.cost.food)" :value="n">{{n}}</option>
          </select> Food,
          <select v-model="model.cost.iron">
            <option v-bind:key="n" v-for="n in getNumbers(1, this.remainingCosts, this.model.cost.iron)" :value="n">{{n}}</option>
          </select> Iron,
          <select v-model="model.cost.mana">
            <option v-bind:key="n" v-for="n in getNumbers(1, this.remainingCosts, this.model.cost.mana)" :value="n">{{n}}</option>
          </select> Mana,
          <select v-model="model.cost.energy">
            <option v-bind:key="n" v-for="n in getNumbers(1, this.remainingCosts, this.model.cost.energy)" :value="n">{{n}}</option>
          </select> Energy,
          <select v-model="model.cost.generic">
            <option v-bind:key="n" v-for="n in getNumbers(1,this.remainingCosts, this.model.cost.generic)" :value="n">{{n}}</option>
          </select> Generic,
          All it needs are <select v-model="model.ticks">
          <option v-bind:key="n" v-for="n in getNumbers(1,32,0)" :value="n">{{n}}</option>
        </select> Ticks, to get me rolling. I have an
          attack of <select v-model="model.attack">
          <option v-bind:key="n" v-for="n in getNumbers(1,32,0)" :value="n">{{n}}</option>
        </select> and I sadly die
          after someone suckerpunchs
          me for <select v-model="model.defense">
          <option v-bind:key="n" v-for="n in getNumbers(1,32,0)" :value="n">{{n}}</option>
        </select>
          damage.
        </div>
        <div v-if="activeStep == 2"><br>
          <template>
            <button
              type="button"
              class="btn"
              @click="showAbilityModal(abilities)"> New Ability </button>
            <AbilityModal
              v-if="isAbilityModalVisible"
              v-bind:dialog="abilityDialog"
              v-bind:elements="abilityElements"
              v-bind:abilities="abilities"
              @close="closeAbilityModal"
            />
          </template>
          <div v-for="ability in abilities">
            <AbilityComponent
              v-bind:ability="ability"
              v-bind:dialog="abilityDialog"
              v-bind:elements="abilityElements"
              v-bind:abilities="abilities"
            />
          </div>
        </div>
        <div v-if="activeStep == 3"><br>
          Everybody needs a face,
          so do I, pls
          <input type="file" @change="onFileChange" />
          <button>Upload Image (ja sicher)</button>.<br>
          My flavor is best expressed by
          the following sentences:
          <input v-model="model.description" value="Card Name">.
          I would like to give the
          council proper intel:
          <input v-model="model.notes" value="Card Name">.
        </div>
        <div v-if="activeStep == 4"><br>
          Uh, uh, uh. I like my looks,
          i like my feels, let us get some
          victorieeessss.
          Seriously,
          thanks for creating and being
          part of the community.
          Be brave and publish me!
          Or save my awesome looks for later purposes.
          <br><br>
          <button @click="saveSubmit()">Publish</button>
          <button @click="saveDraft()">Save As Draft</button>
          <template>
            <button
              type="button"
              class="btn"
              @click="showBuySchemeModal"> Buy Card Scheme </button>
            <BuySchemeModal
              v-if="isBuySchemeModalVisible"
              @close="closeBuySchemeModal"
            />
          </template>
        </div>
        <br>
        <button v-if="activeStep > 0" @click="activeStep--">back</button>
        <button v-if="activeStep < 4" @click="activeStep++">next</button>

      </div>

      <div class="col-visual">
        <CardComponent v-bind:model="model"
                       v-bind:active-step="activeStep"
                       v-bind:imageURL="cardImageUrl"
                        v-bind:display-notes="true">
        </CardComponent>
      </div>

    </div>

  </div>

</template>

<script>
import ContentContainerComponent from '@/components/ContentContainerComponent'
import $RefParser from 'json-schema-ref-parser'
import CardComponent from '../CardComponent'
import BuySchemeModal from '../BuySchemeModal.vue'
import AbilityModal from '../AbilityModal.vue'
import AbilityComponent from '../AbilityComponent.vue'

// eslint-disable-next-line no-unused-vars
import { generateAndBroadcastTx, buyCardSchemeTx, saveContentToUnusedCardSchemeTx, notify, sampleImg } from '../utils.js'

export default {
  name: 'NewCardPage',
  components: {CardComponent, ContentContainerComponent, AbilityComponent, BuySchemeModal, AbilityModal},
  data () {
    return {
      isAbilityModalVisible: false,
      isBuySchemeModalVisible: false,
      activeStep: 0,
      abilities: [],
      currentNode: Object,
      abilityDialog: {
        title: 'New Ability',
        description: 'pick a type:',
        type: 'radio',
        options: [{
          name: 'activatedAbility',
          title: 'Activated Ability',
          description: 'By paying a cost an effect is unleashed.'
        },
        {
          name: 'triggeredAbility',
          title: 'Triggered Ability',
          description: 'An event unleashes an effect.'
        }]
      },
      abilityElements: {
        activatedAbility: {
          title: 'Activated Ability',
          description: 'By paying a cost and effect is unleashed.',
          interaction: [
            {pre: 'Pay ', btn: 'Cost', post: 'to ', type: 'cost'},
            {pre: ' unleash ', btn: 'an Effect', post: '.', type: 'effect'}]
        },
        cost: {
          title: 'Cost',
          description: 'A Cost is an amount of ressources which must be paid.',
          dialog: {
            title: 'Define Cost',
            description: 'enter a value or MARK IT ZERO:',
            type: 'multivalue',
            options: [{
              name: 'mana',
              title: 'Mana',
              value: 0,
              description: ''
            },
            {
              name: 'food',
              title: 'Food',
              value: 0,
              description: ''
            },
            {
              name: 'lumber',
              title: 'Lumber',
              value: 0,
              description: ''
            }]
          },
          interaction: [
            {pre: 'yes ', btn: 'pups', post: 'to ', type: 'cost'}
          ]
        },
        effect: {
          title: 'Effect',
          description: 'An Effect changes something.',
          dialog: {
            title: 'Define Cost',
            description: 'check the types:',
            type: 'radio',
            options: [{
              name: 'manipulation',
              title: 'Manipulation',
              description: 'change a property of an object, location or HQ'
            },
            {
              name: 'production',
              title: 'Production',
              description: 'produces a ressource'
            },
            {
              name: 'create',
              title: 'Create',
              description: 'create an object'
            }]
          }
        },
        event: {
          title: 'Event',
          description: 'An Event is something hat has happened.',
          dialog: {
            title: 'Define Event',
            description: 'check the types:',
            type: 'radio',
            options: [{
              name: 'zonechange',
              title: 'Zone Change',
              description: 'An object was moved to another zone.'
            },
            {
              name: 'manipulation',
              title: 'Manipulation',
              description: 'An object or location or HQ is manipulated.'
            },
            {
              name: 'creation',
              title: 'Creation',
              description: 'An object or location was created.'
            }]
          }

        },
        zone: {
          title: 'Zone',
          description: 'A zone is a place of the game.',
          dialog: {
            title: 'Pick Zone',
            description: 'pick the appropriate zone',
            type: 'radio',
            options: [{
              name: 'field',
              title: 'Field',
              description: 'This is the realm of alive creatures and active machines.'
            },
            {
              name: 'hand',
              title: 'Hand',
              description: 'The hand of a player.'
            },
            {
              name: 'dust',
              title: 'Dust',
              description: 'Destroyed machines and killed creatures move to the dust.'
            },
            {
              name: 'deck',
              title: 'Deck',
              description: 'The deck contains your available cards.'
            },
            {
              name: 'void',
              title: 'Void',
              description: 'The void is the ultimate nothingness. Finally removed from the game.'
            }]
          }

        }
      },
      abilityScheme: {
        name: 'Add Ability',
        description: 'Add a new ability to the card. Pick the type of ability from the following list:',
        pickOne: ['activatedAbility', 'triggeredAbility'],
        activatedAbility: {
          name: 'Activated Ability',
          description: 'By paying a cost and effect is unleashed.',
          interaction: [
            {pre: 'Pay ', btn: 'Cost', post: 'to ', type: 'cost'},
            {pre: ' unleash ', btn: 'an Effect', post: '.', type: 'effect'}],
          mustFill: ['cost', 'effect'],
          optional: [],
          cost: {

          },
          effect: {
            name: 'Effect',
            description: 'An Effect changes something in the game. Hitpoints of an object, or let\'s you draw cards.',
            pickOne: ['move', 'draw'],
            move: {
              name: 'Zone Move',
              description: 'This effect moves a card to another zone. For example from the field to the owner\'s hand.',
              mustFill: ['from', 'to', 'validTarget', 'validOwner'],
              validTarget: ['object', 'location', 'card in hand', 'top card of deck'],
              validOwner: ['self', 'ally', 'opponent', 'any'],
              from: ['field', 'hand', 'deck', 'dust pile'],
              to: ['field', 'hand', 'deck', 'dust pile']
            },
            draw: {
              name: 'Draw Card',
              description: 'This effect let\'s a player draw cards',
              mustFill: ['amount', 'validTarget'],
              validTarget: ['self', 'ally', 'opponent', 'any'],
              amount: 'number'
            }
          }
        },
        triggeredAbility: {
          name: 'dummy Trigger',
          description: 'Whenever {an event} happens, unleash {an effect}',
          interaction: [
            {pre: 'Whenever an ', btn: 'Event', post: 'happens, ', type: 'event'},
            {pre: 'unleash ', btn: 'an Effect', post: '.', type: 'effect'}]
        }
      },
      cardImageUrl: sampleImg,
      model: {
        name: 'Name',
        description: '',
        ability: '',
        notes: '',
        article: 'the',
        surname: 'Surname',
        type: 'No Type',
        tags: [],
        cost: {
          lumber: 0,
          food: 0,
          iron: 0,
          mana: 0,
          energy: 0,
          generic: 0
        },
        ticks: 0,
        defense: 0,
        attack: 0
      },
      rules: {},
      cardID: 0
    }
  },
  mounted () {
    if (localStorage.cardDraft) {
      this.model = JSON.parse(localStorage.cardDraft)
    }
    $RefParser.dereference('https://gracious-hopper-f1dfd1.netlify.com/cardSchema.json', (err, api) => {
      if (err) {
        console.log(err)
      } else {
        this.rules = api
        console.log(api)
      }
    })
  },
  computed: {
    remainingCosts () {
      return 32 - this.model.cost.lumber -
              this.model.cost.food -
              this.model.cost.iron -
              this.model.cost.mana -
              this.model.cost.energy -
              this.model.cost.generic
    }
  },
  methods: {
    showBuySchemeModal () {
      this.isBuySchemeModalVisible = true
    },
    closeBuySchemeModal () {
      this.isBuySchemeModalVisible = false
    },
    showAbilityModal (currentNode) {
      this.currentNode = currentNode
      this.isAbilityModalVisible = true
    },
    closeAbilityModal () {
      this.isAbilityModalVisible = false
    },
    getNumbers (start, stop, min) {
      if (min >= stop) {
        return new Array(min + 1 - start).fill(start).map((n, i) => n + i)
      } else {
        return new Array(stop + 1 - start).fill(start).map((n, i) => n + i)
      }
    },
    generateCostArray () {
      let finalArr = []

      for (let i = 0; i < this.model.cost.energy; i++) {
        finalArr.push('ENERGY')
      }
      for (let i = 0; i < this.model.cost.food; i++) {
        finalArr.push('FOOD')
      }
      for (let i = 0; i < this.model.cost.generic; i++) {
        finalArr.push('GENERIC')
      }
      for (let i = 0; i < this.model.cost.iron; i++) {
        finalArr.push('IRON')
      }
      for (let i = 0; i < this.model.cost.lumber; i++) {
        finalArr.push('LUMBER')
      }
      for (let i = 0; i < this.model.cost.mana; i++) {
        finalArr.push('MANA')
      }

      return finalArr
    },
    saveSubmit () {
      let costArray = this.generateCostArray()
      // eslint-disable-next-line no-unused-vars
      let newCard = {
        [this.model.type]: {
          'Name': this.model.name,
          'Tag': this.model.tags,
          'Taxt': this.model.description,
          'Cost': costArray,
          'CastSpeed': this.model.ticks,
          'Effects': {}
        }
      }

      saveContentToUnusedCardSchemeTx(this.$http, localStorage.address, localStorage.mnemonic, newCard)
        .then(res => {
          notify.succes('EPIC WIN', 'You have successfully published this card.')
        })
        .catch(err => {
          if (err.message === 'no cards available') {
            notify.fail('YOU MUST CONSTRUCT ADDITIONAL PYLONS', 'You don\'t own any card schemes. Please buy one before publishing.')
          } else {
            console.error(err)
          }
        })
    },
    saveDraft () {
      localStorage.cardDraft = JSON.stringify(this.model)
    },
    onFileChange (e) {
      const file = e.target.files[0]
      this.cardImageUrl = URL.createObjectURL(file)
      console.log(this.cardImageUrl)
    }
  }
}
</script>

<style scoped>
  select {
    background-color: transparent;
    border: 2px solid white;
    font-size: 1em;
    color: white;
    font-family: "Museo", sans-serif;
  }

  select option {
    color: white;
    background-color: red;
  }

  .creator {
    text-shadow: none;
  }

  .progress {
    display: flex;
    font-size: 0.6em;
    text-shadow: none;
  }
  .progress-item {
    cursor: pointer;
    margin: 0.3em;
    border: 4px solid white;
    padding: 0.2em;
    transform: skewX(-15deg);
  }

  .ability {
    width: 100%;
    height: 150px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid white;
    border-radius: 4px;
    color: white;
    resize: vertical;
    background-color: transparent;
    font-size: 1em;
    font-family: "Museo", sans-serif;
  }
</style>
