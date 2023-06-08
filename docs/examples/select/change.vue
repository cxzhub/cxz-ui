<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <CxzSelect
        :options="options"
        :props="{ label: 'a', value: 'b' }"
        v-model="value1"
        filterable
        @change="handleChange1"
      />
      <div>值：{{ value1 }}</div>
      <div>详情：{{ option1 }}</div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <CxzSelect
        :options="options"
        :props="{ label: 'a', value: 'b' }"
        v-model="value2"
        filterable
        multiple
        @change="handleChange2"
      />
      <div>值：{{ value2 }}</div>
      <div>详情：{{ option2 }}</div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxzSelect } from '@cxz-ui/components'

const options = ref([
  { a: 'label1', b: 1, c: 'c1', d: 'd1' },
  { a: 'label2', b: 2, c: 'c1', d: 'd1' },
  { a: 'label3', b: 3, c: 'c1', d: 'd1' },
  { a: 'label4', b: 4, c: 'c1', d: 'd1' },
  { a: 'label5', b: 5, c: 'c1', d: 'd1' }
])

const value1 = ref()
const option1 = ref()
const handleChange1 = (val1: number, val2: Record<string, any>) => {
  option1.value = val2
}

const value2 = ref()
const option2 = ref()
const handleChange2 = (val1: number[], val2: Record<string, any>[]) => {
  option2.value = val2
}
</script>
