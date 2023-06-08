<template>
  <div v-if="!filteredOptions.length" :class="ns.b('dropdown')">
    <slot name="empty" :text="emptyText" />
  </div>
  <component
    :is="isSized ? FixedSizeList : DynamicSizeList"
    v-else
    ref="listRef"
    v-bind="(vListProps as any)"
    :class-name="ns.be('dropdown', 'list')"
    :scrollbar-always-on="scrollbarAlwaysOn"
    :data="filteredOptions"
    :height="listHeight"
    :width="width"
    :total="filteredOptions.length"
  >
    <template #default="scope">
      <ListItem
        v-bind="scope"
        :height="isSized ? vListProps.itemSize : vListProps.estimatedSize"
        :hovering="hoveringIndex === scope?.index"
        :disabled="select.disabled"
        :model-value="select.props.modelValue"
        :config="select.config"
        @select="onSelect"
        @hover="onHover"
      >
        <template #default="scope1">
          <slot v-bind="scope1" />
        </template>
      </ListItem>
    </template>
  </component>
</template>

<script lang="ts" setup>
import { DynamicSizeList, FixedSizeList, useNamespace } from 'element-plus'
import { inject, computed, watch, toRaw } from 'vue'
import { isUndefined } from 'element-plus/es/utils/index'
import { selectInjectionKey } from './token'
import ListItem from './list-item.vue'
import { useSelectList } from './use-select-list'

defineProps({
  width: {
    type: [String, Number],
    default: '100%'
  }
})

const ns = useNamespace('select')
const select = inject(selectInjectionKey)!

const {
  listRef,
  filteredOptions,
  listHeight,
  emptyText,
  hoveringIndex,
  onKeyboardNavigate,
  onKeyboardSelect,
  onHover,
  onSelect
} = useSelectList(select)

watch(listHeight, () => {
  select.popperRef.value?.updatePopper?.()
})

const isSized = computed(() => isUndefined(select.props.estimatedOptionHeight))
const vListProps = computed(() => {
  if (isSized.value) {
    return {
      itemSize: select.props.itemHeight
    }
  }
  return {
    estimatedSize: select.props.estimatedOptionHeight
  }
})

const { scrollbarAlwaysOn } = toRaw(select.props)

defineExpose({
  onKeyboardNavigate,
  onKeyboardSelect
})
</script>
