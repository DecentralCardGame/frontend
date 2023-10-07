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

<style scoped lang="scss">
@import "../../scss/variables";

header {
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.main {
  padding: 25vh 10vh
}
.logo-container {
    position: relative;
    flex-flow: column;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image1 {
  position: relative;
  z-index: 1;
  width: 55vw;
  max-width: 95vw;
}
.image2 {
  position: absolute;
  z-index: 1;
  max-width: 95vw;
}
.text--button {
  font-family: $font-family-header; 
  font-weight: normal;
  padding: 0.25rem 1rem;
  font-size: $font-size-small;
  color: $black;
  text-align: center;
  transform: skewX(15deg);
}

.link--button {
  background-color: $main-color-c;
  box-shadow: $border-thickness-bold * 1.0 $border-thickness-bold * 1.0 0 $black;
  position: relative;
  margin: 1rem auto;
  padding: 1.5rem 1rem;
  max-width: 150px;
  transform: skewX(-25deg);
  font-size: $font-size-small;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $white;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transition-duration: $animation-duration;
    transition-duration: $animation-duration;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }
  &:hover, &:focus, &:active {
    color: $minor-color-c;
  }
  &:hover:before, &:focus:before, &:active:before {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
  @media (max-width: 1178px) {
    transform: skewX(-25deg);
  }  
}
.button--container {
  position: relative;
  z-index: 4;
  top: 0rem;
  left: -1rem;
  margin: 0rem;
}
.extra--margin {
  margin: 5rem 0rem 8rem;
}

.img--container {
  width: 50%;
  position: absolute;
  top: -2.2rem;
  left: -0.25rem;
  z-index: 5;
  pointer-events: none;
  display: flex;
  justify-content: center;
}
.image3 {
  transform: skewX(25deg);
  position: absolute;
  margin: 3.0rem 3.2rem 3.2rem 3.0rem;
  z-index: 6;
  top: 0rem;
  left: 1rem;
  width: 50%;
}
</style>
