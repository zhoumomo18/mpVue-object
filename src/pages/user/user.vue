<template>

  <div class="container">
    <div v-if="!hasAuthInfo" @click="goAuth" class="fullPage mt132"></div>
    <!-- <div  @click="isBuild" class="fansAuth"></div> -->
    <tab_bar cur_index="3"></tab_bar>
    <!-- <isLoading :isLoading='isLoading'></isLoading> -->
    <!-- <button v-if="!isNoticeAuth" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" @click="getUserInfo11" style='width:100%;height:100%;position:absolute;opacity:0;z-index:9999999999;'>
    </button> -->
    <div class="user_wrap">
      <div class="bg"></div>
      <div class="userinfo" v-if="hasUserInfo">

        <img class="averter" @click="goLogin_person()" :src="avatarUrl" background-size="cover">
        <div class="loginInfo" v-if="hasAuthInfo">
          <div class="nickName">
            <span class="mr14 f16 color88">{{nickname}}</span>
            <span class="leval">
              <img src="../../../static/images/icon_vip.png" alt="" />
            </span>
          </div>
          <div class="money mt10 ">
            <span class="mr13 f13 color88">余额:{{authUserInfo?authUserInfo.credit2:0}}</span>
            <span class="f13 color88">积分:{{authUserInfo?authUserInfo.credit1:0}}</span>
          </div>
        </div>
        <div @click="goLogin_person()" class="doLogin f16" v-if="!hasAuthInfo">
          登录/注册
        </div>

      </div>
      <div class="panel">
        <div class="item" @click="$router.push('myFocus')">
          <div class="mt10 f12">{{authUserInfo?authUserInfo.statics.follow:0}}</div>
          <div class="mt1 f12 color9a">关注</div>
        </div>
        <div class="item" @click="$router.push('myLike')">
          <div class="mt10 f12">{{authUserInfo?authUserInfo.statics.favorite:0}}</div>
          <div class="mt1 f12 color9a">收藏</div>
        </div>
        <div class="item" @click="$router.push('myFooter')">
          <div class="mt10 f12">{{authUserInfo?authUserInfo.statics.history:0}}</div>
          <div class="mt1 f12 color9a">足迹</div>
        </div>
        <div class="item" @click="$router.push('myPublic')">
          <div class="mt10 f12">{{authUserInfo?authUserInfo.statics.publish:0}}</div>
          <div class="mt1 f12 color9a">发布</div>
        </div>
      </div>
      <div class="updateUserInfo f13" v-if="hasAuthInfo" @click="$router.push({ path: '/pages/user/userInfo' })">
        <img src="../../../static/images/icon_modify.png" alt="" />
      </div>

      <div class="myOrder lineBottom" @click="$router.push('myOrder')">
        <span class="hander_name fl f16">我的订单</span>
        <span class="detail mr20 fr color9a f14">更多</span>
        <div class="arrow"></div>
      </div>
      <div class="orderStatus">
        <!-- <div class="item" @click="$router.push({ path: '/pages/user/myOrder', query: { orderType: 1 } })"> -->
        <!--mypay注释-->
        <!--<div class="item" @click="$router.push('myPay')">
                <img class="card" src="../../../static/images/icon_obligations.png">
                <div class="cardName">待付款</div>
            </div>-->
        <div class="item" @click="$router.push({ path: '/pages/user/myOrder', query: { orderType: 1 } })">
          <img class="card" src="../../../static/images/icon_obligations.png">
          <div class="cardName">待付款</div>
          <div class="right_radio" v-if="state.order_0 > 0">{{authUserInfo?authUserInfo.statics.order_0:''}}</div>
        </div>
        <div class="item" @click="$router.push({ path: '/pages/user/myOrder', query: { orderType: 3 } })">
          <img class="card" src="../../../static/images/icon_pendingreceip.png">
          <div class="cardName">待收货</div>
          <div class="right_radio" v-if="state.order_1 > 0">{{authUserInfo?authUserInfo.statics.order_1:''}}</div>
        </div>
        <div class="item" @click="$router.push({ path: '/pages/user/myOrder', query: { orderType: 5 } })">
          <img class="card" src="../../../static/images/icon_completed.png">
          <div class="cardName">已完成</div>
          <div class="right_radio" v-if="state.order_3 > 0">{{authUserInfo?authUserInfo.statics.order_3:''}}</div>
        </div>
        <div class="item" @click="$router.push({ path: '/pages/user/myOrder', query: { orderType: 4 } })">
          <img class="card" src="../../../static/images/icon_comment.png">
          <div class="cardName">评价</div>
          <div class="right_radio" v-if="state.order_2 > 0">{{authUserInfo?authUserInfo.statics.order_2:''}}</div>
        </div>
        <div class="item" @click="$router.push({ path: '/pages/user/myOrder', query: { orderType: 6 } })">
          <img class="card" src="../../../static/images/icon_after-sale.png">
          <div class="cardName">售后/退款</div>
          <div class="right_radio" v-if="state.order_4 > 0">{{authUserInfo?authUserInfo.statics.order_4:''}}</div>
        </div>
      </div>
    </div>

    <div class="managementList">
      <!-- <div class="handerItem" @click="$router.push('myOrder')">
            <div class="icon">
              <img src="../../../static/images/icon_orderforgoods.png" >
            </div>
            <div class="hander_name">我的订单</div>
            <div class="arrow"></div>
        </div> -->
      <div class="handerItem" @click="$router.push({ path: '/pagesSub/voucher/voucher'})">
        <div class="icon">
          <img src="../../../static/images/icon_mycouponbag..png">
        </div>
        <div class="hander_name">红包卡卷</div>
        <div class="arrow"></div>
      </div>
      <div class="handerItem" @click="pointalert()">
        <div class="icon">
          <img src="../../../static/images/icon_mybonus.png">
        </div>
        <div class="hander_name">推广分享</div>
        <div class="hander_name font_all">推荐有奖，最高1000元</div>
        <div class="arrow"></div>
      </div>
      <div class="handerItem">
        <!-- @click="$router.push('myMsg')" 我的 消息 -->
        <div class="icon">
          <img src="../../../static/images/icon_customerservicecentre.png">
        </div>
        <div class="hander_name">客服中心</div>
        <div class="hander_name font_all">10:00-22:00</div>
        <div class='contact'>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
          <contact-button type="default-light" size="30" session-from="weapp">
          </contact-button>
        </div>
        <div class="arrow"></div>
      </div>
      <div class="handerItem" @click="$router.push('myAdress')">
        <div class="icon">
          <img src="../../../static/images/icon_addressmanagement.png">
        </div>
        <div class="hander_name">地址管理</div>
        <div class="arrow"></div>
      </div>
      <div class="handerItem" @click="$router.push('setting')">
        <div class="icon">
          <img src="../../../static/images/icon_install.png">
        </div>
        <div class="hander_name">系统设置</div>
        <div class="arrow"></div>
      </div>

    </div>

  </div>
</template>
<script>
import tab_bar from "@/components/tab_bar";
import { login, getUserInfo, getSetting, setStorage } from "@/utils/wechat";
import isLoading from "@/components/isLoading";
export default {
  data() {
    return {
      userInfo: {},
      hasAuthInfo: false,
      isNoticeAuth: false,
      hasUserInfo: false,
      avatarUrl: "/static/images/icon_headportrait.png",
      nickname: "登录/注册",
      authUserInfo: null,
      state: ""
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
  methods: {
    async hasauth() {
      const res = await getSetting();
      if (
        this.$store.state.user.userInfo &&
        this.$store.state.user.userInfo.mobile
      ) {
        this.hasAuthInfo = true;
        this.isNoticeAuth = true;
        this.userInfo = this.$store.state.user.userInfo;
        this.avatarUrl = this.$store.state.user.userInfo.avatarUrl;
        this.nickname = this.$store.state.user.userInfo.nickName || this.$store.state.user.userInfo.nickname;
        return;
      }
      if (res.authSetting["scope.userInfo"]) {
        console.log("用户已经授权过");
        this.hasAuthInfo = true;

        if (!this.$store.state.user.userInfo) {
          //  this.hasAuthInfo =false
          return;
        }
        this.userInfo = this.$store.state.user.userInfo;
        this.avatarUrl = this.$store.state.user.userInfo.avatarUrl;
        this.nickname = this.$store.state.user.userInfo.nickName;
      } else {
        console.log("用户还未授权过");
      }

      // 手机号登录 获取信息
      if (
        this.$store.state.user.userInfo &&
        this.$store.state.user.userInfo.openId.slice(0, 3) == "wap"
      ) {
        this.hasAuthInfo = true;
        this.avatarUrl = this.$store.state.user.userInfo.avatarUrl
          ? this.$store.state.user.userInfo.avatarUrl
          : "/static/images/icon_headportrait.png";
        this.userInfo = this.$store.state.user.userInfo;

        this.nickname = this.$store.state.user.userInfo.nickname;
      }
    },
    bindGetUserInfo(e) {
      if (e.mp.detail.rawData) {
        const data = e.mp.detail.rawData;
        this.userInfo = JSON.parse(data);
        this.avatarUrl = this.userInfo.avatarUrl;
        this.nickname = this.userInfo.nickName;
        setStorage("userInfo", data);
      } else {
        console.log("用户按了拒绝按钮");
        this.isNoticeAuth = true;
        return;
      }
    },
    isBuild() {
      this.$tips.alert("敬请期待...");
    },
    goLogin_person() {
      if (this.hasAuthInfo) {
        this.$router.push({ path: "/pages/user/userInfo" });
      } else {
        this.$router.push({ path: "/pagesSub/login/loginIndex" });
      }
    },
    goAuth() {
      this.$router.push({ path: "/pagesSub/login/loginIndex" });
    },
    pointalert() {
      this.$tips.alert("推广分享活动未开启,尽请期待");
    }
  },
  mounted() {},
  onPullDownRefresh() {},
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
    wx.hideTabBar();

    this.$store.commit("SET_IS_LOADING", false);
    if (this.$store.state.user.handleLoginOut) {
      this.hasAuthInfo = false;
      this.authUserInfo = null;
      this.avatarUrl = "/static/images/icon_headportrait.png";
      this.nickname = "登录/注册";
      this.hasUserInfo = true;
      return;
    }
    await this.hasauth();

    if (!this.$store.state.user.userInfo) {
      // 判断加载完成
      this.hasUserInfo = true;

      return;
    }

    this.$store.commit("SET_IS_LOADING", false);
    this.$store.commit("SET_IS_LOADING", true);
    const arr = [
      this.$store.state.user.userInfo.openId,
      this.$store.state.user.userInfo.authkey
    ];
    const [res, data] = await this._U
      .PromiseAll(
        this.$http.getPersonInfo(arr[0]),
        this.$http.getUserInfo(...arr)
      )
      .catch(function(e) {
        console.log(e);
      });

    const userInfo = this._U.deepCopy(this.$store.state.user.userInfo);

    this.hasUserInfo = true;
    userInfo.avatarUrl = res.avatar;
    userInfo["gender"] = parseInt(res.gender);
    userInfo["bth"] = res.birthday;
    userInfo["mobile"] = res.mobile;

    this.$store.commit("SET_USER_INFO", userInfo);

    this.userInfo = this.$store.state.user.userInfo;
    this.avatarUrl = this.$store.state.user.userInfo.avatarUrl || "/static/images/icon_headportrait.png";
    this.nickname = this.$store.state.user.userInfo.nickName || this.$store.state.user.userInfo.nickname;

    // const  [err ,data] = await this._to(this.$http.getUserInfo(...arr))

    this.authUserInfo = data;

    this.state = this.authUserInfo.statics;
    this.$store.commit("SET_IS_LOADING", false);
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding-bottom: 84px;
  .user_wrap {
    position: relative;
    width: 100%;
    background-color: #f2f2f2;
    &::before {
      content: "";
      width: 100%;
      height: 1px;
      transform: scaleY(0.5);
      position: absolute;
      top: 0;
      background: #e8e8e8;
    }
    .bg {
      width: 100%;
      height: 132px;
      background: url("../../../static/images/img_user.png");
      background-size: cover;
      background-repeat: no-repeat;
      margin-bottom: 48px;
    }
    .userinfo {
      .averter {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        position: absolute;
        top: 36px;
        bottom: 26.5px;
        left: 26px;
        /*border:0.5px solid #fff;*/
      }
      .loginInfo {
        top: 32px;
        left: 82px;
        position: absolute;
        .leval {
          width: 28px;
          height: 14px;
          /*    line-height: 16px;*/
          border-radius: 4px;
          /* border: solid 0.5px #ff7700;*/

          /* color: #ff7700;*/
          /*    font-size: 10px;*/
          text-align: center;
          display: inline-block;
          vertical-align: middle;
          margin-bottom: 5px;
          /*      background:#ff7700;*/
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .doLogin {
        top: 42px;
        left: 87px;
        width: 94px;
        height: 30px;
        border-radius: 8px;
        border: solid 0.5px #fff;
        position: absolute;
        text-align: center;
        line-height: 27px;
        color: #fff;
      }
    }
    .panel {
      /* width: 300px;*/
      height: 50px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      background-color: #fff;
      position: absolute;
      top: 122px;
      left: 0;
      right: 0;
      margin: 0 auto;
      box-shadow: 0 2px 1.5px 0.1px rgba(154, 154, 154, 0.1);
      /*  border-radius: 5px;*/
      .item {
        flex: 1;
        text-align: center;
        font-size: 12px;
      }
    }

    .updateUserInfo {
      position: absolute;
      width: 18px;
      height: 18px;
      top: 15px;
      right: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .myOrder {
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      position: relative;
      background-color: #ffffff;
      /*box-shadow: 0px 2px 1.5px 0.1px 
		rgba(154, 154, 154, 0.1);*/
    }
    .orderStatus {
      width: 100%;
      height: 76px;
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      margin-bottom: 10px;
      .item {
        width: 20%;
        height: 100%;
        position: relative;

        .card {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          transform: translateY(-8px);
          width: 25px;
          height: 25px;
        }
        .cardName {
          text-align: center;
          position: absolute;
          bottom: 11px;
          left: 0;
          font-size: 12px;
          right: 0;
          margin: 0 auto;
          color: #404040;
        }
        .right_radio {
          border-radius: 50%;
          width: 12px;
          height: 12px;
          position: absolute;
          font-size: 9px;
          right: 24px;
          top: 16px;

          background-color: #ff455d;
          color: #fff;
          line-height: 12px;
          text-align: center;
        }
      }

      .item:nth-of-type(2) {
        .card {
          width: 26px;
          height: 25px;
        }
      }
      .item:nth-of-type(3) {
        .card {
          width: 22.5px;
          height: 25px;
        }
      }
    }
  }

  .managementList {
    width: 100%;
    .handerItem {
      position: relative;
      width: 100%;
      height: 40px;
      display: flex;
      &::before {
        content: "";
        width: 100%;
        height: 1px;
        transform: scaleY(0.5);
        position: absolute;
        bottom: 0;
        background: #e8e8e8;
      }
      .icon {
        width: 58px;
        height: 100%;
        position: relative;

        img {
          content: "";
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        }
      }
      .hander_name {
        font-size: 14px;
        color: #404040;
        line-height: 40px;
      }
      /*// .arrow {
      //   position: absolute;
      //   right: 15px;
      //   top: 0;
      //   bottom: 0;
      //   margin: auto 0;
      //   width: 9.5px;
      //   height: 17.5px;
      //   background: url("../../../static/images/icon_ret.png");
      //   background-size:cover;
      // }*/
    }
    .f14 {
      position: absolute;
      right: 54px;
      color: #9a9a9a !important;
    }
    .font_all {
      position: absolute;
      font-size: 12px !important;
      right: 37px;
      color: #9a9a9a !important;
    }
    .handerItem:nth-of-type(1) {
      .icon {
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .handerItem:nth-of-type(2) {
      .icon {
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .handerItem:nth-of-type(3) {
      .icon {
        img {
          width: 20px;
          height: 20px;
        }
      }
      .contact {
        position: absolute;
        left: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        z-index: 999;
        opacity: 0;
        overflow: hidden;
      }
    }
    .handerItem:nth-of-type(4) {
      .icon {
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .handerItem:nth-of-type(5) {
      .icon {
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>
