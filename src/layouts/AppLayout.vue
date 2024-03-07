<template>
  <div id="content">
    <PageHeader />
    <PageMenu />
    <main>
      <div>
        <router-view />
      </div>
    </main>
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/partials/PageHeader.vue'
import PageMenu from '@/components/partials/PageMenu.vue'
import PageFooter from '@/components/partials/PageFooter.vue'
</script>