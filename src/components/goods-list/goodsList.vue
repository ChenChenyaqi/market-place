<template>
  <div class="gap-2 w-full">
    <div class="w-full">
      <transition-group name="list" tag="div" class="w-[90%] mx-[5%]">
        <GoodsCard
          v-for="{ goodsId, detail } in goodsInfos"
          :key="goodsId"
          :goods-id="goodsId"
          :goods-detail="detail"
          class="mt-[10%]"
        />
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, watch} from 'vue'
import { GoodsInfo } from '@/components/goods-list/type.ts'
import { queryGoodsInfo } from '@/api/goods'
import GoodsCard from '@/components/goods-list/goods-card/goodsCard.vue'
import {QueryResponse} from "@/api/goods/response.ts";

const props = defineProps<{
  goodsList: QueryResponse
}>()

const goods = reactive(props.goodsList)
const goodsInfos = reactive<GoodsInfo[]>([])
let renderedSize = 0

watch(goods, async (_, lst) => {
  const limit = lst.length
  const details = await queryGoodsInfo({
    goodsIds: lst.slice(renderedSize, limit).map(i => i.goodsId)
  }).then(e=>e, ()=>{
    lst.length = renderedSize
  })
  for (;renderedSize < limit; renderedSize ++){
    const id = goods[renderedSize].goodsId
    if (!(id in details))
      continue
    goodsInfos.push({
      goodsId: id,
      detail: details[id]
    })
  }
})
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>