import { computed, reactive, watch } from 'vue'

import type { CxzTableProps } from '../../table'
import type { CxzFormProps } from '../../form'

interface CxzProTableFormProps extends Omit<CxzFormProps, 'modelValue'> {
  defaultValue?: Record<string, any>
}
type CxzProTableTableProps = Omit<CxzTableProps, 'data'>

export type UseProTableParam = {
  form?: CxzProTableFormProps
  table?: CxzProTableTableProps
  getList: (param?: any) => any
  manual?: boolean
}

export function useProTable(param: UseProTableParam) {
  const state = reactive({
    loading: false,
    formValue: {},
    data: [],
    pagination: {
      page: 1,
      pageSize: 10,
      defaultPage: 1,
      defaultPageSize: 10,
      pageCount: 0,
      itemCount: 0
    }
  })

  async function getTableData(filter: Record<string, any> = {}) {
    try {
      state.loading = true
      const res = await param.getList({
        ...filter,
        page: state.pagination.page,
        pageSize: state.pagination.pageSize
      })
      state.data = res.data
      state.pagination.page = res.page
      state.pagination.pageCount = res.pageCount
      state.pagination.itemCount = res.itemCount
    } catch (e) {
      state.data = []
    } finally {
      state.loading = false
    }
  }

  const onSearch = () => {
    console.log(state.formValue)
    getTableData(state.formValue)
  }

  function onRefresh() {
    state.formValue = {}
    onSearch()
  }

  const init = (params: any) => {
    if (!param.manual) {
      onSearch()
    }
    params.bindState(state)
    params.bindProps({
      formProps: param.form,
      tableProps: param.table
    })
    params.bindMethod({
      onSearch,
      onRefresh
    })
  }

  return {
    init,
    onRefresh
  }
}
