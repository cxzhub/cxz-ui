<template>
  <div class="cxz-pro-table">
    <div class="cxz-pro-table__filter">
      <CxzForm
        v-bind="proTableProps.formProps"
        :disabled="proTableState.loading"
        v-model="proTableState.formValue"
      >
        <template v-for="(_, name) in $slots" #[name]="data">
          <slot :name="name" v-bind="data" />
        </template>
      </CxzForm>
      <div style="text-align: right">
        <ElButton
          @click="proTableMethod?.onRefresh()"
          :disabled="proTableState.loading"
        >
          重置
        </ElButton>
        <ElButton
          type="primary"
          @click="proTableMethod?.onSearch()"
          :loading="proTableState.loading"
        >
          搜索
        </ElButton>
      </div>
    </div>
    <div class="cxz-pro-table__main">
      <CxzTable v-bind="proTableProps.tableProps" :data="proTableState.data">
        <template v-for="(_, name) in $slots" #[name]="data">
          <slot :name="name" v-bind="data" />
        </template>
      </CxzTable>
      <div class="cxz-pro-table__pagination">
        <ElPagination layout="prev, pager, next" :total="50" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxzTable } from '../../table'
import { CxzForm } from '../../form'
import { ElPagination, ElButton } from 'element-plus'

const props = defineProps({
  init: {
    type: Function,
    default: () => ({})
  }
})

const proTableState = ref<Record<string, any>>({})
const proTableProps = ref<Record<string, any>>({})
const proTableMethod = ref<Record<string, any>>({})

const bindState = (value: any) => {
  proTableState.value = value
}
const bindProps = (value: any) => {
  proTableProps.value = value
}
const bindMethod = (value: any) => {
  proTableMethod.value = value
}

if (typeof props.init === 'function') {
  props.init({ bindState, bindProps, bindMethod })
}
</script>
