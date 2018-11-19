<template>
  <div class="container goodsDetail" :class="{'pb34':iPhoneshow}">
    <isLoading :isLoading='isLoading'></isLoading>
    <van-popup :show="showbottom" custom-class="bottom" @close="togglePopup" position="bottom">
      <div class="big_mask">
        <div class="readyToBuy">
          <div class="close_mask">
            <div @click="togglePopup" class="mask">X</div>
          </div>
          <div class="rich_text">
            <div class="smallPic">
              <img :src="goodsPick?goodsPick.thumb:''" alt="">
            </div>
            <div class="rich_right">
              <div class="price">￥{{goodsPick.marketprice}}</div>
              <div class="status">有货</div>
              <!-- <div class="toChoose">配送至：洪山区，请选择尺码</div> -->
            </div>
          </div>
          <!-- <div class="tips">
          <span>配送区域</span>
          <span class="goodTip">（配送地可能会影响库存，请正确选择）</span>
        </div>
        <div class="addr lineBottom"  @click="$router.push({ path:'/pages/user/myAdress'})">
          <div class="address">
            <span class="mark">
            	<img src="../../../static/images/icon_adr.png" alt="" />
            </span>
          <span class="details">{{isdefaultAdress?isdefaultAdress.city:''}}</span>
            <span class="details">{{isdefaultAdress?isdefaultAdress.area:''}}</span>
            <span class="details">{{isdefaultAdress?isdefaultAdress.address:''}}</span>
          </div>
          <div class="right-arrow">

          </div>
        </div> -->
          <!-- 选择尺码 -->
          <div class="choose_size">
            <div class="sizes color32">颜色:</div>
            <div class="sizes">
              <!---->
              <div class="size_2" @click="colorActive(index,goodsDetail.id,item.id)" v-for="(item,index) in colorSize[0]?colorSize[0].items:[]" :key='index' :class="{'active_2':colorIsSelect == index}">{{item.title}}

                <i :class="{'active':colorIsSelect == index}"></i>
              </div>

            </div>
          </div>
          <div class="choose_size">
            <div class="size">尺码:</div>
            <div class="sizes">
              <div class="size_2 size_1" @click="sizeActive(index,goodsDetail.id,item.id)" v-for="(item,index) in colorSize[1]?colorSize[1].items:[]" :key='index' :class="{'active_2':sizeIsSelect == index}">{{item.title}}
                <i :class="{'active':sizeIsSelect == index}"></i>
              </div>
            </div>
          </div>
          <div class="choose_size lineBottom clearfix">
            <div class="size fl">购买数量:</div>

            <div class="count mt5 fr">
              <span class="dec align" @click="des(stock)">-</span>
              <span class="f16">{{currentNum}}</span>
              <span class="add align " @click="add(stock)">+</span>
            </div>

          </div>
          <div class="confirm_button">
            <div @click="createOrder">确认</div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 加入购物车 -->
    <van-popup :show="showAddCarbottom" custom-class="bottom" @close="toggleAddCarPopup" position="bottom">
      <div class="big_mask">
        <div class="readyToBuy">
          <div class="close_mask">
            <div @click="toggleAddCarPopup" class="mask">X</div>
          </div>
          <div class="rich_text">
            <div class="smallPic">
              <img :src="goodsPick?goodsPick.thumb:''" alt="">
            </div>
            <div class="rich_right">
              <div class="price">￥{{goodsPick?goodsPick.marketprice:''}}</div>
              <div class="status">有货</div>
              <!-- <div class="toChoose">配送至：洪山区，请选择尺码</div> -->
            </div>
          </div>
          <!-- <div class="tips">
          <span>配送区域</span>
          <span class="goodTip">（配送地可能会影响库存，请正确选择）</span>
        </div>
        <div class="addr lineBottom"  @click="$router.push({ path:'/pages/user/myAdress'})">
          <div class="address">
            <span class="mark"></span>
            <span class="details">{{isdefaultAdress?isdefaultAdress.city:''}}</span>
            <span class="details">{{isdefaultAdress?isdefaultAdress.area:''}}</span>
            <span class="details">{{isdefaultAdress?isdefaultAdress.address:''}}</span>
          </div>
          <div class="right-arrow">

          </div>
        </div> -->
          <!-- 选择尺码 -->
          <!--立即购买的-->
          <div class="choose_size">
            <div class="size">颜色:</div>
            <div class="sizes color32">
              <!--:style="{'background':item.color}"-->
              <div class="size_2" @click="colorActive(index,goodsDetail.id,item.id)" v-for="(item,index) in colorSize[0]?colorSize[0].items:[]" :key='index' :class="{'active_2':colorIsSelect == index}">{{item.title}}

                <i :class="{'active':colorIsSelect == index}"></i>
              </div>

            </div>
          </div>
          <div class="choose_size">
            <div class="size">尺码:</div>
            <div class="sizes size_deit">
              <div class="size_2 size_1" @click="sizeActive(index,goodsDetail.id,item.id)" v-for="(item,index) in colorSize[1]?colorSize[1].items:[]" :key='index' :class="{'active_2':sizeIsSelect == index}">{{item.title}}
                <i :class="{'active':sizeIsSelect == index}"></i>
              </div>
            </div>
          </div>
          <div class="choose_size lineBottom clearfix">
            <div class="size fl">购买数量:</div>

            <div class="count mt5 fr">
              <span class="dec align" @click="des(stock)">-</span>
              <span class="f16">{{currentNum}}</span>
              <span class="add align " @click="add(stock)">+</span>
            </div>

          </div>
          <div class="confirm_button">
            <div @click="addCar">确认</div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 满减促销 -->
    <van-popup :show="showActivitybottom" custom-class="bottom" @close="toggleActivityPopup" position="bottom">
      <div class="onSale">
        <div class="header h40">
          <span class="fl ml15"> 促销活动</span>
          <span class="fr mr15 bgc_img" @click="oend2()">
            <img src="../../../static/images/icon_close.png" style="width:16px;height:16px;" />
          </span>
        </div>

        <div class="mainslist">
          <div class="item_1" v-for="(item,index) in goodsDetail?goodsDetail.activity.enough:[]" :key="index">
            <div class="item_left">
              <span></span>
            </div>
            <div class="item_right">
              <h4 class="color32 f14">满减</h4>
              <p class="f12 color9a">全场{{item.enough}}减去{{item.money}}</p>
            </div>
          </div>
          <button>确定</button>
        </div>
      </div>
    </van-popup>

    <!-- 优惠券领取 -->
    <van-popup :show="showCouponsbottom" custom-class="bottom" @close="toggleCouponsPopup" position="bottom">
      <div>
        <view>
          <div class="onSale">
            <div class="header h40 lineBottom">
              <span class="fl ml15">领取优惠券</span>
              <span class="fr mr15 bgc_img" @click="oend()">
                <img src="../../../static/images/icon_close.png" alt="" style="width:16px;height:16px;" />
              </span>
            </div>
            <div class="mainslist_2">
              <div class="item_2">
                <div class="voucher_s" v-for="(its,index) in goodsDetail?goodsDetail.coupons:[]" :key="index">
                  <div class="voucher_text">
                    <div class="voucher_span v_price">￥</div>
                    <div class="voucher_span v_money">{{its.backmoney}}</div>
                    <div class="voucher_span v_text">
                      <a>优惠券名称</a>
                      <a class="v_add color9a">使用条件&nbsp;:&nbsp;满{{its.deduct}}减{{its.enough}}可使用</a>
                      <a class="v_add color9a">适用范围&nbsp;:&nbsp;全场通用</a>
                    </div>

                  </div>
                  <p class="v_ptext">{{its.timestart}}—{{its.timeend}} &nbsp;
                    <a class="text_a"></a>
                  </p>
                  <img src="../../../static/images/img_yhj.png" alt="" />
                  <span class="span_no" @click="getPay_coupon(its.id)">立即领取</span>
                </div>
              </div>
              <!--   <button>确定</button>-->
            </div>
          </div>

        </view>
      </div>
    </van-popup>

    <div class="swiperContainer">
      <div class="find_list lineTop" :class="{'fixedBox_3':iPhoneshow}">
        <li v-for="(items,indexs) in shopD_list" :key="indexs" @click="poin_detil(indexs)">
          {{items.text}}
          <span :class="{'span_bgc':spanindexs==indexs}"></span>
        </li>
        <button class="share_to" open-type='share' data-param='1'>
          <img src="../../../static/images/icon_share.png" alt="" />

        </button>
        <!--<li @click="poin_detil_2">
					评论
					<span if="poinstyle==2"></span>
				</li>
				<li @click="poin_detil_3">
					详情
					<span if="poinstyle==3"></span>
				</li>-->
      </div>
      <swiper :indicator-dots="indicatorDots" :current="swiperCurrent" :autoplay="autoplay" :interval="interval" :duration="duration" @change="swiperChange" class="swiper">

        <block v-for="(item,index) in goodsDetail?goodsDetail.thumbs:[]" :key="index">
          <swiper-item>
            <wux-image wux-class="image" shape="circle" :src="item" class="slide-image"></wux-image>
            <!-- <image :src="item" class="slide-image" /> -->
          </swiper-item>
        </block>
      </swiper>
      <!--<div class="dots">
        {{swiperCurrent+1}}/{{goodsDetail.thumbs?goodsDetail.thumbs.length:0}}
      </div>-->
      <div class="dots">
        <block v-for="(item,index) in goodsDetail?goodsDetail.thumbs:[]" :key="index">
          <view class="dot" :class="{'active':swiperCurrent == index}"></view>
        </block>

      </div>

    </div>
    <div class="intro">
      <div class="info">
        <span>{{goodsDetail.title}}</span>
        <!-- <span>男装</span>
        <span>上衣短裤</span> -->
      </div>

    </div>

    <div class="goodsPrice">
      <div class="onSale">
        <span class="discount">￥{{goodsDetail.marketprice}}</span>
        <span class="original">￥{{goodsDetail.productprice}}</span>
      </div>
      <div class="saled">已售{{goodsDetail.sales?goodsDetail.sales:0}}件</div>
      <!--<div class="focus" @click="like(goodsDetail.isfavorite)" :class="{'starActive':goodsDetail.isfavorite}">
        	收藏
      </div>-->
    </div>
    <div class="all_goods" v-if="false">
      <div class="discounts lineBottom" style="background:#fff;">
        <div class="present" @click="toggleCouponsPopup">
          <span class="gift">
            <img :src="tinyPics.gift" />
          </span>
          <span class="discount_msg">{{goodsDetail.coupons[0].name}}</span>
        </div>
        <div class="right-arrow">

        </div>
      </div>

      <div class="discounts" style="background:#fff;">
        <div class="present" @click="toggleActivityPopup">
          <span class="gift gift_1">
            <img :src="tinyPics.promotion" />
          </span>
          <span class="discount_msg">
            <span class="mr5" v-for="(item,index) in goodsDetail?goodsDetail.activity.enough:[]" :key="index">全场满{{item.enough}}减{{item.money}}元</span>
          </span>
        </div>
        <div class="right-arrow">
        </div>
      </div>
    </div>
    <div class="shopping_mall" @click="$router.push({ path:'/pagesSub/busineshop/shop',query:{id:goodsDetail.merchid}})">
      <div class="pull_left">
        <div class="gift gift_2">
          <img :src="goodsDetail?goodsDetail.merchInfo.logo:''" />
        </div>
        <div class="details">
          <div class="discount_msg">{{goodsDetail?goodsDetail.merchInfo.merchname:''}}</div>
          <div class="gray">
            商品数量：
            <span class="gray mr25">{{goodsDetail?goodsDetail.merchInfo.goodsnum:0}}</span>
            已售:
            <span class="gray">{{goodsDetail&&(goodsDetail.merchInfo.saleout?goodsDetail.merchInfo.saleout:0)}}</span>件
          </div>
        </div>
      </div>
      <div class="pull_right">
        进店逛逛
      </div>
    </div>
    <div class="discounts bgcfff lineBottom">
      <div class="present">
        <span>
          商家地址
        </span>
        <span class="discount_msg text-right">{{goodsDetail?goodsDetail.merchInfo.address:''}}</span>
      </div>
      <div class="right-arrow">

      </div>
    </div>
    <div class="discounts bgcfff lineBottom">
      <div class="present" id="a">
        <span class="color32 f16" style="font-weight: 700;">
          商家评价
          <span class="judges color32 f16" style="font-weight: 700;">( {{RateListLength}} )</span>
        </span>
        <span class="discount_msg text-right"></span>
      </div>
      <div class="check_all" @click="$router.push({ path:'/pagesSub/goodsDetail/goodsDetailRate',query:{id:goodsDetail.id}})">
        查看全部>>
      </div>
    </div>
    <!-- 循环的数据 -->
    <div class="comment lineBottom" v-for="(item,index) in getGoodsRateList" :key="index">
      <div class="discounts bgcfff">
        <div class="present">
          <span class="gift portrait">
            <img :src="item.headimgurl" />
          </span>
          <span class="discount_msg">{{item.nickname}}</span>
        </div>
        <div class="check_all">
          {{item.createtime}}
        </div>
      </div>
      <div class="pdl15">{{item.content}}</div>
      <div class="pdl15 mgt5">颜色：{{item.optionname[0]}} 尺寸：{{item.optionname[1]}}</div>
    </div>

    <div class="details_info">
      <div class="text_info">
        商品详情
      </div>

      <div class="content_main" v-html="goodsDetail.content">

      </div>
      <!-- <img :src="tinyPics.intro" alt="商品详情图片">
      <div class="toBuy lineBottom">
        阿迪王服饰质量保证，童受无欺，买到就是赚到，快来购 买吧~
      </div> -->

    </div>
    <div class="fixedBoxWrap">
      <div class="fixedBox" :class="{'fixedBox_2':iPhoneshow}">
        <div class="todos">
          <div class="three" style="overflow:hidden;position:relative;">
            <div class='contact'>
              <contact-button type="default-light" size="30" session-from="weapp">
              </contact-button>
              <contact-button type="default-light" size="30" session-from="weapp">
              </contact-button>
              <contact-button type="default-light" size="30" session-from="weapp">
              </contact-button>
              <contact-button type="default-light" size="30" session-from="weapp">
              </contact-button>

            </div>
            <div class="iconPic">
            </div>
            <div class="tiny_font">客服</div>
          </div>
          <div class="three" @click="like(goodsDetail.isfavorite)">
            <div class="iconPic star" :class="{'starActive':goodsDetail.isfavorite}">
            </div>
            <!-- <i class="iconfont icon-icon-test"></i> -->
            <div class="tiny_font">收藏</div>
          </div>
          <div class="three" @click="$store.state.user.loginStatus?$router.push({ path:'/pages/user/myCar'}):$router.push({ path: '/pagesSub/login/loginIndex' })">
            <div class="iconPic shopcar">
              <span v-if="getCarCount>0&&userInfo" class="count">{{getCarCount>99 ?'+':getCarCount}}</span>
            </div>
            <div class="tiny_font">购物车</div>
          </div>
        </div>
        <div @click="toggleAddCarPopup">
          加入购物车
        </div>
        <div @click="togglePopup">
          立即购买
        </div>
      </div>
      <div v-if="iPhoneshow" class="h34"></div>
    </div>

  </div>

</template>
<script>
import {
  login,
  getUserInfo,
  getSetting,
  setStorage,
  getLocation
} from "@/utils/wechat";
import isLoading from "@/components/isLoading";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      tinyPics: {
        // customer: '/static/images/icon_customer.png',
        intro: "/static/images/img_concessionaryvolums.png",
        // portrait: '/static/images/icon_headportrai.png',
        // store: '/static/images/icon_default.png',
        promotion: "/static/images/icon_Promotion.png",
        gift: "/static/images/icon_gift.png"
      },

      indicatorDots: false,
      swiperCurrent: 0,
      autoplay: true,
      interval: 3000,
      duration: 1500,
      showbottom: false,
      showAddCarbottom: false,
      showActivitybottom: false,
      showCouponsbottom: false,
      goodsDetail: "",
      getGoodsRateList: "",
      RateListLength: "",
      colorSize: "",
      goodsPick: "",
      colorIsSelect: null,
      sizeIsSelect: null,
      colorId: "",
      sizeId: "",
      stock: "",
      currentNum: 1,
      optionid: "",
      isdefaultAdress: "",
      poinstyle: 0,
      shopD_list: [
        { text: "商品", states: "1" },
        { text: "评价", states: "2" },
        { text: "详情", states: "3" }
      ],
      spanindexs: "",
      iPhoneshow: false
    };
  },
  components: {
    isLoading
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(["getCarCount"]),
    isLoading() {
      return this.$store.state.user.isLoading;
    }
  },
  methods: {
    ...mapActions(["getAllProducts"]),
    async togglePopup() {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      }
      this.showbottom = !this.showbottom;
    },
    async createOrder() {
      if (this.optionid != null) {
        this.$store.commit("SET_CREATE_ORDER_INFO", {
          id: this.$route.query.id,
          currentNum: this.currentNum,
          optionid: this.optionid
        });
        this.showbottom = !this.showbottom;
        this.$router.push({
          path: "/pages/user/myPay",
          query: { from: "goodsDetail" }
        });
      } else {
        this.$tips.toast("请选择正确的规格", function() {}, "none");
      }
    },
    iphone_xsp() {
      if (this.$store.state.user.iphoneX) {
        this.iPhoneshow = true;
      }
    },
    toggleAddCarPopup() {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      }
      this.showAddCarbottom = !this.showAddCarbottom;
    },
    async addCar() {
      if (this.optionid != null) {
        const data = await this.$http
          .addGoods(
            this.$route.query.id,
            this.currentNum,
            this.optionid,
            this.$store.state.user.userInfo.openId
          )
          .then(res => {
            if (res.error == 0) {
              this.getAllProducts().then(res => {});
            } else {
              this.$tips.toast(res.message, function() {}, "none", 1500);
            }
          });
        this.showAddCarbottom = !this.showAddCarbottom;
      } else {
        this.$tips.toast("请选择正确的规格", function() {}, "none");
      }
    },
    toggleActivityPopup() {
      this.showActivitybottom = !this.showActivitybottom;
    },
    toggleCouponsPopup() {
      this.showCouponsbottom = !this.showCouponsbottom;
    },
    swiperChange: function(e) {
      this.swiperCurrent = e.mp.detail.current;
    },
    oend() {
      this.showCouponsbottom = false;
    },
    oend2() {
      this.showActivitybottom = false;
    },
    async getPay_coupon(id) {
      const [err, res] = await this._to(
        this.$http.getPay_coupon(id, this.$store.state.user.userInfo.openId)
      );
      if (res.error == 0) {
        this.$tips.toast("领取成功");
      }
    },

    async colorActive(index, id, colorId) {
      this.colorIsSelect = index;
      this.colorId = colorId;
      if (this.colorId != null && this.sizeId != null) {
        const [err, res] = await this._to(
          this.$http.getStock(id, this.colorId, this.sizeId)
        );
        this.stock = res.stockInfo ? res.stockInfo.stock : null;
        if (!res.stockInfo.stock || res.stockInfo.stock == "0") {
          this.colorIsSelect = null;
          this.sizeIsSelect = null;
          this.colorId = null;
          this.sizeId = null;
          this.$tips.toast(`库存为空`, function() {}, "none");
        }
        this.optionid = res.stockInfo.id;
      }
    },

    async sizeActive(index, id, sizeId) {
      this.sizeIsSelect = index;
      this.sizeId = sizeId;

      if (this.colorId != null && this.sizeId != null) {
        const [err, res] = await this._to(
          this.$http.getStock(id, this.colorId, this.sizeId)
        );
        this.stock = res.stockInfo ? res.stockInfo.stock : null;
        if (!res.stockInfo.stock || res.stockInfo.stock == "0") {
          this.colorIsSelect = null;
          this.sizeIsSelect = null;
          this.colorId = null;
          this.sizeId = null;
          this.$tips.toast(`库存为空`, function() {}, "none");
        }
        this.optionid = res.stockInfo.id;
      }
    },
    add(stock) {
      if (this.colorIsSelect == null || this.sizeIsSelect == null) {
        this.$tips.toast(`请选择颜色尺码`, function() {}, "none");
        return;
      }
      if (stock == null) {
        this.$tips.toast(`库存为空`, function() {}, "none");
      }

      if (this.currentNum < parseInt(stock)) {
        if (this.currentNum < parseInt(this.goodsDetail.maxbuy)) {
          this.currentNum++;
        } else {
          this.$tips.toast(
            `最大添加数量${this.goodsDetail.maxbuy}`,
            function() {},
            "none",
            1500
          );
          return;
        }
      } else {
        this.$tips.toast(
          `最大添加数量${stock ? stock : 0}`,
          function() {},
          "none",
          1500
        );
      }
    },
    des() {
      if (this.currentNum > 1) {
        this.currentNum--;
      }
    },
    async like(isfavorite) {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      }
      const res = await this.$http.goodstoggle(
        this.goodsDetail.id,
        isfavorite ? "0" : "1",
        this.goodsDetail.merchid,
        this.$store.state.user.userInfo.openId,
        this.$store.state.user.userInfo.authkey
      );

      if (res.status == "Success") {
        const [err, res] = await this._to(
          this.$http.getGoodsDetail(
            this.$route.query.id,
            this.$store.state.user.userInfo.openId
          )
        );
        this.goodsDetail = res.goods;
        this.$tips.alert(res.result.message);
      }
    },
    poin_detil(indexs) {
      this.spanindexs = indexs;
      this.spanindexs = indexs;
      if (this.spanindexs == 0) {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        });
      } else if (this.spanindexs == 1) {
        wx.pageScrollTo({
          scrollTop: 578,
          duration: 300
        });
      } else if (this.spanindexs == 2) {
        wx.pageScrollTo({
          scrollTop: 621,
          duration: 300
        });
      }
    },
    poin_detil_2() {
      this.poinstyle = 1;
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    },
    poin_detil_1() {
      this.poinstyle = 2;
      wx.pageScrollTo({
        scrollTop: 578,
        duration: 300
      });
    },
    poin_detil_3() {
      this.poinstyle = 3;
      wx.pageScrollTo({
        scrollTop: 621,
        duration: 300
      });
    }
  },
  mounted() {
    this.iphone_xsp();
  },
  async onShow() {
    this.$store.commit("SET_IS_LOADING", false);
    this.$store.commit("SET_IS_LOADING", true);

    this.colorIsSelect = null;
    this.sizeIsSelect = null;
    this.colorId = null;
    this.sizeId = null;
    this.optionid = null;

    const [err, res] = await this._to(
      this.$http.getGoodsDetail(
        this.$route.query.id,
        this.$store.state.user.userInfo
          ? this.$store.state.user.userInfo.openId
          : null
      )
    );
    this.goodsDetail = res.goods;
    const [getGoodsRateErr, getGoodsRate] = await this._to(
      this.$http.getGoodsRate(this.$route.query.id, 1, 2)
    );
    this.getGoodsRateList = getGoodsRate.list.data;
    this.RateListLength = getGoodsRate.count.all;
    const [err1, res1] = await this._to(
      this.$http.get_picker(this.$route.query.id)
    );
    this.colorSize = res1.specs;

    this.goodsPick = res1.goods;
    this.$store.commit("SET_IS_LOADING", false);
    // 切换地址
    this.openid = this.$store.state.user.userInfo.openId;
    this.authkey = this.$store.state.user.userInfo.authkey;
    let getAdressList = await this.$http.getAdressList(
      this.openid,
      this.authkey
    );

    const isdefaultAdress = getAdressList.list.filter(i => {
      return i.isdefault == "1";
    });

    this.isdefaultAdress = isdefaultAdress[0];
  },

  onShareAppMessage(options) {
    return {
      title:
        (this.$store.state.user.userInfo
          ? this.$store.state.user.userInfo.nickName
          : "") + "给您分享天天逛街的商品...",
      path: this.$route.fullPath
    };
  }
};
</script>
<style  scoped lang='scss'>
.goodsDetail {
  position: relative;
  .coupon-picker .option-picker-inner {
    background: #f5f5f5;
    border-top: 1px solid #eee;
    box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.1);
  }
  .coupon-picker,
  .gift-picker {
    max-height: 880rpx;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    padding-bottom: 76rpx;
    z-index: 1001;
  }
  .coupon-picker .coupontitle,
  .gift-picker .gifttitle {
    color: #666;
    line-height: 100rpx;
    border-bottom: 1px solid #e5e5e5;
    padding-left: 20rpx;
    padding-right: 20rpx;
  }

  .readyToBuy {
    width: 100%;
    // height: 523px;
    background-color: #fff;
    padding: 17px 15px 16px;
    .close_mask {
      width: 100%;
      height: 18px;
      margin-bottom: 15px;
      display: flex;
      justify-content: flex-end;
      .mask {
        width: 18px;
        height: 18px;
        line-height: 18px;
        font-size: 18px;
        color: #b7b7b7;
      }
    }
    .rich_text {
      width: 100%;
      height: 130px;
      // background-color: pink;
      display: flex;
      .smallPic {
        width: 130px;
        height: 130px;
        border-radius: 3px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .rich_right {
        padding: 28px 0 0 16px;
        .price {
          font-size: 24px;
          letter-spacing: 1px;
          color: #ff455d;
          margin-bottom: 15px;
        }
        .status {
          // font-family: PingFang-SC-Regular;
          font-size: 14px;
          letter-spacing: 1px;
          color: #9a9a9a;
          margin-bottom: 8px;
        }
        .toChoose {
          font-size: 14px;
          letter-spacing: 1px;
          color: #323232;
        }
      }
    }
    .tips {
      margin-top: 20px;
      font-size: 16px;
      letter-spacing: 1px;
      color: #323232;
      .goodTip {
        font-size: 14px;
        margin-left: 11px;
        letter-spacing: 0px;
        color: #9a9a9a;
      }
    }
    .addr {
      height: 50px;
      // background-color: #ff6e81;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .address {
        flex: 1;
        display: flex;
        align-items: center;
        .mark {
          display: inline-block;
          width: 12.5px;
          height: 17px;
          margin-right: 12px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .details {
          margin-right: 5px;
        }
      }
      .right-arrow {
        width: 8px;
        height: 15px;
        background: url(#{$imgUrl}/icon_ret.png) no-repeat center/cover;
      }
    }
    .choose_size {
      // choose_size
      .count {
        width: 79px;
        height: 25px;
        line-height: 22px;
        border: 1px solid #b7b7b7;
        border-radius: 3px;
        display: flex;
        justify-content: space-between;
        .dec {
          border-right: 1px solid #b7b7b7;
          width: 22px;
          color: #b7b7b7;
        }
        .add {
          border-left: 1px solid #b7b7b7;
          color: #b7b7b7;
          width: 22px;
        }
      }
      .size {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        letter-spacing: 1px;
        color: #323232;
      }
      .sizes {
        display: flex;
        flex-wrap: wrap;
        line-height: 80rpx;
        font-size: 16px;
        .active {
          position: absolute;
          width: 17px;
          height: 15px;
          /* background: url(#{$imgUrl}/select.png) no-repeat center/cover;*/
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          z-index: 999;
        }
        > div {
          flex: 1;
          width: 100px;
          min-width: 100px;
          max-width: 100px;
          height: 30px;
          text-align: center;
          line-height: 28px;
          border-radius: 5px;
          border: solid 1px #0000;
          margin-bottom: 10px;
          margin-right: 20px;
          position: relative;
          // &:nth-of-type(3) {
          //   margin-right: 0;
          // }
        }
        .size_deit {
          width: 60px !important;
          min-width: 60px !important;
          max-width: 60px !important;
        }
        .size_1 {
          width: 60px;
          min-width: 60px;
          max-width: 60px;
        }
        .size_2 {
          width: 60px;
          min-width: 60px;
          max-width: 60px;
          border: solid 1px #e8e8e8;
          color: #323232;
          background: #e8e8e8;
          font-size: 13px;
        }
        .active_2 {
          border: solid 1px #ff455d;
          color: #ff455d;
          background: #ffe5e8;
        }
      }
    }
    .confirm_button {
      height: 90px;
      // background: #000;
      display: flex;
      align-items: center;
      // justify-items: center;
      > div {
        flex: 1;
        margin: 0 auto;
        height: 47px;
        line-height: 47px;
        text-align: center;
        background-color: #ff455d;
        border-radius: 5px;
        font-size: 18px;
        letter-spacing: 1px;
        color: #ffffff;
      }
    }
  }

  .details_info {
    width: 100%;
    padding: 0px 15px;
    .text_info {
      height: 14px;
      line-height: 14px;
      margin: 22px 0 18px 0;
      padding-left: 8px;
      border-left: 2px solid #ff455d;
      font-family: PingFang-SC;

      letter-spacing: 1px;
      color: #323232;
      font-size: 14px;
      font-weight: 700;
    }
    > img {
      width: 100%;
    }
    .toBuy {
      padding: 5px 20px 20px 20px;
      margin-bottom: 100px;
      font-family: PingFang-SC;
      font-size: 12px;
      line-height: 17px;
      letter-spacing: 1px;
      color: #323232;
    }
    .content_main {
    }
  }
  .pdl15 {
    padding-left: 15px;
    font-size: 12px;
    letter-spacing: 1px;
    color: #323232;
  }
  .mgt5 {
    color: #9a9a9a;
    margin-top: 5px;
  }
  .comment {
    width: 100%;
    height: 90px;
  }
  .discounts {
    width: 100%;
    height: 43px;
    line-height: 43px;
    background-color: #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 0 19px;
    .right-arrow {
      width: 8px;
      height: 15px;
      background: url(#{$imgUrl}/icon_ret.png) no-repeat center/cover;
    }
    .present {
      flex: 1;
      display: flex;
      align-items: center;
      .discount_msg {
        height: 43px;
        line-height: 43px;
        font-family: PingFang-SC;
        font-size: 14px;
        letter-spacing: 1px;
        color: #323232;
      }
      .text-right {
        flex: 1;
        padding-right: 15px;
        text-align: right;
        font-size: 14px;
        letter-spacing: 1px;
        color: #9a9a9a;
      }
      .gift {
        display: inline-block;
        width: 25px;
        height: 31px;
        margin-right: 12px;
        img {
          width: 25px;
          height: 25px;
        }
      }
      .gift_1 {
        img {
          width: 25px;
          height: 18px;
        }
      }
    }
  }
  .bgcfff {
    background-color: #fff;
    .judges {
      margin-left: 5px;
    }
    .check_all {
      font-family: PingFang-SC;
      font-size: 14px;
      letter-spacing: 1px;
      color: #ff455d;
    }
  }
  .shopping_mall {
    width: 100%;
    height: 68px;
    padding: 0 15px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .pull_left {
      flex: 1;
      display: flex;
      align-items: center;
      .gift {
        width: 30px;
        height: 30px;
        margin-right: 12px;
        img {
          width: 30px;
          height: 30px;
        }
      }
      .gift_2 {
        width: 40px;
        height: 40px;
        /*	box-shadow:8rpx 12rpx 12rpx rgba(50, 50, 50, 0.05);*/
        border: 0.5px solid #f0f0f0;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .portrait {
        width: 27px;
        height: 27px;
        img {
          width: 27px;
          height: 27px;
          border-radius: 50%;
        }
      }
      .details {
        .discount_msg {
          font-family: PingFang-SC;
          font-size: 14px;
          letter-spacing: 1px;
          color: #323232;
          margin-bottom: 6px;
        }
        .gray {
          font-family: PingFang-SC;
          font-size: 12px;
          letter-spacing: 1px;
          color: #9a9a9a;
        }
      }
    }
    .pull_right {
      width: 60px;
      height: 30px;
      border-radius: 4px;
      border: solid 1px #9a9a9a;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
      letter-spacing: 1px;
      color: #9a9a9a;
    }
  }
  .intro {
    width: 100%;
    padding: 0 15px;
    height: 46px;
    line-height: 60px;
    display: flex;
    .info {
      flex: 1;
      span {
        font-size: 16px;
        font-weight: 700;
        margin-right: 10px;
      }
    }
  }
  .all_goods {
    height: 106px;
    background: #f2f2f2;
    padding: 10px 0;
    width: 100%;
  }
  .goodsPrice {
    width: 100%;
    padding: 0 15px;
    height: 40px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;

    .onSale {
      .discount {
        width: 72px;
        height: 14px;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
        margin-right: 10px;
        color: #ff455d;
      }
      .original {
        color: #9a9a9a;
        font-size: 12px;
        text-decoration: line-through;
      }
    }
    .focus {
      background-color: #ff455d;
      border-radius: 12px;
      width: 50px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-family: PingFang-SC;
      font-size: 16px;
      letter-spacing: 1px;
      color: #ffffff;
    }
    .saled {
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #9a9a9a;
    }
  }
  .swiperContainer {
    width: 100%;
    position: relative;
    .find_list {
      position: fixed;
      z-index: 3;
      width: 100%;
      height: 48px;
      background: #fff;
      /*border:0.5px solid red;*/
      line-height: 48px;
      padding: 0 63px;
      margin-bottom: 1px;
      li {
        float: left;
        position: relative;
        width: 30px;
        line-height: 48px;
        height: 48px;
        /*border:0.5px solid #808080;*/
        margin-right: 45px;
        font-size: 14px;
        color: #323232;
        left: 0px;
        span {
          width: 30px;
          height: 3px;
          display: inline-block;
          border-radius: 3px;

          position: absolute;
          bottom: 0px;
          left: -1px;
        }
        .span_bgc {
          background: #ff455d;
        }
      }
      .share_to {
        position: absolute;
        top: 5px;
        right: 45px;
        /*width:17px;
  		height:16px;*/
        /*	background-color:rgba(154, 154, 154, 0.4);*/
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
        background: #fff;
        img {
          width: 17px;
          height: 16px;
          position: relative;
          top: 5rpx;
          left: -7.5rpx;
        }
      }
    }
    .swiper {
      width: 100%;
      height: 270px;
      margin-top: 45px;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .dots {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 15px;
      display: flex;
      justify-content: center;
      .dot {
        margin: 0 4px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transition: all 0.6s;
        border: 1.5px solid #fff;
        box-shadow: 3px;
        &.active {
          width: 10px;
          background: #fff;
        }
      }
    }
  }
  .fixedBoxWrap {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9;
    .fixedBox {
      display: flex;
      width: 100%;
      height: 49px;
      z-index: 9;
      background-color: #f0f0f0;
      > div {
        font-family: PingFang-SC;
        font-size: 16px;
        letter-spacing: 1px;
        color: #fff;
        height: 100%;
        line-height: 49px;
        text-align: center;
        flex: 1;
        &:nth-of-type(2) {
          background-color: #ff6e81;
        }
        &:last-of-type {
          background-color: #ff455d;
        }
      }
      > div.todos {
        display: flex;
        padding: 7px 0;
        > .three {
          flex: 1;
          height: 100%;
          .iconPic {
            width: 18px;
            height: 18px;
            margin: 0 auto;
            font-size: 18px;
            // background-color: #ff455d;
            background: url(#{$imgUrl}/icon_customer.png) no-repeat center/cover;
          }
          .star {
            background: url(#{$imgUrl}/icon_kindheart.png) no-repeat
              center/cover;
            width: 18.5px;
            height: 18px;
            background-size: cover;
          }
          .starActive {
            background: url(#{$imgUrl}/icon_kindheart_act.png) no-repeat
              center/cover;
          }
          .shopcar {
            background: url(#{$imgUrl}/icon_shopping.png) no-repeat center/cover;
            position: relative;
            .count {
              position: absolute;
              width: 15px;
              height: 15px;
              right: -10px;
              top: -6px;
              border-radius: 50%;
              background-color: #ff455d;
              color: #fff;
              text-align: center;
              line-height: 15px;
              font-size: 10px;
            }
          }
          .icon-icon-test {
            font-size: 18px;
          }
          .tiny_font {
            width: 100%;
            height: 12px;
            font-size: 12px;
            text-align: center;
            line-height: 20px;
            letter-spacing: 1px;
            color: #323232;
          }
        }
      }
    }
  }

  /*弹窗css*/
  .mainslist {
    width: 100%;
    .bgc_img {
      border: 0.5px solid red;
      display: inline-block;
      width: 16px;
      height: 16px;
    }
    button {
      background-color: #ff455d;
      color: #fff;
      font-size: 16px;
      line-height: 47px;
      height: 47px;
      text-align: center;
      margin-top: 15px;
      border-radius: 0;
    }
    .item_1 {
      /*	padding:15px;*/
      height: 72px;

      .item_left {
        width: 45px;
        height: 72px;
        float: left;
        span {
          display: block;
          width: 12px;
          height: 12px;
          border: 0.5px solid #ff455d;
          margin: 15px auto;
          -webkit-transform: rotateZ(45deg);
          -moz-transform: rotateZ(45deg);
          -o-transform: rotateZ(45deg);
          -ms-transform: rotateZ(45deg);
          transform: rotateZ(45deg);
        }
      }
      .item_right {
        h4 {
          line-height: 24px;
          padding: 6px 0;
        }
        p {
          line-height: 16px;
        }
      }
    }
  }
  /*弹窗*/
  .mainslist_2 {
    width: 100%;
    height: 400px;
    overflow-y: scroll;
    button {
      background-color: #ff455d;
      color: #fff;
      font-size: 14px;
      line-height: 36px;
      height: 36px;
      text-align: center;
      margin-top: 15px;
      border-radius: 0;
    }
    .item_2 {
      /*	padding:15px;*/
      height: 72px;

      .item2_left {
      }
      .item2_right {
      }
      .voucher_s {
        margin: 15px 0;
        padding: 0 15px;
        width: 100%;
        height: 133px;
        position: relative;
        border-radius: 5px;
        /*				border: solid 0.5px #e8e8e8;*/

        .text_a {
          font-size: 14px;
          color: #9a9a9a;
          display: inline-block;
        }
        .p_text {
          display: inline-block;
          position: absolute;
          height: 34px;
          top: 16.5px;
          left: 42px;
          width: 158px;

          p {
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            color: #ffffff;
          }
          .p_daily {
            font-size: 10px;
            color: #ffffff;
          }
        }

        .p_price {
          position: absolute;
          width: 89px;
          height: 49.5px;

          top: 8px;
          right: 25px;
          p {
            position: absolute;
            top: 11px;
            left: 1.5px;
            font-family: FZXKJW--GB1-0;
            font-size: 36px;
            font-weight: 500;
            color: #ffffff;
            margin-left: 10px;
          }
          i {
            font-size: 18px;
            color: #fff;
          }
        }
        .p_time {
          bottom: 12px;
          left: 27.5px;
          position: absolute;
          height: 32px;
          width: 170px;

          p {
            font-family: PingFang-SC-Regular;
            font-size: 10px;
            font-weight: normal;
            line-height: 18px;
            color: #9a9a9a;
          }
        }
        .voucher_text {
          padding-top: 28px;
          /*		padding-right:33px;*/
          position: absolute;
          height: 100px;
          /*width:255.5px;*/
          /*	border:0.5px solid red;*/
          top: -10px;
          left: 28px;

          .voucher_span {
            display: inline-block;
          }
          .v_text {
            /*border:0.5px solid #000;*/
            position: relative;
            bottom: 4px;
            margin-left: 42px;
            a {
              font-size: 16px;
              color: #323232;
              line-height: 32px;
            }
            .v_user {
              color: #9a9a9a;
            }
            .v_add {
              height: 21px;
              font-size: 12px;
              line-height: 21px;
              color: #9a9a9a;
              text-align: left;
            }
          }
          .v_price {
            font-family: HiraginoSansGB-W3;
            font-size: 15px;
            color: #fff;
            position: relative;
            bottom: 9px;
          }
          .v_money {
            font-family: FZXKJW--GB1-0;
            font-size: 30px;
            color: #fff;
            position: relative;
            bottom: 9px;
          }
        }
        .v_ptext {
          color: #7b7b7b;
          font-size: 10px;
          position: absolute;
          bottom: 16px;
          left: 137px;
        }

        img {
          width: 100%;
          height: 100%;
        }
        span {
          position: absolute;
          padding: 2px 6px;
          height: 21px;
          display: block;
          right: 25px;
          bottom: 10px;
          border-radius: 3px;
          text-align: center;

          font-size: 12px;
          color: #fff;
          background: #ff455d;
        }
        .span_no {
          border: 0.5px solid #ff455d;
          color: #fff;
        }
        .span_blue {
          border: solid 0.5px #3fd4ff;
          color: #3fd4ff;
        }
      }
    }
  }
}
</style>
