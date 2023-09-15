<template>
  <div>
    <svg :style="{ width: size, height: size }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  //xlink:href属性值的前缀
  prefix: {
    type: String,
    default: '#icon-'
  },
  name: String,
  //svg图标的颜色
  color: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '16px'
  }
})
</script>
