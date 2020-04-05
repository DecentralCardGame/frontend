<template>
  <div id="app">
    <PageHeader/>
    <PageMenu/>
    <main>
      <div class="content">
        <router-view/>
      </div>
    </main>
    <notifications group="success" position="bottom right" classes="success-notification"/>
    <notifications group="info" position="bottom right" classes="info-notification"/>
    <notifications group="fail" position="bottom right" classes="fail-notification"/>
    <PageFooter/>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PageMenu from '@/components/PageMenu'
import PageFooter from '@/components/PageFooter'
import { createKey } from 'signcosmostx/signStuff'
import { entropyToMnemonic } from 'bip39'
import * as Random from  'randombytes'
import * as cosmossig from '@tendermint/sig';

export default {
  name: 'App',
  components: {PageFooter, PageMenu, PageHeader},
  data () {
    return {
    }
  },
  mounted () {
    
    let entropySize = 24 * 11 - 8;
    let entropy = Random(entropySize / 8);
    let mnemonic = entropyToMnemonic(entropy);

    const wallet = cosmossig.createWalletFromMnemonic(mnemonic)

    console.log(cosmossig)

    //let newKeypair = createKey()
    localStorage.address = cosmossig.createAddress(wallet.publicKey)
    localStorage.mnemonic = mnemonic
    console.log(localStorage.mnemonic)
    console.log(localStorage.address)
  }
}
</script>

<style>
  @import "assets/styles/main.scss";
</style>
