import Vue from 'vue'
import store from '@/store'
import App from '@/App'
import MpvueRouterPatch from 'mpvue-router-patch'
import api from '@/utils/api'
import Utils from '@/utils'
import to from 'await-to-js'

import Tips from '@/utils/tips'
import Validate from '@/utils/validate'

// import '@/styles/iphoneX.scss'

Vue.prototype._U = Utils
Vue.prototype.$tips = Tips
Vue.prototype.$validate = Validate
Vue.prototype.$http = api
Vue.prototype._to = to
Vue.prototype.$url = '../../../static/images/'
Vue.config.productionTip = false

Vue.use(MpvueRouterPatch)

// 去掉小数点
Vue.filter('toFixed0', function (value) {
  if (!value) return ''
  value = Number(value)
  return value.toFixed(0)
})

const app = new Vue({
  store,
  ...App
})
app.$mount()
