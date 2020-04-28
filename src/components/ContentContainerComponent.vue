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

<style scoped lang="scss">
.content {
  background-color: transparent;
  position: relative;
  padding: 1em;

  @media (max-width: 480px) {
    padding: 1em 0;
  }
}
</style>
