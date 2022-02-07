<template>
  <div>
    <div
      v-for="(entry, index) in ability.interaction"
      :key="index"
      class="ability"
    >
      {{ entry.pre }}

      <!-- pick one entry of an enum via dropdown -->
      <select
        v-if="entry.btn.type === 'enum'"
        v-model="entry.btn.label"
        @change="showAbilityModal(ability, entry.btn, index)"
      >
        <option
          v-for="item in R.path(entry.btn.rulesPath, $cardRules).enum"
          :key="item"
          :value="item"
        >
          {{ item }}
        </option>
      </select>

      <!-- pick an int from a dropdown case -->
      <select
        v-else-if="entry.btn.type === 'int'"
        v-model="entry.btn.label"
        @change="showAbilityModal(ability, entry.btn, index)"
      >
        <option
          v-for="n in R.range(R.path(entry.btn.rulesPath, $cardRules).min || 0, R.path(entry.btn.rulesPath, $cardRules).max + 1)"
          :key="n"
          :value="n"
        >
          {{ n }}
        </option>
      </select>

      <!-- pick an int or a variable from dropdown case -->
      <select
        v-else-if="entry.btn.type === 'intX'"
        v-model="entry.btn.label"
        @change="showAbilityModal(ability, entry.btn, index)"
      >
        <option
          v-for="n in R.range(R.path(entry.btn.rulesPath, $cardRules).children.SimpleIntValue.min || 0, R.path(entry.btn.rulesPath, $cardRules).children.SimpleIntValue.max + 1)"
          :key="n"
          :value="n"
        >
          {{ n }}
        </option>
        <option
          v-for="n in R.path(entry.btn.rulesPath, $cardRules).children.IntVariable.enum"
          :key="n"
          :value="n"
        >
          {{ n }}
        </option>
      </select>

      <!-- toggle a bool via click case -->
      <div
        v-else-if="entry.btn.label.slice && entry.btn.label.slice(-1) === '-'"
        class="clickable-option--negated"
        @click="showAbilityModal(ability, entry.btn, index)"
      >
        {{ entry.btn.label }}
      </div>

      <!-- default case (interfaces and rest) -->
      <div
        v-else
        class="clickable-option"
        @click="showAbilityModal(ability, entry.btn, index)"
      >
        {{ entry.btn.label }}
      </div>
      {{ entry.post }}
    </div>

    <span
      class="text-close"
      @click="deleteAbility()"
    >
      X
    </span>
    <div class="ability-modal-container">
      <AbilityModal
        v-if="isAbilityModalVisible"
        :dialog-prop="dialog"
        :ability="ability"
        :cardmodel="model"
        @update:ability="updateAbility($event)"
        @close="closeAbilityModal"
      />
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import AbilityModal from '@/components//modals/AbilityModal.vue'
import { createInteraction, updateInteraction, shallowClone, atPath } from '../utils/utils.js'

export default {
  name: 'AbilityComponent',
  components: { AbilityModal },
  props: {
    dialogProp: {
      type: Object,
      default() {
        return {}
      }
    },
    abilityProp: {
      type: Object,
      default() {
        return {}
      }
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data () {
    return {
      ability: {},
      dialog: {},
      selectedInt: 0,
      isAbilityModalVisible: false
    }
  },
  created () {
    this.ability = this.abilityProp
    this.dialog = this.dialogProp
  },
  methods: {
    showAbilityModal (ability, btn, index) {
      let atRules = R.curry(atPath)(this.$cardRules)
      let atAbility = R.curry(atPath)(ability)

      index; // currently not in use TODO check if it should be removed alltogether
      this.ability.clickedBtn = btn

      let node = atRules(btn.rulesPath)
      let thereWillBeModal = true

      // depending on type, create dialog
      if (node.type) {
        console.log('node type', node.type)
        switch (node.type) {
          case 'array': {
            // In this case there is no modal to be displayed just update the interaction, this interaction is only for adding more items
            thereWillBeModal = false
            let copyButton = R.clone(this.ability.clickedBtn.template)
            copyButton.pre = ''

            copyButton.btn.abilityPath[copyButton.btn.abilityPath.length - 1] += 1

            this.ability.interaction = R.insert(btn.id, copyButton, this.ability.interaction)

            // update all btn ids
            this.ability.interaction.forEach((item, idx) => {
              item.btn.id = idx
            })
            break
          }
          case 'interface': {
            let options = atRules(btn.rulesPath).children

            // special case intX: IntVariable + SimpleIntValue = condense in one thing, don't show dialog
            if (R.contains("IntVariable", R.keys(options)) && R.contains("SimpleIntValue", R.keys(options))) {
              console.log("special case")
              thereWillBeModal = false

              console.log('attaching:', btn.label, 'to', this.ability.clickedBtn.abilityPath)

              let intX = {}
                
              // variable case
              if( isNaN(btn.label)) {
                intX.IntVariable = btn.label
              }
              // number case
              else {
                intX.SimpleIntValue = btn.label
              }

              console.log("intX", intX)

              this.attachToAbility(this.ability.clickedBtn.abilityPath, intX)
              
              this.dialog = "surpressed - no modal"
            }
            // default case
            else {

              // check singleUse case  // TODO check if this is still relevant
              let prevElements = atAbility(R.dropLast(1, btn.abilityPath))
              if (prevElements) {
                let singleUseHappened = R.pluck('singleUse', prevElements)
                if (!singleUseHappened.isEmpty) {
                  options = R.dissoc(singleUseHappened, options)
                }
              }
              
              // check if selection is optional // TODO check how to make this work again
              /*
              if (atRules(btn.rulesPath).optional) {
                options.noSelect = {
                  description: 'This means no condition will be checked here.',
                  name: 'No Condition',
                  schemaPath: [],
                  abilityPath: [],
                  type: 'interface',
                  interactionText: 'no §Condition'
                }
              }
              */

              console.log("handle interface:", options)

              this.dialog = {
                title: atRules(btn.rulesPath).name,
                description: atRules(btn.rulesPath).description,
                type: atRules(btn.rulesPath).type,
                btn: btn,
                options: options,
                rulesPath: btn.rulesPath,
                abilityPath: btn.abilityPath
              }
            }
            break
          }
          case 'struct': {
            // In this case there is no modal to be displayed just update the interaction
            thereWillBeModal = false

            let interactionText = atRules(btn.rulesPath).interactionText
            let newInteraction = createInteraction(interactionText, btn.abilityPath, R.append('children', btn.rulesPath), this.$cardRules)

            updateInteraction(this.ability, this.ability.clickedBtn.id, newInteraction)
            this.attachToAbility(btn.abilityPath, shallowClone(atRules(btn.rulesPath).children))
            break
          }
          // this is a terminal case, specify an integer
          case 'int':
            // In this case there is no modal to be displayed just update the interaction
            thereWillBeModal = false

            this.attachToAbility(this.ability.clickedBtn.abilityPath, btn.label)
            break
          // this is a terminal case, pick one string from enum
          case 'enum': {
            // In this case there is no modal to be displayed just update the interaction
            thereWillBeModal = false
            this.attachToAbility(this.ability.clickedBtn.abilityPath, btn.label)

            /* in the past a dialog was created here:
            this.dialog = {
              title: atRules(btn.rulesPath).name,
              description: 'pick one of the following:',
              type: 'enum',
              btn: btn,
              options: []
            }

            // recursively go down until only strings are left
            let traverseChildren = array => {
              let isString = x => R.type(x) === "String"
              if (R.all(isString)(array)) {
                return array
              } else {
                return R.map(x => traverseChildren(x.children), array)
              }
            }

            let strings = R.uniq(R.flatten(traverseChildren(node.enum)))

            for (let prop in strings) {
              this.dialog.options.push({
                name: strings[prop],
                schemaPath: [],         // how about paths TODO
                abilityPath: [],
                title: strings[prop],
                description: ''
              })
            }
            */

            break
          }
          // this is a terminal case, enter a string or pick one if enums are present
          case 'string': {
            this.dialog = {
              title: atRules(btn.rulesPath).name,
              description: 'please write down:',
              type: 'stringEnter',
              btn: btn,
              options: [{
                name: '',
                schemaPath: [],
                abilityPath: [],
                title: btn.type,
                description: ''
              }],
              entries: []
            }
            break
          }
          // this is a terminal case, yes or no
          case 'boolean': {
            // In this case there is no modal to be displayed just update the interaction
            thereWillBeModal = false

            let negated = R.takeLast(1, this.ability.clickedBtn.label) !== '!'
            this.ability.clickedBtn.label = R.dropLast(1, this.ability.clickedBtn.label) + (negated ? '!' : '-')

            this.attachToAbility(this.ability.clickedBtn.abilityPath, negated)
            break
          }
          default:
            console.error('node.type is unknown')
            break
        }

        // this is the bugfix for replay selection bug
        R.forEachObjIndexed(function(option) {
          if (option.selected)
            delete option.selected
        }, this.dialog.options)

        console.log('created dialog: ', this.dialog)
      } else {
        console.error('node.type not defined')
      }

      this.isAbilityModalVisible = thereWillBeModal
    },
    attachToAbility (path, object) {
      let ability = R.assocPath(path, object, this.ability)

      this.ability = ability
      this.$emit('update:ability', ability)
    },
    updateAbility (ability) {
      this.ability = ability
      this.$emit('update:ability', ability)
    },
    deleteAbility () {
      this.ability = null
      this.$emit('update:ability', null)
    },
    closeAbilityModal () {
      this.isAbilityModalVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../scss/variables";

  .clickable-option {
    display: inline-block;
    border: dotted 1px white;
    font-weight: bold;
    cursor: pointer;
  }

  .clickable-option--negated {
    text-decoration: line-through;
    display: inline-block;
    border: dotted 1px white;
    cursor: pointer;
  }

  .ability {
    display: inline-block;
  }

  .ability-modal-container {
    position: relative;
    z-index: 3;
  }

  .text-close {
    position: absolute;
    right: 1rem;
    cursor: pointer;
    font-weight: bold;
    padding: 0.25rem;
    line-height: 100%;
  }
</style>
