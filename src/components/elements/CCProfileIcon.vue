<template>
  <div class="ppImage">
    <img :src="loggedInProfilePic" alt="Avatar">
  </div>
</template>

<script setup lang="ts">
import { useProfilePic } from "@/def-composables/useProfilePic";

const { loggedInProfilePic } = useProfilePic()

</script>