<template>
  <div align="center">
    <h1>{{ card.CardName }}</h1>
    <a
      v-if="card.FlavourText"
      class="FlavourText"
    >"{{ card.FlavourText }}"</a>
    <br><br>
    <div class="Container">
      <!-- Keyword Element -->
      <div
        class="Element"
        align="left"
      >
        <h3>Used Keywords</h3>
        <br>
        <keyword-component
          :keywords="card.Keywords"
        />
      </div>
      <!-- Card Element -->
      <div class="ELement">
        <CardComponent
          :id="'card'"
          :model="card"
          :image-u-r-l="card.image"
        />
      </div>
      <!-- Basic Element -->
      <div
        class="Element"
        align="left"
      >
        <!-- General -->
        <h3>Advanced Card Information</h3>
        <a>
          Votepool: {{ card.votePool.normalize().pretty() }} <br>
          Status: {{ card.status }} <br>
          Notes: {{ card.notes }} <br>
          Owner:
          <router-link
            :to="{name: 'UserView', params: {id: card.owner} }"
          >
            {{ card.owner }}
          </router-link> <br>
          Artist:
          <router-link
            :to="{name: 'UserView', params: {id: card.artist} }"
          >
            {{ card.artist }}
          </router-link>
        </a><br> <br>
        <!-- Voting -->
        <h3>Latest Voting Results</h3>
        <a>
          Inappropriate Votes: {{ card.inappropriateVotes }} <br>
          Underpowered Votes: {{ card.underpoweredVotes }} <br>
          Overpowered Votes: {{ card.overpoweredVotes }} <br>
          Fair Enough Votes: {{ card.fairEnoughVotes }} <br>
          Nerflevel: {{ card.nerflevel }} <br>
        </a> <br>
        <div class="ccbutton">
          <button
            v-if="canVote"
            @click="vote('underpowered');"
          >
            Vote Underpowered
          </button>
          <button
            v-if="canVote"
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
          <br><br>
          <button
            v-if="isOwner"
            class="btn--default"
            @click="edit();"
          >
            Edit card
          </button>
          <button
            v-if="isOwner"
            class="btn--default"
            @click="showModal()"
          >
            Transfer card
          </button>
          <TransferCardModal
            v-show="isModalVisible"
            :card="String(id)"
            @close="closeModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import CardComponent from '@/components/elements/CardComponent'
import { sampleCard } from "@/components/utils/sampleCards"
import TransferCardModal from '@/components/modals/TransferCardModal.vue';
import KeywordComponent from '@/components/elements/KeywordComponent.vue';

export default {
  name: 'CardView',
  components: { CardComponent, TransferCardModal, KeywordComponent },
  data () {
    return {
      isModalVisible: false,
      id: 0,
      isOwner: false,
      canVote: false,
      card: sampleCard,
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
    this.id = parseInt(String(this.$route.params.id))
    if (typeof this.id === 'number' && !isNaN(this.id))  {
      this.$cardChain.getCard(this.id)
        .then(res => {
          let parsedCard = res
          if (parsedCard) {
            this.card = parsedCard

            if (this.$store.getters["getLoggedIn"]) {
              this.loadVotableCards()
            }
          }
        })
      .catch(err => {
        console.log(err)
        this.$router.push({name: "NotFound"})
      })
    }
  },
  methods: {
    loadVotableCards: function() {
      this.isOwner =
        this.card.owner ===
        this.$store.getters["common/wallet/address"];
      this.$cardChain
        .getVotableCards(this.$store.getters["common/wallet/address"])
        .then(res => {
          let votableCards = []
          if (!res.votables.noVoteRights) {
            votableCards = res.votables.voteRights;
          }
          this.canVote = false
          if (!R.isEmpty(votableCards)) {
            for (let i = 0; i < votableCards.length; i++) {
              if (votableCards[i].cardId == this.id) {
                this.canVote = true
                break
              }
            }
          }
        });
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
      this.card.id = this.id
      this.$store.commit(
        "setCardCreatorEditCard",
        this.card
      );
      this.$router.push("/newCard")
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.getUser()
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/scss/variables";

.FlavourText {
  font-style: italic;
}

.Container {
  margin: 1rem 0;
  text-shadow: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
}

.ELement {
  position: relative;
  flex-grow: 1;
  max-width: 25em;
  padding: 1em;
}

h3 {
  color: white;
}

:deep(.Keywords) {
  p {
    color: white;
  }
}

</style>
