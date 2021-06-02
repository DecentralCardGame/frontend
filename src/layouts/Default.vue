<template>
  <div>
    <PageHeader />
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
import PageHeader from '@/components/partials/PageHeader'
import PageMenu from '@/components/partials/PageMenu'
import PageFooter from '@/components/partials/PageFooter'

export default {
  name: 'CrowdControlApp1',
  components: {PageFooter, PageMenu, PageHeader},
  mounted () {
    console.log("YES")
  },
  methods: {
    handleAnyInput(event) {
      this.$store.commit(
        "setLastInputEvent",
        event
      );
    }
  }
}
</script>

<style scoped lang="scss">
  body {
    background: url("../assets/background2.svg");
    background-size: 100% auto;
  }
</style>