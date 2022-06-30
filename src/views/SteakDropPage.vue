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
      Awesome you are eligible! The Steakdrop Party will be on 16th of July in 2022.<br>
      If you are eligible you have been contacted already, if not, please contact us.<br>
      <br>
      We will provide drinks and food, you don't have to bring any. <br>
      But it would be nice if you can bring your own dishes. We don't have enough and no dishwasher.<br>
      <br>
      The party will take place at a swimming pond close to a forest in Odenwald. Please bring swimwear if you want to swim. <br>
      There is a toilet, a fridge and a freezer for cold drinks and a lot of space for putting up your tent. <br>
      We will also take care that the party will not be close to the tents, so sleeping is possible for those who won't stay up long into the night. <br>
      <br>
      Timeline:<br>
      12:00 - Start of the party - Swimming - Welcome (Anthem Human)<br>
      13:00 - Crossbow Shooting (Arm ALL 1) - Snacks<br>
      14:30 - Flunky Ball<br>
      16:00 - BBQ / Fireplace is light up<br>
      18:00 - Time to feast!<br>
      21:00 - The fireplace moves to the other side of the pond, heavy drinking begins.<br>
      24:00 - Midnight feast <br>
      10:00 - Breakfast at the swimming pond <br>
      <br>
      If you can't make it to the start of the party, that is ok, you can join later as well.<br>
      Some people can make it, but want to spend this hot day in the city rather than swimming close to the forest, this is also ok.<br>
      You can come as you like, but please let us know an approximate time if you plan to come later. <br>
      Please keep in mind that Stefi will check if everyone is drinking enough alcohol.<br>
      It is possible that we even have a tent/camper van for you, please contact us.<br>
      The same applies to (free) rides to the place, let's organize shared rides!<br>
      <br>
      <div 
        class="dual--column--flex--wrap"
      >
        <img
          src="../assets/misc/crossbow.jpg"
          class="image"
        >
        <img
          src="../assets/misc/fire1.jpg"
          class="image"
        >

        <img
          src="../assets/misc/water.jpg"
          class="image"
        >
      </div>
      <div 
        class="dual--column--flex--wrap"
      >
        <img
          src="../assets/misc/fire2.jpg"
          class="image"
        >
        <img
          src="../assets/misc/marshmallow.jpg"
          class="image"
        >
        <img
          src="../assets/misc/meat.jpg"
          class="image"
        >
      </div>
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
.image {
  width: 400px;
  position: relative;
  overflow: hidden;
}
</style>
