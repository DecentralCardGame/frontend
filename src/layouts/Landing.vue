<template>
  <div id="content">
    <PageLogoHeader v-if="!isMobileDevice()" />
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
import PageLogoHeader from '../components/partials/PageLogoHeader.vue'
import PageMenu from '../components/partials/PageMenu.vue'
import PageFooter from '../components/partials/PageFooter.vue'
import { useNotifications } from "@/def-composables/useNotifications";

export default {
  name: 'CrowdControlApp',
  components: { PageMenu, PageLogoHeader, PageFooter },
  mounted () {
  },
  setup() {
    const { isMobileDevice } = useNotifications()

    return { isMobileDevice }
  },
  methods: {
  },
}
</script>

<style lang="scss">

</style>