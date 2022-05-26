<template>
  <div align="center">
    <div class="ppBox">
      <img
        class="ppImage"
        :src="img"
        alt="Avatar"
      >
      <button
        v-if="loggedinHere"
        @click="showChooseModal"
      >
        <img src="https://www.flaticon.com/svg/vstatic/svg/3917/3917651.svg?token=exp=1653516419~hmac=d1e0938182326647cdb5377a31e784f5">
      </button>
    </div>
    <div class="dataBox ccbutton">
      <h2 class="header__h2">
        Account details
      </h2>
      Address: {{ address }}<br>
      Name: {{ user.alias }}<br>
      Council status: {{ user.CouncilStatus }}
      <div
        v-if="loggedinHere"
        style="display: inline"
      >
        <button
          v-if="user.CouncilStatus == 'unavailable'"
          @click="register()"
        >
          Register for council
        </button>
        <button
          v-if="user.CouncilStatus == 'available'"
          @click="deRegister()"
        >
          Deregister from council
        </button>
      </div>
      <br>
      Vote rights: {{ user.voteRights.length }}
      <button
        v-if="loggedinHere"
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
        {{ user.cards.length }}
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
        v-if="loggedinHere"
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
      <ChoosePBModal
        v-if="isChooseModalVisible"
        :cards="user.ownedPrototypes"
        @close="closeChooseModal"
      />
    </div>
  </div>
</template>

<script>

import TransferModal from '../components/modals/TransferModal.vue';
import ChoosePBModal from '../components/modals/ChoosePBModal.vue';

export default {
  name: 'UserView',
  components: {
    TransferModal,
    ChoosePBModal,
  },
  data () {
    return {
      loggedinHere: false,
      isChooseModalVisible: false,
      isModalVisible: false,
      address: "",
      coins: [],
      img: "https://www.w3schools.com/howto/img_avatar2.png",
      user: {
        ownedCardSchemes: [],
        ownedPrototypes: [],
        cards: [],
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
    },
    '$store.state.common.wallet.selectedAddress': function () {
      this.loggedinHere = (this.address == this.$store.getters['common/wallet/address'])
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

      this.loggedinHere = (this.address == this.$store.getters['common/wallet/address'])

      if (! this.$cardChain.validAddress(this.address)) {
        this.$router.push({name: "NotFound"})
      }

      this.$router.push({name: "UserView", params: {id: this.address}})
      this.getUser()
    },
    getUser () {
      this.$cardChain.getUserInfo(this.address)
      .then(user => {
        console.log("received user data:", user)
        this.user = user
        this.getImg()
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
    showChooseModal() {
      this.isChooseModalVisible = true;
    },
    closeChooseModal() {
      this.isChooseModalVisible = false;
      this.getUser()
    },
    async getImg() {
      console.log(this.user.profileCard)
      if (this.user.profileCard == 0) {
        var myRandom = this.address.charCodeAt(this.address.length-1) % 4
        console.log("random", myRandom)
        this.img = "Avatar"+myRandom+".png"
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
  position: relative;
  width: 200px;
  .ppImage {
    border-radius: 50%;
    height: 200px;
    width: 200px;
    box-shadow: 2px 2px 4px;
    object-fit: cover;
  };
  button {
    position: absolute;
    top: 80%;
    left: 80%;
    height: 15%;
    width: 15%;
    padding: 2px;
    border-radius: 6px;
    border-color: $white;
    background-color: $white;
    cursor: pointer;
    img {
      width: 100%;
      margin: 0;
    }
  }
}

.coinBox {
  display: inline-table;
  text-align: left;
}

</style>
