import {
  containerPreview,
  componentPreview
} from '@vitepress-demo-preview/plugin'

module.exports = {
  title: 'Cxz UI',
  themeConfig: {
    nav: [
      { text: '快速开始', link: '/guide/start' },
      { text: 'Components', link: '/components/test' }
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
          text: '测试',
          items: [
            { text: 'Test', link: '/components/test' },
            { text: 'Select', link: '/components/select' }
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
