<template>
  <CxzTable
    ref="multipleTableRef"
    :columns="columns"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  />
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">
      Toggle selection status of second and third rows
    </el-button>
    <el-button @click="toggleSelection()">Clear selection</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { CxzTable } from 'cxz-ui'

import type { CxzTableColumn } from 'cxz-ui'

interface User {
  date: string
  name: string
  address: string
}

const columns = ref<CxzTableColumn<User>[]>([
  {
    type: 'selection',
    width: 55
  },
  {
    prop: 'date',
    label: 'Date',
    width: 120
  },
  {
    prop: 'name',
    label: 'Name',
    width: 120
  },
  {
    prop: 'address',
    label: 'Address',
    showOverflowTooltip: true
  }
])

const multipleTableRef = ref<InstanceType<typeof CxzTable>>()
const multipleSelection = ref<User[]>([])
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value.tableRef!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value?.tableRef!.clearSelection()
  }
}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

const tableData: User[] = [
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
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>
