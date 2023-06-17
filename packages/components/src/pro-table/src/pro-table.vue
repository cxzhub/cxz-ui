<template>
  <div class="cxz-pro-table">
    <div
      v-if="innerProps.formProps?.schema?.length"
      class="cxz-pro-table__filter"
    >
      <CxzForm
        v-bind="innerProps.formProps"
        :disabled="proTableState.loading"
        v-model="proTableState.formValue"
        :show-count="isFolded ? showCount : undefined"
      >
        <template v-for="(_, name) in mergeSlot" #[name]="data">
          <slot :name="name" v-bind="data" />
        </template>

        <template #$append>
          <div class="cxz-pro-table__filter-btns">
            <el-button @click="proTableMethod?.onReset?.()">重置</el-button>
            <el-button
              type="primary"
              @click="onSearch"
              :loading="proTableState.loading"
            >
              搜索
            </el-button>
            <el-button
              v-if="showSwitchBtn"
              type="primary"
              link
              @click="isFolded = !isFolded"
            >
              {{ isFolded ? '展开' : '收起' }}
              <el-icon>
                <component :is="isFolded ? ArrowDown : ArrowUp" />
              </el-icon>
            </el-button>
          </div>
        </template>
      </CxzForm>
    </div>

    <div class="cxz-pro-table__main">
      <div class="cxz-pro-table__main-operation">
        <slot name="$operation" />
      </div>
      <CxzTable
        ref="cxzTableRef"
        v-bind="innerProps.tableProps"
        v-on="tableEvents"
        :data="proTableState.data"
        v-loading="proTableState.loading"
      >
        <template #$append="data">
          <slot name="$append" v-bind="data" />
        </template>
        <template #$empty="data">
          <slot name="$empty" v-bind="data" />
        </template>

        <template v-for="(_, name) in mergeSlot" #[name]="data">
          <slot :name="name" v-bind="data" />
        </template>
      </CxzTable>
      <div class="cxz-pro-table__main-pagination">
        <ElPagination
          v-bind="pagination"
          :current-page="proTableState.pagination.page"
          :page-size="proTableState.pagination.pageSize"
          :total="proTableState.pagination.itemCount"
          :disabled="proTableState.loading"
          @update:current-page="onPageChange"
          @update:page-size="onPageSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { CxzTable } from '../../table'
import { CxzForm } from '../../form'
import { ElPagination, ElButton, ElIcon } from 'element-plus'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { proTableDefaultState } from './use-pro-table'
import { cxzProTableProps } from './pro-table'

import type {
  ProTableState,
  ProTableInnerProps,
  ProTableInnerMethod
} from './use-pro-table'

const props = defineProps(cxzProTableProps)

const emit = defineEmits([
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-contextmenu',
  'cell-click',
  'cell-dblclick',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'current-change',
  'header-dragend',
  'expand-change'
])

const tableEvents = {
  select(...args: any[]) {
    emit('select', ...args)
  },
  selectAll(...args: any[]) {
    emit('select-all', ...args)
  },
  selectionChange(...args: any[]) {
    emit('selection-change', ...args)
  },
  cellMouseEnter(...args: any[]) {
    emit('cell-mouse-enter', ...args)
  },
  cellMouseLeave(...args: any[]) {
    emit('cell-mouse-leave', ...args)
  },
  cellContextmenu(...args: any[]) {
    emit('cell-contextmenu', ...args)
  },
  cellClick(...args: any[]) {
    emit('cell-click', ...args)
  },
  cellDblclick(...args: any[]) {
    emit('cell-dblclick', ...args)
  },
  rowClick(...args: any[]) {
    emit('row-click', ...args)
  },
  rowContextmenu(...args: any[]) {
    emit('row-contextmenu', ...args)
  },
  rowDblclick(...args: any[]) {
    emit('row-dblclick', ...args)
  },
  headerClick(...args: any[]) {
    emit('header-click', ...args)
  },
  headerContextmenu(...args: any[]) {
    emit('header-contextmenu', ...args)
  },
  sortChange(...args: any[]) {
    emit('sort-change', ...args)
  },
  filterChange(...args: any[]) {
    emit('filter-change', ...args)
  },
  currentChange(...args: any[]) {
    emit('current-change', ...args)
  },
  headerDragend(...args: any[]) {
    emit('header-dragend', ...args)
  },
  expandChange(...args: any[]) {
    emit('expand-change', ...args)
  }
}

const slots = useSlots()
const mergeSlot = computed(() => {
  const { $operation, $append, $empty, ...rest } = slots
  return rest
})

const proTableState = ref<ProTableState>(
  JSON.parse(JSON.stringify(proTableDefaultState))
)
const innerProps = ref<ProTableInnerProps>({
  formProps: {},
  tableProps: {}
})
const proTableMethod = ref<ProTableInnerMethod>({})

const bindState = (value: ProTableState) => {
  proTableState.value = value
}
const bindProps = (value: ProTableInnerProps) => {
  innerProps.value = value
}
const bindMethod = (value: ProTableInnerMethod) => {
  proTableMethod.value = value
}

if (typeof props.init === 'function') {
  props.init({ bindState, bindProps, bindMethod })
}

const isFolded = ref(true)
const showSwitchBtn = computed(() => {
  const { schema = [] } = innerProps.value.formProps ?? {}
  return schema.length > props.showCount
})

const onSearch = () => {
  proTableState.value.pagination.page = 1
  proTableMethod.value?.onRefresh?.()
}

function onPageChange(page: number) {
  if (proTableState.value) {
    proTableState.value.pagination.page = page
    proTableMethod.value?.onRefresh?.()
  }
}
function onPageSizeChange(size: number) {
  if (proTableState.value) {
    proTableState.value.pagination.pageSize = size
    proTableMethod.value?.onRefresh?.()
  }
}

const cxzTableRef = ref<InstanceType<typeof CxzTable>>()
const tableRef = computed(() => cxzTableRef.value?.tableRef)

defineExpose({
  tableRef
})
</script>
