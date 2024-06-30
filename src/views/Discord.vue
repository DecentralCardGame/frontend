<template>
  <div
    class="md:flex bg-black text-white md:space-x-24 justify-center md:px-16 py-16"
  >
    <div
      v-if="state.invalidCode"
      class="py-24 text-center"
    >
      <div class="py-4">
        Unfortunately you have entered this page without Discord code.<br>
        Please identify with your Discord account with the button below:
      </div>
      <LinkCCButton
        to="https://discord.com/oauth2/authorize?client_id=1242405621815316502&response_type=code&redirect_uri=https%3A%2F%2Fcrowdcontrol.network%2F%23%2Fdiscord&scope=identify"
      >
        Discord Identification
      </LinkCCButton>
    </div>
    <div
      v-else
      class="text-center"
    >
      <div v-if="state.noUserFound">
        We are very sorry. <br>
        The user {{ state.discordUser }} does not have any Zealy rewards. <br>
        Maybe you have not entered your Discord account into Zealy <br>
        or are logged in with another account.
      </div>
      <div v-else>
        <div
          v-if="state.noCCAddress"
          class="py-8"
        >
          You do not have a CrowdControl Address! <br>
          All rewards will be credited to a CC Address. <br>
          You might have an address, but you did not enter it on Zealy. <br>
          If you want to receive rewards, you should enter your CC Address.
          <br>
          If you don't own a CC Address click on Login on the top right. <br>
        </div>

        <div
          v-else
          class="text-center"
        >
          <h1 class="md:hidden text-5xl font-bold pb-12">
            {{ state.user.alias }}
          </h1>
          <div class="py-24">
            <div class="mx-auto h-64 w-64 relative group">
              <ProfilePicComponent
                :src="state.img"
                size="64"
                alt="Profile pic"
              />

              <img
                :src="editImg"
                alt="edit"
                class="absolute top-0 left-0 right-0 bottom-0 m-auto w-10 invisible"
              >
            </div>
          </div>
        </div>

        <div class="text-center">
          <h1 class="max-md:hidden text-5xl font-bold pb-12">
            Rewards
          </h1>
          <div>
            <UserViewHeadingContainer>
              <template asdf>
                Wallet
              </template>
              <template #body>
                <DefineRewardItem v-slot="{ item, value, isBool = false }">
                  <div class="p-1">
                    <div
                      v-if="value"
                      class="p-2 mx-20 font-bold bg-green-400 rounded-full whitespace-nowrap text-nowrap"
                    >
                      {{ item }}
                      <span
                        v-if="isBool"
                        class="px-2"
                      > ✓ </span>
                      <span
                        v-if="!isBool"
                        class="px-2"
                      >
                        {{ value }}
                      </span>
                    </div>
                    <div
                      v-if="!value && isBool"
                      class="p-2 mx-20 font-bold bg-red-400 rounded-full whitespace-nowrap text-nowrap line-through"
                    >
                      {{ item }}
                    </div>
                  </div>
                </DefineRewardItem>

                <b>Address</b> <br>{{ state.addr }} <br>
                <b>Alias</b> <br>{{ state.user.alias }} <br>
                <b>Zealy ID</b> <br>{{ state.rewards.ZealyID }} <br>
                <b>Discord Username</b> <br>{{ state.discordUser
                }}<br><br>

                <RewardItem
                  :item="'Airdrop'"
                  :value="state.rewards.Airdrop"
                />
                <RewardItem
                  :item="'Credits'"
                  :value="state.rewards.InGameCredits"
                />
                <RewardItem
                  :item="'Early Access'"
                  :value="state.rewards.EarlyAccessToGame"
                  :is-bool="true"
                />
                <RewardItem
                  :item="'Booster Packs'"
                  :value="state.rewards.BoosterPacks"
                />
                <RewardItem
                  :item="'Ambassador Program Advisory'"
                  :value="state.rewards.AmbassadorProgramAdvisory"
                  :is-bool="true"
                />
                <RewardItem
                  :item="'Whitelist for The Token Sale'"
                  :value="state.rewards.WLForTheTokenSale"
                  :is-bool="true"
                />
                <RewardItem
                  :item="'Whitelist for The Token Sale (Better Price)'"
                  :value="state.rewards.WLForTheTokenSaleBetterPrice"
                  :is-bool="true"
                />
              </template>
            </UserViewHeadingContainer>
          </div>
        </div>
      </div>
    </div>
  </div>
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
import LinkCCButton from "@/components/elements/CCButton/LinkCCButton.vue";
import ProfilePicComponent from "@/components/elements/ProfilePicComponent.vue";
import editImg from "@/assets/figma/edit.png";
import ChoosePBModal from "@/components/modals/ChoosePBModal.vue";
import { Color } from "@/components/utils/color";
import { CouncilStatus } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/user";
import axios from "axios";
import { useUrlSearchParams } from "@vueuse/core";
import { createReusableTemplate } from "@vueuse/core";

const [DefineRewardItem, RewardItem] = createReusableTemplate();

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
  addr: string;
  user: User;
  img: string;
  discordUser: string;
  invalidCode: boolean;
  noUserFound: boolean;
  noCCAddress: boolean;
} = {
  addr: "",
  user: User.fromPartial({}),
  img: "jaja",
  discordUser: "",
  invalidCode: false,
  noUserFound: false,
  noCCAddress: false,
};

const state = reactive(initialState);

const init = () => {
  const code = useUrlSearchParams("history").code;
  if (!code) {
    state.invalidCode = true;
    return;
  }
  axios
    .get("https://cardchain.crowdcontrol.network/goat?code=" + code)
    .then((discordUser) => {
      state.discordUser = discordUser.data.global_name;
      console.log("discordUser", discordUser);
      // get the reward list from the server
      axios
        .get("https://cardchain.crowdcontrol.network/files/rewards.csv")
        .then((response) => {
          console.log(response);
          var lines = response.data.split("\n");
          var result = null;
          var headers = lines[0].split(",");
          for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentline[j];
            }
            if (obj.discordHandle === discordUser.data.username) {
              obj.Airdrop = obj.Airdrop ? obj.Airdrop : 0;
              obj.AmbassadorProgramAdvisory = obj.AmbassadorProgramAdvisory
                ? obj.AmbassadorProgramAdvisory
                : false;
              obj.BoosterPacks = obj.BoosterPacks ? obj.BoosterPacks : 0;
              obj.Credits = obj.Credits ? obj.Credits : 0;
              obj.EarlyAccessToGame = obj.EarlyAccessToGame
                ? obj.EarlyAccessToGame
                : false;
              obj.WLForTheTokenSale = obj.WLForTheTokenSale
                ? obj.WLForTheTokenSale
                : false;
              obj.WLForTheTokenSaleBetterPrice =
                obj.WLForTheTokenSaleBetterPrice
                  ? obj.WLForTheTokenSaleBetterPrice
                  : false;

              result = obj;
              state.rewards = obj;
              break;
            }
          }
          console.log("matching entry:", result);

          if (!result) state.noUserFound = true;
          else if (!result.CCAddress) state.noCCAddress = true;
          else {
            state.addr = result.CCAddress;
            console.log("state.addr", state.addr);
            getUser();
          }
        });
    });

  router.push({ name: "Discord" });
};

onMounted(init);

const getUser = () => {
  console.log("getuser", state.addr);
  queryQUser(state.addr).then((user) => {
    console.log("user", user);
    state.user = user;
    getImg(state.user, state.addr).then((img) => {
      state.img = img;
    });
  });
};
</script>
