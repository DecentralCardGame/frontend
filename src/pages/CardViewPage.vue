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
      class="gallery__view__card"
      @click="saveCard"
    >
      <CardComponent
        :id="'card'"
        :model="cards[0]"
        :image-u-r-l="cards[0].image"
      />
    </div>

    <div>
      <b>Keyword Explanations:</b>

      <table class="keywordTable">
        <tbody>
          <tr
            v-for="(keyword, index) in keywordDescriptions"
            :key="index"
          >
            <th scope="row">
              <b> {{ keyword[0] }} </b>
            </th>  
            <td> - {{ keyword[1] }}</td>  
          </tr>
        </tbody>
      </table>
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
import * as R from 'ramda'
import { saveCardAsPng } from "../components/utils/utils.js";
import CardComponent from '@/components/elements/CardComponent'
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
      VotePool: 0,
      keywordDescriptions: []
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
            
            let firstLetterToLower = string => {
              return string[0].toLowerCase() + string.substring(1)
            }
            parsedCard.Keywords.forEach(ability => {
              ability.forEach(keyword => {
                this.keywordDescriptions.push([keyword, this.$rulesDefinitions[firstLetterToLower(keyword)].description])
              })
            })

            // yesyoulike.json for harry
            let likelist = []
            R.mapObjIndexed((num, key) => { likelist.push({"keyword": key, "description": num.description}) }, R.filter(x => x.description, this.$rulesDefinitions))
            
            console.log("yes:", JSON.stringify(likelist))
          }
        })
    }

    
  },
  methods: {
    saveCard () {
      saveCardAsPng(
        document.getElementById('card'),
        this.cards[0].CardName
      );
    },
  }
}
</script>

<style scoped>

.keywordTable {
  color: #F5F5F5;
  border-collapse: separate;
  border-spacing: 10px;
}
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
