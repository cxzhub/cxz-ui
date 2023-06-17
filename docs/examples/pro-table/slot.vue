<template>
  <CxzProTable :init="init">
    <template #key_1>表单插槽</template>

    <template #date>表格插槽</template>

    <template #$operation>
      <el-button type="primary">新增</el-button>
    </template>

    <template #operation>
      <el-space>
        <el-button type="primary" link>查看</el-button>
        <el-button type="primary" link>编辑</el-button>
        <el-button type="danger" link>删除</el-button>
      </el-space>
    </template>
  </CxzProTable>
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
        },
        slot: 'key_1'
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
        label: '日期',
        slot: 'date'
      },
      {
        prop: 'name',
        label: '姓名'
      },
      {
        prop: 'address',
        label: '地址'
      },
      {
        prop: 'operation',
        label: '操作',
        slot: 'operation',
        width: 150
      }
    ]
  }
})
</script>
