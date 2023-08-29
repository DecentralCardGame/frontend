<template>
  <div class="flex justify-between items-center px-10 py-10 bg-black">
    <div>
      <router-link to="/">
        <img alt="Crowd Control" src="../../assets/logo-new.svg" width="50">
      </router-link>
    </div>
    <div class="flex items-center">
      <div class="bg-red-100 uppercase px-8 py-2 cursor-pointer mr-10">Download GAMECLIENT</div>
      <div class="cursor-pointer flex items-center">
        <div>
          <img alt="user" src="../../assets/svg/profile-user-white.svg" width="30">
        </div>
        <div class="uppercase ml-2">LOGIN / SIGN UP</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PageTopMenu',
  data() {
    return {
    }
  },
  setup() {
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style scoped lang="scss"></style>
