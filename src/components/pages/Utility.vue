<template>
  <div v-cloak @drop.prevent="dropIt" @dragover.prevent>

  </div>
</template>

<script>
// import * as R from 'ramda'
import $RefParser from 'json-schema-ref-parser'
import ContentContainerComponent from '@/components/ContentContainerComponent'

export default {
  name: 'Utility',
  components: {ContentContainerComponent},
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}

</script>

<style scoped>
.gallery-view {
  text-shadow: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
}
</style>
