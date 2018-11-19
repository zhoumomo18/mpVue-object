import $http from '@/utils/api'

const products = {

  state: {
    productsList: [],
    createOrderInfo: ''
  },
  mutations: {
    SET_PRODUCTS (state, products) {
      state.productsList = products
    },
    SET_CREATE_ORDER_INFO (state, createOrderInfo) {
      state.createOrderInfo = createOrderInfo
    }
  },
  getters: {},
  actions: {
    async getAllProducts ({
      rootState,
      commit
    }) {
      const openid = rootState.user.userInfo.openid
      const authkey = rootState.user.userInfo.authkey
      console.log(openid)
      console.log(authkey)
      let carList = null
      try {
        carList = await $http.getCarList(openid, authkey)
      } catch (error) {
      }
      const productsList = carList
      commit('SET_PRODUCTS', productsList)
    }
  },
  async delateProducts ({
    rootState,
    commit
  }) {
    console.log(rootState)
    const openid = rootState.user.userInfo.openid
    const authkey = rootState.user.userInfo.authkey
    console.log(authkey)
    const carList = await $http.getCarList(openid, authkey)
    if (!carList) return console.error('carList undefined')
    const productsList = carList
    commit('SET_PRODUCTS', productsList)
  }

}

export default products
