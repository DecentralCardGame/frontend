<template>
  <div align="center">
    <div class="ppBox">
      <img
        src="https://www.w3schools.com/howto/img_avatar2.png"
        alt="Avatar"
      >
    </div>
    <div class="dataBox">
      <h2>Account details</h2>
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
      Owned card schemes: {{ user.ownedCardSchemes.length }} <br>
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
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserView',
  data () {
    return {
      address: "",
      user: {
        ownedCardSchemes: [],
        ownedPrototypes: [],
        ownedCards: [],
        voteRights: [],
      },
    }
  },
  mounted () {
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
  },
  methods: {
    getUser () {
      this.$cardChain.getUserInfo(this.address)
      .then(user => {
        console.log("received user data:", user)
        this.user = user
      })
    },
    register () {
      this.$cardChain.registerForCouncilTx().then(this.getUser)
    },
    deRegister () {
      this.$cardChain.deRegisterFromCouncilTx().then(this.getUser)
    },
  }
}
</script>

<style scoped lang="scss">
.dataBox {
  // display: inline;
}

.ppBox {
  // display: inline;
  margin: 30px;
  img {
    border-radius: 50%;
    width: 200px;
  };
}

</style>
