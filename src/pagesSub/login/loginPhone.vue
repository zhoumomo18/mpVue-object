<template>
  <div class="container lineBottom">
    <div class="phone w100 h40 lineBottom">
      <span class="f16 ml15 mr25"> 手机号码</span>
      <input type="number" v-model="phone" placeholder="请输入手机号码">
    </div>
    <div class="verifyImgCode lineBottom w100 h40" v-if="getCodeCount>2">
      <span class="f16 ml15 mr41 h100 mr10">图形验证码</span>
      <img @click="changeCode()" class="bg mr10 hcenter" :src="codeSrc" alt="">
      <input class="w100p hcenter" type="number" placeholder="输入图形验证码" v-model="verifyImgCode">
    </div>
    <div class="snm w100 h40">
      <span class="f16 ml15 mr41 h100">验证码</span>
      <input type="number" placeholder="短信验证码" v-model="snm">
      <span class="getSnm lineLeft" @click="show&&getSnm()" :class="{'color9a':!show}">{{show?'获取验证码':count+'s后重新获取'}}</span>
    </div>

    <div class="loginBtn  f18 " @click="doLogin()">登录</div>
    <div class="ptotcal w100 ml30">
      <span class="f12 color9a">登录即视为同意</span>
      <span class="f12 colorf45d"> 《天天逛街用户协议》</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      snm: "",
      verifyImgCode: "",
      codeSrc:
        "https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=sms.captcha",
      count: "",
      timer: null,
      show: true,
      getCodeCount: 0
    };
  },
  components: {},
  created() {},
  methods: {
    async doLogin() {
      if (!this.$validate.phone(this.phone)) {
        this.$tips.alert("请输入11位手机号");
        return;
      }
      if (
        !this.$validate.isNum(this.snm) &&
        !this.$validate.rangelength(this.snm, 5, 5)
      ) {
        this.$tips.alert("请输入短信验证码");
        return;
      }

      let res = await this.$http.doPhoneSmsLogin(this.phone, this.snm);

      if(res.error != 0){
        this.$tips.alert(res.message);
        return;
      }
      res.member["authkey"] = res.token;
      res.member.openid = res.member.openid;
      res.member["openId"] = res.member.openid;
      
      this.$store.commit("SET_USER_INFO", res.member);
      this.$store.commit("SET_LOGIN_STATUS", "wap");
      set ('userInfo', res.member, 2592000000)
      set ('loginStatus', 'wap', 2592000000)

      if(this.$store.state.user.handleLoginOut){
        this.$store.commit("SET_HANDLE_LOGIN_OUT", false);  
        set ('handleLoginOut', false, 2592000000)
        this.$router.push({ path: "/pages/user/user", isTab: true });
      }else{
        this.$store.commit("SET_HANDLE_LOGIN_OUT", false);
        set ('handleLoginOut', false, 2592000000)
        this.$router.go(2);
      }
    },
    async getSnm() {
      ++this.getCodeCount;

      if (
        this.getCodeCount > 3 &&
        !this.$validate.minlength(this.verifyImgCode, 1)
      ) {
        this.$tips.alert("请输入图形验证码");
        return;
      }
      if (!this.$validate.phone(this.phone)) {
        this.$tips.alert("请输入11位手机号");
        return;
      }

      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
      if (this.getCodeCount > 3) {
        const res = this.$http.getRegisterSms(this.phone, this.verifyImgCode);
        if (res.error != 0) {
          this.$tips.alert(res.message);
          return;
        }
      } else {
        const res = this.$http.getRegisterSms(this.phone);
        if (res.error != 0) {
          this.$tips.alert(res.message);
          return;
        }
      }
    },
    changeCode() {
      this.codeSrc =
        "https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=sms.captcha&a=" +
        Math.random();
    }
  },
  onPullDownRefresh() {},
};
</script>
<style  scoped lang='scss'>
.container {
  background-color: #f2f2f2;
  .phone {
    margin-top: 10px;
    background-color: #fff;
    display: flex;
    align-items: center;
    input {
      width: 60%;
    }
  }
  .snm {
    background-color: #fff;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    input {
      width: 60%;
    }
    .mr41 {
      white-space: nowrap;
    }
    .getSnm {
      padding: 0 30px;
      align-self: flex-end;
      height: 100%;
      white-space: nowrap;
    }
  }
  .verifyImgCode {
    display: flex;
    background-color: #fff;
    .bg {
      height: 30px;
      width: 50px;
      display: inline-block;
      left: 150px;
    }
    .w100p {
      margin-left: 20px;
      right: 30px;
    }
  }
  .loginBtn {
    background-color: #ff455d;
    color: #fff;
    height: 47px;
    line-height: 47px;
    text-align: center;
    border-radius: 5px;
    margin: 30px 15px 6px;
    width: calc(100% - 30px);
    display: flex;
    justify-content: center;
  }
  .ptotcal {
    .colorf45d {
      border-bottom: 1px solid #ff455d;
    }
  }
}
</style>
