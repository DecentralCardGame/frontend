<template>
  <div class="about">
    <div>
    Crowd Control is a trading card game, which gives you full ownership of your cards AND gives the community full ownership of the game. <br><br>
    This means we are creating this together. Any player can design their own trading cards. Any player may participate in the process of balancing the game by voting on cards. <br><br>
    This sounds very awesome, but how shall this work? Somebody must be in charge and someone has to say what is overpowered and why should anyone do all this kind of work? <br>
    Yes. The answer is blockchain. We build a blockchain with Cosmos technology that incentivizes all of these processes and disincentivizes trolling. <br>
    How all of this works can be read on our project page <a
      href="https://www.decentral-card.net/"
      target="_blank"
    > Decentral Card Network </a><br><br>
    You are right now on the page of the game Crowd Control, which is the product of our decentralized autonomous organization (DAO).
    </div>

    <div class="creator-preview">
      <CardComponent
        
        :model="cards[0]"
        :image-u-r-l="cardImgs[0]"
      />
    </div>

  </div>

</template>

<script>
import CardComponent from '../CardComponent'
import { sampleImg, communityImg, communityCard } from '../utils.js'

export default {
  name: 'AboutPage',
  components: {CardComponent},
  data () {
    return {
      cards: [communityCard],
      cardImgs: [communityImg, sampleImg]
    }
  }
}
</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";

.hero {
  margin: 4rem 0;

  @media (max-width: 480px) {
    margin: 0;
  }
}
.about {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 1fr;
    gap: 2rem 4rem;
    @media (min-width: 480px) {
      grid-template-areas: "creator-input creator-preview";
    }
  }
</style>
