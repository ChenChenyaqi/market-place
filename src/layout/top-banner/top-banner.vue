<template>
  <div class="flex justify-between bg-gray-100 h-6 text-xs px-3">
    <div class="left h-full flex items-center gap-2">
      <div
        v-if="!isLogin"
        class="text-main-color hover:text-red-400 hover:cursor-pointer"
      >
        亲，请登录
      </div>
      <div v-else class="text-sky-500">欢迎回来: {{ useInfo.username }}</div>
      <div class="text-gray-500 hover:text-gray-400 hover:cursor-pointer">
        免费注册
      </div>
    </div>
    <div class="right h-full flex items-center gap-2">
      <div
        class="flex items-center gap-1 hover:cursor-pointer hover:text-main-color"
      >
        <el-icon :size="16"><ShoppingCart class="text-main-color" /></el-icon>
        <span>购物车</span>
      </div>
      <div class="flex items-center gap-1 hover:cursor-pointer">
        <el-icon :size="16"><Star class="text-main-color" /></el-icon>
        <span class="hover:text-main-color hover:cursor-pointer">收藏夹</span>
      </div>
      <div class="flex items-center gap-1 hover:cursor-pointer">
        <el-icon :size="16"><User class="text-main-color" /></el-icon>
        <span class="hover:text-main-color hover:cursor-pointer">个人中心</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/user/index'
import { computed } from 'vue'

const { useInfo } = useUserStore()

const isLogin = computed<boolean>(() => {
  return useInfo.username !== ''
})
</script>

<style scoped lang="less"></style>
