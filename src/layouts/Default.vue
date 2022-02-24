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
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>