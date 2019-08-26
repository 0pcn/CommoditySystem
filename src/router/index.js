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
					name: '訂單管理',
					component: Orders,
					meta: {title: '訂單管理', requiresAuth: true, keepalive: true}
				}
			]
		},
		{
			path: '/',
			name: '登入',
			component: Login,
			meta: {requiresAuth: false}
		}
	],
	// keep-alive 返回緩存頁面後儲存瀏覽位置
	scrollBehavior (to, from, saveposition) {
		if (saveposition && to.meta.saveposition) {
			return saveposition
		}
		return {x: 0, y: 0}
	}
})
