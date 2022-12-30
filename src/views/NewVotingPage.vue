<template>
  <div align="center">
    <h1>Voting</h1>
    <p>
      Vote to develop the game and earn Tokens with it!<br>
      See results of <router-link :to="{ name: 'VotingResults' }">
        last weeks voting here
      </router-link>.
    </p>
    <br>
    <button
      class="ModeButton"
      @click="mode = Mode.ENCOUNTER"
    >
      <a>Encounters</a>
    </button>
    <button
      class="ModeButton"
      @click="mode = Mode.COUNCIL"
    >
      <a>Council</a>
    </button>
    <br>
    <encounter-voting-component
      v-if="mode === Mode.ENCOUNTER"
    />
    <div v-if="mode === Mode.COUNCIL">
      <br>
      <p>Not yet implemented</p>
    </div>
  </div>
</template>

<script>
import EncounterVotingComponent from '@/components/elements/EncounterVotingComponent.vue'

const Mode = {
  ENCOUNTER: 0,
  COUNCIL: 1,
}

export default {
  name: 'VotingPage',
  components: { EncounterVotingComponent },
  data () {
    return {
      mode: Mode.ENCOUNTER,
      Mode: Mode,
    }
  },
}
</script>

<style scoped lang="scss">
  @import "@/scss/variables";

  .ModeButton {
    padding: 20px;
    background-color: transparent;
    border: 0;
  }

  .ModeButton:hover {
    background-color: $main-color-c;
    a {
      color: black;
    }
  }

</style>
