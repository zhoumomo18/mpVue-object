import wx from './wx'
import Utils from './index'
// import Tips from './tips'
// import MpvueRouterPatch from 'mpvue-router-patch'

import store from '../store'
// import { login, setStorage, getStorage } from '@/utils/wechat'
// const config = require('../../config')
import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()

// const tokenFly = new Fly()
// let csrfToken = getStorage('openId') ? getStorage('openId') : null

// var env = process.env.NODE_ENV
let baseUrlApi = ''
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrlApi = 'https://ceshi.jackfresh.cn:442/app/'
    break
  case 'production':
    baseUrlApi = 'https://sh.szwfy.com.cn/app/'
    break
  default:
    throw new Error(`找不到当前环境-->>${process.env.NODE_ENV}`)
}
// const baseUrlApi = 'https://sh.szwfy.com.cn/app/'
//  const baseUrlApi = 'https://shtest.whzxc.cn/app/'
// baseUrlApi = 'https://ceshi.jackfresh.cn:442/app/'

fly.config.timeout = 10000

fly.config.headers = {
  'content-type': 'application/x-www-form-urlencoded'
}
fly.config.baseURL = baseUrlApi

fly.interceptors.request.use(async (request) => {
  if (request.body.r !== 'message.messages' || request.body.r !== 'index.upload_formid') {
    wx.showNavigationBarLoading()
  }

  // Tips.loading()
  // debugger
  // if (!store.state.user.userInfo) {
  //   debugger
  // }
  return request
  // if (!csrfToken) {
  //   fly.lock()
  //   const jsCode = await login()

  //   tokenFly.config.headers = {
  //     'content-type': 'application/x-www-form-urlencoded'
  //   }
  //   tokenFly.post('https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=wxapp.login', {
  //     code: jsCode,
  //     comefrom: 'wxapp',
  //     openid: null
  //   }).then((d) => {
  //     request.headers['openid'] = csrfToken = d.data.openid
  //     setStorage('openId', csrfToken)
  //     fly.unlock()
  //     return request
  //   }, (err) => {
  //     console.log(err)
  //   })
  // } else {
  //   request.headers['openid'] = csrfToken
  //   return request
  // }
})

fly.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading()
    // Tips.loaded()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideNavigationBarLoading()
    console.log(err)
//  wx.showToast({
//    title: '当前网络不佳，请重新加载...',
//    icon: 'none',
//    duration: 1500
//  })
    // Tips.loaded()
    setTimeout(() => {
      store.commit('SET_IS_LOADING', false)
    }, 500)
    Utils.stopRefresh()
    return promise.resolve()
  }
)

export default fly
