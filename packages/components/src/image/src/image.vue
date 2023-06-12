<template>
  <div class="cxz-image">
    <el-image v-bind="imageProps" @load="onload" @error="onError">
      <div v-if="$slots.placeholder">
        <slot name="placeholder" />
      </div>
      <div v-if="$slots.error">
        <slot name="error" />
      </div>
    </el-image>

    <span
      v-if="isSuccess && ($slots.operation || withPreview || withDownload)"
      class="cxz-image-actions"
    >
      <el-space>
        <el-icon v-if="withPreview" @click="handlePreview">
          <component :is="previewIcon" />
        </el-icon>
        <el-icon v-if="withDownload" @click="handleDownload">
          <component :is="downloadIcon" />
        </el-icon>
        <slot name="operation" />
      </el-space>
    </span>

    <image-viewer
      ref="imageViewRef"
      :src="src"
      :z-index="zIndex"
      :initial-index="initialIndex"
      :infinite="infinite"
      :zoom-rate="zoomRate"
      :preview-src-list="previewSrcList"
      :hide-on-click-modal="hideOnClickModal"
      :preview-teleported="previewTeleported"
      :close-on-press-escape="closeOnPressEscape"
      @show="emit('show')"
      @close="emit('close')"
      @switch="(val: number) => emit('switch', val)"
    >
      <div v-if="$slots.viewer">
        <slot name="viewer" />
      </div>
    </image-viewer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElImage, ElIcon, ElSpace } from 'element-plus'
import ImageViewer from './image-viewer.vue'
import { download } from '@cxz-ui/utils'
import { pick } from 'lodash-es'

import { cxzImageProps, cxzImageEmit } from './image'

const props = defineProps(cxzImageProps)
const emit = defineEmits(cxzImageEmit)

const isSuccess = ref(false)
const onload = (e: any) => {
  isSuccess.value = true
  emit('load', e)
}
const onError = (e: any) => {
  isSuccess.value = false
  emit('error', e)
}

const imageProps = computed(() => {
  return pick(props, [
    'src',
    'fit',
    'loading',
    'lazy',
    'scroll-container',
    'alt',
    'referrerpolicy'
  ])
})

const imageViewRef = ref<InstanceType<typeof ImageViewer>>()
const handlePreview = () => {
  imageViewRef.value?.clickHandler()
}

const handleDownload = () => {
  download(props.src, props.fileName)
}

defineExpose({
  preview: handlePreview,
  download: handleDownload
})
</script>
