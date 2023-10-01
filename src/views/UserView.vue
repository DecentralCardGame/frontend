<template>
  <div align="center">
    <div class="ppBox">
      <div v-show="state.img">
        <div class="ppImage">
          <img :src="state.img"/>
        </div>
        <button v-if="state.userIsUser" @click="showChooseModal">
          <img src="@/assets/edit.svg" />
        </button>
      </div>
    </div>
    <div class="dataBox ccbutton">
      <h2 class="header__h2">Account details</h2>
      <button
        v-if="state.userIsUser"
        type="button"
        class="btn"
        @click="showAirdropsModal"
      >
        Claim airdrops
      </button>
      <br /><br />

      <div>
        Address: {{ state.addr }}<br />
        Name: {{ state.user.alias }}<br />
        Owned card frames: {{ state.user.ownedCardSchemes.length }} <br />
        Owned prototypes:
        <router-link :to="{ name: 'Gallery', query: { owner: state.addr } }">
          {{ state.user.ownedPrototypes.length }}
        </router-link>
        <br />
        Owned cards:
        <router-link
          :to="{ name: 'Gallery', query: { cardList: state.user.cards } }"
        >
          {{ state.user.cards.length }}
        </router-link>
      </div>
      <br />

      <div>
        Council status: {{ state.user.CouncilStatus }} <br />
        <div v-if="state.userIsUser" style="display: inline">
          <button
            v-if="state.user.CouncilStatus == 'unavailable'"
            @click="register()"
          >
            Register for council
          </button>
          <button
            v-if="state.user.CouncilStatus == 'available'"
            @click="deRegister()"
          >
            Deregister from council
          </button>
        </div>
      </div>

      <br />
      <div>
        Vote rights: {{ state.user.voteRights.length }} <br />
        <button v-if="state.userIsUser" @click="$router.push({ name: 'Vote' })">
          Vote
        </button>
      </div>
      <br />

      <div>
        Balance:
        <div class="coinBox">
          <div v-for="coin in state.coins" :key="coin">
            {{ coin.pretty() }}
            <br />
          </div>
        </div>
        <br />
        <button v-if="state.userIsUser" type="button" class="btn" @click="showModal">
          Transfer
        </button>
      </div>
      <br />
      <div>
        <button
          v-if="state.userIsUser"
          type="button"
          class="btn"
          @click="showGrantModal"
        >
          Manage authorisations
        </button>
      </div>
      <br />
      <TransferModal v-show="state.isModalVisible" @close="closeModal" />
      <GrantModal v-if="state.isGrantModalVisible" @close="closeGrantModal" />
      <ChoosePBModal
        v-if="state.isChooseModalVisible"
        :cards="state.user.ownedPrototypes"
        @close="closeChooseModal"
      />
      <AirdropsModal
        v-if="state.isAirdropsModalVisible"
        :airdrops="state.user.airDrops ? state.user.airDrops : {}"
        @close="closeAirdropsModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TransferModal from "../components/modals/TransferModal.vue";
import ChoosePBModal from "../components/modals/ChoosePBModal.vue";
import GrantModal from "../components/modals/GrantModal.vue";
import AirdropsModal from "../components/modals/AirdropsModal.vue";
import { useAddress } from "@/def-composables/useAddress";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useQuery } from "@/def-composables/useQuery";
import { validAddress } from "@/utils/validation";
import { useTx } from "@/def-composables/useTx";
import { User } from "@/model/User";
import { useProfilePic } from "@/def-composables/useProfilePic";
import type { Coin } from "@/model/Coin";
import { normalizeCoins } from "@/utils/utils";
import { computed, type ComputedRef, onMounted, reactive, type Ref, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUser } from "@/def-composables/useUser";

const { queryQUser, queryAllBalances } = useQuery();
const { registerForCouncil, rewokeCouncilRegistration } = useTx();
const { address } = useAddress();
const { loggedIn } = useLoggedIn();
const { getImg } = useProfilePic();
const { user, coins, queryCoins, queryUser } = useUser();
const { loggedInProfilePic } = useProfilePic()
const route = useRoute();
const router = useRouter();

const initialState: {
  isChooseModalVisible: boolean;
  isAirdropsModalVisible: boolean;
  isModalVisible: boolean;
  isGrantModalVisible: boolean;
  addr: string;
  user: User;
  coins: Array<Coin>;
  userIsUser: ComputedRef<boolean>
  img: string
} = {
  isChooseModalVisible: false,
  isAirdropsModalVisible: false,
  isModalVisible: false,
  isGrantModalVisible: false,
  addr: "",
  user: new User(),
  coins: new Array<Coin>(),
  userIsUser: computed(() => loggedIn.value && state.addr == address.value),
  img: "jaja",
};

const state = reactive(initialState);

watch(user, (val) => {
  if (state.userIsUser) state.user = val;
});
watch(coins, (val) => {
  if (state.userIsUser) state.coins = normalizeCoins(val);
});
watch(loggedInProfilePic, (val) => {
  if (state.userIsUser) state.img = val;
})

const init = () => {
  let id = route.params.id.toString();
  if (id === "me") {
    if (loggedIn.value) {
      state.addr = address.value;
    } else {
      console.log("You're not logged in");
      router.push({ name: "NotFound" });
    }
  } else {
    state.addr = id;
  }

  if (state.userIsUser) {
    state.user = user.value;
    state.coins = normalizeCoins(coins.value);
    state.img = loggedInProfilePic.value
  }

  if (!validAddress(state.addr)) {
    router.push({ name: "NotFound" });
  }

  router.push({ name: "UserView", params: { id: state.addr } });
  getUser();
  getCoins();
};

onMounted(init)

const getUser = () => {
  if (state.userIsUser) {
    queryUser();
  } else {
    queryQUser(state.addr).then((user) => {
      state.user = user;
      getImg(state.user, state.addr).then(img => {
        state.img = img
      });
    });
  }
};

const getCoins = () => {
  if (state.userIsUser) {
    queryCoins();
  } else {
    queryAllBalances(state.addr).then((coins) => {
      state.coins = normalizeCoins(coins.balances);
    });
  }
};

const register = () => registerForCouncil(getUser, console.log);
const deRegister = () => rewokeCouncilRegistration(getUser, console.log);
const showModal = () => {
  state.isModalVisible = true;
};
const closeModal = () => {
  state.isModalVisible = false;
  getCoins();
};
const showGrantModal = () => {
  state.isGrantModalVisible = true;
};
const closeGrantModal = () => {
  state.isGrantModalVisible = false;
};
const showChooseModal = () => {
  state.isChooseModalVisible = true;
};
const closeChooseModal = () => {
  state.isChooseModalVisible = false;
  getUser();
};
const showAirdropsModal = () => {
  state.isAirdropsModalVisible = true;
};
const closeAirdropsModal = () => {
  state.isAirdropsModalVisible = false;
};
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

    img {
      background-color: transparent;
      object-fit: contain;
      padding-top: -10%;
      width: 100%;
    }
  }
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