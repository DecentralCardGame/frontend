<template>
  <div id="content">
    <PageTopMenu />
    <PageNavMenu />
    <main>
      <div class="footer__content">
        <router-view />
      </div>
    </main>
    <PageFooter />
  </div>
</template>

<script>
import PageTopMenu from '@/components/partials/PageTopMenu.vue'
import PageNavMenu from '@/components/partials/PageNavMenu.vue'
import PageFooter from '@/components/partials/PageFooter.vue'

export default {
  name: 'CrowdControlApp',
  components: { PageTopMenu, PageNavMenu, PageFooter },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss"></style>