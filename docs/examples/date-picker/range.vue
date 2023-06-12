<template>
  <div>时间选择范围不超过3天</div>
  <CxzDatePicker
    v-model="value"
    type="daterange"
    :date-range-limit="3"
    :editable="false"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  ></CxzDatePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxzDatePicker } from 'cxz-ui'

const value = ref()
</script>
