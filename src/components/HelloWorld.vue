<template>
  <div>
    <el-button type="primary" size="default" @click="handleClick"
      >click me!</el-button
    >
    <div class="bg-red-200">hello world!</div>
  </div>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('Hello!')
}
</script>

<style scoped></style>
