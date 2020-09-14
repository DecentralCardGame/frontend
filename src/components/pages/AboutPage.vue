<template>
  <div>
    <div class="about-right-card">
      <div>
      Crowd Control is a trading card game, which gives you full ownership of your cards AND gives the community full ownership of the game. <br><br>
      This means we are creating this together. Any player can design their own trading cards. Any player may participate in the process of balancing the game by voting on cards. <br><br>
      This sounds very awesome, but how shall this work? Somebody must be in charge and someone has to say what is overpowered and why should anyone do all this kind of work? <br>
      Yes. The answer is blockchain. We build a blockchain with Cosmos technology that incentivizes all of these processes and disincentivizes trolling. <br>
      How all of this works can be read on our project page <a
        href="https://www.decentral-card.net/"
        target="_blank"
      > Decentral Card Network </a><br><br>
      You are right now on the page of the game Crowd Control, which is the product of our decentralized autonomous organization (DAO).
      <br><br>
      </div>

      <div class="creator-preview">
        <CardComponent
          
          :model="cards[0]"
          :image-u-r-l="cardImgs[0]"
        />
      </div>

    </div>
    <div class="about-left-card">

      <div class="creator-preview">
        <CardComponent
          
          :model="cards[0]"
          :image-u-r-l="cardImgs[0]"
        />
      </div>

      <div>
      Crowd Control has unique game mechanics. These mechanics are tailored to allow card creation and balancing by the users as well as a modern fast paced gameplay. In Crowd Control you don't have to wait for others to end their turn. Simultaneous turns have become a standard in round-based multiplayer games, but unfortunately not in collectible card games. We change that. <br><br>
      Crowd Control balances cards continuously. In other collectible card games some cards are too strong, some are too weak and even cards which are fair become useless after some time. We change that. <br><br>
      Crowd Control gives you full ownership. And we mean it. You own the cards which you acquire through play and participation. And furthermore you own the card prototypes which you design and create. You decide if these cards are mass printed or your personal rare gems. In other collectible card games players create their own alternate art or even whole cards but can never play these cards legally. We change that.
      </div>
    </div>
    <div class="about-both-card">

      <div class="creator-preview">
        <CardComponent
          
          :model="cards[0]"
          :image-u-r-l="cardImgs[0]"
        />
      </div>

      <div>
      Let's have a look into these new innovations and start with game mechanics. 

      </div>
      
      <div class="creator-preview">
        <CardComponent
          
          :model="cards[0]"
          :image-u-r-l="cardImgs[0]"
        />
      </div>

    </div>
  </div>

</template>

<script>
import CardComponent from '../CardComponent'
import { sampleImg, communityImg, communityCard } from '../utils.js'

export default {
  name: 'AboutPage',
  components: {CardComponent},
  data () {
    return {
      cards: [communityCard],
      cardImgs: [communityImg, sampleImg]
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";

.hero {
  margin: 4rem 0;

  @media (max-width: 480px) {
    margin: 0;
  }
}
.about-left-card {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr;
    gap: 2rem 4rem;
    @media (min-width: 480px) {
      grid-template-areas: "creator-input creator-preview";
    }
  }
.about-right-card {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 1fr;
    gap: 2rem 4rem;
    @media (min-width: 480px) {
      grid-template-areas: "creator-input creator-preview";
    }
  }
.about-both-card {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr;
    gap: 2rem 4rem;
    @media (min-width: 480px) {
      grid-template-areas: "creator-input creator-preview";
    }
  }
</style>
