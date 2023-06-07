import {
  containerPreview,
  componentPreview
} from '@vitepress-demo-preview/plugin'

module.exports = {
  title: 'Cxz UI',
  themeConfig: {
    logo: '/logo.svg',

    socialLinks: [{ icon: 'github', link: 'https://github.com/cxzhub/cxz-ui' }],

    footer: {
      message: `Released under the MIT License.`,
      copyright: 'Copyright © 2023-present Chen Xing zhi'
    },

    nav: [
      { text: '指南', link: '/guide/start' },
      { text: '组件', link: '/components/select' }
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
            { text: 'Ellipsis 文本省略', link: '/components/ellipsis' },
            { text: 'Button 按钮', link: '/components/button' }
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
