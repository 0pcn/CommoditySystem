import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Commodity from '../components/Commoddity'
import Login from '../components/Login.vue'
import Shop from '../components/Shop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/Commodity',
          name: '商品清單',
          component: Commodity
        },
        {
          path: '/Shop',
          name: '商品頁',
          component: Shop
        },
      ]
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
