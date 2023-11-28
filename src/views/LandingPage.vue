<template>
  <div class="relative">
    <img
      alt="langing bg image"
      :src="landingBackground"
      class="w-[100%] object-cover h-[40rem] 2xl:h-[50rem]"
    />
    <div class="absolute top-20 m-auto left-0 right-0">
      <div class="flex text-center justify-center z-10">
        <div class="w-5/6 md:w-3/6">
          <img :src="logoBig" alt="big cc logo" class="w-[100%]" />
          <p class="text-3xl text-white font-bold">
            A trading card game made by players.
          </p>
          <br />
          <BaseCCButton class="pb-4" :type="ButtonType.YELLOW"
            >CREATE CARDS
          </BaseCCButton>
          <BaseCCButton :type="ButtonType.WHITE">Play the game</BaseCCButton>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-black w-[100%] flex flex-wrap gap-x-4 justify-evenly">
    <img
      alt="company logo"
      class="object-contain h-20 my-10"
      :src="logo"
      v-for="logo in [icfLogo, gonftLogo, coinliveLogo, hackatomLogo]"
    />
  </div>
  <div class="relative">
    <img
      alt="langing bg image"
      :src="car"
      class="w-[100%] object-cover h-[120rem]"
    />
    <div class="absolute top-0 left-0 right-0">
      <div
        class="flex gap-4 justify-between flex-wrap px-4 sm:px-16 lg:px-32 py-4 sm:py-10 lg:py-20 bg-[#FEC560]/75 mx-2 sm:mx-20 lg:mx-40 my-10 sm:my-32"
      >
        <div class="justify-self-center">
          <p class="text-6xl font-bold pb-6">New Sets and Boosters</p>
          <p class="text-3xl pb-6">Promoted Sets and Boosters</p>
          <BaseCCButton class="pb-4" :type="ButtonType.BLACK"
            >Buy Boosters
          </BaseCCButton>
          <BaseCCButton :type="ButtonType.BLACK">Visit Gallery</BaseCCButton>
        </div>
        <div>
          <img
            alt="multiple cards"
            class="h-[20rem] object-scale-down"
            :src="multiCards"
          />
        </div>
      </div>
      <div class="bg-black/90 py-4 sm:py-10 lg:py-20">
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
          <div v-for="cardBack in [cardBack1, cardBack2, cardBack3, cardBack4]">
            <img alt="cardback" :src="cardBack" class="h-[20rem] drop-shadow-glow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cardBack1 from "@/assets/figma/Cardbacks/1.png";
import cardBack2 from "@/assets/figma/Cardbacks/2.png";
import cardBack3 from "@/assets/figma/Cardbacks/3.png";
import cardBack4 from "@/assets/figma/Cardbacks/4.png";
import multiCards from "@/assets/figma/Multicards.png";
import car from "@/assets/figma/Car.jpeg";
import logoBig from "@/assets/figma/LogoBig.png";
import icfLogo from "@/assets/figma/PresentationLogos/ICF.png";
import gonftLogo from "@/assets/figma/PresentationLogos/GoNFTs.png";
import coinliveLogo from "@/assets/figma/PresentationLogos/coinlive.png";
import hackatomLogo from "@/assets/figma/PresentationLogos/hackatom.png";
import landingBackground from "@/assets/figma/LandingPageBackground/LandingBackground-thicc.jpeg";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";
</script>
