<template>
  <div
    class="fixed top-0 left-0 w-full z-50 flex items-center h-12 pt-3 bg-white"
  >
    <div class="pl-3">
      <IconFont name="horizontal"></IconFont>
    </div>
    <div class="px-1 flex-1">
      <nut-searchbar
        class="h-5 -translate-y-1"
        v-model="searchValue"
        placeholder="搜索商品"
      >
        <template v-slot:leftin>
          <IconFont name="search"></IconFont>
        </template>
      </nut-searchbar>
    </div>
    <div class="pr-2">
      <IconFont class="text-main-color" name="my2" @click="click"></IconFont>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {IconFont} from "@nutui/icons-vue";
import router from "@/router";

const searchValue = ref('')

function click() {
  router.push("/sign")
}
</script>

<style scoped lang="less"></style>
