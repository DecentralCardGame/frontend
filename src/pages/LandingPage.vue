<template>
  <div class="article-temp">
    
    <div class="hero--with--img">  
      <b class="text--huge">
        Crowd Control is a trading card game, which gives you full ownership of your cards &amp; gives
        the community full ownership of the game. 
      </b>
      <div class= "img--container">
        <img src="../assets/ggez.gif" class="image2" alt="yes...">
      </div>
    </div>

    <div class="hero">
      <b class="text--huge">
        YOU can design your own trading cards. <br>
        YOU may participate in the process of balancing the game.
      </b>
    </div>

    <div class="hero">
      <b class="text--huge">
        Find out more about our unique game mechanics on <router-link :to="{ name: 'About' }">The Game</router-link> page. 
        Check out the <router-link :to="{ name: 'Gallery' }">Gallery</router-link> to see cards created by fellow trading card gamers or 
        use the <router-link :to="{ name: 'New Card' }">Card Creator</router-link> to make cards of your own!
      </b>
    </div>

    <div class="hero">
      <b class="text--huge">
        Crowd Control is owned by all of those who contribute to the project. We make this possible
        by being a decentralized autonomous organization (DAO), with a game buld on a blockchain
        using Cosmos technology.
        <br><br>
        Read our <a
            href="https://github.com/DecentralCardGame/whitepaper/blob/master/whitepaper.pdf"
            target="_blank"
          > Whitepaper</a> to find out more.
      </b>
    </div>
    

    <div class="about-flex-wrap">
      <div class="about-card">
        <CardComponent
          :model="botCommandCenterData"
          :image-u-r-l="cardJpgs.botCommandCenterImg"
        />
      </div>
      <div class="about-card">
        <CardComponent
          :model="botCommandCenterData"
          :image-u-r-l="cardJpgs.botCommandCenterImg"
        />
      </div>
      <div class="about-card">
        <CardComponent
          :model="botCommandCenterData"
          :image-u-r-l="cardJpgs.botCommandCenterImg"
        />
      </div>
    </div>
  </div>
</template>

<script>



import CardComponent from "../components/CardComponent";
import {
  cardJpgs,
  botCommandCenterData
} from "../components/utils/sampleCards.js";

export default {
  name: "AboutPage",
  components: { CardComponent },
  data() {
    return {
      cardJpgs:cardJpgs, botCommandCenterData:botCommandCenterData
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
  margin: 0 auto;
}

.about-text {
  min-width: 300px;
  max-width: 500px;
  margin: 0 auto;
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
  margin: 45vh 0rem;
  text-align: initial;
}

.hero--with--img {
  position: relative;
  z-index: 2;
  margin: calc(30vh - 80px) 0rem 0rem;
  text-align: initial;
}

.text--huge {
  position: relative;
  z-index: 3;
  top: 0rem;

  font-size: 40px;
  @media (max-width: 1200px) {
    font-size: 35px;
  }
  @media (max-width: 800px) {
    font-size: 30px;
  }
  @media (max-width: 480px) {
    font-size: 20px;
  }
}

.img--container {
  z-index: -1;
  pointer-events: none;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  
  top: -20rem;
  @media (max-width: 1700px) {
    top: -18rem;
  }
  @media (max-width: 1400px) {
    top: -13rem;
  }
  @media (max-width: 1000px) {
    top: -11rem;
    left: -1em;
  }
  @media (max-width: 800px) {
    top: -8rem;
    left: -5em;
  }
  @media (max-width: 480px) {
    top: -8rem;
  }
}

.image2 {
  margin: 0rem;
  margin-left: 0;
  z-index: -1;

  width: 100%;
  max-width: 1000px;
  min-width: 400px;
}
</style>
