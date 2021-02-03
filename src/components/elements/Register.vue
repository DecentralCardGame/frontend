<template>
  <div>
    <h2>Join the Experience</h2>
    <p>
      <b>
        >Good to see you here! Before you can dive into the universe of Crowd
        Control, you need to make an account.</b>
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
      <label> Mnemonic* </label>
      <input
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
    <p>
      AT THE MOMENT E-MAIL SIGNUP IS NOT IMPLEMENTED - JUST PRESS REGISTER TO
      ACTIVATE YOUR ACCOUNT ON THE BLOCKCHAIN
    </p>
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
      showPw: false,
    };
  },
  mounted() {},
  methods: {
    register() {
      if (!this.mnemonic) {
        this.mnemonic = this.$cardChain.generateMnemonic();
      } else if (this.mnemonic.split(" ").length < 24) {
        // TODO check if user has entered a serious mnemonic
        this.notifyFail(
          "Bad Mnemonic",
          "Please enter a real mnemonic with 24 words"
        );
        return;
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

      this.$cardChain
        .registerAccTx(this.username)
        .then((acc) => {
          this.creditsAvailable = creditsFromCoins(acc.coins);
          this.$store.commit("setUserCredits", this.creditsAvailable);
        })
        .catch((err) => {
          console.error(err);
          this.notifyFail(
            "Blockchain Fail",
            "Registering the address in the blockchain has failed."
          );
        });

      this.$hottub
        .post("/register", post)
        .then((res) => {
          console.log(res);
          this.$router.push("/");
        })
        .catch(() => {
          this.notifyFail("Backend registration failed!");
        });
    },
  },
};
</script>

<style scoped>
input {
  margin-bottom: 0.3em;
}
.link--show-pw {
  text-decoration: underline;
  cursor: pointer;
}
</style>
