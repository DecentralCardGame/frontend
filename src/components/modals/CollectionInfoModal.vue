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
          <div
            v-if="$store.getters['common/wallet/address'] === collection.artist"
          >
            <cropper
              class="cropper"
              :src="collection.artwork"
              :auto-zoom="true"
              :stencil-size="{
                width: 838,
                height: 838
              }"
              :default-size="{
                width: 838,
                height: 838,
              }"
              image-restriction="fit-area"
              @change="changeImage"
            />
            <input
              id="file"
              class="inputfile"
              name="file"
              type="file"
              @change="inputFile"
            >
            <button
              @click="sendImage"
            >
              Update image
            </button><br>
          </div>
          <img
            v-else
            :src="collection.artwork"
          >
          <br>
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
          Status: {{ collection.status[0].toUpperCase() + collection.status.slice(1) }}<br>
          Contributors:
          <div
            v-for="contrib in collection.contributors"
            :key="contrib"
          >
            <router-link
              :to="{name: 'UserView', params: {id: contrib} }"
            >
              <a>{{ contrib }}</a>
            </router-link>
            <button
              v-if="$store.getters['common/wallet/address'] == collection.contributors[0]"
              class="btn--default"
              @click="sendRemoveContrib(contrib)"
            >
              -
            </button>
            <br>
          </div>
          <div v-if="$store.getters['common/wallet/address'] == collection.contributors[0]">
            <input
              v-model="tempContrib"
              type="text"
              placeholder=""
            >
            <button
              class="btn--default"
              @click="sendAddContrib()"
            >
              +
            </button>
          </div>
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
            :to="{ name: 'Gallery', query: { cardList: collection.cards }}"
          >
            <a>{{ collection.cards.length }}</a>
          </router-link><br>
          <div
            class="chartContainer"
          >
            <canvas id="myChart" />
          </div>
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

import Chart from "chart.js/auto";
import CollectionStoryModal from './CollectionStoryModal.vue';
import { Cropper } from 'vue-advanced-cropper'
import { uploadImg } from "@/components/utils/utils.js";
import 'vue-advanced-cropper/dist/style.css';

export default {
  name: 'CollectionInfoModal',
  components: { CollectionStoryModal, Cropper },
  props: {
    id: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      tempContrib: "",
      isCollectionStoryModalVisible: false,
      image: "",
      collection: {
        name: "",
        artist: " ",
        storyWriter: " ",
        contributors: [],
        cards: [],
        artwork: "Avatar0.png",
        status: "abc",
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
      this.$cardChain.getRarityDistribution(this.id)
      .then(res => {
        let ctx = document.querySelector("canvas");
        const chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: [
              'RARE',
              'UNCOMMON',
              'COMMON',
              'NONE'
            ],
            datasets: [{
              label: 'Current',
              data: res.current,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'grey'
              ],
              hoverOffset: 4
            }, {
              label: 'Wanted',
              data: res.wanted,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'grey'
              ],
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
              },
              title: {
                display: true,
                text: 'Rarity distribution'
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return context.dataset.label + ': ' + context.label + " " + context.parsed
                  }
                }
              }
            }
          },
        })
      })
      this.$cardChain.getCollection(this.id)
      .then(res => {
        this.collection = res.c
        console.log(this.collection)
        if (!this.collection.artwork) {
          this.collection.artwork = "Avatar0.png"
        }
      })
    },
    sendRemoveContrib(user) {
      this.$cardChain.removeContributorFromCollection(this.id, user)
      .then(this.init)
    },
    sendAddContrib() {
      this.$cardChain.addContributorToCollection(this.id, this.tempContrib)
      .then(this.init)
    },
    showCollectionStoryModal() {
      this.isCollectionStoryModalVisible = true;
    },
    closeCollectionStoryModal() {
      this.init()
      this.isCollectionStoryModalVisible = false;
    },
    inputFile(event) {
      let file = event.target.files[0]

      uploadImg(file, process.env.VUE_APP_CARDIMG_MAXKB, (result) => {
        this.collection.artwork = result
      })
    },
    sendImage() {
      this.$cardChain.addArtworkToCollection(
        this.id,
        this.image,
      ).then(res => {
        console.log("yees")
      })
    },
    changeImage({canvas}) {
      this.image = canvas.toDataURL('image/jpeg', 0.9)
    },
  }
}

</script>

<style lang="scss">
@import "modal";

.input--editCollection {
  color: $black;
  max-height:75vh;
  overflow:auto;
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
    width: 300px;
  }
}

.cropper {
  height: 300px;
  width: 40vw;
  margin: 1rem;
  border: $border-thickness solid rgba(255, 255, 255, 0.7);
  @media (max-width: 480px) {
    width: 80vw;
  }
}

.chartContainer {
  display: inline-block;
}

.multiline {
  white-space: pre-wrap;
  text-align: left;
  background-color: grey;
  width:600px;
  word-wrap: break-word;
}

</style>
