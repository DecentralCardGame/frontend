<template>
  <div class="card-generator-container">
    <content-container-component class="main-container">
      <label>
        <b>Card Name: </b>
        <input type="text" v-model="cardname" placeholder="Enter Cards Name" name="cardname" required>
      </label><br><br>
      <label>
        <b>Casting Costs: </b>
        <input type="number" v-model="castcosts" placeholder="Enter Casting Costs" name="castcosts" required>
      </label><br><br>
      <label>
        <b>Upload Image: </b>
      </label><br><br>
      <label>
        <b>Card Rulings: </b>
        <input type="text" v-model="rulings" placeholder="Enter Card Rulings" name="rulings" required>
      </label><br><br>
      <label>
        <b>Flavor Text: </b>
        <input type="text" v-model="cardtext" placeholder="Enter Flavor Text" name="cardtext" required>
      </label>
    </content-container-component>
    <content-container-component class="sidebar-container">
      <label>
        <b>Card Tags: </b>
        <input type="text" v-model="cardtags" placeholder="Enter Card Tags" name="cardtags" required>
      </label>
      <label>
        <b>Authors Notes: </b>
        <input type="text" v-model="cardtags" placeholder="Enter Authors Notes" name="cardtags" required>
      </label>
      <button>Submit</button>
    </content-container-component>
  </div>
</template>

<script>
import axios from 'axios'
import ContentContainerComponent from '@/components/ContentContainerComponent'
export default {
  name: 'NewCardPage',
  components: {ContentContainerComponent},
  data () {
    return {
      generatedContent: '',
      cardID: 0
    }
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
