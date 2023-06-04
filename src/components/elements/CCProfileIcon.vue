<template>
  <div class="ppImage">
    <img :src="state.pic" alt="Avatar">
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, type Ref } from "vue";
import { useAddress } from '@/def-composables/useAddress';
import { useQuery } from "@/def-composables/useQuery";
import { useProfilePic } from "@/def-composables/useProfilePic";

interface State {
  pic: Ref<string>
}

const initialState: State = {
  pic: ref("")
}

const state = reactive(initialState);

const { address } = useAddress()
const { queryQCard, queryQUser, queryAllBalances } = useQuery()
const { getImg } = useProfilePic()

onMounted(() => {
  queryQUser(address.value)
    .then(user => {
      state.pic = getImg(user, address.value)
    })
});

</script>

<style scoped lang="scss">

.ppImage {
    height: 30px;
    width: 30px;
    overflow: hidden;
    display: block;
    border-radius: 50%;
    img{
      background-color: transparent;
      object-fit: contain;
      padding-top: -10%;
      width: 100%;
    };
  };

</style>