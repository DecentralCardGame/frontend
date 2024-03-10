<template>
  <div >
    <FadeTeaser>
      <div class="px-0 py-40 flex text-center justify-center">
        <div>
          <p class="text-5xl font-black text-red-600 font-lg">
            Play the Game!
          </p>
          <p class="py-10 text-xl font-medium font-lg">
            Our alpha version is currently in development <br>
            and not publicly released :( <br>
            We only do closed playtests at the moment. <br>
            The button below will do nothing.
          </p>
            <BaseCCButton
              :type="ButtonType.RED"
            >
              Download Gameclient
            </BaseCCButton>
        </div>
      </div>
    </FadeTeaser>
  </div>
</template>

<script setup lang="ts">
import FadeTeaser from "@/components/elements/FadeTeaser.vue";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";
</script>
