import useKeplr from "@/def-composables/useKeplr";
import {useRouter} from "vue-router";
import {useAddress} from "@/def-composables/useAddress";
import {env} from "@/env";
import {useNotifications} from "@/def-composables/useNotifications";
import type {Key} from "@keplr-wallet/types";
import {useQuery} from "@/def-composables/useQuery";
import { Client } from "decentralcardgame-cardchain-client-ts";
import { ref } from "vue";
import {useLoggedIn} from "@/def-composables/useLoggedIn";

const useLoginInstance = () => {
  const {connectToKeplr, isKeplrAvailable, getKeplrAccParams} = useKeplr()
  const router = useRouter()
  const {notifyFail, notifyInfo, notifySuccess} = useNotifications()
  const { queryQUser } = useQuery()
  const isSignUpRequired = ref(true)
  const {loggedIn} = useLoggedIn()
  const {address} = useAddress()
  
  const tryLogin = () => {
    if (loggedIn.value) {
      router.push({name: "UserView", params: {id: address.value}})
    }
    signUpRequired().then((required) => {
      console.log(required)
      if (!required) {
        login()
      } else {
        router.push("Login")}
    })
  }
  
  const login = () => {
      console.log("logging in")
      connectToKeplr(console.log, console.log)
  }
  
  const signUpRequired = async () => {
    if (isKeplrAvailable.value) {
      const client = new Client(env);
      await client.useKeplr();
      const [account] = await client.signer!.getAccounts()
      try {
        await queryQUser(account.address)
        return false
      }
      catch(e) {
        return true
      }
    }
    return true
  }
  
  const checkSignUpRequired = () => {
    return signUpRequired().then(value => {
      isSignUpRequired.value = value
      return value
    })
  }

  const onVerify = (res: any) => {
    return getKeplrAccParams(env.chainId).then((value: Key) => {
      const data = {
        address: value.bech32Address,
        token: res,
        alias: value.name,
      };

      const request = new Request(env.faucetNode, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      
      return fetch(request).then((response) => {
        console.log("response", response);
        checkSignUpRequired()

        if (response.status === 401) {
          notifyFail("Error", "Error captcha. Please reload page.");
          return;
        } else if (response.status === 402) {
          notifyFail("Error", "You have already claimed tokens");
          return;
        } else if (response.status === 403) {
          notifyFail("Error", "Probably the incorrect address");
          return;
        } else {
          notifySuccess("Success", "Registered Account");
          return;
        }
      });
    });
  };
  
  checkSignUpRequired()

  return {login, checkSignUpRequired, isSignUpRequired, tryLogin, onVerify}
}

let loginInstance: ReturnType<typeof useLoginInstance>;

export const useLogin = () => {
  if (!loginInstance) {
    loginInstance = useLoginInstance();
  }
  return loginInstance;
};
