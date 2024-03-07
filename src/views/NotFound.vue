<template>
  <div class="bg-black flex text-center justify-center h-[80vh]">
    <div class="my-auto">
      <p class="text-5xl text-[#FEC560] font-bold">
        Stay Tuned
      </p>
      <br>
      <p class="text-white text-2xl">
        We are rebranding!<br><br>You can still access our old website:<br>
        <a
          href="https://crowdcontrol.network"
          class="hover:underline"
        >
          crowdcontrol.network</a><br><br>
        In the meantime, join our community on Discord!
      </p>
      <br>
      <LinkCCButton
        :type="ButtonType.YELLOW"
        to="https://discord.gg/ZKKbhUs"
      >
        Join Discord
      </LinkCCButton>
    </div>
  </div>
</template>

<script lang="ts">
import LinkCCButton from "@/components/elements/CCButton/LinkCCButton.vue";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";

export default {
  name: "NotFound",
  components: { LinkCCButton },
  data() {
    return {};
  },
  computed: {
    ButtonType() {
      return ButtonType;
    },
  },
  mounted() {
    this.$router.push({ path: "NotFound" });
  },
};
</script>
