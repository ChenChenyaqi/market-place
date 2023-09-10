<template>
  <nut-row>
    <nut-col :span="12">logo</nut-col>
    <nut-col :span="12">
      <div class="flex justify-end pr-4 pt-1">
        <DarkTheme />
      </div>
    </nut-col>
  </nut-row>
</template>

<script setup lang="ts">
import DarkTheme from '@/components/dark-theme/dark-theme.vue'
</script>

<style scoped lang="less"></style>
