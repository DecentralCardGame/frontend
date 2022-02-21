<template>
  <div id="content">
    <PageHeader />
    <PageMenu />
    <main>
      <div class="footer__content">
        <router-view />
      </div>
    </main>
    <PageFooter />
  </div>
</template>

<script>
import PageHeader from '@/components/partials/PageHeader'
import PageMenu from '@/components/partials/PageMenu'
import PageFooter from '@/components/partials/PageFooter'

export default {
  name: 'CrowdControlApp',
  components: {PageFooter, PageMenu, PageHeader},
  mounted () {
    console.log("default loaded")
  },
  methods: {
  }
}
</script>

<style lang="scss">
.content {
  background-image: url('../assets/background.svg');
  background-size: 100% auto;
}
</style>