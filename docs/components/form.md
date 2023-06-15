# Form 表单

## 简介

配置化表单。内部集成 `ElLayout` 布局，可以快速搭建表单。

## 基础用法

使用配置`schema`替换原来模版声明`ElFormItem`方式，`schema`是在原有`ElFormItem`属性基础上添加若干属性。<br>
`component`添加组件，`componentAttrs`为组件添加属性
:::preview 基础用法
demo-preview=../examples/form/basic.vue
:::

## 布局

`layoutRow`为表单添加`ElRow`属性，`layoutCol`为表单添加`ElCol`属性。`schema`中的每项可以添加`layout`修改公共的`layoutCol`布局。
:::preview 布局
demo-preview=../examples/form/layout.vue
:::

## 插槽

:::preview 插槽
demo-preview=../examples/form/slot.vue
:::

## 完整例子

:::preview 完整例子
demo-preview=../examples/form/full.vue
:::

## Form 新增属性

| 属性名     | 说明     | 类型            | 默认值 |
| ---------- | -------- | --------------- | ------ |
| schema     | 配置     | CxzFormSchema[] | []     |
| layoutRow  | row 属性 | layoutRowProps  | {}     |
| layoutCol  | col 属性 | layoutColProps  | {}     |
| modelValue | 绑定值   | Object          | {}     |

## Form Expose

| 名称    | 说明           |
| ------- | -------------- |
| formRef | el-from 的 ref |

## Schema 相比 ElFormItem 新增属性

| 属性名         | 说明           | 类型           | 默认值    |
| -------------- | -------------- | -------------- | --------- |
| layout         | 布局           | layoutColProps | undefined |
| slot           | 内容插槽名称   | string         | undefined |
| labelSlot      | label 插槽名称 | string         | undefined |
| errorSlot      | 错误插槽名称   | string         | undefined |
| component      | 组件           | any            | undefined |
| componentAttrs | 组件属性       | Object         | undefined |
