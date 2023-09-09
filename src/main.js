import '$/css/main.css'

import { createApp } from 'vue'
import  Cookies  from 'vue3-cookies'
import {useCookies} from "vue3-cookies";

import App from './App.vue'
import router from "@/utilities/MainRouter";


const md5 = await import("js-md5")
const cookies = useCookies().cookies
cookies.config({
    expireTimes: '1m'
})

const app = createApp(App)

app.use(router)
app.use(Cookies)

app.provide("hash", md5.hex)
app.provide("router", router)
app.provide("cookie", cookies)
app.provide("endpoint", "127.0.0.1:8443")

app.mount('#app')
