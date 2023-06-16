<template>
  <CxzProTable :init="init">
    <template #address>啦啦啦</template>
  </CxzProTable>
</template>

<script setup lang="ts">
import { markRaw, ref } from 'vue'
import { CxzProTable, useProTable } from 'cxz-ui'
import { ElInput, ElInputNumber } from 'element-plus'

function delay(timestamp: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timestamp)
  })
}

const { init } = useProTable({
  getList: async () => {
    await delay(1000)
  },
  form: {
    layoutCol: {
      span: 8
    },
    schema: [
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
        prop: 'key_4.key_5',
        label: '备注',
        component: markRaw(ElInput),
        componentAttrs: {
          placeholder: '请输入备注'
        }
      }
    ]
  },
  table: {
    columns: [
      {
        prop: 'date',
        label: 'Date'
      },
      {
        prop: 'name',
        label: 'Name'
      },
      {
        prop: 'address',
        label: 'Address'
      }
    ]
  }
})
</script>
