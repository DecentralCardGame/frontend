<template>
  <div class="LogoBox flex text-center justify-center p-80">
    <div>
      <img :src="logoBig" alt="big cc logo" class="box-shadow-2xl" />
      <p class="text-xl font-lg">A trading card game made by players.</p>
      <BaseCCButton :type="ButtonType.YELLOW" @click="() => console.log('abc')"
        >CREATE CARDS
      </BaseCCButton>
      <br />
      <BaseCCButton :type="ButtonType.RED">CREATE CARDS</BaseCCButton>
      <br />
      <BaseCCButton :type="ButtonType.BLACK">CREATE CARDS</BaseCCButton>
      <br />
      <BaseCCButton :type="ButtonType.WHITE">CREATE CARDS</BaseCCButton>
      <br />
      <BaseCCButton :type="ButtonType.PUSSYRED">hmm</BaseCCButton>
      <br />
      <BaseCCButton :type="ButtonType.TEAL">
        <router-link to="/">Go to Home</router-link>
      </BaseCCButton>
      <br />
      <Dropdown
        v-model="test"
        :options="['yes', 'nein', 'vllt', 'nur ficken']"
      />
      <br />
      <br />
      <Dropdown
        v-model="test"
        :options="['yes', 'nein', 'vllt', 'nur ficken']"
        :display-fn="(v) => 'hmm: ' + v"
        @update:model-value="console.log"
        :type="ButtonType.RED"
      />
      <br />
      <br />
      <p class="text-white">{{ test }}</p>
      <br />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import logoBig from "@/assets/figma/LogoBig.png";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";
import Dropdown from "@/components/elements/Dropdown/Dropdown.vue";

const test: Ref<string> = ref("");
</script>

<style lang="scss">
.LogoBox {
  background-image: url("@/assets/figma/LandingPageBackground/LandingBackground-thicc.jpeg");
}
</style>
