<template>
  <div id="app">
    <PageHeader />
    <PageMenu />
    <div v-if="$store.state.loading">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
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
      classes="notification notification--success"
      animation-type="velocity"
      :speed="300"
    />
    <notifications
      group="bottom-right-notification"
      position="bottom right"
      classes="notification notification--info"
      animation-type="velocity"
      :speed="300"
    />
    <notifications
      group="bottom-right-notification"
      position="bottom right"
      classes="notification notification--alert"
      animation-type="velocity"
      :speed="300"
    />
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
}
</script>

<style lang="scss">
  @font-face {
    font-family: 'Museo700-Regular';
    font-weight: normal;
    font-style: normal;
    src: url('/fonts/Museo700-Regular-webfont.woff2') format('woff2'),
    url('/fonts/Museo700-Regular-webfont.woff') format('woff');
  }
  @font-face {
    font-family: 'Museo500-Regular';
    src: url('/fonts/Museo500-Regular-webfont.woff2') format('woff2'),
    url('/fonts/Museo500-Regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }


  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  @import "assets/styles/main.scss";
  @import "assets/styles/variables.scss";

  .spinner {
    margin: 100px auto 0;
    width: 70px;
    text-align: center;
  }

  .spinner > div {
    width: 18px;
    height: 18px;
    background-color: $white;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
      }
  }
</style>
