import { Message } from 'element-ui'

const buyList = {
	state: {
		buyList: []
	},
	mutations: {
		ADD_ITEM_TO_ORDER (state, row) {
			state.buyList.push(row)
			Message.info('結帳成功,訂單已成立')
			console.log(state.buyList)
			this.buyList = []
		}
	},
	actions: {
		addItemToOrder ({commit}, row) {
			commit('ADD_ITEM_TO_ORDER', row)
		}
	},
	getters: {
		buyList: state => state.buyList
	}
}

export default buyList
