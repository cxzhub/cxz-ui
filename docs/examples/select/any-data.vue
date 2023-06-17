<template>
  <CxzSelect
    v-model="value"
    :options="options"
    :props="{ label: 'a', value: 'b' }"
    filterable
  />

  值：{{ value }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxzSelect } from 'cxz-ui'

const options = ref([
  { a: 'label1', b: 1, c: 'c1', d: 'd1' },
  { a: 'label2', b: 2, c: 'c1', d: 'd1' },
  { a: 'label3', b: 3, c: 'c1', d: 'd1' },
  { a: 'label4', b: 4, c: 'c1', d: 'd1' },
  { a: 'label5', b: 5, c: 'c1', d: 'd1' }
])

const value = ref()
</script>
