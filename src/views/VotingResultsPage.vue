<template>
  <div class="gallery">
    <h2 class="header__h2">
      Voting Results
    </h2>
    <p class="header__p">
      Here you can see the outome of the last week's voting. <br><br>
      Total Votes: {{ state.data.totalVotes }} <br>
      Total <b>Fair Enough</b> Votes: {{ state.data.totalFairEnoughVotes }} <br>
      Total <b>Inappropriate</b> Votes: {{ state.data.totalInappropriateVotes }}
      <br>
      Total <b>Overpowered</b> Votes: {{ state.data.totalOverpoweredVotes }} <br>
      Total <b>Underpowered</b> Votes: {{ state.data.totalUnderpoweredVotes }} <br>
      <br>
      Nerfed Mana Costs are <span style="color: #ff0000">red</span> and buffed
      Mana Costs are <span style="color: #3cb38f">green</span>. <br>
      Banned Cards have their Mana Cost removed.
    </p>
    <br>
    <GalleryComponent
      :cards-per-page="50"
      :all-card-ids="state.cardList"
      :card-callback="cardCallback"
    />
  </div>
</template>

<script setup lang="ts">
import { VotingResults } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/voting"
import { useQuery } from "@/def-composables/useQuery";
import { useAddress } from "@/def-composables/useAddress";
import { useVoting } from "@/def-composables/useVoting";
import GalleryComponent from "@/components/elements/GalleryComponent.vue";
import { onMounted, reactive } from "vue";
import { type Card, NerfStatus } from "@/model/Card";

const { add } = useVoting();

const { address } = useAddress();
const { queryQVotingResults } = useQuery();

const initialState: {
  data: VotingResults
  cardList: Array<number>;
  idsWithStatus: {[id: number]: NerfStatus}
} = {
  cardList: [],
  data: VotingResults.fromPartial({}),
  idsWithStatus: {}
};

const state = reactive(initialState);

onMounted(() => {
  queryQVotingResults()
    .then((res) => {
      console.log("res", res);
      state.data = res.lastVotingResults
      state.cardList = state.data.cardResults.map(v => v.cardId)
      state.idsWithStatus = Object.fromEntries(state.data.cardResults.map(v => [v.cardId, NerfStatus.fromString(v.result)!]))
    })
})

const cardCallback = (card: Card) => {
  card.setNerfStatus(state.idsWithStatus[card.id])
}

</script>