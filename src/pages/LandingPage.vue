<template>
  <div class="article-temp width-temp">

    <div class="hero">
      
      <b class="text--huge">
        <img src="sparkling_water.gif" class="image2" alt="Loading...">
        Crowd Control is a trading card game, which gives you full ownership of your cards &amp; gives
        the community full ownership of the game. 
      </b>
    </div>

    <div class="hero">
      <b class="text--huge">
        YOU can design your own trading cards. <br>
        YOU may participate in the process of balancing the game.
      </b>
    </div>

    <div class="hero">
      <p class="text--huge">
        Find out more about our unique game mechanics on <router-link :to="{ name: 'About' }">The Game</router-link> page. 
        Check out the <router-link :to="{ name: 'Gallery' }">Gallery</router-link> to see cards created by fellow trading card gamers or 
        use the <router-link :to="{ name: 'New Card' }">Card Creator</router-link> to make cards of your own!
      </p>
    </div>

    <div class="hero">
      <p class="text--huge">
        Crowd Control is owned by all of those who contribute to the project. We make this possible
        by being a decentralized autonomous organization (DAO), with a game buld on a blockchain
        using Cosmos technology.
        <br><br>
        Read our <a
            href="https://github.com/DecentralCardGame/whitepaper/blob/master/whitepaper.pdf"
            target="_blank"
          > Whitepaper</a> to find out more.
      </p>
    </div>
    
    

    <div class="about-flex-wrap">
      <div class="about-card">
        <CardComponent
          :model="sampleCards.botCommandCenter"
          :image-u-r-l="sampleCards.botCommandCenter.cardImg"
        />
      </div>
      <div class="about-card">
        <CardComponent
          :model="sampleCards.botCommandCenter"
          :image-u-r-l="sampleCards.botCommandCenter.cardImg"
        />
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
  z-index: 3;
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

.hero {
  z-index: 3;
  margin: 15rem 0rem;
  text-align: initial;
  @media (max-width: 480px) {
    margin: 10rem 0rem;
  }
}

.text--huge {
  font-size: 1.5rem;
  z-index: 1;
}

.image2 {
  position: absolute;
  top: calc(500px - 40vw);
  left: 0;
  z-index: 0;
  width: 100vw;
}
</style>
