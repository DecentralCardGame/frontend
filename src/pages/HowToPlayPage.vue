<template>
  <div class="article-temp width-temp">
    <div class="hero">
      <h1>How To Play</h1>
      <p class="text--big">Here you can read how to play this game - written for real noobs.</p>
      
    </div>
    <h2>Fundamentals</h2>
    <p>
    Crowd Control is a strategy game in which two players battle with their own, previously put together decks. The cards are played simultaneously 
    and remain hidden until both players are finished playing cards. Both players start with a headquarters, that has 20 health points, in play.
    When a player manages to reduce the health points of the enemy headquarter to zero, he wins.
    <br>
    <h2>Resources: the basis for every action</h2>
    Each card you play requires resources. You can get those resources either from some cards themselves or from your headquarters, which gives you more and more resources as the game goes on. To be more specific, your headquarter produces resources equal to its growth-level every turn. The growth level increases every time you reach ten growth. Most headquarters gain ten growth per turn, meaning that you get one more resource every turn, so one in the first turn, two in the second and so on. You keep any resources that you didn’t spend, allowing you to still use them in the following turns.
    <br>
    <h2>Classes</h2>
    In addition to said effects, headquarters also dictate the classes from which you are allowed to play cards. In total there are five classes:
    <br>
    Energy Iron Lumber Food Mana
    <br>
    A headquarter can have any combination of classes. You may only put cards into your deck that share at least one class with your headquarter and don´t belong to another class. For example if your headquarters is lumber/food you may put food cards, lumber cards and food/lumber cards, but not lumber/iron or food/mana cards into your deck.
    <br>
    <h2>Components of a CrowdControl Card</h2>
    Now that you know what the basis for playing cards is, we will go into the structure and the different types of cards you can play.
    <h2>Class</h2>
    These symbols show which class the card belongs to.
    card name
    <h2>Textbox</h2>
    Here the abilities of the card are listed. 
    <h2>Attack and Life Values</h2>
    Depending on the type of card, the card can have an attack and life value. The attack value determines how much damage the card can do and the life value determines how much damage the card can withstand.
    <h2>Card types</h2>
    As you can see, each card has a specific card type that tells you what to do with it after you play it. 
    But first we will start with your headquarters, you don't have to play this card because you start the game with it in play.
    <div class="about about--card-right">
      <div>
        <h2>Your Headquaters</h2>
        Your headquarters shows you which resources you can use.
        These icons show you which resource classes you can use.
        The card type is displayed here.
        This is the life value of your headquarters. Once it is at 0, you have lost
        <h2>Entities (Creatures)</h2>
        Entities fight for you. They stay on the battlefield until they lose their life points. The life points tell you how much damage is needed to destroy them, while the attack value indicates the damage they cause. Entities inflict damage on each other during the battle phase. An entity can defend or attack, but it cannot attack on the turn it entered the game. Entities can have abilities which trigger effects.
        <h2>Places</h2>
        Places are also permanent cards. They have only a life value and disappear from play as soon as it reaches 0. Places have different abilities, typical abilities are those that create additional entities or produce additional resources or wisdom.
        <h2>Actions</h2>
        Action cards, unlike all other card types, do not have abilities but effects. Effects have a direct effect on the game when the action is played. After that, actions land on the Dust Pile.
        <h2>Abilities</h2>
        As mentioned before, the permanent cards can have special abilities that affect the game. There are 2 basic types, triggered and activated abilities. Activated abilities are used in a controlled way, e.g. when the player pays a certain amount of resources, whereas triggered abilities are triggered by certain events in the game. The three most common ones are "on spawn", i.e. when the card enters the game, "periodic" every round, and "on death" when the card leaves play.
        <h2>Triggered Abilities</h2>
        When a certain event occurs, an effect is triggered. This would be for example for the card Dr. Dolly: Whenever an entity dies, you get a resource for it. The event is the death of an entity, more precisely the change from the game to the Dust Pile and the effect is the receipt of a resource. Within a turn there are certain phases in which triggered abilities are processed. We will go into this in more detail later.
        <h2>Activated Abillites</h2>
        You can activate an activated ability exactly when you can also play cards from your hand. But you must also be able to pay their costs. For example, the Time Manipulation Device has the ability "10 Energy: Gain 15 Wisdom".
        <h2>Game Zones</h2>
        Hand
        You start the game with as many hand cards as specified on your HQ. Most of the time this is 3 cards, you are usually allowed to draw 1 card per round, so in the first round you will likely have 4 cards to play.
        Your Deck
        From this deck you draw your playing cards. Your deck consists of 50 cards.
        Dustpile 
        The Dustpile is your storage stack for played actions, as well as entities and places whose life value has fallen to or below 0. There are certain action cards or effects that can bring cards from the Dust Pile back into play.
        <h2>Attacking and Blocking</h2>
        The game is decided by whose headquarters reaches 0 life points first. Attacking with entities is the usual way to achieve this.
        In the battle planning phase you can decide which entities are in attack mode or defense mode. "Upright" entities are in attack mode, while "rotated" cards are in defense mode (we only do this for now on untap.in). Entities in attack mode meet enemy entities in defense mode and vice versa. Each entity in attack mode meets one entity in defense mode, if there are more attackers, all excess entities can apply their damage to the headquarters or a place chosen by the attacker.
        You can only attack with entities that you had "under control" at the beginning of the turn. This means that the entity was played in the previous turn.
        The entities attack the opposing entities in defense mode in the order in which they were switched to defense mode. The same applies to the entities in attack mode.  
        That means: Entity in position 1 attacks entity in position 1 in defense mode, entity in position 2 attacks entity in position 2 and so on. If an entity is switched from one mode to the other in the next turn, it will be at the very back of the sequence, even if it was at the very front before. The order of the entities that are moved in the back of a lane can be decided by the owner of the entities.
        In defense mode attacks can be blocked. So if you want to protect your headquarters from an attack, turn an entity horizontally to put it in defense mode. This way it blocks an attack. However, an entity can only block one attack. This means that the next attacking entity could pass by to your headquarters or attack a place.
        During the planning phase you can always decide which mode your card is in. However, by turning the card into the respective mode you also change the position of the card. This means, for example, that a card that changes from defense mode to attack mode will now be in the last position in the attack order. In the same way, if you move a card from attack mode to defense mode, it will be moved to the end of the defense order.
        <h2>Important:</h2>
        There is the attack and the defense mode
        Each defending entity can only block one attacking entity
        Entities that fight against each other inflict damage to each other in the amount of their attack value
        Without a defender your headquarters can be attacked directly
        <h2>Deck building</h2>
        You may only place each card in a deck up to 3 times. In total, your deck must consist of 50 or more cards.
        <h2>Game progression</h2>
        <h3>Planning phase</h3>
        <h3>Start of round: </h3>
        First, the intrinsic abilities of the headquarters are executed, i.e. Wisdom and Growth. The two values (Wisdom, Growth) are credited to the player, if he has more than 10 Growth, the growth level of the HQ increases by one. After that he gets one resource for each Growth level of the HQ. After that, all abilities that are triggered at the beginning of the turn are processed. Whenever abilities are processed, all effects are collected and sorted into two different queues, one for all effects that affect your own cards and one for all effects that affect the opponent's cards. We call them Own Queue and Enemy Queue. The effects of the Own Queue are then applied immediately, i.e. you can draw cards, receive resources and so on. In contrast, the effects that affect the opponent are suspended and applied later, which can also be effects that were suspended at the very end of the last round. When executing these effects, triggered abilities can be triggered, the effects of these abilities are also suspended, i.e. not immediately applied. For this reason there are no so-called "infinites" in Crowd Control. These are loops in which one or more effects can be triggered infinite times in the same game phase. We deliberately designed the game so that this is not possible, but it is possible to build loops that give you a limited number of effects every turn.
        <h3>Card playing phase</h3>
        Both players can now play cards. This happens at the same time. The effects of action cards may be applied immediately if they affect your own cards, effects affecting the opponent are collected further. The effects of triggered abilities are collected. When playing an Entity or Place, it is possible to immediately activate an activated ability. The effect of the activated ability is collected as usual and processed later. 
        <h3>Resolve </h3>
        The first Resolve Phase is when all the cards played are revealed and all the effects collected are applied. First the collected effects, which come from triggered abilities and affect the own cards, are processed. Then the effects that affect the opponent's cards are applied. These can even be from the last round if they were triggered at the very end. Both players choose the targets and once they have done so, the effects are applied. While applying effects, new abilities can be triggered again, the effects are collected as usual.
        <h3>Resolve</h3>
        The second Resolve phase works the same as the first. All effects that are triggered by the resolving of effects in this phase will end up in the queue as usual, but the queue will not be processed until the next turn.
        <h3>Combat</h3>
        The entities fight against each other as described above, all "unblocked" attackers can attack a Place or the HQ. All effects that are triggered in combat are collected as usual, but are not processed until the next turn. A very typical example is "On death - draw a card". The card can only be drawn in the next turn, which is not a big deal, because you can't play it until the next turn anyway.
        example of a round sequence

      </div>
        <CardComponent
            class="about__preview"
            :model="cards[0]"
            :image-u-r-l="cardImgs[0]"
        />
    </div>

    <div class="about about--card-left">
        <CardComponent
            class="about__preview"
            :model="cards[1]"
            :image-u-r-l="cardImgs[1]"
        />
      <div>
        <h2>lorem ipsum yes</h2>
        <p>
          lorem ipsum yeslorem ipsum yes
        </p>
      </div>
    </div>

    <div class="about about--card-right">

      <div>
        <h2>lorem ipsum yes</h2>
        <p>
          lorem ipsum yes
        </p>
      </div>
        <CardComponent
            class="about__preview"
            :model="cards[2]"
            :image-u-r-l="cardImgs[2]"
        />
    </div>

    <div class="about about--card-left">
        <CardComponent
            class="about__preview"
            :model="cards[3]"
            :image-u-r-l="cardImgs[3]"
        />
      <div>
        <h2>lorem ipsum yes</h2>
        <p>
          lorem ipsum yeslorem ipsum yeslorem ipsum yeslorem ipsum yeslorem ipsum yes
        </p>
      </div>
    </div>

    <div class="about about--card-right">
      <div>
        <h2>lorem ipsum yes</h2>
        <p>
          lorem ipsum yeslorem ipsum yeslorem ipsum yeslorem ipsum yeslorem ipsum yes
        </p>
      </div>
        <CardComponent
            class="about__preview"
            :model="cards[4]"
            :image-u-r-l="cardImgs[4]"
        />
    </div>
  </div>

</template>

<script>
import CardComponent from '../components/CardComponent'
import {
  belloCard,
  belloImg,
  botCommandCard,
  botCommandImg,
  communityCard,
  communityImg,
  dollyCard,
  dollyImg,
  timeDeviceCard,
  timeDeviceImg
} from '../components/utils/sampleCards.js'

export default {
  name: 'AboutPage',
  components: {CardComponent},
  data() {
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
  margin-bottom: $font-size*4;
}

.about--card-left {
  grid-template-columns: auto 3fr;

  .about__preview {
    justify-self: start;
  }
}

.about--card-right {
  grid-template-columns: 3fr auto;

  .about__preview {
    justify-self: end;
  }
}

.about--card-both {
  grid-template-columns: 1fr 2fr 1fr;
}

.about__preview {
  width: auto;
}

h2 {
  font-size: 1.75rem;
}
</style>
