<template>
  <div v-cloak @drop.prevent="dropIt" @dragover.prevent>
    
  </div>
</template>

<script>
// import * as R from 'ramda'
import $RefParser from 'json-schema-ref-parser'
import { saveAs } from 'file-saver'
import ContentContainerComponent from '@/components/ContentContainerComponent'
import * as yes from '../../cardObject/schema/cardSchema.json'

export default {
  name: 'Utility',
  components: {ContentContainerComponent},
  data () {
    return {
    }
  },
  mounted () {
    $RefParser.dereference('/static/cardSchema/cardSchema.json', (err, api) => {
      if (err) {
        console.log(err)
      } else {
        
        console.log('rules: ', api)
      }
    })
    /*
    $RefParser.dereference('https://gracious-hopper-f1dfd1.netlify.com/cardSchema.json', (err, api) => {
      if (err) {
        console.log(err)
      } else {
        this.rules = api
        
        // saveAs(api, 'api.json')

        function download(content, fileName, contentType) {
          var a = document.createElement("a");
          var file = new Blob([content], {type: contentType});
          a.href = URL.createObjectURL(file);
          a.download = fileName;
          a.click();
        }
        download(JSON.stringify(api), 'cardrules.json', 'text/plain');
      }
    })
    */
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
