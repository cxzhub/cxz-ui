<template>
  <CxzTable :columns="columns" :data="tableData" />
</template>

<script setup lang="ts">
import { CxzTable } from 'cxz-ui'
import { ref, h } from 'vue'
import { ElTag } from 'element-plus'

import type { CxzTableColumn } from 'cxz-ui'

interface Data {
  date: string
  name: string
  address: string
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

const columns = ref<CxzTableColumn<Data>[]>([
  {
    prop: 'date',
    label: 'Date',
    render: ({ row, column, $index }) => {
      return row.date + column.label + $index
    },
    renderHeader: ({ column, $index }) => {
      return h('div', { style: 'color:red;' }, column.label)
    }
  },
  {
    prop: 'name',
    label: 'Name',
    render: ({ row }) => {
      return h(ElTag, null, { default: () => row.name })
    }
  },
  {
    prop: 'address',
    label: 'Address'
  }
])
</script>
