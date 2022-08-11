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
        def
      </div>
      <div class="child image">
        ghi
      </div>
    </div>
  </div>
</template>

<script>

import Chart from "chart.js/auto";

export default {
  name: "Collections",
  components: {},
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
  margin-top:10px;
  .child {
    background: #F5F5F5;
    margin:3%;
    padding:25px;
    display:inline-block;
  }
}

.general {
  width: 50%
}

.chartContainer {
  display: inline-block;
}

</style>
