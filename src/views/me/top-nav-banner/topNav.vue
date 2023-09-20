<template>
  <nut-navbar
    @click-back="$emit('back')"
    @click-title="title"
    title="title">
    <template #left>
      <div>返回</div>
    </template>
  </nut-navbar>
</template>

<script setup lang="ts">

defineProps<{
  title: string
}>()


</script>

<style scoped>

</style>