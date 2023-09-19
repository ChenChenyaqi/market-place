<template>
  <TopBanner />
  <div class="mt-12">
    <div class="goods-class-wrapper"></div>
    <div class="goods-cards-wrapper p-3 flex justify-center items-center">
      <GoodsList :goods-list="resultList"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopBanner from './top-banner/top-banner.vue'
import GoodsList from '@/components/goods-list/goodsList.vue'
import {reactive} from "vue";
import {QueryResponse} from "@/api/goods/response.ts";
import {queryGoods} from "@/api/goods";

const resultList = reactive<QueryResponse>([])

queryGoods({})
  .then(e => {
    resultList.push(...e)
  })
</script>

<style scoped></style>
