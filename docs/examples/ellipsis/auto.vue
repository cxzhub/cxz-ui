<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <CxzEllipsis :content="text" :max-width="width" />
    </el-col>
  </el-row>
  <el-divider />
  <el-form :label-width="120" label-position="left">
    <el-form-item label="文本">
      <el-input v-model="text" />
    </el-form-item>
    <el-form-item label="缩放">
      <el-slider v-model="width" :min="100" :max="300" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxzEllipsis } from 'cxz-ui'

const text = ref('编辑文本查看文本的溢出状态')
const width = ref(200)
</script>
