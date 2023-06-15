import elTableProps from 'element-plus/es/components/table/src/table/defaults'
import elTableColumnProps from 'element-plus/es/components/table/src/table-column/defaults'

import type { PropType, ExtractPropTypes } from 'vue'
import type { TableColumnCtx } from 'element-plus'

type ElTableColumnProps = ExtractPropTypes<typeof elTableColumnProps>
type RenderHeader<T> = {
  column: TableColumnCtx<T>
  $index: number
}
type RenderDefault<T> = RenderHeader<T> & {
  row: T
}

export interface CxzTableColumn<T = any> extends Partial<ElTableColumnProps> {
  children?: CxzTableColumn<T>[]
  render?: (data: RenderDefault<T>) => any
  slot?: string
  headerSlot?: string
}

export const cxzTableProps = {
  ...elTableProps,
  columns: {
    type: Array as PropType<CxzTableColumn[]>,
    default: () => []
  }
}

export type CxzTableProps = Partial<ExtractPropTypes<typeof cxzTableProps>>
