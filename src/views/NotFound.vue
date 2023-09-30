<template>
  <div class="article-temp width-temp">
    <div align="center">
      <h1>404</h1>
      <a>Page not found, return to where you came from!</a>
    </div>
  </div>
</template>

<script lang=ts>

export default {
  name: "NotFound",
  data() {
    return {};
  },
  mounted() {
    this.$router.push({ path: 'NotFound' })
  },
};
</script>
