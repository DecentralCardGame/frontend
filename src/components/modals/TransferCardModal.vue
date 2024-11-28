<template>
  <div>
    <p class="font-bold text-2xl">
      Transfer Card
    </p>
    <br>
    This will transfer the Card Prototype to someone else permanently
    <div
      class="w-[27.3rem] ml-[2.1rem] mt-3 bg-zinc-300 bg-opacity-20 shadow-inner"
    >
      <input
        v-model="state.recipient"
        class="w-full py-3 px-2 mx-3 bg-transparent text-white text-opacity-100 text-s focus:border-black border-0 border-solid focus:outline-none focus:ring-0 placeholder-white placeholder-opacity-50"
        placeholder="Add the receiver's wallet address"
        maxLength="41"
      >
    </div>
    <div v-if="!state.validAddress"
      class="ml-[2.1rem]">
      <br>
      ADDRESS IS INVALID
    </div>
    <div class="mt-3 ml-[2.1rem]">
      <BaseCCButton
        :type="Color.RED"
        @click="transfer()"
      >
        Transfer Card
      </BaseCCButton>
    </div>
  </div>
</template>

<script setup lang=ts>

import { validAddress } from "@/utils/validation";
import { reactive } from "vue";
import { useTx } from "@/def-composables/useTx";
import { Color } from "@/components/utils/color";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";

const { transferCard } = useTx()

const emit = defineEmits(["close"]);

const initialState: {
  recipient: string;
  validAddress: boolean;
} = {
  recipient: "",
  validAddress: true,
};

const state = reactive(initialState);

const props = withDefaults(
  defineProps<{
    card: number;
  }>(),
  {
    card: () => -1,
  },
);

const transfer = () => {
  if (validAddress(state.recipient)) {
    state.validAddress = true
    transferCard(props.card, 
                state.recipient,
                _ => {
                  emit("close");
                },
                err => {
                  console.error("Transfer failed: ", err)
                });
  }
  else {
    state.validAddress = false
  }
}

</script>