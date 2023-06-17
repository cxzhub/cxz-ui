import { reactive } from 'vue'

import type { CxzTableProps } from '../../table'
import type { CxzFormProps } from '../../form'

interface CxzProTableFormProps
  extends Omit<CxzFormProps, 'modelValue' | 'showCount'> {
  defaultValue?: Record<string, any>
}
type CxzProTableTableProps = Omit<CxzTableProps, 'data'>

export interface UseProTableGetListParams extends Record<string, any> {
  page: number
  pageSize: number
}
export interface UseProTableGetListRes<T = any> extends Record<string, any> {
  data: T[]
  page: number
  pageCount: number
  itemCount: number
}
export interface UseProTableGetList<T = any> {
  (params: UseProTableGetListParams): Promise<UseProTableGetListRes<T>>
}

export type UseProTableParam<T = any> = {
  form?: CxzProTableFormProps
  table?: CxzProTableTableProps
  getList: UseProTableGetList<T>
  manual?: boolean
}

export const proTableDefaultState = {
  loading: false,
  formValue: {},
  data: [] as any[],
  pagination: {
    page: 1,
    pageSize: 10,
    defaultPage: 1,
    defaultPageSize: 10,
    pageCount: 0,
    itemCount: 0
  }
}

export type ProTableState = typeof proTableDefaultState
export type ProTableInnerProps = {
  formProps?: CxzProTableFormProps
  tableProps?: CxzProTableTableProps
}
export type ProTableInnerMethod = {
  onRefresh?: () => void
  onReset?: () => void
}
export type ProTableInitFunctionParams = {
  bindState: (val: ProTableState) => void
  bindProps: (val: ProTableInnerProps) => void
  bindMethod: (val: ProTableInnerMethod) => void
}

export function useProTable(param: UseProTableParam) {
  const state = reactive<ProTableState>(
    JSON.parse(JSON.stringify(proTableDefaultState))
  )

  if (param.form?.defaultValue) {
    Object.assign(state.formValue, param.form.defaultValue)
  }

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

  const defaultFormProps: CxzProTableFormProps = {
    layoutRow: { gutter: 20 },
    layoutCol: { span: 8 },
    labelWidth: 'auto'
  }

  const onRefresh = () => {
    getTableData(state.formValue)
  }

  const onReset = () => {
    state.formValue = JSON.parse(JSON.stringify(param.form?.defaultValue ?? {}))
    state.pagination.page = 1
    onRefresh()
  }

  const init = (params: ProTableInitFunctionParams) => {
    if (!param.manual) {
      state.pagination.page = 1
      onReset()
    }
    params.bindState(state)
    params.bindProps({
      formProps: { ...defaultFormProps, ...param.form },
      tableProps: param.table
    })
    params.bindMethod({
      onRefresh,
      onReset
    })
  }

  return {
    init,
    refresh: onRefresh,
    state
  }
}
