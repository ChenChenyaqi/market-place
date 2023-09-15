import { App, Component } from 'vue'
import SvgIcon from '@/components/global-components/svgIcon.vue'

// 待注册的自定义全局组件
const components: { [name: string]: Component } = { SvgIcon }

export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  }
}
