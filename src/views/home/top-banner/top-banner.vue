<template>
  <div
    class="fixed top-0 left-0 w-full z-50 flex items-center h-12 pt-3 bg-white"
  >
    <div class="pl-3">
      <IconFont name="horizontal" @click="$emit('showAction')"></IconFont>
    </div>
    <div class="px-1 flex-1">
      <nut-searchbar
        class="h-5 -translate-y-1"
        v-model="_searchValue"
        placeholder="搜索商品"
        @search="$emit('search')"
      >
        <template v-slot:leftin>
          <IconFont name="search"></IconFont>
        </template>
      </nut-searchbar>
    </div>
    <div class="pr-2">
      <IconFont
        class="text-main-color"
        name="my2"
        @click="$emit('showMe')"
      ></IconFont>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconFont } from '@nutui/icons-vue'

const props = defineProps<{
  searchValue: string
}>()

const _searchValue = ref(props.searchValue)

defineEmits<{
  showAction: () => void
  showMe: () => void
}>()
</script>

<style scoped lang="less"></style>