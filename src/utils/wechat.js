import wx from './wx'

export function login () {
  return new Promise((resolve, reject) => {
    wx.login({ success: res => resolve(res.code), fail: err => reject(err) })
  })
}

export function getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ success: res => resolve(res), fail: err => reject(err) })
  })
}

export function getSetting () {
  return new Promise((resolve, reject) => {
    wx.getSetting({ success: resolve, fail: reject })
  })
}
export function getSystemInfoSync () {
  return wx.getSystemInfoSync()
}

export function setStorage (key, value) {
  wx.setStorageSync(key, value)
}

export function getStorage (key) {
  return wx.getStorageSync(key)
}

export function getLocation (type) {
  return new Promise((resolve, reject) => {
    wx.getLocation({ success: res => {
      function qqMapTransBMap (lng, lat) {
        let xPi = 3.14159265358979324 * 3000.0 / 180.0
        let x = lng
        let y = lat
        let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * xPi)
        let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * xPi)
        let lngs = z * Math.cos(theta) + 0.0065
        let lats = z * Math.sin(theta) + 0.006
        return {
          latitude: lngs,
          longitude: lats
        }
      }
      let data = qqMapTransBMap(res.latitude, res.longitude)
      resolve(data)
    },
    fail: err => reject(err) })
  })
}
export function NetworkStatusChange () {
  return new Promise((resolve, reject) => {
    wx.onNetworkStatusChange(res => { debugger; resolve(res.isConnected, res.networkType) })
  })
}
export function set (key, value, exp) {
  const curTime = new Date().getTime()
  const expTime = curTime + exp
  wx.setStorageSync(key, JSON.stringify({data: value, time: expTime}))
}
export function get (key) {
  const data = wx.getStorageSync(key)
  const dataObj = JSON.parse(data)
  if (new Date().getTime() - dataObj.time >= 0) {
    console.log('信息已过期')
  } else {
    const dataObjDatatoJson = dataObj.data
    return dataObjDatatoJson
  }
}
export function clear () {
  wx.clearStorageSync()
}
export function uploadFile (url, filePath) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({ url, filePath, name: 'image', success: res => resolve(res), fail: err => reject(err) })
  })
}

export function chooseImage (type) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({ count: 1, sourceType: [type], sizeType: ['compressed'], success: res => resolve(res.tempFilePaths), fail: err => reject(err) })
  })
}

export function showActionSheet (resAgs) {
  return new Promise((resolve, reject) => {
    wx.showActionSheet({ itemList: resAgs, success: res => resolve(res.tapIndex), fail: res => reject(res.errMsg) })
  })
}
export function requestPayment (timeStamp, nonceStr, pka, signType, paySign) {
  return new Promise((resolve, reject) => {
    wx.requestPayment({ timeStamp, nonceStr, package: pka, signType, paySign, success: res => resolve(res.tapIndex), fail: res => reject(res.errMsg) })
  })
}
