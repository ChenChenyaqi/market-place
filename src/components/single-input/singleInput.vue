<template>
  <nut-dialog v-model:visible="_visible" :closeOnPopstate="true" no-footer>
    <h1>{{ _title }}</h1>
    <nut-input v-model="_input" input-align="center">
      <template #right>
        <nut-button
          size="small"
          :disabled="!allowSubmit(_input)"
          @click="$emit('submit')"
        >
          确认
        </nut-button>
      </template>
    </nut-input>
  </nut-dialog>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

defineEmits<{
  submit: () => void
}>()

const props = defineProps<{
  title: string
  allowSubmit: (string) => boolean
}>()

const _title = ref(props.title)
const _input = ref('')
const _visible = ref(false)

defineExpose({
  visible: _visible,
  input: _input
})
</script>

<style scoped></style>