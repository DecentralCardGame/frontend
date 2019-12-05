<template>
  <div>
    <AbilityModal
      v-if="isAbilityModalVisible"
      v-bind:dialog="dialog"
      v-bind:currentNode="currentNode"
      @close="closeAbilityModal"
    />
    <div v-for="entry in ability.interaction" class="ability" >
      {{entry.pre}}
      <div class="clickable-option" @click="showAbilityModal(ability, entry.btn)"> {{entry.btn}} </div>
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
      console.log('currentNode: ', this.currentNode)
      console.log('ability:', ability)

      let properties = ability[ability.name].properties[btn]

      if (properties.type) {
        if (properties.type === 'array') {

          let properties = ability[ability.name].properties[btn].items.enum

          console.log('properties: ', properties)
          let dialog = {
            title: btn,
            description: 'choose your destiny:',
            type: 'enum',
            options: []
          }

          for (var prop in properties) {
            console.log(prop)
            dialog.options.push({
              name: properties[prop],
              title: properties[prop],
              description: ''
            })
          }

          console.log("dialog: ", dialog)
          this.dialog = dialog
        } else {
          console.log('zum geier?')
        }
      } else {

        console.log('properties: ', properties)

        let dialog = {
          title: btn,
          description: 'choose your destiny:',
          type: 'radio',
          options: []
        }

        for (var prop in properties) {
          console.log(prop)
          dialog.options.push({
            name: properties[prop].description,
            title: properties[prop].title,
            description: properties[prop].description
          })
        }

        console.log("dialog: ", dialog)
        this.dialog = dialog
      }


      this.isAbilityModalVisible = true
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
