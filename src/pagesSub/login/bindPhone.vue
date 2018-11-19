<template>
<div class="container lineTop">
  <div class="w100">
    <div class="fl jump mr30" @click="pass()">跳过>></div>
    </div>
    <img class="phoneAvatar" :src="avatar" alt="">
    <div class="phone w100 h40 lineBottom">
      <span class="f16 ml15">手机号码：</span>
      <input type="number" v-model="phone" placeholder="请输入11位手机号码哟~">
    </div>
    <div class="verifyImgCode lineBottom w100 h40" v-if="getCodeCount>2">
      <span class="f16 ml15 mr41 h100 mr10">图形验证码：</span>
       <img @click="changeCode()" class="bg mr10 hcenter" :src="codeSrc" alt="">
      <input class="w100p hcenter" type="number" placeholder="输入图形验证码" v-model="verifyImgCode">
    </div>

    <div class="snm lineBottom w100 h40">
      <span class="f16 ml15 h100">验证码：</span>
      <input type="number" placeholder="请输入验证码" v-model="snm">
      <span class="getSnm" @click="show&&getSnm()" :class="{'bge0':!show}">{{show?'获取验证码':count+'s后重新获取'}}</span>
    </div>

    <div class="phone w100 h40 lineBottom">
      <span class="f16 ml15">设置密码：</span>
      <input type="password" placeholder="6-20位字母、数字组合" v-model="pwd1">
    </div>

    <div class="phone lineBottom w100 h40 mt0 ">
      <span class="f16 ml15">再次输入：</span>
      <input type="password" placeholder="请再次输入密码" v-model="pwd2">
    </div>

    <!-- <div class="phone w100 h40 mt10">
      <span class="f16 ml15"> 设置昵称</span>
      <input type="text" placeholder="不能输入特殊符号" v-model="UserName">
    </div> -->


     <div class="loginBtn  f18" @click="doRegister">立即绑定</div>
     <div class="ptotcal w100 ml30">
        <span class="f12 color9a">为了您的账户安全，请绑定您的手机号哦~</span>
     </div>
  
</div>
</template>
<script>
import { getStorage } from "@/utils/wechat";
export default {
  data() {
    return {
      phone: "",
      snm: "",
      pwd1: "",
      pwd2: "",
      codeSrc:"https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=sms.captcha",
      count: "",
      timer: null,
      show: true,
      verifyImgCode:'',
      getCodeCount:0,
      avatar:"/static/images/icon_headportrait.png"
    };
  },
  components: {},
  created() {},
  methods: {
    async doRegister() {
       let that = this
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
     
      const data = await this.$http.doPhoneBind(this.phone, this.snm,this.pwd1, this.$store.state.user.userInfo.openId,0);
        
       if(data.error==92000){
         this.$tips.alert(data.message)
         return
       }
        if(data.error==0){
        this.$router.back();
         return
       }
     if(data.error==92002){
        
        const confirm =   await this.$tips.confirm(data.message)
        if(confirm!='confirm')return
        const resData = await this.$http.doPhoneBind(this.phone, this.snm,this.pwd1, this.$store.state.user.userInfo.openId,1);
       
        
        if(resData.error==0){
         this.$router.back();
        }
   
     }
     if(data.error==90000){
         this.$tips.alert(data.message)
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
      //         
      //         const data = await this.$http.doRegister(postObj, this.openid);
      //         
      //         if(data.error==0){
      //           this.$router.push({ path: '/pages/home/home',isTab: true });
      //           return
      //         }
      //   }
      // }
    },
    async getSnm() {
      
        ++this.getCodeCount
       
      if (this.getCodeCount>3&&!this.$validate.minlength(this.verifyImgCode,1)) {
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

      if(this.getCodeCount>3){
       const res = this.$http.getPhoneBindSms(this.phone,this.$store.state.user.userInfo.openId);
       if(res.error !=0){
          this.$tips.alert(res.message);
          return;
       }
      }else{
        this.$http.getPhoneBindSms(this.phone,this.$store.state.user.userInfo.openId);
      }
    },
    changeCode(){
      this.codeSrc="https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=sms.captcha&a="+Math.random();
     },
     pass(){

       if(this.$route.query.outLogin!='true'){
         
           this.$router.go(parseInt(this.$route.query.index)+1)
       }else{
            this.$router.push({ path: "/pages/home/home", isTab: true });
       }
      
     }
  },
  async mounted() {
    
  },
  onPullDownRefresh() {},
  onShow() {
    this.avatar =this.$store.state.user.userInfo.avatarUrl
  }
};
</script>
<style  scoped lang='scss'>
.container {
  background-color: #ffffff;
  .jump{float: right;margin-top:46rpx;margin-right: 30rpx; text-decoration: underline;color:#ff9b44;}
  .phoneAvatar{display: block;margin: 130rpx auto 60rpx;width: 196rpx;height: 196rpx;border-radius: 100%;}
  input {
    flex:1;width:auto;
  }
  
  .phone {
    background-color: #fff;
    display: flex;
    align-items: center;
  }
  .mr50{margin-right: 55px;}
  .f16{
    width:26%;
  }
  .verifyImgCode{
      display:flex;
      background-color: #fff;
        .bg{
          height: 30px;
          width: 50px;
          display: inline-block;
          left:150px;
        }
        .w100p{
          width: 100px ;
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
      margin-right:30rpx;
      border-radius: 6rpx;
      padding: 0 30rpx;
      height:60rpx;
      line-height: 60rpx;
      white-space: nowrap;
      background: #ff9b44;
      color:#fff;
    }
    .bge0{background: #e0e0e0;}
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
