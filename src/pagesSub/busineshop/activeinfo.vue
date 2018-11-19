<template>
	<div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
		<div class="bgc_img">
			<img src="../../../static/images/img_xiangq_backg@2x.png" alt="" />
			<button @click="$router.push({ path:'/pages/user/feedback',query:{pageName:$router.currentRoute.fullPath}})">
				<div></div>
				<span class="color88 f12">报错</span>
			</button>
			<button class="button_2" @click="pointlike">
				<div></div>
				<span class="color88 f12">{{infoList.star?infoList.star:''}}</span>
			</button>
			<div class="head_mains">
				<div class="head_ico" v-if="infoList.merchlogo">
					<img :src="infoList.merchlogo" alt="" />
				</div>
				<div class="head_ico" v-else :style="{backgroundImage:'url(' + infoList.clusterlogo + ')'}">
					<!-- <img src="../../../static/images/logo_start_icon_red.png" alt="" /> -->
				</div>
				<div class="text_info">
					<div class="m_text">
						<p class="color88 f20 bold mr10 over_hidden">{{infoList.title}}</p>
					</div>
					<div class="m_time f12">
						截止日期:{{end_time}}（指定商品除外）
					</div>
				</div>
			</div>

		</div>
		<div class="mains">
			<div class="mains_box">
				<ul class="mains_info" v-if="infoList.is_showcontent==0">
					<li>
						<div class="infos">
							<i>活动说明</i>
						</div>
						<div class="info_detil">
							<wxParse :content="infoList.content" @preview="preview" @navigate="navigate" />
						</div>
					</li>
					<li>
						<div class="infos">
							<i>活动图片</i>
						</div>
						<div class="info_detil"   @click="openimg(infoList.pic)">
							<img mode="widthFix" :src="infoList.pic" alt="" style="width:100%;"/>
						</div>
					</li>
				</ul>
				<ul class="mains_info" v-else>
					<div>
						<wxParse :content="infoList.content" @preview="preview" @navigate="navigate" />
					</div>
				</ul>

			</div>
		</div>

	</div>
</template>
<script>
import wxParse from "mpvue-wxparse";
import { login, getUserInfo, getSetting, setStorage } from "@/utils/wechat";

export default {
  data() {
    return {
      iPhoneshow: false,
      iphoneheight: "",
      infoList: {},
      end_time: "",
      picarr:[]
    };
  },
  components: {
    wxParse
  },
  
 
  onShareAppMessage(options) {
      return {
        title: (this.$store.state.user.userInfo?this.$store.state.user.userInfo.nickName:'') + '给您分享天天逛街的商品...',
        path: this.$route.fullPath
      }
  },
  methods: {
    iphone_xsp() {
      if (
        this.$store.state.user.systemInfo &&
        this.$store.state.user.systemInfo.model == "iPhone X"
      ) {
        this.iPhoneshow = true;
        this.iphoneheight =
          this.$store.state.user.systemInfo.windowHeight + 50 + "px";
      }
    },
    async detilinfo() {
      let openId = this.$store.state.user.userInfo
        ? this.$store.state.user.userInfo.openid
        : null;

      let ProinfoList;
      if (this.$route.query.cluster == 1) {
        ProinfoList = await this.$http.clusteractivedetil(
          this.$route.query.id,
          openId
        );
      } else {
        ProinfoList = await this.$http.activedetil(
          this.$route.query.id,
          openId
        );
      }

      if (ProinfoList.result.result) {
        this.infoList = ProinfoList.result.result;
//      this.picarr.push(this.infoList.pic);
//      console.log(this.picarr,888);
        this.end_time = this._U.formatTime(this.infoList.end_time * 1000, ".");
      } else {
        this.infoList = {};
        this.end_time = "";
      }
    },
    async pointlike() {
      if (this.$store.state.user.loginStatus == false) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      }
      if (this.infoList.user_like == 0) {
		let likeinfo;
		if (this.$route.query.cluster == 1) { 
		//   商场活动
		likeinfo = await this.$http.clusteractivelike(
		this.$route.query.id,
		this.$store.state.user.userInfo.openid
		);
		}else{
			//   店铺活动
		likeinfo = await this.$http.activelike(
		this.$route.query.id,
		this.$store.state.user.userInfo.openid
		);
		}
		if (likeinfo.status == 1) {
			this.infoList.user_like = 1;
			this.infoList.star = parseInt(this.infoList.star)+1;
        	this.$tips.toast("已点赞");
        }else{
        	this.$tips.toast("点赞失败");
		}        
      } else {
        this.$tips.toast("已点过赞");
      }
   },
	openimg(k){
		
		wx.previewImage({
//		  current:this.picarr[index],
		  urls:[k]// 需要预览的图片http链接列表
		})
	}
   
  },
  mounted() {
    this.iphone_xsp();
    
  	this.detilinfo();
    
  },
  computed: {},

  async onShow() {
//this.infoList='';
  	
  }
};
</script>
<style scoped lang='scss'>
@import url("~mpvue-wxparse/src/wxParse.css");
.container {
  background-color: #f2f2f2;
  background-color: #fff;
  padding-bottom: 50px;
  .bgc_img {
    width: 100%;
    height: 210px;
    position: relative;
    overflow: hidden;
    .head_mains {
      display: flex;
      align-items: center;
      height: 50.5px;
      width: 100%;
      left: 0;

      position: absolute;
      bottom: 90px;
      left: 0px;
      padding: 0 15px;
      .head_ico {
        z-index: 3;
        width: 50.5px;
        height: 50.5px;
        border-radius: 50%;
        overflow: hidden;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .text_info {
        text-align: left;
        padding-left: 10px;
        .m_text {
          margin: 0 auto;

          p {
            display: inline-block;
            font-family: PingFang-SC-Bold;
            font-stretch: normal;
            letter-spacing: 2px;
            width: 200px;
            span {
              font-family: PingFang-SC-Bold;
            }
          }
        }
        .m_time {
          text-align: left;
          color: #e8e8e8;
        }
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    button {
      z-index: 3;
      padding: 0;
      margin: 0;
      background: rgba(0, 0, 0, 0);
      position: absolute;
      top: 15px;
      right: 0px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      width: 50px;
      height: 50px;
      div {
        width: 15px;
        height: 15px;
        z-index: 3;
        margin: auto;
        background: url("#{$imgUrl}icon_error reporting @2x.png") no-repeat 100%
          100%;
        background-size: cover;
      }
      span {
        position: relative;
        top: -6rpx;
      }
    }
    .button_2 {
      top: 15px;
      right: 34px;

      div {
        width: 15px;
        height: 15px;
        z-index: 3;
        margin: auto;
        background: url("#{$imgUrl}icon_give a thumb up@2x.png") no-repeat 100%
          100%;
        background-size: cover;
      }
    }
  }
  .mains {
    background: rgba(255, 255, 255, 1);
    position: relative;
    top: -45px;
    z-index: 2;
    width: 345px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0px 2px 2.8px 0.2px rgba(0, 0, 0, 0.1);
    border-radius: 10px 10px 0 0;

    .mains_box {
      .mains_info {
        width: 100%;
        background: #fff;
        padding: 0 18.3px;
        .infos {
          margin: 15.5px 0;
          i {
            display: inline-block;
            color: rgba(108, 108, 108, 1);
            font-size: 12px;
          }
        }
        .info_detil {
          font-size: 14px;
          overflow: hidden;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(50, 50, 50, 1);
          line-height: 20px;
          padding-bottom: 10px;
          img{
          	width:100%;
          }
        }
      }
    }
  }
}
</style>