<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <div>默认下载</div>

      <CxzImage style="width: 200px" :src="src" with-download />
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <div>修改下载文件名称</div>

      <CxzImage
        style="width: 200px"
        :src="src"
        with-download
        file-name="我的图片"
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { CxzImage } from 'cxz-ui'

const src =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
</script>
