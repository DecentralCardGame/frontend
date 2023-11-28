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
    <div class="bg-black w-[100%] flex flex-wrap gap-x-4 justify-evenly">
      <img
        alt="company logo"
        class="object-contain h-20 my-10"
        :src="logo"
        v-for="logo in [icfLogo, gonftLogo, coinliveLogo, hackatomLogo]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import logoBig from "@/assets/figma/LogoBig.png";
import icfLogo from "@/assets/figma/PresentationLogos/ICF.png";
import gonftLogo from "@/assets/figma/PresentationLogos/GoNFTs.png";
import coinliveLogo from "@/assets/figma/PresentationLogos/coinlive.png";
import hackatomLogo from "@/assets/figma/PresentationLogos/hackatom.png";
import landingBackground from "@/assets/figma/LandingPageBackground/LandingBackground-thicc.jpeg";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";
</script>
