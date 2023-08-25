<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import AppLayoutDefault from '@/layouts/Default.vue'
export default {
  name: "AppLayout",
  data: () => ({
    layout: AppLayoutDefault
  }),
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        if (route.meta.layout) {
          try {
            const component = await import( /* @vite-ignore */ `./${route.meta.layout}.vue`)
            this.layout = component?.default || AppLayoutDefault
          } catch (e) {
            this.layout = AppLayoutDefault
          }
        }
      }
    }
  }
}
</script>