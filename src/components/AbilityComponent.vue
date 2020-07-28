<template>
  <div>
    <div
      v-for="(entry, index) in ability.interaction"
      :key="index"
      class="ability"
    >
      {{ entry.pre }}
      <div 
        v-if="entry.btn.type === 'int'"
        
      >
        {{ entry.btn.label }}
      </div>
      <div v-else-if="entry.btn.label.slice && entry.btn.label.slice(-1) === '-'"
        class="clickable-negated-option"
        @click="showAbilityModal(ability, entry.btn, index)"
      >
        {{ entry.btn.label }}
      </div>
      <div v-else
        class="clickable-option"
        @click="showAbilityModal(ability, entry.btn, index)"
      >
        {{ entry.btn.label }}
      </div>
      {{ entry.post }}
    </div>
    <div class="ability-modal-container">
      <AbilityModal
              v-show="isAbilityModalVisible"
              v-bind:dialog="dialog"
              v-bind:ability="ability"
              v-on:update:ability="ability = $event"
              @close="closeAbilityModal"
      />
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import AbilityModal from './AbilityModal.vue'
import { createInteraction, updateInteraction, shallowClone, atPath } from './utils.js'

export default {
  name: 'AbilityComponent',
  components: {AbilityModal},
  props: {
    dialog: Object,
    ability: Object
  },
  data () {
    return {
      isAbilityModalVisible: false
    }
  },
  methods: {
    showAbilityModal (ability, btn, index) {
      let atRules = R.curry(atPath)(this.$cardRules)
      let atAbility = R.curry(atPath)(ability)

      index; // currently not in use
      this.ability.clickedBtn = btn

      let node = atRules(btn.rulesPath)
      let thereWillBeModal = true

      // depending on type, create dialog
      if (node.type) {
        switch (node.type) {
          case 'array': {
            // In this case there is no modal to be displayed just update the interaction, this interaction is only for adding more items
            thereWillBeModal = false
            let copyButton = R.clone(this.ability.clickedBtn.template)

            // TODO check if this is fine for everything else than activatedAbility (removes the : )
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

            // check singleUse case
            let prevElements = atAbility(R.dropLast(1, btn.abilityPath))
            if (prevElements) {
              let singleUseHappened = R.pluck('singleUse', prevElements)
              if (!singleUseHappened.isEmpty) {
                options = R.dissoc(singleUseHappened, options)
              }
            }

            // check if selection is optional
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

            let dialog = {
              title: atRules(btn.rulesPath).name,
              description: atRules(btn.rulesPath).description,
              type: atRules(btn.rulesPath).type,
              btn: btn,
              options: options,
              rulesPath: btn.rulesPath,
              abilityPath: btn.abilityPath
            }

            this.dialog = dialog
            break
          }
          case 'struct': {
            // In this case there is no modal to be displayed just update the interaction
            thereWillBeModal = false

            let interactionText = atRules(btn.rulesPath).interactionText
            let newInteraction = createInteraction(interactionText, btn.abilityPath, R.append('children', btn.rulesPath), this.$cardRules)

            updateInteraction(this.ability, this.ability.clickedBtn.id, newInteraction)
            this.attachToAbility(btn.abilityPath, shallowClone(atRules(btn.rulesPath).children))   // TODO test if this works
            break
          }
          // this is a terminal case, specify an integer
          case 'int':
            console.log('atrules', atRules(btn.rulesPath))

            this.dialog = {
              title: atRules(btn.rulesPath).name,
              description: 'choose a number between ' + atRules(btn.rulesPath).min + ' and ' + atRules(btn.rulesPath).max + ':',
              type: 'integer',
              btn: btn,
              options: [{
                name: 'MORE!',
                schemaPath: [],
                abilityPath: [],
                title: '',
                description: ''
              },
                {
                  name: 'LESS..',
                  schemaPath: [],
                  abilityPath: [],
                  title: '',
                  description: ''
                }
              ]
            }
            break
          // this is a terminal case, pick one string from enum
          case 'enum': {
            this.dialog = {
              title: atRules(btn.rulesPath).name,
              description: 'pick one of the following:',
              type: 'stringEnum',
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

            let strings = R.uniq(R.flatten(traverseChildren(node.children)))

            for (let prop in strings) {
              this.dialog.options.push({
                name: strings[prop],
                schemaPath: [],         // how about paths TODO
                abilityPath: [],
                title: strings[prop],
                description: ''
              })
            }
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
    /*
    updateAbility (reference) {
      let ability = reference
      this.$emit('update:ability', ability)
    },*/
    closeAbilityModal () {
      this.isAbilityModalVisible = false
    }
  }
}
</script>

<style scoped>
  .clickable-option {
    display: inline-block;
    padding: 8px;
    color: black;
    background-color: #eeeeee;
    border-radius: 4px;
    cursor: pointer;
  }
  .clickable-negated-option {
    text-decoration: line-through;
    display: inline-block;
    padding: 8px;
    color: black;
    background-color: #eeeeee;
    border-radius: 4px;
    cursor: pointer;
  }

  .ability {
    display: inline-block;
  }

  .ability-modal-container {
    position: relative;
    z-index: 3;
  }
</style>
