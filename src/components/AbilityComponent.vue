<template>
  <div>
    <AbilityModal
      ref="abilityModal"
      v-show="isAbilityModalVisible"
      v-bind:dialog="dialog"
      v-bind:currentNode="currentNode"
      v-on:update:currentNode="currentNode = $event"
      v-bind:ability="ability"
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
import { } from './utils.js'

export default {
  name: 'AbilityComponent',
  components: {AbilityModal},
  props: {
    elements: Object,
    currentNode: Object,
    dialog: Object,
    ability: Object
  },
  data () {
    return {
      isAbilityModalVisible: false
    }
  },
  mounted: () => {
  },
  computed: {
  },
  methods: {
    showAbilityModal (ability, btn, index) {
      // first set current node to clicked node
      this.writeNode('interactionId', index)
      let node = R.path(btn.schemaPath, this.$cardSchema)

      console.log('entering showAbilityModal with btn: ', btn, ' and node: ', node)

      let thereWillBeModal = true

      // depending on type, create dialog
      if (node.type) {
        switch (node.type) {
          case 'array':

            if (node.items.enum) {
              this.writeNode('modalType', 'items.enum')

              let enums = node.items.enum
              console.log('modalType: items.enums: ', enums)

              let dialog = {
                title: btn.type,
                description: 'choose your destiny:',
                type: 'enum',
                options: [],
                enum: enums
              }

              for (let prop in enums) {
                dialog.options.push({
                  name: enums[prop],
                  schemaPath: [], // TODO YES
                  abilityPath: [],
                  title: enums[prop],
                  description: ''
                })
              }

              this.dialog = dialog

            // this is an array radio case, where 1 item is added
            } else if (node.items.oneOf) {
              this.writeNode('modalType', 'items.oneOf')
              console.log('modalType: items.oneOf')

              let options = node.items.oneOf

              let dialog = {
                title: btn.type,
                description: 'choose your destiny:',
                type: 'radio',
                options: []
              }

              for (let prop in options) {
                let propName = options[prop].required[0]
                dialog.options.push({
                  name: options[prop].description,
                  schemaPath: ['items', 'oneOf', prop],
                  abilityPath: [propName],
                  title: options[prop].title,
                  description: options[prop].description
                })
              }

              this.dialog = dialog
            }
            break

          case 'object':
          // this is the typical radio case, where 1 item is selected
            if (R.has('oneOf', node)) {
              this.writeNode('modalType', 'object.oneOf')
              console.log('modalType: object.oneOf')

              let options = node.oneOf

              let dialog = {
                title: btn.type,
                description: 'choose your destiny:',
                type: 'radio',
                options: []
              }

              for (let prop in options) {
                let propName = options[prop].required[0]
                dialog.options.push({
                  name: options[prop].description,
                  schemaPath: ['oneOf', prop, 'properties', propName],
                  abilityPath: [propName],
                  title: options[prop].title,
                  description: options[prop].description
                })
              }

              this.dialog = dialog
            } else if (R.has('properties', node)) {
            // this is a terminal case, pick integers
              if (R.all(props => props.type === 'integer', R.values(node.properties))) {
                this.writeNode('modalType', 'object.integers')
                console.log('modalType: object.integers')

                let keys = R.keys(node.properties)

                let dialog = {
                  title: btn.type,
                  description: 'choose your destiny:',
                  type: 'integerList',
                  options: [],
                  entries: keys
                }

                for (let prop in keys) {
                  dialog.options.push({
                    name: keys[prop],
                    schemaPath: [],
                    abilityPath: [],
                    title: keys[prop],
                    description: ''
                  })
                }

                this.dialog = dialog

              // this is a typical case for not showing a modal, still we want to call addAbility
              } else {
                this.writeNode('modalType', 'object.noInteraction')
                console.log('modalType: object.noInteraction')

                thereWillBeModal = false

                this.dialog.type = 'noDialog'

                this.$refs.abilityModal.addAbility()
              }
            } else {
              console.error('object yes, but has no properties?!?')
            }
            break

          // this is a terminal case, yes or no
          case 'boolean': {

            this.writeNode('modalType', 'boolean')
            console.log('modalType: boolean')

            let dialog = {
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
            }

            this.dialog = dialog
            break
          }
          // this is a terminal case, specify an integer
          case 'integer':

            this.writeNode('modalType', 'integer')
            console.log('modalType: integer')

            var dialog = {
              title: btn.type,
              description: 'choose a number between ' + node.minimum + ' and ' + node.maximum + ':',
              type: 'integer',
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

            this.dialog = dialog
            break

          // this is a terminal case, enter a string or pick one if enums are present
          case 'string':

            if (node.enum) {
              this.writeNode('modalType', 'stringEnum')
              console.log('modalType: stringEnum')

              let strings = node.enum

              dialog = {
                title: btn.type,
                description: 'pick one of the following:',
                type: 'stringEnum',
                options: [],
                entries: strings
              }

              for (let prop in strings) {
                dialog.options.push({
                  name: strings[prop],
                  schemaPath: [],
                  abilityPath: [],
                  title: strings[prop],
                  description: ''
                })
              }

              this.dialog = dialog
              break
            } else {
              this.writeNode('modalType', 'stringEnter')
              console.log('modalType: stringEnter')

              dialog = {
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

              this.dialog = dialog
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
    setNode (reference) {
      this.currentNode = reference
      this.$emit('update:currentNode', this.currentNode)
    },
    writeNode (prop, data) {
      this.currentNode[prop] = data
      this.$emit('update:currentNode', this.currentNode)
    },
    closeAbilityModal () {
      console.log('currentNode on closeAbilityModal in AbilityComponent: ', this.currentNode)
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
