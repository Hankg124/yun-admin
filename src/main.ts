
import { createApp } from 'vue'
import pinia from "@/stores/index"
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'
import {setRegistGlobal} from './global'
import "./permission"

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(setRegistGlobal)

app.mount('#app')

