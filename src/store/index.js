import Vue from 'vue'
import Vuex from 'vuex'
import basket from './basket'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    basket
  }
})

export default store
