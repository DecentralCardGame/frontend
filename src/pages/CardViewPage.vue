<template>
  <div>
    <div
      v-if="$route.params.id==null"
      v-cloak
      @drop.prevent="dropIt"
      @dragover.prevent
    >
      You have opened the advanced card view without giving a card id. This makes no sense.
    </div>

    <div 
      v-else 
      class="gallery__view__card">
      <CardComponent
        :id="'card'"
        :model="cards[0]"
        :image-u-r-l="cards[0].image"
      />
    </div>

    <div>
      <br>
      <b>Advanced Card Information:</b> <br>
      FlavourText: {{ FlavourText }} <br>
      Notes: {{ Notes }} <br>
      InappropriateVotes: {{ InappropriateVotes }} <br>
      UnderpoweredVotes: {{ UnderpoweredVotes }} <br>
      OverpoweredVotes: {{ OverpoweredVotes }} <br>
      FairEnoughVotes: {{ FairEnoughVotes }} <br>
      Nerflevel: {{ Nerflevel }} <br>
      Owner: {{ Owner }} <br>
      Status: {{ Status }} <br>
      VotePool: {{ VotePool }} <br>
    </div>
  </div>
</template>

<script>
//import * as R from 'ramda'
import { saveCardAsPng } from "../components/utils/utils.js";
import CardComponent from '@/components/CardComponent'
import { sampleCard, sampleGradientImg } from '../components/utils/sampleCards.js'

export default {
  name: 'CardView',
  components: {CardComponent},
  data () {
    return {
      cards: [sampleCard],
      cardImgs: [sampleGradientImg],
      FlavourText: "",
      Notes: "",
      InappropriateVotes: 0,
      UnderpoweredVotes: 0,
      OverpoweredVotes: 0,
      FairEnoughVotes: 0,
      Nerflevel: 0,
      Owner: "",
      Status: "",
      VotePool: 0
    }
  },
  mounted () {
    let id = parseInt(this.$route.params.id)
    console.log('params id:', id)
    if (typeof id === 'number' && !isNaN(id))  {
      this.$cardChain.getCard(this.$route.params.id)
        .then(res => {
          let parsedCard = this.$cardChain.cardObjectToWebModel(res.card)
          console.log('downloaded card:', res)
          if (parsedCard) {
            this.cards = []
            this.cards.push(parsedCard)
            this.FlavourText = parsedCard.FlavourText
            this.InappropriateVotes = parsedCard.InappropriateVotes
            this.UnderpoweredVotes = parsedCard.UnderpoweredVotes
            this.OverpoweredVotes = parsedCard.OverpoweredVotes
            this.FairEnoughVotes = parsedCard.FairEnoughVotes
            this.Nerflevel = parsedCard.Nerflevel
            this.Owner = parsedCard.Owner
            this.Status = parsedCard.Status
            this.VotePool = parsedCard.VotePool.amount
            console.log('parsed Card:', parsedCard)
            let clickedCard = document.getElementById('card')

            saveCardAsPng(
              clickedCard,
              parsedCard.CardName + '.png'
            );
          }
        })
    }
  },
  methods: {
    saveSingleCard (index) {
      saveCardAsPng(
        document.getElementById('card' + index),
        this.cards[index].name + '.png'
      );
    },
  }
}
</script>

<style scoped>
.gallery__view {
  text-shadow: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
}
.gallery__view__card {
  margin: auto;
  height: 75vh;
  max-width:500px;
}
</style>
