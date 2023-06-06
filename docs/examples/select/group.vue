<template>
  <CxzSelect
    v-model="value"
    :options="options"
    multiple
    :props="{
      children: 'options'
    }"
    clearable
  />
</template>

<script lang="ts" setup>
import { CxzSelect } from '@cxz-ui/components'
import { ref } from 'vue'
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

const value = ref([])
const options = Array.from({ length: 10 }).map((_, idx) => {
  const label = idx + 1
  return {
    value: `Group ${label}`,
    label: `Group ${label}`,
    options: Array.from({ length: 10 }).map((_, idx) => ({
      value: `Option ${idx + 1 + 10 * label}`,
      label: `${initials[idx % 10]}${idx + 1 + 10 * label}`
    }))
  }
})
</script>
