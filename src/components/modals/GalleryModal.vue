<template>
  <transition name="modal-fade">
    <div class="modal__backdrop">
      <div
        aria-describedby="modalDescription"
        aria-labelledby="modalTitle"
        class="modal"
        role="dialog"
      >
        <header id="modalTitle" class="modal__header">
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
            <div v-show="keywordDescriptions.length" class="modal__body">
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

            <section id="modalDescription" class="modal__body choice-grid">
              <router-link :to="{ path: '/cardview/' + model.id }">
                <button
                  aria-label="Close modal"
                  class="choice-grid__button"
                  type="button"
                >
                  Advanced Card Info
                </button>
              </router-link>
              <button
                v-if="isArtist && !isOwner"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="
                  edit();
                  close();
                "
              >
                Edit artwork
              </button>
              <button
                v-if="isOwner"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="
                  edit();
                  close();
                "
              >
                Edit card
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
                @click="vote(VoteType.underpowered)"
              >
                Vote Underpowered
              </button>

              <button
                v-if="canVote"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="vote(VoteType.overpowered)"
              >
                Vote Overpowered
              </button>

              <button
                v-if="canVote"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="vote(VoteType.fairEnough)"
              >
                Vote Fair Enough
              </button>

              <button
                v-if="canVote"
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="vote(VoteType.inappropriate)"
              >
                Vote Inappropriate
              </button>
              <button
                aria-label="Close modal"
                class="choice-grid__button"
                type="button"
                @click="
                  $router.push({
                    name: 'UserView',
                    params: { id: model.owner },
                  })
                "
              >
                Owner profile
              </button>
            </section>
          </div>
        </div>
        <TransferCardModal
          v-show="state.isModalVisible"
          :card="model.id.toString()"
          @close="closeModal"
        />
        <footer class="modal__footer" />
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import CardComponent from "@/components/elements/CardComponent.vue";
import { useLastInputEvent } from "@/def-composables/useLastInputEvent";
import TransferCardModal from "./TransferCardModal.vue";
import { useUser } from "@/def-composables/useUser";
import { Card } from "@/model/Card";
import { computed, reactive, watch } from "vue";
import { useVoting } from "@/def-composables/useVoting";
import { VoteType } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/voting";

const { add, send, isEmpty, cardsLeft, current } = useVoting();
const { lastInputEvent } = useLastInputEvent();
const { queryCoins, queryUser } = useUser();

const emit = defineEmits(["close", "cardview", "edit"]);

const props = withDefaults(
  defineProps<{
    isOwner: boolean;
    isArtist: boolean;
    keywordDescriptions: Array<Array<string>>;
    model: Card;
    imageURL: string;
  }>(),
  {
    isOwner: false,
    isArtist: false,
    keywordDescriptions: () => [],
    model: () => new Card(),
    imageURL: "",
  }
);

const initialState: {
  isModalVisible: boolean;
} = {
  isModalVisible: false,
};

const canVote = computed(() => cardsLeft.value.includes(Number(props.model.id)))

const state = reactive(initialState);

watch(lastInputEvent, (event) => {
  if (event.which == 27) {
    emit("close");
  }
});

const close = () => emit("close");
const cardview = () => emit("cardview");
const edit = () => emit("edit");

const vote = (type: VoteType) => {
  add(props.model.id, type);
  send(
    () => {
    },
    (err) => {
      console.log(err);
    }
  );
  close();
};
const showModal = () => {
  state.isModalVisible = true;
};
const closeModal = () => {
  state.isModalVisible = false;
  queryUser();
  queryCoins();
};
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
