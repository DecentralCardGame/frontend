<template>
  <div>
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
</template>

<script>
export default {
  name: 'CrowdControlApp',
  components: { },
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