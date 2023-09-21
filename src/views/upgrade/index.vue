<template>
  <upgrade-form />
</template>

<script setup lang="ts">
import UpgradeForm from '@/views/upgrade/form/upgradeForm.vue'
import { ref } from 'vue'
import { useUserStore } from '@/store/user'

const user = useUserStore()
const form = ref<UpgradeForm>(null)
</script>

<style scoped></style>