<template>
  <div class="article-temp">
    <div class="hero--with--img">  
      <b class="text--very--hug">
        <br>
        <center>
          A Trading Card Game YOU OWN
        </center>
      </b>
      <div class="img--container adjust--top">
        <img src="../assets/animations/sparkling_water.gif" class="image2" alt="yes...">
      </div>
    </div>

    <div class="dual--column--flex--wrap extra--space">
      <div class="dual--column--text">
        <div class="hero--with--img">
          <div class="img--container adjust--pentagon">
            <svg viewBox="0 0 985.399 969.501" class="image3" >
              <path id="Pfad_298" data-name="Pfad 298" d="M132.32,2293.693l38.946,842.479,623.139-39.166,224.141-431.792-144.9-397.009Z" transform="translate(250.87 -2267.424) rotate(7)" fill="#4b0439"/>
              <g transform="translate(16,-12)">
                <path id="Pfad_299" data-name="Pfad 299" d="M132.32,2293.285l38.323,829,613.169-38.539,220.555-424.883L861.787,2268.2Z" transform="translate(249.177 -2267.424) rotate(7)" fill="#9a0881"/>
              </g>
            </svg>
          </div>

          <b class="text--huge">
            <br>
            YOU CREATE
          </b>
          <p class="text--medium">
            On Crowd Control you can create and <br>
            design your own trading cards. Your Cards <br>
            become a part of the game for everyone.<br>
          </p>

          <b class="text--huge">
            YOU BALANCE
          </b>
          <p class="text--medium">
            Join the council and vote on cards. You can <br>
            be part of the balancing process.
          </p>

          <b class="text--huge">
            YOU EARN
          </b>
          <p class="text--medium">
            Create cards or vote to earn coins!
          </p>

        </div>

      </div>
      <div class="dual--column--img">
        <div class= "img--container adjust--mother--gif">
          <img src="mother_popup.gif" class="image3" alt="yes...">
        </div>
      </div>
    </div>

    <div class="dual--column--flex--wrap">

      <div class="dual--column--img">
        <div class= "img--container adjust--flyin">
          <img src="paper_flyin.gif" class="image3" alt="yes...">
        </div>
      </div>

      <div class="dual--column--text">

        <div class="hero--with--img">
          <div class= "img--container adjust--trapez">
            <svg viewBox="0 0 859.168 1347.934" class="image3" >
              <path id="Pfad_297" data-name="Pfad 297" d="M932.947,5899.424,872.038,4551.49l859.168,133.93-57.222,1144.968Z" transform="translate(-872.038 -4551.49)" fill="#4b0439"/>
              <g transform="translate(-10,-10)">
                <path id="Pfad_300" data-name="Pfad 300" d="M932.521,5890.01,872.038,4551.49l853.168,132.994-56.823,1136.973Z" transform="translate(-872.038 -4551.49)" fill="#9a0881"/>
              </g>
            </svg>
          </div>

          <div class="info--item">
            <b class="text--huge">
              <br>
              Gallery
            </b>
            <p class="text--medium">
              Check out the cards created by fellow <br>
              trading card gamers in the <router-link :to="{ name: 'Gallery' }"><b>Gallery</b></router-link>. <br>
            </p>
            <div class="button--container">
              <div class=link--button>
                <router-link to="/about" style="text-decoration: none; color: inherit;">
                  <p class=text--button>
                    Go to Gallery >
                  </p>
                </router-link>
              </div>
            </div>
          </div>

          <div class="info--item">
            <b class="text--huge">
              Card Creator
            </b>
            <p class="text--medium">
              Make your own cards on the blockchain <br>
              with our <router-link :to="{ name: 'New Card' }"><b>Card Creator</b></router-link>.
            </p>
            <div class="button--container">
              <div class=link--button>
                <router-link to="/about" style="text-decoration: none; color: inherit;">
                  <p class=text--button>
                    Go to Card Creator >
                  </p>
                </router-link>
              </div>
            </div>
          </div>

          <div class="info--item">
            <b class="text--huge">
              The Game
            </b>
            <p class="text--medium">
              Crowd Control has unique game mechanics <br>
              and a new kind of gameplay. Read more <br>
              about the game rules on 
              <router-link :to="{ name: 'About' }"><b>the Game</b></router-link> page.
            </p>
            <div class="button--container">
              <div class=link--button>
                <router-link to="/about" style="text-decoration: none; color: inherit;">
                  <p class=text--button>
                    Find out more >
                  </p>
                </router-link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


    <div class="hero">
      <b class="text--huge">
        We are not a company
      </b>
      <p class="text--medium">
        Crowd Control is not a company, but a Decentralized Autonomous Organization (DAO). This is realized <br>
        with a blockchain built on Cosmos technology. Read our <a
            href="https://github.com/DecentralCardGame/whitepaper/blob/master/whitepaper.pdf"
            target="_blank"
          ><b> Whitepaper</b></a> 
        to find out more.
      </p>

      <div class="button--container extra--margin">
        <div class=link--button>
          <a
            href="https://github.com/DecentralCardGame/whitepaper/blob/master/whitepaper.pdf"
            target="_blank"
            style="text-decoration: none; color: inherit;"
          >   
            <p class=text--button>
              Go to Whitepaper >
            </p> 
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  cardJpgs,
  botCommandCenterData
} from "../components/utils/sampleCards.js"

export default {
  name: "LandingPage",
  components: { },
  data() {
    return {
      cardJpgs:cardJpgs, botCommandCenterData:botCommandCenterData
    };
  },
  mounted() {
  },
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

.extra--space {
  margin: 35vh auto;
}

.hero--with--img {
  position: relative;
  z-index: 2;
  margin: calc(35vh - 80px) 0rem 0rem;
  text-align: initial;
}

.info--item {
  margin: 0rem 0rem 3rem 0rem;
}
.button--container {
  position: relative;
  top: -0.5rem;
  left: -4rem;
  margin: 0rem;
}
.extra--margin {
  margin: 0rem 18rem;
  left: -22rem;
}

.text--very--hug {
  font-family: $font-family-header;
  position: relative;
  z-index: 3;
  top: 0rem;

  font-size: 70px;
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
.text--huge {
  font-family: $font-family-header; 
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
.text--medium {
  font-family: $font-family; 
  font-weight: $font-weight;
  font-size: $font-size-small;
  letter-spacing: 2;
}
.text--button {
  font-family: $font-family-header; 
  font-weight: normal;
  padding: 0.25rem 1rem;
  font-size: $font-size-small;
  color: $black;
  text-align: center;
  transform: skewX(15deg);
}

.link--button {
  background-color: $main-color-c;
  box-shadow: $border-thickness-bold * 1.0 $border-thickness-bold * 1.0 0 $black;
  position: relative;
  margin: 0rem 5rem;
  transform: skewX(-25deg);
  font-size: $font-size-small;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $white;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transition-duration: $animation-duration;
    transition-duration: $animation-duration;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }
  &:hover, &:focus, &:active {
    color: $minor-color-c;
  }
  &:hover:before, &:focus:before, &:active:before {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
  @media (max-width: 1178px) {
    transform: skewX(-25deg);
    margin: 0;
  }  
}

.img--container {
  position: absolute;
  z-index: -1;
  pointer-events: none;
  display: flex;
  justify-content: center;
}
.adjust--top {
  top: 0;
  left: 0;
  right: 0;
  
  top: -17rem;
  @media (max-width: 1700px) {
    top: -17rem;
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
.adjust--flyin {
  position: relative;
  left: 10rem;
  right: 0;
  width: 300px;
  height: 300px;

  top: 10rem;
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
.adjust--mother--gif {
  position: relative;
  left: 0rem;
  right: 0;
  height: 100%;

  top: 10rem;
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
.adjust--pentagon {
  left: -4.5rem;
  right: 0;
  width: 480px;
  height: 1000px;

  top: -16rem;
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
.adjust--trapez {
  left: -3rem;
  right: 0;

  width: 400px;
  height: 700px;
  
  top: -2rem;
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
