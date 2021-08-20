import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'utils/themes'
import 'element-plus/lib/theme-chalk/index.css'
import 'assets/css/layout.scss'



let app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
