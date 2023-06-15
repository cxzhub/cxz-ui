<template>
  <el-table v-bind="tableProps" ref="tableRef" class="cxz-table">
    <template v-if="$slots.$append" #append="data">
      <slot name="$append" v-bind="data" />
    </template>
    <template v-if="$slots.$empty" #empty="data">
      <slot name="$empty" v-bind="data" />
    </template>
    <TableColumns :columns="columns" :columnsSlots="columnsSlots" />
  </el-table>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
import { ElTable } from 'element-plus'
import TableColumns from './table-columns.vue'
import { cxzTableProps } from './table'

import type { TableInstance } from 'element-plus'

const props = defineProps(cxzTableProps)
const slots = useSlots()

const tableProps = computed(() => {
  const { columns, ...rest } = props
  return rest
})
const columnsSlots = computed(() => {
  const { $append, $empty, ...rest } = slots
  return rest
})

const tableRef = ref<TableInstance>()

defineExpose({
  tableRef
})
</script>
