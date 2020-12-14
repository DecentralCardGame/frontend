<template>
  <div class="article-temp width-temp">
    <div class="hero">
      <h1>How To Play</h1>
      <p class="text--big">Here you can read how to play this game - written by noobs for noobs.</p>
      
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
    <img src="../assets/Energy.svg" /> Iron Lumber Food Mana
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
    
        <img src="../assets/Dr.Dolly.png" />
        <h2>Your Headquaters</h2>
        Your Headquarters shows you which resources you can use, they are displayed on the top right of your card (
        <span class="red-colored-text">1</span>
        ).
        Every Headquarters has special abilities for example Dr. Dolly´s Headquarters starts with Dr. Dolly in your hand and you can get 10 wisdom for 3 resources (
        <span class="red-colored-text">2</span>
        ).
        You also have to always be aware of the life points of your headquarters which are on the botom right of the card (
        <span class="red-colored-text">3</span>
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
        <img src="../assets/HQ_Dolly.png" />
        <h2>Entities (Creatures)</h2>
        Entities fight for you on the battleground. The number on the top left tells you how many resources you need to put them there (
        <span class="red-colored-text">1</span>
        ).
        They stay on the battlefield until they lose their life points. The life points tell you how much damage is needed to destroy them (
        <span class="red-colored-text">2</span>
        ), while the attack value indicates the damage they cause (
        <span class="red-colored-text">3</span>
        ).
        Entities inflict damage on each other during the battle phase. An entity can defend or attack, but it cannot attack on the turn it entered the game. Entities can have abilities which trigger effects. They are displayed on the textbox (
        <span class="red-colored-text">4</span>
        ).
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="about about--card-right">
      <div>
        <h2>Places</h2>
        Places are also permanent cards. They have only a life value and disappear from play as soon as it reaches 0. Places have different abilities, typical abilities are those that create additional entities or produce additional resources or wisdom.
      </div>
        <CardComponent
            class="about__preview"
            :model="cards[4]"
            :image-u-r-l="cardImgs[4]"
        />
    </div>
    <div class="about about--card-right">
      <div>
        <h2>Actions</h2>
        Action cards, unlike all other card types, do not have abilities but effects. Effects have a direct effect on the game when the action is played. After that, actions land on the Dust Pile.
      </div>
        <CardComponent
            class="about__preview"
            :model="cards[0]"
            :image-u-r-l="cardImgs[0]"
        />
    </div>  
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


  <!-- energy icon -->
  <svg>
    <g
      :opacity="1"
      transform="matrix(0.928122,0,0,0.780528,14.3377,2.27483)"
    >
      <g
        id="Ebene3"
      >
        <path
          d="M42.019,14.712L47.785,7.706L44.718,7.703L45.87,2.928L40.585,9.063L43.871,9.063L42.019,14.712Z"
          style="fill:rgb(255,204,0);"
        />
        <path
          d="M42.295,10.344L40.585,10.344C40.147,10.344 39.753,10.028 39.587,9.546C39.422,9.063 39.519,8.51 39.833,8.146L45.117,2.012C45.467,1.606 46.003,1.53 46.423,1.828C46.842,2.126 47.041,2.723 46.906,3.282L46.148,6.423L47.786,6.424C48.219,6.425 48.611,6.734 48.779,7.209C48.947,7.685 48.859,8.233 48.555,8.602L42.789,15.608C42.431,16.043 41.865,16.119 41.435,15.789C41.005,15.459 40.83,14.814 41.016,14.247L42.295,10.344ZM40.585,9.063L43.871,9.063L42.019,14.712L47.785,7.706L44.718,7.703L45.87,2.928L40.585,9.063Z"
          style="fill:rgb(102,102,102);"
        />
      </g>
      <g
        id="Ebene3"
        opacity="0.2"
      >
        <path
          d="M42.019,14.712L47.785,7.706L44.718,7.703L45.87,2.928L40.585,9.063L43.871,9.063L42.019,14.712Z"
          style="fill:rgb(204,204,204);"
        />
        <path
          d="M42.295,10.344L40.585,10.344C40.147,10.344 39.753,10.028 39.587,9.546C39.422,9.063 39.519,8.51 39.833,8.146L45.117,2.012C45.467,1.606 46.003,1.53 46.423,1.828C46.842,2.126 47.041,2.723 46.906,3.282L46.148,6.423L47.786,6.424C48.219,6.425 48.611,6.734 48.779,7.209C48.947,7.685 48.859,8.233 48.555,8.602L42.789,15.608C42.431,16.043 41.865,16.119 41.435,15.789C41.005,15.459 40.83,14.814 41.016,14.247L42.295,10.344ZM40.585,9.063L43.871,9.063L42.019,14.712L47.785,7.706L44.718,7.703L45.87,2.928L40.585,9.063Z"
          style="fill:rgb(102,102,102);"
        />
      </g>
    </g>
    <!-- food icon -->
    <g
      :opacity="1"
      transform="matrix(0.900887,0,0,0.900887,109.698,4.15101)"
    >
      <g
        id="Ebene_1-2-5"
      >
        <g transform="matrix(1.06878,0,0,1.06878,-116.112,-4.60135)">
          <g id="Ebene_2">
            <path
              d="M114.844,7.459L116.294,8.859L115.844,11.805L114.394,13.316L111.843,13.197L110.319,11.463L110.623,9.259L111.738,7.859L114.844,7.459Z"
              style="fill:rgb(255,153,102);"
            />
            <path
              d="M115.566,6.712C115.339,6.493 115.025,6.389 114.712,6.429L111.606,6.829C111.338,6.864 111.094,7.001 110.926,7.212L109.811,8.612C109.695,8.758 109.62,8.933 109.595,9.117L109.29,11.321C109.249,11.62 109.339,11.922 109.539,12.148L111.063,13.883C111.25,14.095 111.514,14.222 111.795,14.235L114.346,14.353C114.645,14.367 114.936,14.251 115.144,14.035L116.594,12.525C116.742,12.37 116.839,12.174 116.871,11.962L117.321,9.016C117.372,8.683 117.258,8.346 117.016,8.112L115.566,6.712ZM114.844,7.459L116.294,8.859L115.844,11.805L114.394,13.316L111.843,13.197L110.319,11.463L110.623,9.259L111.738,7.859L114.844,7.459Z"
              style="fill:rgb(96,96,106);"
            />
          </g>
        </g>
        <g
          id="polyline869"
          transform="matrix(1,0,0,1,-1.4296,1.27398)"
        >
          <path
            d="M11.7,1.5L10.2,1.5L10.2,0"
            style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:round;"
          />
        </g>
        <g
          id="line871"
          transform="matrix(0.935484,0,0,0.933333,-0.958627,1.56064)"
        >
          <path
            d="M7.3,4.3L10.4,1.3"
            style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1.07px;stroke-linecap:round;"
          />
        </g>
      </g>
      <g
        id="Ebene_1-2-5"
        opacity="0.2"
      >
        <g transform="matrix(1.06878,0,0,1.06878,-116.112,-4.60135)">
          <g id="Ebene_2">
            <path
              d="M114.844,7.459L116.294,8.859L115.844,11.805L114.394,13.316L111.843,13.197L110.319,11.463L110.623,9.259L111.738,7.859L114.844,7.459Z"
              style="fill:rgb(204,204,204);"
            />
            <path
              d="M115.566,6.712C115.339,6.493 115.025,6.389 114.712,6.429L111.606,6.829C111.338,6.864 111.094,7.001 110.926,7.212L109.811,8.612C109.695,8.758 109.62,8.933 109.595,9.117L109.29,11.321C109.249,11.62 109.339,11.922 109.539,12.148L111.063,13.883C111.25,14.095 111.514,14.222 111.795,14.235L114.346,14.353C114.645,14.367 114.936,14.251 115.144,14.035L116.594,12.525C116.742,12.37 116.839,12.174 116.871,11.962L117.321,9.016C117.372,8.683 117.258,8.346 117.016,8.112L115.566,6.712ZM114.844,7.459L116.294,8.859L115.844,11.805L114.394,13.316L111.843,13.197L110.319,11.463L110.623,9.259L111.738,7.859L114.844,7.459Z"
              style="fill:rgb(96,96,106);"
            />
          </g>
        </g>
        <g
          id="polyline869"
          transform="matrix(1,0,0,1,-1.4296,1.27398)"
        >
          <path
            d="M11.7,1.5L10.2,1.5L10.2,0"
            style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;"
          />
        </g>
        <g
          id="line871"
          transform="matrix(0.935484,0,0,0.933333,-0.958627,1.56064)"
        >
          <path
            d="M7.3,4.3L10.4,1.3"
            style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1.07px;"
          />
        </g>
      </g>
    </g>
    <!-- iron icon -->
    <g
      :opacity="1"
      transform="matrix(0.601191,0,0,0.601191,29.7156,4.26699)"
    >
      <g id="Ebene7">
        <path
          d="M74.009,5.549C73.996,5.462 81.671,5.602 82.108,5.555C82.222,5.543 82.25,5.854 82.231,6.075C82.213,6.289 78.55,6.437 78.471,9.246C78.399,11.801 80.664,11.367 80.682,11.484C80.739,11.859 80.705,12.622 80.705,12.622L72.318,12.628L72.312,11.525C72.312,11.525 75.375,11.165 75.274,9.564C75.216,8.638 72.97,8.227 72.009,7.652C70.868,6.969 68.878,5.791 69.62,5.747C70.957,5.666 74.131,6.361 74.009,5.549Z"
          style="fill:rgb(153,204,204);"
        />
        <path
          d="M72.932,4.273C73.001,4.218 73.078,4.165 73.164,4.115C73.225,4.078 73.559,3.887 74.166,3.867C75.384,3.826 81.543,3.943 81.931,3.901C82.513,3.839 83.047,4.024 83.463,4.541C83.689,4.822 83.942,5.602 83.888,6.22C83.859,6.549 83.697,7.365 82.655,7.716C82.425,7.794 81.836,7.891 81.209,8.14C80.748,8.323 80.154,8.589 80.134,9.293C80.129,9.455 80.166,9.655 80.182,9.734C80.298,9.749 80.699,9.799 80.78,9.807C82.017,9.932 82.274,10.89 82.326,11.234C82.392,11.667 82.375,12.502 82.368,12.665C82.368,12.681 82.367,12.689 82.367,12.689C82.331,13.581 81.599,14.285 80.706,14.286L72.319,14.292C71.404,14.293 70.66,13.553 70.655,12.638L70.649,11.535C70.644,10.768 71.164,10.098 71.908,9.912C71.908,9.912 72.26,9.877 72.703,9.761C72.119,9.536 71.547,9.314 71.155,9.079C70.351,8.598 69.171,7.883 68.634,7.425C68.277,7.12 68.072,6.82 67.975,6.617C67.689,6.021 67.769,5.506 67.958,5.103C68.142,4.711 68.528,4.146 69.52,4.086C70.215,4.044 71.37,4.184 72.367,4.255C72.54,4.268 72.754,4.272 72.932,4.273ZM75.665,5.387L75.672,5.471L75.675,5.522C77.955,5.529 81.802,5.588 82.108,5.555C82.222,5.543 82.25,5.854 82.231,6.075C82.213,6.289 78.55,6.437 78.471,9.246C78.399,11.801 80.664,11.367 80.682,11.484C80.739,11.859 80.705,12.622 80.705,12.622L72.318,12.628L72.312,11.525C72.312,11.525 75.375,11.165 75.274,9.564C75.216,8.638 72.97,8.227 72.009,7.652C70.868,6.969 68.878,5.791 69.62,5.747C70.957,5.666 74.131,6.361 74.009,5.549C74.005,5.523 74.696,5.517 75.676,5.522L75.672,5.453L75.664,5.376C75.66,5.351 75.657,5.327 75.654,5.302L75.665,5.387ZM82.214,7.212L82.241,7.212C82.256,7.211 82.271,7.21 82.286,7.209L82.214,7.212Z"
          style="fill:rgb(96,96,106);"
        />
      </g>
    </g>
    <g
      opacity="0.2"
      transform="matrix(0.601191,0,0,0.601191,29.7156,4.26699)"
    >
      <g
        id="Icons-Spacing-Grey"
        serif:id="Icons Spacing Grey"
      >
        <path
          d="M74.009,5.549C73.996,5.462 81.671,5.602 82.108,5.555C82.222,5.543 82.25,5.854 82.231,6.075C82.213,6.289 78.55,6.437 78.471,9.246C78.399,11.801 80.664,11.367 80.682,11.484C80.739,11.859 80.705,12.622 80.705,12.622L72.318,12.628L72.312,11.525C72.312,11.525 75.375,11.165 75.274,9.564C75.216,8.638 72.97,8.227 72.009,7.652C70.868,6.969 68.878,5.791 69.62,5.747C70.957,5.666 74.131,6.361 74.009,5.549Z"
          style="fill:rgb(204,204,204);"
        />
        <path
          d="M72.932,4.273C73.001,4.218 73.078,4.165 73.164,4.115C73.225,4.078 73.559,3.887 74.166,3.867C75.384,3.826 81.543,3.943 81.931,3.901C82.513,3.839 83.047,4.024 83.463,4.541C83.689,4.822 83.942,5.602 83.888,6.22C83.859,6.549 83.697,7.365 82.655,7.716C82.425,7.794 81.836,7.891 81.209,8.14C80.748,8.323 80.154,8.589 80.134,9.293C80.129,9.455 80.166,9.655 80.182,9.734C80.298,9.749 80.699,9.799 80.78,9.807C82.017,9.932 82.274,10.89 82.326,11.234C82.392,11.667 82.375,12.502 82.368,12.665C82.368,12.681 82.367,12.689 82.367,12.689C82.331,13.581 81.599,14.285 80.706,14.286L72.319,14.292C71.404,14.293 70.66,13.553 70.655,12.638L70.649,11.535C70.644,10.768 71.164,10.098 71.908,9.912C71.908,9.912 72.26,9.877 72.703,9.761C72.119,9.536 71.547,9.314 71.155,9.079C70.351,8.598 69.171,7.883 68.634,7.425C68.277,7.12 68.072,6.82 67.975,6.617C67.689,6.021 67.769,5.506 67.958,5.103C68.142,4.711 68.528,4.146 69.52,4.086C70.215,4.044 71.37,4.184 72.367,4.255C72.54,4.268 72.754,4.272 72.932,4.273ZM75.665,5.387L75.672,5.471L75.675,5.522C77.955,5.529 81.802,5.588 82.108,5.555C82.222,5.543 82.25,5.854 82.231,6.075C82.213,6.289 78.55,6.437 78.471,9.246C78.399,11.801 80.664,11.367 80.682,11.484C80.739,11.859 80.705,12.622 80.705,12.622L72.318,12.628L72.312,11.525C72.312,11.525 75.375,11.165 75.274,9.564C75.216,8.638 72.97,8.227 72.009,7.652C70.868,6.969 68.878,5.791 69.62,5.747C70.957,5.666 74.131,6.361 74.009,5.549C74.005,5.523 74.696,5.517 75.676,5.522L75.672,5.453L75.664,5.376C75.66,5.351 75.657,5.327 75.654,5.302L75.665,5.387ZM82.214,7.212L82.241,7.212C82.256,7.211 82.271,7.21 82.286,7.209L82.214,7.212Z"
          style="fill:rgb(96,96,106);"
        />
      </g>
    </g>
    <!-- mana icon -->
    <g
      :opacity="1"
      transform="matrix(1,0,0,1,0.791233,0)"
    >
      <g
        id="_-Eingebettetes-Dokument-"
        serif:id="(Eingebettetes Dokument)"
        transform="matrix(0.992943,0,0,0.989034,134.563,9.12312)"
      >
        <g transform="matrix(1,0,0,1,-5.5,-5.5)">
          <clipPath id="_clip1">
            <rect
              x="0"
              y="0"
              width="11"
              height="11"
            />
          </clipPath>
          <g clip-path="url(#_clip1)">
            <g
              id="Ebene_21"
              serif:id="Ebene_2"
            >
              <g id="Ebene_1-2">
                <path
                  d="M5.5,0.928L7.012,4.08L9.344,5.5L7.071,7.174L5.5,9.464L4.121,6.977L1.788,5.5L4.316,3.856L5.5,0.928Z"
                  style="fill:rgb(204,153,255);"
                />
                <path
                  d="M6,10.5L5,10.5C4.995,8.033 2.967,6.005 0.5,6L0.5,5C2.967,4.995 4.995,2.967 5,0.5L6,0.5C6.005,2.967 8.033,4.995 10.5,5L10.5,6C8.033,6.005 6.005,8.033 6,10.5ZM2.79,5.5C3.989,6.049 4.951,7.011 5.5,8.21C6.049,7.011 7.011,6.049 8.21,5.5C7.011,4.951 6.049,3.989 5.5,2.79C4.951,3.989 3.989,4.951 2.79,5.5Z"
                  style="fill:rgb(96,96,106);fill-rule:nonzero;"
                />
              </g>
              <path
                d="M10.5,5.5L9.698,5.5"
                style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
              />
              <g transform="matrix(1,0,0,1,-9.19823,0)">
                <path
                  d="M10.5,5.5L9.698,5.5"
                  style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
                />
              </g>
              <g transform="matrix(6.12323e-17,1,-1,6.12323e-17,11,-9.19823)">
                <path
                  d="M10.5,5.5L9.698,5.5"
                  style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
                />
              </g>
              <g transform="matrix(6.12323e-17,1,-1,6.12323e-17,11,3.55271e-15)">
                <path
                  d="M10.5,5.5L9.698,5.5"
                  style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
                />
              </g>
            </g>
            <g
              id="Ebene_2"
              opacity="0.2"
            >
              <g id="Ebene_1-2">
                <path
                  d="M5.5,0.928L7.012,4.08L9.344,5.5L7.071,7.174L5.5,9.464L4.121,6.977L1.788,5.5L4.316,3.856L5.5,0.928Z"
                  style="fill:rgb(204,204,204);"
                />
                <path
                  d="M6,10.5L5,10.5C4.995,8.033 2.967,6.005 0.5,6L0.5,5C2.967,4.995 4.995,2.967 5,0.5L6,0.5C6.005,2.967 8.033,4.995 10.5,5L10.5,6C8.033,6.005 6.005,8.033 6,10.5ZM2.79,5.5C3.989,6.049 4.951,7.011 5.5,8.21C6.049,7.011 7.011,6.049 8.21,5.5C7.011,4.951 6.049,3.989 5.5,2.79C4.951,3.989 3.989,4.951 2.79,5.5Z"
                  style="fill:rgb(96,96,106);fill-rule:nonzero;"
                />
              </g>
              <path
                d="M10.5,5.5L9.698,5.5"
                style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;"
              />
              <g transform="matrix(1,0,0,1,-9.19823,0)">
                <path
                  d="M10.5,5.5L9.698,5.5"
                  style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;"
                />
              </g>
              <g transform="matrix(6.12323e-17,1,-1,6.12323e-17,11,-9.19823)">
                <path
                  d="M10.5,5.5L9.698,5.5"
                  style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;"
                />
              </g>
              <g transform="matrix(6.12323e-17,1,-1,6.12323e-17,11,3.55271e-15)">
                <path
                  d="M10.5,5.5L9.698,5.5"
                  style="fill:none;stroke:rgb(96,96,106);stroke-width:1px;"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
    <!-- lumber icon -->
    <g
      transform="matrix(1,0,0,1,0.791233,0)"
    >
      <g transform="matrix(1.02546,0,0,1.02546,94.5416,9.32348)">
        <g transform="matrix(1,0,0,1,-5.5,-5.5)">
          <g
            id="Ebene_22"
            serif:id="Ebene_2"
          >
            <g
              id="Ebene_1-21"
              serif:id="Ebene_1-2"
            >
              <path
                d="M9.5,7.5L5.5,0.5L1.677,7.5L9.5,7.5Z"
                style="fill:rgb(153,204,102);stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
              />
              <path
                d="M5.5,10.33L5.5,5.5"
                style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:2;"
              />
            </g>
            <g
              id="Ebene_1-2"
              opacity="0.2"
            >
              <path
                d="M9.5,7.5L5.5,0.5L1.677,7.5L9.5,7.5Z"
                style="fill:rgb(204,204,204);stroke:rgb(96,96,106);stroke-width:1px;"
              />
              <path
                d="M5.5,10.33L5.5,5.5"
                style="fill:none;fill-rule:nonzero;stroke:rgb(96,96,106);stroke-width:1px;stroke-miterlimit:2;"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
    </svg>

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

.red-colored-text {
  color: $red;
}

img {
  float: right;
  width: 30%
}
</style>
