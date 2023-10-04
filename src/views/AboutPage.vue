<template>
  <div class="article-temp width-temp">
    <div class="hero">
      <h1>Welcome to Crowd Control</h1>
      <p class="text--big">
        Crowd Control is a trading card game that gives you full ownership of your cards AND gives
        the community full ownership of the game. That means we are creating this together. Every player can design their
        own trading cards. Every player can participate in the process of balancing the game by voting on cards.
      </p>
      <b class="text--big">Scroll down to learn more about this awesome game!</b>
    </div>

    <div class="dual--column--flex--wrap">
      <div class="dual--column--text">
        <h2>The Game</h2>
        <p>
          This sounds very awesome, but how does it work? Somebody must be in charge and someone has to say what is
          overpowered. And why should anyone do all this kind of work?
          Yes. The answer is blockchain. We are building a blockchain with Cosmos technology that incentivizes all these
          processes and disincentivizes trolling.
          How this all works can be read in detail in our <a
            href="https://github.com/DecentralCardGame/whitepaper/blob/master/whitepaper.pdf"
            target="_blank"
          > Whitepaper</a>,
          however if you like it shorter and simpler, just read the following lines.
        </p>
        <p>
          Furthermore Crowd Control is not just a game, but rather a decentralized autonomous
          organization (DAO). This means that this whole thing is not owned by a company squeezing the maximum profit
          out of the player base. Crowd Control is owned by everyone who has contributed to the project. This
          means you can also contribute and become not only a member but an owner of Crowd Control.
        </p>
      </div>
      <div class="dual--column--img">
        <CardComponent
          :model="communityCardData"
          :image-u-r-l="cardJpgs.communityCardImg"
        />
      </div>
    </div>

    <div class="dual--column--flex--wrap reverse-column">
      <div class="dual--column--img">
        <CardComponent
          :model="healingPriestCard"
          :image-u-r-l="cardJpgs.healingPriestImg"
        />
      </div>
      <div class="dual--column--text">
        <h2>The Mechanics</h2>
        <p>
          Crowd Control has unique game mechanics.
          These mechanics allow automatic balancing by you, the players and provide a modern fast paced gameplay.
          In Crowd Control you don't have to wait for others to finish their turn. We have simultaneous turns, so
          you don't have to wait every turn.
          Crowd Control is continuously balancing cards.
          There are no cards that are too strong for all time and need to be banned because of that.
          There are no cards that are useless forever and never see the light of play.
          Crowd Control gives you full ownership. And we mean it.
          You own the cards which you acquire through play and participation.
          And furthermore you own the card prototypes which you design and create. Go to the
          <router-link :to="{ name: 'New Card' }">
            Card Creator
          </router-link>
          to start creating.
          You decide wheter these cards will be mass printed or remain being your personal rare gems.
          In other collectible card games players create their own alternate art or even whole cards but can never play
          these cards legally. We are changing that.
        </p>
      </div>
    </div>

    <div class="dual--column--flex--wrap">
      <div class="dual--column--text">
        <h2>The Cards</h2>
        <p>
          We have 4 different types of cards. The HQ, Place, Entity and Action.
        </p>
        <p>
          <b>Action</b> cards are played and have effects that happen immediately. In other games these are often called
          Spells or Sorceries.<br>
          <b>Entity</b> cards stay in the game and can attack and defend. In other games these are called Monsters,
          Creatures or Minions. <br>
          <b>Place</b> cards stay in the game but cannot attack. In other games things like our Places are rare, only
          Planeswalkers are similar. <br>
          <b>HQ</b> cards define your play style. You have only one HQ in your Deck and it is active from the start of the match.
          If you lose it, you lose the game. It is like Commanders in Magic and Heroes in Hearthstone combined, so its
          impact on the archetype of a deck is very higher.<br>
        </p>
        <p>
          you can have a look at some cards here on the page or see all of them in the
          <router-link :to="{ name: 'Gallery' }">
            Gallery
          </router-link>.
        </p>
      </div>
      <div class="dual--column--img">
        <CardComponent
          :model="churchCard"
          :image-u-r-l="cardJpgs.churchImg"
        />
      </div>
    </div>

    <div class="dual--column--flex--wrap reverse-column">
      <div class="dual--column--img">
        <CardComponent
          :model="armedSupplierCard"
          :image-u-r-l="cardJpgs.armedSupplierImg"
        />
      </div>
      <div class="dual--column--text">
        <h2>The Gameplay</h2>
        <p>
          A turn begins by giving you Mana and Wisdom. Your HQ produces 4 Wisdom each turn, which let's you draw one card.
          It also grows each turn, which increases the Mana production. In turn 1 you get 1 Mana, in
          turn 2 you get 2 and so on.
          Then both players can play cards at the same time, when both are finished, they decide which Entities will
          attack and which defend.
          Finally the Entities fight each other and any unblocked ones may damage the opponent's HQ or a Place.
          Then the next turn begins and the cycle starts again.
          We have not mentioned abilities and effects yet, but these are the magic sauce of trading card games.
          Abilities can be activated by the player or triggered by game events. When they do, they unleash an effect.
          All cards can have abilities, except for Action cards, which directly unleash their effects. Effects change
          something in the game, like destroying a Place or buffing your Entities.
          With Crowd Control we have solved the hard task to give the players as much freedom as possible with abilities,
          while also being able to balance the game under all circumstances.
          If you want to know the game rules and mechanics in detail, check out our
          <router-link :to="{ name: 'About' }">
            Game Rules
          </router-link>.
        </p>
      </div>
    </div>

    <div class="dual--column--flex--wrap">
      <div class="dual--column--text">
        <h2>The Balancing</h2>
        <p>
          The balancing is done by adjusting the mana cost of a card. This means that if a card receives more
          'overpowered' votes than 'fair enough' or 'underpowered' votes, and it is among the cards with the most
          'overpowered' votes, it will be nerfed by increasing its ressource cost by one. HQs get nerfed by decreasing
          their HP and increasing their delay. Which value is decreased rotates on each nerf level. Delay is very
          similar to mana cost in that it determines when a HQ can use its abilities.
          The same is true for 'underpowered' votes just the other way around. There are also 'inappropriate' votes,
          which are used to remove images or flavor text which are inappropriate like gore or explicit sexual content.
          In that case only the image and the flavor text will be removed from the card. Then the creator will need to update it.
          You can start
          <router-link :to="{ name: 'Vote' }">
            Voting
          </router-link>
          after logging in to your account.
          In the future, there will also be a council to approve new cards. This process earns
          council members credits.
          Furthermore there will be sets, which bundle together 100 cards into a set and boosters can be bought from
          these sets, giving financial reward to those creating cards.
        </p>
      </div>
      <div class="dual--column--img">
        <CardComponent
          :model="wildAllianceCard"
          :image-u-r-l="cardJpgs.wildAllianceImg"
        />
      </div>
    </div>

    <div class="dual--column--flex--wrap">
      <div class="dual--column--text">
        <p>
          <br>
          Just check out our <router-link :to="{ name: 'Roadmap' }">
            <b>Roadmap</b>
          </router-link> to see how it's going.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardComponent from "@/components/elements/CardComponent.vue";
import {
  cardJpgs,
  churchCard,
  armedSupplierCard,
  wildAllianceCard,
  healingPriestCard,
  communityCardData
} from "@/components/utils/sampleCards";
</script>

<style scoped lang="scss">
@import "../scss/variables";

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

h2 {
  font-size: 1.75rem;
}
</style>
