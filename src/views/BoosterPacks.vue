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
    <div
      v-for="collection in collections"
      :key="collection"
      class="collectionTile ccbutton"
    >
      <img
        :src="getImage(collection)"
      >
      {{ collection.name }}
      <button
        @click="showCollectionEditModal"
      >
        Info
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
      isEditCollectionModalVisible: false,
      ids: [],
      collections: [],
    }
  },
  mounted() {
    this.getCollections()
  },
  methods: {
    getCollections() {
      this.$cardChain.getCollections("")
      .then(res => {
        this.ids = res.collectionIds
        for (var i = 0; i < this.ids.length; i++) {
          this.$cardChain.getCollection(this.ids[i])
          .then(res => {
            this.collections.push(res)
          })
        }
      })
    },
    showCollectionModal() {
      this.isCollectionModalVisible = true;
    },
    closeCollectionModal() {
      this.isCollectionModalVisible = false;
    },
    showEditCollectionModal() {
      this.isEditCollectionModalVisible = true;
    },
    closeEditCollectionModal() {
      this.isEditCollectionModalVisible = false;
    },
    getImage(collection) {
      if (collection.image) {
        return collection.Image
      } else {
        return "Avatar0.png"
      }
    }
  }
}
</script>

<style lang="scss">

.collectionTile {
  img {
    border-radius: 10px;
    width: 200px;
  }
}

</style>

