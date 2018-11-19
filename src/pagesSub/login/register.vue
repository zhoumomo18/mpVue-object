<template>
  <div class="container">
    <div class="phone w100 h40 lineBottom">
      <span class="f16 ml15 mr25">手机号码</span>
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

    <div class="phone w100 h40 lineBottom">
      <span class="f16 ml15 mr25"> 设置密码</span>
      <input type="password" placeholder="6-20位字母、数字组合" v-model="pwd1">
    </div>

    <div class="phone w100 h40 mt0 ">
      <span class="f16 ml15 mr25"> 再次输入</span>
      <input type="password" placeholder="请再次输入密码" v-model="pwd2">
    </div>

    <!-- <div class="phone w100 h40 mt10">
      <span class="f16 ml15 mr25"> 设置昵称</span>
      <input type="text" placeholder="不能输入特殊符号" v-model="UserName">
    </div> -->

    <div class="loginBtn  f18" @click="doRegister">注册</div>
    <div class="ptotcal w100 ml30" @click="$router.push({ path:'/pagesSub/login/userProtect'})">
      <span class="f12 color9a">注册即视为同意</span>
      <span class="f12 colorf45d"> 《天天逛街用户协议》</span>
    </div>

  </div>
</template>
<script>
import { getStorage, set } from "@/utils/wechat";
export default {
  data() {
    return {
      phone: "",
      snm: "",
      pwd1: "",
      pwd2: "",
      codeSrc:
        "https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=sms.captcha",
      count: "",
      timer: null,
      show: true,
      verifyImgCode: "",
      getCodeCount: 0
    };
  },
  components: {},
  created() {},
  methods: {
    async doRegister() {
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
      if (
        !this.$validate.pwd(this.pwd1) &&
        !this.$validate.rangelength(this.pwd1, 6, 18)
      ) {
        this.$tips.alert("6-20位字母、数字组合");
        return;
      }
      if (!this.$validate.equalTo(this.pwd1, this.pwd2)) {
        this.$tips.alert("两次密码不一致");
        return;
      }
      // if (!this.$validate.minlength(this.UserName, 1)) {
      //   this.$tips.alert("请输入昵称");
      //   return;
      // }

      const data = await this.$http.doRegister(this.phone, this.pwd1, this.snm);

      if (data.error == 0) {
        this.$http.doPhonePwdLogin(this.phone, this.pwd1).then(res => {
          res.member["authkey"] = res.token;

          res.member["openId"] = res.member.openid;
          this.$store.commit("SET_HANDLE_LOGIN_OUT", false);
          this.$store.commit("SET_USER_INFO", res.member);
          this.$store.commit("SET_LOGIN_STATUS", "wap");
          set ('handleLoginOut', false, 2592000000)
          set ('userInfo', res.member, 2592000000)
          set ('loginStatus', 'wap', 2592000000)          

          if (res.error != 0) {
            return this.$tips.alert(res.message);
          }
          this.$router.go(2);
        });
      }else{
        this.$tips.alert(data.message);
        return
      }
      // if(data.error =='92000'&& data.message=='此手机号已与当前账号绑定'){
      //     this.$tips.alert(data.message)
      //     return
      // }
      // if ( data.error =='92000'&&
      //   data.message ==
      //   "此手机号已通过其他方式注册, 如果继续将会合并账号信息, 确定继续吗？"
      // ) {
      //   let res = "";
      //   try {
      //     res = await this.$tips.confirm( data.message)
      //   } catch (err) {
      //     console.log(err);
      //   }
      //   if (res == "confirm") {
      //         postObj['confirm']= '1';
      //         debugger
      //         const data = await this.$http.doRegister(postObj, this.openid);
      //         debugger
      //         if(data.error==0){
      //           this.$router.push({ path: '/pages/home/home',isTab: true });
      //           return
      //         }
      //   }
      // }
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
        this.$http.getRegisterSms(this.phone);
      }
    },
    changeCode() {
      this.codeSrc =
        "https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=sms.captcha&a=" +
        Math.random();
    }
  },
  async mounted() {},
  onPullDownRefresh() {},
  onShow() {}
};
</script>
<style  scoped lang='scss'>
.container {
  input {
    width: 63%;
  }
  background-color: #f2f2f2;
  .phone {
    margin-top: 10px;
    background-color: #fff;
    display: flex;
    align-items: center;
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
      width: 100px;
      margin-left: 20px;
      right: 30px;
    }
  }
  .snm {
    background-color: #fff;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
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
