<template>
  <li
    :aria-selected="selected"
    :style="style"
    :class="[
      ns.be('dropdown', 'option-item'),
      ns.is('selected', selected),
      ns.is('disabled', disabled),
      ns.is('created', created),
      { hover: hovering }
    ]"
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
  >
    <slot :option="item" :index="index" :disabled="disabled">
      <span>{{ item?.label }}</span>
    </slot>
  </li>
</template>

<script lang="ts" setup>
import { useNamespace } from 'element-plus'

const ns = useNamespace('select')

const props = defineProps({
  data: Array,
  disabled: Boolean,
  hovering: Boolean,
  item: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  style: Object,
  selected: Boolean,
  created: Boolean
})

const emit = defineEmits<{
  (e: 'select', item: Record<string, any>, index: number): void
  (e: 'hover', index: number): void
}>()

const hoverItem = () => {
  if (!props.disabled) {
    emit('hover', props.index)
  }
}
const selectOptionClick = () => {
  if (!props.disabled) {
    emit('select', props.item, props.index)
  }
}
</script>
