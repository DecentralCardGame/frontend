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
        :type="ButtonType.RED"
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
  <div
    :class="[
      'bg-cc-red',
      'flex',
      'flex-row',
      'uppercase',
      'text-white',
      'text-lg',
      'h-13',
      'font-bold',
      'max-md:flex-col',
      'max-md:' + (state.barShown ? 'visible' : 'hidden'),
    ]"
  >
    <router-link
      v-for="elem in elems"
      :to="elem.routeName"
      class="px-8 py-4 hover:underline"
      active-class="text-yellow-500"
    >
      {{ elem.display }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import CCLogo from "@/assets/figma/CCLogo.png";
import Menu from "@/assets/figma/Menu.svg";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";
import { reactive } from "vue";
import RouterCCButton from "@/components/elements/CCButton/RouterCCButton.vue";
import LoginComponent from "@/components/elements/Login/LoginComponent.vue";

type NavigationElement = {
  routeName: string;
  display: string;
};

const elems: NavigationElement[] = [
  { routeName: "/gallery", display: "Gallery" },
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
