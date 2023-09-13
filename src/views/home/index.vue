<template>
  <div class="mt-8">
    <div class="goods-class-wrapper"></div>
    <div class="goods-cards-wrapper p-3 flex justify-center items-center">
      <GoodsList />
    </div>
  </div>
</template>

<script setup lang="ts">
import GoodsList from '@/components/goods-list/goods-list.vue'
</script>

<style scoped></style>
