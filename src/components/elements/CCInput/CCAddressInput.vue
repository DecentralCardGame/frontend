<template>
  <CCInput
    v-model="inputModel"
    :max-length="41"
    placeholder="cc1.."
    :error-text="!validated && inputModel.length != 0 ? 'Invalid address': undefined"
  />
</template>
<script setup lang="ts">
import CCInput from "@/components/elements/CCInput/CCInput.vue";
import {ref, watch} from "vue";
import {validAddress} from "@/utils/validation";

const validated = defineModel<boolean>("validated", {default: false})
const inputModel = defineModel<string>({required: true})

watch(inputModel, () => {
  validated.value = validAddress(inputModel.value)
})

</script>