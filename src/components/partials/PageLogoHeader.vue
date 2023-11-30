<template>
  <div
    id="main"
    class="main"
  >
    <div class="logo-container">
      <img
        src="../../assets/logo.svg"
        class="image1"
        alt="Loading..."
        width="500"
      >
      <img
        v-if="!isSafari"
        src="@/assets/animations/sparkling_water.gif"
        class="image2"
        alt="Loading..."
        width="1200"
      >
    </div>
    <div class="button--container extra--margin">
      <div
        class="link--button"
        @click="scrollPastMenu"
      >
        <div class="img--container">
          <img
            src="../../assets/arrows/arrow_down.svg"
            class="image3"
            alt="yes..."
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
    data() {
      return {
        isSafari: false
      };
    },
    computed: {
    },
    mounted () {
      this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    },
    methods: {
      scrollPastMenu() {
        const mainElement = document.getElementById('main').getBoundingClientRect();
        window.scrollTo({
          left: 0,
          top: mainElement.bottom + document.documentElement.scrollTop,
          behavior: 'smooth'
        });
      }
    }
}
</script>
