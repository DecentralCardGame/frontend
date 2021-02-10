<template>
  <div class="article-temp width-temp">
    <div class="hero">
      <h1>How To Play</h1>
      <p class="text--big">
        Here you can read how to play this game - written by noobs for noobs.
      </p>
    </div>
    <h2>Fundamentals</h2>
    <p>
      Crowd Control is a strategy game in which two players battle with their own, previously put together decks. The cards are played simultaneously 
      and remain hidden until both players are finished playing cards. Both players start with a headquarters that has 20 health points.
      When a player manages to reduce the health points of the enemy headquarters to zero, he wins.
      <br>
    </p><h2>Resources: the basis for every action</h2>
    Each card you play requires resources. You can get those resources either from some cards themselves or from your headquarters, which gives you more and more resources as the game goes on. To be more specific, your headquarter produces resources equal to its growth-level every turn. The growth level increases every time you reach ten growth points. Most headquarters gain ten growth per turn, meaning that you get one more resource every turn, so one in the first turn, two in the second and so on. You keep any resources that you didn’t spend, allowing you to still use them in the following turns.
    <br>
    <h2>Classes</h2>
    In addition to said effects, headquarters also dictate the classes from which you are allowed to play cards. In total there are five classes:
    <br>
    <div>
      <!-- <img src="../assets/Energy.svg" /> Iron, Lumber, Food and Mana. -->
      <div>
        <!-- energy icon -->
        <img src="../assets/symbols/energy-class.svg" width="20px" height="100px">
      </div>
      <div>
        <!-- food icon -->
        <img src="../assets/symbols/food-class.svg" width="20px">
      </div>
      <div>
        <!-- iron icon -->
        <img src="../assets/symbols/iron-class.svg" width="20px">
      </div>
      <div>
        <!-- mana icon -->
        <img src="../assets/symbols/mana-class.svg" width="20px">
      </div>
      <div>
        <!-- lumber icon -->
        <img src="../assets/symbols/lumber-class.svg" width="20px">
      </div>
    </div>
    <br>
    A headquarter can have any combination of classes. You may only put cards into your deck that share at least one class with your headquarter and don´t belong to another class. For example if your headquarters is lumber/food you may put food cards, lumber cards and food/lumber cards, but not lumber/iron or food/mana cards into your deck.
    <br>
    <h2>Components of a CrowdControl Card</h2>
    Now that you know what the basis for playing cards is, we will go into the structure and the different types of cards you can play.
    <h2>Card types</h2>
    As you can see, each card has a specific card type that tells you what to do with it after you play it. 
    But first we will start with your headquarters, you don't have to play this card because you start the game with it in play.
    <br>
    <br>
    
    <img src="../assets/HQ_Dolly.png">
    <h2>Your Headquaters</h2>
    Your Headquarters shows you which resources you can use, they are displayed on the top right of your card (
    <span class="marked-text">1</span>
    ).
    Every Headquarters has special abilities for example Dr. Dolly´s Headquarters starts with Dr. Dolly in your hand and you can get 10 wisdom for 3 resources (
    <span class="marked-text">2</span>
    ).
    You also have to always be aware of the life points of your headquarters which are on the botom right of the card (
    <span class="marked-text">3</span>
    ).
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    
     <img src="../assets/Dr.Dolly.png">
    <h2>Entities (Creatures)</h2>
    Entities fight for you on the battleground. The number on the top left tells you how many resources you need to put them there (
    <span class="marked-text">1</span>
    ).
    They stay on the battlefield until they lose their life points. The life points tell you how much damage is needed to destroy them (
    <span class="marked-text">2</span>
    ), while the attack value indicates the damage they cause (
    <span class="marked-text">3</span>
    ).
    Entities inflict damage on each other during the battle phase. An entity can defend or attack, but it cannot attack on the turn it entered the game. Entities can have abilities which trigger effects. They are displayed on the textbox (
    <span class="marked-text">4</span>
    ).
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="about-flex-wrap">
      <div class="about-text">
        <h2>Places</h2>
        Places are also permanent cards. They have only a life value and disappear from play as soon as it reaches 0. Places have different abilities, typical abilities are those that create additional entities or produce additional resources or wisdom.
      </div>
      <div class="about-card">
        <div @click="highlight(sampleCards.botCommandCenter, sampleCards.botCommandCenter.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.botCommandCenter"
            :image-u-r-l="sampleCards.botCommandCenter.cardImg"
          />
        </div>
      </div>
    </div>
    <div class="about-flex-wrap">
      <div class="about-text">
        <h2>Actions</h2>
        Action cards, unlike all other card types, do not have abilities but effects. Effects have a direct effect on the game when the action is played. After that, actions land on the Dust Pile.
      </div>
      <div class="about-card">
        <div @click="highlight(sampleCards.communityImg, sampleCards.communityImg.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.communityImg"
            :image-u-r-l="sampleCards.communityImg.cardImg"
          />
        </div>
      </div>
    </div>  
    <h2>Abilities</h2>
    As mentioned before, the permanent cards can have special abilities that affect the game. There are 2 basic types, triggered and activated abilities. Activated abilities are used in a controlled way, e.g. when the player pays a certain amount of resources, whereas triggered abilities are triggered by certain events in the game. The three most common ones are "on spawn", i.e. when the card enters the game, "periodic" every round, and "on death" when the card leaves play.
    <h2>Triggered Abilities</h2>
    When a certain event occurs, an effect is triggered. This would be for example for the card Dr. Dolly: Whenever an entity dies, you get a resource for it. The event is the death of an entity, more precisely the change from the game to the Dust Pile and the effect is the receipt of a resource. Within a turn there are certain phases in which triggered abilities are processed. We will go into this in more detail later.
    <h2>Activated Abillites</h2>
    You can activate an activated ability exactly when you can also play cards from your hand. But you must also be able to pay their costs. For example, the Time Manipulation Device has the ability "10 Energy: Gain 15 Wisdom".
    <h2>Game Zones</h2>
    Hand: <br>
    You start the game with as many hand cards as specified on your HQ. Most of the time this is 3 cards, you are usually allowed to draw 1 card per round, so in the first round you will likely have 4 cards to play.
    <br><br>
    Your Deck: <br>
    From this deck you draw your playing cards. Your deck consists of 50 cards.
    <br><br>
    Dustpile: <br>
    The Dustpile is your storage stack for played actions, as well as entities and places whose life value has fallen to or below 0. There are certain action cards or effects that can bring cards from the Dust Pile back into play.
    <h2>Attacking and Blocking</h2>
    The game is decided by whose headquarters reaches 0 life points first. Attacking with entities is the usual way to achieve this.
    In the battle planning phase you can decide which entities are in attack mode or defense mode. "Upright" entities are in attack mode, while "rotated" cards are in defense mode (we only do this for now on untap.in). Entities in attack mode meet enemy entities in defense mode and vice versa. Each entity in attack mode meets one entity in defense mode, if there are more attackers, all excess entities can apply their damage to the headquarters or a place chosen by the attacker.
    You can only attack with entities that you had "under control" at the beginning of the turn. This means that the entity was played in the previous turn.
    The entities attack the opposing entities in defense mode in the order in which they were switched to defense mode. The same applies to the entities in attack mode.  
    That means: Entity in position 1 attacks entity in position 1 in defense mode, entity in position 2 attacks entity in position 2 and so on. If an entity is switched from one mode to the other in the next turn, it will be at the very back of the sequence, even if it was at the very front before. The order of the entities that are moved in the back of a lane can be decided by the owner of the entities.
    In defense mode attacks can be blocked. So if you want to protect your headquarters from an attack, turn an entity horizontally to put it in defense mode. This way it blocks an attack. However, an entity can only block one attack. This means that the next attacking entity could pass by to your headquarters or attack a place.
    During the planning phase you can always decide which mode your card is in. However, by turning the card into the respective mode you also change the position of the card. This means, for example, that a card that changes from defense mode to attack mode will now be in the last position in the attack order. In the same way, if you move a card from attack mode to defense mode, it will be moved to the end of the defense order.
    <br>
    <b>Important:</b>
    There is the attack and the defense mode
    Each defending entity can only block one attacking entity
    Entities that fight against each other inflict damage to each other in the amount of their attack value
    Without a defender your headquarters can be attacked directly
    <h2>Deck building</h2>
    You may only place each card in a deck up to 3 times. In total, your deck must consist of 50 or more cards.
    <h3>Game progression</h3>
    <h2>Planning phase</h2>
    Start of round:
    <br>
    First, the intrinsic abilities of the headquarters are executed, i.e. Wisdom and Growth. The two values (Wisdom, Growth) are credited to the player, if he has more than 10 Growth, the growth level of the HQ increases by one. After that he gets one resource for each Growth level of the HQ. After that, all abilities that are triggered at the beginning of the turn are processed. Whenever abilities are processed, all effects are collected and sorted into two different queues, one for all effects that affect your own cards and one for all effects that affect the opponent's cards. We call them Own Queue and Enemy Queue. The effects of the Own Queue are then applied immediately, i.e. you can draw cards, receive resources and so on. In contrast, the effects that affect the opponent are suspended and applied later, which can also be effects that were suspended at the very end of the last round. When executing these effects, triggered abilities can be triggered, the effects of these abilities are also suspended, i.e. not immediately applied. For this reason there are no so-called "infinites" in Crowd Control. These are loops in which one or more effects can be triggered infinite times in the same game phase. We deliberately designed the game so that this is not possible, but it is possible to build loops that give you a limited number of effects every turn.
    <h2>Card playing phase</h2>
    Both players can now play cards. This happens at the same time. The effects of action cards may be applied immediately if they affect your own cards, effects affecting the opponent are collected further. The effects of triggered abilities are collected. When playing an Entity or Place, it is possible to immediately activate an activated ability. The effect of the activated ability is collected as usual and processed later. 
    <h2>Resolve Phase I</h2>
    The first Resolve Phase is when all the cards played are revealed and all the effects collected are applied. First the collected effects, which come from triggered abilities and affect the own cards, are processed. Then the effects that affect the opponent's cards are applied. These can even be from the last round if they were triggered at the very end. Both players choose the targets and once they have done so, the effects are applied. While applying effects, new abilities can be triggered again, the effects are collected as usual.
    <h2>Resolve Phase II</h2>
    The second Resolve phase works the same as the first. All effects that are triggered by the resolving of effects in this phase will end up in the queue as usual, but the queue will not be processed until the next turn.
    <h2>Combat</h2>
    The entities fight against each other as described above, all "unblocked" attackers can attack a Place or the HQ. All effects that are triggered in combat are collected as usual, but are not processed until the next turn. A very typical example is "On death - draw a card". The card can only be drawn in the next turn, which is not a big deal, because you can't play it until the next turn anyway.
    example of a round sequence
    <!--vvv 
    Made by Niko. 
    vvv-->
    <h2>4. Fight planning stage</h2>
    <p>
      The cards are now assigned in either attack or defense mode. All cards are placed on the field simultaneously.
      Player 1 puts all five pets in defense mode. Dr. Dolly, Bello and Saint Daisy go into attack mode.
    </p>
    <div class="content-border-white">
      <!--1st box-->
      <b id="player-num-text">Player 1</b>
      <p id="attack-mode-text">
        Attack mode
      </p>
      <div class="card-container">
        <div @click="highlight(sampleCards.drDolly, sampleCards.drDolly.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.drDolly"
            :image-u-r-l="sampleCards.drDolly.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.saintDaisy, sampleCards.saintDaisy.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.saintDaisy"
            :image-u-r-l="sampleCards.saintDaisy.cardImg"
          />
        </div>
      </div>
      <span
        id="defense-mode-text"
        style="text-align:left;"
      >Defense mode</span> 
      <div class="card-container">
        <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.saintDaisy_pet"
            :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.saintDaisy_pet"
            :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.saintDaisy_pet"
            :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.saintDaisy_pet"
            :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.saintDaisy_pet"
            :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
          />
        </div>
      </div>
    </div>
    <p>
      <br>
      Player 2 places Ulrich the Tinker in Defense Mode. Richard, Bot Commander, Hurrwig, Bot Manufacturer and Assoult Horse in attack mode.
    </p>
    <div class="content-border-white">
      <!--2nd box-->
      <b id="player-num-text">Player 2</b>
      <p id="attack-mode-text">
        Attack mode
      </p>
      <div class="card-container">
        <div @click="highlight(sampleCards.richard, sampleCards.richard.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.richard"
            :image-u-r-l="sampleCards.richard.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.hurrwig, sampleCards.hurrwig.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.hurrwig"
            :image-u-r-l="sampleCards.hurrwig.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.automatedBotProduction_bot, sampleCards.automatedBotProduction_bot.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.automatedBotProduction_bot"
            :image-u-r-l="sampleCards.automatedBotProduction_bot.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.automatedBotProduction_bot, sampleCards.automatedBotProduction_bot.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.automatedBotProduction_bot"
            :image-u-r-l="sampleCards.automatedBotProduction_bot.cardImg"
          />
        </div>  
        <div @click="highlight(sampleCards.assoultHorse, sampleCards.assoultHorse.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.assoultHorse"
            :image-u-r-l="sampleCards.assoultHorse.cardImg"
          />
        </div>
      </div>
      <span id="defense-mode-text">Defense mode</span>
      <span
        id="defense-mode-text"
        style="margin-left:30%;"
      >Places</span>
      <div class="card-container">
        <div @click="highlight(sampleCards.ulrich, sampleCards.ulrich.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.ulrich"
            :image-u-r-l="sampleCards.ulrich.cardImg"
          />
        </div>
        <span /><!-- Empty space in grid -->
        <div @click="highlight(sampleCards.steam, sampleCards.steam.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.steam"
            :image-u-r-l="sampleCards.steam.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.automatedBotProduction, sampleCards.automatedBotProduction.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.automatedBotProduction"
            :image-u-r-l="sampleCards.automatedBotProduction.cardImg"
          />
        </div>
      </div>
    </div>
    <br>
    <h2>5. Resolve Phase II</h2>
    <p>
      Since no effects were triggered by the lane switches, we now enter the combat phase
    </p>
    <h2>6. Combat</h2>
    <p>
      Now the entities that were played in the last tick fight against each other.
      Due to its ability "Charge" the Assoult Horse can attack immediately in this turn.
      Now the entities attack one after the other.

           
      <br>
      <br>
      Player 1 attacks with all hist entities placed in the attack lane.
      Since Ulrich the Tinker is in Defense Mode, neither the HQ nor Places can be attacked.
      The entities in Attack Mode, namely, Dr. Dolly and Bello, die because of Ulrich the Tinker.
      Ulrich the Tinker survives with one life.
    </p>
    <div class="content-border-white">
      <!--3rd box-->
      <p style="display:block;font-size:1.25rem;margin:10px;">
        Player 1 Attack Mode
        <span style="display:block;float:right;width:45%;margin-left:10px;">Player 2 Defense Mode</span>
      </p>
      <div class="card-container">
        <div @click="highlight(sampleCards.drDolly, sampleCards.drDolly.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.drDolly"
            :image-u-r-l="sampleCards.drDolly.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.bello, sampleCards.bello.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.bello"
            :image-u-r-l="sampleCards.bello.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.saintDaisy, sampleCards.saintDaisy.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.saintDaisy"
            :image-u-r-l="sampleCards.saintDaisy.cardImg"
          />
        </div>
        <div>
          <img
            class="image_arrow"
            src="../assets/arrows/arrow_up.png"
          >
        </div>
        <div @click="highlight(sampleCards.ulrich, sampleCards.ulrich.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.ulrich"
            :image-u-r-l="sampleCards.ulrich.cardImg"
          />
        </div>
      </div>
    </div>
    <p>
      <br>
      Now player 2 attacks with hist entities in attack mode. 
      Richard Bot Commander fights against the 1st Pet in defense mode. Thereby his ability is triggered which is: "When Richard is attacking, create a 1/1 Bot that is also attacking". So an additional 1/1 bot appears, which now attacks the 2nd pet in defense mode. 
      Both entities take 1 point of damage and die.
      <br>
      <br>
      Now the appearance of the "Bot" will trigger an effect: Hurrwig's Bot Manufacturer's ability is triggered again and he can do 2 damage points to any enemy entity, this effect now lands in the Enemies Queue and is not processed until the next tick in the Resolve Phase I.
      <br>
      <br>
      Additionally, the death of the bot also triggers the ability of Ulrich the Tinker: "Whenever an Entity with the tag "Bot" is destroyed, draw a card".
      This effect is now also "collected" and ends up in the Own Queue of player 2, which is processed at the beginning of the next tick.
      <br>
      <br>
      Hurrwig, Bot Manufacturer now fights the 3rd Pet in defense mode, which also dies. The Bot created last round destroys the 4th Pet in the row.
      The 2nd Bot can't attack, because it was created this round. The last entity, Assoult Horse can attack, because of its Ability "Charge" and attacks the 5th Pet, whcih lands also on the Graveyard.
    </p><div class="content-border-white">
      <!--4th box-->
      <p style="display:block;font-size:1.25rem;margin:10px;">
        Player 2 Defense Mode
      </p>
      <div class="card-container">
        <div>
          <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
            <CardComponent
              class="card"
              :model="sampleCards.saintDaisy_pet"
              :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
            />
          </div>
          <img
            class="image_arrow rot90"
            src="../assets/arrows/arrow_up.png"
          >
          <div @click="highlight(sampleCards.richard, sampleCards.richard.cardImg)">
            <CardComponent
              class="card"
              :model="sampleCards.richard"
              :image-u-r-l="sampleCards.richard.cardImg"
            />
          </div>
        </div>
        <div>
          <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
            <CardComponent
              class="card"
              :model="sampleCards.saintDaisy_pet"
              :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
            />
          </div>
          <img
            class="image_arrow rot90"
            src="../assets/arrows/arrow_up.png"
          >
          <div @click="highlight(sampleCards.richard, sampleCards.richard.cardImg)">
            <CardComponent
              class="card"
              :model="sampleCards.richard"
              :image-u-r-l="sampleCards.richard.cardImg"
            />
          </div>
        </div>
        <div>
          <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
            <CardComponent
              class="card"
              :model="sampleCards.saintDaisy_pet"
              :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
            />
          </div>
          <img
            class="image_arrow rot90"
            src="../assets/arrows/arrow_up.png"
          >
          <div @click="highlight(sampleCards.hurrwig, sampleCards.hurrwig.cardImg)">
            <CardComponent
              class="card"
              :model="sampleCards.hurrwig"
              :image-u-r-l="sampleCards.hurrwig.cardImg"
            />
          </div>
        </div>
        <div>
          <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
            <CardComponent
              class="card"
              :model="sampleCards.saintDaisy_pet"
              :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
            />
          </div>
          <img
            class="image_arrow rot90"
            src="../assets/arrows/arrow_up.png"
          >
          <div @click="highlight(sampleCards.automatedBotProduction_bot, sampleCards.automatedBotProduction_bot.cardImg)">
            <CardComponent
              class="card"
              :model="sampleCards.automatedBotProduction_bot"
              :image-u-r-l="sampleCards.automatedBotProduction_bot.cardImg"
            />
          </div>
        </div>
        <div>
          <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
            <CardComponent
              class="card"
              :model="sampleCards.saintDaisy_pet"
              :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
            />
          </div>
          <img
            class="image_arrow rot90"
            src="../assets/arrows/arrow_up.png"
          >
          <div @click="highlight(sampleCards.assoultHorse, sampleCards.assoultHorse.cardImg)">
            <CardComponent
              class="card"
              :model="sampleCards.assoultHorse"
              :image-u-r-l="sampleCards.assoultHorse.cardImg"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- PAGE 2 -->
    <br>

    <div class="about-flex-wrap">
      <div class="about-text">
        Dr. Dolly's ability was triggered in the Combat: "Whenever a Entity dies, gain 1 Mana" the effect goes into the Own Queue of player 1 and is then processed at the beginning of the next tick, so he then gets 5 resources.
        <br><br>
        The fight is over, the damage points have been calculated and all triggered effects have been collected.
        Player 1 has only Dr. Dolly left on board. In contrast to Player 2, who still has Richard, Bot Commander, Hurrwig Bot Manufacturer, Bot Token, Assoult Horse and the Places Steam rocessor and Automated Bot Production.
      </div>
      <div class="about-card">
        <div @click="highlight(sampleCards.drDolly, sampleCards.drDolly.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.drDolly"
            :image-u-r-l="sampleCards.drDolly.cardImg"
          />
        </div>
      </div>
    </div>
    
      
    <div class="content-border-white">
      <!-- 5th box -->
      <b id="player-num-text">Player 2</b>
      <p id="attack-mode-text">
        Attack mode
      </p>
      <div class="card-container">
        <div @click="highlight(sampleCards.richard, sampleCards.richard.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.richard"
            :image-u-r-l="sampleCards.richard.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.hurrwig, sampleCards.hurrwig.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.hurrwig"
            :image-u-r-l="sampleCards.hurrwig.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.automatedBotProduction_bot, sampleCards.automatedBotProduction_bot.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.automatedBotProduction_bot"
            :image-u-r-l="sampleCards.automatedBotProduction_bot.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.assoultHorse, sampleCards.assoultHorse.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.assoultHorse"
            :image-u-r-l="sampleCards.assoultHorse.cardImg"
          />
        </div>
      </div>
      <span id="defense-mode-text">Defense mode</span>
      <span
        id="defense-mode-text"
        style="margin-left:30%;"
      >Places</span>
      <div class="card-container">
        <div @click="highlight(sampleCards.ulrich, sampleCards.ulrich.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.ulrich"
            :image-u-r-l="sampleCards.ulrich.cardImg"
          />
        </div>
        <span /><!-- Empty space in grid -->
        <div @click="highlight(sampleCards.steam, sampleCards.steam.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.steam"
            :image-u-r-l="sampleCards.steam.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.automatedBotProduction, sampleCards.automatedBotProduction.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.automatedBotProduction"
            :image-u-r-l="sampleCards.automatedBotProduction.cardImg"
          />
        </div>
      </div>
    </div>
    <p>
      <br>
      The fight is over, the damage points have been calculated and all triggered effects have been collected. This tick is finished and the next round begins.
    </p>

    <h2 style="text-align:center;">
      Example of a round
    </h2> <!-- !!!Example of a round!!! -->
    <div class="about-flex-wrap">
      <div class="about-text">
        In order to illustrate the course of a round, the following example shows how a round, divided into its different phases, progresses.
        <br><br>
        For this example, we are already in the middle of the game in turn 10.
        Player 1 plays the Dr. Dolly Deck and Player 2 plays the Blasturn, the Capital Deck.
        <br><br>
      </div>
      <div class="about-card">
        <div @click="highlight(sampleCards.drDolly, sampleCards.drDolly.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.drDolly"
            :image-u-r-l="sampleCards.drDolly.cardImg"
          />
        </div>
      </div>
    </div>
    <p>
      player 1 has the following cards in play:
      <br><br>
      Dr. Dolly and Bello, Man's Best Friend, which are in attack mode, as well as Wynn, the Brainless Baby and Furious Jack, which are in defense mode.
    </p>
    <div class="content-border-white">
      <!--6th box-->
      <span id="defense-mode-text">Attack mode</span>
      <span
        id="defense-mode-text"
        style="margin-left:50%;"
      >Defense mode</span>
      <div class="card-container">
        <div @click="highlight(sampleCards.drDolly, sampleCards.drDolly.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.drDolly"
            :image-u-r-l="sampleCards.drDolly.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.bello, sampleCards.bello.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.bello"
            :image-u-r-l="sampleCards.bello.cardImg"
          />
        </div>
        <div />
        <div @click="highlight(sampleCards.furiousJack, sampleCards.furiousJack.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.furiousJack"
            :image-u-r-l="sampleCards.furiousJack.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.wynn, sampleCards.wynn.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.wynn"
            :image-u-r-l="sampleCards.wynn.cardImg"
          />
        </div>
      </div>
    </div>
    <p>
      <br>
      Player 2 has the following entities on the board in attack mode:

      Richard, Bot Commander, Hurrwig, Bot Manufacturer, a bot produced by the Place Automated Bot Production and the Place Steam Processor.
    </p>
    <div class="content-border-white">
      <!--7th box-->
      <p>
        <b id="player-num-text">Player 2</b>
      </p>
      <span id="defense-mode-text">Attack mode</span>
      <span
        id="defense-mode-text"
        style="margin-left:50%;"
      >Places</span>
      <div class="card-container">
        <div @click="highlight(sampleCards.richard, sampleCards.richard.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.richard"
            :image-u-r-l="sampleCards.richard.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.hurrwig, sampleCards.hurrwig.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.hurrwig"
            :image-u-r-l="sampleCards.hurrwig.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.automatedBotProduction_bot, sampleCards.automatedBotProduction_bot.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.automatedBotProduction_bot"
            :image-u-r-l="sampleCards.automatedBotProduction_bot.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.automatedBotProduction, sampleCards.automatedBotProduction.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.automatedBotProduction"
            :image-u-r-l="sampleCards.automatedBotProduction.cardImg"
          />
        </div>
        <div @click="highlight(sampleCards.steam, sampleCards.steam.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.steam"
            :image-u-r-l="sampleCards.steam.cardImg"
          />
        </div>
      </div>
    </div>

    <br>
    <h1 style="text-align:center">
      Start of turn 10:
    </h1>
    <h2>1. Planning Phase</h2>
    <p>
      At the beginning of the round, the abilities affecting the player himself and his cards are executed first. the Growth level of the headquarters increases by +1 and thus both players recieve 10 resources. In addition, both HQs produce 10 wisdom, which is converted to drawing 1 card.
      <br><br>
      Dr. Dolly's Headquarters ability is used by paying 3 resources to produce an additional 10 wisdom. In addition, Bello, Man's Best Friend and Wynn, the Brainless baby are on the board, producing an additional 15 wisodm through Dr. Dolly's presence. This gives player 1 a total of 25 wisdom, which allows him to draw two additional cards with 5 wisdom left over. Wynn, the Brainless is also buffed by +1/+1 because Dr. Dolly is on the field and now has 2 attack and 2 health points.
      <br><br>
      Player 2's Steam Processor produces 6 Energy, which is then used for its ability to gain 10 Wisdom, so player 2 can now draw an additional card. Their 2nd place Automated Bot Production produces another 1/1 Bot. In combination with Hurrwig, Bot Manufacturer, the following ability is now triggered: "Whenever an entity with Tag "Bot" enters the battlefield, you may deal 2 damage to target entity". Since this ability affects the enemy, the effect is delayed and placed in the enemy queue.
    </p>
    <h2>2. Card playing phase</h2>

    <div class="about-flex-wrap">
      <div class="about-text">
        Since the ability affects your own cards, it can be used immediately, so Dr.Dolly is addionally buffed by 2/2. Saint Daisy's ability: "ETB Create a 1/1 Pet for each Human you control" is activated and 5 Pets with 1/1 stats are summoned.  
      </div> 
      <div class="about-card">
        <div @click="highlight(sampleCards.evie, sampleCards.evie.cardImg)">
          <CardComponent
            class="card"
            :model="sampleCards.evie"
            :image-u-r-l="sampleCards.evie.cardImg"
          />
        </div>
      </div>
    </div>

    <div class="card-container">
      <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
        <CardComponent
          class="card"
          :model="sampleCards.saintDaisy_pet"
          :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
        />
      </div>
      <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
        <CardComponent
          class="card"
          :model="sampleCards.saintDaisy_pet"
          :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
        />
      </div>
      <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
        <CardComponent
          class="card"
          :model="sampleCards.saintDaisy_pet"
          :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
        />
      </div>
      <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
        <CardComponent
          class="card"
          :model="sampleCards.saintDaisy_pet"
          :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
        />
      </div>
      <div @click="highlight(sampleCards.saintDaisy_pet, sampleCards.saintDaisy_pet.cardImg)">
        <CardComponent
          class="card"
          :model="sampleCards.saintDaisy_pet"
          :image-u-r-l="sampleCards.saintDaisy_pet.cardImg"
        />
      </div>
    </div>

    <div
      class="about-flex-wrap"
      style="padding-top:15px"
    >
      <div class="about-text">
        <br>
        Player 2 plays the following entities - Assoult Horse, Ulrich the Tinker and Provide Exoskeleton. This affects their own cards and can be applied immediately to Richard, Bot Commander, who now has the stats 5/8.
      </div>
      <div @click="highlight(sampleCards.exoskeleton, sampleCards.exoskeleton.cardImg)">
        <CardComponent
          class="card"
          :model="sampleCards.exoskeleton"
          :image-u-r-l="sampleCards.exoskeleton.cardImg"
        />
      </div>
    </div>

    <h2>3. Resolve Phase</h2>
    <p>
      The played cards are now revealed. The effects that affect your own cards have already been executed in phase 2. Now the ones that are in the enemy queue are resolved. The triggered ability of Hurrwig, Bot Manufacturer is in the queue 2 times. Once it was activated at the end of the combat phase of tick 9 and now in the planning phase in this tick. Now it deals 2 damage to Wynn, the Brainless and 2 damage to Furious jack, both of which end up on the Graveyard.
      <br><br>
      This activates Dr.Dolly's ability "Whenever an entity dies, gain 1 Mana" which is put into the queue for the next resolve phase.
    </p>
    <!-- This is the highlight card area, it does not really appear at the bottom, but over everything else-->
    <div
      v-if="isCardHighlighted"
      class="highlight-area"
      @click="closeHighlightedCard"
    >
      <CardComponent
        class="highlighted-card"
        :model="highlightedCard.model"
        :image-u-r-l="highlightedCard.img"
        hover-behavior="none"
      />
    </div>
  </div>
</template>


<script>
import CardComponent from "../components/CardComponent";

import {
  sampleCards,
} from "../components/utils/sampleCards.js";

export default {
  name: "HowToPlayPage",
  components: { CardComponent },
  data() {
    return {
      symbolScale: 5,
      sampleCards: sampleCards,
      highlightedCard: {
        model: {},
        img: {},
      },
      isCardHighlighted: false,
    };
  },
  mounted() {},
  methods: {
    closeHighlightedCard() {
      this.isCardHighlighted = false;
    },
    highlight(model, image) {
      this.isCardHighlighted = true;
      this.highlightedCard = {
        model: model,
        img: image,
      };
    },
  },
};
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
  margin-bottom: $font-size * 4;
}

h2 {
  font-size: 1.75rem;
}

.marked-text {
  color: #fff;
  text-shadow: 1px 0 0 #888888, 0 -1px 0 #888888, 0 1px 0 #888888,
    -1px 0 0 #888888;
}

img {
  float: right;
  width: 30%;
}

.content-border-white {
  width: auto;
  border: 5px solid white;
  padding: 20px;
  padding-top: 0px;
}
// .card-container {
//   display: grid;
//   align-self: left;
//   grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
// }
.card {
  max-width: 240px;
}
// .card:hover {
//   width:200%;
//   z-index:9999;
// }
.card-container {
  display: grid;
  align-self: center;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2px;
}
.image_arrow {
  padding-top: 40%;
  min-width: 100%;
  min-height: 20%;
}
.rot90 {
  transform: rotate(280deg);
  -ms-transform: rotate(280deg);
  -moz-transform: rotate(280deg);
  -webkit-transform: rotate(280deg);
  -o-transform: rotate(280deg);
  width: 100%;
  //padding-left:10%;
}

#defense-mode-text {
  font-size: 1.25rem;
  margin: -10px;
  margin-top: 5px;
}
#attack-mode-text {
  text-align: center;
  font-size: 1.25rem;
  margin: -10px;
  margin-bottom: 5px;
}
#player-num-text {
  font-size: 1.5rem;
  margin: -5px;
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
.highlighted-card {
  margin: auto;
  margin-top: 2vh;
  max-width: 95vw;
  max-height: 95vh;
}

.highlight-area {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}


</style>