import { Message } from 'element-ui'

const basket = {
	state: {
		basket: []
	},
	mutations: {
		ADD_PRODUCT_TO_BASKET (state, product) {
			const cartItem = state.basket.find(item => item.id === product.id)
			if (cartItem) {
				cartItem.num++
				Message.success('商品已加入購物車！')
				console.log(state.basket)
			} else {
				state.basket.push(product)
				Message.success('商品已加入購物車！')
				console.log(state.basket)
			}
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
