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
          :model="cards[1]"
          :image-u-r-l="cardImgs[1]"
        />
      </div>
      <div>
      Crowd Control has unique game mechanics. <br>
      These mechanics allow automatic balancing by you, the players and provide a modern fast paced gameplay. <br>
      In Crowd Control you don't have to wait for others to end their turn. We have simultaneous turns, this means you don't have to wait each turn. <br>
      Crowd Control balances cards continuously. <br>
      There are no cards, which are too strong for all time and need to be banned because of that.<br>
      There are no cards, which are useless forever and never see the light of play. <br>
      Crowd Control gives you full ownership. And we mean it. <br>
      You own the cards which you acquire through play and participation. <br>
      And furthermore you own the card prototypes which you design and create. <br>
      You decide if these cards are mass printed or your personal rare gems. <br>
      In other collectible card games players create their own alternate art or even whole cards but can never play these cards legally. We change that.
      </div>
    </div>

    <div class="about-right-card">

      <div>
      We have 4 different types of cards. The HQ, Place, Entity and Action. <br><br>
      <b>Action</b> cards are played and have effects that happen directly. In other games these are often called Spells or Sorceries.<br>
      <b>Entity</b> cards stay in the game and can attack and defend. In other games these are called Monsters, Creatures or Minions. <br>
      <b>Place</b> cards stay in the game, but cannot attack. In other games things like our Places are rare, only Planeswalkers are similar. <br>
      <b>HQ</b> cards define your playstyle. You have only one HQ in your Deck and it is active from the beginning. It is like Commanders in Magic and Heroes in Hearthstone combined, so its impact on the archetype of a deck is even higher.<br><br>
      You can have a look at some cards here on the page or see all of them in the <router-link :to="{ name: 'Gallery' }">Gallery</router-link>.
      </div>
      <div class="creator-preview">
        <CardComponent
          :model="cards[2]"
          :image-u-r-l="cardImgs[2]"
        />
      </div>
    </div>

    <div class="about-left-card">
     <div class="creator-preview">
        <CardComponent
          :model="cards[3]"
          :image-u-r-l="cardImgs[3]"
        />
      </div>
      <div>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
      </div>
    </div>

    <div class="about-right-card">

      <div>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
      </div>
      <div class="creator-preview">
        <CardComponent
          :model="cards[4]"
          :image-u-r-l="cardImgs[4]"
        />
      </div>
    </div>
  </div>

</template>

<script>
import CardComponent from '../CardComponent'
import { communityCard, dollyCard, belloCard, timeDeviceCard, botCommandCard, communityImg, dollyImg, timeDeviceImg, belloImg, botCommandImg } from '../sampleCards.js'

export default {
  name: 'AboutPage',
  components: {CardComponent},
  data () {
    return {
      cards: [communityCard, dollyCard, timeDeviceCard, belloCard, botCommandCard],
      cardImgs: [communityImg, dollyImg, timeDeviceImg, belloImg, botCommandImg]
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
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 2rem 4rem;
    @media (min-width: 480px) {
      grid-template-areas: "creator-input creator-preview";
    }
  }
.about-right-card {
    display: grid;
    grid-template-columns: 2fr 1fr;
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
