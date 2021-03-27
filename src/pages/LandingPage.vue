<template>
  <div class="article-temp">
    
    <div class="hero--with--img">  
      <b class="text--huge">
        <br>
        <center>
        A Trading Card Game YOU OWN
        </center>
      </b>
      <div class= "img--container--top">
        <img src="../assets/animations/sparkling_water.gif" class="image2" alt="yes...">
      </div>
    </div>

    <div class="dual--column--flex--wrap">
      <div class="dual--column--text">

        <div class="hero--with--img">

          <div class= "img--container">
            <svg width="1000px" height="1000px" viewBox="0 0 985.399 969.501" class="image3" >
              <path id="Pfad_298" data-name="Pfad 298" d="M132.32,2293.693l38.946,842.479,623.139-39.166,224.141-431.792-144.9-397.009Z" transform="translate(250.87 -2267.424) rotate(7)" fill="#4b0439"/>
              <g transform="translate(16,-12)">
                <path id="Pfad_299" data-name="Pfad 299" d="M132.32,2293.285l38.323,829,613.169-38.539,220.555-424.883L861.787,2268.2Z" transform="translate(249.177 -2267.424) rotate(7)" fill="#9a0881"/>
              </g>
            </svg>
          </div>

          <center>
          <b class="text--huge">
            <br>
            YOU CREATE
          </b>
          <p class="text">
            On Crowd Control you can create and <br>
            design your own trading cards. <br>
            Your Cards become a part of the <br>
            game for everyone.
          </p>

          <b class="text--huge">
            YOU BALANCE
          </b>
          <p class="text">
            Join the council and vote on cards. <br>
            You can be part of the balancing process.
          </p>

          <b class="text--huge">
            YOU EARN
          </b>
          <p class="text">
            Create cards or vote to earn coins!
          </p>
          </center>


        </div>

      </div>
      <div class="dual--column--img">
        <CardComponent
          :model="botCommandCenterData"
          :image-u-r-l="cardJpgs.botCommandCenterImg"
        />
      </div>
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
    

  </div>
</template>

<script>
import CardComponent from "../components/CardComponent";
import {
  cardJpgs,
  botCommandCenterData
} from "../components/utils/sampleCards.js";

export default {
  name: "LandingPage",
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

.img--container--top {
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

.img--container {
  z-index: -1;
  pointer-events: none;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  
  top: 0rem;
  @media (max-width: 1700px) {
  }
  @media (max-width: 1400px) {
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

.image3 {
  margin: 0rem;
  margin-left: 0;
  z-index: -1;

  width: 100%;
}
</style>
