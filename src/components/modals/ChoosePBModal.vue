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
