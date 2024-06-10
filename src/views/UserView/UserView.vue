<template>
  <div
    class="md:flex bg-black text-white md:space-x-24 justify-center md:px-16 py-16"
  >
    <div class="text-center">
      <h1 class="md:hidden text-5xl font-bold pb-12">
        {{ heading }}
      </h1>
      <div class="py-24">
        <div class="mx-auto h-64 w-64 relative group">
          <ProfilePicComponent
            :src="state.img"
            size="64"
            alt="Profile pic"
          />
          <button
            v-if="state.userIsUser"
            class="absolute top-0 left-0 right-0 bottom-0 m-auto w-10 invisible group-hover:visible"
            @click="showChooseModal"
          >
            <img
              :src="editImg"
              alt="edit"
              class="hover:drop-shadow-md"
            >
          </button>
        </div>
      </div>
      <UserViewHeadingContainer>
        <template #heading>
          Council status
        </template>
        <template #body>
          <p>{{ user.CouncilStatus }}</p>
          <BaseCCButton
            v-if="state.userIsUser"
            :type="Color.YELLOW"
            @click="
              CouncilStatus[state.user.CouncilStatus] ==
                CouncilStatus.unavailable
                ? register()
                : deRegister()
            "
          >
            {{
              CouncilStatus[state.user.CouncilStatus] ==
                CouncilStatus.unavailable
                ? "Register for"
                : "Deregister from"
            }}
            council
          </BaseCCButton>
        </template>
      </UserViewHeadingContainer>
      <div>
        <UserViewHeadingContainer v-for="coin in normalizeCoins(coins)">
          <template #heading>
            <a class="uppercase">{{ coin.denom }}</a> Balance
          </template>
          <template #body>
            {{ coin.amount }}
          </template>
        </UserViewHeadingContainer>
      </div>
    </div>
    <div class="text-center md:text-left">
      <h1 class="max-md:hidden text-5xl font-bold pb-12">
        {{ heading }}
      </h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16">
        <UserViewHeadingContainer>
          <template #heading>
            Wallet
          </template>
          <template #body>
            <b>Address</b> <br>{{ state.addr }}<br>
            <br>
            <b>Alias</b> <br>{{ state.user.alias }}<br>
            <br>
            <RouterCCButton
              v-if="state.user.earlyAccess?.active"
              :type="Color.YELLOW"
              :to="{
                name: 'Download',
              }"
            >
              Early Access
            </RouterCCButton>
            <b v-if="!state.user.earlyAccess?.active">
                No Early Access
            </b>
            <template v-if="state.user.earlyAccess?.active">
              <p v-if="state.user.earlyAccess?.invitedByUser">
                Inviter:
                <CompactAddressComponent
                  :addr="state.user.earlyAccess?.invitedByUser"
                />
              </p>
              <p v-else-if="state.user.earlyAccess?.invitedUser">
                Invited:
                <CompactAddressComponent
                  :addr="state.user.earlyAccess?.invitedUser"
                />
              </p>
            </template>
          </template>
        </UserViewHeadingContainer>
        <UserViewHeadingContainer>
          <template #heading>
            My Cards
          </template>
          <template #body>
            <b>{{ state.user.ownedCardSchemes.length }} Card Frame{{
              state.user.ownedCardSchemes.length == 1 ? "" : "s"
            }}</b>
            <div class="pb-6">
              <p class="pb-3">
                <b>{{ state.user.ownedPrototypes.length }} {{ "Master Card"
                }}{{ state.user.ownedPrototypes.length == 1 ? "" : "s" }}</b>
              </p>
              <RouterCCButton
                :type="Color.YELLOW"
                :to="{
                  name: 'Gallery',
                  query: { owner: state.addr, sortBy: 'Name' },
                }"
              >
                View in gallery
              </RouterCCButton>
            </div>
            <div class="pb-6">
              <p class="pb-3">
                <b>{{ state.user.cards.length }} {{ "Card"
                }}{{ state.user.cards.length == 1 ? "" : "s" }}</b>
              </p>
              <RouterCCButton
                :type="Color.YELLOW"
                :to="{
                  name: 'Gallery',
                  query: { cards: state.user.cards },
                }"
              >
                View in gallery
              </RouterCCButton>
            </div>
          </template>
        </UserViewHeadingContainer>
        <UserViewHeadingContainer>
          <template #heading>
            Recent Activity
          </template>
          <template #body>
            <RouterCCButton
              :type="Color.YELLOW"
              :to="{ name: 'Vote' }"
            >
              Go to Voting
            </RouterCCButton>
          </template>
        </UserViewHeadingContainer>
      </div>
      <UserViewHeadingContainer class="pt-8">
        <template #heading>
          Play History
        </template>
        <template #body>
          <div class="grid gap-8 md:grid-cols-4">
            <UserViewHeadingContainer
              v-for="(match, key) in state.matches"
              :key="key"
            >
              <template #heading>
                Match {{ key }}
              </template>
              <template #body>
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
    :card-ids="state.user.ownedPrototypes"
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
import { Color } from "@/components/utils/color";
import { CouncilStatus } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/user";
import CompactAddressComponent from "@/components/elements/CompactAddressComponent.vue";

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

  getUser();
  getCoins();
  getMatches();
  console.log(state.user);
};

watch(() => route.params.id, init);

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
    },
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
