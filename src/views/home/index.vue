<template>
  <TopBanner />
  <div class="mt-12">
    <div class="goods-class-wrapper"></div>
    <div class="goods-cards-wrapper p-3 flex justify-center items-center">
      <GoodsList :goods-id-list="resultIdList"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopBanner from './top-banner/top-banner.vue'
import GoodsList from '@/components/goods-list/goodsList.vue'
import {reactive} from "vue";
import {QueryResponse} from "@/api/goods/response.ts";

const resultIdList = reactive<QueryResponse>([])
</script>

<style scoped></style>
