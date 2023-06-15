# Table 表格

## 简介

配置化的 el-table

## 基本用法

使用配置代替了模版声明 `ElTableColumn` ， `ElTable`原本的属性、事件与方法均支持
:::preview 基本用法
demo-preview=../examples/table/basic.vue
:::

## 渲染函数

头部渲染可以使用`ElTableColumn`原本的 renderHeader,
内容渲染使用 render
:::preview 渲染函数
demo-preview=../examples/table/render.vue
:::

## 插槽

头部插槽 headerSlot,
内容插槽 slot
:::preview 渲染函数
demo-preview=../examples/table/slot.vue
:::

## 多级表头

使用 children 实现
:::preview 多级表头
demo-preview=../examples/table/children.vue
:::

## 多选

暴露出 tableRef，可以调用原 el-table 方法
:::preview 多级表头
demo-preview=../examples/table/multiple.vue
:::

## Table 新增属性

| 属性名  | 说明   | 类型             | 默认值 |
| ------- | ------ | ---------------- | ------ |
| columns | 配置列 | CxzTableColumn[] | []     |

## TableColumn 新增属性

| 属性名     | 说明         | 类型                     | 默认值    |
| ---------- | ------------ | ------------------------ | --------- |
| render     | 渲染函数     | (row,column,$index)=>any | undefined |
| slot       | 插槽名称     | string                   | undefined |
| headerSlot | 头部插槽名称 | string                   | undefined |
| children   | 子列         | CxzTableColumn[]         | undefined |

## Table 插槽

| 插槽名  | 说明                                             |
| ------- | ------------------------------------------------ |
| $append | 原 el-table append 插槽，加$防和其他插槽名称冲突 |
| $empty  | 原 el-table empty 插槽，加$防和其他插槽名称冲突  |
