<template>
  <div>
    <div class="peterSolar">
      <div class="child general">
        <h2>Collection</h2>
        <div v-if="!editStory">
          {{ collection.story }}
          <button
            v-if="$store.getters['common/wallet/address'] === collection.storyWriter && collection.status === 'design'"
            @click="editStory = true"
          >
            Edit story
          </button><br><br>
          Rarity distribution<br>
          <div
            class="chartContainer"
            align="left"
          >
            <canvas id="myChart" />
          </div><br>
        </div>
        <div v-else>
          <textarea
            v-model="collection.story"
            placeholder="story"
            rows="10"
            cols="40"
          />
          <button
            class="btn--default"
            @click="editStory = false"
          >
            Update
          </button>
        </div>
        <br>
      </div>
      <div class="child contribs">
        <div class="heading">
          Contributors
        </div>
        <div class="body">
          <div
            v-for="contrib in collection.contributors"
            :key="contrib"
            class="listElement"
          >
            <a>{{ contrib }}</a>
            <button
              v-if="$store.getters['common/wallet/address'] == collection.contributors[0] && collection.status === 'design'"
              class="remove"
              @click="sendRemoveContrib(contrib)"
            >
              -
            </button>
          </div>
        </div>
      </div>
      <div class="child image">
        <div
          v-if="$store.getters['common/wallet/address'] === collection.artist && collection.status === 'design'"
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
          class="noEditImage"
          :src="collection.artwork"
        >
      </div>
    </div>
  </div>
</template>

<script>

import Chart from "chart.js/auto";
import { Cropper } from 'vue-advanced-cropper'
import { uploadImg } from "@/components/utils/utils.js";
import 'vue-advanced-cropper/dist/style.css';

export default {
  name: "Collections",
  components: { Cropper },
  data() {
    return {
      editStory: false,
      id: 0,
      collection: {
        artwork: "",
        name: "",
      },
      chartData: {
        current: [0, 0, 0, 1],
        wanted: [0, 0, 0, 1],
      },
    }
  },
  mounted() {
    this.id = parseInt(this.$route.params.id)
    this.getCollection()
    this.updateChart()
  },
  methods: {
    getCollection() {
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
      .then(this.getCollection)
    },

    updateChart() {
     this.$cardChain.getRarityDistribution(this.id)
      .then(res => {
        this.chartData = res
        let ctx = document.getElementById("myChart");
        const chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: [
              'COMMON',
              'UNCOMMON',
              'RARE',
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
    }
  }
}
</script>

<style lang="scss">

.peterSolar {
  margin-top:50px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  .child {
    display:inline-block;
  }
}

.general {
  background: #F5F5F5;
  width: 40%;
  min-width:15em;
  padding: 25px;
}

.chartContainer {
  display: inline-block;
}

.image {
  width: 40%;
  min-width:15em;
}

.contribs {
  background: #F5F5F5;
  width: 10%;
  min-width:10em;
  .heading {
    padding-left:10px;
    padding-top:5px;
    padding-bottom:5px;
    background: #757575;
    color: #FFFFFF
  }
  .body {
    padding:5px;
    .listElement {
      display: flex;
      justify-content: space-between;
      a {
        color: black;
        width: 80%;
        overflow: hidden;
      }
      button {
        color: white;
        background: #757575;
        border-width: 0px;
        border-radius: 3px;
        width: 20px;
        margin: 2px;
      }
      button:hover {
        background: #97979a;
      }
    }
  }
}

.cropper {
  height: 300px;
  width: 100%;
  border: 2px  solid rgba(255, 255, 255, 0.7);
  @media (max-width: 480px) {
    width: 80vw;
  }
}

.noEditImage {
    border-radius: 50%;
    width: 100%;
}

</style>
