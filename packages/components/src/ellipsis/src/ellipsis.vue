<template>
  <div>
    <el-tooltip
      v-bind="mergeTooltipProps"
      :disabled="!isOverflow"
      :content="stringContent"
    >
      <div
        ref="ellipsisWrapRef"
        :class="[props.class]"
        :style="[style, defaultStyle]"
        class="cxz-ellipsis"
      >
        <template v-if="stringContent">
          {{ stringContent }}
        </template>
        <slot v-else />
      </div>

      <template #content>
        <el-scrollbar :wrap-style="{ 'max-width': '50vw' }" max-height="50vh">
          <template v-if="stringContent">
            {{ stringContent }}
          </template>
          <slot v-else-if="$slots.tooltip" name="tooltip" />
          <slot v-else />
        </el-scrollbar>
      </template>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { throttle } from 'lodash-es'
import { ellipsisProps, defaultTooltipProps } from './ellipsis'
import { addUnit } from 'element-plus/es/utils/index'
import { ElTooltip, ElScrollbar } from 'element-plus'

const props = defineProps(ellipsisProps)

const ellipsisWrapRef = ref<HTMLDivElement>()
const isOverflow = ref(false)

const defaultStyle = computed(() => {
  return {
    '--cxz-ellipsis-max-width': addUnit(props.maxWidth),
    '--cxz-ellipsis-line-clamp': props.lineClamp
  }
})

const mergeTooltipProps = computed(() => {
  const { popperClass, ...other } = props.tooltipProps
  return {
    ...defaultTooltipProps,
    ...other,
    popperClass: [popperClass, defaultTooltipProps.popperClass].join(' ')
  }
})

const stringContent = computed(() => String(props.content ?? ''))

const getOverflow = () => {
  if (!ellipsisWrapRef.value) {
    return false
  }
  const { offsetHeight, scrollHeight } = ellipsisWrapRef.value
  return offsetHeight < scrollHeight
}

const computedOverflow = () => {
  isOverflow.value = getOverflow()
}

const throttleComputedOverflow = throttle(computedOverflow, 300, {
  leading: false,
  trailing: true
})

useResizeObserver(ellipsisWrapRef, () => {
  throttleComputedOverflow()
})
</script>
