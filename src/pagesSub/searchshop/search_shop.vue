<template>
<div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
  <!-- <button v-if="!hasAuthInfo" open-type="getUserInfo"  @getuserinfo="bindGetUserInfo" @click="getUserInfo11" style='width:100%;height:100%;position:absolute;opacity:0;z-index:9999999999;'>
    </button> -->
     <div  @click="isBuild" class="fansAuth"></div>
    <!--<tab_bar cur_index="1"></tab_bar>-->
   	<goAuth></goAuth> 
   	   <div class="w100 s_box" style="background: #fff;padding:15px">      
            	<div class="searchBox">
								<span class="searchIcon mr15"></span>
								<input type="text" class="search" placeholder-class="placeholder" @focus='searchFocus' @blur="searchBlur" placeholder="搜本地商场、品牌优惠">
				
							</div>
							<ul class="fr" @click="shoptogle()">
									<li class="shop_home">
										<span>
											<img src="../../../static/images/btn_triangle.png" alt="" />
										</span>
										店铺
									</li>
									<li class="shop_home_02" v-show="toglestatus">商品</li>
							</ul>
                        <!--<span class="carIcon">
                        	
                        </span>-->
    	</div>
    	<div class="w100">
    			  <div class="serch_like w100">           
  					<h3>热门搜索:</h3>
		  			<div class="s_buttons">
		  				<span @click="$router.push({ path:'/pagesSub/searchshop/searchresult'})">阿迪王</span>
		  				<span>耐克</span>
		  			</div>
		  			</div>
			    	<div class="w100 search_history">
			    		<h3>搜索历史：</h3>
			    		<ul>
			    			<li>阿迪王男装</li>
			    			<li>阿迪王男装</li>
			    			<li>阿迪王男装</li>
			    		</ul>
			    		<button>清除搜索历史</button>
			    		
			    	</div>
			</div>

</div>
</template>
<script>
import { login, getUserInfo, getSetting, setStorage } from "@/utils/wechat";
import tab_bar from '@/components/tab_bar';
import sercah from '@/components/sercah';
export default {
  data() {
			return{
				toglestatus:false,
				iPhoneshow:false,
      	iphoneheight:''
			}
    
  },
  components: {
    tab_bar,
    sercah
  },
  created() {

      this.hasauth();
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
    isBuild(){
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
    onAnimationfinish() {
      console.log("滑动完成.....");
    },
    shoptogle(){
			this.toglestatus= !this.toglestatus;
		},
  },
 async mounted() {
      const [err ,res ] = await this._to(this.$http.goodsSearchList('测试',this.$store.state.user.userInfo.openId ))
      this.iphone_xsp();
//    debugger
  },
  computed: {


  },

};
</script>
<style  scoped lang='scss'>
.container {
  background-color: #f2f2f2;
  padding-bottom: 50px;
  .search_history{
  	
  	background: #fff;
  	padding:15px;
  	margin-top:10px;
  	padding-bottom:36%;
  	h3{
  		
		height: 30px;
		font-family: PingFang-SC-Regular;
		font-size: 16px;
		font-weight: normal;
		line-height: 30px;
		letter-spacing: 0px;
		color: #323232;
  	}
  	ul>li{
  		height:40px;
  		line-height: 40px;
  		font-size: 14px;
  		color: #9a9a9a;
  		border-bottom:0.5px solid rgba(232, 232, 232, 0.9);

  	}
  	button{
  	width: 140px;
	height: 40px;
	border-radius: 20px;
	border: solid 0.5px #e8e8e8;
	margin:32px auto;
	background: #fff;
	color: #9a9a9a;
	font-size: 16px;
	
  	}
  }
  	.serch_like{
  		background:#fff;
  		padding:15px;
  		padding-top:0;
  		h3{
  			margin-top:15px;
			height: 30px;
			font-family: PingFang-SC-Regular;
			font-size: 16px;
			font-weight: normal;
			line-height: 30px;
			letter-spacing: 0rem;
			color: #323232;
  		}
  		.s_buttons{
  			span{
  				padding:0 15.5px;
  				margin-right:14px;
  				margin-top:5px;
  			display: inline-block;
  			/*width: 71px;*/
			height: 26px;
			
			line-height: 26px;
			border-radius: 5px;
			border: solid 0.5px #323232;
			font-size: 14px;
			text-align: center;	
  			}
  		
  		}
  		}
	 .searchBox {
             /* background: #f2f2f2;*/
        display: inline-block;
				height: 40px;
				line-height: 38px;
				border: solid 0.5px #b7b7b7;
				width: 285px;
			
				padding-left: 14px;
            /*  margin-left:15px;*/

              .searchIcon {
                display: inline-block;
                width: 13.5px;
                height: 14px;
                background: url("#{$imgUrl}search.png") no-repeat center center;
                background-size: cover;
                vertical-align: middle;
              }
              .search {
                display: inline-block;
                width: 170px;
                height: 20px;
                line-height: 20px;
                min-height: 20px;
                vertical-align: middle;
                
              }
   
            }
            .shop_home{
									width:60px;
									height:40px;
									background: #ff455d;
									position: relative;
									left:-0.5px;
									top:0px;
									text-align: center;
									color:#fff;
									font-size: 14px;
									line-height: 40px;
									padding-right:8px;
									span{
										display: inline-block;
										width:12px;
										height:12px;
										position:absolute;
										top:0px;
										right:5px;
										img{
											width:96%;
											height:9px;
					
										}
									}
				
			}
							.shop_home_02{
								width:60px;
								height:40px;
								background: #F5F5F5;
								position: absolute;
								/*left:-15.5px;
								top:9px;*/
								text-align: center;
								color:#323232;
								font-size: 14px;
								line-height: 40px;
							}
            .carIcon {
              position: relative;
              display: inline-block;
              width: 21px;
              height: 22px;
              background: url("#{$imgUrl}icon_screen.png") no-repeat center center;
              background-size: cover;
              vertical-align: middle;
              .count{
                position: absolute;
                width: 15px;
                height: 15px;
                right: -10px;
                top:-6px;
                border-radius: 50%;
                background-color: #ff455d;
                color:#fff;
                text-align: center;
                line-height: 15px;
                font-size: 10px;
              }
            }


}
</style>
