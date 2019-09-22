<template>
  <div class="card-generator-container">
    <div class="progress">
      <div class="progress-item">Name, Type, Tags and Rarity</div>
      <div class="progress-item">Costs and Properties</div>
      <div class="progress-item">Rulings and Abilities</div>
      <div class="progress-item">Style, Flavor and Notes</div>
      <div class="progress-item">Summary and Publish</div>
    </div>
    <div class="creator">
      <p>Hey, my Name is
        <input value="Card Name">
        and I am the
        <select>
          <option>the</option>
          <option>a</option>
        </select>
        <input value="Surname">.
        My type is
        <select>
          <option v-for="type in rules.oneOf" v-bind:key="type.required[0]">{{ type.required[0] }}</option>
        </select>.<br>
        People like to tag me as ...<br>
        <select>
          <option>Legendary</option>
        </select>
        is my rarity.
      </p>
    </div>
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
      rules: {},
      cardID: 0
    }
  },
  mounted () {
    $RefParser.dereference('http://localhost:8000/cardSchema.json', (err, api) => {
      if (err) {
        console.log(err)
      } else {
        this.rules = api
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
  input {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid white;
    color: white;
    font-size: 1em;
    font-family: "Museo", sans-serif;
  }

  select {
    background-color: transparent;
    border: 2px solid white;
    font-size: 1em;
    color: white;
    font-family: "Museo", sans-serif;
  }

  .creator {
    text-shadow: none;
  }

  .progress {
    display: flex;
    font-size: 0.6em;
    text-shadow: none;
  }
  .progress-item {
    margin: 0.3em;
    border: 4px solid white;
    padding: 0.2em;
    transform: skewX(-15deg);
  }
</style>
