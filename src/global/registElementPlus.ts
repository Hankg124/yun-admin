import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import type { App } from 'vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

export default{
    install:(app:App)=>{
        app.use(ElementPlus)
    }
}