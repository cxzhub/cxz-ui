# Select 选择器

## 简介

### el-select 的痛点

1. 需要传入特定结构的数据（{label:string,value:number}[]），不够灵活；
2. change 事件只返回了当前的 value 值，没能把整个对象返回，仍需使用 find()方法查一遍；
3. 远程搜索或者编辑页回显时，当所选的值不在 options 中时会显示 id；
4. 远程搜索时，当没有选项，没有出现“暂无数据”；
5. 一些业务中，需要在点击选项时，先进行一些判断，然后不满足条件时阻止选中，即需要 beforeSelect 事件。

### 本组件优势

针对上述缺陷与不足，完全重写了下拉选择器。

1. 解决上述所以痛点；
2. 完全复用 el-select 样式，风格样式保持统一；
3. 下拉选项使用虚拟列表，不惧数据量大。
   <br>

## 基本用法

:::preview 基本用法
demo-preview=../examples/select/basic.vue
:::

## 多选

:::preview 多选
demo-preview=../examples/select/multiple.vue
:::

## 任意对象数组

通过 props 确定 label、value 的键
:::preview 任意对象数组
demo-preview=../examples/select/any-data.vue
:::

## change 事件

:::preview change 事件
demo-preview=../examples/select/change.vue
:::

## 远程搜索

:::preview 远程搜索
demo-preview=../examples/select/remote.vue
:::

## 将整个对象作为值

:::preview 将整个对象作为值
demo-preview=../examples/select/object.vue
:::

## 编辑页面回显

:::preview 编辑页面回显
demo-preview=../examples/select/echo.vue
:::

## 选中之前判断

第一项不能被选择
:::preview 选中之前判断
demo-preview=../examples/select/before-select.vue
:::

## 分组

:::preview 分组
demo-preview=../examples/select/group.vue
:::

## 插槽

默认插槽
:::preview 插槽
demo-preview=../examples/select/slot.vue
:::

## API

## Select 属性

| 属性名              | 说明                                                                                                 | 类型                       | 默认值             |
| ------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------- | ------------------ |
| v-model             | 绑定值                                                                                               | any                        | undefined          |
| disabled            | 是否禁用                                                                                             | boolean                    | false              |
| multiple            | 是否多选                                                                                             | boolean                    | false              |
| props               | 配置选项，具体看下表                                                                                 | Object                     | undefined          |
| options             | 选项                                                                                                 | Object[]                   | []                 |
| popperClass         | 选择器下拉菜单的自定义类名                                                                           | string                     | ''                 |
| name                | 选择器的原生 name 属性                                                                               | string                     | undefined          |
| placeholder         | placeholder                                                                                          | string                     | '请选择'           |
| suffixIcon          | 选择器后缀图标                                                                                       | iconPropType               | ArrowDown          |
| clearable           | 是否可清空                                                                                           | boolean                    | true               |
| clearIcon           | 清空图标                                                                                             | iconPropType               | CircleClose        |
| collapseTags        | 多选时是否将选中值按文字的形式展示                                                                   | boolean                    | false              |
| collapseTagsTooltip | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 只有当 collapse-tags 设置为 true 时才会生效。 | boolean                    | false              |
| tagType             | tag 类型                                                                                             | 'success','warning','info' | 'info'             |
| tagsHeight          | tags 高度，超出显示滚动条                                                                            | string、number             | undefined          |
| loading             | loading                                                                                              | boolean                    | false              |
| loadingText         | loading 文字                                                                                         | string                     | '加载中...'        |
| emptyText           | 无数据时文字                                                                                         | string                     | '暂无数据'         |
| remote              | 是否远程搜索                                                                                         | boolean                    | false              |
| remoteMethod        | 远程搜索方法                                                                                         | function                   | undefined          |
| filterable          | 是否可过滤                                                                                           | boolean                    | false              |
| filterMethod        | 过滤方法                                                                                             | function                   | undefined          |
| beforeSelect        | 选中之前的操作                                                                                       | function                   | undefined          |
| multipleLimit       | 限制多选个数                                                                                         | number                     | 0                  |
| multipleLimitText   | 超出选中个数的文字                                                                                   | string                     | '选择个数超过限制' |
| itemHeight          | 选项高度                                                                                             | number                     | 32                 |
| height              | 下拉框最大高度                                                                                       | number                     | 192                |
| scrollbarAlwaysOn   | 滚动条是否一直在                                                                                     | boolean                    | false              |
| isObject            | 返回的 modelValue 是否是整个对象                                                                     | boolean                    | false              |
| valueOptions        | 用于回显的 options                                                                                   | array                      | []                 |

## Select props 配置项

| 属性     | 说明                   | 类型   | 默认值         |
| -------- | ---------------------- | ------ | -------------- |
| value    | 绑定值                 | string | 'value'        |
| label    | 显示的字段             | string | 'label'        |
| disabled | 是否禁用字段           | string | 'disabled'     |
| children | 树的子树，或分组的内容 | string | '\_\_children' |

## Select 事件

| 事件名         | 说明                                     | 回调参数                            |
| -------------- | ---------------------------------------- | ----------------------------------- |
| change         | 选中值发生变化时触发                     | value 选中的值，option 整个选项对象 |
| visible-change | 下拉框出现/隐藏时触发                    | val，出现则为 true，隐藏则为 false  |
| remove-tag     | 多选模式下移除 tag 时触发                | val，移除的 tag 值                  |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | ——                                  |
| blur           | 失焦                                     | ——                                  |
| focus          | 聚焦                                     | ——                                  |

## Select Expose

| 名称         | 说明             |
| ------------ | ---------------- |
| selectedMaps | 选中值详情的集合 |

## Select 插槽

| 插槽名  | 说明                                                   |
| ------- | ------------------------------------------------------ |
| default | 参数 option: 当前选项,index,disable：是否禁用          |
| empty   | 自定义当选项为空时的内容                               |
| prefix  | 输入框的前缀                                           |
| content | 自定义输入框回显内容。 作用域参数为 maps，选中值的 map |
| tag     | 作用域参数为 value: 选中的值, option:当前选项对象      |
| header  | 下拉框头部                                             |
| footer  | 下拉框底部                                             |
