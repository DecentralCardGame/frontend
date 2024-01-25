<template>
  <div
    class="flex bg-black text-white md:space-x-24 justify-center md:px-16 py-16 max-md:flex-wrap"
  >
    <div class="text-center">
      <h1 class="md:hidden text-5xl font-bold pb-12">
        {{ heading }}
      </h1>
      <div class="py-24">
        <div class="mx-auto h-64 w-64 relative group">
          <ProfilePicComponent :src="state.img" size="64" alt="Profile pic" />
          <button
            v-if="state.userIsUser"
            @click="showChooseModal"
            class="absolute top-0 left-0 right-0 bottom-0 m-auto w-10 invisible group-hover:visible"
          >
            <img :src="editImg" alt="edit" class="hover:drop-shadow-md" />
          </button>
        </div>
      </div>
      <UserViewHeadingContainer>
        <template v-slot:heading>Council status</template>
        <template v-slot:body>
          <p>{{ user.CouncilStatus }}</p>
          <BaseCCButton
            :type="ButtonType.YELLOW"
            v-if="state.userIsUser"
            @click="
              state.user.CouncilStatus == 'unavailable'
                ? register()
                : deRegister()
            "
          >
            {{
              state.user.CouncilStatus == "unavailable"
                ? "Register for"
                : "Deregister from"
            }}
            council
          </BaseCCButton>
        </template>
      </UserViewHeadingContainer>
      <div>
        <UserViewHeadingContainer v-for="coin in normalizeCoins(coins)">
          <template v-slot:heading
            ><a class="uppercase">{{ coin.denom }}</a> Balance
          </template>
          <template v-slot:body>{{ coin.amount }}</template>
        </UserViewHeadingContainer>
      </div>
    </div>
    <div class="text-center md:text-left">
      <h1 class="max-md:hidden text-5xl font-bold pb-12">
        {{ heading }}
      </h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16">
        <UserViewHeadingContainer>
          <template v-slot:heading>Wallet</template>
          <template v-slot:body>
            <b>Address</b> <br />{{ state.addr }}<br />
            <br />
            <b>Alias</b> <br />{{ state.user.alias }}
          </template>
        </UserViewHeadingContainer>
        <UserViewHeadingContainer>
          <template v-slot:heading>My Cards</template>
          <template v-slot:body>
            <b
              >{{ state.user.ownedCardSchemes.length }} Card Frame{{
                state.user.ownedCardSchemes.length == 1 ? "" : "s"
              }}</b
            >
            <div
              v-for="[arr, name] in [
                [state.user.ownedCardSchemes, 'Master Card'],
                [state.user.cards, 'Card'],
              ]"
              class="pb-6"
            >
              <p class="pb-3">
                <b
                  >{{ arr.length }} {{ name
                  }}{{ arr.length == 1 ? "" : "s" }}</b
                >
              </p>
              <RouterCCButton :type="ButtonType.YELLOW"
                >View in gallery
              </RouterCCButton>
            </div>
          </template>
        </UserViewHeadingContainer>
        <UserViewHeadingContainer>
          <template v-slot:heading>Recent Activity</template>
          <template v-slot:body>
            <RouterCCButton :type="ButtonType.YELLOW" :to="{ name: 'Vote' }"
              >Go to Voting
            </RouterCCButton>
          </template>
        </UserViewHeadingContainer>
      </div>
      <UserViewHeadingContainer class="pt-8">
        <template v-slot:heading>Play History</template>
        <template v-slot:body>
          <div class="grid gap-8 md:grid-cols-4">
            <UserViewHeadingContainer
              v-for="(match, key) in state.matches"
              :key="key"
            >
              <template v-slot:heading>Match {{ key }}</template>
              <template v-slot:body>
                {{
                  (match.playerA.addr == state.addr &&
                    match.outcome == "AWon") ||
                  (match.playerB.addr == state.addr && match.outcome == "BWon")
                    ? "WIN"
                    : "LOSE"
                }}
              </template>
            </UserViewHeadingContainer>
          </div>
        </template>
      </UserViewHeadingContainer>
    </div>
  </div>
  <ChoosePBModal
    v-if="state.isChooseModalVisible"
    :cardIds="state.user.ownedPrototypes"
    :current="state.user.profileCard"
    @close="closeChooseModal"
  />
</template>

<script setup lang="ts">
import { useAddress } from "@/def-composables/useAddress";
import { useLoggedIn } from "@/def-composables/useLoggedIn";
import { useQuery } from "@/def-composables/useQuery";
import { validAddress } from "@/utils/validation";
import { useTx } from "@/def-composables/useTx";
import { useProfilePic } from "@/def-composables/useProfilePic";
import type { Coin } from "@/model/Coin";
import { normalizeCoins } from "@/utils/utils";
import { computed, type ComputedRef, onMounted, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUser } from "@/def-composables/useUser";
import { User } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/user";
import { Match } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/match";
import UserViewHeadingContainer from "@/views/UserView/UserViewHeadingContainer.vue";
import RouterCCButton from "@/components/elements/CCButton/RouterCCButton.vue";
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import ProfilePicComponent from "@/components/elements/ProfilePicComponent.vue";
import editImg from "@/assets/figma/edit.png";
import ChoosePBModal from "@/components/modals/ChoosePBModal.vue";
import { ButtonType } from "@/components/elements/CCButton/ButtonType";

const { queryQUser, queryAllBalances, queryQMatches } = useQuery();
const { registerForCouncil, rewokeCouncilRegistration } = useTx();
const { address } = useAddress();
const { loggedIn } = useLoggedIn();
const { getImg } = useProfilePic();
const { user, coins, queryCoins, queryUser } = useUser();
const { loggedInProfilePic } = useProfilePic();
const route = useRoute();
const router = useRouter();

const initialState: {
  isChooseModalVisible: boolean;
  addr: string;
  user: User;
  coins: Array<Coin>;
  userIsUser: ComputedRef<boolean>;
  img: string;
  matches: { [key: string]: Match };
} = {
  isChooseModalVisible: false,
  addr: "",
  user: User.fromPartial({}),
  coins: new Array<Coin>(),
  userIsUser: computed(() => loggedIn.value && state.addr == address.value),
  img: "jaja",
  matches: {},
};

const state = reactive(initialState);

const heading = computed(() => {
  return state.userIsUser ? "My Account" : state.user.alias;
});

watch(user, (val) => {
  if (state.userIsUser) state.user = val;
});
watch(coins, (val) => {
  if (state.userIsUser) state.coins = normalizeCoins(val);
});
watch(loggedInProfilePic, (val) => {
  if (state.userIsUser) state.img = val;
});

const init = () => {
  state.addr = route.params.id.toString();

  if (state.userIsUser) {
    state.user = user.value;
    state.coins = normalizeCoins(coins.value);
    state.img = loggedInProfilePic.value;
  }

  if (!validAddress(state.addr)) {
    router.push({ name: "NotFound" });
  }

  router.push({ name: "UserView", params: { id: state.addr } });
  getUser();
  getCoins();
  getMatches();
};

onMounted(init);

const getUser = () => {
  if (state.userIsUser) {
    queryUser();
  } else {
    queryQUser(state.addr).then((user) => {
      state.user = user;
      getImg(state.user, state.addr).then((img) => {
        state.img = img;
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

const getMatches = () => {
  queryQMatches({ containsUsers: state.addr, "ignore.outcome": true }).then(
    (res) => {
      state.matches = {};
      res.matches.forEach((value: Match, idx: number) => {
        state.matches[res.matchesList[idx]] = value;
      });
    }
  );
};

const register = () => registerForCouncil(getUser, console.log);
const deRegister = () => rewokeCouncilRegistration(getUser, console.log);

const showChooseModal = () => {
  state.isChooseModalVisible = true;
};
const closeChooseModal = () => {
  state.isChooseModalVisible = false;
  getUser();
};
</script>
