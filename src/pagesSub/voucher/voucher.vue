<template>
  <div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
    <!-- <button v-if="!hasAuthInfo" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" @click="getUserInfo11" style='width:100%;height:100%;position:absolute;opacity:0;z-index:9999999999;'>
    </button> -->
    <div @click="isBuild" class="fansAuth"></div>
    <!--    <tab_bar cur_index="1"></tab_bar>-->
    <goAuth></goAuth>

    <div class="swiper">
      <div class="navbar">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick">
            <div class="navbar_title" :class="{'selective':activeIndex == index}">{{item.name}}</div>
          </div>
        </block>
        <div class="navbar_slider" :class="navbarSliderClass"></div>
      </div>
      <swiper class="content" :duration="50" :style="'height:'+contentHeight" @change="swiperChange" :current="currentTab"
        @animationfinish="onAnimationfinish">
        <swiper-item>
          <div v-if="couponList&&couponList.length<=0" class="empty">
           <nullstatus></nullstatus>
          </div>

          <div class="w100" v-if="couponList&&couponList.length>0">
            <div id="item1" v-for="(item,index) in couponList" :key='index' class="voucher_s" @click="$router.push({ path:'/pagesSub/voucher/two_dimension',query: { code_id: item.couponid }})">
              <div class="voucher_text">
                <div class="voucher_span v_price">￥</div>
                <div class="voucher_span v_money">{{item.deduct}}</div>
                <div class="voucher_span v_text">
                  <a>{{item.couponname}}</a>
                  <a class="v_add color9a">使用条件&nbsp;:&nbsp;{{item.title2}}</a>
                  <a class="v_add color9a">适用范围&nbsp;:&nbsp;全场通用</a>
                </div>

              </div>
              <p class="v_ptext">{{item.timestart}}—{{item.timeend}} &nbsp;<a class="text_a"></a></p>
              <img src="../../../static/images/img_yhj.png" alt="" />
              <span class="span_no">立即使用</span>
            </div>
          </div>


        </swiper-item>
        <swiper-item>
          <div v-if="couponUsedList&&couponUsedList.length<=0" class="empty">
           <nullstatus></nullstatus>
          </div>

          <div class="w100" v-if="couponUsedList&&couponUsedList.length>0">
            <div id="item2" v-for="(item,index) in couponUsedList" :key='index' class="voucher_s" @click="$router.push({ path:'/pagesSub/voucher/two_dimension',query: { code_id: 0 }})">
              <div class="voucher_text">
                <div class="voucher_span v_price">￥</div>
                <div class="voucher_span v_money">{{item.deduct}}</div>
                <div class="voucher_span v_text">
                  <a class="v_user">{{item.couponname}}</a>
                  <a class="v_add color9a">使用条件&nbsp;:&nbsp;{{item.title2}}</a>
                  <a class="v_add color9a">适用范围&nbsp;:&nbsp;全场通用</a>
                </div>

              </div>
              <p class="v_ptext">{{item.timestart}}—{{item.timeend}} &nbsp;<a class="text_a"></a></p>
              <img src="../../../static/images/img_ticket_mor.png" alt="" />

            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>
<script>
  import {
    login,
    getUserInfo,
    getSetting,
    setStorage
  } from "@/utils/wechat";
  import tab_bar from '@/components/tab_bar';
  import sercah from '@/components/sercah';
  import nullstatus from '@/components/nullstatus';
  
  export default {
    data() {
      return {
        tabs: [{
            name: "未使用",
            type: "1",
            checked: true
          },
          {
            name: "已使用",
            type: "2",
            checked: true
          }
        ],
        couponList: [],
        couponUsedList: [],
        activeIndex: 0,
        currentTab: 0,
        winWidth: 0,
        winHeight: 0,
        ybarsIndex: 0,
        iPhoneshow:false,
      	iphoneheight:''

      };
    },
    components: {
      tab_bar,
      sercah,
      nullstatus
    },
    created() {

     
    },
    methods: {
      async hasauth() {
        const res = await getSetting();
        if (res.authSetting["scope.userInfo"]) {
          console.log("用户已经授权过");
          this.hasAuthInfo = true;
          const data = await getUserInfo();
          this.userInfo = data.userInfo;
        } else {
          console.log("用户还未授权过");
          //   this.$router.push({ path: '/pagesSub/login/goAuth' })
          //  this.$router.replace({ path: "/pagesSub/login/goAuth" });
        }
      },
         iphone_xsp(){
    	  if(this.$store.state.user.iphoneX){
  					this.iPhoneshow=true;
					this.iphoneheight = this.$store.state.user.systemInfo.windowHeight + 50 +"px";
					
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
        this.activeIndex = e.currentTarget.id;
        this.currentTab = this.activeIndex;
      },
      poinClick(e) {
        this.ybarsIndex = e;
        //   console.log(e);
      },
      async swiperChange(e) {
        this.currentTab = e.mp.detail.current;
        this.activeIndex = this.currentTab;
        if (this.currentTab == 0) {
          const data = await this.$http.getCoupon(this.$store.state.user.userInfo.openId, 0)
          this.couponList = data.list

          // 	var query = wx.createSelectorQuery()
          // query.select('#item1').boundingClientRect((res) => {

          // 	this.contentHeight = res.height + 'px';

          // }).exec()
        } else {
          const data = await this.$http.getCoupon(this.$store.state.user.userInfo.openId, 'used')
          this.couponUsedList = data.list
          // 	 var query = wx.createSelectorQuery()
          // var query = wx.createSelectorQuery()
          // query.select('#item2').boundingClientRect((res) => {

          // 	this.contentHeight = res.height + 'px';

          // }).exec()
        }
      },
      onAnimationfinish() {
        console.log("滑动完成.....");
      }

    },
    mounted() {
			this.iphone_xsp();
    },
    computed: {
      navbarSliderClass() {
        if (this.activeIndex == 0) {
          return "navbar_slider_0";
        }
        if (this.activeIndex == 1) {


          return "navbar_slider_1";
        }
      },
      contentHeight() {
        return this.winHeight - 110 + "px";
      }
    },
    onPullDownRefresh() {},
    onTabItemTap(item) {

      console.log(item.index)
      console.log(item.pagePath)
      console.log(item.text)
    },
    async onShow() {
      wx.hideTabBar()
      this.hasauth();
      var res = wx.getSystemInfoSync();
      this.winWidth = res.windowWidth;

      this.winHeight = res.windowHeight - 60 - 50;

      const data = await this.$http.getCoupon(this.$store.state.user.userInfo.openId, 0)
      this.couponList = data.list
    }
  };

</script>
<style scoped lang='scss'>
  .container {
    background-color: #f2f2f2;
    padding-bottom: 50px;


    .swiper {
      width: 100%;

      .navbar {
        margin-bottom: 1px;
        border-radius: 3px 3px 0 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        position: relative;
        top: 0;
        height: 40px;
        width: 100%;
        background-color: #fff;
        border-top: 1px solid #e8e8e8;

        .navbar_item {
          position: relative;
          display: block;
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          flex: 1;
          padding: 13px 0;
          text-align: center;
          font-size: 0;

          .navbar_title {
            color: #424242;
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
          }

          .navbar_item_on {
            color: #ff455d;
          }
        }

        .navbar_slider {
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 15%;
          height: 2px;
          // border-radius: 50%;
          background-color: #ff455d;

          transition: all 0.1s;
        }

        .navbar_slider_0 {
          left: 18%;
        }

        .navbar_slider_1 {
          left: 68%;
        }
      }

      .content {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        -webkit-overflow-scrolling: touch;

        .voucher_s {
          margin: 15px 0;
          padding: 0 15px;
          width: 100%;
          height: 133px;
          position: relative;
          border-radius: 5px;


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
              font-size: 22px;
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
            border: 0.5px solid #FF455D;
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