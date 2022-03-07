<template>
  <div v-if="initialized">  
    <SpWallet
      ref="wallet"
      @dropdown-opened="$refs.menu.closeDropdown()"
    />
    <SpLayout>
      <template #sidebar>
        <Sidebar />
      </template>
      <template #content>
        <router-view />
      </template>
    </SpLayout> 
  </div>
</template>