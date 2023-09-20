<template>
  <top-nav :title="user.name" />
</template>

<script setup lang="ts">
import TopNav from '@/views/me/top-nav-banner/topNav.vue'
import useUserStore from '@/store/user'

const user = useUserStore()
</script>