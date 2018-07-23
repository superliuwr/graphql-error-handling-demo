import Router from 'vue-router'
import Vue from 'vue'
import { loadLanguageAsync } from '@/setup/setup-i18n'
import { mainRoutes } from './routes/main'

Vue.use(Router)

// Import route modules here

const router = new Router({
  mode: 'history',
  routes: [
    ...mainRoutes,
  ]
})

// Async Languages
router.beforeEach((to, from, next) => {
  const lang = to.params.lang || to.query.lang
  if (lang) {
    loadLanguageAsync(lang).then(() => next())
  } else {
    next()
  }
})

export default router
