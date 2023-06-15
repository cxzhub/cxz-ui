# DatePicker 日期选择器

## 简介

添加时间前后禁用、限制选择范围属性，不需要重复写方法控制。`ElDatePicker` 原来所有属性都支持。

## 时间前后禁用

:::preview 时间前后禁用
demo-preview=../examples/date-picker/basic.vue
:::

## 限制选择范围

:::preview 限制选择范围
demo-preview=../examples/date-picker/range.vue
:::

## DatePicker 新增属性

| 属性名             | 说明                     | 类型                 | 默认值    |
| ------------------ | ------------------------ | -------------------- | --------- |
| beforeDisabledDate | 在此之前的时间禁用       | String, Number, Date | undefined |
| afterDisabledDate  | 在此之后的时间禁用       | String, Number, Date | undefined |
| dateRangeLimit     | 能够选择的时间范围（天） | Number               | undefined |
