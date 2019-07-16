import Vue from 'vue'
import Router from 'vue-router'
import Home from '../view/Home'
import Commodity from '../view/Commoddity'
import Login from '../view/Login.vue'
import Shop from '../view/Shop'
import Orders from '../view/Orders'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/Home',
			name: 'Home',
			component: Home,
			meta: {title: 'Home', requiresAuth: true},
			children: [
				{
					path: '/Commodity',
					name: '購物車',
					component: Commodity,
					meta: {title: '購物車', requiresAuth: true}
				},
				{
					path: '/Shop',
					name: '商品頁',
					component: Shop,
					meta: {title: '商品頁', requiresAuth: true}
				},
				{
					path: '/Orders',
					name: '結帳',
					component: Orders,
					meta: {title: '結帳', requiresAuth: true}
				}
			]
		},
		{
			path: '/',
			name: '登入',
			component: Login,
			meta: {requiresAuth: false}
		}
	]
})
