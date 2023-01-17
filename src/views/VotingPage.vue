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
      :style="`font-weight: ${ getThiccness(Mode.ENCOUNTER) }`"
      @click="setMode(Mode.ENCOUNTER)"
    >
      <a>Encounters</a>
    </button>
    <button
      class="ModeButton"
      :style="`font-weight: ${ getThiccness(Mode.COUNCIL) }`"
      @click="setMode(Mode.COUNCIL)"
    >
      <a>Council</a>
    </button>
    <br>
    <encounter-voting-component
      v-if="mode === Mode.ENCOUNTER"
    />
    <card-council-voting-component
      v-if="mode === Mode.COUNCIL"
    />
  </div>
</template>

<script>
import EncounterVotingComponent from '@/components/elements/EncounterVotingComponent.vue'
import CardCouncilVotingComponent from '@/components/elements/CardCouncilVotingComponent.vue'

const Mode = {
  ENCOUNTER: 0,
  COUNCIL: 1,
}

export default {
  name: 'VotingPage',
  components: { EncounterVotingComponent, CardCouncilVotingComponent },
  data () {
    return {
      mode: Mode.ENCOUNTER,
      Mode: Mode,
    }
  },
  mounted() {
    let mode = this.$route.params.mode
    console.log("yees", mode)
    if (mode) {
      this.mode = parseInt(String(mode))
    } else {
      this.setMode(this.mode)
    }
  },
  methods: {
    setMode(mode) {
      this.mode = mode
      this.$router.push({name: "Vote", params: {mode: this.mode}})
    },
    getThiccness(mode) {
      if (mode === this.mode) {
        return "bold"
      } else {
        return "normal"
      }
    }
  }
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
