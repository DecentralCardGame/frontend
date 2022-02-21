<template>

  <div class="article-temp width-temp">
    <div class="hero">
      <h1>STEAKDROP 2022</h1>
    </div>
    <div v-if="votedForNFTArena === undefined">
      Here you can check if you are eligible for Crowd Control Steakdrop in 2022. <br>
      Did you vote for our contribution to Hackatom VI on Devpost? 
    </div>
    <div>
      <button
        v-if="votedForNFTArena === undefined"
        @click="votedForNFTArena = true;"
      >
        Yes
      </button>
      <button
        v-if="votedForNFTArena === undefined"
        @click="votedForNFTArena = false;"
      >
        No
      </button>
    </div>
    <div v-if="votedForNFTArena === false">
      Oh, we are sorry, you are not eligible.
    </div>
    <div v-if="votedForNFTArena === true">
      Awesome you are eligible! We will announce a date as soon as we know it. 
    </div>
  </div>
</template>

<script>

export default {
  name: 'SteakDropPage',
  data () {
    return {
      votedForNFTArena: undefined,
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
