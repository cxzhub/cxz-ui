import { ArrowDown, CircleClose } from '@element-plus/icons-vue'
import { iconPropType } from 'element-plus/es/utils/index'
import { tagProps } from 'element-plus'

import type { ExtractPropTypes, PropType } from 'vue'
import type { Option, Config } from './select.types'

export const selectProps = {
  // base
  modelValue: [Array, String, Number, Boolean, Object] as PropType<
    any[] | string | number | boolean | Record<string, any> | any
  >,
  disabled: Boolean,
  multiple: Boolean,
  props: {
    type: Object as PropType<Partial<Config>>
  },
  options: {
    type: Array as PropType<Option[]>,
    default: () => []
  },

  // tooltip
  popperClass: {
    type: String,
    default: ''
  },

  // select input
  name: String,
  placeholder: {
    type: String,
    default: '请选择'
  },
  suffixIcon: {
    type: iconPropType,
    default: ArrowDown
  },
  clearable: {
    type: Boolean,
    default: true
  },
  clearIcon: {
    type: iconPropType,
    default: CircleClose
  },

  // content
  collapseTags: Boolean,
  collapseTagsTooltip: Boolean,
  // eslint-disable-next-line vue/require-prop-types
  tagType: { ...tagProps.type, default: 'info' },
  tagsHeight: [String, Number],

  // Options
  // commom
  loading: Boolean,
  loadingText: {
    type: String,
    default: '加载中...'
  },
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  remote: Boolean,
  remoteMethod: Function,
  filterable: Boolean,
  filterMethod: Function,
  beforeSelect: {
    type: Function as PropType<
      (
        value: any,
        option: Record<string, any>,
        isSelect: boolean
      ) => Promise<void> | boolean
    >
  },
  // list
  fitInputWidth: {
    type: Boolean,
    default: false
  },
  multipleLimit: {
    type: Number,
    default: 0
  },
  multipleLimitText: {
    type: String,
    default: '选择个数超过限制'
  },
  itemHeight: {
    type: Number,
    default: 32
  },
  height: {
    type: Number,
    default: 192
  },
  estimatedOptionHeight: Number,
  scrollbarAlwaysOn: Boolean,
  validateEvent: {
    type: Boolean,
    default: true
  },
  isObject: Boolean,

  // 用于回显
  valueOptions: {
    type: Array as PropType<Option[]>,
    default: () => []
  }
}

export type CxzSelectProps = ExtractPropTypes<typeof selectProps>
