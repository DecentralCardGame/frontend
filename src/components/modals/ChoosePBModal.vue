<template>
  <ModalFrame
    heading="Choose Profile Card"
    class="max-w-[100rem]"
    @close="emit('close')"
  >
    <div class="overflow-y-auto flex flex-wrap gap-8 max-h-[50rem] m-16">
      <ProfilePicComponent
        v-for="obj in state.images"
        :key="obj.id"
        :src="obj.img"
        size="40"
        :class="
          ['w-40', 'h-40'].concat(
            obj.id == state.choosen ? ['border-cc-red', 'border-8'] : []
          )
        "
        :alt="'Pic' + obj.id"
        @click="choose(obj.id)"
      />
    </div>
    <BaseCCButton
      :type="ButtonType.RED"
      @click="send"
      class="mx-auto text-center"
      >Save</BaseCCButton
    >
  </ModalFrame>
</template>

<script setup lang="ts">
import { useAddress } from "@/def-composables/useAddress";
import { useUser } from "@/def-composables/useUser";
import { useTx } from "@/def-composables/useTx";
import { useProfilePic } from "@/def-composables/useProfilePic";
import type { Card } from "@/model/Card";
import { onMounted, reactive } from "vue";
import { useCards } from "@/def-composables/useCards";
import ModalFrame from "@/components/modals/ModalFrame.vue";
import ProfilePicComponent from "@/components/elements/ProfilePicComponent.vue";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";

const { address } = useAddress()
const { getDefaultImg } = useProfilePic()
const { setProfileCard } = useTx();
const { queryUser } = useUser();
const { getCard } = useCards();
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
    current: number;
  }>(),
  {
    cardIds: () => [],
    current: 0,
  }
);

const initialState: {
  images: Array<Pic>;
  choosen: number;
} = {
  images: [new Pic(0, getDefaultImg(address.value))],
  choosen: 0,
};

const state = reactive(initialState);

onMounted(async () => {
  state.choosen = props.current;
  console.log("choosen " + state.choosen);
  props.cardIds.forEach((id) => loadCard(id));
});

const loadCard = (id: number) => {
  getCard(id).then((card: Card) => {
    if (["permanent", "trial"].includes(card.status)) {
      state.images.push(new Pic(id, card.image));
    }
  });
};

const close = () => emit("close");

const choose = (id: number) => {
  state.choosen = id;
};

const send = () => {
  setProfileCard(
    state.choosen,
    (res) => {
      queryUser();
      close();
    },
    console.log
  );
};
</script>
