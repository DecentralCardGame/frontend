<template>
  <div id="AbilityComponentInside"
    class="flex flex-row">

      <div
        id="interaction"
        v-for="(entry, index) in ability.interaction"
        :key="index"
        class="text-[24px] flex flex-row justify-start items-center"
      >
        <div id="pre" class="">
          {{ entry.pre }}
        </div>

        <!-- pick one entry of an enum via dropdown -->
        <div
          id="enum dropdown"
          v-if="entry.btn.type === 'enum'">
          <Dropdown
            v-model="entry.btn.label"
            :options="enumOptions(entry)"
            @change="showAbilityModal(ability, entry.btn)"
          />
        </div>

        <!-- pick an int from a dropdown case -->
        <div id="int"
          v-else-if="entry.btn.type === 'int'">
          <Dropdown
            v-model="entry.btn.label"
            :options="intRange(entry)"
            @change="showAbilityModal(ability, entry.btn)"
          />
        </div>

        <!-- pick an int or a variable (X) from dropdown case -->
        <div id="intX"
          v-else-if="entry.btn.type === 'intX'">
          <Dropdown
            v-model="entry.btn.label"
            :options="intXRange(entry)"
            @change="showAbilityModal(ability, entry.btn)"
          />
        </div>

        <!-- toggle a bool via click case -->
        <div
          v-else-if="entry.btn.label.slice && entry.btn.label.slice(-1) === '-'"
          class=""
          @click="showAbilityModal(ability, entry.btn)"
        >
          {{ entry.btn.label }}
        </div>

        <!-- default case (interfaces and rest) -->
        <div
          v-else
          id="btn.label"
          class="m-2 py-2 px-4 text-[24px] uppercase bg-transparent hover:bg-white hover:bg-opacity-70 hover:text-[#D82027] border-2 border-gray-300 hover:cursor-pointer "
          @click="showAbilityModal(ability, entry.btn)"
        >
          {{ entry.btn.label }}
        </div>
        {{ entry.post }}
      </div>
      <div
        class="m-2 py-2 px-4 text-[24px] text-center border-2 border-gray-300 bg-transparent cursor-pointer hover:bg-black hover:text-white border-2 border-gray-300"
        @click="deleteAbility()"
      >
        X
      </div>

  </div>
  <div class="">
      <AbilityModal
        v-if="isAbilityModalVisible"
        :dialog-prop="dialog"
        :ability-prop="ability"
        :cardmodel="model"
        @update:ability="updateAbility($event)"
        @close="closeAbilityModal"
      />
  </div>
</template>

<script>
import * as R from 'ramda'
import AbilityModal from '@/components//modals/AbilityModal.vue'
import Dropdown from "@/components/elements/Dropdown/Dropdown.vue";
import { createInteraction, updateInteraction, shallowClone, atPath } from '../utils/utils.js'
import { useCardsRules } from "@/def-composables/useCardRules";

const unrequiredLabel = "[ANY]"

export default {
  name: 'AbilityComponent',
  components: { AbilityModal, Dropdown, },
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
