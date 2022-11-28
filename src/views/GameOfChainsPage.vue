<template>
  <div class="article-temp width-temp">
    <div class="hero">
      <h1>Game of Chains 2022</h1>
    </div>
    <img
      src="../assets/misc/goc.png"
      class="image"
    >
    <div>
      enter address
      <input
        v-model="address"
        @change="updateAddress"
      >
    </div>
    <div>
      count: {{ count }}
    </div>
    <div>
      <table class="txTable">
        <tbody>
          <tr
            v-for="(tx, index) in txs"
            :key="index"
          >
            <th scope="row">
              <b> {{ tx.HEIGHT }} </b>
            </th>
            <td> - {{ tx.CHAINID }}</td>
            <td> - {{ tx.TXHASH }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script> 
import axios from 'axios'

export default {
  name: 'GameOfChainsPage',
  data () {
    return {
      address: "cosmos1ra2l6ftxenajvzx0asa3d3e8w7a9sxrjw0jyq7",
      count: 0,
      txs: []
    }
  },
  mounted () {
    this.getTxs(this.address)
    this.getCount(this.address)            
  },
  methods: {
    updateAddress () {
      this.getTxs(this.address)
      this.getCount(this.address)   
    },
    getTxs(address) {
      this.$goc.get('/txs?address='+address,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .catch(err => {
        console.error(err)
        this.txs = []
        this.count = "invalid address"
      })
      .then(res => {
        this.txs = res.data.tx_data
      })
    },
    getCount(address) {
      this.$goc.get('/count?address='+address,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .catch(err => {
        console.error(err)
        this.txs = []
        this.count = "invalid address"
      })
      .then(res => {
        this.count = res.data.count_relayed_packets 
      })
    } 
  }
}
</script>

<style scoped>
.image {
  width: 400px;
  position: relative;
  overflow: hidden;
}
.txTable {
  border-collapse: separate;
  border-spacing: 10px;
  color: $black;
}

</style>
