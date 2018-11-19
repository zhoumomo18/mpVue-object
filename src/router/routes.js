module.exports = [
  {
    path: '/pages/home/home',
    name: 'HomeIndex',
    config: {
      enablePullDownRefresh: false,
      onReachBottomDistance: 200,
      usingComponents: {
        // 'van-slider': '../../static/iview2/slider/index',
        'van-popup': '../../static/iview2/popup/index',
        'zan-loadmore': '../../static/iview2/loadmore/index',
        'wux-image': '../../static/vuxui/image/index',
        'wux-refresher': '../../static/vuxui/refresher/index'
      }
    }
  },
  {
    path: '/pages/nearly/nearly',
    name: 'Nearly',
    config: {
      navigationBarTitleText: '附近',
      enablePullDownRefresh: false,
      onReachBottomDistance: 200,
      usingComponents: {
        'zan-loadmore': '../../static/iview2/loadmore/index',
        'wux-image': '../../static/vuxui/image/index'
      }
    }
  },
  {
    path: '/pages/nearly/bigSale',
    name: 'Nearly',
    config: {
      navigationBarTitleText: '大牌促销',
      enablePullDownRefresh: false,
      onReachBottomDistance: 200,
      usingComponents: {
        'van-slider': '../../static/iview2/slider/index',
        'van-popup': '../../static/iview2/popup/index',
        'zan-loadmore': '../../static/iview2/loadmore/index',
        'wux-image': '../../static/vuxui/image/index'
      }
    }
  },
  {
    path: '/pages/user/user',
    name: 'User',
    config: {
      navigationBarTitleText: '我的',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/user/userInfo',
    name: 'userInfo',
    config: {
      navigationBarTitleText: '个人信息',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/user/myPay',
    name: 'MyPay',
    config: {
      navigationBarTitleText: '待付款',
      enablePullDownRefresh: false,
      usingComponents: {
        'wux-image': '../../static/vuxui/image/index'
      }
    }
  },

  {
    path: '/pages/user/myOrder',
    name: 'MyOrder',
    config: {
      navigationBarTitleText: '我的订单',
      enablePullDownRefresh: false,
      onReachBottomDistance: 200,
      usingComponents: {
        'zan-loadmore': '../../static/iview2/loadmore/index'
      }
    }
  },
  {
    path: '/pages/user/myLike',
    name: 'MyLike',
    config: {
      navigationBarTitleText: '我的收藏',
      enablePullDownRefresh: false,
      onReachBottomDistance: 200,
      usingComponents: {
        'zan-loadmore': '../../static/iview2/loadmore/index',
        'wux-image': '../../static/vuxui/image/index'
      }
    }
  },
  {
    path: '/pages/user/myFooter',
    name: 'MyFooter',
    config: {
      navigationBarTitleText: '我的足迹',
      enablePullDownRefresh: false,
      onReachBottomDistance: 200,
      usingComponents: {
        'zan-loadmore': '../../static/iview2/loadmore/index',
        'wux-image': '../../static/vuxui/image/index'
      }
    }
  },
  {
    path: '/pages/user/myPublic',
    name: 'MyPublic',
    config: {
      navigationBarTitleText: '我的发布',
      onReachBottomDistance: 200,
      usingComponents: {
        'zan-loadmore': '../../static/iview2/loadmore/index'
      }
    }
  },
  {
    path: '/pages/user/myFocus',
    name: 'MyFocus',
    config: {
      navigationBarTitleText: '我的关注',
      enablePullDownRefresh: false,
      onReachBottomDistance: 200,
      usingComponents: {
        'zan-loadmore': '../../static/iview2/loadmore/index'
      }
    }
  },

  {
    path: '/pages/user/myAdress',
    name: 'MyAdress',
    config: {
      navigationBarTitleText: '地址管理',
      onReachBottomDistance: 200,
      usingComponents: {
        'zan-loadmore': '../../static/iview2/loadmore/index'
      }
    }
  },
  {
    path: '/pages/user/myCar',
    name: 'MyCar',
    config: {
      navigationBarTitleText: '购物车',
      onReachBottomDistance: 200,
      usingComponents: {
        'zan-loadmore': '../../static/iview2/loadmore/index',
        'wux-image': '../../static/vuxui/image/index'
      }
    }
  },
  {
    path: '/pages/news/news',
    name: 'News',
    config: {
      navigationBarTitleText: '消息',
      enablePullDownRefresh: false,
      usingComponents: {
        'wux-image': '../../static/vuxui/image/index'
      }
    }
  },

  {
    path: '/pages/home/GoCity',
    name: 'GoCity',
    config: {
      enablePullDownRefresh: false,
      usingComponents: {
        'van-popup': '../../static/iview2/popup/index'
      }
    }
  },

  {
    path: '/pages/user/orderdetil',
    name: '订单详情',
    config: {
      navigationBarTitleText: '订单详情',
      enablePullDownRefresh: false,
      usingComponents: {}
    }
  },

  {
    path: '/pages/user/editAdress',
    name: 'editAdress',
    config: {
      navigationBarTitleText: '编辑地址',
      enablePullDownRefresh: false
    }
  },
  // {
  //   path: '/pages/user/map',
  //   name: 'map',
  //   config: {
  //     navigationBarTitleText: '店铺地址',
  //     enablePullDownRefresh: false
  //   }

  // },
  // {

  {
    path: '/pages/news/newsdetil',
    name: 'newsdetil',
    config: {
      navigationBarTitleText: '消息详情',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/user/setting',
    name: 'setting',
    config: {
      navigationBarTitleText: '系统设置'
    }
  },
  {
    path: '/pages/user/feedback',
    name: 'feedback',
    config: {
      navigationBarTitleText: '意见反馈',
      enablePullDownRefresh: false,
      usingComponents: {
        'van-popup': '../../static/iview2/popup/index'
      }
    }
  },
  {

    path: '/pagesSub/busineshop/shop',
    subPackage: true,
    name: 'busineshop',
    config: {
      navigationBarTitleText: '店铺详情',
      enablePullDownRefresh: false,
      usingComponents: {
        'van-popup': '../../static/iview2/popup/index',
        'wux-image': '../../static/vuxui/image/index',
        'wux-rater': '../../static/vuxui/rater/index',
        'zan-loadmore': '../../static/iview2/loadmore/index'
      }
    }

  },
  {
    path: '/pagesSub/busineshop/shoplist',
    subPackage: true,
    name: '本周逛哪·万象城',
    config: {
      navigationBarTitleText: '本周逛哪·万象城',
      enablePullDownRefresh: false,
      usingComponents: {
        'zan-loadmore': '../../static/iview2/loadmore/index',
        'wux-image': '../../static/vuxui/image/index',
        'van-tab': '../../static/iview2/tab/index'
      }
    }
  },

  {
    path: '/pagesSub/searchshop/search_shop',
    subPackage: true,
    name: '天天逛街',
    config: {
      navigationBarTitleText: '天天逛街',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pagesSub/searchshop/searchresult',
    subPackage: true,
    name: '天天逛街',
    config: {
      navigationBarTitleText: '天天逛街',
      enablePullDownRefresh: false,
      usingComponents: {
        'van-popup': '../../static/iview2/popup/index',
        'wux-image': '../../static/vuxui/image/index',
        'zan-loadmore': '../../static/iview2/loadmore/index'
      }
    }
  },
  {
    path: '/pagesSub/goodsDetail/index',
    subPackage: true,
    name: 'GoodsDetail',
    config: {
      navigationBarTitleText: '商品详情',
      enablePullDownRefresh: false,
      usingComponents: {
        'van-popup': '../../static/iview2/popup/index',
        'wux-image': '../../static/vuxui/image/index'
      }
    }
  },

  {
    path: '/pagesSub/goodsDetail/goodsDetailRate',
    subPackage: true,
    name: 'goodsDetailRate',
    config: {
      navigationBarTitleText: '商品评价',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pagesSub/busineshop/activeinfo',
    subPackage: true,
    name: 'activeinfo',
    config: {
      navigationBarTitleText: '活动详情',
      enablePullDownRefresh: false,
      usingComponents: {
        'wux-image': '../../static/vuxui/image/index'
      }
    }
  },
  {
    path: '/pagesSub/busineshop/comment',
    subPackage: true,
    name: 'comment',
    config: {
      navigationBarTitleText: '评论',
      enablePullDownRefresh: false,
      usingComponents: {
        'wux-rater': '../../static/vuxui/rater/index',
        'wux-image': '../../static/vuxui/image/index'
      }
    }
  },
  {
    path: '/pagesSub/busineshop/commentdetil',
    subPackage: true,
    name: 'commentdetil',
    config: {
      navigationBarTitleText: '评论详情',
      enablePullDownRefresh: false,
      usingComponents: {
        'wux-rater': '../../static/vuxui/rater/index',
        'wux-image': '../../static/vuxui/image/index'
      }
    }
  },
  {
    path: '/pagesSub/login/loginIndex',
    subPackage: true,
    name: 'User',
    config: {
      navigationBarTitleText: '天天逛街',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pagesSub/login/userProtect',
    subPackage: true,
    name: 'userProtect',
    config: {
      navigationBarTitleText: '天天逛街用户协议',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pagesSub/login/loginPhone',
    subPackage: true,
    name: 'LoginPhone',
    config: {
      navigationBarTitleText: '手机快捷登录',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pagesSub/login/register',
    subPackage: true,
    name: 'Register',
    config: {
      navigationBarTitleText: '手机注册',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pagesSub/login/bindPhone',
    subPackage: true,
    name: 'bindPhone',
    config: {
      navigationBarTitleText: '手机号绑定',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pagesSub/login/goAuth',
    subPackage: true,
    name: 'GoAuth',
    config: {
      navigationBarTitleText: '天天逛街',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pagesSub/recommend/recommendone',
    name: '天天逛街',
    subPackage: true,
    config: {
      navigationBarTitleText: '天天逛街'
    }
  },
  {
    path: '/pagesSub/voucher/voucher',
    subPackage: true,
    name: 'voucher',
    config: {
      navigationBarTitleText: '我的券包',
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pagesSub/sign/sign',
    name: 'sign',
    subPackage: true,
    config: {
      navigationBarTitleText: '签到赚积分',
      usingComponents: {
        'van-popup': '../../static/iview2/popup/index'
      }
    }
  },
  {
    path: '/pagesSub/sign/signHistory',
    name: 'signHistory',
    subPackage: true,
    config: {
      navigationBarTitleText: '签到记录',
      usingComponents: {
        'zan-loadmore': '../../static/iview2/loadmore/index'
      }
    }
  },
  {
    path: '/pagesSub/busineshop/strategyDetil',
    name: 'strategyDetil',
    subPackage: true,
    config: {
      navigationBarTitleText: '攻略详情',
      usingComponents: {
        'zan-loadmore': '../../static/iview2/loadmore/index',
        'wux-image': '../../static/vuxui/image/index',
        'van-popup': '../../static/iview2/popup/index',
      }
    }
  }

]
