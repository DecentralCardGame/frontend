<template>
  <nav class="bg-red-100">
    <ul class="flex px-10 py-5">
      <li class="mr-10 font-semibold">
        <router-link to="/about">
          The Game
        </router-link>
      </li>
      <li class="mr-10 font-semibold">
        <router-link to="/cardCreator">
          Card Creator
        </router-link>
      </li>
      <li class="mr-10 font-semibold">
        <router-link to="/gallery">
          Gallery
        </router-link>
      </li>
      <li class="mr-10 font-semibold">
        <router-link to="/vote">
          Voting
        </router-link>
      </li>
      <li class="mr-10 font-semibold">
        <router-link v-if="loggedIn" to="/user/me">
          Account
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useLoggedIn } from "@/def-composables/useLoggedIn";

export default {
  name: 'PageNavMenu',
  data() {
    return {
      displayMenu: false,
      displayLoginDialogue: false,
    }
  },
  setup() {
    const { loggedIn } = useLoggedIn()
    return { loggedIn }
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style scoped lang="scss"></style>
