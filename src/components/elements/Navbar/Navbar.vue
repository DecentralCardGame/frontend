<template>
  <div
    class="flex flex-row uppercase text-lg max-md:flex-col"
    :class="[getBgColor(type), getTextColor(type), ...props.class]"
  >
    <template
      v-for="elem in elems"
      :key="elem.display"
    >
      <router-link
        v-if="!elem.loggedInOnly || (elem.loggedInOnly && loggedIn)"
        :active-class="elemActiveClass"
        :class="elemClass"
        :to="elem.routeName"
        class="hover:underline"
      >
        {{ elem.display }}
      </router-link>
    </template>
  </div>
</template>
<script lang="ts" setup>
import type { NavigationElement } from "@/components/elements/Navbar/types";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { Color, getBgColor, getTextColor } from "@/components/utils/color";

const { loggedIn } = useLoggedIn();

const props = withDefaults(
  defineProps<{
    elems: NavigationElement[];
    class?: string[];
    elemClass?: string | string[];
    elemActiveClass?: string;
    type?: Color;
  }>(),
  {
    class: () => ["justify-center"],
    elemClass: "px-10 py-7",
    elemActiveClass: "font-bold",
    type: Color.RED,
  },
);
</script>
