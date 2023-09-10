<template>
  <div>
    <SvgIcon
      v-if="darkThemeStore.darkTheme !== 'dark'"
      name="dark"
      color="red"
      @click="handleChange(true)"
    />
    <SvgIcon v-else name="light" color="#e6e03a" @click="handleChange(false)" />
  </div>
</template>

<script setup lang="ts">
import useDarkThemeStore from '@/store/darkTheme'

const darkThemeStore = useDarkThemeStore()

const handleChange = (flag: boolean) => {
  darkThemeStore.changeDarkTheme(flag)
}
</script>

<style scoped></style>
