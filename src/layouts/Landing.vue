<template>
  <div id="content">
    <PageLogoHeader v-if="!isMobileDevice()" />
    <PageMenu />
    <div v-if="$store.state.loading">
      <div class="spinner">
        <div class="bounce1" />
        <div class="bounce2" />
        <div class="bounce3" />
      </div>
    </div>
    <main>
      <div class="footer__content">
        <router-view />
      </div>
    </main>
    <notifications      
      group="bottom-right-notification"
      position="bottom right"
      classes="notification"
    />
    <PageFooter />
  </div>
</template>

<script>
import PageLogoHeader from '@/components/partials/PageLogoHeader'
import PageMenu from '@/components/partials/PageMenu'
import PageFooter from '@/components/partials/PageFooter'

export default {
  name: 'CrowdControlApp',
  components: { PageMenu, PageLogoHeader, PageFooter },
  mounted () {
    console.log("default loaded")
  },
  methods: {
  },
}
</script>

<style lang="scss">

</style>