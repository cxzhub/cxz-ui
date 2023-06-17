<template>
  <div
    ref="selectRef"
    v-click-outside:[popperPaneRef]="handleClickOutside"
    class="cxz-select"
    :class="wrapperKls"
    @mouseenter="mouseEnter = true"
    @mouseleave="mouseEnter = false"
    @click.stop="toggleMenu"
  >
    <div ref="tagsRef" :class="nsSelect.e('tags')" :style="selectTagsStyle">
      <slot
        v-if="multiple || $slots.content"
        name="content"
        :maps="selectedMaps"
      >
        <Content @remove-tag="(val: any) => emit('remove-tag', val)">
          <template v-if="$slots.tag" #default="scope">
            <slot name="tag" v-bind="scope" />
          </template>
        </Content>
      </slot>
      <input
        v-if="filterable"
        ref="filterRef"
        v-model="filterValue"
        type="text"
        :style="{
          marginLeft: prefixWidth
            ? `${Math.max(prefixWidth + 5, 30)}px`
            : '11px',
          flexGrow: 1,
          width: `${20 / (inputWidth - 32)}%`,
          maxWidth: `${inputWidth - 42}px`
        }"
        :class="[nsSelect.e('input'), nsSelect.is(selectSize)]"
        :disabled="selectDisabled"
        @keydown.up.prevent="onBackward"
        @keydown.down.prevent="onForward"
        @keydown.esc="onEscOrTab"
        @keydown.enter.stop.prevent="onKeyboardSelect"
        @keydown.tab="onEscOrTab"
      />
    </div>

    <el-tooltip
      ref="popperRef"
      :visible="expanded"
      :teleported="true"
      :popper-class="[nsSelect.e('popper'), popperClass]"
      :gpu-acceleration="false"
      :stop-popper-mouse-event="false"
      :fallback-placements="['bottom-start', 'top-start', 'right', 'left']"
      effect="light"
      placement="bottom-start"
      pure
      :transition="`${nsSelect.namespace.value}-zoom-in-top`"
      trigger="click"
      :persistent="true"
      :show-arrow="false"
    >
      <template #default>
        <div class="select-trigger">
          <el-input
            ref="inputRef"
            v-model="displayValue"
            type="text"
            autocomplete="off"
            readonly
            :placeholder="currentPlaceholder"
            :name="name"
            :size="selectSize"
            :disabled="selectDisabled"
            :validate-event="false"
            :class="[nsSelect.is('focus', expanded)]"
            @keydown.up.prevent="onBackward"
            @keydown.down.prevent="onForward"
            @keydown.esc="onEscOrTab"
            @keydown.enter.stop.prevent="onKeyboardSelect"
            @keydown.tab="onEscOrTab"
          >
            <template v-if="$slots.prefix" #prefix>
              <div ref="prefixRef">
                <slot name="prefix" />
              </div>
            </template>
            <template #suffix>
              <el-icon
                v-if="!showClose"
                :class="[
                  nsSelect.e('caret'),
                  nsSelect.e('icon'),
                  nsSelect.is('reverse', expanded)
                ]"
              >
                <component :is="suffixIcon" />
              </el-icon>
              <el-icon
                v-if="showClose && clearIcon"
                :class="[nsSelect.e('caret'), nsSelect.e('icon')]"
                @click.stop="handleClearClick"
              >
                <component :is="clearIcon" />
              </el-icon>
            </template>
          </el-input>
        </div>
      </template>

      <template #content>
        <SelectDropdown>
          <div v-if="$slots.header">
            <slot name="header" />
          </div>

          <component :is="List" ref="optionsRef">
            <template v-if="$slots.default" #default="scope">
              <slot v-bind="scope" />
            </template>

            <template #empty="{ text }">
              <slot name="empty" :text="text">
                <p :class="nsSelect.be('dropdown', 'empty')">
                  {{ text }}
                </p>
              </slot>
            </template>
          </component>

          <div v-if="$slots.footer">
            <slot name="footer" />
          </div>
        </SelectDropdown>
      </template>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, provide, unref, toRefs, onUnmounted } from 'vue'
import {
  ElTooltip,
  ElInput,
  ClickOutside as vClickOutside,
  ElIcon
} from 'element-plus'
import SelectDropdown from './select-dropdown.vue'
import { selectInjectionKey } from './token'
import { selectProps } from './props'
import List from './list.vue'
import Content from './content.vue'
import { useSelect } from './use-select'

import type { SelectContext } from './token'

const props = defineProps(selectProps)
const emit = defineEmits([
  'blur',
  'focus',
  'update:modelValue',
  'clear',
  'change',
  'remove-tag',
  'visible-change'
])

const config = unref(
  computed(() => ({
    value: 'value',
    label: 'label',
    disabled: 'disabled',
    children: '__children',
    type: '__type',
    ...props.props
  }))
)

const {
  // DOM
  selectRef,
  popperRef,
  popperPaneRef,
  inputRef,
  optionsRef,
  filterRef,
  tagsRef,
  prefixRef,

  // readonly data
  states,
  inputWidth,
  selectSize,
  selectDisabled,
  showClose,
  currentPlaceholder,
  nsSelect,
  prefixWidth,

  // style
  wrapperKls,
  selectTagsStyle,

  filterValue,

  // method
  handleClickOutside,
  toggleMenu,
  handleClearClick,
  setSoftFocus,
  onEscOrTab,
  onForward,
  onBackward,
  onKeyboardSelect
} = useSelect(props, emit, config)

const { mouseEnter, expanded, selectedMaps, query, displayValue } =
  toRefs(states)

onUnmounted(() => {
  // @ts-expect-error 清空map
  selectedMaps.value = null
})

provide(
  selectInjectionKey,
  reactive({
    props,
    selectRef,
    popperRef,
    expanded,
    selectedMaps,
    query,
    config,
    disabled: selectDisabled,
    selectSize,
    inputWidth,
    toggleMenu,
    setSoftFocus
  }) as unknown as SelectContext
)

defineExpose({
  selectedMaps
})
</script>
