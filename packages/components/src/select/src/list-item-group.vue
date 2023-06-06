<template>
  <div
    v-if="item.isTitle"
    :class="ns.be('group', 'title')"
    :style="[style, { lineHeight: `${height}px` }]"
  >
    {{ item.label }}
  </div>
  <div v-else :class="ns.be('group', 'split')" :style="style">
    <span
      :class="ns.be('group', 'split-dash')"
      :style="{ top: `${height / 2}px` }"
    />
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from 'element-plus'

defineProps({
  item: {
    type: Object,
    required: true
  },
  style: {
    type: Object,
    default: () => ({})
  },
  height: {
    type: Number,
    default: 0
  }
})

const ns = useNamespace('select')
</script>
