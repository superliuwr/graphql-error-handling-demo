import App from '@/App.vue'
import Element from 'element-ui'
import router from '@/router'
import store from '@/store'
import Vue from 'vue'
import { apolloProvider } from '@/store/apollo'
import { i18n } from '@/setup/setup-i18n'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(Element)

new Vue({
  router,
  store,
  i18n,
  provide: apolloProvider.provide(),
  render: h => h(App)
}).$mount('#app')
