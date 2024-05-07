
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {setRegistGlobal} from './global'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(setRegistGlobal)

app.mount('#app')


console.log((import.meta.env.VITE_APP_BASE_API));
