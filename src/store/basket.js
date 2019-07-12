import { Message } from 'element-ui'

const basket = {
	state: {
		basket: []
	},
	mutations: {
		ADD_PRODUCT_TO_BASKET (state, product) {
			state.basket.push(product)
			Message.success('新增成功！')
			console.log(state.basket)
		}
	},
	actions: {
		addProductToBasket ({commit}, product) {
			commit('ADD_PRODUCT_TO_BASKET', product)
		}
	},
	getters: {
		basket: state => state.basket
	}
}

export default basket
