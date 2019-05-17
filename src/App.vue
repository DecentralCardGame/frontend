<template>
  <div id="app">
    <PageHeader/>
    <PageMenu/>
    <div class="content">
      <router-view/>
    </div>
    <PageFooter/>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PageMenu from '@/components/PageMenu'
import PageFooter from '@/components/PageFooter'
import {AxiosInstance as axios} from 'axios'
export default {
  name: 'App',
  components: {PageFooter, PageMenu, PageHeader},
  mounted () {
    axios
      .get(this.apiURL + '/cardservice/cards')
      .then(response => (this.cards = response.data))
  }
}
</script>

<style>
  @import "assets/styles/main.scss";
</style>
