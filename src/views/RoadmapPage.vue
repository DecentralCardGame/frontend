<template>
  <div class="article-temp width-temp">
    <div class="dual--column--flex--wrap">
      <div class="dual--column--text">
        <div class="qbox--container">
          <p class="qbox--text">Q1 2019</p>
        </div>
        <h2>1. The Beginning</h2>
        <div>
          <BulletList
            :text="[
              'Develop the game rules and mechanics',
              'Community owned collectible card game concepting',
              'Technology: Cosmos Blockchain + Unity Gameclient',
            ]"
            :type="['filled', 'filled', 'filled']"
          />
        </div>
        <p class="text--big">
          Contribute: You can join our team by contacting us on Telegram or
          Discord.
        </p>
      </div>
    </div>

    <div class="dual--column--flex--wrap">
      <div class="dual--column--text">
        <div class="qbox--container">
          <p class="qbox--text">Q1 2021</p>
        </div>
        <h2>2. The Crowd gets angry</h2>
        <div>
          <BulletList
            :text="[
              'Create cards with the Card Creator',
              'Test the alpha game client',
              'Manage cards on the blockchain (testnet)',
              'Test buff/nerf mechanics via blockchain',
            ]"
            :type="['filled', 'open', 'filled', 'filled']"
          />
        </div>
        <p class="text--big">
          Contribute: Join the team, design cards or join the alpha tests.
        </p>
      </div>
    </div>

    <div class="dual--column--flex--wrap reverse-column">
      <div class="dual--column--text">
        <div class="qbox--container">
          <p class="qbox--text">Q1 2023</p>
        </div>
        <h2>3. The Revolution starts</h2>
        <div>
          <BulletList
            :text="[
              'Blockchain-ready game client is playable',
              'Creation of Card Sets/Editions',
              'Startup tests for the Mainnet',
              'The alpha set + starter decks are finalized',
            ]"
            :type="[]"
          />
        </div>
        <p class="text--big">
          Contribute: Play the beta or join our team <br />
          Rewarded: Succesful attempts to break our Game Client or Tokenomics.
        </p>
      </div>
    </div>

    <div class="dual--column--flex--wrap">
      <div class="dual--column--text">
        <div class="qbox--container">
          <p class="qbox--text">
            Q3 2024
          </p>
        </div>
        <h2>4. The Revolution unfolds</h2>
        <div>
          <BulletList
            :text="[
              'Mainnet launch',
              'Airdrop to several groups',
              'Maybe ICO / IDO / LBP',
              'The alpha set + starter decks',
            ]"
            :type="[]"
          />
        </div>
        <p class="text--big">
          Contribute: Register for the airdrop and token sale.
        </p>
      </div>
    </div>

    <div>
      <div class="dual--column--text">
        <div class="qbox--container">
          <p class="qbox--text">
            Q1 2025
          </p>
        </div>
        <h2>5. The Crowd is in Control</h2>
        <div>
          <BulletList
            :text="[
              'Game client is taken to the next level',
              'User created tournament system',
              'Continuous release of new sets via set election',
            ]"
            :type="[]"
          />
        </div>
        <p class="text--big">
          It's on you: Participate via card creation, governance votes and
          playing. Give us your feedback!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BulletList from "@/components/elements/BulletList.vue";

export default {
  name: "RoadmapPage",
  components: { BulletList },
  data() {
    return {};
  },
  mounted() {},
};
</script>
