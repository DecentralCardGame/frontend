<template>
  <div id="content">
    <PageTopMenu />
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
import PageFooter from '@/components/partials/PageFooter.vue'

export default {
  name: 'CrowdControlApp',
  components: { PageTopMenu, PageFooter },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss"></style>