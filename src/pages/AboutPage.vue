<template>
  <div class="article-temp">
    <div class="hero">
      <h1>Welcome to Crowd Control</h1>
      <p class="text--big">Crowd Control is a trading card game, which gives you full ownership of your cards AND gives the community full ownership of the game. This means we are creating this together. Any player can design their own trading cards. Any player may participate in the process of balancing the game by voting on cards.</p>
      <p>Scroll down to learn more about this awesome game!</p>
    </div>
    <div class="about-right-card">
      <div>
        <h2>The Game</h2>
        <p>
          This sounds very awesome, but how shall this work? Somebody must be in charge and someone has to say what is overpowered and why should anyone do all this kind of work?
          Yes. The answer is blockchain. We build a blockchain with Cosmos technology that incentivizes all of these processes and disincentivizes trolling.
          How all of this works can be read on our project page <a
            href="https://www.decentral-card.net/"
            target="_blank"
        > Decentral Card Network </a></p>
        <p>
          You are right now on the page of the game Crowd Control, which is the product of our decentralized autonomous organization (DAO).
        </p>
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
        <h2>The Mechanics</h2>
        <p>
          Crowd Control has unique game mechanics.
          These mechanics allow automatic balancing by you, the players and provide a modern fast paced gameplay.
          In Crowd Control you don't have to wait for others to end their turn. We have simultaneous turns, this means you don't have to wait each turn.
          Crowd Control balances cards continuously.
          There are no cards, which are too strong for all time and need to be banned because of that.
          There are no cards, which are useless forever and never see the light of play.
          Crowd Control gives you full ownership. And we mean it.
          You own the cards which you acquire through play and participation.
          And furthermore you own the card prototypes which you design and create. Go to the <router-link :to="{ name: 'New Card' }">Card Creator</router-link> to start creating.
          You decide if these cards are mass printed or your personal rare gems.
          In other collectible card games players create their own alternate art or even whole cards but can never play these cards legally. We change that.
        </p>
      </div>
    </div>

    <div class="about-right-card">

      <div>
        <h2>The Cards</h2>
        <p>
          We have 4 different types of cards. The HQ, Place, Entity and Action.
        </p>
        <p>
          <b>Action</b> cards are played and have effects that happen directly. In other games these are often called Spells or Sorceries.<br>
          <b>Entity</b> cards stay in the game and can attack and defend. In other games these are called Monsters, Creatures or Minions. <br>
          <b>Place</b> cards stay in the game, but cannot attack. In other games things like our Places are rare, only Planeswalkers are similar. <br>
          <b>HQ</b> cards define your playstyle. You have only one HQ in your Deck and it is active from the beginning. If you lose it, you lose the game. It is like Commanders in Magic and Heroes in Hearthstone combined, so its impact on the archetype of a deck is even higher.<br>
        </p>
        <p>
          ou can have a look at some cards here on the page or see all of them in the <router-link :to="{ name: 'Gallery' }">Gallery</router-link>.
        </p>
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
        <h2>The Gameplay</h2>
        <p>
          A turn begins by giving you Production and Wisdom. How much you get is determined by your HQ as well as how many cards are in your starting hand.
          Then both players may play cards at the same time, when both are finished, they decide which Entities should attack and which defend.
          Finally the Entities fight against each other and all unblocked ones may damage the opponents HQ or a Place. Then the next turn begins and the cycle starts again.
          We have not mentioned abilities and effects yet, but these are the magic sauce of trading card games. Abilities can be activated by the player or triggered by game events. When they do, they unleash an effect. All cards can have abilities, except for Action cards, which directly unleash their effects. Effects change something in the game, like destroying a Place or buffing your Entities.
          In Crowd Control we have solved the hard task to give the players as much freedom as possible with abilities while also being able to balance the game under all circumstances.
          If you want to know the game rules and mechanics in detail, check out our <router-link :to="{ name: 'About' }">Game Rules</router-link>
        </p>
      </div>
    </div>

    <div class="about-right-card">
      <div>
        <h2>The Council</h2>
        <p>
          The balancing is done by adjusting the ressource cost of a card. This means when a card receives more 'overpowered' votes than 'fair enough' or 'underpowered' votes and it is among the cards with the most 'overpowered' votes, it gets nerfed by increasing its ressource cost by one. HQs get nerfed by decreasing their HP, Wisdom, Growth and Starting Hand Size. Which value is decreased rotates on every nerf level.
          The same applies for 'underpowered' votes just the other way around. There are also 'inappropriate' votes, which are used to remove images or flavor text which are inappropriate like gore or explicit sexual content. In that case only the image and the flavor text are stripped off a card and must be updated by the creator. You can start <router-link :to="{ name: 'Vote' }">Voting</router-link> after you login with your account.
          In the future there will also be a council, where new cards must be approved, which earns council members credits.
          Furthermore there will be sets, which bundle together 100 cards into a set and boosters can be bought from these sets.
        </p>
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
import CardComponent from '../components/CardComponent'
import { communityCard, dollyCard, belloCard, timeDeviceCard, botCommandCard, communityImg, dollyImg, timeDeviceImg, belloImg, botCommandImg } from '../components/utils/sampleCards.js'

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
  @import "../assets/styles/variables";

.hero {
  margin: 4rem 0;
  text-align: center;
  @media (max-width: 480px) {
    margin: 0;
  }
}
.about-left-card {
    align-items: center;
    align-self: center;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 2rem 4rem;
    @media (min-width: 480px) {
      grid-template-areas: "creator-input creator-preview";
    }
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }
.about-right-card {
    align-items: center;
    align-self: center;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr;
    gap: 2rem 4rem;
    @media (min-width: 480px) {
      grid-template-areas: "creator-input creator-preview";
    }
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
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
.creator-preview {

}
h2 {
  font-size: 1.75rem;
}
</style>