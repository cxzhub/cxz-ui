<template>
  <CxzForm
    v-model="value"
    :schema="schema"
    label-width="60px"
    label-position="right"
    :layout-row="{ gutter: 20 }"
    :layout-col="{ span: 8 }"
  />
</template>

<script setup lang="ts">
import { CxzForm } from 'cxz-ui'
import { ref, markRaw } from 'vue'
import { ElInput } from 'element-plus'

import type { CxzFormSchema } from 'cxz-ui'

const value = ref({})
const schema = ref<CxzFormSchema[]>([
  {
    prop: 'key_1',
    label: 'label1',
    component: markRaw(ElInput),
    layout: {
      span: 16
    }
  },
  {
    prop: 'key_2',
    label: 'label2',
    component: markRaw(ElInput)
  },
  {
    prop: 'key_3',
    label: 'label3',
    component: markRaw(ElInput)
  },
  {
    prop: 'key_4',
    label: 'label4',
    component: markRaw(ElInput)
  },
  {
    prop: 'key_5',
    label: 'label5',
    component: markRaw(ElInput)
  },
  {
    prop: 'key_6',
    label: 'label6',
    component: markRaw(ElInput),
    layout: {
      span: 24
    }
  }
])
</script>
