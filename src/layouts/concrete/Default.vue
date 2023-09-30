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
import PageHeader from '@/components/partials/PageHeader.vue'
import PageMenu from '@/components/partials/PageMenu.vue'
import PageFooter from '@/components/partials/PageFooter.vue'

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