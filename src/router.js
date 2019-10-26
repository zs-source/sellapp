import Vue from 'vue'
import Router from 'vue-router'
import Goods from './pages/Goods.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'goods',
      component:Goods
    },
    {
      path: '/talkabout',
      name: 'talkabout',
      component: () => import('./pages/Talkabout.vue')
    },
    {
      path: '/seller',
      name: 'seller',
      component: () => import('./pages/Seller.vue')
    }
  ]
})
