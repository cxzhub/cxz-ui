<template>
  <CxzSelect
    v-model="value"
    :options="options"
    filterable
    remote
    :remote-method="remoteMethod"
    :loading="loading"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxzSelect } from 'cxz-ui'

const options = ref()

const value = ref()
const loading = ref(false)

const remoteMethod = (query: string) => {
  loading.value = true
  setTimeout(() => {
    if (query) {
      options.value = Array(10)
        .fill(1)
        .map((el, index) => ({
          label: 'label' + (index + 10),
          value: index + 10
        }))
    } else {
      options.value = []
    }
    loading.value = false
  }, 1000)
}
</script>
