<template>
  <div
    class="w-full bg-white rounded-xl"
    :style="{
      borderStyle: 'solid',
      borderWidth: 'thick',
      borderColor: goodsDetail.value.publisherType === UserType.STUDENT ?
             'green' : 'red'
    }"
  >
    <div class="goods-picture">
      <nut-image v-if="goodsImage !== ''" class="w-full" :src="goodsImage" />
      <nut-cell v-else :content="goodsDetail.value.name" />
    </div>
    <div class="goods-info px-2 pt-1">
      <div class="goods-name">
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
import { GoodsDetail } from '@/api/goods/response.ts'
import { ref, Ref, watch } from 'vue'
import { getIcon, iconUrl } from '@/api/goods'
import { UserType } from '@/api/global/enum.ts'

const props = defineProps<{
  goodsDetail: Ref<GoodsDetail>
  goodsId: Ref<number>
}>()

const goodsImage: Ref<string> = ref('')

watch(props.goodsId, async (_, newId) => {
  goodsImage.value = ''
  getIcon({ goodsId: newId }).then(
    (_) => (goodsImage.value = iconUrl({ goodsId: newId }))
  )
})
</script>

<style scoped></style>