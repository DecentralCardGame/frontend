<template>
  <div class="card-generator-container">
    <content-container-component class="main-container">
      <p>Card Name</p>
      <p>Casting Costs</p>
      <p>Upload Image</p>
      <p>Card Rulings</p>
      <p>Flavor Text</p>
    </content-container-component>
    <content-container-component class="sidebar-container">
      <p>Card Tags</p>
      <p>Authors Notes</p>
      <button>Submit</button>
    </content-container-component>
  </div>
</template>

<script>
import ContentContainerComponent from '@/components/ContentContainerComponent'
export default {
  name: 'NewCardPage',
  components: {ContentContainerComponent}
}
</script>

<style scoped>
.card-generator-container {
  display: grid;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "main sidebar";
}
  .main-container {
    grid-area: main;
    background-color: rgb(0, 58, 86);
  }
  .sidebar-container {
    grid-area: sidebar;
    background-color: rgb(0, 58, 86);
  }
</style>
