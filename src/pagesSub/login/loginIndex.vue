<template>
  <div class="container lineTop">
    <div class="bg">
      <div class="bgIn">

      </div>
    </div>
    <div class="login w100">
      <div class="userName lineBottom h45">
        <div class="userIconWrap ">
          <div class="userIcon" :class="{'active':input_active==1}"></div>
        </div>
        <input type="nubmber" class="color3f" v-model="phone" placeholder="请输入11位手机号" @focus="inputFocus(1)" @blur="blur(1)">
      </div>
      <div class="pwd lineBottom h45">
        <div class="pwdIconWrap">
          <div class="pwdIcon" :class="{'active':input_active==2}"></div>
        </div>
        <input class="color3f" v-if="pwdType=='password'" type="password" :focus='eysFocus' v-model="pwd1" placeholder="请输入密码" @focus="inputFocus(2)" @blur="blur(2)">
        <input class="color3f" v-if="pwdType=='text'" type="text" :focus='eysFocus' v-model="pwd1" placeholder="请输入密码" @focus="inputFocus(2)" @blur="blur(2)">
        <span class="eysIcon" :class="{'active':eysIconShow}" @click="eysChange()"></span>
      </div>
      <div class="fr color3f">忘记密码？</div>
      <div class="loginBtn f18" @click="doLogin()">登录</div>
      <div class="goAndRegister">
        <div @click="$router.push({ path: '/pages/home/home', isTab: true })">随便逛逛</div>
        <div @click="$router.push({ path: '/pagesSub/login/register'})">注册</div>
      </div>
    </div>
    <div class="thridLoginTitle">
      <div class="tadaySale">
        <span class="fl hcenter"></span>
        <span class="f16 color3f">第三方登录</span>
        <span class="fr hcenter"></span>
      </div>
    </div>
    <div class="thridLogin">
      <div class="phoneLogin" @click="$router.push({ path: '/pagesSub/login/loginPhone'})">
        <div class="phoneIcon"></div>
        <div class="color3f">手机号快捷登陆</div>
      </div>
      <button class="wechatLogin" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
        <div class="wechatIcon"></div>
        <div class="color3f">微信号快捷登陆</div>
      </button>
    </div>

  </div>
</template>
<script>
import { login, getUserInfo, getSetting, setStorage, set,clear } from "@/utils/wechat";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      input_active: false,
      pwdType: "password",
      eysIconShow: false,
      eysFocus: false,
      phone: "",
      pwd1: ""
    };
  },
  components: {},
  created() {},
  methods: {
    ...mapActions(["getUserInfo", "getAllProducts"]),
    async hasauth() {
      const res = await getSetting();
      if (res.authSetting["scope.userInfo"]) {
        console.log("用户已经授权过");
        this.hasAuthInfo = true;
        // const data = await getUserInfo();
        // this.userInfo = data.userInfo;

        this.$router.go(1);
      } else {
        console.log("用户还未授权过");
      }
    },
    async bindGetUserInfo({ mp }) {
      const { detail } = mp;

      if (detail.rawData) {
        const encryptedData = detail.encryptedData;
        const iv = detail.iv;
        this.user_Info = detail.userInfo;

        if (!this.$store.state.user.userInfo) {
          await this.getUserInfo();
          //  this.getAllProducts();
        }
        const userInfo = this.$store.state.user.userInfo;
        let authInfo = "";

        try {
          authInfo = await this.$http.doAuth(
            userInfo.openid,
            encryptedData,
            iv,
            userInfo.session_key,
            userInfo.authkey
          );
        } catch (error) {
          this.$tips.alert(error);
        }

        authInfo["openid"] = "sns_wa_" + authInfo.openId;
        authInfo.openId = "sns_wa_" + authInfo.openId;
        this.$store.commit("SET_HANDLE_LOGIN_OUT", false);
        this.$store.commit("SET_USER_INFO", authInfo);
        this.$store.commit("SET_DO_AUTH", true);
        this.$store.commit("SET_LOGIN_STATUS", "wx");
        this.isNoticeAuth = true;
        clear()

        if (authInfo) {
          const res = await this.$http.getPersonInfo(authInfo.openId);          
          if (res.mobile) {
            if (this.$route.query.outLogin == "true") {
              this.$router.push({ path: "/pages/home/home", isTab: true });
            } else {
              this.$router.go(1);
            }
          } else {
            if (this.$route.query.outLogin == "true") {
              this.$router.push({
                path: "/pagesSub/login/bindPhone",
                query: { index: 1, outLogin: true }
              });
            } else {
              this.$router.push({
                path: "/pagesSub/login/bindPhone",
                query: { index: 1 }
              });
            }
          }
        }
      } else {
        console.log("用户按了拒绝按钮");
        this.isNoticeAuth = true;
        return;
      }
    },
    inputFocus(e) {
      this.input_active = e;
      if (e == 2) {
        this.eysFocus = true;
      }
    },
    blur(e) {
      this.input_active = false;
      if (e == 2) {
        this.eysFocus = false;
      }
    },
    eysChange() {
      this.eysFocus = !this.eysFocus;
      this.eysIconShow = !this.eysIconShow;
      this.eysIconShow ? (this.pwdType = "text") : (this.pwdType = "password");
    },
    async doLogin() {
      if (!this.$validate.phone(this.phone)) {
        this.$tips.alert("请输入11位手机号");
        return;
      }
      if (
        !this.$validate.pwd(this.pwd1) &&
        !this.$validate.rangelength(this.pwd1, 6, 18)
      ) {
        this.$tips.alert("6-20位字母、数字组合");
        return;
      }

      if (!this.$store.state.user.userInfo) {
        await this.getUserInfo();
        //  this.getAllProducts();
      }

      const res = await this.$http.doPhonePwdLogin(this.phone, this.pwd1);
      if (res.error != 0) {
        return this.$tips.alert(res.message);
      }
      res.member["authkey"] = res.token;
      res.member["openId"] = res.member.openid;
      this.$store.commit("SET_HANDLE_LOGIN_OUT", false);
      this.$store.commit("SET_USER_INFO", res.member);
      this.$store.commit("SET_LOGIN_STATUS", "wap");

      set ('userInfo', res.member, 2592000000)
      set ('handleLoginOut', false, 2592000000)
      set ('loginStatus', 'wap', 2592000000)

      if (this.$route.query.outLogin == "true") {
        this.$router.push({ path: "/pages/home/home", isTab: true });
      } else {
        this.$router.go(1);
      }
    }
  },
  mounted() {},
  onPullDownRefresh() {},
  onShow() {}
};
</script>
<style  scoped lang='scss'>
.h45 {
  height: 45px;
  line-height: 45px;
}
.container {
  background: url(#{$imgUrl}img_dengl_backg.jpg) no-repeat center center;
  background-size: cover;
  overflow: hidden;
  .bg {
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    .bgIn {
      width: 60px;
      height: 60px;
      background: url(#{$imgUrl}logo_start_icon_red.png) no-repeat center center;
      background-size: cover;
    }
  }
  .login {
    padding: 0 38px;
    .placeholder {
      color: #99aa99;
      font-size: 10px;
      vertical-align: middle;
    }
    .userName {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .userIconWrap {
        width: 50px;
        display: flex;
        align-items: center;
        .userIcon {
          width: 20px;
          height: 20px;
          background: url(#{$imgUrl}icon_dl_cup.png) no-repeat center center;
          background-size: cover;
          margin-left: 10px;
        }
        .active {
          background: url(#{$imgUrl}icon_dl.png) no-repeat center center;
          background-size: cover;
        }
      }
      input {
        width: 65%;
      }
    }
    .pwd {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      margin-bottom: 11px;
      input {
        width: 60%;
      }
      .pwdIconWrap {
        width: 50px;
        display: flex;
        align-items: center;
        .pwdIcon {
          width: 17.5px;
          height: 20.5px;
          background: url(#{$imgUrl}icon_mm_pitch.png) no-repeat center center;
          background-size: cover;
          margin-left: 10px;
        }
        .active {
          background: url(#{$imgUrl}icon_mm.png) no-repeat center center;
          background-size: cover;
        }
      }
      .eysIcon {
        width: 25.5px;
        height: 9.5px;
        background: url(#{$imgUrl}icon_hide.png) no-repeat center center;
        background-size: cover;

        position: absolute;
        top: 0;
        bottom: 0;
        right: 15px;
        margin: auto 0;
      }
      .active {
        background: url(#{$imgUrl}icon_display.png) no-repeat center center;
        background-size: cover;
      }
    }
  }
  .loginBtn {
    background-color: #ff455d;
    color: #fff;
    height: 47px;
    line-height: 47px;
    border-radius: 23.5px;
    text-align: center;

    margin-top: 54px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
  .goAndRegister {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    div {
      width: 140px;
      height: 47px;
      text-align: center;
      line-height: 47px;

      border-radius: 23.5px;
      font-size: 16px;
      color: #fff;
      border: 0.5px solid #fff;
    }
  }
  .tadaySale {
    width: 230px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    position: relative;
    .fl,
    .fr {
      width: 61.5px;
      height: 1px;
      right: 0;
      background: url("#{$imgUrl}img_splitLine.png") no-repeat center center;
      background-size: cover;
      vertical-align: middle;
    }
    .fl {
      transform: rotate(180deg);
      left: 0;
    }
  }
  .thridLogin {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .phoneLogin {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 54px;
      .phoneIcon {
        background: url("#{$imgUrl}icon_yanz.png") no-repeat center center;
        background-size: cover;
        width: 15px;
        height: 25px;
        margin-bottom: 15px;
      }
    }
    .wechatLogin {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: transparent;
      .wechatIcon {
        background: url(#{$imgUrl}icon_wx.png) no-repeat center center;
        background-size: cover;
        width: 30px;
        height: 25px;
        margin-bottom: 7px;
      }
    }
  }
}
</style>
