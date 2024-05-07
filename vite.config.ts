import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  server: {
    //配置端口号
    port: 8888,
    //配置自动打开浏览器
    open:true,
    //主机名
    host:'localhost',
    //配置代理
    proxy:{
      "/api":{
        // 目标地址
        target:"http://localhost:7777",
        //开启跨域
        changeOrigin:true,
        //重写路径:去掉路径中开头的/api
        rewrite:(path)=>path.replace(/^\/api/,'')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
