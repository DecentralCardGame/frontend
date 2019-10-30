<template>
    <div class="gallery-view">
      <CardComponent v-bind:model="sampleCard" v-bind:active-step="3"></CardComponent>
      <CardComponent v-bind:model="sampleCard" v-bind:active-step="3"></CardComponent>
      <CardComponent v-bind:model="sampleCard" v-bind:active-step="3"></CardComponent>
      <CardComponent v-bind:model="sampleCard" v-bind:active-step="3"></CardComponent>
      <CardComponent v-bind:model="sampleCard" v-bind:active-step="3"></CardComponent>
      <CardComponent v-bind:model="sampleCard" v-bind:active-step="3"></CardComponent>
    </div>
</template>

<script>
import axios from 'axios'
import ContentContainerComponent from '@/components/ContentContainerComponent'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'GalleryPage',
  components: {CardComponent, ContentContainerComponent},
  data () {
    return {
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
    this.$http.get('cardservice/cards ')
      .then(res => {
        console.log(res)

        let cardData = res.data.data

        cardData.forEach(function (card) {
          this.cards.add('ELEMENT')
        })
      })
  }
}
</script>

<style scoped>
.gallery-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
}
</style>
