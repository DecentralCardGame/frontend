<template>
  <div>
    <h2>Card Voting</h2>
    <div class="voter">
      <vue-swing
        @throwoutup="vote(1, 'fair_enough')"
        @throwoutright="vote(1, 'overpowered')"
        @throwoutleft="vote(1, 'underpowered')"
        :config="config"
        class="card"
      >
        <div class="box">
          <CardComponent  v-bind:model="sampleCard" v-bind:active-step="3"></CardComponent>
        </div>
      </vue-swing>
    </div>
  </div>
</template>

<script>
import CardComponent from '../CardComponent'
import VueSwing from 'vue-swing'
import axios from 'axios'

// eslint-disable-next-line no-unused-vars
import { signTx } from 'signcosmostx/signStuff'

export default {
  name: 'VotingPage',
  components: {CardComponent},
  data () {
    return {
      cards: [],
      config: {
        allowedDirections: [
          VueSwing.Direction.UP,
          VueSwing.Direction.DOWN,
          VueSwing.Direction.LEFT,
          VueSwing.Direction.RIGHT
        ],
        minThrowOutDistance: 250,
        maxThrowOutDistance: 300
      },
      sampleCard: {
        name: 'Name',
        description: '',
        ability: '',
        notes: '',
        article: 'the',
        surname: 'Surname',
        type: 'No Type',
        tags: [],
        cost: {
          lumber: 0,
          food: 0,
          iron: 0,
          mana: 0,
          energy: 0,
          generic: 0
        },
        ticks: 0,
        defense: 0,
        attack: 0
      }
    }
  },
  mounted () {
    axios.get('http://78.46.200.30/cardservice/votable_cards/' + localStorage.cosmosAddress)
      .then(res => (console.log(res)))
  },
  methods: {
    vote (cardid, type) {
      console.log('THROWOUT')

      axios.get('http://78.46.200.30/auth/accounts/' + JSON.parse(localStorage.keyPair).address)
        .then(userdata => {
          console.log(userdata)
          axios.put(
            'http://78.46.200.30/cardservice/vote_card',
            {
              'base_req': {
                'from': JSON.parse(localStorage.keyPair).address,
                'chain_id': 'testCardchain',
                'gas': 'auto',
                'gas_adjustment': '1.5'
              },
              'voter': JSON.parse(localStorage.keyPair).address,
              'votetype': type,
              'cardid': '' + cardid
            }).then(response => {
            let signed = signTx(response.data, JSON.parse(localStorage.keyPair).secret, 'testCardchain', userdata.data.value.account_number, userdata.data.value.sequence)

            console.log(signed)

            axios.post('http://78.46.200.30/txs', {
              'tx': signed.value,
              'mode': 'block'
            }).then(response => {
              console.log(response)
            })
          })
        })
    }
  }
}
</script>

<style scoped>
.box {
  position: absolute;
}
.voter {
  min-height: 100vh;
}
vue-swing {
  min-height: 100vh;
}
</style>
