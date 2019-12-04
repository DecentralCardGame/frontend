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
              @click="showAbilityModal('root')"> New Ability </button>

            <AbilityModal
              v-if="isAbilityModalVisible"
              v-bind:dialog="abilityDialog"
              v-bind:options="abilityOptions"
              v-bind:abilities="abilities"
              @close="closeAbilityModal"
            />
          </template>
          <div v-for="ability in abilities">
            <AbilityComponent
              v-bind:ability="ability"
              v-bind:dialog="abilityDialog"
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
import { generateAndBroadcastTx, buyCardSchemeTx, saveContentToUnusedCardSchemeTx, notify, sampleImg, resolveParagraph } from '../utils.js'

export default {
  name: 'NewCardPage',
  components: {CardComponent, ContentContainerComponent, AbilityComponent, BuySchemeModal, AbilityModal},
  data () {
    return {
      isAbilityModalVisible: false,
      isBuySchemeModalVisible: false,
      activeStep: 0,
      abilities: [],
      abilityOptions: {},
      currentNode: Object,
      abilityDialog: {},
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
        console.log("rules: ", api)
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
    showAbilityModal (type) {
      this.isAbilityModalVisible = true

      if (type === 'root') {
        if(this.model.type === 'No Type') {
          this.model.type = 'Entity'
        }

        this.rules.oneOf.forEach((cardType, index) => {
          
          if(cardType.properties[this.model.type]) {
            
            let options = cardType.properties[this.model.type].properties.Abilities.items.oneOf

            let dialog = {
              title: 'New Ability',
              description: 'Pick an ability type:',
              type: 'root',
              options: []
            }

            options.forEach(option => {
              dialog.options.push({
                name: option.description,
                title: option.title,
                description: option.properties[resolveParagraph(option.description)].description
              })
            })

            console.log("dialog: ", dialog)
            this.abilityOptions = options
            this.abilityDialog = dialog
          } else {
            console.log('oh shit, cardtype not found')
          }
        })

        
      }
      
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
