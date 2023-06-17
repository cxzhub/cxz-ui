import type { PropType, ExtractPropTypes } from 'vue'
import type { paginationProps } from 'element-plus'
import type { ProTableInitFunctionParams } from './use-pro-table'

type PaginationProps = Omit<
  Partial<ExtractPropTypes<typeof paginationProps>>,
  'currentPage' | 'pageSize' | 'total'
> &
  Record<string, any>

export const cxzProTableProps = {
  init: {
    type: Function as PropType<(val: ProTableInitFunctionParams) => void>,
    default: () => ({})
  },
  showCount: {
    type: Number,
    default: 2
  },
  pagination: {
    type: Object as PropType<PaginationProps>,
    default: () => ({
      layout: 'total, sizes, prev, pager, next, jumper',
      pagerCount: 5,
      pageSizes: [10, 20, 50, 100]
    })
  }
}

export type CxzProTableProps = Partial<
  ExtractPropTypes<typeof cxzProTableProps>
>
