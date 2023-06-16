import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ outputDir: ['../cxz-ui/es', '../cxz-ui/lib'] })],
  build: {
    outDir: 'es',
    rollupOptions: {
      external: ['vue', 'element-plus'],
      input: ['src/index.ts'],
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].mjs',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: '../cxz-ui/es'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: '../cxz-ui/lib'
        }
      ]
    },
    lib: {
      entry: './src/index.ts'
    }
  }
})
