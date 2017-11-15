import Vue from 'vue'
import Router from 'vue-router'
import SendMeta from '@/pages/SendMeta/SendMeta'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'SendMeta',
      component: SendMeta,
      meta: {title: 'Send Meta'}
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
