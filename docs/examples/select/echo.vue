<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      1. 当value值在options中，自动回显
      <CxzSelect v-model="value1" :options="options" />
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      2. 当options中没有，valueOptions中有
      <CxzSelect
        v-model="value2"
        :options="options"
        :value-options="valueOptions"
      />
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      3. 当value值为object，回显object中label
      <CxzSelect v-model="value3" :options="options" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxzSelect } from 'cxz-ui'

const options = ref([
  { label: 'label1', value: 1 },
  { label: 'label2', value: 2 },
  { label: 'label3', value: 3 },
  { label: 'label4', value: 4 },
  { label: 'label5', value: 5 }
])

const value1 = ref(1)

const valueOptions = ref([{ label: 'label20', value: 20 }])
const value2 = ref(20)

const value3 = ref({ label: 'label30', value: 30 })
</script>
