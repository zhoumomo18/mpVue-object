function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function Format (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

//经纬度转换成三角函数中度分表形式。
function Rad (d) {
  return d * Math.PI / 180.0
}

export default class Utils {
  static formatTime (date, str = '/') {
    date = new Date(parseInt(date))
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    // const hour = date.getHours()
    // const minute = date.getMinutes()
    // const second = date.getSeconds()
    const t1 = [year, month, day].map(formatNumber).join(str)
    // const t2 = [hour, minute, second].map(formatNumber).join(':')
    // console.log(`${t1} ${t2}`)
    return `${t1}`
  }
  static formatDate (date, form = 'yyyy-MM-dd HH:mm:ss') {
    date = new Date(parseInt(date) * 1000)
    const t1 = Format(date, form)
    return `${t1}`
  }
  static tabbarinit () {
    return [
      {
        'current': 0,
        pagePath: '/pages/home/home',
        text: '首页',
        iconPath: '/static/images/icon_index_default.png',
        selectedIconPath: '/static/images/icon_index.png'
      },
      {
        'current': 0,
        pagePath: '/pages/nearly/nearly',
        text: '附近',
        iconPath: '/static/images/icon_nearby_default.png',
        selectedIconPath: '/static/images/icon_nearby.png'
      },
      // {
      //   'current': 0,
      //   pagePath: '/pages/user/user',
      //   text: '国粉',
      //   iconPath: '/static/images/icon_fans_default.png',
      //   selectedIconPath: '/static/images/icon_fans.png'
      // },
      {
        'current': 0,
        pagePath: '/pages/news/news',
        text: '消息',
        iconPath: '/static/images/icon_news_default.png',
        selectedIconPath: '/static/images/icon_newss.png'
      },
      {
        'current': 0,
        pagePath: '/pages/user/user',
        text: '我的',
        iconPath: '/static/images/icon_mine_default.png',
        selectedIconPath: '/static/images/icon_mine.png'
      }
    ]
  }

  static PromiseAll (...restArgs) {
    return new Promise((resolve, reject) => {
      Promise.all(restArgs).then((results) => {
        resolve(results)
      })
    })
  }

  static deepCopy (source) {
    var result = {}
    for (var key in source) {
      if (typeof source[key] === 'object') {
        result[key] = this.deepCopy(source[key])
      } else {
        result[key] = source[key]
      }
    }
    return result
  }
  // 百度经纬度转腾讯经纬度
  static bMapTransqqMap (lng, lat) {
    let xPi = 3.14159265358979324 * 3000.0 / 180.0
    let x = lng - 0.0065
    let y = lat - 0.006
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPi)
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPi)
    let lngs = z * Math.cos(theta)
    let lats = z * Math.sin(theta)

    return [lngs, lats]
  }
  // 计算2个经纬度之间的距离  //输出为公里
  static getDistance (lat1, lng1, lat2, lng2) {
    var radLat1 = Rad(lat1)
    var radLat2 = Rad(lat2)
    var a = radLat1 - radLat2
    var b = Rad(lng1) - Rad(lng2)
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * 6378.137 // EARTH_RADIUS
    s = Math.round(s * 10000) / 10000
    return s
  }
  static stopRefresh () {
    const getCtx = (
      selector,
      ctx = getCurrentPages()[getCurrentPages().length - 1]
    ) => {
      const componentCtx = ctx.selectComponent(selector)

      if (!componentCtx) {
        throw new Error('无法找到对应的组件，请按文档说明使用组件')
      }

      return componentCtx
    }
    const $stopWuxRefresher = (selector = '#wux-refresher', ctx) =>
      getCtx(selector, ctx).finishPullToRefresh()
    $stopWuxRefresher()
  }
}
