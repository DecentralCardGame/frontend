<template>
  <div>
    <h2 class="header__h2">
      Booster Packs
    </h2>
    <div class="button-container button-container--top ccbutton">
      <button
        @click="$store.commit('toggleGalleryFilter')"
      >
        {{ $store.getters.getGalleryFilter.visible ? "hide" : "show" }}
        filters
      </button>
      <button
        v-show="$store.getters['getLoggedIn']"
        @click="loadMyCardList()"
      >
        My cards
      </button>
      <button
        v-show="$store.getters['getLoggedIn']"
        @click="loadSpecialCardList('Artwork')"
      >
        Create new collection
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: "BoosterPacks",
  components: {},
  data() {
    return {}
  },
  mounted() {
    this.$cardChain.getCollections("")
    .then(res => {
      console.log(res)
    })
  },
}
</script>

<style>

</style>

