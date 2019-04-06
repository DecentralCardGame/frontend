<template>
  <div class="content">
    <span class="lt"></span><span class="rt"></span><span class="rb"></span><span class="lb"></span>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'ContentContainerComponent'
}
</script>

<style scoped>
.content {
  background-color: rgb(0, 58, 86);
  position: relative;
  padding: 1em;
}
</style>
