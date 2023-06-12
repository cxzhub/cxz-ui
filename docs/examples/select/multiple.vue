<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <CxzSelect :options="options" v-model="value" filterable multiple />
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <CxzSelect
        :options="options"
        v-model="value"
        filterable
        multiple
        collapseTags
        collapseTagsTooltip
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CxzSelect } from 'cxz-ui'

const options = ref([
  {
    label: 'label1',
    value: 1
  },
  {
    label: 'label2',
    value: 2
  },
  {
    label: 'label3',
    value: 3
  },
  {
    label: 'label4',
    value: 4
  },
  {
    label: 'label5',
    value: 5
  }
])

const value = ref()
</script>
