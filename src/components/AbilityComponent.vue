<template>
  <div>
    <AbilityModal
      v-if="isAbilityModalVisible"
      v-bind:dialog="dialog"
      v-bind:currentNode="currentNode"
      v-bind:ability="ability"
      @close="closeAbilityModal"
    />
    <div v-for="entry in ability.interaction" class="ability" >
      {{entry.pre}}
      <div class="clickable-option" @click="showAbilityModal(ability, entry.btn.type)"> {{entry.btn.label}} </div>
      {{entry.post}}
    </div>

  </div>
</template>

<script>
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
    showAbilityModal (ability, btn)  {
      // first set current node to clicked node
      console.log('currentNode: ', this.currentNode)
      console.log('ability:', ability)
      console.log('btn: ', btn)

      // then find out what type of modal is about to be opened
      let properties = ability[ability.name].properties[btn]
      console.log('properties: ', properties)

      // depending on type, create dialog
      if (properties.type) {
        if (properties.type === 'array') {
          if (properties.items.enum) {

            let enums = ability[ability.name].properties[btn].items.enum

            console.log('enums: ', enums)
            let dialog = {
              title: btn,
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
          } else if (properties.items.oneOf) {
            console.log('properties: ', properties)

            let options = properties.items.oneOf

            let dialog = {
              title: btn,
              description: 'choose your destiny:',
              type: 'radio',
              options: []
            }

            for (var prop in options) {
              console.log(prop)
              dialog.options.push({
                name: options[prop].description,
                title: options[prop].title,
                description: options[prop].description
              })
            }

            console.log("dialog: ", dialog)
            this.dialog = dialog
          }
        } else if (properties.type === 'object') {
          console.log('object?')
        } else {
          console.log('properties.type is array, but nothing else fits')
        }
      } else {
        
        console.log('properties.type not defined')
        console.log('properties: ', properties)
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
