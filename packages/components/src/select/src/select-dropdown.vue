<template>
  <div
    :class="[ns.b('dropdown'), ns.is('multiple', isMultiple), popperClass]"
    :style="{ [isFitInputWidth ? 'width' : 'minWidth']: minWidth }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { useNamespace } from 'element-plus'
import { selectInjectionKey } from './token'

const select = inject(selectInjectionKey)!
const ns = useNamespace('select')

const popperClass = computed(() => select.props.popperClass)
const isMultiple = computed(() => select.props.multiple)
const isFitInputWidth = computed(() => select.props.fitInputWidth)
const minWidth = ref('')

function updateMinWidth() {
  minWidth.value = `${select.selectRef?.offsetWidth || 200}px`
}

onMounted(() => {
  updateMinWidth()
  useResizeObserver(select.selectRef, updateMinWidth)
})
</script>
