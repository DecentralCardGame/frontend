<template>
  <transition name="modal-fade">
    <div class="modal__backdrop" style="z-index: 1000">
      <div
        aria-describedby="modalDescription"
        aria-labelledby="modalTitle"
        class="modal"
        role="dialog"
      >
        <header id="modalTitle" class="modal__header">
          <slot name="header"> Choose profile card</slot>
          <button
            aria-label="Close modal"
            type="button"
            class="btn--close"
            @click="close"
          >
            x
          </button>
        </header>
        <div class="modal__body input--transfer">
          <div v-for="obj in state.images" :key="obj" class="sppBox">
            <img :src="obj.img" @click="send(obj.id)" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useUser } from "@/def-composables/useUser";
import { useTx } from "@/def-composables/useTx";
import type { Card } from "@/model/Card";
import { onMounted, reactive } from "vue";
import { useCards } from "@/def-composables/useCards";

const { setProfileCard } = useTx();
const { queryUser } = useUser();
const { getCard } = useCards()
const emit = defineEmits(["close"]);

class Pic {
  id: number;
  img: string;

  constructor(id: number, img: string) {
    this.id = id;
    this.img = img;
  }
}

const props = withDefaults(
  defineProps<{
    cardIds: number[];
  }>(),
  {
    cardIds: () => [],
  }
);

const initialState: {
  images: Array<Pic>;
} = {
  images: new Array<Pic>(),
};

const state = reactive(initialState);

onMounted(() => {
  props.cardIds.map(id => loadCard(id))
})

const loadCard = (id: number) => {
  getCard(id).then((card: Card) => {
    if (["permanent", "trial"].includes(card.status)) {
      state.images.push(new Pic(id, card.image));
    }
  });
}

const close = () => emit("close")

const send = (id: number) => {
  setProfileCard(
    id,
    (res) => {
      queryUser();
      close();
    },
    console.log
  );
}
</script>

<style lang="scss">
@import "modal";

.input--transfer {
  input {
    padding: 0;
    margin-right: 2px;
    display: inline;
    color: $black;
    text-align: right;
    background-color: lightgray;
  }

  select {
    color: $black;
    background-color: lightgray;
    display: inline;
  }
}

.sppBox {
  margin: 10px;
  height: 150px;
  width: 150px;
  overflow: hidden;
  display: inline-block;
  border-radius: 50%;
  box-shadow: 2px 2px 4px;

  img {
    background-color: transparent;
    object-fit: contain;
    padding-top: -10%;
    width: 100%;
    cursor: pointer;
  }
}

.sppBox:hover {
  box-shadow: 4px 4px 8px;
}

.warning {
  color: red;
}
</style>
