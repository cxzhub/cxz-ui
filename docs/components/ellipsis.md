# Ellipsis 文本省略

## 简介

工作中经常碰到需要文本溢出省略的场景，但是产品希望鼠标悬浮时显示文字提示，展示全部内容。常规的做法是加个 title，或者用 el-tooltip 包裹一层，但是这些做法，文字提示会一直在，即便内容没有溢出，效果不理想。综上，我开发了 Ellipsis 组件。

## 基本用法

当内容长度没有超出时，不显示文字提示；当内容长度超出时，显示文字提示
:::preview 基本用法
demo-preview=../examples/ellipsis/basic.vue
:::

## 设置行数

:::preview 设置行数
demo-preview=../examples/ellipsis/line-clamp.vue
:::

## 响应式

根据内容和容器大小自动计算是否显示文字提示
:::preview 响应式
demo-preview=../examples/ellipsis/auto.vue
:::

## 插槽

:::preview 设置行数
demo-preview=../examples/ellipsis/slot.vue
:::

## Ellipsis 属性

| 属性名       | 说明            | 类型           | 默认值    |
| ------------ | --------------- | -------------- | --------- |
| content      | 内容            | string         | undefined |
| tooltipProps | el-tooltip 属性 | ElTooltipProps | {}        |
| lineClamp    | 行数            | number         | 1         |
| maxWidth     | 最大宽度        | number，string | 'auto'    |
| style        | 额外样式        | StyleValue     | {}        |
| class        | 额外类名        | style          | undefined |

## Ellipsis 插槽

| 插槽名  | 说明         |
| ------- | ------------ |
| default | 内容         |
| tooltip | 文字提示内容 |
