<template>
  <el-image-viewer
    v-if="showViewer && urlList.length"
    :z-index="zIndex"
    :initial-index="imageIndex"
    :infinite="infinite"
    :zoom-rate="zoomRate"
    :url-list="urlList"
    :hide-on-click-modal="hideOnClickModal"
    :teleported="previewTeleported"
    :close-on-press-escape="closeOnPressEscape"
    @close="closeViewer"
    @switch="switchViewer"
  >
    <div v-if="$slots.viewer">
      <slot name="viewer" />
    </div>
  </el-image-viewer>
</template>

<script setup lang="ts">
import { ElImageViewer } from 'element-plus'
import { computed, ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { pick } from 'lodash-es'

import { cxzImageProps, cxzImageEmit } from './image'

const props = defineProps(
  pick(cxzImageProps, [
    'src',
    'zIndex',
    'infinite',
    'zoomRate',
    'previewSrcList',
    'hideOnClickModal',
    'closeOnPressEscape',
    'previewTeleported',
    'initialIndex'
  ])
)
const emit = defineEmits(pick(cxzImageEmit, ['show', 'close', 'switch']))

const urlList = computed(() => {
  if (props.previewSrcList?.length) {
    return props.previewSrcList
  }
  if (props.src) {
    return [props.src]
  }
  return []
})

const imageIndex = computed(() => {
  const { initialIndex } = props
  const currentIndex = urlList.value.findIndex((el) => el === props.src)
  let previewIndex = currentIndex
  if (initialIndex !== undefined) {
    previewIndex = initialIndex
    if (initialIndex > urlList.value.length - 1) {
      previewIndex = 0
    }
  }
  return previewIndex
})

let stopWheelListener: (() => void) | undefined
let prevOverflow = ''
const showViewer = ref(false)

function wheelHandler(e: WheelEvent) {
  if (!e.ctrlKey) return

  if (e.deltaY < 0) {
    e.preventDefault()
    return false
  } else if (e.deltaY > 0) {
    e.preventDefault()
    return false
  }
}

function clickHandler() {
  stopWheelListener = useEventListener('wheel', wheelHandler, {
    passive: false
  })

  // prevent body scroll
  prevOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  showViewer.value = true
  emit('show')
}

function closeViewer() {
  stopWheelListener?.()
  document.body.style.overflow = prevOverflow
  showViewer.value = false
  emit('close')
}

function switchViewer(val: number) {
  emit('switch', val)
}

defineExpose({
  clickHandler
})
</script>
