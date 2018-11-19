<template>
<div class="container" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
  <div class="feedback">
    <p>当前页面</p>
    <input type="text" v-model="feedbackPage" placeholder="系统获取，所在页面位置">    

    <p>反馈类型</p>
    <div class="arrowdown">
      <input class="nobg" @click="togglePopup" type="text" v-model="feedbackType" placeholder="请选择您的反馈类型" disabled="disabled" />
    </div>

    <p>反馈描述</p>
    <!-- textarea文字层级太高 会遮住弹框 -->
    <textarea v-if="!showFeedbackType" v-model="feedbackDesc" placeholder="请输入您的反馈描述"></textarea>
    <view class='rich-text' v-if="showFeedbackType">
      <rich-text :nodes="feedbackDesc">
      </rich-text>
    </view>

    <p>上传相关截图</p>
    <p class="p2">支持：png、jpg、gif图片格式（小于5M)</p>
    <div class="imgContainer">
      <div class="imgitem" v-for="(item,index) in feedbackImgs" :key="index" :style="{backgroundImage:'url(' + item + ')'}">
      </div>
      <div v-if="feedbackImgs&&feedbackImgs.length<3" class="imgitem add" @click="addImg"></div>      
    </div>

    <p>联系方式</p>
    <input type="text" v-model="feedbackName" placeholder="请输入您姓名">
    <input type="text" v-model="feedbackContact" placeholder="请输入电话/微信/QQ">

    <div class="main_large_btn mt30 f18" @click="feedbackSubmit">提交</div>
  </div>
  <van-popup :show="showFeedbackType" @close="togglePopup">
    <div class="popup">
      <h3>请选择反馈类型</h3>

      <div class="item lineTop" v-for="(item, index) in type" :key='index' :class="{'active':item.selected=='1'}" @click="isSelect(item.id,item.selected,index)">
        <div class="left">{{item.name}}</div>
        <div class="right">
          <span class="icon"></span>
        </div>
      </div>
    </div>
  </van-popup>
</div>
</template>
<script>
import {getSystemInfoSync} from "@/utils/wechat";
import { uploadFile, chooseImage, showActionSheet } from "@/utils/wechat";
export default {
  data() {
    return {
      windowHeight:0,
      feedbackPage:"",
      feedbackType:"",
      feedbackTypeId:"",
      feedbackDesc:"",
      feedbackImgs:[],
      feedbackName:"",
      feedbackContact:"",
      showFeedbackType:false,
      type: [{
          id: 1,
          selected:1,
          name: '信息问题',
      }, {
          id: 2,
          selected:0,
          name: '系统问题'
      }, {
          id: 3,
          selected:0,
          name: '服务问题'
      }, {
          id: 4,
          selected:0,
          name: '商品问题',
      }, {
          id: 5,
          selected:0,
          name: '其他',
      }],
      iPhoneshow:false,
      iphoneheight:''
    };
  },
  components: {},
  created() {},
  methods: {
    //添加多张图片
    async addImg(e) {
      const [err, res] = await this._to(
        showActionSheet(["从相册中选择", "拍照"])
      );
      if (res == 0) {
        chooseImage("album").then(async path => {
          const data = await uploadFile(
            "https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=index.upload_img",
            path[0]
          ).then(data=>{
              this.feedbackImgs.push(JSON.parse(data.data).result.url);
              console.log(this.feedbackImgs)
          });
          
        });
      } else {
        chooseImage("camera").then(async path => {
          const data = await uploadFile(
            "https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=index.upload_img",
            path[0]
          ).then(data=>{
              this.feedbackImgs.push(JSON.parse(data.data).result.url);
          });
        });
      }
    }, 
    //关闭弹框
    async togglePopup(e) {
      this.showFeedbackType =!this.showFeedbackType
    },
    async isSelect(id, selected,index) {
      if(selected=="0"){
        this.type.forEach((element,i) => {
          this.type[i].selected=0;
        });
        this.type[index].selected=1;
        this.feedbackType= this.type[index].name;
        this.feedbackTypeId=this.type[index].id;
        this.togglePopup();
      }
    },
    //提交
    async feedbackSubmit(e) {
      if(!this.feedbackPage){
        this.$tips.alert("暂未获取到页面信息");
        return;
      }
      if(!this.feedbackTypeId){
        this.$tips.alert("请选择反馈类型");
        return;
      }
      if(!this.feedbackDesc){
        this.$tips.alert("请输入反馈描述");
        return;
      }
      // this.$tips.alert("“小天”正在完善中，即将开放");
      let that=this;
      await this.$http.getFeedback(this.feedbackPage,this.feedbackTypeId,this.feedbackDesc,this.$store.state.user.userInfo.openid,this.feedbackImgs,this.feedbackName,this.feedbackContact).then(function(res){
          if(res.status==1){
            that.$tips.toast('反馈成功');
            setTimeout(function(){
              that.feedbackPage="";
              that.feedbackType="";
              that.feedbackTypeId="";
              that.feedbackDesc="";
              that.feedbackImgs=[];
              that.feedbackName="";
              that.feedbackContact="";
              that.$router.back();
            },1000)
          }else{
            that.$tips.toast(res.message||"反馈失败");
          }
      });
    }, 
  },
  async onShow() {
    this.feedbackPage=this.$route.query.pageName;   
  },
  async mounted() {
    const systemInfo = getSystemInfoSync();
    if(systemInfo.model=="iPhone X"){
        this.windowHeight=systemInfo.windowHeight-34;
    }else{
        this.windowHeight=systemInfo.windowHeight;
    }  
  },
}
</script>
<style scoped lang='scss'>
.container {
  background: #f2f2f2;
  .feedback{
    width: 100%;
    padding: 0 15px;
    background: #f2f2f2;
    p{
      margin-top:24px;
      font-size: 14px;
      line-height: 1;
    }
    .p2{
      margin-top:10px;
      font-size: 12px;
      color: #9a9a9a;
    }
    
    input{
      display: block;
      width:100%;
      margin-top: 15px;
      height: 40px;
      padding:0 12px;
      background: #ffffff;
      overflow: hidden;
      border-radius: 5px;
    }
    .nobg{background:transparent;}
    .arrowdown{
      background-color:#ffffff;
      background-image:url(#{$imgUrl}img_cut.png);
      background-repeat:no-repeat;
      background-position:right 12px center;
      background-size:12px auto;
    }
    textarea{
      display: block;
      width:100%;
      margin-top: 15px;
      height: 150px;
      padding:12px;
      background: #ffffff;overflow: hidden;
      border-radius: 5px;
    }
    .rich-text{
      display: block;
      width:100%;
      margin-top: 15px;
      height: 150px;
      padding:12px;
      background: #ffffff;
      overflow: hidden;
      border-radius: 5px;
    }
    input:after {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      -webkit-transform: scale(0.5);
              transform: scale(0.5);
      -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
      pointer-events: none;
      box-sizing: border-box;
      border: 0 solid #e8e8e8;
      border-width: 2rpx;
      border-radius: 20rpx;
    }
    textarea:after {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      -webkit-transform: scale(0.5);
              transform: scale(0.5);
      -webkit-transform-origin: 0 0;
              transform-origin: 0 0;
      pointer-events: none;
      box-sizing: border-box;
      border: 0 solid #ff455d;
      border-width: 2rpx;
      border-radius: 20rpx;
    }
    .imgContainer{
      margin-top: 15px;
      display: flex;
      .imgitem{
        width: 94px;
        height: 94px;
        margin-right: 10px;
        background:#ffffff url(#{$imgUrl}icon_upload.png) no-repeat center center;
        background-size: contain;
      }
    }
  }
  .popup{    
    display: block;
    width:280px;
    max-height: 600px;
    margin:0 auto;
    border-radius: 5px;
    overflow: hidden;     
    padding:0 15px;  
    h3{
      line-height: 45px;
      font-size: 18px;      
    }
  }

  .item {
    position: relative;
    height: 45px;    
    display: flex;
    align-items:center;
    .left {
       width: 0%;        
      -webkit-flex: 1;
      flex: 1;
      font-size:16px;
      color:#9a9a9a;
    }
    .right {      
      .icon {
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url(#{$imgUrl}icon_wxz.png) no-repeat center center;
        background-size: cover;
      }
      
    }
  }
  .item.active span{
      background: url(#{$imgUrl}icon_choose.png) no-repeat center
        center;
      background-size: cover;
    }
  .item.active .left{
      color:#ff455d;
    }
}
</style>
