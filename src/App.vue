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
export default {
  name: 'App',
  components: {PageFooter, PageMenu, PageHeader}
}
</script>

<style>
  @import "assets/styles/main.scss";
</style>
