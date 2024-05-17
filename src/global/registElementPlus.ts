import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import type { App } from 'vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default{
    install:(app:App)=>{
        app.use(ElementPlus, {
            locale: zhCn,
          })
    }
}