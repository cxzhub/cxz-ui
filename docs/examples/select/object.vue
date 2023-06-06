<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <CxzSelect :options="options" v-model="value1" filterable is-object />
      <div>值：{{ value1 }}</div>
    </el-col>
    <el-col :span="12">
      <CxzSelect
        :options="options"
        v-model="value2"
        filterable
        multiple
        is-object
      />
      <div>值：{{ value2 }}</div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxzSelect } from '@cxz-ui/components'

const options = ref([
  { label: 'label1', value: 1 },
  { label: 'label2', value: 2 },
  { label: 'label3', value: 3 },
  { label: 'label4', value: 4 },
  { label: 'label5', value: 5 }
])

const value1 = ref({ label: 'label1', value: 1 })

const value2 = ref()
</script>
