
const car = {

  state: {
  },
  mutations: {
  },
  getters: {
    getCarCount (state, getters, rootState) {
      if (!rootState.products.productsList.merch_list) return

      return rootState.products.productsList.total
    },
    selectCount (state, getters, rootState) {
      if (rootState.products.productsList && rootState.products.productsList.merch_list) {
        let sum = 0
        rootState.products.productsList.merch_list[0].list.forEach((item) => {
          if (item.selected === '1') {
            sum += parseInt(item.total)
          }
        })
        return sum
      }
    },
    carTotalPrice: (state, getters, rootState) => {
      if (rootState.products.productsList && rootState.products.productsList.merch_list) {
        return rootState.products.productsList.merch_list[0].list.reduce((previousValue, currentValue, index) => {
          previousValue = index === 1 ? (previousValue.selected === '1' ? parseFloat(previousValue.marketprice) * parseInt(previousValue.total) : 0) : previousValue
          currentValue = currentValue = currentValue.selected === '1' ? parseFloat(currentValue.marketprice) * parseInt(currentValue.total) : 0
          return previousValue + currentValue
        }, 0)
      }
    }
  },
  actions: {

  }
}

export default car
