<template>
  <div align="center">
    <div
      class="ppBox"
    >
      <div v-show="img">
        <div class="ppImage">
          <img
            :src="img"
            alt="Avatar"
          >
        </div>
        <button
          v-if="loggedIn"
          @click="showChooseModal"
        >
          <img src="@/assets/edit.svg">
        </button>
      </div>
    </div>
    <div class="dataBox ccbutton">
      <h2 class="header__h2">
        Account details
      </h2>
      <button
        v-if="loggedIn"
        type="button"
        class="btn"
        @click="showAirdropsModal"
      >
        Claim airdrops
      </button> <br><br>

      <div>
        Address: {{ address }}<br>
        Name: {{ user.alias }}<br>  
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
        </router-link>
      </div> 
      <br>

      <div>
        Council status: {{ user.CouncilStatus }} <br>
        <div
          v-if="loggedIn"
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
      </div>

      <br>
      <div>
        Vote rights: {{ user.voteRights.length }} <br>
        <button
          v-if="loggedIn"
          @click="$router.push({name: 'Vote'})"
        >
          Vote
        </button>
      </div>
      <br>
      
      <div>
        Balance:
        <div class="coinBox">
          <div
            v-for="coin in coins"
            :key="coin"
          >
            {{ coin.pretty() }}
            <br>
          </div>
        </div>
        <br>
        <button
          v-if="loggedIn"
          type="button"
          class="btn"
          @click="showModal"
        >
          Transfer
        </button>
      </div>
      <br>
      <div>
        <button
          v-if="loggedIn"
          type="button"
          class="btn"
          @click="showGrantModal"
        >
          Manage authorisations
        </button>
      </div>
      <br>
      <TransferModal
        v-show="isModalVisible"
        @close="closeModal"
      />
      <GrantModal
        v-if="isGrantModalVisible"
        @close="closeGrantModal"
      />
      <ChoosePBModal
        v-if="isChooseModalVisible"
        :cards="user.ownedPrototypes"
        @close="closeChooseModal"
      />
      <AirdropsModal
        v-if="isAirdropsModalVisible"
        :airdrops="user.airDrops ? user.airDrops : {}"
        @close="closeAirdropsModal"
      />
    </div>
  </div>
</template>

<script lang=ts>

import TransferModal from '../components/modals/TransferModal.vue';
import ChoosePBModal from '../components/modals/ChoosePBModal.vue';
import GrantModal from '../components/modals/GrantModal.vue';
import AirdropsModal from '../components/modals/AirdropsModal.vue';
import { useAddress } from "@/def-composables/useAddress";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useQuery } from "@/def-composables/useQuery";
import { validAddress } from "@/utils/validation";
import { useTx } from "@/def-composables/useTx";
import { User } from "@/model/User";

const { queryQCard, queryQUser, queryAllBalances } = useQuery()
const { registerForCouncil, rewokeCouncilRegistration } = useTx()

export default {
  name: 'UserView',
  components: {
    GrantModal,
    TransferModal,
    ChoosePBModal,
    AirdropsModal
  },
  data () {
    return {
      isChooseModalVisible: false,
      isAirdropsModalVisible: false,
      isModalVisible: false,
      isGrantModalVisible: false,
      address: "",
      coins: [],
      img: "",
      user: new User()
    }
  },
  setup() {
    const { address } = useAddress();
    const { loggedIn } = useLoggedIn()

    return { userAddress: address, loggedIn }
  },
  watch: {
    "$route.params.id"(value) {
      console.log(this.$route)
      if (this.$route.name == "UserView") {
        this.init()
      }
    },
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let id = this.$route.params.id
      if (id === "me") {
        if (this.loggedIn) {
          this.address = this.userAddress
        } else {
          console.log("You're not logged in")
          this.$router.push({name: "NotFound"})
        }
      } else {
        this.address = id
      }

      if (!validAddress(this.address)) {
        this.$router.push({name: "NotFound"})
      }

      this.$router.push({name: "UserView", params: {id: this.address}})
      this.getUser()
    },
    getUser () {
      queryQUser(this.address)
      .then(user => {
        this.user = user
        this.getImg()
      })
      queryAllBalances(this.address)
      .then(coins => {
        this.coins = this.normalizeCoins(coins.balances)
      })
    },
    register () {
      registerForCouncil(this.getUser, () => {})
    },
    deRegister () {
      rewokeCouncilRegistration(this.getUser, () => {})
    },
    normalizeCoins(coins) {
      let newCoins = [];
      coins.forEach(coin => {
        newCoins.push(coin.normalize())
      })
      return newCoins
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.getUser();
    },
    showGrantModal() {
      this.isGrantModalVisible = true;
    },
    closeGrantModal() {
      this.isGrantModalVisible = false;
    },
    showChooseModal() {
      this.isChooseModalVisible = true;
    },
    closeChooseModal() {
      this.isChooseModalVisible = false;
      this.getUser()
    },
    showAirdropsModal() {
      this.isAirdropsModalVisible = true;
    },
    closeAirdropsModal() {
      this.isAirdropsModalVisible = false;
    },
    getDefaultImg() {
      let myRandom = this.address.charCodeAt(this.address.length-1) % 4
      return "Avatar"+myRandom+".png"
    },
    async getImg() {
      if (this.user.profileCard != 0) {
        let a = await this.getCard(this.user.profileCard)
        if (a === null) {
          this.img = this.getDefaultImg()
        } else {
          this.img = a.image
        }
      } else {
        this.img = this.getDefaultImg()
      }
    },
    async getCard(id) {
      return queryQCard(id)
      .then(card => {
        return card
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
  height: 200px;
  .ppImage {
    height: 200px;
    width: 200px;
    overflow: hidden;
    display: block;
    border-radius: 50%;
    box-shadow: 2px 2px 4px;
    img{
      background-color: transparent;
      object-fit: contain;
      padding-top: -10%;
      width: 100%;
    };
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
