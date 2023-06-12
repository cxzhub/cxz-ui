import { imageProps, imageEmits } from 'element-plus'
import { iconPropType } from 'element-plus/es/utils/index'
import { ZoomIn, Download } from '@element-plus/icons-vue'

import type { ExtractPropTypes } from 'vue'

export const cxzImageProps = {
  ...imageProps,
  previewTeleported: {
    type: Boolean,
    default: true
  },
  initialIndex: {
    type: Number
  },
  withPreview: {
    type: Boolean,
    default: false
  },
  previewIcon: {
    type: iconPropType,
    default: ZoomIn
  },
  withDownload: {
    type: Boolean,
    default: false
  },
  downloadIcon: {
    type: iconPropType,
    default: Download
  },
  fileName: {
    type: String
  }
}

export const cxzImageEmit = {
  ...imageEmits
}

export type CxzImageProps = ExtractPropTypes<typeof cxzImageProps>
