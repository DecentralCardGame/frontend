<template>
  <div>
    Transfer Card

                    <div
                      class="w-[27.3rem] ml-[2.1rem] mt-3 bg-zinc-300 bg-opacity-20 shadow-inner"
                    >
                      <input
                        v-model="artistAddress"
                        class="w-full py-3 px-2 mx-3 bg-transparent text-white text-opacity-100 text-s focus:border-black border-0 border-solid focus:outline-none focus:ring-0 placeholder-white placeholder-opacity-50"
                        placeholder="Add the receiver's wallet address"
                        maxLength="41"
                      >
                    </div>

      <BaseCCButton
        :type="Color.RED"
        @click="edit()"
      >
        Edit card
      </BaseCCButton>
  </div>
</template>

<script setup lang=ts>

import { validAddress } from "@/utils/validation";
import { useTx } from "@/def-composables/useTx";
import { Color } from "@/components/utils/color";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";

const { transferCard } = useTx()

</script>

