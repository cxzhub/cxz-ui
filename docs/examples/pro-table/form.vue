<template>
  <CxzProTable :init="init" :show-count="5" />
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import { CxzProTable, useProTable } from 'cxz-ui'
import { ElInput } from 'element-plus'
import { getMock } from './mock'

const { init } = useProTable({
  getList: async (params) => {
    const { page, pageSize, ...rest } = params
    const res = await getMock(['date', 'name', 'address'], page, pageSize)
    return {
      data: res.data.data,
      page: res.data.page,
      pageCount: res.data.pageCount,
      itemCount: res.data.itemCount
    }
  },
  form: {
    schema: [
      {
        prop: 'key_1',
        label: '姓名',
        component: markRaw(ElInput),
        componentAttrs: {
          placeholder: '请输入姓名'
        }
      },
      {
        prop: 'key_2',
        label: '产品名称',
        component: markRaw(ElInput),
        componentAttrs: {
          placeholder: '请输入产品名称'
        }
      },
      {
        prop: 'key_3',
        label: '机构名称',
        component: markRaw(ElInput),
        componentAttrs: {
          placeholder: '请输入机构名称'
        }
      },
      {
        prop: 'key_4',
        label: '年龄',
        component: markRaw(ElInput),
        componentAttrs: {
          placeholder: '请输入年龄'
        }
      }
    ]
  },
  table: {
    columns: [
      {
        prop: 'date',
        label: '日期'
      },
      {
        prop: 'name',
        label: '姓名'
      },
      {
        prop: 'address',
        label: '地址'
      }
    ]
  }
})
</script>
