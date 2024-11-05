<template>
  <div class="article-temp width-temp bg-black">
    <div class="flex flex-col md:grid grid-cols-9 mx-auto text-white">
      <div v-for="(section, index) in sections" :key="index"
        class="flex md:contents"
        :class="{ 'flex-row-reverse': index%2==0 }">
        <!-- left -->
        <div v-if="index%2==0"
          class="bg-red-600 col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md">
          <h3 class="font-semibold text-lg mb-1"> {{ section.title }} </h3>
          <p class="leading-tight text-justify">
            <ul>
              <li v-for="element in section.description" :key="element">
                {{ element }}
              </li>
            </ul>
          </p>
        </div>
        <div v-if="index%2==0"
          class="col-start-5 col-end-6 md:mx-auto relative mr-10">
          <div class="h-full w-6 flex items-center justify-center">
            <div class="h-full w-1 bg-red-600 pointer-events-none"></div>
          </div>
          <div class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-red-600 shadow">
            <div v-if="index==CCmarkerPos"
              class="bg-white h-6 w-6 rounded-full shadow flex items-center justify-center ">
              <img src="/src/assets/figma/CCLogoSmallInvert.png" alt="check">
            </div>
          </div>
        </div>
        <!-- right -->
        <div v-if="index%2==1"
          class="col-start-5 col-end-6 mr-10 md:mx-auto relative">
          <div class="h-full w-6 flex items-center justify-center">
            <div class="h-full w-1 bg-red-600 pointer-events-none"></div>
          </div>
          <div class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-red-600 shadow">
            <div v-if="index==CCmarkerPos"
              class="bg-white h-6 w-6 rounded-full shadow flex items-center justify-center ">
              <img src="/src/assets/figma/CCLogoSmallInvert.png" alt="check">
            </div>
          </div>
        </div>
        <div v-if="index%2==1"
          class="bg-red-600 col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md">
          <h3 class="font-semibold text-lg mb-1">{{ section.title }}</h3>
          <p class="leading-tight text-justify">
            <ul>
              <li v-for="element in section.description" :key="element">
                {{ element }}
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
    <div class="h-12 bg-red-600">
    </div>
  </div>
</template>

<script>
import BulletList from "@/components/elements/BulletList.vue";

export default {
  name: "RoadmapPage",
  components: { BulletList },
  data() {
    return {
      CCmarkerPos: 2,
      sections: [
      {
        title: "2026 - Cambrian Explosion",
        description: [
              "Release of new sets via set election",
              "More games are added and use:",
              " • Automatic balancing.",
              " • User created game items.",
              " • User created maps.",
              " • User created campaigns."]
      },
      {
        title: "2025 - The Crowd is in Control",
        description: [
              "Incentivized Testnet",
              "Mainnet Launch",
              "Game client is taken to the next level",
              "Players can create their own dungeons/adventures.",
              "Players wrap their own stories into campaigns.",
              ]
      },
      {
        title: "2024 - The Revolution unfolds",
        description: [
              'Blockchain-ready game client is playable.',
              'Startup tests for the Mainnet.',
              'The alpha set + starter decks are finalized.',
              'Players have created their own decks.',
              'Public Play Togethers.',
              'More Airdrops to contributors.']
      },
      {
        title: "2023 - The Revolution starts",
        description: [
              "Airdrop to several groups.",
              "Real users test the gameclient.",
              "The alpha set + starter decks."]
      },
      {
        title: "2022 - The Crowd gets angry",
        description: [
              'Cards are created with the Card Creator.',
              'Public testnet goes live.',
              'Manage cards on the blockchain.',
              'Buff/nerf mechanics via blockchain.']
      },
      {
        title: "2021 - First Prototypes",
        description: [
              "The game mechanics are working.",
              "First game prototype in Unity.",
              "Blockchain testnet is working."]
      },
      {
        title: "2020 - Cosmos & Unity Tech",
        description: [
              "We pick and develop with Cosmos tech stack.",
              "This means no fee. Full control over chain.",
              "We pick Unity for the game engine."
        ]
      },
      {
        title: "2019 - The Beginning",
        description: [
              "First concepts are evaluated.",
              "How to prevent users destroying a game?",
              "How can we revolutionize card games"
              ]
      }]
    };
  },
  mounted() {},
};
</script>
