<template>
  <div>
    <h2>Council #{{ council.id }}</h2>
    <div
      v-for="(voter, address) in voters"
      :key="address"
    >
      {{ voter.alias }} -
      <router-link
        :to="{ name: 'UserView', params: {id: address} }"
      >
        {{ address }}
      </router-link>
      <br>
    </div>
  </div>
</template>

<script>

import { Council } from "@/model/Council";

export default {
  name: "CouncilParticipationComponent",
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
      voters: {}
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
      this.council.voters?.forEach(address => {
        console.log(address)
        this.$cardChain.getUserInfo(address).then(user => {
          this.voters[address] = user
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
</style>

