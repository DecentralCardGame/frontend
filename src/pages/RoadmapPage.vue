<template>
  <div class="article-temp width-temp">
    <div class="dual--column--flex--wrap">
      <div class="dual--column--text">
        <h2>1. The Beginning</h2>
        <p class="text--big">
          Develop the game rules and mechanics
        </p>
        <p class="text--big">
          Find out how a community owned trading card game can potentially work
        </p>
        <p class="text--big">
          Set up technology stack: Cosmos Blockchain + Unity Gameclient
        </p>
        <p class="text--big">
          Contribute: You can join our team by contacting us on Telegram or Discord
        </p>
      </div>
    </div>
    
    <div class="dual--column--flex--wrap">
      <div class="dual--column--text">
        <h2>2. The Crowd gets angry</h2>
        <p class="text--big">
          Create cards with the Card Creator according to the CrowdControl game mechanics
        </p>
        <p class="text--big">
          Test the alpha game client
        </p>
        <p class="text--big">
          Manage cards on the blockchain (testnet)
        </p>
        <p class="text--big">
          Test buff/nerf mechanics via blockchain
        </p>
        <p class="text--big">
          Contribute Join the team, design cards or join the alpha tests
        </p>
      </div>
    </div>

    <div class="dual--column--flex--wrap reverse-column">
      <div class="dual--column--img">
        <CardComponent
          :model="drDollyData"
          :image-u-r-l="cardJpgs.drDollyImg"
        />
      </div>
      <div class="dual--column--text">
        <h2>3. The Revolution starts</h2>
        <p class="text--big">
          The game client is playable as beta and connected to the blockchain
        </p>
        <p class="text--big">
          Creation of Card Sets/Editions is developed and tested
        </p>
        <p class="text--big">
          Startup tests for the Mainnet
        </p>
        <p class="text--big">
          The alpha set + starter decks are finalized
        </p>
        <p class="text--big">
          Contribute: Play the beta or join our team <br>
          Rewarded: Succesful attempts to break our Game Client or Tokenomics.
        </p>
      </div>
    </div>

    <div class="dual--column--flex--wrap">
      <div class="dual--column--text">
        <h2>4. The Revolution unfolds</h2>
        <p>
          Finalize initial configuration (genesis) for the Mainnet launch
        </p>
        <p class="text--big">
          Airdrop to several groups (Atom holders, Players in Epoch 3, Survey participants)
        </p>
        <p class="text--big">
          Maybe ICO / IDO / LBP
        </p>
        <p class="text--big">
          Contribute: Register for the airdrop and token sale.
        </p>
      </div>
    </div>

    <div class="dual--column--flex--wrap reverse-column">
      <div class="dual--column--text">
        <div class="button--container">
          <div class=link--button>
            <router-link to="/gallery" style="text-decoration: none; color: inherit;">
              <p class=text--button>
                Go to Gallery >
              </p>
            </router-link>
          </div>
        </div>
        
        <h2>5. The Crowd is in Control</h2>
        <p class="text--big">
          Game client is taken to the next level (with possible ICO funds)
        </p>
        <p class="text--big">
          Automated / user created tournament system
        </p>
        <p class="text--big">
          Continuous release of new sets via set election
        </p>
        <p class="text--big">
          It's on you: Participate via card creation, governance votes and playing. Give us your feedback!
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import CardComponent from "../components/CardComponent";
import {
  cardJpgs, cardWebps,
  communityCardData, botCommandCenterData, belloData, timeDeviceData, drDollyData
} from "../components/utils/sampleCards.js";

export default {
  name: "AboutPage",
  components: { CardComponent },
  data() {
    return {
      cardJpgs:cardJpgs,
      cardWebps: cardWebps,
      communityCardData:communityCardData , botCommandCenterData:botCommandCenterData, belloData:belloData, timeDeviceData:timeDeviceData, drDollyData:drDollyData
    };
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
@import "../assets/styles/variables";

.hero {
  margin: 10rem 0;
  text-align: center;
  @media (max-width: 480px) {
    margin: 0;
  }
}

.about {
  align-items: flex-start;
  align-self: center;
  display: grid;
  grid-template-rows: 1fr;
  gap: 2rem 4rem;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
  h2 {
    margin-top: 0;
  }
  svg {
    height: $font-size * 20;
  }
  margin-bottom: $font-size * 4;
}

h2 {
  font-size: 1.75rem;
}
</style>
