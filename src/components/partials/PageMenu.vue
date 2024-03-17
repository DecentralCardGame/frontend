<template>
  <div class="h-32 bg-black flex space-x-10 px-10">
    <router-link
      class="my-auto"
      to="/"
    >
      <img
        class="h-16 object-contain"
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
      'text-xl',
      'font-bold',
      'max-md:flex-col',
      'max-md:' + (state.barShown ? 'visible' : 'hidden'),
    ]"
  >
    <router-link
      v-for="elem in elems"
      :to="elem.routeName"
      class="px-10 py-5 hover:underline"
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
import LoginComponent from "@/components/elements/LoginComponent.vue";

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
