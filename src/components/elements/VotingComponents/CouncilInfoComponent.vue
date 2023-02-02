<template>
  <div>
    <p>Voting finishes in: ... </p>
    <br>
    treasury: {{ council.treasury.normalize().pretty() }}
    <h3>Revision history</h3>
  </div>
</template>

<script>

import { Council } from "@/model/Council";

export default {
  name: "CouncilInfoComponent",
  components: {},
  props: {
    council: {
      type: Council,
      default() {
        return new Council();
      }
    }
  },
  data() {
    return {
      voters: []
    };
  },
  watch: {
    council: {
      handler() {
        this.init();
      },
      deep: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log(123)
    }
  }
};
</script>

<style scoped lang="scss">
</style>

