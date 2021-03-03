<template>
  <div class="article-temp width-temp">
    <div class="hero">
      <p class="text--big">
        Crowd Control is a trading card game, which gives you full ownership of your cards AND gives
        the community full ownership of the game. 
      </p>
    </div>

    This means we are creating this together. Any player can design their
    own trading cards. Any player may participate in the process of balancing the game by voting on cards.
    
    

    
    

    

    

    <div class="about-flex-wrap">
      <div class="about-text">
        <h2>The Balancing</h2>
        <p>
          The balancing is done by adjusting the ressource cost of a card. This means when a card receives more
          'overpowered' votes than 'fair enough' or 'underpowered' votes and it is among the cards with the most
          'overpowered' votes, it gets nerfed by increasing its ressource cost by one. HQs get nerfed by decreasing
          their HP, Wisdom, Growth and Starting Hand Size. Which value is decreased rotates on every nerf level.
          The same applies for 'underpowered' votes just the other way around. There are also 'inappropriate' votes,
          which are used to remove images or flavor text which are inappropriate like gore or explicit sexual content.
          In that case only the image and the flavor text are stripped off a card and must be updated by the creator.
          You can start
          <router-link :to="{ name: 'Vote' }">
            Voting
          </router-link>
          after you login with your account.
          In the future there will also be a council, where new cards must be approved, which earns council members
          credits.
          Furthermore there will be sets, which bundle together 100 cards into a set and boosters can be bought from
          these sets, giving financial reward to those creating cards.
        </p>
      </div>
      <div class="about-card">
        <CardComponent
          :model="sampleCards.botCommandCenter"
          :image-u-r-l="sampleCards.botCommandCenter.cardImg"
        />
      </div>
    </div>
  </div>
</template>

<script>




import CardComponent from "../components/CardComponent";
import {
  sampleCards,
} from "../components/utils/sampleCards.js";

export default {
  name: "AboutPage",
  components: { CardComponent },
  data() {
    return {
      sampleCards: sampleCards,
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

.about-card {
  max-width: 300px;
  min-width: 300px;
  min-height: 300px;
  margin: 0 15px;
}

.about-text {
  min-width: 300px;
  max-width: 500px;
  margin: 0 15px;
}

.about-flex-wrap {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: top;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
}

.reverse-column {
  @media (max-width: 1200px) {
    flex-direction: column-reverse;
  }
}

h2 {
  font-size: 1.75rem;
}
</style>
