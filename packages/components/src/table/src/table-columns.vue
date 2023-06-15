<template>
  <el-table-column
    v-for="(column, index) in columns"
    :key="index"
    v-bind="
      omit(column, ['headerRender', 'headerSlot', 'render', 'slot', 'children'])
    "
  >
    <template v-if="column.children?.length">
      <table-columns :columns="column.children" :columnsSlots="columnsSlots" />
      <div />
    </template>

    <template
      v-if="column.headerSlot && columnsSlots[column.headerSlot]"
      #header="scope"
    >
      <component
        :is="() => columnsSlots[column.headerSlot!]?.(scope)"
        v-bind="scope"
      />
    </template>

    <template
      v-if="column.render || (column.slot && columnsSlots[column.slot])"
      #default="scope"
    >
      <component v-if="column.render" :is="() => column.render?.(scope)" />
      <component
        v-else-if="column.slot && columnsSlots[column.slot]"
        :is="() => columnsSlots[column.slot!]?.(scope)"
      />
    </template>
  </el-table-column>
</template>

<script lang="ts">
export default {
  name: 'TableColumns'
}
</script>

<script setup lang="ts">
import { ElTableColumn } from 'element-plus'
import { omit } from 'lodash-es'
import { cxzTableProps } from './table'

import type { PropType, Slots } from 'vue'

defineProps({
  columns: cxzTableProps.columns,
  columnsSlots: {
    type: Object as PropType<Slots>,
    default: () => ({})
  }
})
</script>
