import { createApp } from 'vue'
import NutUI from '@nutui/nutui'
import { IconFont } from '@nutui/icons-vue'
import 'virtual:svg-icons-register'
import App from './App.vue'
import pinia from './store'
import router from './router'
import '@nutui/nutui/dist/styles/themes/default.scss'
import '@nutui/icons-vue/dist/style_iconfont.css'
import globalComponentPlugin from './plugins/globalComponentRegister'

const app = createApp(App)
app.use(router)
app.use(globalComponentPlugin)
app.use(NutUI)
app.use(IconFont)

app.use(pinia).mount('#app')
