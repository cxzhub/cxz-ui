<template>
  <CxzButton type="primary" :debounce-wait="2000" @click="handleClick">
    防抖按钮
  </CxzButton>
  <div>点击{{ count }}次</div>
</template>

<script setup lang="ts">
import { CxzButton } from 'cxz-ui'
import { ref } from 'vue'

const count = ref(0)

const handleClick = () => {
  count.value++
}
</script>
