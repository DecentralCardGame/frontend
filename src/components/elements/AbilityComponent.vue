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
        @change="showAbilityModal(ability, entry.btn)"
      >
        <option
          v-for="item in enumOptions(entry)"
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
        @change="showAbilityModal(ability, entry.btn)"
      >
        <option
          v-for="n in intRange(entry)"
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
        @change="showAbilityModal(ability, entry.btn)"
      >
        <option
          v-for="n in intXRange(entry)"
          :key="n"
          :value="n"
        >
          {{ n }}
        </option>
        <option
          v-for="n in enumRange(entry)"
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
        @click="showAbilityModal(ability, entry.btn)"
      >
        {{ entry.btn.label }}
      </div>

      <!-- default case (interfaces and rest) -->
      <div
        v-else
        class="clickable-option"
        @click="showAbilityModal(ability, entry.btn)"
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
        :ability-prop="ability"
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
import { useCardsRules } from "@/def-composables/useCardRules";

const unrequiredLabel = "[ANY]"

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
  setup() {
    const { rules } = useCardsRules()

    return { cardRules: rules }
  },
  methods: {
    intRange(entry) {
      return R.range(R.path(entry.btn.rulesPath, this.cardRules.Card).min || 0, R.path(entry.btn.rulesPath, this.cardRules.Card).max + 1)
    },
    intXRange(entry) {
      return R.range(R.path(entry.btn.rulesPath, this.cardRules.Card).children.SimpleIntValue.min || 0, R.path(entry.btn.rulesPath, this.cardRules.Card).children.SimpleIntValue.max + 1)
    },
    enumRange(entry) {
      return R.path(entry.btn.rulesPath, this.cardRules.Card).children.IntVariable.enum
    },
    showAbilityModal (ability, btn) {
      let atRules = R.curry(atPath)(this.cardRules.Card)
      let atAbility = R.curry(atPath)(ability)

      this.ability.clickedBtn = btn

      let node = atRules(btn.rulesPath)
      let thereWillBeModal = true

      // depending on type, create dialog
      if (node.type) {
        console.log('node type:', node.type, " btn:", btn)
        switch (node.type) {
          case 'array': {
            // In this case there is no modal to be displayed just update the interaction, this interaction is only for adding more items
            thereWillBeModal = false
            let copyButton = R.clone(this.ability.clickedBtn.template)
            copyButton.pre = ' '

            // adjust the effect array id in the abilityPath
            copyButton.btn.abilityPath[copyButton.btn.abilityPath.length - 1] = R.path(R.dropLast(1, copyButton.btn.abilityPath), this.ability).length

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
            if (R.includes("IntVariable", R.keys(options)) && R.includes("SimpleIntValue", R.keys(options))) {
              console.log("special case")
              thereWillBeModal = false

              console.log('attaching:', btn.label, 'to', this.ability.clickedBtn.abilityPath)

              let intX = {}

              // variable case
              if (isNaN(btn.label)) {
                intX.IntVariable = btn.label
              }
              // number case
              else {
                intX.SimpleIntValue = btn.label
              }

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

            if (btn.label === unrequiredLabel) {
              btn.label = ""
              this.attachToAbility(R.dropLast(1, this.ability.clickedBtn.abilityPath), {})
            }
            else
              this.attachToAbility(this.ability.clickedBtn.abilityPath, btn.label)

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
    },
    enumOptions (entry) {
      let required = R.path(R.dropLast(2, entry.btn.rulesPath), this.cardRules.Card).required
      let name = R.last(entry.btn.rulesPath)
      if ( required && R.includes(name, required) ) {
        return R.path(entry.btn.rulesPath, this.cardRules.Card).enum
      }
      else {
        return R.prepend(unrequiredLabel, R.path(entry.btn.rulesPath, this.cardRules.Card).enum)
      }

    }
  }
}
</script>

<style>

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
    margin-top: 1vh;
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
