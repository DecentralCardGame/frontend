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
        :src="getImage(collection.c)"
      >
      {{ collection.c.name }}
      <button
        @click="currId = +collection.id; showEditCollectionModal();"
      >
        Info
      </button>
    </div>
    <CollectionModal
      v-if="isCollectionModalVisible"
      @close="closeCollectionModal"
    />
    <CollectionInfoModal
      v-if="isEditCollectionModalVisible"
      :id="currId"
      @close="closeEditCollectionModal"
    />
  </div>
</template>

<script>

import CollectionModal from '../components/modals/CollectionModal.vue';
import CollectionInfoModal from '../components/modals/CollectionInfoModal.vue';


export default {
  name: "BoosterPacks",
  components: { CollectionModal, CollectionInfoModal },
  data() {
    return {
      isCollectionModalVisible: false,
      isEditCollectionModalVisible: false,
      ids: [],
      collections: [],
      currId: 0,
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
            for (var j = 0; j < this.collections.length; j++) {
              if (this.collections[j].name === res.name) {
                this.collections[j] = res
                return
              }
            }
            this.collections.push(res)
          })
        }
      })
    },
    showCollectionModal() {
      this.isCollectionModalVisible = true;
    },
    closeCollectionModal() {
      this.getCollections()
      this.isCollectionModalVisible = false;
    },
    showEditCollectionModal() {
      this.isEditCollectionModalVisible = true;
    },
    closeEditCollectionModal() {
      this.getCollections()
      this.isEditCollectionModalVisible = false;
    },
    getImage(collection) {
      if (collection.artwork) {
        return collection.artwork
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

