<template>
  <CxzForm
    :schema="schema"
    v-model="value"
    label-width="100px"
    label-position="right"
  >
    <template #key_2>
      <ElInputNumber v-model="value.key_2" />
    </template>

    <template #key_2_label2>修改label2</template>
  </CxzForm>
</template>

<script setup lang="ts">
import { CxzForm } from 'cxz-ui'
import { ref, markRaw } from 'vue'
import { ElInput, ElInputNumber } from 'element-plus'

import type { CxzFormSchema } from 'cxz-ui'

const value = ref<Record<string, any>>({})

const schema = ref<CxzFormSchema[]>([
  {
    prop: 'key_1',
    label: 'label1',
    component: markRaw(ElInput)
  },
  {
    prop: 'key_2',
    label: 'label2',
    slot: 'key_2',
    labelSlot: 'key_2_label2'
  },
  {
    prop: 'key_3',
    label: 'label3',
    component: markRaw(ElInput)
  }
])
</script>
