<template>
  <div class="w-full bg-white rounded-xl">
    <div class="goods-picture">
      <nut-image class="w-full" :src="goods.goodsPictureUrl" />
    </div>
    <div class="goods-info px-2 pt-1">
      <div class="goods-description">
        <nut-ellipsis
          :line-height="20"
          :content="goods.goodsDescription"
          :rows="2"
        />
      </div>
      <div class="goods-price px-2 pb-1">
        <nut-price class="!text-red-500" :price="goods.goodsPrice" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Goods } from './types'
const props = defineProps<{ goods: Goods }>()
</script>

<style scoped></style>
