<template>
  <div>
    <div class="relative">
      <img
        alt="langing bg image"
        :src="landingBackground"
        class="w-[100%] object-cover h-[40rem] 2xl:h-[44rem]"
      />
      <div class="absolute top-20 m-auto left-0 right-0">
        <div class="flex text-center justify-center z-10">
          <div class="w-5/6 md:w-3/6">
            <img
              :src="logoBig"
              alt="big cc logo"
              class="w-[100%] drop-shadow-header"
            />
            <p class="text-4xl text-white font-bold py-6">
              A collectible card game made by players.
            </p>
            <br />
            <RouterCCButton
              class="pb-4"
              to="/cardCreator"
              :type="ButtonType.YELLOW"
            >
              CREATE CARDS
            </RouterCCButton>
            <RouterCCButton :type="ButtonType.BLACK" to="/play">
              Play the game
            </RouterCCButton>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-black w-[100%] flex flex-wrap gap-x-4 justify-evenly">
      <img
        v-for="logo in [icfLogo, gonftLogo, hackatomLogo, coinliveLogo]"
        alt="company logo"
        class="object-contain h-20 my-10"
        :src="logo"
      />
    </div>
    <div
      class="bg-center bg-cover bg-[url('@/assets/figma/Car.jpeg')] pt-10 sm:pt-32"
    >
      <div
        class="max-w-[70rem] flex flex-row flex-wrap justify-evenly px-8 py-10 bg-cc-yellow/75 b-10 mb-32 xl:mx-auto mx-10"
      >
        <div class="place-self-center pr-4">
          <p class="text-5xl font-bold pb-6">New Sets and Boosters</p>
          <p class="text-2xl pb-6">Promoted Sets and Boosters</p>
          <RouterCCButton class="pb-4" to="/b" :type="ButtonType.BLACK">
            Buy Boosters
          </RouterCCButton>
          <RouterCCButton to="/gallery" :type="ButtonType.BLACK">
            Visit Gallery
          </RouterCCButton>
        </div>
        <div>
          <img
            class="h-[20rem] pl-4 py-8 object-scale-down"
            alt="multiple cards"
            :src="multiCards"
          />
        </div>
      </div>
      <div class="bg-black/90 py-40">
        <div class="flex justify-center">
          <div class="text-center">
            <p class="text-5xl text-red-500 font-bold">Get started now</p>
            <div class="text-white text-2xl pt-4">
              <p>CrowdControl is built on Cosmos Blockchain and</p>
              <p>let’s <b>YOU</b> be part of every step of the game.</p>
            </div>
          </div>
        </div>
        <div class="flex pt-20 justify-evenly sm:px-32 flex-wrap gap-4">
                   
          <div 
            v-for="cardBack in cardBacks" 
            class="relative hover:scale-105"
            @click="router.push('/cardCreator')"
          >
            <router-link
              :to="{ name: cardBack.route}"
            >
              <img
                alt="cardback"
                :src="cardBack.cardBack"
                class="h-[20rem] drop-shadow-glowRed"
              />
            </router-link>
            <div class="absolute top-52 left-0 right-0 text-center">
              <p class="text-3xl font-bold">
                {{ cardBack.heading }}
              </p>
              <p class="text-sm">
                {{ cardBack.text }}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="h-[55rem] xl:h-[60rem] overflow-clip">
      <FadeTeaser>
        <div class="absolute top-20 left-0 right-0">
          <div class="flex flex-col text-center">
            <p class="text-5xl text-teal-500 font-bold">Be part of the game</p>
            <div class="text-black text-2xl pt-4 px-16">
              <p>Crowd Control is a growing community based on open source and</p>
              <p>collaboration. Learn the game and give us your review.</p>
            </div>
            <br />
            <LinkCCButton
              class="pt-6"
             :type="ButtonType.TEAL" to="https://discord.gg/ZKKbhUs">
              Join Us
            </LinkCCButton>
            <img
              class="object-contain w-[90%] md:w-[50%] drop-shadow-glowTeal mx-auto pt-20"
              alt="gameboard"
              :src="gameBoard"
            />
          </div>
        </div>
      </FadeTeaser>
    </div>
  </div>
</template>

<script setup lang="ts">
import gameBoard from "@/assets/figma/GameBoard.png";
import cardBack1 from "@/assets/figma/Cardbacks/1.png";
import cardBack2 from "@/assets/figma/Cardbacks/2.png";
import cardBack3 from "@/assets/figma/Cardbacks/3.png";
import cardBack4 from "@/assets/figma/Cardbacks/4.png";
import multiCards from "@/assets/figma/Multicards.png";
import logoBig from "@/assets/figma/LogoBig.png";
import icfLogo from "@/assets/figma/PresentationLogos/ICF.png";
import gonftLogo from "@/assets/figma/PresentationLogos/GoNFTs.png";
import coinliveLogo from "@/assets/figma/PresentationLogos/coinlive.png";
import hackatomLogo from "@/assets/figma/PresentationLogos/hackatom.png";
import landingBackground from "@/assets/figma/LandingPageBackground/LandingBackground-thicc.jpeg";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";
import FadeTeaser from "@/components/elements/FadeTeaser.vue";
import LinkCCButton from "@/components/elements/CCButton/LinkCCButton.vue";
import RouterCCButton from "@/components/elements/CCButton/RouterCCButton.vue";

type CardBack = {
  cardBack: string;
  heading: string;
  text: string;
};

const cardBacks: CardBack[] = [
  { cardBack: cardBack1, heading: "CREATE", text: "Assets, Games, Worlds", route: "CardCreator" },
  { cardBack: cardBack2, heading: "PLAY", text: "Games, Characters, Stories", route: "Play" },
  { cardBack: cardBack3, heading: "VOTE", text: "Balance, Decide, Govern" },
  { cardBack: cardBack4, heading: "OWN", text: "Earn, Collect, Trade" },
];
</script>
