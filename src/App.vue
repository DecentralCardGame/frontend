<template>
  <div v-if="initialized">
    <SpWallet
      ref="wallet"
      @dropdown-opened="$refs.menu.closeDropdown()"
    />
    <SpLayout>
      <template #sidebar>
        <Sidebar />
      </template>
      <template #content>
        <router-view />
      </template>
    </SpLayout>
  </div>
</template>

<script>
import './scss/app.scss'
import '@starport/vue/lib/starport-vue.css'
import Sidebar from './components/Sidebar'

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      initialized: false,
    }
  },
  computed: {
    hasWallet() {
      return this.$store.hasModule(['common', 'wallet'])
    },
  },
  async created() {
    await this.$store.dispatch('common/env/init')
    this.initialized = true
  },
  errorCaptured(err) {
    console.log(err)
    return false
  },
}
</script>


<style>
body {
  margin: 0;
}
</style>