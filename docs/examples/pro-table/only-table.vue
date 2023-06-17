<template>
  <CxzProTable ref="tableRef" :init="init" />

  <el-button @click="toggleSelection()">Clear selection</el-button>
</template>

<script setup lang="ts">
import { CxzProTable, useProTable } from 'cxz-ui'
import { getMock } from './mock'
import { ref } from 'vue'

const { init } = useProTable({
  getList: async (params) => {
    const { page, pageSize, ...rest } = params
    const res = await getMock(['date', 'name', 'address'], page, pageSize)
    return {
      data: res.data.data,
      page: res.data.page,
      pageCount: res.data.pageCount,
      itemCount: res.data.itemCount
    }
  },
  table: {
    columns: [
      {
        type: 'selection',
        width: 55
      },
      {
        prop: 'date',
        label: '日期'
      },
      {
        prop: 'name',
        label: '姓名'
      },
      {
        prop: 'address',
        label: '地址'
      }
    ]
  }
})

const tableRef = ref<InstanceType<typeof CxzProTable>>()
const toggleSelection = () => {
  tableRef.value?.tableRef?.clearSelection()
}
</script>
