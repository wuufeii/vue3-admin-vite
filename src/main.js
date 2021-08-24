import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'assets/css/layout.scss'
import 'assets/css/custom.scss'
import SvgIcon from 'components/SvgIcon.vue'

let app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.component('SvgIcon', SvgIcon)
app.mount('#app')
