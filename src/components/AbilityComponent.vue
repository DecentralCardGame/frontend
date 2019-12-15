<template>
  <div>
    <AbilityModal
      v-if="isAbilityModalVisible"
      v-bind:rules="rules"
      v-bind:dialog="dialog"
      v-bind:currentNode="currentNode"
      v-on:update:currentNode="currentNode = $event"
      v-bind:ability="ability"
      @close="closeAbilityModal"
    />
    <div v-for="(entry, index) in ability.interaction" class="ability" >
      {{entry.pre}}
      <div class="clickable-option" @click="showAbilityModal(ability, entry.btn, index)"> {{entry.btn.label}} </div>
      {{entry.post}}
    </div>

  </div>
</template>

<script>
import * as R from 'ramda'
import AbilityModal from './AbilityModal.vue'
import { filterSelection, resolveParagraph } from './utils.js'

export default {
  name: 'AbilityComponent',
  components: {AbilityModal},
  props: {
    rules: Object,
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
    showAbilityModal (ability, btn, index)  {
      console.log('entering showAbilityModal with btn and obj: ', btn, R.path(btn.schemaPath, this.rules))

      // first set current node to clicked node
      this.writeNode('interactionId', index)
      let node = R.path(btn.schemaPath, this.rules)
      console.log('node: ', node)

      // depending on type, create dialog
      if (node.type) {
        switch (node.type) {
        case 'array':

          if (node.items.enum) {

            let enums = node.items.enum

            console.log('enums: ', enums)
            let dialog = {
              title: btn.type,
              description: 'choose your destiny:',
              type: 'enum',
              options: [],
              enum: enums
            }

            for (var prop in enums) {
              dialog.options.push({
                name: enums[prop],
                schemaPath: [], // TODO YES
                abilityPath: [],
                title: enums[prop],
                description: ''
              })
            }

            this.dialog = dialog

          } else if (node.items.oneOf) {
            console.log('items.oneOf')

            let options = node.items.oneOf

            let dialog = {
              title: btn.type,
              description: 'choose your destiny:',
              type: 'radio',
              options: []
            }

            for (var prop in options) {
              let propName = options[prop].required[0]
              dialog.options.push({
                name: options[prop].description,
                schemaPath: ['items', 'oneOf', prop, 'properties', propName],
                abilityPath: [propName],
                title: options[prop].title,
                description: options[prop].description
              })
            }

            this.dialog = dialog
          }
          break
        case 'object': 
          console.log('object!')

          // oneOf 
          if(R.has('oneOf', node)) {
            console.log('has oneOf')
          }

          if(node.properties) {
            // this is a terminal case, pick integers
            if(R.all(x => x.type === 'integer', node.properties)) {
              let keys = R.keys(node.properties)

              let dialog = {
                title: btn.type,
                description: 'choose your destiny:',
                type: 'integerList',
                options: [],
                entries: keys
              }

              for (var prop in keys) {
                dialog.options.push({
                  name: keys[prop],
                  schemaPath: [],
                  abilityPath: [],
                  title: keys[prop],
                  description: ''
                })
              }

              this.dialog = dialog

            }
          } else {
            console.error('object yes, further ideas no')
          }
          break
        case 'boolean':
          console.log('boolean!')

            let dialog = {
              title: btn.type,
              description: 'choose your destiny:',
              type: 'checkbox',
              options: [{
                name: 'marius hat gefailed',
                schemaPath: [],
                abilitPath: [],
                title: 'Yes',
                description: 'Marius hat keine Description Property hinzugefügt'
              }]
            }

            this.dialog = dialog
          break
        default: 
          console.error('node.type is unknown')
          break
        }
        console.log('created dialog: ', this.dialog)

      } else {
        console.error('node.type not defined')
      }

      this.isAbilityModalVisible = true
    },
    setNode(reference) {
      this.currentNode = reference
      this.$emit('update:currentNode', this.currentNode)
    },
    writeNode(prop, data) {
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
