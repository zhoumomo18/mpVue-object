<template>
<div class="container lineTop fullPage">
  <!-- <button v-if="!hasAuthInfo" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" @click="getUserInfo11" style='width:100%;height:100%;position:absolute;opacity:0;z-index:9999999999;'>
  </button> -->
  <div class="slogan"></div>
  <div class="bg"></div>
   <div class="auth">
     <button open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" class="authBtn f18">授权</button>
      <div style="text-align:center;">微信用户一键登录</div>
   </div>

</div>
</template>
<script>
import { login, getUserInfo, getSetting, setStorage } from "@/utils/wechat";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
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
        const data = await getUserInfo();
        this.userInfo = data.userInfo;
      } else {
        console.log("用户还未授权过");
      }
    },
    // bindGetUserInfo(e) {
    //   if (e.mp.detail.rawData) {
    //     const data = e.mp.detail.rawData;
    //     this.userInfo = JSON.parse(data);
    //     setStorage("userInfo", data);
    //     this.$router.push({ path:'/pages/cards/card', isTab: true })
     
        
    //   } else {
    //     console.log("用户按了拒绝按钮");
    //     return;
    //   }
    // }
     async bindGetUserInfo({ mp }) {
      const { detail } = mp;
      if (detail.rawData) {
        debugger
        const encryptedData = detail.encryptedData;
        const iv = detail.iv;
        this.user_Info = detail.userInfo;
        if(!this.$store.state.user.userInfo){
     
              await this.getUserInfo();
               this.getAllProducts();
              
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
       
        authInfo['openid'] = "sns_wa_" + authInfo.openId;
        authInfo.openId = "sns_wa_" + authInfo.openId;
        this.$store.commit("SET_USER_INFO", authInfo);
        this.$store.commit("SET_DO_AUTH", true);
        this.isNoticeAuth = true;
          
      if(authInfo){
          const res = await this.$http.getPersonInfo(authInfo.openId);
        if (res.mobile) {
           this.$router.go(1);
          } else {
            this.$router.push({ path: "/pagesSub/login/bindPhone",query:{index:1} });
          }
      }
   

      } else {
        console.log("用户按了拒绝按钮");
        this.isNoticeAuth = true;
        return;
      }
    },
  },
  mounted() {
    this.hasauth();

    login().then(res => {
      console.log(res);
    });
  },
  onPullDownRefresh() {},
  onShow() {}
};
</script>
<style  scoped lang='scss'>
    .container{
      z-index: 9999;
        .slogan{
            width: 158.5px;
            height: 28px;
            // background: url(#{$imgUrl}img_word.png) no-repeat center center;
            background-size: cover;
          
            position: absolute;
            top: 34px;
            left: 30px;
        }
        .bg{
            width: 267.5px;
            height: 204.5px;
            // background: url(#{$imgUrl}img_backg.png) no-repeat center center;
            background-size: cover;
            margin: 80px 0 50px 0px;
        }

        .auth{
           .authBtn{
              text-align: center;
              border:none;
              outline: none;
              background-color: #ff455d;
              color: #fff;
              height: 47px;
              line-height: 47px;
              text-align: center;
              border-radius: 5px;
              margin: 30px 15px 6px;
              width: 157px;
              display: flex;
              justify-content: center;
           }
        }
       
    }
</style>
