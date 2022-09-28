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
              <button
                v-if="collections.length > 0 && collectionsIn.length == 0 && isOwner"
                aria-label="Close modal"
                class="addColl choice-grid__button"
                type="button"
                @click="sendAddColl"
              >
                Add to collection
                <select v-model="addCollection">
                  <option
                    v-for="coll in collections"
                    :key="coll"
                  >
                    {{ collectionNames[coll] }}
                  </option>
                </select>
              </button>
              <button
                v-if="collectionsIn.length > 0"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="sendRemoveColl"
              >
                Remove from Collection: {{ collectionNames[collectionsIn[0]] }}
              </button>
              <button
                v-if="collectionsOwned.length > 0"
                aria-label="Close modal"
                class="addColl choice-grid__button"
                type="button"
                @click="sendSetRarity"
              >
                Set rarity
                <select v-model="rarity">
                  <option
                    v-for="rar in rarities"
                    :key="rar"
                  >
                    {{ rar }}
                  </option>
                </select>
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
<script>
import CardComponent from "@/components/elements/CardComponent";
import TransferCardModal from './TransferCardModal.vue';

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
      collectionsIn: [],
      collections: [],
      collectionNames: {},
      addCollection: null,
      collectionsOwned: [],
      rarities: ["COMMON", "UNCOMMON", "RARE"],
      rarity: null,
    }
  },
  watch: {
    "$store.state.lastInputEvent": function () {
      let event = this.$store.state.lastInputEvent;

      if (event.which == 27) {
        this.$emit('close')
      }
    },
    '$store.state.common.wallet.selectedAddress': function () {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.rarity = this.model.Rarity
      if (this.$store.getters['common/wallet/address']) {
        console.log(this.model)
        this.$cardChain.getCollections("design", this.$store.getters['common/wallet/address'], this.model.id)
        .then(res => {
          console.log("In")
          this.collectionsIn = res.collectionIds
          console.log(this.collectionsIn)
        })
        this.$cardChain.getCollections("design", this.$store.getters['common/wallet/address'])
        .then(res => {
          console.log("all")
          this.collections = res.collectionIds
          console.log(this.collections)
          for (var i = 0; i<this.collections.length; i++) {
            this.$cardChain.getCollection(this.collections[i])
            .then(res => {
              this.collectionNames[res.id] = res.c.name
              console.log(this.collectionNames)
            })
          }
        })
        this.$cardChain.getCollections("design", "", this.model.id, this.$store.getters['common/wallet/address'])
        .then(res => {
          console.log("owned")
          this.collectionsOwned = res.collectionIds
          console.log(this.collectionsOwned)
        })
      }
    },
    sendAddColl() {
      if (this.addCollection) {
        this.$cardChain.addCardToCollection(this.addCollection, this.model.id)
        .then(res => {
          console.log("yesyesyes")
          this.init()
        })
      }
    },
    sendRemoveColl() {
      this.$cardChain.removeCardFromCollection(this.collectionsIn[0], this.model.id)
      .then(res => {
        console.log("yesyesyes")
        this.init()
      })
    },
     sendSetRarity() {
      if (this.rarity) {
        this.$cardChain.setCardRarity(this.model.id, this.collectionsOwned[0], this.rarity)
        .then(res => {
          console.log("yesyesyes")
          this.init()
        })
      }
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

.addColl {
  select {
    color: $black;
    background-color: lightgray;
    display: inline;
  }
}

.view__card {
  height: 50vh;
}
</style>
