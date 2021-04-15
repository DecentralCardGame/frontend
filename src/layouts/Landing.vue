<template>
  <vue-scroll-snap :fullscreen="true">
    <div class="scroll--snap">
      <PageLogoHeader />
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
  </vue-scroll-snap>
</template>

<script>
import PageLogoHeader from '@/components/partials/PageLogoHeader'
import PageMenu from '@/components/partials/PageMenu'
import PageFooter from '@/components/partials/PageFooter'
import VueScrollSnap from "vue-scroll-snap"

export default {
  name: 'CrowdControlApp',
  components: {PageFooter, PageMenu, PageLogoHeader, VueScrollSnap},
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

<style lang="scss">

.scroll--snap {
  scroll-snap-type: y mandatory;
}

.snap--here {
  scroll-snap-align: start;
}