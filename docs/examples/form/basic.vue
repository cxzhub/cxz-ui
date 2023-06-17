<template>
  <CxzForm v-model="value" :schema="schema" label-width="80px" />

  <div>值： {{ value }}</div>
</template>

<script setup lang="ts">
import { CxzForm } from 'cxz-ui'
import { ref, markRaw } from 'vue'
import { ElInput, ElInputNumber } from 'element-plus'
import { CxzSelect } from 'cxz-ui'

import type { CxzFormSchema } from 'cxz-ui'

const value = ref({})
const schema = ref<CxzFormSchema[]>([
  {
    prop: 'key_1',
    label: '姓名',
    component: markRaw(ElInput),
    componentAttrs: {
      placeholder: '请输入姓名'
    }
  },
  {
    prop: 'key_2',
    label: '年龄',
    component: markRaw(ElInputNumber)
  },
  {
    prop: 'key_3',
    label: '学历',
    component: markRaw(CxzSelect),
    componentAttrs: {
      placeholder: '请选择学历',
      options: [
        {
          label: '高中',
          value: 0
        },
        {
          label: '大专',
          value: 1
        },
        {
          label: '本科',
          value: 2
        }
      ]
    }
  },
  {
    prop: 'key_4.key_5',
    label: '备注',
    component: markRaw(ElInput),
    componentAttrs: {
      placeholder: '请输入备注',
      type: 'textarea'
    }
  }
])
</script>
