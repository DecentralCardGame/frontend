<template>
  <div>
    <div
      class="gallery__view__card"
      @click="saveCard"
    >
      <CardComponent
        :id="'card'"
        :model="card"
        :image-u-r-l="card.image"
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
      Inappropriate Votes: {{ InappropriateVotes }} <br>
      Underpowered Votes: {{ UnderpoweredVotes }} <br>
      Overpowered Votes: {{ OverpoweredVotes }} <br>
      Fair Enough Votes: {{ FairEnoughVotes }} <br>
      Nerflevel: {{ Nerflevel }} <br>
      Owner:
      <router-link
        :to="{name: 'UserView', params: {id: Owner} }"
      >
        {{ Owner }}
      </router-link> <br>
      Status: {{ Status }} <br>
      VotePool: {{ VotePool }} <br><br>
      <button
        v-if="canVote"
        class="btn--default"
        @click="vote('underpowered');"
      >
        Vote Underpowered
      </button>
      <button
        v-if="canVote"
        class="btn--default"
        @click="vote('overpowered');"
      >
        Vote Overpowered
      </button>
      <button
        v-if="canVote"
        class="btn--default"
        @click="vote('fair_enough');"
      >
        Vote Fair Enough
      </button>
      <button
        v-if="canVote"
        class="btn--default"
        @click="vote('inappropriate');"
      >
        Vote Inappropriate
      </button>
      <br>
      <button
        v-if="isOwner"
        class="btn--default"
        @click="edit();"
      >
        Edit card
      </button>
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
      id: 0,
      isOwner: false,
      canVote: false,
      card: sampleCard,
      FlavourText: "",
      Notes: "",
      InappropriateVotes: 0,
      UnderpoweredVotes: 0,
      OverpoweredVotes: 0,
      FairEnoughVotes: 0,
      Nerflevel: 0,
      Owner: " ",
      Status: "",
      VotePool: 0,
      keywordDescriptions: []
    }
  },
  watch: {
    '$store.state.common.wallet.selectedAddress': function () {
      if (this.$store.getters["getLoggedIn"]) {
        this.loadVotableCards()
      }
    }
  },
  mounted () {
    this.id = parseInt(this.$route.params.id)
    console.log('params id:', this.id)
    if (typeof this.id === 'number' && !isNaN(this.id))  {
      this.$cardChain.getCard(this.id)
        .then(res => {
          let parsedCard = this.$cardChain.cardObjectToWebModel(res)
          console.log('downloaded card:', res)
          if (parsedCard) {
            this.card = parsedCard
            this.FlavourText = parsedCard.FlavourText
            this.Notes = parsedCard.notes
            this.InappropriateVotes = parsedCard.inappropriateVotes
            this.UnderpoweredVotes = parsedCard.underpoweredVotes
            this.OverpoweredVotes = parsedCard.overpoweredVotes
            this.FairEnoughVotes = parsedCard.fairEnoughVotes
            this.Nerflevel = parsedCard.nerflevel
            this.Owner = parsedCard.owner
            this.Status = parsedCard.status
            this.VotePool = parsedCard.votePool.amount
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
            // console.log("yes:", JSON.stringify(likelist))
            if (this.$store.getters["getLoggedIn"]) {
              this.loadVotableCards()
            }
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
    loadVotableCards() {
      this.isOwner =
        this.Owner ===
        this.$store.getters['common/wallet/address']
      this.$cardChain
      .getVotableCards(this.$store.getters['common/wallet/address'])
      .then(res => {
        var votableCards = []
        console.log("getVotableCards:", res);
        if (!res.noVoteRights) {
          votableCards = res.votables;
        }
        this.canVote = false
        for (var i = 0; i<votableCards.voteRights.length; i++) {
          if (votableCards.voteRights[i].cardId == this.id) {
            this.canVote = true
          }
        }
        console.log(this.canVote)
      })
    },
    vote(type) {
      this.$cardChain
        .voteCardTx(this.id, type)
        .then(_ => {
          this.$cardChain.updateUserCredits()
          this.loadVotableCards()
        })
    },
    edit() {
      console.log("editing:", this.id)
      this.$store.commit(
        "setCardCreatorEditCard",
        this.card
      );
      this.$router.push("/newCard")
    },
  }
}
</script>

<style scoped lang="scss">
@import "../scss/variables";

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
  overflow: visible;
}
</style>
