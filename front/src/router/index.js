import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Commodity from '../components/Commoddity'
import Login from '../components/Login.vue'

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
          name: 'Commodity',
          component: Commodity
        }]
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
