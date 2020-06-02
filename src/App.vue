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

export default {
  name: 'App',
  components: {PageFooter, PageMenu, PageHeader},
}
</script>

<style lang="sass">
  @import "assets/styles/main.scss"
</style>
