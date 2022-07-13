<template>
  <transition name="modal-fade">
    <div
      class="modal__backdrop"
      style="z-index: 10;"
    >
      <div
        aria-describedby="modalDescription"
        aria-labelledby="modalTitle"
        class="modal"
        role="dialog"
        @click.stop="doNothing"
      >
        <header
          id="modalTitle"
          class="modal__header"
        >
          <slot name="header">
            Collection: {{ collection.name }}
          </slot>
          <button
            aria-label="Close modal"
            type="button"
            class="btn--close"
            @click="close"
          >
            x
          </button>
        </header>
        <div
          class="modal__body input--editCollection ccbutton"
          align="center"
        >
          <img
            :src="getImage()"
          ><br>
          Story:
          <div class="multiline">
            {{ collection.story }}
          </div>
          <button
            v-if="$store.getters['common/wallet/address'] === collection.storyWriter"
            @click="showCollectionStoryModal"
          >
            Edit story
          </button><br>
          Contributors:
          <router-link
            v-for="contrib in collection.contributors"
            :key="contrib"
            :to="{name: 'UserView', params: {id: contrib} }"
          >
            <a>{{ contrib }}</a><br>
          </router-link>
          Story writer:
          <router-link
            :to="{name: 'UserView', params: {id: collection.storyWriter} }"
          >
            <a>{{ collection.storyWriter }}</a>
          </router-link><br>
          Artist:
          <router-link
            :to="{name: 'UserView', params: {id: collection.artist}}"
          >
            <a>{{ collection.artist }}</a>
          </router-link><br>
          Cards:
          <router-link
            :to="{ name: 'Gallery', query: { cardsList: collection.cards }}"
          >
            <a>{{ collection.cards.length }}</a>
          </router-link><br>
        </div>
        <CollectionStoryModal
          v-if="isCollectionStoryModalVisible"
          :id="id"
          :inp-story="collection.story"
          @close="closeCollectionStoryModal"
        />
      </div>
    </div>
  </transition>
</template>

<script>

import CollectionStoryModal from './CollectionStoryModal.vue';


export default {
  name: 'CollectionInfoModal',
  components: { CollectionStoryModal },
  props: {
    id: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      isCollectionStoryModalVisible: false,
      collection: {
        name: "",
        artist: " ",
        storyWriter: " ",
        contributors: [],
        cards: [],
      }
    }
  },
  watch: {
    '$store.state.common.wallet.selectedAddress': function () {
    }
  },
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    init() {
      this.$cardChain.getCollection(this.id)
      .then(res => {
        this.collection = res.c
        console.log(this.collection)
      })
    },
    getImage() {
      if (this.collection.image) {
        return this.collection.image
      } else {
        return "Avatar0.png"
      }
    },
    showCollectionStoryModal() {
      this.isCollectionStoryModalVisible = true;
    },
    closeCollectionStoryModal() {
      this.init()
      this.isCollectionStoryModalVisible = false;
    },
  }
}

</script>

<style lang="scss">
@import "modal";

.input--editCollection {
  color: $black;
  input {
    color: $black;
    padding: 0;
    margin-right: 2px;
    display: inline;
    text-align: right;
    background-color: lightgray;
  }
  a {
    color: grey;
  }
  img {
    border-radius: 10px;
    width: 200px;
  }
}

.multiline {
  white-space: pre-wrap;
  text-align: left;
  background-color: grey;
  width:600px;
  word-wrap: break-word;
}

</style>
