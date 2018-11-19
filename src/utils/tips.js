/**
 * 提示与加载工具类
 */
export default class Tips {
  constructor () {
    this.isLoading = false
  }
  /**
   * 弹出提示框
   */

  static success (title, duration = 500) {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: 'success',
        mask: true,
        duration: duration
      })
    }, 300)
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, duration)
      })
    }
  }

  /**
   * 弹出确认窗口
   */
  static confirm (text, title = '提示') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: true,
        success: res => {
          if (res.confirm) {
            resolve('confirm')
          } else if (res.cancel) {
            resolve('cancel')
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }

  static toast (title, onHide, icon = 'success', duration = 500) {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: icon,
        mask: true,
        duration
      })
    }, 300)

    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 500)
    }
  }
  /**
   * 弹出加载提示
   */
  static loading (title = '加载中...') {
    if (Tips.isLoading) {
      return
    }
    Tips.isLoading = true
    wx.showLoading({
      title: title,
      mask: true
    })
  }

  /**
   * 加载完毕
   */
  static loaded () {
    if (Tips.isLoading) {
      Tips.isLoading = false
      wx.hideLoading()
    }
  }

  static share (title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function (res) {
        Tips.toast('分享成功')
      }
    }
  }

  static alert (text, ok) {
    let Text = typeof text === 'object' ? JSON.stringify(text) : text
    if (ok === void 0) {
      ok = function (res) {}
    }
    if (!Text) {
      return
    }
    wx.showModal({
      content: Text,
      showCancel: false,
      confirmColor: '#000000',
      cancelColor: '#000000',
      success: ok
    })
  };
}

/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false
