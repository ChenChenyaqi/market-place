import { App, Component } from 'vue'
// 引入element-plus所有的图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 待注册的自定义全局组件
const components: { [name: string]: Component } = {}

export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
    // 注册element-plus所有的图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
