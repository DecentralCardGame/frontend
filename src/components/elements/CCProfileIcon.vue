<template>
  <div class="ppImage">
    <img :src="loggedInProfilePic" alt="Avatar">
  </div>
</template>

<script setup lang="ts">
import { useProfilePic } from "@/def-composables/useProfilePic";

const { loggedInProfilePic } = useProfilePic()

</script>

<style scoped lang="scss">
.ppImage {
  height: 30px;
  width: 30px;
  overflow: hidden;
  display: block;
  border-radius: 50%;

  img {
    background-color: transparent;
    object-fit: contain;
    padding-top: -10%;
    width: 100%;
  }

}
</style>