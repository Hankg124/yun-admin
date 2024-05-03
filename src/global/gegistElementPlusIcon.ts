import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue'
import svgIcon from '../components/svgIcon.vue'

export default {
    install: (app: App) => {
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
        app.component('svgIcon', svgIcon)
    }
}