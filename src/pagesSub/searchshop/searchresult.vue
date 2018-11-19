<template>
  <div class="container lineTop" @touchstart.prevent :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
    <div @click="isBuild" class="fansAuth"></div>
    <isLoading :isLoading='isLoading'></isLoading>
    <goAuth></goAuth>

    <div class="w100 s_box lineBottom">
      <!--渐变-->
      <div class="headerMains" :class="{'grad':showresult}">
        <div class="searchBox" :class="{'searchBox_bgc':!showresult}">
          <span class="searchIcon mr15"></span>
          <input type="text" class="search" placeholder-class="placeholder" @focus='searchFocus'  @confirm="searchs" confirm-type="search" :placeholder="placeholder_2" v-model="userword">
        </div>
        <!-- <div class="tabList" v-if="true"> -->
        <div class="tabList" v-if="showresult">
          <div class="navbar">
            <block v-for="(item,index) in tabs" :key="index">
              <div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick">
                <div class="navbar_title" :class="{'selective':activeIndex == index}">{{item.name}}</div>
              </div>
            </block>
            <div class="navbar_slider" :class="navbarSliderClass"></div>
          </div>
        </div>
      </div>
      <div class="result_page" v-if="showresult_2">
        <li @click="ListBySale()">
          全城
          <a class="ri_poins" :class="{'poin_top_show':showActivityright}">
          </a>
        </li>
        <li @click="ListByPrice()">
          分类
          <a class="ri_poins" :class="{'poin_top_show_2':showActivityleft}">

          </a>
        </li>
        <li @click="hotpoin">
          人气
          <!--<button class="show-btn" bindtap="showDialogBtn">弹窗</button>-->
          <span class="carIcon">

            <!--<view bindtap="clickArea">点击此处</view>　-->
          </span>
        </li>
      </div>

    </div>
    <!-- <div class="swperlist" v-if="true" :class="{'swperlistTop':showresult}"> -->
    <div class="swperlist" v-if="showresult" :class="{'swperlistTop':showresult}">

      <div id="swper1" v-if="activeIndex == 0">

        <div class="item" v-for="(item,index) in resultlist" :key="index" @click="$router.push({ path:'/pagesSub/busineshop/shop',query: { id: item.id}})">

          <div class="left">
            <wux-image wux-class="image" shape="circle" :src="item.logo">
            </wux-image>
          </div>
          <div class="right lineBottom">
            <div class="title f16 color32">

              <span class="f16 color32 over_hidden merchName">{{item.merchname}}</span>
              <span class="f11 color9a fr mt3">{{item.jl}}km</span>
            </div>

            <div class="time mb6 mt6" style="overflow: hidden;">
              <span class=" f13 ridio color9a">
                价位：
              </span>
              <span class="f13 color9a mr15">{{item.jiawei}}</span>
              <span class="f13 ridio color9a">
                热度：
              </span>
              <span class="f13 color9a">{{item.hot}}</span>
            </div>
            <div class="activityList">
              <li>{{item.clustername}}</li>
              <li>{{item.salecate}}</li>
            </div>
            <div class="activityList_2">
              <li v-for="(item2,index2) in item.actvityList" :key="index2">{{item2.title}}</li>

            </div>
          </div>
        </div>

        <div v-if="!resultlist||resultlist.length==0" class="empty_2">
          <img src="../../../static/images/icon_news2.png">
          <div>没有搜到你想要的o(∩_∩)o</div>
        </div>

      </div>
      <div id="swper2" v-if="activeIndex == 1">
        <div class="info_list" v-for="(item,index) in resultlist" :key='index'>
          <div class="bgc_img" @click="$router.push({ path:'/pagesSub/busineshop/shoplist',query: { id: item.id,title:item.name}})">
            <wux-image wux-class="image" :src="item.images">
            </wux-image>

            <p class="address z_top">
              <i>
                <img src="../../../static/images/icon_adree@2x.png" alt="" />
              </i>
              <span>{{item.jl}}km</span>
            </p>
            <div class="title_name">
              <h4>{{item.name}}</h4>
              <p>品牌共{{item.brandCount}}个&nbsp;|&nbsp;活动{{item.activityCount}}个</p>
            </div>
            <div class="bottom_img">

            </div>

          </div>
          <ul class="info_text">
            <li class="lineBottom infoLi1">
              <p class="f16 color32 lineRight over_hidden">{{item.addr}}</p>
              <span @click="dialTel(item.tel)">
                <i></i>
              </span>
            </li>
            <li class="infoLi2">
              <span>
                <i></i>
              </span>

              <p v-if="item.activityCount !==0">
                <swiper class="swiper_container" vertical="true" autoplay="true" circular="true" interval="2000">
                  <div v-for="(item3,index3) in item.activityList" :key="index3">
                    <div>
                      <swiper-item @touchmove.stop="catchtouchmove">
                        <div class="swiper_item">{{item3.title}}</div>
                      </swiper-item>
                    </div>
                  </div>
                </swiper>
              </p>
              <p v-else>
                当前商圈没有相关活动
              </p>

            </li>
          </ul>

        </div>
        <div v-if="resultlist.length=='0'" class="empty_2">
          <img src="../../../static/images/icon_news2.png">
          <div>没有搜到你想要的商场o(∩_∩)o</div>
        </div>

      </div>
      <div id="swper3" v-if="activeIndex == 2">
        <div class="item" v-for="(item,index) in resultlist" :key="index" @click="$router.push({ path:'/pagesSub/busineshop/shop',query: { id: item.id}})">

          <div class="left">
            <wux-image wux-class="image" shape="circle" :src="item.logo">
            </wux-image>
          </div>
          <div class="right lineBottom">
            <div class="title f16 color32">
              <span class="f16 color32 merchName over_hidden"> {{item.merchname}}</span>
              <span class="f11 color9a fr">{{item.jl}}km</span>
            </div>

            <div class="time mt10 mb10" style="overflow: hidden;">
              <span class=" f13 ridio color9a">
                价位：
              </span>
              <span class="f13 color9a mr15">{{item.jiawei}}</span>
              <span class="f13 ridio color9a">
                热度：
              </span>
              <span class="f13 color9a">{{item.hot}}</span>
            </div>
            <div class="activityList">
              <li>{{item.clustername}}</li>
              <li>{{item.salecate}}</li>
            </div>
            <div class="activityList_2">
              <li v-for="(item2,index2) in item.actvityList" :key="index2">{{item2.title}}</li>

            </div>
          </div>
        </div>
        <div v-if="!resultlist||resultlist.length==0" class="empty_2">
          <img src="../../../static/images/icon_news2.png">
          <div>没有搜到你想要的店铺o(∩_∩)o</div>
        </div>

      </div>
      <div id="swper4" v-if="activeIndex == 3">
        <div class="item" v-for="(item,index) in resultlist" :key='index' @click="$router.push({ path:'/pagesSub/busineshop/shop',query: { id: item.merchid }})">
          <div class="left">
            <wux-image wux-class="image" shape="circle" :src="item.thumb">
            </wux-image>
          </div>
          <div class="right">
            <div class="time f16 color32 over_hidden">
              {{item.title}}
            </div>
            <div class="time activey" v-if="item.activityList !='undefined'">
              <span class="f10 color9a over_hidden" v-for="(item2,index2) in item.activityList" :key="index2">{{item.title}}</span>

            </div>
            <div class="time mt12 mb3" style="overflow: hidden;">
              <span class="colorf45d f14 fl">￥
                <i class="f18 colorf45d" style="display: inline;">{{item.marketprice}}</i>
              </span>
              <span class="f12 fl color9a ml30 mt3">{{item.saleout}}人付款</span>
            </div>
            <div class="time activey2">

              <span class="colorb7 f12 fl mr12 over_hidden wt">{{item.merchname}}</span>
              <span class="color9a f12 fl">进店>></span>
              <span class="f11 fr color9a fr">{{item.jl}}KM</span>
            </div>
          </div>
        </div>
        <!-- <div class="item">
					<div class="left">
						<wux-image wux-class="image" shape="circle">
						</wux-image>
					</div>
					<div class="right">
						<div class="time f16 color32">
							初秋韩风时尚长袖 潮流女装
						</div>
						<div class="time activey">
							<span class="f10 color9a">满200减20，满500减60</span>
							
						</div>
						<div class="time mt12" style="overflow: hidden;">
							<span class="colorf45d f14 fl">￥<i class="f18 colorf45d" style="display: inline;">100</i></span>
							<span class="f12 fl color9a ml30 mt3">500人付款</span>
						</div>
						<div class="time activey2">
						
							<span class="colorb7 f12 fl mr12">卡宾官方旗舰店</span>
							<span class="color9a f12 fl">进店>></span>
							<span class="f11 fr color9a fr">1.1KM</span>
						</div>
					</div>
			</div> -->
        <div v-if="!resultlist||resultlist.length==0" class="empty_2">
          <img src="../../../static/images/icon_news2.png">
          <div>没有搜到你想要的商品o(∩_∩)o</div>
        </div>

      </div>
      <div class="mt10" v-if="showlodding">
        <zan-loadmore v-if="!isBottom" type="loading"></zan-loadmore>
        <zan-loadmore v-if="isBottom" type="text" :text="textdetil"></zan-loadmore>
      </div>
    </div>
    <!--先注释掉-->
    <!-- <div class="w100" v-if="false"> -->
    <div class="w100" v-if="showhitory">
      <div class="serch_like w100">
        <h3>热门搜索:</h3>

        <div class="s_buttons">
          <span v-for="(item2,index2) in wordlist" :key="index2" @click="herfresult(item2,index2)" :class="{'navactive':activeIndex2 == index}">{{item2.keyword}}</span>

        </div>
      </div>
      <div class="w100 search_history">
        <h3>搜索历史：</h3>
        <ul>
          <li v-for="(item,index) in searchList" :key="index" @click="herfresult_word(item,index)">{{item.key}}</li>

        </ul>
        <button @click="delhistory()">清除搜索历史</button>

      </div>
    </div>
    <van-popup :show="showActivityright" custom-class="top" @close="ListBySale" position="top">
      <div class="myToast" v-if="showActivityright">
        <div class="f_main">
          <p>选择商圈</p>
        </div>
        <ul class="t_main">
          <li v-for="(its,ins) in clusterList" :class="{'li_active':selelet_active==ins}" :key="ins" @click="cluserpoin(its.id,ins)">
            <span>{{its.name}}</span>
          </li>
        </ul>
      </div>

    </van-popup>
    <van-popup :show="showActivityleft" custom-class="top" @close="ListByPrice" position="top">
      <div class="myToast_2">
        <ul class="t_main">
          <li v-for="(its,ins) in ShopCategory" :class="{'li_active':selelet_active_2==ins}" :key="ins" @click="shopcagerpoin(its.id,ins)">
            <span>{{its.catename}}</span>
          </li>
        </ul>
      </div>
    </van-popup>

  </div>
</template>
<script>
import { login, getUserInfo, getSetting, setStorage } from "@/utils/wechat";
import { mapState, mapGetters, mapActions } from "vuex";
import tab_bar from "@/components/tab_bar";
import isLoading from "@/components/isLoading";

export default {
  data() {
    return {
      showActivityright: false,
      showActivityleft: false,
      placeholder_2: "搜你想要的~",
      //				历史记录页面
      showhitory: true,
      //				搜索结果页面
      showresult: false,
      showresult_2: true,
      searchList: "",
      wordlist: "",
      activeIndex2: "",
      userword: "",
      //				搜索结果列表
      resultlist: [],
      clusterList: [],
      //店铺商品分类
      ShopCategory: [],
      searchtype: {
        type0: "店铺",
        type1: "商品"
      },
      //				显示全城状态
      result_pageshow: true,
      //				显示商品列表
      showitem1: true,
      //				显示店铺列表
      showitem2: false,
      //点击每一个全城的类别样式
      selelet_active: null,
      selelet_active_2: null,
      select_li: false,
      min_price_1: "",
      max_price_2: "",
      minprice: "",
      maxprice: "",
      iPhoneshow: false,
      iphoneheight: "",
      tabs: [
        {
          name: "全部",
          type: "1",
          checked: true
        },
        {
          name: "商场",
          type: "2",
          checked: true
        },
        {
          name: "店铺",
          type: "3",
          checked: true
        },
        {
          name: "商品",
          type: "4",
          checked: true
        }
      ],
      activeIndex: 0,
      currentTab: 0,
      isBottom: false,
      page: 1,
      prePage: 10,
      sulttype: 3,
      cluserid: "",
      cateid: "",
      showlodding: false,
      textdetil: "更多店铺信息持续更新中...",
      hotstatus: false,
      hot: ""
    };
  },
  components: {
    isLoading
  },
  created() {
    this.hasauth();
  },
  methods: {
    ...mapActions(["getUserInfo", "getAllProducts"]),
    async hasauth() {
      const res = await getSetting();
      if (res.authSetting["scope.userInfo"]) {
        console.log("用户已经授权过");
        this.hasAuthInfo = true;
        this.isNoticeAuth = true;
      } else {
        console.log("用户还未授权过");
      }
    },
    iphone_xsp() {
      if (
        this.$store.state.user.systemInfo &&
        this.$store.state.user.systemInfo.model == "iPhone X"
      ) {
        this.iPhoneshow = true;
        this.iphoneheight =
          this.$store.state.user.systemInfo.windowHeight + 50 + "px";
      }
    },
    searchFocus() {
      this.placeholder_2 = "";
    },

    searchBlur() {
      this.placeholder_2 = "搜你想要的 ~";
    },

    but_sulit() {
      if (
        this.select_li == true &&
        (this.minprice == "" || this.maxprice == "")
      ) {
        this.pointlist(this.min_price_1, this.max_price_1);

        return;
      } else if (
        this.select_li == false &&
        (this.minprice == "" || this.maxprice == "")
      ) {
        this.$tips.toast(`请选择价格范围`, function() {}, "none", 800);
      } else if (
        this.select_li == false &&
        (this.minprice !== "" || this.maxprice !== "")
      ) {
        this.pointlist(this.minprice, this.maxprice);

        return;
      } else if (
        this.select_li == true &&
        (this.minprice !== "" || this.maxprice !== "")
      ) {
        this.pointlist(this.minprice, this.maxprice);
      }
    },

    async delhistory() {
      let data = await this._to(this.$tips.confirm("确定删除历史记录吗", ""));
      if (data[1] == "confirm") {
        let userInfo = this.$store.state.user.userInfo;
        this.$http.deleteSearchHistory(userInfo.openid);
        let searchList = await this._to(
          this.$http.searchHistory(this.$store.state.user.userInfo.openid)
        );
        this.searchList = searchList[1].list;
      } else {
        return;
      }
    },
    //			获取城市商圈
    async getMasterList(i) {
      const [err, res] = await this._to(
        this.$http.marketCityList(
          this.$store.state.user.locationInfo.latitude,
          this.$store.state.user.locationInfo.longitude,
          1,
          20,
          this.$store.state.user.clusterInfo.city
        )
      );
      this.clusterList = res.result.data;
    },
    // 获取商品分类
    async getShopCategory() {
      let Category = await this._to(this.$http.getShopCategory());
      this.ShopCategory = Category[1].result;
    },
    async sult(type) {
      // 搜索结果的页面
      let keywords = this.userword;
      let types = type;
      let clusterId = "";
      let cateid = "";
      if (this.$store.state.user.loginStatus == false) {
        let resultlist = await this._to(
          this.$http.goodsSearchList(
            keywords,
            "",
            types,
            clusterId,
            this.$store.state.user.locationInfo.latitude,
            this.$store.state.user.locationInfo.longitude,
            this.$store.state.user.clusterInfo.city,
            cateid,
            1,
            10,
            this.hot
          )
        );
        this.resultlist = resultlist[1].result.data;
      } else {
        let userInfo = this.$store.state.user.userInfo;
        let resultlist = await this._to(
          this.$http.goodsSearchList(
            keywords,
            userInfo.openid,
            types,
            clusterId,
            this.$store.state.user.locationInfo.latitude,
            this.$store.state.user.locationInfo.longitude,
            this.$store.state.user.clusterInfo.city,
            cateid,
            1,
            10,
            this.hot
          )
        );
        this.resultlist = resultlist[1].result.data;
      }

      if (this.resultlist.length > 0) {
        this.showlodding = true;
      }
      if (this.resultlist.length == 0) {
        this.showlodding = false;
      }
      if (this.resultlist.length < this.prePage) {
        this.isBottom = true;
      }

      this.$store.commit("SET_IS_LOADING", false);
    },
    async sult2(type, id) {
      // 搜索结果的页面

      let keywords = this.userword;
      let types = type;
      let clusterId = id;
      let cateid = "";
      let resultlist = "";
      if (this.$store.state.user.loginStatus == false) {
        resultlist = await this._to(
          this.$http.goodsSearchList(
            keywords,
            "",
            types,
            clusterId,
            this.$store.state.user.locationInfo.latitude,
            this.$store.state.user.locationInfo.longitude,
            this.$store.state.user.clusterInfo.city,
            cateid,
            1,
            10,
            this.hot
          )
        );
      } else {
        let userInfo = this.$store.state.user.userInfo;
        resultlist = await this._to(
          this.$http.goodsSearchList(
            keywords,
            userInfo.openid,
            types,
            clusterId,
            this.$store.state.user.locationInfo.latitude,
            this.$store.state.user.locationInfo.longitude,
            this.$store.state.user.clusterInfo.city,
            cateid,
            1,
            10,
            this.hot
          )
        );
      }
      this.resultlist = resultlist[1].result.data;
      if (this.resultlist.length > 0) {
        this.showlodding = true;
      }
      if (this.resultlist.length == 0) {
        this.showlodding = false;
      }
      if (this.resultlist.length < this.prePage) {
        this.isBottom = true;
      }

      this.$store.commit("SET_IS_LOADING", false);
    },
    async sult3(type, id) {
      // 搜索结果的页面
      let keywords = this.userword;
      let types = type;
      let clusterId = "";

      let cateid = id;
      let resultlist = "";
      if (this.$store.state.user.loginStatus == false) {
        resultlist = await this._to(
          this.$http.goodsSearchList(
            keywords,
            "",
            types,
            clusterId,
            this.$store.state.user.locationInfo.latitude,
            this.$store.state.user.locationInfo.longitude,
            this.$store.state.user.clusterInfo.city,
            cateid,
            1,
            10,
            this.hot
          )
        );
      } else {
        let userInfo = this.$store.state.user.userInfo;
        resultlist = await this._to(
          this.$http.goodsSearchList(
            keywords,
            userInfo.openid,
            types,
            clusterId,
            this.$store.state.user.locationInfo.latitude,
            this.$store.state.user.locationInfo.longitude,
            this.$store.state.user.clusterInfo.city,
            cateid,
            1,
            10,
            this.hot
          )
        );
      }

      this.resultlist = resultlist[1].result.data;
      if (this.resultlist.length > 0) {
        this.showlodding = true;
      }
      if (this.resultlist.length == 0) {
        this.showlodding = false;
      }
      if (this.resultlist.length < this.prePage) {
        this.isBottom = true;
      }
      this.$store.commit("SET_IS_LOADING", false);
    },
    async sult4() {
      // 搜索结果的页面
      let keywords = this.userword;
      let types = this.sulttype;
      let clusterId = this.cluserid;
      let cateid = this.cateid;
      let openid = "";
      let resultlist = "";
      let hot = "";
      this.hotstatus = !this.hotstatus;
      if (this.hotstatus == false) {
        hot = "up";
      } else {
        hot = "down";
      }

      if (this.$store.state.user.loginStatus == false) {
        openid = "";
      } else {
        openid = this.$store.state.user.userInfo.openid;
      }
      resultlist = await this._to(
        this.$http.goodsSearchList(
          keywords,
          openid,
          types,
          clusterId,
          this.$store.state.user.locationInfo.latitude,
          this.$store.state.user.locationInfo.longitude,
          this.$store.state.user.clusterInfo.city,
          cateid,
          1,
          10,
          hot
        )
      );

      this.resultlist = resultlist[1].result.data;
      if (this.resultlist.length > 0) {
        this.showlodding = true;
      }
      if (this.resultlist.length == 0) {
        this.showlodding = false;
      }
      if (this.resultlist.length < this.prePage) {
        this.isBottom = true;
      }
      this.$store.commit("SET_IS_LOADING", false);
    },
    herfresult(item2, index2) {
      this.$store.commit("SET_IS_LOADING", true);
      this.userword = item2.keyword;
      this.showhitory = false;
      this.showresult = true;
      this.showresult_2 = true;
      this.result_pageshow = true;
      this.activeIndex2 = index2;
      this.showheaderBgc();
      this.sult(3);
    },
    herfresult_word(item, index) {
      this.$store.commit("SET_IS_LOADING", true);
      this.userword = item.key;
      this.showhitory = false;
      this.showresult = true;
      this.showresult_2 = true;
      this.result_pageshow = true;
      this.activeIndex2 = index;
      this.showheaderBgc();
      this.sult(3);
    },
    async searchMains() {
      this.showActivityright = false;
      this.showActivityleft = false;
      if (this.$store.state.user.loginStatus == false) {
        this.showhitory = false;
        this.showresult = true;
        this.showresult_2 = true;

        this.result_pageshow = true;
        this.showheaderBgc();
        if (!this.userword == "") {
          this.$store.commit("SET_IS_LOADING", true);
          this.sult(3);
        }
      } else {
        this.$store.commit("SET_IS_LOADING", true);
        this.showhitory = true;
        this.showresult = false;
        this.showresult_2 = false;
        this.userword = this.$route.query.keyword
          ? this.$route.query.keyword
          : "";
        let userInfo = this.$store.state.user.userInfo;
        //			历史搜索数据
        let wordlist = await this._to(this.$http.hotWords(userInfo.openid));
        let searchList = await this._to(
          this.$http.searchHistory(userInfo.openid)
        );
        this.wordlist = wordlist[1].list;

        this.searchList = searchList[1].list;

        this.$store.commit("SET_IS_LOADING", false);
      }
    },

    searchs() {
      this.$store.commit("SET_IS_LOADING", true);
      this.showhitory = false;
      this.showresult = true;
      this.showresult_2 = true;
      this.result_pageshow = true;
      this.showheaderBgc();
      if (this.userword == "") {
        return false;
      } else {
        if (this.currentTab == 0) {
          this.sult(3);
        } else if (this.currentTab == 1) {
          this.showresult_2 = false;
          this.sult(1);
        } else if (this.currentTab == 2) {
          this.sult(3);
        } else if (this.currentTab == 3) {
          this.showresult_2 = false;
          this.sult(2);
        }
      }
    },
    async pointlist(min, max) {
      let userInfo = this.$store.state.user.userInfo;
      let authkey = this.$store.state.user.userInfo.authkey;
    },

    async ListBySale() {
      this.showActivityright = !this.showActivityright;
      this.showActivityleft = false;
      this.getMasterList();
    },
    async cluserpoin(cluser_id, ins) {
      this.$store.commit("SET_IS_LOADING", true);
      this.showActivityright = !this.showActivityright;
      this.showActivityleft = false;

      this.selelet_active = ins;
      this.cluserid = cluser_id;
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
      this.sult2(3, cluser_id);
    },

    async ListByPrice() {
      this.showActivityleft = !this.showActivityleft;
      this.showActivityright = false;
      this.getShopCategory();
    },
    async shopcagerpoin(cate_id, ins) {
      this.$store.commit("SET_IS_LOADING", true);
      this.cateid = cate_id;
      this.showActivityleft = !this.showActivityleft;
      this.showActivityright = false;
      this.selelet_active_2 = ins;
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
      this.sult3(3, cate_id);
    },
    async hotpoin() {
      this.$store.commit("SET_IS_LOADING", true);
      //    this.showActivityleft = false;
      //    this.showActivityright = false;
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
      this.sult4();
    },
    async hasauth() {
      const res = await getSetting();
      if (res.authSetting["scope.userInfo"]) {
        console.log("用户已经授权过");
        this.hasAuthInfo = true;
        const data = await getUserInfo();
        this.userInfo = data.userInfo;
      } else {
        console.log("用户还未授权过");
      }
    },
    isBuild() {
      this.$tips.alert("敬请期待...");
    },
    bindGetUserInfo(e) {
      if (e.mp.detail.rawData) {
        const data = e.mp.detail.rawData;
        this.userInfo = JSON.parse(data);
        setStorage("userInfo", data);
      } else {
        console.log("用户按了拒绝按钮");
        return;
      }
    },
    tabClick(e) {
      this.isBottom = false;
      this.showlodding = false;
      this.$store.commit("SET_IS_LOADING", true);
      this.activeIndex = e.currentTarget.id;
      this.currentTab = this.activeIndex;
      this.page = 1;
      this.prePage = 10;
      this.resultlist = "";
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
      if (this.currentTab == 0) {
        this.showresult_2 = true;
        this.sulttype = 3;
        this.textdetil = "更多店铺信息持续更新中...";

        this.sult(3);
      } else if (this.currentTab == 1) {
        this.showresult_2 = false;
        this.sulttype = 1;
        this.textdetil = "更多商场信息持续更新中...";
        this.sult(1);
      } else if (this.currentTab == 2) {
        this.showresult_2 = true;
        this.sulttype = 3;
        this.textdetil = "更多店铺信息持续更新中...";
        this.sult(3);
      } else if (this.currentTab == 3) {
        this.textdetil = "更多商品信息持续更新中...";
        this.showresult_2 = false;
        this.sulttype = 2;
        this.sult(2);
      }
    },
    dialTel(num) {
      if (num) {
        wx.makePhoneCall({
          phoneNumber: num
        });

        return false;
      } else {
        this.$tips.alert("该商场暂未添加联系方式");
        return false;
      }
    },
    showheaderBgc() {
      wx.setNavigationBarColor({
        frontColor: "#000000",
        backgroundColor: "#f2f2f2",
        animation: {
          duration: 400,
          timingFunc: "easeIn"
        }
      });
    },
    onAnimationfinish() {
      console.log("滑动完成.....");
    }
  },
  mounted() {
    // this.showhitory = true;
    // if(this.$route.query.type == 0) {
    // } else if(this.$route.query.type == 1) {
    // } else if(this.$route.query.type == "home") {
    // } else {
    // 	return;
    // }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return "navbar_slider_0";
      }
      if (this.activeIndex == 1) {
        return "navbar_slider_1";
      }
      if (this.activeIndex == 2) {
        return "navbar_slider_2";
      }
      if (this.activeIndex == 3) {
        return "navbar_slider_3";
      }
    },

    isLoading() {
      return this.$store.state.user.isLoading;
    }
  },
  async onReachBottom() {
    // 搜索结果的页面
    let keywords = this.userword;
    let types = this.sulttype;
    let clusterId = this.cluserid;
    let cateid = this.cateid;
    let openid = "";

    if (this.$store.state.user.loginStatus == false) {
      openid = "";
    } else {
      openid = this.$store.state.user.userInfo.openid;
    }

    if (this.isBottom) return;
    this.$store.commit("SET_IS_LOADING", true);
    let data = await this.$http.goodsSearchList(
      keywords,
      openid,
      types,
      clusterId,
      this.$store.state.user.locationInfo.latitude,
      this.$store.state.user.locationInfo.longitude,
      this.$store.state.user.clusterInfo.city,
      cateid,
      ++this.page,
      this.prePage,
      this.hot
    );

    if (data.result.data.length < this.prePage) {
      this.$store.commit("SET_IS_LOADING", false);
      this.isBottom = true;
    }

    this.resultlist = [...this.resultlist, ...data.result.data];
    this.$store.commit("SET_IS_LOADING", false);
  },
  async onShow() {
    this.$store.commit("SET_IS_LOADING", true);
    this.$store.commit("SET_IS_LOADING", false);
    this.currentTab = 0
    this.activeIndex = 0
    this.iphone_xsp();
    if (this.$route.query.type == "home" || "nearly") {
      this.searchMains();
    }
  }
};
</script>
<style scoped lang='scss'>
.van-popup {
  overflow-y: none !important;
}

.container {
  // background-color: #f2f2f2;
  background-color: #fff;
  /*padding-bottom: 50px;*/
  .s_box {
    background: #fff;
    /*	padding: 15px;*/
    z-index: 1000000;
    position: relative;
    position: fixed;
    .headerMains {
      background: #fff;
      padding: 15px 15px 15px 15px;
      .content {
        .likeAll {
        }
      }
    }
    .grad {
      /*background: linear-gradient(#f2f2f2, #fff4f5);*/
      background: #f2f2f2;
    }
  }
  .van-popup--top {
    top: 108px;
    height: 294px !important;
  }
  .van-popup__overlay {
    top: -1px;
  }
  .myToast {
    border: 0;
    z-index: 1000;
    position: absolute;
    width: 100%;
    padding: 0 15px;
    background-color: #fff;
    text-align: center;
    top: 86px;

    margin-top: 12px;
    .t_main {
      overflow: hidden;
      width: 100%;
      li {
        padding: 0 10px;
        margin-right: 12px;
        margin-bottom: 16px;
        float: left;
        height: 35px;
        border-radius: 3px;
        border: solid 0.5px #f2f2f2;
        background-color: #f2f2f2;
        text-align: center;
        line-height: 35px;
        span {
          display: inline-block;
          color: #b7b7b7;
          font-size: 14px;
          text-decoration: none;
        }
      }
      .li_active {
        // border: 0.5px solid #ff455d;
        background: #ffe5e8;
        color: #ff455d;
        span {
          color: #ff455d;
        }
      }
    }
    .f_main {
      text-align: left;
      overflow: hidden;
      p {
        color: #9a9a9a;
        margin: 15px 0;
        font-size: 12px;
      }
      /*.s_input {
					width: 70px;
					height: 27px;
					border-radius: 3px;
					border: solid 0.5px #b7b7b7;
					float: left;
					input {
						font-size: 12px;
						padding: 0 15px;
					}
				}
				.lines {
					width: 30px;
					line-height: 30px;
					float: left;
					text-align: center;
					margin: 0 3px;
				}*/
    }
    /*.f_button {
				height: 45px;
				line-height: 45px;
				width: 100%;
				margin-top: 30px;
				button {
					border: 0;
					background: #fff;
					font-size: 16px;
					color: #b7b7b7;
					margin: 0 auto;
				}
			}*/
  }
  .myToast_2 {
    border: 0;
    z-index: 1000;
    position: absolute;
    width: 100%;
    height: 208px;
    padding: 0 15px;
    background-color: #fff;
    text-align: center;
    top: 82px;

    margin-top: 15px;
    .t_main {
      overflow: hidden;
      width: 100%;
      li {
        /*padding:13px 11px;*/
        /*margin-right: 16px;
					margin-bottom:16px;*/
        float: left;
        /*height: 30px;*/
        width: 33.33%;
        border-radius: 3px;
        /*border: solid 0.5px #f2f2f2;*/
        /*background-color: #f2f2f2;*/
        text-align: center;
        line-height: 40px;
        span {
          display: inline-block;
          color: #000000;
          font-size: 14px;
          position: relative;
          left: -4px;
        }
      }
      .li_active {
        color: #ff455d;
        span {
          color: #ff455d;
        }
      }
    }
  }
  .result_page {
    height: 36px;
    /*position: fixed;
			top: 59px;*/
    padding: 0 15px;
    padding-top: 3px;

    li {
      font-family: PingFang-SC-Regula;
      letter-spacing: 1px;
      float: left;
      width: 33.33%;
      text-align: center;
      line-height: 30px;
      padding-right: 10px;
      font-size: 14px;
      color: #323232;
      .ri_poins {
        display: inline-block;
        position: relative;
        top: 4px;
        width: 18px;
        height: 18px;
        left: -4px;

        background: url("#{$imgUrl}icon_arrow_down.png") no-repeat 100% 100%;
        background-size: cover;

        .poin_bottom_1 {
          margin-top: 3px;
          display: block;
          width: 0;
          height: 0;
          border: 5.5px solid #e8e8e8;
          border-color: #e8e8e8 transparent transparent transparent;
        }
      }
      .poin_top_show {
        transform: rotate(180deg);
      }
      .poin_top_show_2 {
        transform: rotate(180deg);
      }
    }
    .carIcon {
      position: relative;
      display: inline-block;
      width: 12px;
      height: 14px;
      margin-bottom: 3.5px;
      background: url("#{$imgUrl}icon_pep.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
    }
  }
  .swperlist {
    position: relative;
    top: 128px;
    height: 100%;
    width: 100%;

    #swper1,
    #swper3 {
      z-index: 2;
      .item {
        position: relative;
        padding: 12px 15px 0px 15px;
        background: #fff;

        display: flex;
        .z_price {
          display: inline-block;
          position: absolute;
          z-index: 1;
          left: 0px;
          width: 40px;
          height: 20px;
          line-height: 20px;
          background-color: #ff455d;
          border-radius: 0px 4px 4px 4px;
          text-align: center;
          font-size: 12px;
          color: #ffffff;
          overflow: hidden;
          top: 0px;
        }
        .left {
          width: 65px;
          height: 65px;
          background-color: #ffffff;
          box-shadow: 0px 2px 2px 0px rgba(50, 50, 50, 0.04);
          border-radius: 3px;
          border: solid 1px #eeeeee;
          z-index: 2 !important;
        }
        img {
          width: 118px;
          height: 109px;
          display: block;
          position: absolute;
          left: 0;
        }
        .right {
          margin-left: 15px;
          width: 0%;
          -webkit-flex: 1;
          padding-bottom: 12px;
          flex: 1;
          .ridio {
            height: 20px;
            position: relative;
            i {
              float: left;
              width: 16px;
              height: 16px;
              img {
                width: 16px;
                height: 16px;
                position: relative !important;
                display: inline-block;
              }
            }
          }
          .title .merchName {
            display: inline-block;
            width: 210px;
          }
          .activityList {
            li {
              display: inline-block;
              text-align: center;
              background-color: #fff;
              height: 17px;
              font-size: 11px;
              line-height: 16.5px;
              padding: 0 7px;
              border-radius: 2px;
              border: solid 1px #ffb7c0;
              color: #ff455d;
              margin: 0px 7px 5px 0px;
            }
          }
          .activityList_2 {
            li {
              display: inline-block;
              text-align: center;
              background-color: #ffcdd3;
              height: 17px;
              font-size: 11px;
              line-height: 16px;
              padding: 0 7px;
              border-radius: 2px;
              /*border: solid 1px #ffb7c0;*/
              color: #ff455d;
              margin: 0px 7px 5px 0px;
            }
          }
        }
      }
    }
    #swper2 {
      position: relative;
      top: -40px;
      .info_list {
        border-radius: 5px;
        width: 100%;
        overflow: hidden;
        padding: 0 15px;
        padding-top: 15px;

        position: relative;
        /*.moderly {
						text-align: center;
						padding: 13px 0;
						position: absolute;
						left: 0;
					
						right: 0;
						bottom: 0;
						margin: auto;
						height: 170px;
						background: rgba(0, 0, 0, 1);
						opacity: 0.2;
						border-radius: 5px;
						width: 92%;
						width: 134px;
						height: 55px;
					}*/
        .bgc_img {
          width: 100%;
          overflow: hidden;
          position: relative;
          border-radius: 5px;
          height: 175px;
          /*background:#ff4500;*/
          /*border:0.5px solid #ccc;*/
          img {
            width: 100%;
            height: 100%;
          }
          .z_top {
            z-index: 97;
          }
          .like {
            width: 47px;
            height: 23px;
            background-color: #ff455d;
            border-radius: 5px;
            position: absolute;
            top: 11px;
            right: 11px;
            text-align: center;
            line-height: 23px;
            font-size: 12px;
            color: #fff;
          }
          .address {
            width: 73px;
            /*height:40px;*/
            position: absolute;
            bottom: 34px;
            right: 11px;

            i {
              display: inline-block;
              width: 17px;
              text-align: center;
              height: 21px;
              // overflow: hidden;
              position: relative;
              // left: 20px;
              top: 0px;
              img {
                width: 50%;
                height: 11px;
              }
            }
            span {
              color: #ffffff;
              // position: relative;
              font-size: 12px;
              // right: 0px;
            }
          }
          .title_name {
            background-color: #000000;
            opacity: 0.6;
            z-index: 10;
            position: absolute;
            top: 52px;
            left: 0;
            right: 0;

            margin: auto;
            width: 152px;
            text-align: center;
            height: 60px;
            padding: 14px 0;
            h4 {
              color: #fff;
              font-weight: 700;
              font-size: 14px;
              text-align: center;
            }
            p {
              color: #f0f0f0;
              font-size: 12px;
              text-align: center;
            }
          }
          .bottom_img {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background: url("#{$imgUrl}img_template.png") no-repeat center
              center;
            background-size: cover;
          }
          .islikeIco {
            position: absolute;
            right: 28px;
            top: 16px;
            z-index: 1000;
            width: 30px;
            text-align: center;
            height: 28px;

            .icos {
              display: block;
              margin: 0 auto;
              width: 14px;
              height: 14px;
              background: url("#{$imgUrl}icon_kindheart_act_2.png") no-repeat
                center center;
              background-size: cover;
            }
          }
        }
        .info_text {
          width: 325px;
          height: 76px;
          background: #fff;
          position: relative;
          top: -30px;
          margin: 0 auto;
          box-shadow: 0px 2px 3px 0px rgba(50, 50, 50, 0.1);
          border-radius: 3px;

          li {
            height: 38px;
          }
          .infoLi1 {
            display: flex;
            p {
              width: 277px;
              height: 38px;
              line-height: 38px;
              padding-left: 11px;
              font-weight: 500;
            }
            span {
              display: inline-block;
              width: 48px;
              height: 38px;
              line-height: 38px;
              text-align: center;
              padding-top: 4px;
              i {
                display: inline-block;
                width: 16px;
                height: 16px;
                background: url("#{$imgUrl}icon_iphone.png") no-repeat center
                  center;
                background-size: cover;
              }
            }
          }
          .infoLi2 {
            display: flex;
            p {
              height: 38px;
              line-height: 38px;
              padding-left: 11px;
              width: 280px;
            }
            span {
              display: inline-block;
              width: 30px;
              height: 38px;
              line-height: 38px;
              text-align: center;
              padding-left: 10px;
              padding-top: 4px;

              i {
                display: inline-block;
                width: 17px;
                height: 16px;
                background: url("#{$imgUrl}icon_huod.png") no-repeat center
                  center;
                background-size: cover;
              }
            }
            .swiper_container {
              height: 40px;
              width: 100%;
            }

            .swiper_item {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }

    #swper4 {
      padding: 0 15px;
      background: #ffff;
      padding-top: 15px;
      position: relative;
      top: -40px;

      .item {
        position: relative;
        margin-bottom: 8px;
        height: 100px;
        background: #fff;
        display: flex;
        .z_price {
          display: inline-block;
          position: absolute;
          z-index: 1;
          left: 0px;
          width: 40px;
          height: 20px;
          line-height: 20px;
          background-color: #ff455d;
          border-radius: 0px 4px 4px 4px;
          text-align: center;
          font-size: 12px;
          color: #ffffff;
          overflow: hidden;
          top: 0px;
        }
        .left {
          width: 100px;
          height: 100px;
          border-radius: 3px;
        }
        img {
          width: 118px;
          height: 109px;
          display: block;
          position: absolute;
          left: 0;
        }
        .right {
          margin-left: 15px;
          width: 0%;
          -webkit-flex: 1;
          flex: 1;
          .activey {
            height: 17px;
            width: 100%;

            margin-top: 3px;
            display: block;
            span {
              width: 100px;
              display: inline-block;
              background-color: #f2f2f2;
              height: 17px;
              border-radius: 2px;
              line-height: 17px;
              padding: 0 6px;
              margin-right: 6px;
            }
          }
          .activey2 {
            height: 17px;
            width: 100%;
            line-height: 17px;

            .wt {
              display: inline-block;
              width: 120px;
            }
          }
          .ridio {
            margin-right: 4px;
            width: 86px;
            height: 20px;
            position: relative;
            i {
              float: left;
              width: 16px;
              height: 16px;
              img {
                width: 16px;
                height: 16px;
                position: relative !important;
                display: inline-block;
              }
            }
          }
          .goshop {
            display: inline-block;
            width: 54px;
            height: 18px;
            background-color: #ff455d;
            border-radius: 3px;
            line-height: 17px;
            text-align: center;
            color: #fff;
          }
        }
      }
    }
  }
  .swperlistTop {
    top: 148px;
  }

  .nearly {
    width: 100%;
    padding: 0 15px;
    background: #fff;
    margin-top: 76px;
    .nearlyHeader {
      height: 50px;
      padding-top: 16.5px;
      position: relative;
      .nearlyTitle {
        height: 20px;
        border-left: 2px solid #ff455d;
        padding-left: 7px;
        line-height: 20px;
      }
      .sortBy {
        position: absolute;
        right: 0;
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
    .goodsContent {
      .item {
        position: relative;
        padding: 12px 0 12px 0;
        height: 130px;
        display: flex;
        .z_price {
          display: inline-block;
          position: absolute;
          z-index: 1;
          left: 0px;
          width: 40px;
          height: 20px;
          line-height: 20px;
          background-color: #ff455d;
          border-radius: 0px 4px 4px 4px;
          text-align: center;
          font-size: 12px;
          color: #ffffff;
          overflow: hidden;
          top: 0px;
        }
        .left {
          width: 118px;
          height: 118px;
        }
        img {
          width: 118px;
          height: 109px;
          display: block;
          position: absolute;
          left: 0;
        }
        .right {
          margin-left: 15px;
          width: 0%;
          -webkit-flex: 1;
          flex: 1;
          .ridio {
            margin-right: 4px;
            width: 86px;
            height: 20px;
            position: relative;
            i {
              float: left;
              width: 16px;
              height: 16px;
              img {
                width: 16px;
                height: 16px;
                position: relative !important;
                display: inline-block;
              }
            }
          }
          .goshop {
            display: inline-block;
            width: 54px;
            height: 18px;
            background-color: #ff455d;
            border-radius: 3px;
            line-height: 17px;
            text-align: center;
            color: #fff;
          }
        }
      }
    }
  }
  .serch_like {
    background: #fff;
    padding: 15px;
    margin-top: 66px;
    h3 {
      height: 30px;
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      line-height: 30px;
      letter-spacing: 0rem;
      color: #323232;
    }
    .s_buttons {
      span {
        padding: 0 15.5px;
        margin-right: 14px;
        margin-top: 5px;
        margin-bottom: 10px;
        display: inline-block;
        height: 26px;
        line-height: 26px;
        border-radius: 5px;
        border: solid 0.5px rgba(183, 183, 183, 1);
        font-size: 14px;
        text-align: center;
      }
      .navactive {
      }
    }
  }
  .search_history {
    background: #fff;
    padding: 15px;
    margin-top: 10px;
    padding-bottom: 36%;
    h3 {
      height: 30px;
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      font-weight: normal;
      line-height: 30px;
      letter-spacing: 0px;
      color: #323232;
    }
    ul > li {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #9a9a9a;
      border-bottom: 0.5px solid rgba(232, 232, 232, 0.9);
    }
    button {
      width: 140px;
      height: 40px;
      border-radius: 20px;
      border: solid 0.5px #e8e8e8;
      margin: 32px auto;
      background: #fff;
      color: #9a9a9a;
      font-size: 16px;
    }
  }
  .searchBox {
    background: #fff;
    display: inline-block;
    height: 35px;
    line-height: 35px;

    width: 100%;
    border-right: 0;
    padding-left: 14px;
    position: relative;
    border-radius: 30px;
    .searchIcon {
      display: inline-block;
      width: 13.5px;
      height: 14px;
      background: url("#{$imgUrl}search.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
    }
    .searchIcon_2 {
      display: inline-block;
      width: 1px;
      height: 15px;
      vertical-align: middle;
      background: #9a9a9a;
    }
    .search {
      display: inline-block;
      width: 238px;
      height: 15px !important;
      color: #323232;
      vertical-align: middle;
    }
  }
  .searchBox_bgc {
    background: #e8e8e8;
  }
  .tabList {
    height: 48px;
    /*border:0.5px solid red;*/
    .navbar {
      border-radius: 3px 3px 0 0;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      position: relative;
      top: 0;
      height: 40px;
      width: 100%;
      /*background-color: #fff;*/
      /*  border-top: 1px solid #e8e8e8;*/
      border-bottom: 1px solid #cc000003;

      /*	box-shadow: 0px 4px 7.4px 0.6px rgba(0, 0, 0, 0.1) !important;*/
      .navbar_item {
        position: relative;
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        padding: 10px 0;
        padding-top: 14px;
        text-align: center;
        font-size: 0;

        .navbar_title {
          color: #000;
          font-weight: 500;
          display: inline-block;
          font-size: 16px;
          max-width: 8em;
          width: auto;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
        }

        .selective {
          color: #ff455d;
          font-size: 16px;
        }

        .navbar_item_on {
          color: #ff455d;
        }
      }

      .navbar_slider {
        position: absolute;
        left: 0;
        bottom: -3.5px;
        width: 32px;
        height: 3px;
        background-color: #ff455d;
        border-radius: 2px;
        transition: all 0.1s;
      }

      .navbar_slider_0 {
        left: 8%;
      }

      .navbar_slider_1 {
        left: 32.5%;
      }

      .navbar_slider_2 {
        left: 57.8%;
      }
      .navbar_slider_3 {
        left: 83%;
      }
    }
  }
}
</style>