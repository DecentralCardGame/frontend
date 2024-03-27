<template>
  <div class="LogoBox flex text-center justify-center p-80">
    <div>
      <img
        :src="logoBig"
        alt="big cc logo"
        class="box-shadow-2xl"
      >
      <p class="text-xl font-lg">
        A collectible card game made by players.
      </p>
      <BaseCCButton
        :type="Color.YELLOW"
        @click="() => console.log('abc')"
      >
        CREATE CARDS
      </BaseCCButton>
      <br>
      <BaseCCButton :type="Color.RED">
        CREATE CARDS
      </BaseCCButton>
      <br>
      <BaseCCButton :type="Color.BLACK">
        CREATE CARDS
      </BaseCCButton>
      <br>
      <BaseCCButton :type="Color.WHITE">
        CREATE CARDS
      </BaseCCButton>
      <br>
      <BaseCCButton :type="Color.PUSSYRED">
        hmm
      </BaseCCButton>
      <br>
      <BaseCCButton :type="Color.TEAL">
        <router-link to="/">
          Go to Home
        </router-link>
      </BaseCCButton>
      <br>
      <Dropdown
        v-model="test"
        :options="['yes', 'nein', 'vllt', 'nur ficken']"
      />
      <br>
      <br>
      <Dropdown
        v-model="test"
        :options="['yes', 'nein', 'vllt', 'nur ficken']"
        :display-fn="(v) => 'hmm: ' + v"
        :type="Color.RED"
        @update:model-value="console.log"
      />
      <br>
      <br>
      <p class="text-white">
        {{ test }}
      </p>
      <br>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import logoBig from "@/assets/figma/LogoBig.png";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import Dropdown from "@/components/elements/Dropdown/Dropdown.vue";
import { Color } from "@/components/utils/color";

const test: Ref<string> = ref("");
</script>

<style lang="scss">
.LogoBox {
  background-image: url("@/assets/figma/LandingPageBackground/LandingBackground-thicc.jpeg");
}
</style>
