<template>
  <div class="flex gap-2">
    <div class="left flex flex-col gap-2 w-phone-w">
      <transition-group name="list" tag="div">
        <GoodsCard
          v-for="{goodsId, detail} in leftGoodsList"
          :key="goodItem.goodsId"
          :goods-id="goodsId"
          :goods-detail="detail"
        />
      </transition-group>
    </div>
    <div class="right flex flex-col gap-2 w-phone-w">
      <transition-group name="list" tag="div">
        <GoodsCard
          v-for="{goodsId, detail}  in rightGoodsList"
          :key="goodItem.goodsId"
          :goods-id="goodsId"
          :goods-detail="detail"
        />
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">

import {reactive, watch} from "vue";
import {GoodsInfo} from "@/components/goods-list/type.ts";
import {queryGoodsInfo} from "@/api/goods";
import GoodsCard from "@/components/goods-list/goods-card/goodsCard.vue";

const props = defineProps<{
  goodsIdList: number[]
}>()

const goods = reactive(props.goodsIdList)
const leftGoodsList = reactive<GoodsInfo[]>([])
const rightGoodsList = reactive<GoodsInfo[]>([])
let renderedSize = 0

watch(goods, async (_, lst) => {
  const updated: number[] = lst.slice(renderedSize)
  renderedSize = lst.length
  const details = await queryGoodsInfo({
    goodsIds: updated
  })
  let left: Boolean = false
  for (let id in updated){
    if (!(id in details))
      continue
    (left ? leftGoodsList : rightGoodsList)
      .push({
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
