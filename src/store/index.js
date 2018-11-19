
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import car from './modules/car'
import products from './modules/products'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    car,
    products
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
