<template>
  <div>
    <TopBanner />
    <div class="bg-slate-500 min-h-screen py-4 flex flex-col items-center">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopBanner from './top-banner/top-banner.vue'
</script>

<style scoped></style>
