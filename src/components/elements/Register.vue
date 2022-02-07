<template>
  <div>
    <button 
      class="close-button" 
      type="button"
      @click="$store.commit('toggleLoginBox')"
    >
      x
    </button>
      
    <h2>Join the Experience</h2> 
    <p>
      <b>
        Good to see you here! Before you can dive into the universe of 
        Crowd Control, you need to make an account.</b>
    </p>
    <form @submit.prevent="register">
      <label> Username* </label>
      <input
        v-model="username"
        type="text"
        placeholder="username"
        name="uname"
      >
      <label>
        Password*
        <span
          class="link--show-pw"
          @click="showPw = !showPw"
        >({{ showPw ? "hide" : "show" }})</span>
      </label>
      <input
        v-model="password"
        :type="showPw ? 'text' : 'password'"
        placeholder="**********"
        name="psw"
      >
      <label> E-Mail* </label>
      <input
        v-model="email"
        type="mail"
        placeholder="your@e-mail.com"
        name="mail"
      >
      <label>Custom Mnemonic
        <input
          v-model="ownMnemonic"
          type="checkbox"
          name="ownMnemonic"
        >
      </label>
      <label>  
        (If you don't know what this is, it's not for you) 
      </label>
      <input
        v-show="ownMnemonic"
        v-model="mnemonic"
        type="text"
        placeholder="one two three four five ..."
        name="mail"
      >
      <button type="submit">
        Join
      </button>
    </form>
    <br>
  </div>
</template>

<script>
import { creditsFromCoins } from "../utils/utils.js";
import { createWalletFromMnemonic } from "@tendermint/sig/dist/web";

export default {
  name: "RegisterPage",
  data() {
    return {
      alias: "",
      username: "",
      password: "",
      email: "",
      mnemonic: "",
      ownMnemonic: false,
      showPw: false,
    };
  },
  mounted() {},
  methods: {
    register() {
      if (!this.mnemonic) {
        this.mnemonic = this.$cardChain.generateMnemonic();
      } else if (this.mnemonic.split(" ").length < 24) {
        // TODO check if user has entered a serious mnemonic, currently it only checks for 24 words...
        this.notifyFail(
          "Bad Mnemonic",
          "Please enter a real mnemonic with 24 words"
        );
        return
      }
      function validateEmail(email) 
      {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      }
      if (!validateEmail(this.email)) {
        this.notifyFail(
          "Bad Email",
          "Please enter an Email address, which at least appears valid."
        );
        return
      }
      if (!this.username || !this.password) {
        this.notifyFail(
          "Do you even try?",
          "Please enter at least something as name and password."
        );
        return
      }

      let wallet = createWalletFromMnemonic(this.mnemonic);

      this.$store.commit("setUserMnemonic", this.mnemonic);
      this.$store.commit("setUserAddress", wallet.address);

      const encryptedMnemonic = this.CryptoJS.AES.encrypt(
        JSON.stringify(this.mnemonic),
        this.password
      ).toString();

      const post = {
        email: this.email,
        username: this.username,
        password: this.password,
        mnemonic: encryptedMnemonic,
      };

      Promise.all([
        this.$cardChain.registerAccTx(this.username),
        this.$hottub.post("/register", post)
      ])
      .then((res) => {
        console.log("success res:", res);
        let acc = res[0]
        this.creditsAvailable = creditsFromCoins(acc.coins);
        this.$store.commit("setUserCredits", this.creditsAvailable);
        this.$router.push("/me");

        this.notifySuccess('EPIC WIN', 'You have successfully registered in the blockchain.')
      })
      .catch((err) => {
        console.error(err)
        let errmsg = err
        if (err.response) {
          errmsg = err.response
          if (err.response.data) {
            errmsg = err.response.data
            if (err.response.data.errors)
            errmsg = err.response.data.errors
            if (err.response.data.errors.body)
            errmsg = err.response.data.errors.body
          }
        }
        console.log("error info:", errmsg)

        if (errmsg.includes('uix_users_email') && errmsg.includes('duplicate')) {
          this.notifyFail(
            "Email taken",
            "This Email address is already registered :("
          );
          return
        }
        if (errmsg.includes('uix_users_name') && errmsg.includes('duplicate')) {
          this.notifyFail(
            "Name already taken",
            "The Name is already registered :("
          );
          return // TODO this might not work until it is fixed on the hottub side
        }

        this.notifyFail(
          "DAMN",
          "Registration failed!\n" + errmsg
        )
      });
    },
  },
};
</script>

<style scoped lang="scss">
input {
  margin-bottom: 0.3em;
}

.link--show-pw {
  text-decoration: underline;
  cursor: pointer;
}
.close-button{
  padding: 4.5px 9px;
  float:right;
  @media (max-width: 480px){
    display:none;
  }
}
</style>
