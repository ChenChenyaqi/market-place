<template>
  <nut-config-provider :theme="darkThemeStore.darkTheme">
    <RouterView />
  </nut-config-provider>
</template>

<script setup lang="ts">
import useDarkThemeStore from '@/store/darkTheme/index'
import {onMounted} from "vue";
import {resetUser} from "@/utils/userStorage.ts";
const darkThemeStore = useDarkThemeStore()

// todo debug
onMounted(()=>{
  resetUser()
})
</script>

<style scoped></style>
