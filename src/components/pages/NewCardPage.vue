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
        <div v-if="activeStep == 0">
          Hey, my Name is <input @change="saveDraft" v-model="model.name" value="Card Name"><br>
          My type is
          <select @change="saveDraft" v-model="model.type">
            <option v-for="type in $cardSchema.oneOf" v-bind:key="type.required[0]"> {{ type.required[0] }} </option>
          </select>.<br>
          People like to tag me as
          <select @change="updateTags" v-model="model.tagDummy">
            <option v-for="tag in getTags(0)" v-bind:key="tag"> {{ tag }} </option>
          </select>
          <span v-if="model.tag && model.tag[0]"> , </span>
          <select v-if="model.tag && model.tag[0]" @change="updateTags" v-model="model.tag[1]">
            <option v-for="tag in getTags(1)" v-bind:key="tag"> {{ tag }} </option>
          </select>
          <span v-if="model.tag && model.tag[1]"> and </span>
          <select v-if="model.tag && model.tag[1]" @change="updateTags
          " v-model="model.tag[2]">
            <option v-for="tag in getTags(2)" v-bind:key="tag"> {{ tag }} </option>
          </select>
          .<br>
          <select @change="saveDraft">
            <option>Common</option>
            <option>Rare</option>
            <option>Legendary</option>
          </select>
          is my rarity.
        </div>
        <div v-if="activeStep == 1">
          <span v-if="model.type!=='Headquarter'">As I am quite awesome to get me rolling you need to invest:</span>
          <span v-if="model.type==='Headquarter'">As I am quite awesome I can grow to a maximum size of:</span>
          <select @change="saveDraft" v-model="model.costAmount">
            <option v-bind:key="n" v-for="n in getNumbers(0,30,0)" :value="n">{{n}}</option>
          </select>
          <span v-if="model.type!=='Headquarter'">Ressources. </span><br>
          My classes are: <br>
          <input @change="saveDraft" type="checkbox" v-model="model.cost.lumber">
          <label for="checkbox"> Lumber </label> <br>
          <input @change="saveDraft" type="checkbox" v-model="model.cost.food">
          <label for="checkbox"> Food </label> <br>
          <input @change="saveDraft" type="checkbox" v-model="model.cost.iron">
          <label for="checkbox"> Iron </label> <br>
          <input @change="saveDraft" type="checkbox" v-model="model.cost.mana">
          <label for="checkbox"> Mana </label> <br>
          <input @change="saveDraft" type="checkbox" v-model="model.cost.energy">
          <label for="checkbox"> Energy </label> <br>
          <span v-if="model.type==='Entity'"> I have an attack of</span>
          <select v-if="model.type==='Entity'" @change="saveDraft" v-model="model.attack">
            <option v-bind:key="n" v-for="n in getNumbers(0,32,0)" :value="n">{{n}}</option>
          </select>
          <span v-if="model.type==='Entity'"> and </span>
          <span v-if="model.type!=='Action'"> I sadly die after someone suckerpunchs me for</span>
          <select v-if="model.type!=='Action'" @change="saveDraft" v-model="model.health">
            <option v-bind:key="n" v-for="n in getNumbers(0,32,0)" :value="n">{{n}}</option>
          </select>
          <span v-if="model.type!=='Action'"> damage. </span>
        </div>
        <div v-if="activeStep == 2">
          <template>
            THIS IS NOT FUNCTIONAL YET
            <button
              type="button"
              class="btn"
              @click="showAbilityModal('root')"> New Ability </button>
            use the flavor text to write down your abilities
            <AbilityModal
              v-if="isAbilityModalVisible"
              v-bind:dialog="abilityDialog"
              v-bind:options="abilityOptions"
              v-bind:ability="ability"
              v-bind:abilities="abilities"
              v-bind:currentNode="currentNode"
              v-on:update:currentNode="currentNode = $event"
              @close="closeAbilityModal"
            />
          </template>
          <div v-bind:key="ability.ability" v-for="ability in abilities">
            <AbilityComponent
              v-bind:ability="ability"
              v-bind:dialog="abilityDialog"
              v-bind:abilities="abilities"
              v-bind:currentNode="currentNode"
              v-on:update:currentNode="currentNode = $event"
            />
          </div>
        </div>
        <div v-if="activeStep == 3">
          Everybody needs a face,
          so do I, pls
          <input type="file" name="file" id="file" class="inputfile" @change="inputFile" />
          <label for="file" class="button-file">Choose a file</label>
          My flavor is best expressed by
          the following sentences:
          <input @change="saveDraft" v-model="model.text" value="Card Name">.
          I would like to give the
          council proper intel:
          <input @change="saveDraft" v-model="model.notes" value="Card Name">.
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
          <button @click="saveSubmit()">Publish</button>
        </div>
        <br>
        <button v-if="activeStep > 0" @click="activeStep--">back</button>
        <button v-if="activeStep < 4" @click="activeStep++">next</button>
      </div>
      <div class="col-visual">
        <CardComponent id="card" v-bind:model="model"
                       v-bind:active-step="activeStep"
                       v-bind:imageURL="cardImageUrl"
                        v-bind:display-notes="true">
        </CardComponent>
      </div>
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
import { sampleImg, emptyCard, resolveParagraph, notify, uploadImg } from '../utils.js'

export default {
  name: 'NewCardPage',
  components: {CardComponent, AbilityComponent, BuySchemeModal, AbilityModal},
  data () {
    return {
      cardSchema: Object,
      isAbilityModalVisible: false,
      isBuySchemeModalVisible: false,
      activeStep: 0,
      ability: {},
      abilities: [],
      abilityOptions: {},
      currentNode: {init: 'yes'},
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
  mounted () {
    if (localStorage.cardDraft) {
      this.model = JSON.parse(localStorage.cardDraft)
    }
    if (localStorage.cardImg) {
      this.cardImageUrl = JSON.parse(localStorage.cardImg)
    }
  },
  computed: {
  },
  methods: {
    showBuySchemeModal () {
      this.isBuySchemeModalVisible = true
    },
    closeBuySchemeModal () {
      this.isBuySchemeModalVisible = false
    },
    showAbilityModal (type) {
      this.isAbilityModalVisible = true

      if (type === 'root') {
        if (this.model.type === 'No Type') {
          this.model.type = 'Entity'
        }

        var path = ['oneOf']
        this.$cardSchema.oneOf.forEach((cardType, index) => {
          if (cardType.properties[this.model.type]) {
            path.push(index, 'properties', this.model.type, 'properties', 'Abilities', 'items', 'oneOf')
            this.currentNode.path = path

            console.log('cardtype: ', cardType)
            let options = cardType.properties[this.model.type].properties.Abilities.items.oneOf
            console.log('options', options)

            console.log('path: ', this.currentNode.path)

            let dialog = {
              title: 'New Ability',
              description: 'Pick an ability type:',
              type: 'root',
              options: []
            }

            options.forEach((option, index) => {
              dialog.options.push({
                name: option.description,
                schemaPath: ['items', 'oneOf', index, 'properties', option.description],
                abilityPath: [option.description],
                title: option.title,
                description: option.properties[resolveParagraph(option.description)].description
              })
            })

            this.abilityOptions = options
            this.abilityDialog = dialog
          }
        })
      } else {
        console.log('modal type: ', type)
      }
      console.log('currentNode on showAbilityModal: ', this.currentNode)
    },
    closeAbilityModal () {
      console.log('ability after close modal: ', this.ability)
      console.log('curNode after close modal: ', this.currentNode)
      this.isAbilityModalVisible = false
    },
    getNumbers (start, stop, min) {
      if (min >= stop) {
        return new Array(min + 1 - start).fill(start).map((n, i) => n + i)
      } else {
        return new Array(stop + 1 - start).fill(start).map((n, i) => n + i)
      }
    },
    getTags (idx) {
      if (this.$cardSchema.oneOf) {
        let usedTags = []
        let allTags = this.$cardSchema.oneOf[0].properties.Action.properties.Tags.items.enum

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
      if (this.model.type !== 'Headquarter') {
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
      } else if (this.model.type === 'Headquarter') {
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
    }
  }
}
</script>

<style scoped lang="scss">
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
    margin-bottom: 1.5em;

    @media (max-width: 480px) {
      flex-flow: column;
    }
  }
  .progress-item {
    cursor: pointer;
    margin: 0.3em;
    border: 4px solid white;
    padding: 0.2em;
    transform: skewX(-15deg);
  }

  .button-file {
    background-color: white;
    color: black;
    padding: 0.1em 1em;
    box-shadow: 7px 7px 0 black;
    border: none;
    cursor: pointer;
  }

  .inputfile {
    display: none;
  }

  .col-settings {
    padding: 0 2em 0 0;
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
