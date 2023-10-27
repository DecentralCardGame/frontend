<template>
  <transition name="modal-fade">
    <div
      class="modal__backdrop"
      style="z-index: 1000;"
    >
      <div
        aria-describedby="modalDescription"
        aria-labelledby="modalTitle"
        class="modal"
        role="dialog"
      >
        <header
          id="modalTitle"
          class="modal__header"
        >
          <slot name="header">
            Airdrops
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
        <div class="modal__body">
          <b>Important:</b> <br>
          We are running a testnet. <br>
          This is not the mainnet. <br>
          Whatever you claim here can be gone <br>
          and will be gone, once the testnet resets. <br>
          But we will have an airdrop to all engaged <br>
          participants of our testnets. <br>
          <br>
          Claimable airdrops:
          <div>
            <div
              v-for="(drop, name) in airdrops"
              :key="name"
              class="airdropBox"
              :class="{ 'blurOut': !isValid }"
            >
              {{ data[name].text }}
              <router-link
                :to="{name: data[name].linkData}"
              >
                {{ data[name].linkText }}
              </router-link>
              <div
                v-if="data[name].linkData"
                class="claimBox"
                :style="{color: (!drop) ? 'red' : 'green',}"
              >
                {{ !drop ? "not" : "" }} claimed
              </div>
              <div 
                v-else
                class="claimBox"
              >
                not implemented
              </div>
            </div>
          </div>
          <div v-if="!isValid">
            There are no claimable airdrops anymore!
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang=ts>
import { useQuery } from "@/def-composables/useQuery";
import { env } from "@/env";

const { queryParams } = useQuery()

export default {
  name: 'AirdropsModal',
  props: {
    airdrops: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isValid: true,
      data: {
        create: {
          text: "Create a ",
          linkText: "card draft.",
          linkData: 'New Card'
        },
        vote: {
          text: "Vote for a ",
          linkText: "card.",
          linkData: 'Vote'
        },
        play: {
          text: "Play the game.",
          linkText: "",
          linkData: ''
        },
        user: {
          text: "Create a user.",
          linkText: "",
          linkData: 'UserView'
        },
        buy: {
          text: "Buy a ",
          linkText: "boosterpack.",
          linkData: '' // TODO: Needs
        },
      }
    }
  },
  mounted() {
    this.getHeight()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    getHeight() {
      fetch(env.rpcURL + "/status").then(response => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        queryParams().then(res => {
          this.isValid = (+data.result.sync_info.latest_block_height < +res.params.airDropMaxBlockHeight)
        })
      })
      .catch(error => console.log(error))
    }
  }
}

</script>

<style lang="scss">
@import "modal";

.airdropBox {
  margin: 5px;
  padding: 7px;
  box-shadow: 2px 2px 4px;
  text-align: left;
  cursor: pointer;
  a {
    color: $black;
    font-weight: bold;
  }
  .claimBox {
    float: right;
    text-align: right;
    font-weight: bold;
    margin-left: 10px;
  }
}

.airdropBox:hover {
  box-shadow: 4px 4px 8px;
}

.blurOut {
  opacity: 0.6;
  filter: grayscale(100%);
  pointer-events: none;
}

</style>
