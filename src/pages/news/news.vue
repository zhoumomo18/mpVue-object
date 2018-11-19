<template>
  <div class="container lineTop" >
    <!-- <button v-if="!hasAuthInfo" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" @click="getUserInfo11" style='width:100%;height:100%;position:absolute;opacity:0;z-index:9999999999;'>
    </button> -->
    <!-- <div  @click="isBuild" class="fansAuth"></div> -->
    <tab_bar cur_index="2"></tab_bar>
    <!-- <isLoading :isLoading='isLoading'></isLoading> -->
    <!--商铺消息？-->
    <div v-if="merchNotice.length!==0||shopNotice.length!==0||orderNotice.length!==0">
      <!--官方消息-->
      <div class="message lineBottom">
        <div class="message_main">
          <scroll-view scroll-x="false" :style="{ width: width_scroll + 'px' }">
            <view class="itemmsg" @touchstart="touchstart">
              <ul style="position: absolute;" :id="shopNotice[0].isread" @click="toDetail(0,1,shopNotice[0].id,$event)">
                <li class="ul_li_01">
                  <a :class="{'noread':shopNotice[0].isread==0}">
                    <img src="../../../static/images/icon_official.png" alt="" />
                  </a>
                </li>
                <li class="ul_li_02">
                  <div>
                    <h3><p>活动通知</p><span>官方</span></h3>
                    <div class="color9a" v-if="shopNotice[0].isread==0">{{shopNotice[0].createtime}}</div>
                  </div>
                  <p class="color9a f12 lineHeight">{{shopNotice[0].title}}</p>
                  <i class="icon_ret" v-if="shopNotice[0].isread !==0"></i>
                </li>
              </ul>
            </view>
            <!--<view class="mesbutton" :class="[{'goBack':index==flag},{'showdel':showclass}]">
								<div class="messageleft">置顶</div>
								<div class="messageright"  @click="del(index)">删除</div>
						  </view>-->
          </scroll-view>
        </div>
      </div>     
      <!--店铺客服与用户对话-->
      
      <!-- 订单成功通知 -->
      <div class="message lineBottom" v-for="(item,index) in orderNotice" :key="index">
        <div class="message_main">
          <scroll-view scroll-x="false" :style="{ width: width_scroll + 'px' }">
            <view class="itemmsg" @touchstart="touchstart">
              <ul style="position: absolute;" :id="item.isread" @click="toDetail(item.ordersn,3,item.id,$event)">
                <li class="ul_li_01">
                  <a :class="{'noread':item.isread==0}">
                    <img src="../../../static/images/icon_news.png" alt="" />
                  </a>
                </li>
                <li class="ul_li_02">
                  <div>
                    <h3><p>订单付款成功</p></h3>
                    <div v-if="item.isread==0">{{item.createtime}}</div>
                  </div>
                  <p class="color9a f12 lineHeight">订单号：{{item.ordersn}}</p>
                  <i class="icon_ret" v-if="item.isread !==0"></i>
                </li>
              </ul>
            </view>
            <!--<view class="mesbutton" :class="[{'goBack':index==flag},{'showdel':showclass}]">
								<div class="messageleft">置顶</div>
								<div class="messageright"  @click="del(index)">删除</div>
						  </view>-->
          </scroll-view>
        </div>
      </div>
      <!-- 店铺通知 -->
      <div class="message lineBottom" v-for="(item,index) in merchNotice" :key="index">
        <div class="message_main">
          <scroll-view scroll-x="false" :style="{ width: width_scroll + 'px' }">
            <view class="itemmsg" @touchstart="touchstart">
              <ul style="position: absolute;" :id="item.info[0].isread" @click="toDetail(item.merchId,2,item.info[0].id,$event)">
                <li class="ul_li_01">
                  <a :class="{'noread':item.info[0].isread==0}">
                    <wux-image wux-class="image" shape="circle" :src="item.info[0].logo">
                    </wux-image>
                  </a>
                </li>
                <li class="ul_li_02">
                  <div>
                    <h3><p>{{item.info[0].merchname}}</p></h3>
                    <div v-if="item.info[0].isread==0">{{item.info[0].createtime}}</div>
                  </div>
                  <p class="color9a f12 lineHeight">{{item.info[0].bannername}}</p>
                  <i class="icon_ret" v-if="item.info[0].isread !==0"></i>
                </li>
              </ul>
            </view>
            <!--<view class="mesbutton" :class="[{'goBack':index==flag},{'showdel':showclass}]">
								<div class="messageleft">置顶</div>
								<div class="messageright"  @click="del(index)">删除</div>
						  </view>-->
          </scroll-view>
        </div>
      </div>
    </div>

    <div v-if="merchNotice.length==0&&shopNotice.length==0&&orderNotice.length==0" class="empty_2">
      <img src="../../../static/images/icon_news2.png">
      <div>您还没有收到消息哟o(∩_∩)o</div>
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
  import tab_bar from "@/components/tab_bar";
  import isLoading from "@/components/isLoading";
  export default {
    data() {
      return {
        flag: "",
        shopNotice: "",
        merchNotice: [],
        orderNotice: [],
        sendgoods_message: {},
        currentTab: 0,
        winWidth: 0,
        visible1: false,
        actions: "",
        delshow: false,
        width_scroll: 0,
        showclass: false,
        iPhoneshow: false,
        iphoneheight: "",
        i:1,
        setint:null,
      };
    },
    components: {
      isLoading,
      tab_bar
    },
    computed: {
      isLoading() {
        return this.$store.state.user.isLoading;
      }
    },
    async mounted() {
      var res = wx.getSystemInfoSync();
      this.width_scroll = res.windowWidth - 30;
      wx.hideTabBar();
      // this.initData();
    },
    methods: {
      async initData(i) {        
        if(i==1){
          this.$store.commit('SET_IS_LOADING', false)
          this.$store.commit("SET_IS_LOADING", true);
        }
        const data = await this.$http.saleMsg(
          this.$store.state.user.userInfo.openId
        );
        this.shopNotice = data.list.shopNotice.map((v) => {
          v.createtime = this._U.formatDate(v.createtime,'MM月dd日')
          return v;
        });
        this.orderNotice = data.list.orderNotice.map((v) => {
          v.createtime = this._U.formatDate(v.createtime,'MM月dd日')
          return v;
        });
        this.sendgoods_message = data.list.sendgoods_message[0];
        let merchNoticelist = [];
        for (const key in data.list.merchNotice) {
          if (data.list.merchNotice.hasOwnProperty(key) && /^(\d)*$/.test(key)) {
            const element = data.list.merchNotice[key];
            merchNoticelist.push({
              info: element,
              merchId: key
            });
          }
        }
        this.merchNotice = merchNoticelist.map((v) => {
          v.info[0].createtime = this._U.formatDate(v.info[0].createtime,'MM月dd日')
          return v;
        });
        this.$store.commit("SET_IS_LOADING", false);
        this.hasInitData = true;
        this.i++;
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
      handleClick() {
        this.visible1 = true;
      },
      touchstart() {
        this.showclass = true;
      },
      del(index) {
        this.flag = index;
      },
      async toDetail(id,type,msgid,e){
        let isRead=e.currentTarget.id;
        if(isRead == "0"){
          const data = await this.$http.readMsg(
            this.$store.state.user.userInfo.openId,
            type,
            1,
            msgid
          );
        }
        this.$router.push({ path:'/pages/news/newsdetil',query: { id,type}})
      }
    },
    onShareAppMessage(options) {
      return {
        title: (this.$store.state.user.userInfo ?
          this.$store.state.user.userInfo.nickName :
          "") + "给您分享天天逛街...",
        path: this.$route.fullPath
      };
    },
    onPullDownRefresh() {
    },
    async onShow() {
      if (this.$store.state.user.loginStatus==false) {
        this.$tips.alert('您还没有登录，请去登录');
        return
      }
      this.initData(this.i);
      // if (!this.hasInitData) {
      this.setint = setInterval(()=>{
        this.initData(this.i);          
      },30000)        
      // }
    },
    async onHide() {
      this.i=1;
      clearInterval(this.setint);  
      this.setint=null;
    }
  };

</script>
<style scoped lang='scss'>
  .container {
    background-color: #ffffff;
    padding-bottom: 84px;

    .message {
      margin-top: 12px;
			display: flex;
			align-items: center;
			vertical-align: middle;
			justify-content: space-between;
      .message_main {
        .scroll-view{
           white-space: nowrap; display: flex;
        }
        .itemmsg{
          background:#fff; width:100%; height: 70px; display: inline-block;padding-top: 5px;
        }
        .ul_li_01 {
          float: left;
          position: relative;

          .noread:after {
            content:"";
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #ff455d;
            position: absolute;
            right: 5px;
            top: 1.5px;
            z-index:5;
          }

          a {
            width: 54px;
            height: 54px;
            border-radius: 3px;
            position:relative;
            border:0.5px solid #f2f2f2;
           box-shadow:0.5px 0.5px 0.5px #f2f2f2;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .ul_li_02 {
          float: left;
          text-align: left;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0;
          padding-left: 15px;
          position: relative;
          width: 290px;
          .icon_ret{
          	display: inline-block;
          	position: absolute;
          	right:0;
          	top:16px;
          	width:12px;
          	height:12px;                        
            background: url("#{$imgUrl}icon_ret.png") no-repeat 100% 100%;
            background-size: cover;
            
          }
					>p{
						line-height: 18px;
					}
          >div {
            display: flex;
            align-items: center;

            h3 {
              font-family: PingFang-SC-Regular;
              font-size: 14px;
              line-height: 28px;
              color: #323232;
              width: 0%;
              -webkit-flex: 1;
              flex: 1; 
              align-items: center;
			vertical-align: middle;
		/*	justify-content: space-between;     */      

              display: flex;
              align-items: center;
              p{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              span {
                display: inline-block;
                vertical-align: middle;
                width: 40px;
                background-color: #ff455d;
                border-radius: 3px;
                border: solid 0.5px #ff455d;
                line-height: 16px;
                text-align: center;
                font-size: 10px;
                margin-left: 10px;
                color: #fff;
              }
            }

            div {
              font-family: PingFang-SC-Regular;
              font-size: 12px;
              width: 80px;
              text-align: right;
              padding-right: 6px;
              color: #9a9a9a;
            }
          }
        }

        .ul_li_03 {
          float: left;
          text-align: right;
          position: absolute;
          right: -88px;
          top: 4px;
          width: 70px;
          overflow: hidden;

          span {
            font-family: PingFang-SC-Regular;
            font-size: 12px;

            letter-spacing: 0;
            color: #9a9a9a;
          }
        }

        .mesbutton {
          background: #ff455d;
          width: 100px;
          padding: 12px;
          height: 79px;
          display: inline-block;

          .messageleft {
            float: left;
            width: 50%;
            color: #fff;
          }

          .messageright {
            float: left;
            width: 50%;
            color: #fff;
          }
        }

        .delclass {
          display: none;
          width: 0;
        }

        .goBack {
          display: none;
          /*width:0;*/
        }

        .showdel {
          display: inline-block;
        }
      }
    }

    .swiper {
      width: 100%;

      .navbar {
        margin: 10px 15px;
        border-radius: 3px 3px 0 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        position: relative;
        top: 0;
        height: 40px;
        width: 345px;
        background-color: #fff;
        border-bottom: 2px solid #ff455d;

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
            color: #808080;
            font-weight: 500;
            display: inline-block;
            font-size: 15px;
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
          width: 6px;
          height: 4px;
          border-radius: 50%;
          background-color: #ff455d;
          transition: all 0.1s;
        }

        .navbar_slider_0 {
          left: 25%;
        }

        .navbar_slider_1 {
          left: 75%;
        }
      }

      .content {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        -webkit-overflow-scrolling: touch;
      }
    }
  }

</style>
