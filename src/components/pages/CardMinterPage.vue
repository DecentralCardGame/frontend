<template>
    <div class="gallery-view">
      <div v-for="(card, index) in sampleCards">
        <CardComponent v-bind:model="card" ></CardComponent>
      </div>
    </div>
</template>

<script>
import ContentContainerComponent from '@/components/ContentContainerComponent'
import CardComponent from '@/components/CardComponent'
import {cardJson} from '../utils.js'

export default {
  name: 'CardMinter',
  components: {CardComponent, ContentContainerComponent},
  data () {
    return {
      sampleCards: cardJson,
      cards: null,
      sampleCard: {
        name: 'Name',
        description: '',
        ability: '',
        notes: '',
        article: 'the',
        surname: 'Surname',
        type: 'No Type',
        tags: [],
        cost: {
          lumber: 0,
          food: 0,
          iron: 0,
          mana: 0,
          energy: 0,
          generic: 0
        },
        ticks: 0,
        defense: 0,
        attack: 0
      }
    }
  },
  mounted () {
    console.log(this.sampleCards)
  }
}
</script>

<style scoped>
.gallery-view {
  text-shadow: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
}
</style>
