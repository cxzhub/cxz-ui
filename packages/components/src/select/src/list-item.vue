<template>
  <ListItemGroup
    v-if="item[config.type] === 'Group'"
    :item="item"
    :style="style"
    :height="height"
  />
  <ListItemOption
    v-else
    :data="data"
    :style="style"
    :scrolling="isScrolling"
    :index="index"
    :selected="isSelected"
    :disabled="item.disabled || disabled"
    :hovering="hovering"
    :item="item"
    @select="onSelect"
    @hover="onHover"
  >
    <template #default="scope">
      <slot v-bind="scope">
        <span>{{ item[config.label] }}</span>
      </slot>
    </template>
  </ListItemOption>
  <div />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isEmpty } from 'element-plus/es/utils/index'
import { isPlainObject } from 'lodash-es'

import ListItemGroup from './list-item-group.vue'
import ListItemOption from './list-item-option.vue'

import type { CSSProperties, PropType } from 'vue'
import type { Config } from './select.types'

const props = defineProps({
  data: {
    type: Array as PropType<Record<string, any>[]>,
    required: true
  },
  style: {
    type: [String, Object] as PropType<CSSProperties>
  },
  isScrolling: Boolean,
  index: {
    type: Number,
    required: true
  },
  height: Number,
  hovering: Boolean,
  disabled: Boolean,
  modelValue: [Array, String, Number, Boolean, Object],
  config: {
    type: Object as PropType<Config>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'select', item: Record<string, any>, index: number): void
  (e: 'hover', index: number): void
}>()

const item = computed(() => props.data[props.index] ?? {})
const key = computed(() => item.value[props.config.value])
const isSelected = computed(() => {
  if (isEmpty(props.modelValue)) {
    return false
  }
  const valueArr = Array.isArray(props.modelValue)
    ? props.modelValue
    : [props.modelValue]
  const keyArr = []
  for (const item of valueArr) {
    keyArr.push(
      isPlainObject(item)
        ? (item as Record<string, any>)[props.config.value]
        : item
    )
  }

  return keyArr.includes(key.value)
})

const onSelect = (item: Record<string, any>, index: number) => {
  emit('select', item, index)
}
const onHover = (index: number) => {
  emit('hover', index)
}
</script>
