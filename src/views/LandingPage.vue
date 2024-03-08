<template>
  <div>
    <div class="relative">
      <img
        alt="langing bg image"
        :src="landingBackground"
        class="w-[100%] object-cover h-[40rem] 2xl:h-[50rem]"
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
            <RouterCCButton :type="ButtonType.BLACK" to="/p">
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
        class="flex gap-4 justify-between flex-wrap px-4 sm:px-16 lg:px-32 py-4 sm:py-10 lg:py-20 bg-cc-yellow/75 mx-2 sm:mx-20 lg:mx-40 b-10 sm:mb-32 xl:w-[70%] xl:mx-auto"
      >
        <div class="justify-self-center">
          <p class="text-6xl font-bold pb-6">New Sets and Boosters</p>
          <p class="text-3xl pb-6">Promoted Sets and Boosters</p>
          <RouterCCButton class="pb-4" to="/b" :type="ButtonType.BLACK">
            Buy Boosters
          </RouterCCButton>
          <RouterCCButton to="/gallery" :type="ButtonType.BLACK">
            Visit Gallery
          </RouterCCButton>
        </div>
        <div>
          <img
            alt="multiple cards"
            class="h-[20rem] object-scale-down"
            :src="multiCards"
          />
        </div>
      </div>
      <div class="bg-black/90 py-40">
        <div class="flex justify-center">
          <div class="text-center">
            <p class="text-6xl text-red-500 font-bold">Get started now</p>
            <div class="text-white text-3xl pt-4">
              <p>CrowdControl is built on Cosmos Blockchain and</p>
              <p>let’s <b>YOU</b> be part of every step of the game.</p>
            </div>
          </div>
        </div>
        <div class="flex pt-20 justify-evenly sm:px-32 flex-wrap gap-4">
          <div v-for="cardBack in cardBacks" class="relative hover:scale-105">
            <img
              alt="cardback"
              :src="cardBack.cardBack"
              class="h-[20rem] drop-shadow-glowRed"
            />
            <div class="absolute top-52 left-0 right-0 text-center">
              <p class="text-3xl font-bold">
                {{ cardBack.heading }}
              </p>
              <p>{{ cardBack.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FadeTeaser>
      <HeadingContentComponent heading-class="text-teal-500">
        <template v-slot:heading>Be part of the game</template>
        <template v-slot:content>
          <p>Crowd Control is a growing community based on open source and</p>
          <p>collaboration. Learn the game and give us your review.</p>
          <br />
          <LinkCCButton :type="ButtonType.TEAL" to="https://discord.gg/ZKKbhUs">
            Join Us
          </LinkCCButton>
          <img
            alt="gameboard"
            class="object-contain w-[90%] md:w-[50%] drop-shadow-glowTeal mx-auto pt-20"
            :src="gameBoard"
          />
        </template>
      </HeadingContentComponent>
    </FadeTeaser>
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
import FadeTeaser from "@/components/elements/Teaser/FadeTeaser.vue";
import LinkCCButton from "@/components/elements/CCButton/LinkCCButton.vue";
import RouterCCButton from "@/components/elements/CCButton/RouterCCButton.vue";
import HeadingContentComponent from "@/components/elements/Teaser/TeaserHeader.vue";

type CardBack = {
  cardBack: string;
  heading: string;
  text: string;
};

const cardBacks: CardBack[] = [
  { cardBack: cardBack1, heading: "CREATE", text: "Assets, Games, Worlds" },
  { cardBack: cardBack2, heading: "PLAY", text: "Games, Characters, Stories" },
  { cardBack: cardBack3, heading: "VOTE", text: "Balance, Decide, Govern" },
  { cardBack: cardBack4, heading: "OWN", text: "Earn, Collect, Trade" },
];
</script>
