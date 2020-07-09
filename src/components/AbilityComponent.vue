<template>
  <div>
    <AbilityModal
      ref="abilityModal"
      v-show="isAbilityModalVisible"
      v-bind:dialog="dialog"      
      v-bind:ability="ability"
      v-on:update:ability="ability = $event"
      @close="closeAbilityModal"
    />
    <div v-for="(entry, index) in ability.interaction" class="ability" v-bind:key="index">
      {{entry.pre}}
      <div class="clickable-option" @click="showAbilityModal(ability, entry.btn, index)"> {{entry.btn.label}} </div>
      {{entry.post}}
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import AbilityModal from './AbilityModal.vue'
import { createInteraction, updateInteraction, climbRulesTree, shallowClone, atPath } from './utils.js' 

export default {
  name: 'AbilityComponent',
  components: {AbilityModal},
  props: {
    elements: Object,
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

      this.ability.clickedBtn = btn

      // first set current node to clicked node


      //let node = R.path(btn.schemaPath, this.$cardSchema)
      //let node = {type: this.dialog.type}
      index;

      console.log('dialog:', this.dialog)
      console.log('entering showAbilityModal with btn: ', btn)
      climbRulesTree
      console.log('atpath:', atRules(btn.rulesPath))

      let node = atRules(btn.rulesPath)

      let thereWillBeModal = true

      // depending on type, create dialog
      if (node.type) {
        switch (node.type) {
          case 'array': {
            // In this case there is no modal to be displayed just update the interaction, this interaction is only for adding more items
            thereWillBeModal = false
            let copyButton = R.clone(this.ability.clickedBtn.template)

            // TODO check if this is fine for everything else than activatedAbility (removes the :)
            copyButton.pre = ''
            
            copyButton.btn.abilityPath[copyButton.btn.abilityPath.length - 1] += 1

            this.ability.interaction = R.insert(btn.id, copyButton, this.ability.interaction)

            // update all btn ids
            this.ability.interaction.forEach((item, idx) => {
              item.btn.id = idx
            })

            console.log('abi', this.ability.interaction)
            break
          }
          case 'interface': {
            let dialog = {
              title: atRules(btn.rulesPath).name,
              description: atRules(btn.rulesPath).description,
              type: atRules(btn.rulesPath).type,
              btn: btn,
              options: atRules(btn.rulesPath).children,
              rulesPath: btn.rulesPath,
              abilityPath: btn.abilityPath
            }

            this.dialog = dialog
            break
          }
          // this is a terminal case, specify an integer
          case 'int':
            this.dialog = {
              title: btn.type,
              description: 'choose a number between ' + node.minimum + ' and ' + node.maximum + ':',
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
          case 'struct': {
            // In this case there is no modal to be displayed just update the interaction
            thereWillBeModal = false

            let interactionText = atRules(btn.rulesPath).interactionText
            
            let newInteraction = createInteraction(interactionText, btn.abilityPath, R.append('children', btn.rulesPath), this.$cardRules) 

            updateInteraction(this.ability, this.ability.clickedBtn.id, newInteraction)
            this.attachToAbility(btn.abilityPath, shallowClone(atRules(btn.rulesPath).children))   // TODO test if this works
            break
          }

          // this is a terminal case, yes or no
          case 'boolean': {
            console.log('modalType: boolean')

            this.dialog = {
              title: btn.type,
              description: 'choose your destiny:',
              type: 'checkbox',
              options: [{
                name: 'marius hat gefailed',
                schemaPath: [],
                abilityPath: [],
                title: 'Yes',
                description: node.description ? node.description : 'Marius hat keine Description Property hinzugefügt'
              }]
            };
            break
          }
          // this is a terminal case, enter a string or pick one if enums are present
          case 'string':

            if (node.enum) {
              console.log('modalType: stringEnum')

              let strings = node.enum

              this.dialog = {
                title: btn.type,
                description: 'pick one of the following:',
                type: 'stringEnum',
                options: [],
                entries: strings
              }

              for (let prop in strings) {
                this.dialog.options.push({
                  name: strings[prop],
                  schemaPath: [],
                  abilityPath: [],
                  title: strings[prop],
                  description: ''
                })
              }

              break
            } else {
              console.log('modalType: stringEnter')

              this.dialog = {
                title: btn.type,
                description: 'please let me know:',
                type: 'stringEnter',
                options: [{
                  name: 'yes',
                  schemaPath: [],
                  abilityPath: [],
                  title: btn.type,
                  description: ''
                }],
                entries: []
              }
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
      this.ability = R.assocPath(path, object, this.ability)
      this.$emit('update:ability', this.ability)
    },
    updateAbility (reference) {
      this.ability = reference
      this.$emit('update:ability', this.ability)
    },
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

  .ability {
    display: inline-block;
  }
</style>
