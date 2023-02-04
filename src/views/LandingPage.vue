<template>
  <div class="article-temp">
    <div class="hero--with--img less--margin">  
      <b class="text--very--huge">
        <br>
        <center>
          A Trading Card Game YOU OWN
        </center>
      </b>
      <div
        v-if="!isSafari"
        class="img--container adjust--top"
      >
        <img
          src="@/assets/animations/sparkling_water.gif"
          class="image2"
          alt="yes..."
        >
      </div>
    </div>

    <div class="dual--column--flex--wrap">
      <div class="dual--column--text scale--width">
        <div class="hero--with--img">
          <div class="img--container adjust--pentagon">
            <svg
              viewBox="0 0 985.399 969.501"
              class="image3"
            >
              <path
                id="Pfad_298"
                data-name="Pfad 298"
                d="M132.32,2293.693l38.946,842.479,623.139-39.166,224.141-431.792-144.9-397.009Z"
                transform="translate(250.87 -2267.424) rotate(7)"
                fill="#4b0439"
              />
              <g transform="translate(16,-12)">
                <path
                  id="Pfad_299"
                  data-name="Pfad 299"
                  d="M132.32,2293.285l38.323,829,613.169-38.539,220.555-424.883L861.787,2268.2Z"
                  transform="translate(249.177 -2267.424) rotate(7)"
                  fill="#9a0881"
                />
              </g>
            </svg>
          </div>

          <b class="text--huge">
            <br>
            YOU CREATE
          </b>
          <p class="text--medium extra--bottom--margin">
            On Crowd Control you can create and <br>
            design your own trading cards. Your Cards <br>
            become a part of the game for everyone.<br>
          </p>

          <b class="text--huge">
            YOU BALANCE
          </b>
          <p class="text--medium extra--bottom--margin">
            Join the council and vote on cards. You can <br>
            be part of the balancing process.
          </p>

          <b class="text--huge">
            YOU EARN
          </b>
          <p class="text--medium extra--bottom--margin">
            Create cards or vote to earn coins!
          </p>
        </div>
      </div>
      <div class="dual--column--img scale--width">
        <div class="img--container adjust--mother--gif">
          <img
            src="../assets/animations/mother_popup.gif"
            class="image3"
            alt="yes..."
            width="200%"
          >
        </div>
      </div>
    </div>

    <div class="dual--column--flex--wrap reverse-column">
      <div
        v-if="!isMobileDevice()"
        class="dual--column--img scale--width"
      >
        <div class="img--container adjust--flyin">
          <img
            src="../assets/animations/paper_flyin.gif"
            class="image3"
            alt="yes..."
          >
        </div>
      </div>

      <div class="dual--column--text scale--width adjust--mobile">
        <div class="hero--with--img">
          <div class="img--container adjust--trapez">
            <svg
              viewBox="0 0 859.168 1347.934"
              class="image3 show--overflow"
            >
              <path
                id="Pfad_297"
                data-name="Pfad 297"
                d="M932.947,5899.424,872.038,4551.49l859.168,133.93-57.222,1144.968Z"
                transform="translate(-872.038 -4551.49)"
                fill="#4b0439"
              />
              <g transform="translate(-10,-10)">
                <path
                  id="Pfad_300"
                  data-name="Pfad 300"
                  d="M932.521,5890.01,872.038,4551.49l853.168,132.994-56.823,1136.973Z"
                  transform="translate(-872.038 -4551.49)"
                  fill="#9a0881"
                />
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
              trading card gamers in the <router-link :to="{ name: 'Gallery' }">
                <b>Gallery</b>
              </router-link>. <br>
            </p>
            <div class="button--container">
              <div class="link--button">
                <router-link
                  to="/gallery"
                  style="text-decoration: none; color: inherit;"
                >
                  <p class="text--button">
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
              with our <router-link :to="{ name: 'New Card' }">
                <b>Card Creator</b>
              </router-link>.
            </p>
            <div class="button--container">
              <div class="link--button">
                <router-link
                  to="/newcard"
                  style="text-decoration: none; color: inherit;"
                >
                  <p class="text--button">
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
              <router-link :to="{ name: 'About' }">
                <b>the Game</b>
              </router-link> page.
            </p>
            <div class="button--container">
              <div class="link--button">
                <router-link
                  to="/about"
                  style="text-decoration: none; color: inherit;"
                >
                  <p class="text--button">
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
        Crowd Control is not a company, but a Decentralized Autonomous Organization (DAO). This is realized
        with a blockchain built on Cosmos technology. Read our <a
          href="https://github.com/DecentralCardGame/whitepaper/blob/master/whitepaper.pdf"
          target="_blank"
        ><b> Whitepaper</b></a> 
        to find out more.
      </p>


      <p class="text--medium">
        Or check out our <router-link :to="{ name: 'Roadmap' }">
          <b>Roadmap</b>
        </router-link>
        to see what we are planning next. <br><br>
      </p>

      <div class="grid">
        <div class="button--container">
          <div class="link--button">
            <a
              href="https://github.com/DecentralCardGame/whitepaper/blob/master/whitepaper.pdf"
              target="_blank"
              style="text-decoration: none; color: inherit;"
            >   
              <p class="text--button">
                Go to Whitepaper >
              </p> 
            </a>
          </div>
        </div>

        <div class="button--container">
          <div class="link--button">
            <router-link
              to="/roadmap"
              style="text-decoration: none; color: inherit;"
            >
              <p class="text--button">
                Go to Roadmap >
              </p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  cardJpgs,
  botCommandCenterData
} from "@/components/utils/sampleCards"

export default {
  name: "LandingPage",
  components: { },
  data() {
    return {
      cardJpgs: cardJpgs, 
      botCommandCenterData: botCommandCenterData,
      isSafari: false
    };
  },
  mounted() {
    this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  },
};
</script>

<style scoped lang="scss">
@import "../scss/variables";

.grid {
  display: flex;
  flex-wrap : wrap;
  margin: auto; 
  flex-direction: row;
  align-items: center;
  justify-content: left;
}

h2 {
  font-size: 1.75rem;
}

.hero {
  z-index: 3;
  margin: 45vh 0rem;
  text-align: initial;
  @media (max-width: 480px) {
    margin: 20vh 0rem;
  }
}

.show--overflow {
  overflow: visible
}

.extra--bottom--margin {
  margin-bottom: 3rem;
  @media (max-width: 1000px) {
    margin-bottom: 2rem;
  }
}

.scale--width {
  min-width: 400px;
  max-width: 1000px;
  width: 50%
}

.hero--with--img {
  position: relative;
  z-index: 2;
  margin: 30vh 0rem 0rem;
  text-align: initial;
  @media (max-width: 480px) {
    margin: 20vh 0rem;
  }
}
.less--margin {
  margin: 20vh 0 10vh 0;
}

.info--item {
  margin: 0rem 0rem 3rem 0rem;
}
.button--container {
  position: relative;
  top: -0.5rem;
  left: -4rem;
  margin: 0rem;
  min-width: 360px;
  max-width: 400px;
}
.extra--margin {
  margin: 0rem 14rem;
  left: -18rem;
  max-width: 400px;
  @media (max-width: 1200px) {
    margin: 0rem 10rem;
    left: -10rem;
  }
  @media (max-width: 800px) {
    margin: 0rem 4rem;
    left: -6rem;
  }
  @media (max-width: 480px) {
    margin: 0rem 2rem;
    left: -4rem;
  }
}

.text--very--huge {
  font-family: $font-family-header;
  position: relative;
  z-index: 3;
  top: 0rem;

  font-size: 70px;
  @media (max-width: 1200px) {
  }
  @media (max-width: 800px) {
  }
  @media (max-width: 480px) {
    font-size: 40px;
  }
}
.text--huge {
  font-family: $font-family-header; 
  position: relative;
  z-index: 3;
  top: 0rem;

  font-size: 4vw;
  @media (max-width: 1000px) {
    font-size: 40px;
  }
}
.text--medium {
  z-index: 3;
  position: relative;
  font-family: $font-family; 
  font-weight: $font-weight;
  line-height: 150%;

  font-size: 2vw;
  @media (max-width: 1000px) {
    font-size: 20px;
  }
}
.text--button {
  font-family: $font-family-header; 
  font-weight: normal;
  padding: 0.5rem 1rem;
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
  }  
}

.img--container {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  width: 100%;
}
.adjust--top {
  top: -17rem;
  left: 0;
  right: 0;
  
  @media (max-width: 1700px) {
  }
  @media (max-width: 1400px) {
    top: -10rem;
  }
  @media (max-width: 1000px) {
    top: -2rem;
  }
  @media (max-width: 800px) {
    top: -0rem;
  }
  @media (max-width: 480px) {
    top: -4rem;
  }
}
.adjust--flyin {
  position: relative;
  top: 10rem;
  left: -4vw;
  right: 0;
}
.adjust--mother--gif {
  position: relative;
  top: 15vw;
  left: 0;
  right: 0;
  height: 100%;
}
.adjust--pentagon {
  width: 140%;
  left: -8vw;
  top: -0vw;

  @media (max-width: 1700px) {
  }
  @media (max-width: 1400px) {
  }
  @media (max-width: 1000px) {
    left: -6rem
  }
  @media (max-width: 800px) {
  }
  @media (max-width: 480px) {
  }
}
.adjust--trapez {
  width: 120%;
  left: -5vw;
  top: -3vw;
  
  @media (max-width: 1700px) {
  }
  @media (max-width: 1400px) {
  }
  @media (max-width: 1000px) {
  }
  @media (max-width: 800px) {
  }
  @media (max-width: 480px) {
    top: -1rem;
    left: -2rem;
  }
}
.adjust--mobile {
  @media (max-width: 480px) {
    top: -50rem;
  }
}

.image2 {
  margin: 0rem;
  margin-left: 0;
  z-index: 0;

  width: 100%;
  max-width: 1000px;
  min-width: 400px;
}

.image3 {
  margin: 0rem;
  margin-left: 0;
  z-index: 0;

  width: 100%;
}
</style>
