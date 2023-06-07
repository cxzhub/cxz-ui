<template>
  <ElButton
    v-bind="
      omit(props, [
        'throttleSetting',
        'throttleWait',
        'debounceSetting',
        'debounceWait'
      ])
    "
    @click="handleClick"
  >
    <slot v-if="$slots.default" />
    <template v-if="$slots.loading" #loading>
      <slot name="loading" />
    </template>
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
  </ElButton>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import { debounce, throttle, omit } from 'lodash-es'
import { cxzButtonProps } from './button'

const props = defineProps(cxzButtonProps)
const emit = defineEmits<{
  (e: 'click', val: MouseEvent): void
}>()

const throttleFunc = throttle(
  (e: MouseEvent) => emit('click', e),
  props.throttleWait,
  props.throttleSetting
)

const debounceFunc = debounce(
  (e: MouseEvent) => emit('click', e),
  props.debounceWait,
  props.debounceSetting
)

const handleClick = (e: MouseEvent) => {
  if (props.throttleWait) {
    throttleFunc(e)
  } else if (props.debounceWait) {
    debounceFunc(e)
  } else {
    emit('click', e)
  }
}
</script>
