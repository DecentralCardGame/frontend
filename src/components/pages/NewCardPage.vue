<template>
  <div class="card-generator-container">
    <content-container-component class="main-container">
      <ncform :form-schema="formSchema" form-name="your-form-name" v-model="formSchema.value" @submit="submit()"></ncform>
    </content-container-component>
    <content-container-component class="sidebar-container">
    </content-container-component>
  </div>
</template>

<script>
import axios from 'axios'
import ContentContainerComponent from '@/components/ContentContainerComponent'
import $RefParser from 'json-schema-ref-parser'

export default {
  name: 'NewCardPage',
  components: {ContentContainerComponent},
  data () {
    return {
      generatedContent: '',
      cardID: 0,
      formSchema: {
        type: 'object',
        properties: {
          cardName: {
            type: 'string'
          },
          castingCosts: {
            type: 'number'
          },
          rulings: {
            type: 'text'
          },
          flavor: {
            type: 'text'
          },
          tags: {
            type: 'text'
          },
          notes: {
            type: 'text'
          }
        }
      }
    }
  },
  mounted () {
    $RefParser.dereference('http://localhost:8000/cardschema.json', (err, api) => {
      if (err) {
        console.log(err)
      } else {
        console.log(api)
      }
    })
  },
  methods: {
    register () {
      axios.post(
        this.apiURL + '/cardservice/save_card_content',
        {
          'base_req': {
            'from': 'globally fetched users key',
            'chain_id': this.chainID,
            'sequence': '2',
            'account_number': '0',
            'gas': 'auto',
            'gas_adjustment': '1.5'
          },
          'owner': 'globally fetched users key',
          'content': this.generatedContent,
          'cardid': this.cardID
        }).then(response => (this.cards = response.data))
    }
  }
}
</script>

<style scoped>
  input[type="text"], input[type="password"] {
    background-color: transparent;
    border: 1px solid rgb(0, 108, 161);
    padding: 0.5em;
    margin: 0.5em 0 0.5em;
  }
  button {
    background-color: rgb(0, 108, 161);
    border: none;
    width: 100%;
    cursor: pointer;
    padding: 1em;
  }
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
