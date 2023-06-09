import { datePickerProps } from 'element-plus'

import type { ExtractPropTypes } from 'vue'

export const cxzDatePickerProp = {
  ...datePickerProps,
  beforeDisabledDate: {
    type: [String, Number, Date]
  },
  afterDisabledDate: {
    type: [String, Number, Date]
  },
  dateRangeLimit: {
    type: Number
  }
}

export type CxzDatePickerProp = ExtractPropTypes<typeof cxzDatePickerProp>
