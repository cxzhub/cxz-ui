<template>
  <CxzImage
    style="width: 200px"
    :src="src"
    with-preview
    with-download
    file-name="我的图片"
  >
    <template #operation>
      <el-icon>
        <component :is="Delete" />
      </el-icon>
    </template>
  </CxzImage>
</template>

<script setup lang="ts">
import { CxzImage } from '@cxz-ui/components'
import { Delete } from '@element-plus/icons-vue'

const src =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
</script>
