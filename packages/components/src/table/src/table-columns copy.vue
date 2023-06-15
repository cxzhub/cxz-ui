<script lang="ts">
import { h } from 'vue'
import { ElTableColumn } from 'element-plus'
import { cxzTableProps } from './table'

import type { PropType, Slots } from 'vue'
import type { CxzTableColumn } from './table'

export default {
  name: 'TableColumns',
  props: {
    columns: cxzTableProps.columns,
    columnsSlots: {
      type: Object as PropType<Slots>,
      default: () => ({})
    }
  },
  setup(props) {
    const renderColumns = (columns: CxzTableColumn[]) =>
      columns.map(
        ({ children, render, renderHeader, slot, headerSlot, ...column }) =>
          h(
            ElTableColumn,
            { ...column },
            {
              header: (scope: any) =>
                ((scope?: any) => {
                  if (headerSlot && props.columnsSlots[headerSlot]) {
                    return props.columnsSlots[headerSlot]
                  }
                  return renderHeader?.(scope) ?? null
                })(scope),
              default: (scope: any) => {
                if (children?.length) {
                  return renderColumns(children)
                }
                if (slot && props.columnsSlots[slot]) {
                  return props.columnsSlots[slot]!(scope)
                }

                return render?.(scope) ?? null
              }
            }
          )
      )
    return () => (props.columns?.length ? renderColumns(props.columns) : null)
  }
}
</script>
