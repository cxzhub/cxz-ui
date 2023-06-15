import { formProps, rowProps } from 'element-plus'

import type { PropType, ExtractPropTypes } from 'vue'
import type { FormItemProps, ColProps } from 'element-plus'

export type CxzFormSchema = Partial<Omit<FormItemProps, 'model' | 'prop'>> & {
  prop: string
  layout?: layoutColProps
  slot?: string
  labelSlot?: string
  errorSlot?: string
  component?: any
  componentAttrs?: Record<string, any>
}
type layoutRowProps = Partial<ExtractPropTypes<typeof rowProps>>
type layoutColProps = Partial<ColProps>

export const cxzFormProps = {
  ...formProps,
  schema: {
    type: Array as PropType<CxzFormSchema[]>,
    default: () => []
  },
  layoutRow: {
    type: Object as PropType<layoutRowProps>,
    default: () => ({ gutter: 0 })
  },
  layoutCol: {
    type: Object as PropType<layoutColProps>,
    default: () => ({ span: 24 })
  },
  modelValue: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  }
}
