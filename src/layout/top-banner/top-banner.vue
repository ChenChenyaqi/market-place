<template>
  <div class="flex items-center bg-white h-8 pt-3">
    <div class="pl-3">
      <IconFont name="horizontal"></IconFont>
    </div>
    <div class="px-1 flex-1">
      <nut-searchbar v-model="searchValue" placeholder="搜索商品">
        <template v-slot:leftin>
          <IconFont name="search"></IconFont>
        </template>
      </nut-searchbar>
    </div>
    <div class="pr-2">
      <IconFont name="my2"></IconFont>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchValue = ref('')
</script>

<style scoped lang="less"></style>
