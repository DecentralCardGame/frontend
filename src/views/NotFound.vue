<template>
  <div class="bg-black flex justify-center h-[80vh]">
    <div class="my-auto" />
    <HeadingContentComponent heading-class="text-[#FEC560]">
      <template #heading>
        Stay Tuned
      </template>
      <template #content>
        <p class="text-white">
          We are rebranding!<br>
          In the meantime, join our community on Discord!
        </p>
        <br>
        <LinkCCButton
          :type="Color.YELLOW"
          to="https://discord.gg/ZKKbhUs"
        >
          Join Discord
        </LinkCCButton>
      </template>
    </HeadingContentComponent>
  </div>
</template>

<script setup lang="ts">
import LinkCCButton from "@/components/elements/CCButton/LinkCCButton.vue";
import HeadingContentComponent from "@/components/elements/Teaser/TeaserHeader.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { Color } from "@/components/utils/color";

const router = useRouter();

onMounted(() => router.push({ path: "NotFound" }));
</script>
