<template>
  <div class="h-24 bg-black flex space-x-10 px-10">
    <router-link
      class="my-auto"
      to="/"
    >
      <img
        class="h-12 object-contain"
        :src="CCLogo"
        alt="CC logo"
      >
    </router-link>
    <a class="grow" />
    <div class="my-auto max-md:hidden">
      <RouterCCButton
        :type="Color.RED"
        to="/download"
      >
        Download Gameclient
      </RouterCCButton>
    </div>
    <LoginComponent />
    <button
      class="my-auto"
      @click="toggleBar"
    >
      <img
        class="h-14 md:hidden"
        :src="Menu"
        alt="Menu button"
      >
    </button>
  </div>
  <Navbar
    :class="[
      'max-md:' + (state.barShown ? 'visible' : 'hidden'),
      'justify-start',
    ]"
    :elems="elems"
    elem-class="px-8 py-4 font-bold"
    elem-active-class="text-yellow-500"
  />
</template>

<script setup lang="ts">
import CCLogo from "@/assets/figma/CCLogo.png";
import Menu from "@/assets/figma/Menu.svg";
import { reactive } from "vue";
import RouterCCButton from "@/components/elements/CCButton/RouterCCButton.vue";
import LoginComponent from "@/components/elements/Login/LoginComponent.vue";
import type { NavigationElement } from "@/components/elements/Navbar/types";
import Navbar from "@/components/elements/Navbar/Navbar.vue";
import { Color } from "@/components/utils/color";

const elems: NavigationElement[] = [
  { routeName: "/gallery", display: "Gallery" },
  { routeName: "/vote/encounter", display: "Voting", loggedInOnly: true },
  { routeName: "/s", display: "Sets and Boosters" },
  { routeName: "/learn", display: "Learn" },
  { routeName: "/cardCreator", display: "Card Creator" },
];

const state = reactive({
  barShown: false,
});

const toggleBar = () => {
  state.barShown = !state.barShown;
};
</script>
