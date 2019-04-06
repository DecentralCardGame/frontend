<template>
  <content-container-component>
    <h2>Gallery</h2>
    <div class="gallery-view">
      <card-component/>
      <card-component/>
      <card-component/>
      <card-component/>
      <card-component/>
      <card-component/>
      <card-component/>
      <card-component/>
      <card-component/>
      <card-component/>
      <card-component/>
      <card-component/>
    </div>
  </content-container-component>
</template>

<script>
import ContentContainerComponent from '@/components/ContentContainerComponent'
import CardComponent from '@/components/CardComponent'
export default {
  name: 'GalleryPage',
  components: {CardComponent, ContentContainerComponent}
}
</script>

<style scoped>
.gallery-view {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  height: 50vh;
  overflow-y: scroll;
}
</style>
