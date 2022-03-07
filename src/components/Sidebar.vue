<template>
  <SpSidebar
    @sidebar-open="sidebarOpen = true"
    @sidebar-close="sidebarOpen = false"
  >
    <template #default>
      <SpLinkIcon
        link="/"
        text="Dashboard"
        icon="Dashboard"
      />
      <SpLinkIcon
        link="/types"
        text="Custom Type"
        icon="Form"
      />
      <SpLinkIcon
        link="/relayers"
        text="Relayers"
        icon="Transactions"
      />
      <div class="sp-dash" />
      <SpLinkIcon
        href="https://github.com/tendermint/starport"
        target="_blank"
        text="Documentation"
        icon="Docs"
      />
    </template>
    <template #footer>
      <SpStatusAPI :show-text="sidebarOpen" />
      <SpStatusRPC :show-text="sidebarOpen" />
      <SpStatusWS :show-text="sidebarOpen" />
      <div class="sp-text">
        Build: v0.3.8
      </div>
    </template>
  </SpSidebar>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      sidebarOpen: true,
    }
  },
  computed: {
    hasWallet() {
      return this.$store.hasModule(['common', 'wallet'])
    },
  },
}
</script>
