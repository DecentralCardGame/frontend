<template>
  <header>
    <div class="loading-container">
      <img src="logo.svg" class="image1" alt="Loading..." width="500">
      <img src="sparkling_water.gif" class="image2" alt="Loading..." width="1200">
    </div>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
    computed: {
    },
    mounted () {
    },
    methods: {
    }
}
</script>

<style scoped lang="scss">
  @import "../../assets/styles/variables";

  header {
    padding: 10vh;
  }
  .loading-container {
      position: relative;
      flex-flow: column;
      display: flex;
      align-items: center;
      justify-content: center;
  }

  .image1 {
    position: relative;
    z-index: 3;
    max-width: 95vw;
  }
  .image2 {
    position: absolute;
    z-index: 1;
    max-width: 95vw;
  }
</style>
