<template>
  <el-row :gutter="50">
    <el-col :span="24">
      <div>今天之前的时间禁用</div>
      <CxzDatePicker
        v-model="value1"
        :before-disabled-date="new Date()"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></CxzDatePicker>
    </el-col>
    <el-col :span="24">
      <div>今天之后的时间禁用</div>
      <CxzDatePicker
        v-model="value2"
        :after-disabled-date="new Date()"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></CxzDatePicker>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxzDatePicker } from 'cxz-ui'

const value1 = ref()
const value2 = ref()
</script>
