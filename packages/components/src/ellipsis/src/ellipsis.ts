import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import type { ElTooltipProps } from 'element-plus'

type TooltipProps = Partial<
  Omit<
    ElTooltipProps,
    | 'disabled'
    | 'content'
    | 'visible'
    | 'manual'
    | 'virtualTriggering'
    | 'virtualRef'
  >
>

export const defaultTooltipProps: TooltipProps = {
  placement: 'auto',
  enterable: true
}

export const ellipsisProps = {
  content: {
    type: String
  },
  tooltipProps: {
    type: Object as PropType<TooltipProps>,
    default: () => ({})
  },
  lineClamp: {
    type: Number,
    default: 1
  },
  maxWidth: {
    type: [Number, String],
    default: 'auto'
  },
  style: {
    type: [Object, String] as PropType<StyleValue>,
    default: () => ({})
  },
  class: {
    type: String
  }
}

export type CxzEllipsisProps = ExtractPropTypes<typeof ellipsisProps>
