<template>
  <div>
    <AbilityModal
      v-if="isAbilityModalVisible"
      v-bind:dialog="dialog"
      v-bind:currentNode="currentNode"
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
      // first set current node to clicked node
      this.writeNode('interactionId', index)
      console.log('currentNode: ', this.currentNode)
      console.log('ability:', ability)
      console.log('btn before type: ', btn)
      console.log('rules: ', this.rules)
      console.log('yes:', R.path(btn.path, this.rules))

      // then find out what type of modal is about to be opened
      let node = R.path(btn.path, this.rules)
      console.log('node: ', node)

      // depending on type, create dialog
      if (node.type) {
        if (node.type === 'array') {
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
                title: enums[prop],
                description: ''
              })
            }

            console.log("dialog: ", dialog)
            this.dialog = dialog

            this.setNode(ability[ability.name])

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
              dialog.options.push({
                name: options[prop].description,
                title: options[prop].title,
                description: options[prop].description
              })
            }

            console.log("dialog: ", dialog)
            this.dialog = dialog
          }

        } else if (node.type === 'object') {
          console.log('object!')

          if(R.all(x => x.type === 'integer', node.properties)) {
            let enums = R.keys(node.properties)

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
                title: enums[prop],
                description: ''
              })
            }

            this.dialog = dialog

            this.setNode(ability[ability.name])

            console.log(dialog)
            console.log(ability[ability.name])

          } else {
            console.error('object yes, further ideas no')
          }
        } else {
          console.error('node.type is unknown')
        }
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
