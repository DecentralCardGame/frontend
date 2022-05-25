<template>
  <div align="center">
    <div class="ppBox">
      <img
        :src="img"
        alt="Avatar"
      >
    </div>
    <div class="dataBox ccbutton">
      <h2 class="header__h2">
        Account details
      </h2>
      Address: {{ address }}<br>
      Name: {{ user.alias }}<br>
      Council status: {{ user.councilStatus }}
      <div
        v-if="address == $store.getters['common/wallet/address']"
        style="display: inline"
      >
        <button
          v-if="user.councilStatus == 'unavailable'"
          @click="register()"
        >
          Register for council
        </button>
        <button
          v-if="user.councilStatus == 'available'"
          @click="deRegister()"
        >
          Deregister from council
        </button>
      </div>
      <br>
      Vote rights: {{ user.voteRights.length }}
      <button
        v-if="address == $store.getters['common/wallet/address']"
        @click="$router.push({name: 'Vote'})"
      >
        Vote
      </button>
      <br>
      Owned card frames: {{ user.ownedCardSchemes.length }} <br>
      Owned prototypes:
      <router-link
        :to="{ name: 'Gallery', query: { owner: address }}"
      >
        {{ user.ownedPrototypes.length }}
      </router-link> <br>
      Owned cards:
      <router-link
        :to="{ name: 'Gallery', query: { cardList: user.ownedCards }}"
      >
        {{ user.ownedCards.length }}
      </router-link> <br>
      Balance:
      <div class="coinBox">
        <div
          v-for="coin in coins"
          :key="coin"
        >
          {{ coin.amount+coin.denom }}
          <br>
        </div>
      </div>
      <button
        v-if="address == $store.getters['common/wallet/address']"
        type="button"
        class="btn"
        @click="showModal"
      >
        Transfer
      </button>
      <TransferModal
        v-show="isModalVisible"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script>

import TransferModal from '../components/modals/TransferModal.vue';

export default {
  name: 'UserView',
  components: {
    TransferModal
  },
  data () {
    return {
      isModalVisible: false,
      address: "",
      coins: [],
      img: "https://www.w3schools.com/howto/img_avatar2.png",
      user: {
        ownedCardSchemes: [],
        ownedPrototypes: [],
        ownedCards: [],
        voteRights: [],
        profileCard: 0,
      },
    }
  },
  watch: {
    "$route.params.id"(value) {
      console.log(this.$route)
      if (this.$route.name == "UserView") {
        this.init()
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let id = this.$route.params.id
      if (id === "me") {
        if (this.$store.getters["getLoggedIn"]) {
          this.address = this.$store.getters['common/wallet/address']
        } else {
          console.log("You're not logged in")
          this.$router.push({name: "NotFound"})
        }
      } else {
        this.address = id
      }

      if (! this.$cardChain.validAddress(this.address)) {
        this.$router.push({name: "NotFound"})
      }

      this.$router.push({name: "UserView", params: {id: this.address}})
      this.getUser()
      this.getImg()
    },
    getUser () {
      this.$cardChain.getUserInfo(this.address)
      .then(user => {
        console.log("received user data:", user)
        this.user = user
      })
      this.$cardChain.getAccInfo(this.address)
      .then(coins => {
        this.coins = this.normalizeCoins(coins.coins)
      })
    },
    register () {
      this.$cardChain.registerForCouncilTx().then(this.getUser)
    },
    deRegister () {
      this.$cardChain.deRegisterFromCouncilTx().then(this.getUser)
    },
    normalizeCoins(coins) {
      for (var i = 0; i<coins.length; i++) {
        if (coins[i].denom[0] == "u") {
          coins[i].denom = coins[i].denom.slice(1)
          coins[i].amount /= 10**6
        }
      }
      return coins
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.getUser()
    },
    async getImg() {
      console.log(this.user.profileCard)
      // this.user.profileCard = 178
      if (!this.user.profileCard) {
        this.img = "https://www.w3schools.com/howto/img_avatar2.png"
      } else {
        var a = await this.getCard(this.user.profileCard)
        this.img = a.image
      }
    },
    async getCard(id) {
      return this.$cardChain.getCard(id).then((res) => {
        return res
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../scss/variables";

.dataBox {
  // display: inline;
}

.ppBox {
  // display: inline;
  margin: 30px;
  img {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    box-shadow: 2px 2px 4px;
    object-fit: cover;
  };
}

.coinBox {
  display: inline-table;
  text-align: left;
}

</style>
