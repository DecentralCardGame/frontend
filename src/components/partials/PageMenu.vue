<template>
  <div class="h-32 bg-black flex space-x-10 px-10">
    <router-link class="my-auto" to="/"
      ><img class="h-16 object-contain" :src="CCLogo" alt="CC logo"
    /></router-link>
    <a class="grow" />
    <div class="my-auto max-md:hidden">
      <RouterCCButton :type="ButtonType.RED"
        >Download Gameclient</RouterCCButton
      >
    </div>
    <button class="my-auto text-white font-bold uppercase flex hover:underline">
      <img class="h-8 pr-4" :src="Profile" alt="CC logo" />
      <a class="my-auto">Login / Sign up</a>
    </button>
    <button class="my-auto" @click="toggleBar">
      <img class="h-14 md:hidden" :src="Menu" alt="Menu button" />
    </button>
  </div>
  <div
    :class="[
      'bg-[#D82027]',
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
      activeClass="text-yellow-500"
      >{{ elem.display }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import CCLogo from "@/assets/figma/CCLogo.png";
import Profile from "@/assets/figma/Profile.png";
import Menu from "@/assets/figma/Menu.svg";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";
import { reactive } from "vue";
import RouterCCButton from "@/components/elements/CCButton/RouterCCButton.vue";

type NavigationElement = {
  routeName: string;
  display: string;
  highlighted: boolean;
};

const elems: NavigationElement[] = [
  { routeName: "/", display: "Abc", highlighted: false },
  { routeName: "def", display: "Def", highlighted: true },
  { routeName: "ghi", display: "Ghi", highlighted: false },
];

const state = reactive({
  barShown: false,
});

const toggleBar = () => {
  state.barShown = !state.barShown;
};
</script>
