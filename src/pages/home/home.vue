<template>
  <div class="warper">

    <form @submit="formSubmit_collect" report-submit="true">

      <div :class="{'cuspos':showTop}" v-if="showTop">
        <div class="nearlyHeader lineBottom">
          <div class="nearlyTitle f16 bold color28">附近优惠</div>
          <div class="sortBy" @click="togglePopup">
            <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
            <span class="f14 color28 mr7">筛选</span>
            <div class="icon"></div>
          </div>
        </div>

        <div class="selectPop" v-if="showSelectCont" @click="closePop">
          <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
          <div class="nearlysearch">
            <div class="myToast">
              <div class="popcontent">
                <h3>热度 (人气)</h3>
                <ul class="t_main">
                  <li v-for="(item,index) in hot_list" :key="index" @click.stop="tabs(item.states,index,1)" :class="{'li_active':selelet_active1==index}">
                    {{item.text}}
                  </li>
                </ul>

                <h3>选择商圈</h3>
                <ul class="t_main">
                  <li v-for="(item,index) in custer_list" :key="index" @click.stop="tabs(item.id,index,2)" :class="{'li_active':selelet_active2==index}">
                    {{item.name}}
                  </li>
                </ul>

                <h3>人均价格（元）</h3>
                <ul class="t_main">
                  <li v-for="(item,index) in averprice_list" :key="index" @click.stop="tabs(item.states,index,3)" :class="{'li_active':selelet_active3==index}">
                    {{item.text}}
                  </li>
                </ul>
              </div>
              <div class="f_button">
                <button class="button-01" @click.stop="del($event)">清空设置</button>
                <button class="button-02" @click.stop="handleGetfindList(1,4)">查看{{shop_num}}个商家</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <isLoading :isLoading='isLoading'></isLoading> -->
      <tab_bar cur_index="0"></tab_bar>
      <wux-refresher id="wux-refresher" @pulling="onPulling" @refresh="onRefresh">
        <div class="container" @touchmove="handletouchmove($event)">
          <div v-if="posPopShow" class="fullPage2 pos_pop_wrap" style="z-index:9999;">
            <div class="cont">
              <div class="pos_pop">
                <img src="../../../static/images/img_adr.png">
                <div>无法获取地理位置，请允许地理位置授权</div>
                <button open-type="openSetting" class="smallbtn" @opensetting="opensetting">获取位置</button>
              </div>
            </div>
            <div class="footH"></div>
          </div>

          <!-- <button v-if="!isNoticeAuth" open-type="getUserInfo" 
    @getuserinfo="bindGetUserInfo" @click="getUserInfo11"
     class="userAuth">
    </button> -->

          <!-- <button v-if="!hasAuthInfo" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo11" style='width:100%;height:100%;position:absolute;opacity:0;z-index:9999999999;'>
    </button> 
    <div @click="$router.push({ path:'/pagesSub/sign/sign',query:{id:20,title:'皇庭广场'}})">去店铺</div>-->
          <div v-if="city" class="homeHeader  w100" @click="$router.push({ path: '/pages/home/GoCity'})">
            <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
            <div class="poin_address">
              <span class="adressIcon ml15 mr5"></span>
              <span v-if="city" class="f12 color28 mr7 city">{{isCurrent}}</span>
              <span class="f12 color28 mr10 city">{{city}}</span>
              <span v-if="city" class="f12 color28 mr5 city fontArrow"></span>
            </div>

            <div class="warther">
              <div class="weatherTemper">
                <div>{{weatherDesc}}</div>
                <div>{{temperature}}</div>
              </div>
              <img class="dayPic" :class="{'localIcon':localIcon}" :src="dayPictureUrl" alt="">
            </div>
            <span class="carIcon" v-if="false">
              <span class="carIconIn" @click="$store.state.user.loginStatus!=false?$router.push({ path:'/pages/user/myCar'}):$router.push({ path: '/pagesSub/login/loginIndex' })">
                <span v-if="getCarCount&&getCarCount>0&&userInfo" class="count">{{getCarCount>99 ?'+':getCarCount}}</span>
              </span>
            </span>
          </div>

          <div class="searchBoxWraper lineBottom">
            <div class="searchBox " @click='$router.push({path: "/pagesSub/searchshop/searchresult", query: { type: "home"} })'>
              <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
              <span class="searchIcon mr15"></span>
              <input type="text" class="search" disabled placeholder-class="placeholder" :placeholder="placeholder">

            </div>
          </div>
          <div class="recommendContainer">
            <div class="todayRecommend h50p ">
              <div class="recommendTitle f16 bold color28">今日推荐
                <div class="fr"> {{swiperCurrent+1}}/{{everyRecommendList.length}}</div>
              </div>
            </div>
            <div class="swiperContainer">
              <swiper :indicator-dots="indicatorDots" :current="swiperCurrent" :autoplay="autoplay" :interval="interval" :duration="duration" @change="swiperChange" class="swiper">
                <block v-for="(item,index) in everyRecommendList" :key="index">
                  <swiper-item @click="herfrecommend(item.type,item.linkid,item.id)">
                    <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                    <div class="banner">
                      <wux-image wux-class="image" shape="circle" :src="item.thumb">
                      </wux-image>
                    </div>
                    <div class="recommendContent h130 lineBottom">
                      <div class="contentTitle mt12 f13 color29">{{item.title}}</div>
                      <div class="mt8 color9a f12">{{item.description}}</div>
                    </div>
                  </swiper-item>
                </block>
              </swiper>
            </div>
          </div>

          <div class="week" v-if="weeklist&&weeklist.length>0">
            <div class="weekHeader h50p">
              <div class="weekTitle f16 bold color28">本周逛哪</div>
              <!-- <div class="weekTitleDetail mt11 f12 color9a">{{title}}</div> -->
            </div>
            <div class="weekContent lineBottom">
              <div class="item" v-for="(item,index) in weeklist " :key='index' @click="goWeekTo(item.type, item.linkid, item.title)">
                <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                <div class="bg">
                  <wux-image wux-class="image" shape="circle" :src="item.images">
                  </wux-image>
                </div>
                <!-- <div class="more">
            查看更多>>
          </div> -->
                <div class="itemDetail mt9 align over_hidden">
                  {{item.title}}
                </div>
              </div>
              <!-- <div class="item" @click="$router.push({ path:'/pagesSub/busineshop/shoplist',query: { id: cluster_id[1],title:titlelist[1]}})">
          <img class="bg" :src="imageslist[1]" alt="">
          <div class="more">
            查看更多>>
          </div>
          <div class="itemDetail mt9">
            {{titlelist[1]}}
          </div>
        </div> -->
            </div>
          </div>

          <div class="toSale" v-if="tadaySaleList&&tadaySaleList.length>0">
            <div class="toSaleHeader h50p ">
              <div class="toSaleTitle f16 bold color28">大牌促销</div>
              <div class="more" @click="$router.push('/pages/nearly/bigSale')">
                <!--<button formType="submit" hover-class="none" class='submit_kong_btn'></button>-->
                <i class="icon_ret2"></i>
                <i class="icon_ret2 icon_right"></i>
              </div>
            </div>
            <div class="saleContent lineBottom">
              <div class="item" v-for="(item,index) in tadaySaleList" :key="index" @click="$router.push({ path:'/pagesSub/busineshop/shop',query: { id: item.merchid }})">
                <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                <div class="picHeader">
                  <div class="bg">
                    <wux-image wux-class="image" shape="circle" :src="item.thumb"></wux-image>
                  </div>
                  <div class="sale f12">
                    {{item.title}}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="ChinaGoods" v-if="false">
            <div class="goodsHeader">
              <div class="goodsTitle f16 bold color28">
                国货当自强
                <div class="more fr">>></div>
              </div>
              <div class="weekTitleDetail mt11 f12 color9a">made in China厉害了我的国</div>
            </div>
            <div class="goodsContent lineBottom">
              <div class="goods" @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: 458}})">
                <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                <wux-image wux-class="image" shape="circle" src="https://sh.szwfy.com.cn/attachment/images/3/2018/09/hXx90zo5dg7SYK8qp15DXgRsXGZzWq.png">
                </wux-image>
              </div>
              <div class="goodsDetail">
                <div class="detailTitle f13 color28 mt8">超越维密指日可待！</div>
                <div class="mt8 f12 color9a">中国人自己的内衣品牌，支持国产，促进内需。</div>
              </div>
            </div>
          </div>

          <div id="selectStart" class="w100">
            <div class="w100" v-if="shownearlySale">
              <div class="h50p">
                <div class="nearlyHeader lineBottom" v-if="!showTop">
                  <div class="nearlyTitle f16 bold color28">附近优惠</div>
                  <div class="sortBy" @click="togglePopup">
                    <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                    <span class="f14 color28 mr7">筛选</span>
                    <div class="icon"></div>
                  </div>
                </div>
              </div>
              <div class="nearly">
                <div class="goodsContent fjyhgoodsContent">
                  <div class="w100" v-if="nearlySale&&nearlySale.length>0">
                    <div class="item lineBottom" v-for="(item,index) in nearlySale" :key="index" @click="$router.push({ path:'/pagesSub/busineshop/shop',query: { id: item.id }})">
                      <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                      <div class="left">
                        <wux-image wux-class="image" shape="circle" :src="item.logo">
                        </wux-image>
                      </div>
                      <div class="right mt10">
                        <div class="title f15 color28  over_hidden">
                          {{item.merchname}}
                        </div>
                        <div class="price colorf45d f14 mt12 over_hidden">
                          {{item.name}}
                        </div>
                        <div class="time mt12">
                          <span class="color9a f10 fl mt1">
                            截止时间：{{item.timeend}}
                          </span>
                          <span class="f12 color28 fr">{{item.jl}}KM</span>
                        </div>
                      </div>
                    </div>

                    <div class="mt10">
                      <zan-loadmore v-if="(hasFindSale=='click')?!findlistIsBottom:!isBottom" type="loading"></zan-loadmore>
                      <zan-loadmore v-if="(hasFindSale=='click')?findlistIsBottom:isBottom" type="text" text="暂无数据"></zan-loadmore>
                    </div>
                  </div>

                  <div v-if="nearlySale&&nearlySale.length<=0" class="empty">
                    <img src="../../../static/images/icon_none.png">
                    <div>暂无相关附近优惠</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </wux-refresher>
    </form>
  </div>
</template>

<script>
import {
  login,
  getUserInfo,
  getSetting,
  setStorage,
  getStorage,
  getLocation,
  getSystemInfoSync,
  NetworkStatusChange
} from "@/utils/wechat";
import tab_bar from "@/components/tab_bar";
import isLoading from "@/components/isLoading";
import { mapState, mapGetters, mapActions } from "vuex";
import bmap from "../../../static/lib/bmap-wx.min.js";

export default {
  data() {
    return {
      posPopShow: false,
      user_Info: {},
    
     
      placeholder: "搜索商铺商品",
      nearlySale: [],
      shownearlySale: false,
      everyRecommendList: "",
      tadaySaleList: "",
      searchshow: false,
      value: 2,
      indicatorDots: false,
      swiperCurrent: 0,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      showTop: false,
      showSelectCont: false,
      isClick: false,
      touchMove: false,
      weeklist: [],
      title: "",
      titlelist: "",
      imageslist: "",
      cluster_id: "",
      city: "",
      hot_list: [
        { text: "从高到底排序", states: "up" },
        { text: "从底到高排序", states: "down" }
      ],
      shopD_list: [
        { text: "折扣", states: "1" },
        { text: "满减", states: "2" }
      ],
      custer_list: [],
      averprice_list: [
        { text: "200以下", states: "0-200" },
        { text: "200-300", states: "200-300" },
        { text: "300-500", states: "300-500" },
        { text: "500-1000", states: "500-1000" },
        { text: "1000以上", states: "1000-" }
      ],
      selelet_active1: null,
      selelet_active2: null,
      selelet_active3: null,
      selectStartHeight: 0,
      shop_num: 0,
      str: {
        ids: "",
        type: "",
        lat: "",
        lng: "",
        hot: "",
        cluster_id: "",
        jiawei: ""
      },
      page: 1,
      prePage: 4,
      isBottom: false,
      findlistIsBottom: false,
      hasFindSale: "none",
      clusterInfo: null,
      isChangeCity: false,
      iPhoneshow: false,
      iphoneheight: "",
      isCurrent: "(附近)",
      weatherDesc: "",
      temperature: "",
      dayPictureUrl: "",
      localIcon: true
    };
  },
  components: {
    tab_bar,
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
  watch: {
    clusterInfo: {
      async handler(ne, old) {
        this.isBottom = false;
        this.clusterInfo = this.$store.state.user.clusterInfo;

        let data;
        if (!this.$store.state.user.locationInfo) {
          data = await this.getPosition();
          this.isCurrent = "(附近)";
        } else {
          data = {
            latitude: this.$store.state.user.locationInfo.latitude,
            longitude: this.$store.state.user.locationInfo.longitude
            // latitude: 22.54554187880014,
            // longitude: 114.11733552366445
          };
          if (this.$store.state.user.clusterInfo.isCurrent) {
            this.isCurrent = "(附近)";
          } else {
            this.isCurrent = "(当前)";
          }
        }
        this.initData(data); //获取定位
        this.hasFindSale = "none";
        this.selelet_active1 = null;
        this.selelet_active2 = null;
        this.selelet_active3 = null;
        this.value = 2;
        this.isBottom = false;
        this.findlistIsBottom = false;
        this.page = 1;
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(["getUserInfo", "getAllProducts"]),
    async hasauth() {
      if (this.$store.state.user.handleLoginOut == true) {
        return;
      }
      if (this.$store.state.user.loginStatus=='wap' ) {
          this.getUserInfo();
          this.getAllProducts();
        return;
      }
      const res = await getSetting();
      if(!res.authSetting["scope.userInfo"]) return
    
      
         console.log("用户已经授权过");
      
        this.$store.commit("SET_LOGIN_STATUS", "wx");

        await this.getAuthInfo();
      
    },
    async opensetting() {
      this.getPosition();
    },
    // async bindGetUserInfo({ mp }) {
    //   const { detail } = mp;
    //   if (detail.rawData) {
    //     const encryptedData = detail.encryptedData;
    //     const iv = detail.iv;
    //     this.user_Info = detail.userInfo;
    //     if (!this.$store.state.user.userInfo) {
    //       await this.getUserInfo();
    //       this.getAllProducts();
    //     }
    //     const userInfo = this.$store.state.user.userInfo;
    //     let authInfo = "";

    //     try {
    //       authInfo = await this.$http.doAuth(
    //         userInfo.openid,
    //         encryptedData,
    //         iv,
    //         userInfo.session_key,
    //         userInfo.authkey
    //       );
    //     } catch (error) {
    //       this.$tips.alert(error);
    //     }

    //     authInfo["openid"] = "sns_wa_" + authInfo.openId;
    //     authInfo.openId = "sns_wa_" + authInfo.openId;
    //     this.$store.commit("SET_USER_INFO", authInfo);
    //     this.$store.commit("SET_DO_AUTH", true);
    //     this.$store.commit("SET_LOGIN_STATUS", "wx");
    //     this.isNoticeAuth = true;

    //     if (authInfo) {
    //       const res = await this.$http.getPersonInfo(authInfo.openId);

    //       if (res.mobile) {
    //         if (mp.target.dataset.eventid == "5") {
    //           this.$router.push({ path: "/pages/user/myCar" });
    //         } else if (mp.target.dataset.eventid == "1") {
    //           this.$router.push({ path: "/pages/user/user", isTab: true });
    //         }
    //       } else {
    //         this.$router.push({ path: "/pagesSub/login/bindPhone" });
    //       }
    //     }
    //   } else {
    //     console.log("用户按了拒绝按钮");
    //     this.isNoticeAuth = true;
    //     return;
    //   }
    // },
    async getPosition() {
      var that = this;
      // 选定商圈位置获取附近优惠
      const res = await getSetting();
      if (!res.authSetting["scope.userLocation"]) {
        wx.authorize({
          scope: "scope.userLocation",
          success(res) {
            console.log(res.errMsg); //用户授权后执行方法
            that.posPopShow = false;

            if (that.$store.state.user.locationInfo) {
              return {
                latitude: that.$store.state.user.locationInfo.latitude,
                longitude: that.$store.state.user.locationInfo.longitude
              };
            } else {
              getLocation().then(data => {
                that.initData(data);
              });
            }
          },
          fail(err) {
            //用户拒绝授权后执行
            console.log(err); //用户授权后执行方法
            that.posPopShow = true;
          }
        });
      } else {
        let [err1, data] = await this._to(getLocation());

        //进入时自动弹出位置授权，如果未允许授权：弹出提示请允许授权，如果允许授权：请求数据
        if (err1) {
          this.posPopShow = true;
          return false;
        } else {
          this.posPopShow = false;

          return data;
        }
      }
    },
    async initData(data) {
      this.$store.commit("SET_LOCATION_INFO", data);
      // 根据定位获取返回的第一个商圈
      let BusinessList = {};
      let clusterInfoArr = ["", "", ""];

      if (this.$store.state.user.clusterInfo) {
        clusterInfoArr = [
          this.$store.state.user.clusterInfo.province,
          this.$store.state.user.clusterInfo.city,
          this.$store.state.user.clusterInfo.area
        ];
        this.city = `${this.$store.state.user.clusterInfo.area}•${
          this.$store.state.user.clusterInfo.name
        }`;
      } else {
        if (!this.$store.state.user.BusinessList) {
          BusinessList = await this.$http.getBusinessPosition(
            data.latitude,
            data.longitude
          );
          if (BusinessList.status == -1) {
            this.$tips.alert(" 经纬度解析错误，请联系管理员.");
          }
          //如果此地点没有商圈   提示此位置没有相应的商圈
          if (BusinessList.result.length > 0) {
            if (!this.$store.state.user.clusterInfo) {
              this.$store.commit("SET_CLUSTER_INFO", BusinessList.result[0]);
            }

            this.city = `${this.$store.state.user.clusterInfo.area}•${
              this.$store.state.user.clusterInfo.name
            }`;
          } else {
            this.$tips
              .confirm("当前位置没有相应的商圈，请切换商圈哦", "")
              .then(res => {
                if (res == "confirm") {
                  this.$router.push({ path: "/pages/home/GoCity" });
                }
              });

            this.city = "切换商圈";
          }
          this.$store.commit("SET_BUSINESS_LIST", BusinessList);
        } else {
          BusinessList = this.$store.state.user.BusinessList;
          this.city = `${this.$store.state.user.clusterInfo.area}•${
            this.$store.state.user.clusterInfo.name
          }`;
        }
      }

      if (!this.$store.state.user.ids) {
        let ids = "";
        BusinessList.result.map(e => {
          ids += e.id + ",";
        });
        this.$store.commit("SET_IDS", ids.slice(0, ids.length - 1));
      }

      this.$store.commit("SET_IS_LOADING", false);
      this.$store.commit("SET_IS_LOADING", true);

  
      let openid = this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.openId
        : "";
      const [
        everyRecommendList,
        getWeekList,
        tadaySaleList,
        nearlySale,
        marketCityList
      ] = await this._U
        .PromiseAll(
          this.$http.getEveryRecommend(),
          this.$http.getWeekList(...clusterInfoArr),
          this.$http.getDadayRecomdend(),
          this.$http.getNearlySale(
            openid,
            this.$store.state.user.ids,
            this.$store.state.user.clusterInfo.id,
            data.latitude,
            data.longitude,
            this.str.type,
            this.str.hot,
            this.str.cluster_id,
            this.str.jiawei
          ),
          this.$http.marketCityList(
            this.$store.state.user.locationInfo.latitude,
            this.$store.state.user.locationInfo.longitude,
            1,
            20,
            this.$store.state.user.clusterInfo
              ? this.$store.state.user.clusterInfo.city
              : ""
          )
        )
        .catch(function(e) {
          console.log(e);
        });

      this.$store.commit("SET_IS_LOADING", false);

      this.everyRecommendList = everyRecommendList.list;
      if (getWeekList.result instanceof Array) {
        this.weeklist = getWeekList.result.splice(0, 2);
      }

      this.tadaySaleList = tadaySaleList.list.data.splice(0, 8);
      this.shownearlySale = false;
      if (
        nearlySale.result.data instanceof Array &&
        nearlySale.result.data.length > 0
      ) {
        nearlySale.result.data.map(i => {
          i.jl = (i.jl / 1000).toFixed(1);
        });

        this.shownearlySale = true; //初始化时有数据   防止筛选后没有数据  附近优惠栏目消失的情况
      }
      this.nearlySale = nearlySale.result.data || [];
      let that = this;
      if (this.nearlySale.length > 0) {
        setTimeout(() => {
          var query = wx.createSelectorQuery();
          query
            .select("#selectStart")
            .boundingClientRect(res => {
              that.selectStartHeight = res.top;
            })
            .exec();
        }, 1000);
      }

      this.custer_list = marketCityList.result.data;
    },
    searchFocus() {
      this.placeholder = "";
      this.$router.push({
        path: "/pagesSub/searchshop/searchresult",
        query: { type: "home" }
      });
    },
    searchBlur() {
      this.placeholder = "搜索商铺商品";
    },
    // 	 筛选点击
    poinsearch(ev) {
      this.searchshow = !this.searchshow;
    },
    // 人均消费进度条
    onChange(event) {
      this.value = event.mp.detail;
      this.str.type = "1";
      this.findshoping();
    },
    tabs(id, index, which) {
      this.str.type = "1";
      switch (which) {
        case 1:
          this.selelet_active1 = index;
          this.str.hot = id;
          break;
        case 2:
          this.selelet_active2 = index;
          this.str.cluster_id = id;
          break;
        case 3:
          this.selelet_active3 = index;
          this.str.jiawei = id;
          break;
        default:
          break;
      }
      this.findshoping();
    },
    //  获取筛选的个数
    async findshoping() {
      let openid = this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.openId
        : "";
      let shopDistrictlist = await this._to(
        this.$http.getNearlySale(
          openid,
          this.$store.state.user.ids,
          this.$store.state.user.clusterInfo.id,
          this.$store.state.user.locationInfo.latitude,
          this.$store.state.user.locationInfo.longitude,
          this.str.type,
          this.str.hot,
          this.str.cluster_id,
          this.str.jiawei
        )
      );
      this.shop_num = shopDistrictlist[1].result.data;
    },
    // 点击查看商家
    async handleGetfindList() {
      this.hasFindSale = "click";
      this.page = 1;
      this.isBottom = false;
      this.findlistIsBottom = false;
      this.isClick = false;
      this.showSelectCont = false;
      this.str.type = "";

      const data = await this.findlist();
      this.nearlySale = data || [];
    },
    //		 获取筛选商品列表
    async findlist(page, prePage) {
      let openid = this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.openId
        : "";
      let shopDistrictlist = await this._to(
        this.$http.getNearlySale(
          openid,
          this.$store.state.user.ids,
          this.$store.state.user.clusterInfo.id,
          this.$store.state.user.locationInfo.latitude,
          this.$store.state.user.locationInfo.longitude,
          this.str.type,
          this.str.hot,
          this.str.cluster_id,
          this.str.jiawei,
          this.page,
          this.prePage
        )
      );
      if (
        !shopDistrictlist[1].result.data instanceof Array ||
        shopDistrictlist[1].result.data.length == 0
      ) {
        this.isBottom = true;
        this.findlistIsBottom = true;
      }
      return shopDistrictlist[1].result.data || [];
    },
    closePop() {
      this.showSelectCont = false;
      this.isClick = false;
    },
    del(e) {
      this.selelet_active1 = null;
      this.selelet_active2 = null;
      this.selelet_active3 = null;
      this.str.type = 1;
      this.str.hot = "";
      this.str.cluster_id = "";
      this.str.jiawei = "";

      this.findshoping();
    },
    isBuild() {
      this.$tips.alert("敬请期待...");
    },
    swiperChange: function(e) {
      this.swiperCurrent = e.mp.detail.current;
    },
    async getAuthInfo() {
      if (!this.$store.state.user.userInfo) {
        await this.getUserInfo();
        this.getAllProducts();
      }
      const userInfo = this.$store.state.user.userInfo;

      const [err, res] = await this._to(getUserInfo());
      if (err) return console.error(err);
      const { encryptedData, iv } = res;

      const [err1, authInfo] = await this._to(
        this.$http.doAuth(
          userInfo.openid,
          encryptedData,
          iv,
          userInfo.session_key,
          userInfo.authkey
        )
      );
      

      if (err1) return console.error(err1);
      authInfo.openId = "sns_wa_" + authInfo.openId;
      authInfo['openid'] = authInfo.openId;
     
      this.$store.commit("SET_USER_INFO", authInfo);
      this.$store.commit("SET_DO_AUTH", true);
      this.user_Info = authInfo;
    },
    //跳转四个页面
    herfrecommend(type, linkid, id) {
      if (type == 1) {
        this.$router.push({
          path: "/pagesSub/goodsDetail/index",
          query: { id: linkid }
        });
      } else if (type == 2) {
        this.$router.push({
          path: "/pagesSub/busineshop/shop",
          query: { id: linkid }
        });
      } else if (type == 3) {
        this.$router.push({
          path: "/pagesSub/recommend/recommendone",
          query: { id }
        });
      }
    },
    goWeekTo(type, linkid, title) {
      if (type == 1) {
        this.$router.push({
          path: "/pagesSub/busineshop/shoplist",
          query: { id: linkid, title }
        });
      } else if (type == 2) {
        this.$router.push({
          path: "/pagesSub/busineshop/shop",
          query: { id: linkid }
        });
      } else if (type == 3) {
        this.$router.push({
          path: "/pagesSub/recommend/recommendone",
          query: { id: linkid, type: "week" }
        });
      }
    },

    async onPulling() {},
    async onRefresh() {
      if (!this.isClick) {
        let data;
        if (!this.$store.state.user.locationInfo) {
          data = await this.getPosition();
        } else {
          data = {
            latitude: this.$store.state.user.locationInfo.latitude,
            longitude: this.$store.state.user.locationInfo.longitude
          };
        }

        await this.initData(data); //获取定位
        this.hasFindSale = "none";
        this.selelet_active = null;
        this.value = 2;
        this.isBottom = false;
        this.findlistIsBottom = false;
        this.page = 1;
        this.isClick = false;
        this.showTop = false;
      }
      this._U.stopRefresh();
    },
    async togglePopup() {
      //  	获取筛选的满减showSelectCont
      this.isClick = !this.isClick;
      if (this.isClick) {
        if (parseFloat(getStorage("scrollY")) < 890) {
          this.showTop = false;
          wx.pageScrollTo({
            scrollTop: 890,
            duration: 0
          });
          //不要设置duration>0
        } else {
          this.showTop = true;
          this.showSelectCont = this.isClick;
        }
      } else {
        if (parseFloat(getStorage("scrollY")) < 890) {
          this.showTop = false;
          this.showSelectCont = this.isClick;
        } else {
          this.showTop = true;
          this.showSelectCont = this.isClick;
        }
      }
    },
    handletouchmove(e) {
      this.touchMove = true;
    },
    formSubmit_collect({ mp }) {
      let formId = mp.detail.formId;
      if (formId == "" || formId == "undefined") {
        return;
      }
      let data = {
        formid: formId,
        timestamp: parseInt(new Date().getTime() / 1000) //计算7天后的过期时间时间戳
      };
      let formIds = this.$store.state.user.formIds.slice(0);
      formIds.push(data);

      this.$store.commit("SET_FORM_IDS", formIds);
    }
  },
  onPageScroll: function(e) {
    setStorage("scrollY", e.scrollTop);
    if (e.scrollTop >= 890) {
      this.showTop = true;
      if (this.isClick) {
        this.isClick = true;
        this.showSelectCont = true;
      }
    } else if (e.scrollTop < 890) {
      this.showTop = false;
      if (this.isClick) {
        this.isClick = false;
        this.showSelectCont = false;
      }
    }
  },
  async mounted() {
    wx.hideTabBar();
    await this.hasauth();
    this.isBottom = false;
    this.clusterInfo = this.$store.state.user.clusterInfo;

    let data;
    if (!this.$store.state.user.locationInfo) {
      data = await this.getPosition();
    } else {
      data = {
        latitude: this.$store.state.user.locationInfo.latitude,
        longitude: this.$store.state.user.locationInfo.longitude
      };
    }
    this.initData(data); //获取定位
    const systemInfo = getSystemInfoSync();
    this.$store.commit("SET_SYSTEM_INFO", systemInfo);
  },

  async onPullDownRefresh() {},
  async onReachBottom() {
    // 如果是筛选后的结果
    this.page = this.page + 1;

    if (this.hasFindSale == "click") {
      if (this.findlistIsBottom) return;

      this.$store.commit("SET_IS_LOADING", true);
      let nearlySale = await this.findlist();

      if (nearlySale instanceof Array && nearlySale.length > 0) {
        if (nearlySale.length < this.prePage) {
          this.findlistIsBottom = true;
        }
        nearlySale.map(i => {
          i.jl = (i.jl / 1000).toFixed(1);
        });
        this.nearlySale = [...this.nearlySale, ...nearlySale];
      }
    } else {
      if (this.isBottom) return;
      let openid = this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.openId
        : "";
      this.$store.commit("SET_IS_LOADING", true);
      if (this.shownearlySale) {
        let nearlySale = await this.$http.getNearlySale(
          openid,
          this.$store.state.user.ids,
          this.$store.state.user.clusterInfo.id,
          this.$store.state.user.locationInfo.latitude,
          this.$store.state.user.locationInfo.longitude,
          this.str.type,
          this.str.hot,
          this.str.cluster_id,
          this.str.jiawei,
          this.page,
          this.prePage
        );
        if (!nearlySale) {
          this.$store.commit("SET_IS_LOADING", false);
        }
        if (
          nearlySale.result.data instanceof Array &&
          nearlySale.result.data.length > 0
        ) {
          if (nearlySale.result.data.length < this.prePage) {
            this.isBottom = true;
          }

          nearlySale.result.data.map(i => {
            i.jl = (i.jl / 1000).toFixed(1);
          });
          this.nearlySale = [...this.nearlySale, ...nearlySale.result.data];
        }
      }
    }

    this.$store.commit("SET_IS_LOADING", false);
  },
  onShareAppMessage(options) {
    return {
      title:
        (this.$store.state.user.userInfo
          ? this.$store.state.user.userInfo.nickName
          : "") + "给您分享天天逛街...",
      path: "/pages/home/home"
    };
  },
  async onShow() {
    this.clusterInfo = this.$store.state.user.clusterInfo;
    let that = this;
    let BMap = new bmap.BMapWX({
      ak: "ysS8vI9GhnlKsNHLApHQGTI0buFzveNe"
    });
    BMap.weather({
      fail: err => console.log(err),
      success: data => {
        let date = new Date();

        let weatherData = data.originalData.results[0].weather_data[0];
        that.weatherDesc = weatherData.weather;
        if (6 < date.getHours() && date.getHours() < 18) {

        
        if (weatherData.weather.indexOf("雷") > -1) {
          this.dayPictureUrl = "/static/images/hail.png";
        } else if (weatherData.weather.indexOf("大雨") > -1) {
          this.dayPictureUrl = "/static/images/bigRain.png";
        } else if (weatherData.weather.indexOf("中雨") > -1) {
          this.dayPictureUrl = "/static/images/midRain.png";
        } else if (weatherData.weather.indexOf("阵雨") > -1) {
          this.dayPictureUrl = "/static/images/shower.png";
        } else if (weatherData.weather.indexOf("雨") > -1) {
          this.dayPictureUrl = "/static/images/rain.png";
        } else if (weatherData.weather.indexOf("大雪") > -1) {
          this.dayPictureUrl = "/static/images/bigSnow.png";
        } else if (weatherData.weather.indexOf("中雪") > -1) {
          this.dayPictureUrl = "/static/images/midSnow.png";
        } else if (weatherData.weather.indexOf("小雪") > -1) {
          this.dayPictureUrl = "/static/images/snow.png";
        } else if (weatherData.weather.indexOf("多云") > -1) {
          this.dayPictureUrl = "/static/images/clond.png";
        } else if (weatherData.weather.indexOf("阴天") > -1) {
          this.dayPictureUrl = "/static/images/cloudy.png";
        } else if (weatherData.weather.indexOf("雾") > -1) {
          this.dayPictureUrl = "/static/images/fog.png";
        } else if (weatherData.weather.indexOf("晴") > -1) {
          this.dayPictureUrl = "/static/images/sun.png";
        } else {
          this.localIcon = false;
          if (6 < date.getHours() && date.getHours() < 18) {
            that.dayPictureUrl = weatherData.dayPictureUrl;
          } else {
            
            that.dayPictureUrl = weatherData.nightPictureUrl;
          }
        }
        }else{
           
            if (weatherData.weather.indexOf("雨") > -1) {
              this.dayPictureUrl = "/static/images/nightRain.png";
            } else if (weatherData.weather.indexOf("雪") > -1) {
              this.dayPictureUrl = "/static/images/nightSnow.png";
            } else if (weatherData.weather.indexOf("多云") > -1) {
              this.dayPictureUrl = "/static/images/nightCloud.png";
            } else if (weatherData.weather.indexOf("晴") > -1) {
              this.dayPictureUrl = "/static/images/nightSun.png";
            }else{
              this.localIcon = false;
              that.dayPictureUrl = weatherData.nightPictureUrl;
            }
        }

        that.temperature = weatherData.date.split("：")[1].split(")")[0];
      }
    });
   
  }
};
</script>
<style scoped lang='scss'>
.nearlysearch {
  width: 100%;
  // max-height: calc(100vh - 50px);
  overflow-y: scroll;
  background: #ffffff;
  .myToast {
    border: 0;
    position: relative;
    width: 100%;
    background-color: #fff;
    text-align: center;
    // margin-top: 11.5px;
    .popcontent {
      max-height: 400px;
      overflow-y: scroll;
    }
    h3 {
      text-align: left;
      font-size: 14px;
      line-height: 40px;
      color: #9a9a9a;
      margin: 0 15px;
    }

    .t_main {
      overflow: hidden;
      margin: 0 5px 0 15px;

      li {
        float: left;
        height: 36px;
        line-height: 36px;
        min-width: 10px;
        padding: 0 10px;
        border-radius: 3px;
        background: #f2f2f2;
        text-align: center;
        margin-right: 10px;
        margin-bottom: 15px;
        color: #b7b7b7;
        font-size: 14px;
      }
      .li_active {
        background: #ffe5e8;
        color: #ff455d;
      }
    }

    .f_main {
      padding: 0 15px;
      text-align: left;
      overflow: hidden;
      position: relative;

      p {
        color: #9a9a9a;
        margin-top: 15px;
        margin-bottom: 62px;
        font-size: 14px;
      }

      .van-slider {
        height: 10px !important;
      }
      .k_price {
        position: absolute;
        top: 86rpx;
        left: 28rpx;
        color: #9a9a9a;
        font-size: 14px;
        /*background: url("#{$imgUrl}btn_sliding.png") no-repeat center center;*/
      }
    }

    .f_button {
      width: 100%;
      margin-top: 30px;

      button {
        border: 0;
        background: #fff;
        float: left;
        width: 50%;
        font-size: 16px;
        color: #fff;
        margin: 0 auto;
        border-radius: 0;
      }

      .button-01 {
        background: #ff7e8f;
      }

      .button-02 {
        background: #ff455d;
      }
    }
  }
}

.selectPop {
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
}
.cuspos {
  position: fixed !important;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100vh;
  min-height: 50px;
}
.nearlyHeader {
  padding: 0 15px;
  height: 50px;
  padding-top: 16.5px;
  position: relative;
  background: #fff;

  .nearlyTitle {
    height: 20px;
    border-left: 3px solid #ff455d;
    padding-left: 7px;
    line-height: 20px;
  }

  .sortBy {
    position: absolute;
    right: 15px;
    top: 15px;
    line-height: 20px;
    .icon {
      width: 15px;
      height: 17px;
      background: url(#{$imgUrl}icon_screen.png) no-repeat center/cover;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
.container {
  padding-bottom: 94px;
  width: 100%;
  position: relative;

  .homeHeader {
    padding: 12px 0;
    position: relative;
    .poin_address {
      display: inline-block;
      display: flex;
      align-items: center;
      height: 100%;
    }
    .city {
      line-height: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
    }
    .fontArrow {
      width: 10px;
      height: 14px;
      display: inline-block;
      // align-self: flex-end;
      background: url("#{$imgUrl}arrowFont.png") no-repeat center center;
      background-size: contain;
    }

    .adressIcon {
      width: 13.5px;
      height: 20px;
      display: inline-block;
      background: url("#{$imgUrl}icon_adr.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
    }

    .carIcon {
      position: absolute;
      right: 15px;
      top: 0;
      bottom: 0;
      margin: auto 0;
      width: 21px;
      height: 22px;
      background: url("#{$imgUrl}icon_shopping.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
      .carIconIn {
        position: absolute;
        display: inline-block;
        width: 21px;
        height: 22px;
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
    }
    .warther {
      display: flex;
      flex-direction: row;
      position: absolute;
      right: 15px;
      top: 12px;
      bottom: 0;
      .weatherTemper {
        margin-right: 4px;
        > div {
          font-size: 9px;
        }
      }
      .dayPic {
        width: 33.5px;
        height: 24px;
      }
      .localIcon {
        width: 24px;
        height: 24px;
      }
    }
  }
  .searchBoxWraper {
    width: 100%;
    padding: 0 15px 16px 15px;
    .searchBox {
      .placeholder {
        color: #b7b7b7;
        font-size: 10px;
        vertical-align: middle;
      }

      background: #f2f2f2;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      width: 100%;

      border-radius: 15px;
      padding-left: 12px;

      .searchIcon {
        display: inline-block;
        width: 13.5px;
        height: 14px;
        background: url("#{$imgUrl}search.png") no-repeat center center;
        background-size: cover;
        vertical-align: middle;
      }

      .search {
        display: inline-block;
        width: 170px;
        height: 20px;
        line-height: 20px;
        min-height: 20px;
        vertical-align: middle;
      }
    }
  }

  .recommendContainer {
    width: 100%;
    padding: 0 15px;
    .swiperContainer swiper {
      height: 260px;
    }
    .todayRecommend {
      padding-top: 21px;

      .recommendTitle {
        height: 20px;
        border-left: 3px solid #ff455d;
        padding-left: 7px;
        line-height: 20px;
        position: relative;
      }
    }

    .banner {
      display: block;
      width: 345px;
      height: 170px;
      border-radius: 5px;
    }

    .recommendContent {
      height: 65px;

      .contentTitle {
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .mt8 {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }

  .week {
    padding: 0 15px;
    width: 100%;

    .weekHeader {
      // height: 71px;
      padding-top: 16px;

      .weekTitle {
        height: 20px;
        border-left: 3px solid #ff455d;
        padding-left: 7px;
        line-height: 20px;
      }
    }

    .weekContent {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      height: 165px;

      .item {
        position: relative;
        display: block;
        margin-right: 5px;
        width: 170px;
        .bg {
          width: 170px;
          height: 120px;
          border-radius: 5px;
        }

        .more {
          position: absolute;
          top: 85px;
          width: 80px;
          height: 22px;
          border-radius: 3px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          text-align: center;
          font-size: 12px;
          line-height: 22px;
          margin: 0 auto;
          right: 0;
          left: 0;
        }
      }
    }
  }

  .toSale {
    position: relative;
    padding: 0 15px;
    width: 100%;

    .toSaleHeader {
      padding-top: 21px;

      .toSaleTitle {
        height: 20px;
        border-left: 3px solid #ff455d;
        padding-left: 7px;
        line-height: 20px;
      }

      .more {
        position: absolute;
        top: 0;
        right: 15px;
        .icon_right {
          right: 10px;
        }
      }
    }

    .saleContent {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      // justify-content: space-between;

      .item {
        width: 71px;
        margin-bottom: 20px;
        margin-right: 20.5px;
        position: relative;
        .picHeader {
          .bg {
            width: 70px;
            height: 70px;
            border-radius: 3px;
            border: 0.5px solid #e8e8e8;
            display: block;
            box-sizing: border-box;
          }

          .sale {
            height: 22px;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            /* background-color: #ff455d;*/
            // color: #ff455d;
            text-align: center;
          }
        }

        .goodsDetail {
          .goodsName {
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            text-align: center;
          }

          .price {
            .old {
              color: #9a9a9a;
              text-decoration: line-through;
              font-size: 12px;
            }
          }
        }
      }

      .item:nth-child(4n) {
        margin-right: 0;
      }
    }
  }

  .ChinaGoods {
    padding: 0 15px;
    width: 100%;

    .goodsHeader {
      height: 71px;
      padding-top: 16px;

      .goodsTitle {
        height: 20px;
        border-left: 3px solid #ff455d;
        padding-left: 7px;
        line-height: 20px;
      }
    }

    .goodsContent {
      height: 228px;

      .goods {
        width: 345px;
        height: 170px;
        display: block;
        border-radius: 3px;
      }
    }

    .oldBrand {
      height: 127px;
      padding: 17px 15px 0 104px;
      position: relative;

      .left {
        position: absolute;
        left: 0;
        width: 91px;
        height: 91px;
        border-radius: 5px;
        overflow: hidden;
        img {
          display: block;
          width: 91px;
          height: 91px;
          border-radius: 5px;
        }
      }
    }
  }

  .nearly {
    width: 100%;
    padding: 0 15px;
    position: relative;
  }

  .custom {
    position: fixed;
    background: #fff;
    top: 0;
    z-index: 10000;
  }

  .custompoin {
    position: fixed;
    background: #fff;
    top: 0;
    z-index: 10000;
  }

  .nearlyHeader {
    padding: 0 15px;
    height: 50px;
    padding-top: 16.5px;
    position: relative;
    background: #fff;

    .nearlyTitle {
      height: 20px;
      border-left: 3px solid #ff455d;
      padding-left: 7px;
      line-height: 20px;
    }

    .sortBy {
      position: absolute;
      right: 15px;
      top: 15px;

      .icon {
        width: 15px;
        height: 17px;
        background: url(#{$imgUrl}icon_screen.png) no-repeat center/cover;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .fjyhgoodsContent {
    //不要修改此处的高度  避免附近优惠筛选的商家为0时，再次点击筛选，因为屏幕要滚到wx.pageScrollTo({scrollTop: 890})，fjyhgoodsContent高度太小，页面高度不够，筛选框无法出来的问题
    min-height: calc(100vh - 50px - 50px);
  }

  .goodsContent {
    .item {
      position: relative;
      padding: 12px 0 12px 0;
      height: 115px;
      display: flex;
      .left {
        width: 90px;
        height: 90px;
      }
      img {
        width: 91px;
        height: 91px;
        display: block;
        position: absolute;
        left: 0;
      }

      .right {
        margin-left: 15px;
        width: 0%;
        -webkit-flex: 1;
        flex: 1;
      }
    }
  }

  .pos_pop_wrap {
    background: rgba(255, 255, 255, 0);
    display: -webkit-flex;
    display: flex;
    flex-direction: column;

    .cont {
      background: #ffffff;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .footH {
      height: 50px;
      width: 100%;
    }

    .pos_pop {
      margin: 1rem auto 0.2rem;
      text-align: center;
      width: 690rpx;

      img {
        width: 340rpx;
        height: 116rpx;
        display: block;
        margin: 0 auto;
      }

      div {
        text-align: center;
        margin-top: 78rpx;
        font-size: 28rpx;
      }

      button {
        margin: 60rpx auto 0;
      }
    }
  }
}
</style>
