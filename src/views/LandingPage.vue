<template>
  <div>
    <div class="relative">
      <img
        alt="langing bg image"
        :src="landingBackground"
        class="w-full object-cover h-[40rem] 2xl:h-[44rem]"
      >
      <div class="absolute top-20 m-auto left-0 right-0">
        <div class="flex text-center justify-center z-10">
          <div class="w-5/6 md:w-3/6">
            <img
              :src="logoBig"
              alt="big cc logo"
              class="w-full drop-shadow-header"
            >
            <p class="text-4xl text-white font-bold py-6">
              A collectible card game made by players.
            </p>
            <br>
            <RouterCCButton
              class="pb-4"
              to="/cardCreator"
              :type="Color.YELLOW"
            >
              CREATE CARDS
            </RouterCCButton>
            <RouterCCButton
              :type="Color.BLACK"
              to="/download"
            >
              Play the game
            </RouterCCButton>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-black w-full flex flex-wrap gap-x-4 justify-evenly">
      <img
        v-for="logo in [icfLogo, gonftLogo, hackatomLogo, coinliveLogo]"
        alt="company logo"
        class="object-contain h-20 my-10"
        :src="logo"
      >
    </div>
    <div
      class="bg-center bg-cover bg-[url('@/assets/figma/pixelart.png')] pt-10 sm:pt-32"
    >
      <div
        class="max-w-[70rem] flex flex-row flex-wrap justify-evenly px-8 py-10 bg-cc-yellow/75 b-10 mb-32 xl:mx-auto mx-10"
      >
        <div class="place-self-center pr-4">
          <p class="text-5xl font-bold pb-6">
            New Sets and Boosters
          </p>
          <p class="text-2xl pb-6">
            Promoted Sets and Boosters
          </p>
          <RouterCCButton
            class="pb-4"
            to="/b"
            :type="Color.BLACK"
          >
            Buy Boosters
          </RouterCCButton>
          <RouterCCButton
            to="/gallery"
            :type="Color.BLACK"
          >
            Visit Gallery
          </RouterCCButton>
        </div>
        <div>
          <img
            class="h-[20rem] pl-4 py-8 object-scale-down"
            alt="multiple cards"
            :src="multiCards"
          >
        </div>
      </div>
      <div class="bg-black/90 py-40">
        <div class="flex justify-center">
          <TeaserHeader heading-class="text-cc-red">
            <template #heading>
              Get started now
            </template>
            <template #content>
              <p class="text-white">
                CrowdControl is built on our own blockchain and<br>
                let’s <b>YOU</b> be part of every step of the game.
              </p>
            </template>
          </TeaserHeader>
        </div>
        <div class="flex pt-20 justify-evenly sm:px-32 flex-wrap gap-4">
          <div
            v-for="cardBack in cardBacks"
            class="relative hover:scale-105"
          >
            <router-link :to="{ name: cardBack.route }">
              <img
                alt="cardback"
                :src="cardBack.cardBack"
                class="h-[20rem] drop-shadow-glowRed"
              >
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
      <FadeTeaserBig>
        <HeadingContentComponent heading-class="text-teal-500">
          <template #heading>
            Be part of the game
          </template>
          <template #content>
            <p>Crowd Control is a growing community based on open source and</p>
            <p>collaboration. Learn the game and give us your review.</p>
            <br>
            <LinkCCButton
              :type="Color.TEAL"
              to="https://discord.gg/ZKKbhUs"
            >
              Join Us
            </LinkCCButton>
            <img
              alt="gameboard"
              class="object-contain w-[90%] md:w-[50%] drop-shadow-glowTeal mx-auto pt-20"
              :src="gameBoard"
            >
          </template>
        </HeadingContentComponent>
      </FadeTeaserBig>
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
import { Color } from "@/components/utils/color";
import LinkCCButton from "@/components/elements/CCButton/LinkCCButton.vue";
import RouterCCButton from "@/components/elements/CCButton/RouterCCButton.vue";
import HeadingContentComponent from "@/components/elements/Teaser/TeaserHeader.vue";
import FadeTeaserBig from "@/components/elements/Teaser/FadeTeaserBig.vue";
import TeaserHeader from "@/components/elements/Teaser/TeaserHeader.vue";

type CardBack = {
  cardBack: string;
  heading: string;
  text: string;
  route?: string;
};

const cardBacks: CardBack[] = [
  {
    cardBack: cardBack1,
    heading: "CREATE",
    text: "Assets, Games, Worlds",
    route: "CardCreator",
  },
  {
    cardBack: cardBack2,
    heading: "PLAY",
    text: "Games, Characters, Stories",
    route: "Download",
  },
  { cardBack: cardBack3, heading: "VOTE", text: "Balance, Decide, Govern" },
  { cardBack: cardBack4, heading: "OWN", text: "Earn, Collect, Trade" },
];
</script>
