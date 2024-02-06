<template>
  <div align="center">
    <h1>Voting</h1>
    <p>
      Vote to develop the game and earn credits!<br>
      See the results of <router-link :to="{ name: 'VotingResults' }">
        last week's voting here
      </router-link>.
    </p>
    <br>
    <button
      class="ModeButton"
      :style="`font-weight: ${ getThiccness(Mode.ENCOUNTER) }`"
      @click="mode = Mode.ENCOUNTER"
    >
      <a>Encounters</a>
    </button>
    <button
      class="ModeButton"
      :style="`font-weight: ${ getThiccness(Mode.COUNCIL) }`"
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

<script lang="ts">
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
  methods: {
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
