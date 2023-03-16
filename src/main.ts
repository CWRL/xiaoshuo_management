import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pagination from './components/pagination/index.vue'
import VueSocketIo from 'vue-socket.io'
import {registerSockets,destroySockets} from './socket'
import mitt from 'mitt'
export const mit=mitt()
const socket=new VueSocketIo({
    debug:false,
    connection:'http://127.0.0.1:5566'
}) as any
export const app = createApp(App)
app.config.globalProperties.$socket=socket
app.config.globalProperties.$onevent=registerSockets
app.config.globalProperties.$removeevent=destroySockets
app.config.globalProperties.$bus=mit
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('paginations',pagination)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.mount('#app')
