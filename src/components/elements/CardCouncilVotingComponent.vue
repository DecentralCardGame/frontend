<template>
  <div align="center">
    <div class="voter ccbutton">
      <br>
      <h1>Card Council</h1>
      <p>Peer-review new player cards.</p>
      <br>
      <council-component
        :council-id="councilId"
      />
    </div>
  </div>
</template>

<script>
import CouncilComponent from "@/components/elements/CouncilComponent.vue";

export default {
  name: "CardCouncilVotingComponent",
  components: { CouncilComponent },
  data() {
    return {
      councilId: null,
    };
  },
  watch: {
    "$store.state.common.wallet.selectedAddress": function() {
      if (this.$store.getters["getLoggedIn"]) {
        this.init();
      }
    }
  },
  mounted() {
    console.log("loggedin? ", this.$store.getters["getLoggedIn"]);
    if (this.$store.getters["getLoggedIn"]) {
      this.init();
    } else {
      this.notifyInfo("Not logged in", "You must login to be able to vote.");
    }
  },
  methods: {
    init() {
      this.$cardChain.getUserInfo(this.$store.getters["common/wallet/address"])
        .then(res => {
          console.log(res)
          if (["openCouncil", "startedCouncil"].includes(res.councilParticipation.status)) {
            this.councilId = res.councilParticipation.council
          }
        })
    },
  }
};
</script>

<style scoped lang="scss">
@import "@/scss/variables";

.InfoContainer {
  padding: 2em;
  background-color: $main-color-c;
  display: grid;
  box-shadow: $border-thickness-bold * 1.5 $border-thickness-bold * 1.5 0 $minor-color-c;
  grid-template-columns: repeat(auto-fit, minmax(15em, 25em));
  grid-template-rows: auto;
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  width: max-content;
  max-width: 100%;
}

.Info {
  text-align: left;
  width: 15em;
  h3 {
    color: black;
  }
}

.ELement {
  position: relative;
  flex-grow: 1;
  max-width: 25em;
}

.voter {
  min-height: 10vh;
}

.FlavourText {
  font-style: italic;
}

:deep(p) {
  color: black;
}

</style>