<template>
  <div>
    <h2>Account Settings</h2>
    You have {{ user.ownedCardSchemes ? user.ownedCardSchemes.length : 0 }} Card Schemes, which allow you to create new cards. <br>
    You have {{ user.voteRights ? user.voteRights.length : 0 }} Vote Rights for Cards, that will get you a reward.
    <br>
    <br>
    <button
      v-if="$store.getters.loggedIn"
      @click="logout()"
    >
      Logout
    </button>
    <br><br>
    <h3>Cosmos Settings</h3>
    <br>
    <p>Your Address is used to transfer cards and credits to other users. You can also use it to find all your cards in the gallery. You can share it with anyone. </p>
    <br>

    <h2>Address:</h2>
    {{ $store.getters.getUserAddress }}
    <br><br>
    <p>
      The following is the most important part of your account. It is what gives full control over your account.
      Your Mnemonic is your secret key, save it. Write it down. Don't lose it. Never tell it anyone.
    </p> <br>
    <h2>Mnemonic:</h2>
    <input
      v-model="mnemonic"
      name="mnemonic"
      size="80"
    ><br>
    <br><p>Type in password for confirmation</p>
    <input
      v-model="mnemonicConfirmationPassword"
      name="mnemonicconfirmationpassword"
      type="password"
      size="80"
    ><br><br>
    <!-- <p>Address: <input v-model="address" name="address" size="40"></p> <br> -->
    <p>
      It is randomly generated on this website only for you, our servers will only save your mnemonic encrypted. We cannot access it. Only you can decrypt it with your password.
      That is why you have to write it down. We store it so you can recover it with a password you hopefully remember even if the paper burns down where you have written down the mnemonic.
      You can use the mnemonic to recover your account. If you already have a mnemonic, you can enter it here and overwrite the existing one. This will remove the connection to the displayed mnemonic and
      link your account to the freshly entered mnemonic. Before you do that, write down the mnemonic displayed here in case you do something wrong.
    </p>
    <br>
    <button @click="save()">
      Overwrite Mnemonic
    </button>

    <br><br>
  </div>
</template>

<script>

export default {
  name: 'AccountPage',
  data () {
    return {
      mnemonic: '',
      mnemonicConfirmationPassword: '',
      address: '',
      user: {}
    }
  },
  mounted () {
    this.mnemonic = this.$store.getters.getUserMnemonic
    this.address = this.$store.getters.getUserAddress

    this.$cardChain.getUserInfo(this.address)
    .then(user => {
      console.log(user)
      this.user = user
    })
  },
  methods: {
    save () {
      // WHEN THIS FUNCTION IS USED THE ENCRYPTED MNEMONIC ON HOTTUB MUST BE OVERWRITTEN
      // overwriting localstorage is not enough

      const encryptedMnemonic = this.CryptoJS.AES.encrypt(JSON.stringify(this.mnemonic), this.mnemonicConfirmationPassword).toString()
      const post = {
        mnemonic: encryptedMnemonic
      }

      console.log("save")

      this.$hottub.put('/users/' + this.$store.getters.getUserInfo.id, post)
          .then((res) => {
            console.log(res)
          })
          .catch(() => {
            this.notifyFail('Backend registration failed!')
          })
    },
    logout () {
      this.$store.commit('logout')
      this.notifySuccess('Very Nice', 'Logout successful!')
      this.$router.push('login')
    }
  }
}
</script>

<style scoped>

</style>
