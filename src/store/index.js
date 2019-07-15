import Vue from 'vue'
import Vuex from 'vuex'
import basket from './basket'
import buyList from './buyList'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		basket,
		buyList
	}
})

export default store
