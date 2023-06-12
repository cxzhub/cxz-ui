<template>
  <CxzButton type="primary" :throttleWait="2000" @click="handleClick">
    节流按钮
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
