<template>
  <CxzSelect
    v-model="value"
    :options="options"
    filterable
    :before-select="beforeSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxzSelect } from 'cxz-ui'
import { ElMessage } from 'element-plus'

const options = ref([
  { label: 'label1', value: 1 },
  { label: 'label2', value: 2 },
  { label: 'label3', value: 3 },
  { label: 'label4', value: 4 },
  { label: 'label5', value: 5 }
])

const value = ref()

const beforeSelect = (
  value: number,
  option: Record<string, any>,
  isSelected: boolean
) => {
  if (value === 1) {
    ElMessage.error('不能选择哦！')
    return false
  }
  return true
}
</script>
