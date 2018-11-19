<template>
  <div class="container">
    <isLoading :isLoading='isLoading'></isLoading>

    <div class="h50p">
      <div class="cuspos">
        <div class="nearlyHeader lineBottom">
          <div class="w100">
            <div class="nearlyTitle f16 bold color28">附近优惠</div>
            <div class="sortBy" @click="togglePopup">
              <span class="f14 color28 mr7">筛选</span>
              <div class="icon"></div>
            </div>
          </div>              
        </div>
        <div class="selectPop" v-if="showSelectCont" @click="closePop">
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
                <button class="button-02" @click.stop="handleGetfindList(1,10)">查看{{shop_num}}个商家</button>
              </div>
            </div>
          </div>
        </div>  
      </div>      
    </div>

    <div class="nearlysearch" v-if="searchshow">
      <div class="myToast">
        <h3>优惠活动</h3>
        <ul class="t_main">
          <li>
            <a href="">满500减200</a>
          </li>
          <li>
            <a href="">满500减200</a>
          </li>
          <li>
            <a href="">满500减200</a>
          </li>
          <li>
            <a href="">满500减200</a>
          </li>
          <li>
            <a href="">满500减200</a>
          </li>
          <li>
            <a href="">满500减200</a>
          </li>
        </ul>
        <div class="f_main">
          <p>人均消费</p>
          <div class="s_input">
            <van-slider custom-class="slider" value="50" step="10" bar-height="10px" @change="onChange" />
          </div>

        </div>
        <div class="f_button">
          <button class="button-01">清空设置</button>
          <button class="button-02">查看20个商家</button>
        </div>
      </div>

    </div>

    <div class="nearly">
      <div v-if="nearlySale&&nearlySale.length<=0" class="empty">
        <img src="../../../static/images/icon_none.png">
        <div>暂时还没有推荐大牌促销哟o(∩_∩)o</div>
      </div>

      <div class="goodsContent fjyhgoodsContent">
        <div class="w100" v-if="nearlySale&&nearlySale.length>0">
          <div class="item lineBottom" v-for="(item,index) in nearlySale" :key="index" @click="$router.push({ path:'/pagesSub/busineshop/shop',query: { id: item.id }})">
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
            <zan-loadmore v-if="!isBottom" type="loading"></zan-loadmore>
            <zan-loadmore v-if="isBottom" type="text" text="暂无数据"></zan-loadmore>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import isLoading from "@/components/isLoading";
  export default {
    data() {
      return {
        nearlySale: [],
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
        showSelectCont:false,
        touchMove: false,
        hot_list: [{
            text: "从高到底排序",
            states: "up"
          },
          {
            text: "从底到高排序",
            states: "down"
          }
        ],
        shopD_list: [{
            text: "折扣",
            states: "1"
          },
          {
            text: "满减",
            states: "2"
          }
        ],
        custer_list: [],
        averprice_list: [{
            text: "200以下",
            states: "0-200"
          },
          {
            text: "200-300",
            states: "200-300"
          },
          {
            text: "300-500",
            states: "300-500"
          },
          {
            text: "500-1000",
            states: "500-1000"
          },
          {
            text: "1000以上",
            states: "1000-"
          }
        ],
        selelet_active1: null,
        selelet_active2: null,
        selelet_active3: null,
        detil_val: "40",
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
        prePage: 10,
        isBottom: false,
        pageFindlist: 1,
        hasFindSale: "none",
        clusterInfo: null,
        isChangeCity: false,
        iPhoneshow: false,
        iphoneheight: ""
      };
    },
    async onShow() {
      this.getMore();
    },
    components: {
      isLoading
    },
    async mounted() {
      this.iphone_xsp();
    },
    computed: {
      isLoading() {
        return this.$store.state.user.isLoading;
      }
    },
    methods: {
      async getMore() {
        this.$store.commit("SET_IS_LOADING", false);
        this.$store.commit("SET_IS_LOADING", true);

        let openid=(this.$store.state.user.userInfo?this.$store.state.user.userInfo.openId:"")
        const [nearlySale, marketCityList] = await this._U.PromiseAll(
          this.$http.getNearlySale(
            openid,
            this.$store.state.user.ids,
            this.$store.state.user.locationInfo.latitude,
            this.$store.state.user.locationInfo.longitude,
            this.str.type,
            this.str.hot,
            this.str.cluster_id,
            this.str.jiawei,
            this.page,
            this.prePage
          ),
          this.$http.marketCityList(
            this.$store.state.user.locationInfo.latitude,
            this.$store.state.user.locationInfo.longitude,
            1,
            20,
            this.$store.state.user.clusterInfo.city
          )
        );

        this.$store.commit("SET_IS_LOADING", false);

        if(nearlySale.result.data instanceof Array && nearlySale.result.data.length>0){
          nearlySale.result.data.map(i => {
            i.jl = (i.jl / 1000).toFixed(1);
          });
          this.nearlySale = nearlySale.result.data;
        }
        this.custer_list = marketCityList.result.data;
      },
      // 	 筛选点击
      async togglePopup() {
        this.showTop = !this.showTop;
        this.showSelectCont = !this.showSelectCont;
        this.isClick = !this.isClick;
      },
      handletouchmove(e) {
        this.touchMove = true;
      },
      onChange(event) {
        this.detil_val = event.mp.detail * 20;
        this.value = event.mp.detail;
        this.str.average = this.detil_val;
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
        let openid=(this.$store.state.user.userInfo?this.$store.state.user.userInfo.openId:"")
        let shopDistrictlist = await this._to(
          this.$http.getNearlySale(
            openid,
            this.$store.state.user.ids,
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
      //		 获取筛选商品列表
      async findlist(page, prePage) {
        let openid=(this.$store.state.user.userInfo?this.$store.state.user.userInfo.openId:"")
        let shopDistrictlist = await this._to(
          this.$http.getNearlySale(
            openid,
            this.$store.state.user.ids,
            this.$store.state.user.locationInfo.latitude,
            this.$store.state.user.locationInfo.longitude,
            this.str.type,
            this.str.hot,
            this.str.cluster_id,
            this.str.jiawei,
            page,
            prePage
          )
        );
        return shopDistrictlist[1].result.data;
      },   
      closePop(){
        this.showSelectCont=false;
        this.isClick=false;
      },
      async handleGetfindList(page, prePage) {
        this.hasFindSale = "click";
        this.page = 1;
        this.isBottom = false;
        this.pageFindlist = 1;
        this.showTop = false;
        this.showSelectCont = false;
        this.isClick = false;
        this.str.type = "";

        const data = await this.findlist(page, prePage);
        this.nearlySale = data||[];
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
      }
    },
    onPullDownRefresh() {},
    async onReachBottom() {
      if (this.isBottom) return;
      this.$store.commit("SET_IS_LOADING", true);
      let nearlySale = await this.findlist(++this.page, this.prePage);      

      if(nearlySale instanceof Array && nearlySale.length>0){
        if (nearlySale.length < this.prePage) {
          this.isBottom = true;
        }
        nearlySale.map(i => {
          i.jl = (i.jl / 1000).toFixed(1);
        });
        this.nearlySale = [...this.nearlySale, ...nearlySale];
      }      
      this.$store.commit("SET_IS_LOADING", false);
    },
    watch: {
      clusterInfo(ne, old) {
        this.hasFindSale = "none";
        this.selelet_active1 = null;
        this.selelet_active2 = null;
        this.selelet_active3 = null;
        this.value = 2;
        this.isBottom = false;
      }
    },
    onUnload(){
      this.selelet_active1= null;
      this.selelet_active2= null;
      this.selelet_active3= null;
      this.str= {
        ids: "",
        type: "",
        lat: "",
        lng: "",
        hot: "",
        cluster_id: "",
        jiawei: ""
      };
      this.page= 1;
      this.isBottom= false;

    }
  };

</script>

<style scoped lang='scss'>
  .cuspos{position: fixed !important;z-index:10;top:0;left:0;width: 100%;max-height:100vh;min-height: 50px;}
  .nearly {
    position: relative;
    width:100%;
    padding: 0;
    min-height: 100vh;
  }

  .selectPop {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
  }

  .container {
    width: 100%;
    padding: 0;

    .nearlysearch {
      width: 100%;

      .myToast {
        border: 0;
        position: relative;
        width: 100%;
        padding: 12px 0 0 0;
        background-color: #fff;
        text-align: center;

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
          padding:0 10px;
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
          }
        }

        .f_button {
          height: 40px;
          line-height: 40px;
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

    .nearlyHeader {
      background: #ffffff;
      height: 50px;
      padding-top: 16.5px;
      padding-left: 15px;
      padding-right: 15px;
      position: relative;

      .nearlyTitle {
        height: 20px;
        border-left: 2px solid #ff455d;
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

    .goodsContent {
      padding: 0 15px;

      .item {
        position: relative;
        padding: 12px 0 12px 0;
        height: 115px;
        display: flex;

        .left {
          width: 90px;
          height: 90px;
        }

        .right {
          margin-left: 15px;
          width: 0%;
          -webkit-flex: 1;
          flex: 1;
        }
      }
    }
  }

</style>
