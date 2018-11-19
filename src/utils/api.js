import $http from './request'

function getTimestamp () {
  return parseInt(new Date().getTime() / 1000)
}
const api = {
/**
 * 获取openid
 */
  getOpenId: (jscode, timestamp = getTimestamp()) => $http.post(`ewei_shopv2_api.php?i=3&r=wxapp.login&timestamp=${timestamp}`, {
    code: jscode,
    comefrom: 'wxapp',
    openid: 'sns_wa_'
  }),
  /**
 * 获取登录验证码
 */
  getLoginSms: (mobile, verifyImgCode) => {
    let obj = {}
    obj = verifyImgCode ? {
      mobile,
      smsimgcode: 1,
      verifyImgCode
    } : { mobile }
    $http.post(`ewei_shopv2_api.php?i=3&r=sms.login`, obj)
  },
  /**
 * 获取注册验证码
 */
  getRegisterSms: (mobile, verifyImgCode) => {
    let obj = {}
    obj = verifyImgCode ? {
        mobile,
        smsimgcode: 1,
        verifyImgCode
    } : { mobile }
    $http.post(`ewei_shopv2_api.php?i=3&r=sms.register`, obj)
    },
    /**
     * 注册
     */
    doRegister: (mobile, pwd, verifycode) => $http.post(`ewei_shopv2_api.php?i=3&r=account.register`, {
    mobile,
    pwd,
    verifycode
    }),
    /**
     * 手机号密码登录
     */
    doPhonePwdLogin: (mobile, pwd) => $http.post(`ewei_shopv2_api.php?i=3&r=account.login`, {
        mobile,
        pwd
    }),
    /**
     * 手机号短信登录
     */
    doPhoneSmsLogin: (mobile, smscode) => $http.post(`ewei_shopv2_api.php?i=3&r=account.login_sms`, {
        mobile,
        smscode
    }),
    /**
     * 获取手机号绑定验证码
     */
    getPhoneBindSms: (mobile, openid) => $http.get('ewei_shopv2_api.php', {
        i: '3',
        r: 'sms.changemobile',
        mobile: mobile,
        verifyImgCode: '',
        smsimgcode: 0,
        comefrom: 'wxapp',
        openid,
        timestamp: getTimestamp()
    }),
    /**
     * 手机号绑定
     */
    doPhoneBind: (mobile, code, password, openid, confirm = 0, timestamp = getTimestamp()) => $http.post(`ewei_shopv2_api.php?i=3&r=member.bind.submit&timestamp=${timestamp}`, {
        mobile,
        code,
        password,
        password1: password,
        confirm,
        comefrom: 'wxapp',
        openid

    }),
    /**
     * openid登录
     */
    doLogin: (jscode, openid, timestamp = getTimestamp()) => $http.post(`ewei_shopv2_api.php?i=3&r=wxapp.login&timestamp=${timestamp}`, {
        code: jscode,
        comefrom: 'wxapp',
        openid
    }),
    /**
     * 微信登录后获取用户信息
     */
    doAuth: (openid, encryptedData, iv, sessionKey, authkey) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'wxapp.auth',
        sessionKey,
        data: encryptedData,
        iv,
        comefrom: 'wxapp',
        openid,
        authkey,
        timestamp: getTimestamp()
    }),
    /**
     * 获取购物车列表
     */
    getCarList: (openid, authkey) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'member.cart.get_cart',
        comefrom: 'wxapp',
        openid,
        authkey,
        timestamp: getTimestamp()
    }),
    getGoodsPick: (openid, id) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'goods.get_picker',
        comefrom: 'wxapp',
        openid,
        id,
        timestamp: getTimestamp()
    }),
    // addProducts: (openid, postObj, timestamp = getTimestamp()) => $http.post(`ewei_shopv2_api.php?i=3&r=member.cart.add&timestamp=${timestamp}`, {
    //   comefrom: 'wxapp',
    //   openid: 'sns_wa_' + openid,
    //   id: postObj.id,
    //   total: postObj.total,
    //   optionid: postObj.optionid
    // }),
    delateProducts: (openid, ids, timestamp = getTimestamp()) => $http.post(`ewei_shopv2_api.php?i=3&r=member.cart.remove&timestamp=${timestamp}`, {
        comefrom: 'wxapp',
        openid,
        ids: [ids]
    }),
    upDateProducts: (openid, postObj, timestamp = getTimestamp()) => $http.post(`ewei_shopv2_api.php?i=3&r=member.cart.update&timestamp=${timestamp}`, {
        comefrom: 'wxapp',
        openid,
        id: postObj.id,
        optionid: postObj.optionid,
        total: postObj.total
    }),
    selectProducts: (openid, postObj, timestamp = getTimestamp()) => $http.post(`ewei_shopv2_api.php?i=3&r=member.cart.select&timestamp=${timestamp}`, {
        comefrom: 'wxapp',
        openid,
        id: postObj.id,
        select: postObj.selected
    }),
    /**
     * 附近商圈
     */
    getBusinessPosition: (lat, lng) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'index.dwsq',
        lat,
        lng
    }),
    /**
     * 获取附近商铺
     */
    getNearlyShop: (ids) => $http.post(`ewei_shopv2_api.php?i=3&r=index.fjdp`, {
        ids
    }),
    /**
     * 获取附近优惠
     */
    getNearlySale: (openid, ids, currentClusterId, lat, lng, type, hot, clusterId, jiawei, page = 1, perPage = 4) => $http.post(`ewei_shopv2_api.php?i=3&r=index.fjyh`, {
        openid,
        ids,
        currentClusterId,
        lat,
        lng,
        type,
        hot,
        cluster_id: clusterId,
        jiawei,
        page: page,
        per_page: perPage
    }),
    /**
     * 每日推荐
     */
    getEveryRecommend: (id) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'recommend.getList',
        comefrom: 'wxapp',
        timestamp: getTimestamp(),
        id
    }),
    /**
     * 今日推荐
     */
    getDadayRecomdend: () => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'goods.Bigsale',
        comefrom: 'wxapp',
        timestamp: getTimestamp()
    }),
    /**
     * 本周逛哪
     */
    getWeekList: (p, c) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'index.the_week',
        comefrom: 'wxapp',
        timestamp: getTimestamp(),
        p,
        c
    }),
    /**
     * 商场列表
     */
    marketList: (lat, lng, city, pindex, psize, second = 0, recommend = 0) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'shop.marketList',        
        lat,
        lng,
        city,
        pindex,
        recommend,
        psize,
        second
    }),
    /**
     * 商场城市列表
     */
    marketCityList: (lat, lng, pindex, psize, city) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'shop.marketList',
        lat,
        lng,
        pindex,
        city,
        psize
    }),
    /**
     * 所有商品分类
     */
    getShopCategory: () => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'shop.category'
    }),
    /**
     * 查看每个分类下的店铺
     */
    getSecondCategoryShopList: (cate, clusterId) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'shop.cateMerch',
        cate,
        cluster_id: clusterId
    }),
    /**
     * 查看推荐热门品牌和 大牌推荐
     */
    getRecommendShop: (clusterId) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'shop.Remerch',
        cluster_id: clusterId
    }),
    /**
     * 个人信息修改
     */
    upDatePersonInfo: (openid, avatar, gender, csrq) => $http.post(`ewei_shopv2_api.php?i=3&r=member.info.face`, {
        openid,
        avatar,
        gender,
        csrq
    }),
    /**
     * 获取个人信息
     */
    getPersonInfo: (openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'member.info.face',
        openid
    }),
    /**
     * 上传文件
     */
    upLoadImg: (openid, image) => $http.post(`ewei_shopv2_api.php?i=3&r=index.upload_img`, {

        openid,
        image
    }),
    /**
     * 获取地址管理
     */
    getAdressList: (openid, authkey) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'member.address.get_list',
        comefrom: 'wxapp',
        openid,
        authkey,
        timestamp: getTimestamp()
    }),
    /**
     * 编辑地址管理
     */
    editAdress: (id, realname, mobile, province, city, area, address, isdefault, openid) => $http.post(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'address.add',
        id,
        realname,
        mobile,
        province,
        city,
        area,
        address,
        isdefault,
        openid
    }),
    /**
     * 新增地址管理
     */
    addAdress: (realname, mobile, province, city, area, address, isdefault, openid, authkey, id) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'address.add',
        comefrom: 'wxapp',
        openid,
        authkey,
        realname,
        mobile,
        province,
        city,
        area,
        address,
        isdefault
    }),
    /**
     * 删除地址
     */
    deleteAdress: (id, openid, authkey) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'member.address.delete',
        comefrom: 'wxapp',
        id: id,
        openid,
        authkey,
        timestamp: getTimestamp()
    }),
    /**
     * 删除地址
     */
    getAdressInfo: (id, openid, authkey) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'member.address.get_detail',
        comefrom: 'wxapp',
        id: id,
        openid,
        authkey,
        timestamp: getTimestamp()
    }),
    /**
     * 商品详情
     */
    getGoodsDetail: (id, openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        openid,
        r: 'goods.get_detail',
        id
    }),
    /**
     * 获取商品评价
     */
    getGoodsRate: (id, pindex, psize) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'goods.get_comments',
        pindex,
        psize,
        id
    }),
    /**
     * 商品分类
     */
    getcategory: (merchid, openid, authkey) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'goods.get_category',
        openid,
        merchid,
        authkey,
        timestamp: getTimestamp()
    }),
    /**
     * 商品列表
     */
    getGoodsList: (merchid, openid, authkey, page) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'goods.get_list',
        openid,
        merchid,
        authkey,
        page,
        timestamp: getTimestamp()
    }),
    /**
     * 商品列表按照销量排序
     */
    getGoodsListBySale: (openid, authkey, page, by) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'goods.get_list',
        openid,
        order: 'sales',
        by,
        authkey,
        page,
        timestamp: getTimestamp()
    }),
    /**
     * 商品列表按照价格升序降序排列
     */
    getGoodsListByPrice: (openid, authkey, type, page) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'goods.get_list',
        openid,
        order: 'minprice',
        by: type,
        authkey,
        page,
        timestamp: getTimestamp()
    }),
    /**
     * 根据价格区间
     */
    /**
     * 商品筛选根据价格
     */
    getPontByPrice: (openid, authkey, minprice, maxprice, page) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'goods.get_list',
        order: 'minprice',
        openid,
        minprice,
        maxprice,
        authkey,
        page,
        timestamp: getTimestamp()
    }),
    /**
     * 根据关键字搜索商品
     */
    // getGoodsListByKeyWords: (merchid, openid, authkey, keywords, page) => $http.get(`ewei_shopv2_api.php`, {
    //  i: '3',
    //  comefrom: 'wxapp',
    //  r: 'goods.get_list',
    //  openid: 'sns_wa_' + openid,
    //  keywords,
    //  merchid,
    //  authkey,
    //  page,
    //  timestamp: getTimestamp()
    // }),
    /**
     * 筛选商品
     */
    /**
     * 查看我的待付款订单列表
     */
    getOrderList: (openid, page = 1, status) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'order.get_list',
        openid,
        status,
        page
    }),
    // getAllOrderList: (openid, page = 1) => $http.get(`ewei_shopv2_api.php`, {
    //   i: '3',
    //   comefrom: 'wxapp',
    //   r: 'order.get_list',
    //   openid: 'sns_wa_' + openid,

    //   page
    // }),
    /**
     * 附近消息
     */
    getMsgList: (openid, authkey) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'message.messages',
        openid,
        authkey,
        timestamp: getTimestamp()
    }),
    /**
     * 获取商铺信息
     */
    getShopInfo: (merchid, lat, lng, openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'store.index.info',
        merchid,
        lat,
        lng,
        openid
    }),
    /**
     * 获取商品列表
     */
    getShopGoodsList: (merchid, page = 1) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'store.index.goods_list',
        merchid,
        page
    }),
    /**
     * 获取商品促销列表
     */
    getShopPromGoodsListtwo: (clusterId, page = 1) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'shop.activity_list',
        cluster_id: clusterId,
        page
    }),
    /**
     * 获取促销里面的图文详情
     */
    getShopactiveinfo: (activityId) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'shop.activity_info',
        activity_id: activityId
    }),
    /**
     * 获取本周逛哪图文详情
     */
    getWeekContentInfo: (id) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.the_week',
        id
    }),
    getShopPromGoodsList: (merchid, isdiscount, page = 1) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'store.index.goods_list',
        merchid,
        isdiscount: '1',
        page
    }),
    /**
     * 获取优惠券
     */
    getCoupon: (openid, cate) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'sale.coupon.my.getlist',
        cate,
        openid,
        timestamp: getTimestamp()
    }),
    /**
     * 领取优惠券
     */
    getPay_coupon: (id, openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'goods.pay_coupon',
        id,
        openid
    }),
    /**
     *关注店铺的接口
        */
    getfollow: (merchid, openid, isfollow) => $http.post(`ewei_shopv2_api.php?r=shop.follow&i=3`, {
        merchid,
        openid,
        isfollow
    }),
    /**
     * 获取消息列表
     */
    /**
     * 我的关注
     */
    myfollow: (openid, page, perPage) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'shop.Myfollow',
        page: page,
        per_page: perPage,
        openid
    }),
    /**
     * 我的收藏
     */
    mylike: (openid, page = 1, perPage = 6) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'shop.Mytoggle',
        page: page,
        per_page: perPage,
        openid
    }),
    /**
     * 我的足迹
     */
    myfooter: (openid, authkey) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'member.history.get_list',
        comefrom: 'wxapp',
        openid,
        authkey,
        timestamp: getTimestamp()
    }),
    /**
     * 收藏与取消
     */
    goodstoggle: (goodsid, isfavorite, merchid, openid, authkey) => $http.post(`ewei_shopv2_api.php?r=goods.toggle&i=3`, {
        goodsid,
        isfavorite,
        merchid,
        comefrom: 'wxapp',
        openid,
        authkey,
        timestamp: getTimestamp()
    }),
    /**
     * 获取获取商品规格选择
     */
    get_picker: (id) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'goods.get_picker',
        id
    }),
    /**
     * 添加商品到购物车
     */
    addGoods: (id, total, optionid, openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'member.cart.add',
        id,
        total,
        optionid,
        openid
    }),
    /**
     * 本周逛哪更多
     */
    getWeekListMore: (clusterId, openid, isactivity, cateid, keywords) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.the_week_list',
        cluster_id: clusterId,
        openid,
        isactivity,
        cateid,
        keywords
    }),
    /**
     *关注商场的接口
     */
    getclusterfollow: (clusterid, openid, isfollow) => $http.post(`ewei_shopv2_api.php?r=shop.clusterfollow&i=3`, {
        cluster_id: clusterid,
        openid,
        isfollow
    }),
    /**
     * 查看商圈所有城市列表
     */
    getcityList: () => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'cluster.cityList'
    }),
    /**
     * 搜索结果
     */
    goodsSearchList: (keywords, openid, type, cluster_id, lat, lng, city, cateid, page, per_page,hot) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.search_goods_merch',
        keywords,
        openid,
        type,
        cluster_id,
        lat,
        lng,
        city,
        cateid,
        page,
        per_page,
        hot
    }),
    searchHistory: (openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.user_search_history',
        openid
    }),
    hotWords: (openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'shop.hot',
        openid
    }),
    deleteSearchHistory: (openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.del_search_history',
        openid
    }),
    /**
     * 获取库存
     */
    getStock: (id, color, size) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'goods.get_stock',
        id,
        color,
        size
    }),
    /**
     * 创建订单
     */
    createOrder: (id, total, optionid, openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'order.create',
        id,
        total,
        optionid,
        openid
    }),
    /**
     * 获取个人用户信息
     */
    getUserInfo: (openid, authkey) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        r: 'member',
        comefrom: 'wxapp',
        openid,
        authkey,
        timestamp: getTimestamp()
    }),
    /**
     * 提交订单
     */
    submitOrder: (goodsObj, addressid, fromcart, remark, openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'order.create.submit',
        goods: goodsObj,
        openid,
        dispatchtype: 0,
        fromcart,
        remark,
        carrierid: 0,
        addressid,
        couponid: 0,
        submit: true,
        packageid: 0,
        diydata: false,
        fromquick: 0
    }),
    /**
     * 取消订单
     */
    poinscancel: (id, openid, authkey, timestamp = getTimestamp()) => $http.post(`ewei_shopv2_api.php?i=3&r=order.op.cancel&timestamp=${timestamp}`, {
        id,
        comefrom: 'wxapp',
        remark: '我不想买了',
        openid,
        authkey
    }),
    /**
     * 订单支付
     */
    orderPay: (id, openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'order.pay',
        openid,
        id,
        timestamp: getTimestamp()
    }),
    /**
     * 订单详情
     */
    orderDetail: (id, openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'order.detail',
        openid,
        id,
        timestamp: getTimestamp()
    }),
    /**
     * 优惠通知
     */
    saleMsg: (openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'message.messages',
        openid
    }),
    /**
     * 点击读消息
     */
    readMsg: (openid, type, isread, id) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'message.read_message',
        openid,
        type,
        isread,
        id
    }),
    /**
     * 商圈筛选
     */

    shopDistrict: (ids) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.enoughList',
        ids
    }),
    /**
     * 通过人均消费筛选商圈      废弃了  改成index.fjyh了
     */

    perCapita: (ids, type, lat, lng, hot, clusterId, jiawei, pindex = 1, psize = 5) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.average_merch',
        ids,
        type,
        hot,
        cluster_id: clusterId,
        jiawei,
        lat,
        lng,
        pindex,
        psize
    }),
    /**
     * 搜索商品筛选
     */
    searchShop: (openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'message.messages',
        openid
    }),
    /**
     * 提交意见反馈
     */
    getFeedback: (url, type, content, openid, images, name, contact) => $http.post(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'member.suggest',
        url,
        type,
        content,
        openid,
        images,
        name,
        contact
    }),
    /**
     * 用户协议
     */
    getProtect: () => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.agreement'
    }),
    activelist: (merchid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.activity_list',
        merchid
    }),
    activedetil: (activityid, openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.activity_info',
        activityid,
        openid
    }),
    clusteractivedetil: (activityid, openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.cluster_activity_info',
        activityid,
        openid
    }),
    activelike: (activityid, openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.activity_star',
        activityid,
        openid
    }),
    clusteractivelike: (activityid, openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.cluster_activity_star',
        activityid,
        openid
    }),
    /**
     * 店铺评价
     */
    shopRate: (merchid, openid, zh, hj, fw, jg, content, pics, video, rjxf) => $http.post(`ewei_shopv2_api.php?i=3&r=index.merch_score`, {
        merchid,
        openid,
        zh,
        hj,
        fw,
        jg,
        content,
        pics,
        video,
        rjxf
    }),
    /**
     * 收集formID
     */
    collectFormId: (openid, formids, expire_times) => $http.post(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.upload_formid',
        openid,
        formids,
        expire_times
    }),
/*   
 * 店铺口碑接口
 */
	praiseList: (openid,merchid,page,prePage) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.get_merch_score_list',
        openid,
        merchid,
        page
    }),
    commentInfo:(id) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.get_merch_score_info',
        id
        
    }),
    commentReply:(id) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.get_merch_score_reply',
        id
        
    }),
//  setComment:(id,openid,content) => $http.get(`ewei_shopv2_api.php`, {
//      i: '3',
//      comefrom: 'wxapp',
//      r: 'index.set_merch_score_reply',
//      id,
//      openid,
//      content
//      
//  }),
    setComment: (id,openid,content) => $http.post(`ewei_shopv2_api.php?i=3&comefrom=wxapp&r=index.set_merch_score_reply`, {
  			id,
  			openid,
  			content
    }),
    setLike:(type,id,openid) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.set_merch_score_star',
        type,
        id,
        openid

    }),
    getSign:(merchid, openid, lat, lng) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.merch_check_in_info',
        merchid,
        openid,
        lat,
        lng
    }),
    sign:(merchid, openid, lat, lng, type, bqd) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.merch_check_in',
        merchid,
        openid,
        lat,
        lng,
        type,
        bqd
    }),
    signReloadLocation:(merchid, lat, lng) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.merch_check_jl',
        merchid,
        lat,
        lng
    }),
        getSignList:(openid,merchid,page) => $http.get(`ewei_shopv2_api.php`, {
        i: '3',
        comefrom: 'wxapp',
        r: 'index.get_user_merch_check_in_log',
        openid,
        merchid,
        page
    })
}

export default api