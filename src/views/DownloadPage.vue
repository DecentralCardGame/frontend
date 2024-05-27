<template>
  <FadeTeaserSmall>
    <TeaserHeader heading-class="text-cc-red">
      <template #heading>
        Play the Game!
      </template>
      <template #content>
        <button @click="sendMessage">Send</button>
        <p>
          Our alpha version is currently in development <br>
          and not publicly released :( <br>
          We only do closed playtests at the moment. <br>
          The button below will do nothing.
        </p>
        <br>
        <BaseCCButton :type="Color.RED">
          Download Gameclient
        </BaseCCButton>
      </template>
    </TeaserHeader>
  </FadeTeaserSmall>
</template>

<script setup lang="ts">
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import FadeTeaserSmall from "@/components/elements/Teaser/FadeTeaserSmall.vue";
import TeaserHeader from "@/components/elements/Teaser/TeaserHeader.vue";
import { Color } from "@/components/utils/color";
import { sendNewCardMessage } from "@/def-composables/useDiscord";

function sendMessage() {
  sendNewCardMessage("cc0937838718893372318908udj9u01", 720);
}


</script>
