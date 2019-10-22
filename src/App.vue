<template>
  <div id="app">
    <PageHeader/>
    <PageMenu/>
    <main>
      <div class="content">
        <router-view/>
      </div>
    </main>
    <notifications group="foo" />
    <PageFooter/>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PageMenu from '@/components/PageMenu'
import PageFooter from '@/components/PageFooter'
export default {
  name: 'App',
  components: {PageFooter, PageMenu, PageHeader},
  mounted () {

  }
}
</script>

<style>
  @import "assets/styles/main.scss";
</style>
