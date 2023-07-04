<template>
  <transition name="modal-fade">
    <div class="modal__backdrop">
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
            Card Info & Interactions
            <button
              aria-label="Close modal"
              class="btn--close"
              type="button"
              @click="close"
            >
              x
            </button>
          </slot>
        </header>

        <div class="container-flex-row">
          <div>
            <CardComponent
              :model="model"
              :image-u-r-l="imageURL"
              hover-behavior="none"
              class="view__card"
            />
          </div>

          <div class="container-flex-column">
            <div
              v-show="keywordDescriptions.length"
              class="modal__body"
            >
              <b>Keyword Explanations:</b>
              <div
                v-for="(keyword, index) in keywordDescriptions"
                :key="index"
                class="container-flex-row"
              >
                <b> {{ keyword[0] }}</b>
                - {{ keyword[1] }}
              </div>
            </div>

            <div class="modal__body no__bottomline">
              <b>Card Interactions:</b>
            </div>

            <section
              id="modalDescription"
              class="modal__body choice-grid"
            >
              <router-link :to="{ path: '/cardview/'+model.id }">
                <button
                  aria-label="Close modal"
                  class="choice-grid__button"
                  type="button"
                >
                  Advanced Card Info
                </button>
              </router-link>
              <button
                v-if="isOwner"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="edit(); close();"
              >
                Edit Card
              </button>
              <button
                v-if="isOwner"
                class="choice-grid__button"
                type="button"
                @click="showModal()"
              >
                Transfer card
              </button>
              <button
                v-if="canVote"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="voteUP(); close();"
              >
                Vote Underpowered
              </button>

              <button
                v-if="canVote"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="voteOP(); close();"
              >
                Vote Overpowered
              </button>

              <button
                v-if="canVote"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="voteFair(); close();"
              >
                Vote Fair Enough
              </button>

              <button
                v-if="canVote"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="voteInappropriate(); close();"
              >
                Vote Inappropriate
              </button>
              <button
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="$router.push({name: 'UserView', params: {id: model.owner}});"
              >
                Owner profile
              </button>
            </section>
          </div>
        </div>
        <TransferCardModal
          v-show="isModalVisible"
          :card="model.id"
          @close="closeModal"
        />
        <footer class="modal__footer" />
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import CardComponent from "@/components/elements/CardComponent.vue";
import { useLastInputEvent } from '@/def-composables/useLastInputEvent.ts'
import TransferCardModal from './TransferCardModal.vue';
import { useQuery } from "@/def-composables/useQuery";
import { useAddress } from "@/def-composables/useAddress";
import { useProfilePic } from '@/def-composables/useProfilePic';

const { queryQUser, queryAllBalances } = useQuery()

export default {
  name: 'GalleryModal',
  components: { CardComponent, TransferCardModal },
  props: {
    canVote: Boolean,
    isOwner: Boolean,
    keywordDescriptions: {
      type: Array,
      default() {
        return []
      }
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    imageURL: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isModalVisible: false,
      currentPrice: -1,
      currentBid: -1,
      creditsAvailable: -1,
    }
  },
  setup() {
    const { address } = useAddress()
    const { lastInputEvent } = useLastInputEvent()
    const { getImg } = useProfilePic()

    return { userAddress: address, getImg, lastInputEvent }
  },
  watch: {
    lastInputEvent() {
      let event = this.lastInputEvent;

      if (event.which == 27) {
        this.$emit('close')
      }
    },
  },
  mounted() {
  },
  methods: {
    getUser () {
      queryQUser(this.userAddress)
      .then(user => {
        this.user = user
        this.img = this.getImg(this.user, this.userAddress)
      })
      queryAllBalances(this.userAddress)
      .then(coins => {
        this.coins = this.normalizeCoins(coins.balances)
      })
    },
    normalizeCoins(coins: Coin[]) {
      let newCoins: Coin[] = [];
      coins.forEach(coin => {
        newCoins.push(coin.normalize())
      })
      return newCoins
    },
    doNothing () {
    },
    close() {
      this.$emit('close')
    },
    download() {
      this.$emit('download')
    },
    cardview() {
      this.$emit('cardview')
    },
    edit() {
      this.$emit('edit')
    },
    voteOP() {
      this.$emit('voteOP')
    },
    voteUP() {
      this.$emit('voteUP')
    },
    voteFair() {
      this.$emit('voteFair')
    },
    voteInappropriate() {
      this.$emit('voteInappropriate')
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.getUser()
    }
  },
}
</script>

<style lang="scss">
@import "modal";

.container-flex-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1rem;
  white-space: pre-wrap;
}

.container-flex-column {
  display: flex;
  flex-direction: column;
}

.keywordTable {
  border-collapse: separate;
  border-spacing: 10px;
  color: $black;
}

.no__bottomline {
  border-bottom: initial;
}

.view__card {
  height: 50vh;
}
</style>
