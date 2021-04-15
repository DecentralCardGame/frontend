<template>
  <vue-scroll-snap>
    <div class="scroll--snap">
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
    </div>
  </vue-scroll-snap>
</template>

<script>
import VueScrollSnap from "vue-scroll-snap"

export default {
  name: 'CrowdControlApp',
  components: { VueScrollSnap },
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
    height: 3000px;
    width: 1500px;
    scroll-snap-type: y proximity;
  }
</style>