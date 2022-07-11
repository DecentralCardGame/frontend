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
        @click="showCollectionModal"
      >
        Create new collection
      </button>
    </div>
    <CollectionModal
      v-if="isCollectionModalVisible"
      @close="closeCollectionModal"
    />
  </div>
</template>

<script>

import CollectionModal from '../components/modals/CollectionModal.vue';

export default {
  name: "BoosterPacks",
  components: { CollectionModal },
  data() {
    return {
      isCollectionModalVisible: false,
    }
  },
  mounted() {
    this.$cardChain.getCollections("")
    .then(res => {
      console.log(res)
    })
  },
  methods: {
    showCollectionModal() {
      this.isCollectionModalVisible = true;
    },
    closeCollectionModal() {
      this.isCollectionModalVisible = false;
    },
  }
}
</script>

<style>

</style>

