<template>
  <div class="bg-black text-white font-normal font-['Roboto']">

    <div class="p-10 text-center text-base font-bold underline uppercase space-y-2">
      <button @click="scrollup">
        <div class="flex justify-evenly">
          <img :src="triangle" alt="navigation triangle" class="w-3"/>
        </div>
        <div class="flex justify-evenly">
           GO BACK TO TOP
        </div>
       </button>
    </div>

    <div class="p-12 flex flex-wrap flex-row text-white text-base space-x-80 justify-center">

      <div class="flex-row space-y-5">
        <div class="text-3xl font-bold">
          Pages
        </div>
        <div>
          <router-link :to="{ name: 'Gallery' }">
            Gallery
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'Sets' }">
            Sets and Boosters
          </router-link>
        </div>
        <div>
          <a href="https://crowdcontrol-network.gitbook.io/">
            GitBook
          </a>
        </div>
        <div>
          <router-link :to="{ name: 'About' }">
            About
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'Roadmap' }">
            Roadmap
          </router-link>
        </div>
        <div>
            <a href="https://github.com/DecentralCardGame/whitepaper/blob/master/whitepaper.pdf">
              Whitepaper
            </a>
        </div>
        <div>
          <router-link :to="{ name: 'Imprint' }">
            Imprint
          </router-link>
        </div>
      </div>

      <div class="p-5 flex flex-col space-y-5">

        <div class="text-3xl font-bold">
          Social
        </div>

        <a href="https://discord.gg/ZKKbhUs">
          <div class="flex flex-row space-x-2 items-center">
            <div>
              <picture>
                <source
                  type="image/webp"
                  srcset="@/assets/icon/discord.webp"
                >
                <source
                  type="image/png"
                  srcset="@/assets/icon/discord.png"
                >
                <img
                  src="@/assets/icon/discord.png"
                  class="inline max-h-4"
                  alt="Discord logo"
                >
              </picture>
            </div>
            <div>
              Discord
            </div>
          </div>
        </a>

      <a href="https://twitter.com/CrowdControlNet">
          <div class="flex flex-row space-x-2 items-center">
            <div>
              <picture>
                <source
                  type="image/png"
                  srcset="@/assets/icon/twitter-x.svg"
                >
                <source
                  type="image/png"
                  srcset="@/assets/icon/twitter-x.png"
                >
                <img
                  src="@/assets/icon/twitter-x.png"
                  class="inline max-h-4"
                  alt="Twitter X logo"
                >
              </picture>
            </div>
            <div>
              Twitter
            </div>
          </div>
        </a>

        <a href="https://github.com/DecentralCardGame">
          <div class="flex flex-row space-x-2 items-center">
            <div>
              <picture>
                <source
                  type="image/webp"
                  srcset="@/assets/icon/github.webp"
                >
                <source
                  type="image/png"
                  srcset="@/assets/icon/github.png"
                >
                <img
                  src="@/assets/icon/github.png"
                  class="inline max-h-4"
                  alt="Github logo"
                >
              </picture>
            </div>
            <div>
              Github
            </div>
          </div>
        </a>

        <a href="https://t.me/DecentralCardNetwork">
          <div class="flex flex-row space-x-2 items-center">
            <div>
              <picture>
                <source
                  type="image/svg"
                  srcset="@/assets/icon/telegram.png"
                >
                <img
                  src="@/assets/icon/telegram.png"
                  class="inline max-h-4"
                  alt="Github logo"
                >
              </picture>
            </div>
            <div>
              Telegram
            </div>
          </div>
        </a>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import triangle from "@/assets/figma/Navigation_Triangle.svg";

function scrollup() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
}
</script>
