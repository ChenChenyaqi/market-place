<template>
  <div class="gap-2 w-full">
    <div class="w-full">
      <nut-infinite-loading
        :has-more="hasMore"
        :on-load-more="
          () => {
            renderedSize = 0
            $emit('load')
          }
        "
        load-more-txt="没有找到想要的？自己发布一个吧！"
        v-model="_loading"
      >
        <nut-pull-refresh @refresh="$emit('refresh')" v-model="_refreshing">
          <transition-group name="list" tag="div" class="w-[90%] mx-[5%]">
            <GoodsCard
              v-for="{ goodsId, detail } in goodsInfos"
              :key="goodsId"
              :goods-id="goodsId"
              :goods-detail="detail"
              class="mt-[10%]"
              @click="$emit('clicked', goodsId)"
            />
          </transition-group>
        </nut-pull-refresh>
      </nut-infinite-loading>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { GoodsInfo } from '@/components/goods-list/type.ts'
import { queryGoodsInfo } from '@/api/goods'
import GoodsCard from '@/components/goods-list/goods-card/goodsCard.vue'
import { QueryResponse } from '@/api/goods/response.ts'

defineEmits<{
  load: () => void
  refresh: () => void
  clicked: (goodsId: bigint) => void
}>()

const props = defineProps<{
  hasMore: boolean
  goodsList: QueryResponse
}>()

const _loading = ref(false)
const _refreshing = ref(false)
const goods = reactive(props.goodsList)
const goodsInfos = reactive<GoodsInfo[]>([])
let renderedSize = 0

defineExpose({
  loading: _loading,
  refreshing: _refreshing
})

watch(goods, (_, lst) => {
  const limit = lst.length

  queryGoodsInfo({
    goodsIds: lst.slice(renderedSize, limit).map((i) => i.goodsId)
  })
    .then(
      (e) => e,
      () => {
        lst.length = renderedSize
      }
    )
    .then((details) => {
      for (; renderedSize < limit; renderedSize++) {
        const id = goods[renderedSize].goodsId
        if (!(id in details)) continue
        goodsInfos.push({
          goodsId: id,
          detail: details[id]
        })
      }
    })
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