# Image 图片

## 简介

相对 el-iamge，添加蒙层，添加预览、下载按钮及功能。el-image 原来预览功能不再支持。

## 预览

:::preview 预览
demo-preview=../examples/image/preview.vue
:::

## 下载

:::preview 下载
demo-preview=../examples/image/download.vue
:::

## 更多操作

使用插槽添加更多操作按钮
:::preview 下载
demo-preview=../examples/image/operation.vue
:::

## Image 新增或修改的属性

| 属性名            | 说明                              | 类型         | 默认值    |
| ----------------- | --------------------------------- | ------------ | --------- |
| previewTeleported | image-viewer 是否插入至 body 元素 | boolean      | true      |
| initialIndex      | 初始预览图像索引                  | number       | undefined |
| withPreview       | 是否开启预览                      | boolean      | false     |
| previewIcon       | 预览图标                          | iconPropType | ZoomIn    |
| withDownload      | 是否开启下载                      | boolean      | false     |
| downloadIcon      | 下载图标                          | iconPropType | Download  |
| fileName          | 下载文件名称                      | string       | undefined |
