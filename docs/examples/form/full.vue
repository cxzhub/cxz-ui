<template>
  <CxzForm
    ref="formRef"
    :schema="schema"
    v-model="value"
    :rules="formRules"
    label-width="120px"
    :layout-row="{ gutter: 20 }"
    :layout-col="{ span: 12 }"
  />

  <div style="padding-left: 120px">
    <el-button type="primary" @click="handleSubmit">提交</el-button>
    <el-button @click="handleReset">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { CxzForm } from 'cxz-ui'
import { ref, markRaw, reactive } from 'vue'
import { ElInput, ElInputNumber, ElMessage } from 'element-plus'
import { CxzSelect, CxzDatePicker } from 'cxz-ui'

import type { CxzFormSchema } from 'cxz-ui'
import type { FormRules } from 'element-plus'

const value = ref({})
const schema = ref<CxzFormSchema[]>([
  {
    prop: 'customerName',
    label: '客户姓名',
    component: markRaw(ElInput),
    componentAttrs: {
      placeholder: '请输入客户姓名'
    }
  },
  {
    prop: 'customerPhone',
    label: '客户手机号',
    component: markRaw(ElInput),
    componentAttrs: {
      placeholder: '请输入客户手机号'
    }
  },
  {
    prop: 'product.name',
    label: '产品名称',
    component: markRaw(ElInput),
    componentAttrs: {
      placeholder: '请输入产品名称'
    },
    layout: {
      span: 24
    }
  },
  {
    prop: 'product.price',
    label: '产品价格(元)',
    component: markRaw(ElInputNumber)
  },
  {
    prop: 'product.type',
    label: '产品类型',
    component: markRaw(CxzSelect),
    componentAttrs: {
      placeholder: '请选择产品类型',
      options: [
        { label: '水果', value: 0 },
        { label: '服装', value: 1 },
        { label: '家电', value: 2 }
      ]
    }
  },
  {
    prop: 'product.desc',
    label: '产品描述',
    component: markRaw(ElInput),
    componentAttrs: {
      placeholder: '请输入产品描述',
      type: 'textarea'
    },
    layout: {
      span: 24
    }
  },
  {
    prop: 'product.timeRange',
    label: '产品上架时间',
    component: markRaw(CxzDatePicker),
    componentAttrs: {
      placeholder: '请输入备注',
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      valueFormat: 'YYYY-MM-DD'
    },
    layout: {
      span: 24
    }
  },
  {
    prop: 'remark',
    label: '备注',
    component: markRaw(ElInput),
    componentAttrs: {
      placeholder: '请输入产品描述',
      type: 'textarea'
    },
    layout: {
      span: 24
    }
  }
])
const formRules = reactive<FormRules>({
  customerName: [
    { required: true, message: '请输入客户姓名', trigger: 'blur' }
  ],
  customerPhone: [
    {
      validator: (rule, value, callback) => {
        if (value && !/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
    }
  ],
  'product.name': [
    { required: true, message: '请输入产品名称', trigger: 'blur' }
  ],
  'product.price': [
    { required: true, message: '请输入产品价格', trigger: 'blur' }
  ],
  'product.timeRange': [
    {
      required: true,
      message: '请选择产品上架时间',
      trigger: 'change',
      type: 'array'
    }
  ]
})

const formRef = ref<InstanceType<typeof CxzForm>>()
const handleSubmit = async () => {
  try {
    await formRef.value?.formRef?.validate()
    ElMessage.success('提交成功')
  } catch (error) {
    console.log(error)
  }
}
const handleReset = () => {
  formRef.value?.formRef?.resetFields()
}
</script>
