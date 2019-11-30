<template>
  <div>
    <AbilityModal
      v-if="isAbilityModalVisible"
      v-bind:dialog="dialog"
      v-bind:elements="elements"
      v-bind:abilities="abilities"
      @close="closeAbilityModal"
    />
    <div v-for="entry in ability.interaction" class="ability" >
      {{entry.pre}}
      <div class="clickable-option" @click="showAbilityModal(entry)"> {{entry.btn}} </div>
      {{entry.post}}
    </div>

  </div>
</template>

<script>
import AbilityModal from './AbilityModal.vue'

export default {
  name: 'AbilityComponent',
  components: {AbilityModal},
  props: {
    elements: Object,
    ability: Object,
    dialog: Object,
    abilities: Array
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
    showAbilityModal (entry) {
      console.log(entry.type)
      this.dialog = this.elements[entry.type].dialog
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
