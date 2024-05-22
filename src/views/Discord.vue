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
            <b>Address</b> <br>{{ state.addr }}
            <br>
            <b>Alias</b> <br>{{ state.user.alias }}
            <br><br>
            <b>Zealy ID</b> <br>{{ state.rewards[0].ZealyID }}
            <br>
            <b>Airdrop</b> <br>{{ state.rewards[0].Airdrop }}
            <br>
            <b>InGameCredits</b> <br>{{ state.rewards[0].InGameCredits }}
            <br>
            <b>EarlyAccessToGame</b> <br>{{ state.rewards[0].EarlyAccessToGame }}
            <br>
            <b>BoosterPacks</b> <br>{{ state.rewards[0].BoosterPacks }}
            <br>
            <b>DiscordUsername</b> <br>{{ state.rewards[0].DiscordUsername }}
            <br>
            <b>AmbassadorProgramAdvisory</b> <br>{{ state.rewards[0].AmbassadorProgramAdvisory }}
            <br>
            <b>WLForTheTokenSale</b> <br>{{ state.rewards[0].WLForTheTokenSale }}
            <br>
            <b>WLForTheTokenSaleBetterPrice</b> <br>{{ state.rewards[0].WLForTheTokenSaleBetterPrice }}
            <br>
          </template>
        </UserViewHeadingContainer>
       
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
import BaseCCButton from "@/components/elements/CCButton/BaseCCButton.vue";
import ProfilePicComponent from "@/components/elements/ProfilePicComponent.vue";
import editImg from "@/assets/figma/edit.png";
import ChoosePBModal from "@/components/modals/ChoosePBModal.vue";
import { Color } from "@/components/utils/color";
import { CouncilStatus } from "decentralcardgame-cardchain-client-ts/DecentralCardGame.cardchain.cardchain/types/cardchain/cardchain/user";
import axios from "axios";

import { useUrlSearchParams } from '@vueuse/core'
import queryString from 'query-string';

const params = useUrlSearchParams('history')

    params.client_id = '1242405621815316502'
    params.client_secret = 'Vc48XsGTPLWOJH66dIop4ICZxj8KF4ms'
    params.grant_type = 'authorization_code'
    //params.append('code', YOUR_DISCORD_CODE)
    params.redirect_uri = 'http://localhost:5173/#/discord'
    params.scope = 'identify'

console.log("params", params)

/*
    axios.get(`https://discordapp.com/api/users/@me`, {
        headers: {
            "Authorization": params.grant_type + " " + params.code,
        }
    })
*/



axios.post('https://discordapp.com/api/oauth2/token', queryString.stringify({
        'client_id': params.client_id,
        'client_secret': params.client_secret,
        'grant_type': params.grant_type,
        'code': params.code,
        'redirect_uri': params.redirect_uri,
        'scope': 'identify'
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(oauth2 => {
        console.log("axios post oauth2 result:", oauth2)
        return axios.get(`https://discordapp.com/api/users/@me`, {
            headers: {
                "Authorization": "Bearer " + oauth2.data.access_token,
            }
        })
        .then(discordUser => {
            console.log("discordUser", discordUser)
            // get the reward list from the server
            axios.get('https://cardchain.crowdcontrol.network/files/rewards.csv')
              .then((response) => {
                var lines=response.data.split("\n");
                var result = [];
                var headers=lines[0].split(",");
                for(var i=1; i<lines.length; i++) {
                  var obj = {};
                  var currentline=lines[i].split(",");
                  for(var j=0; j<headers.length; j++){
                      obj[headers[j]] = currentline[j];
                  }
                  
                  if (obj.discordHandle === discordUser.data.username || obj.discordHandle === "flo_0321") {
                    console.log("rewards.csv", obj)
                    result.push(obj);
                    state.rewards = result;
                  }
                }
                console.log("matching entries:", result);
              })

        })
    })





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
  coins: Array<Coin>;
  userIsUser: ComputedRef<boolean>;
  img: string;
} = {
  addr: "",
  user: User.fromPartial({}),
  coins: new Array<Coin>(),
  userIsUser: computed(() => loggedIn.value && state.addr == address.value),
  img: "jaja",
};

const state = reactive(initialState);

const heading = computed(() => {
  return state.userIsUser ? "My Account" : state.user.alias;
});

watch(user, (val) => {
  if (state.userIsUser) state.user = val;
});

const init = () => {







  if (state.userIsUser) {
    state.user = user.value;
    state.coins = normalizeCoins(coins.value);
    state.img = loggedInProfilePic.value;
  }

  if (!true) { // change this to invalid discord login
    router.push({ name: "NotFound" });
  }

  router.push({ name: "Discord" });
  getUser();
  console.log(state.user)
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

</script>
