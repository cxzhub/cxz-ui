# ProTable 高级表格

## 简介

集成`Form`、`Table`、`Pagination`，配置化，方便快速搭建列表页。没有添加过多样式，可以根据具体业务进行覆盖

## 基础用法

通过`useProTable`配置，getList 为获取数据方法，form 传`CxzForm`的属性，form 中添加`defaultValue`设置默认值，table 传`CxzTable`的属性
:::preview 基础用法
demo-preview=../examples/pro-table/basic.vue
:::

## 表单折叠个数

通过 show-count 控制表单折叠显示个数
:::preview 基础用法
demo-preview=../examples/pro-table/form.vue
:::

## 仅表格

form 不传 schema 就不会显示搜索表单
:::preview 仅表格
demo-preview=../examples/pro-table/only-table.vue
:::

## 插槽

:::preview 插槽
demo-preview=../examples/pro-table/slot.vue
:::

## ProTable 属性

| 属性名     | 说明              | 类型                       | 默认值 |
| ---------- | ----------------- | -------------------------- | ------ |
| init       | 初始化方法        | ProTableInitFunctionParams | {}     |
| showCount  | 表单折叠显示个数  | number                     | 2      |
| pagination | ElPagination 属性 | -                          | -      |

## ProTable 事件

同原 ElTable 事件

## ProTable Expose

| 名称     | 说明                                |
| -------- | ----------------------------------- |
| tableRef | 通过 tableRef 可以调用 ElTable 方法 |

## ProTable 插槽

| 插槽名     | 说明                                             |
| ---------- | ------------------------------------------------ |
| $append    | 原 el-table append 插槽，加$防和其他插槽名称冲突 |
| $empty     | 原 el-table empty 插槽，加$防和其他插槽名称冲突  |
| $operation | 表格头部操作列，加$防和其他插槽名称冲突          |
