import {
  containerPreview,
  componentPreview
} from '@vitepress-demo-preview/plugin'

module.exports = {
  title: 'Cxz UI',
  themeConfig: {
    nav: [
      { text: '快速开始', link: '/guide/start' },
      { text: '组件', link: '/components/test' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '使用指南',
          items: [{ text: '快速开始', link: '' }]
        }
      ],
      '/components/': [
        {
          items: [
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Ellipsis 文本省略', link: '/components/ellipsis' }
          ]
        }
      ]
    }
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  }
}
