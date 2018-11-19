<template>
<div class="container">
      <!-- <div>
       没有订单
      </div> -->
<isLoading :isLoading='isLoading'></isLoading>
      <div class="swiper">
          <div class="navbar">
                <block v-for="(item,index) in tabs" :key="index">
                  <div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick">
                    <div class="navbar_title" :class="{'selective':activeIndex == index}">{{item.name}}</div>
                  </div>
                </block>
                <div class="navbar_slider" :class="navbarSliderClass"></div>
          </div>
          <swiper class="content" :duration="50" :style="{ height: scrool_swper + 'px' }" @change="swiperChange" :current="currentTab" @animationfinish="onAnimationfinish">
              <swiper-item>
              	<scroll-view scroll-y :style="{ height: scrool_swper + 'px' }">
                <div id='item1' class="expressContent">
                    <div class="newAdress" @click="$router.push({ path:'/pages/user/myAdress'})">
                        <div class="add"> </div>
                        <div v-if="shopGoodsInfo.address==false " class="addName">新建收货地址</div>
                        <div v-if="shopGoodsInfo&&shopGoodsInfo.address&&shopGoodsInfo.address.id!=null" class="addName">
                         {{shopGoodsInfo.address.realname}}{{shopGoodsInfo.address.mobile}}
                          {{shopGoodsInfo.address.city}}{{shopGoodsInfo.address.area}}{{shopGoodsInfo.address.street}}
                        
                        </div>
                        <div class="arrow"></div>
                    </div>
                    <div class="goodsDetail" >
                      <div class="item" v-for="(i,index) in shopGoodsList" :key='index'>
                         <div class="shopName lineBottom" >
                              <div class="logo" >
                                <wux-image wux-class="image" shape="circle" :src="i.logo">
                                </wux-image>
                              </div>
                              <div class="name">{{i.shopname}}</div>
                        </div>
                          <div  v-for="(item,indexIn) in i.goods" :key='indexIn'
                           @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item.id }})"
                          >
                             <GoodsDetail  
                            :goodsImg='item.thumb'
                            :goodsTitle='item.title'
                            :goodsNum="item.total"
                            :goodsPrice="item.price"
                            :goodsColor="item.color"
                            :goodsSize="item.size"
                          ></GoodsDetail>
                          </div>
                      </div>
                      
                     
                        <div class="sendOption lineBottom h40">
                            <div class="fl ml15">配送方式</div>
                            <div class="fr mr15 ">
                              <span class="color9a mr8">${{shopGoodsInfo?shopGoodsInfo.dispatch_price:''}}</span>
                              <span class="color9a">快递发货</span>
                            </div>
                        </div>
                        <div class="leaveMsg h40 lineBottom">
                           <div class="fl ml15 mr35">买家留言</div>
                            <div class="fl mr15 msgInput_wrap">
                              <input class="msgInput center" v-model="msg" type="text" placeholder="给买家留言">
                            </div>
                        </div>
                        <div class="total h40 lineBottom">
                            <div class="fl ml15">合计：</div>
                            <div class="fr mr15">
                              <span class="colorf45d">￥{{shopGoodsInfo?shopGoodsInfo.goodsprice:''}}</span>
                            </div>
                        </div>
                        <div class="offPrice h40 lineBottom" v-if="shopGoodsInfo.discountprice">
                            <div class="fl ml15">会员优惠</div>
                            <div class="fr mr15">
                              <span class="color9a">￥{{shopGoodsInfo?shopGoodsInfo.discountprice:''}}</span>
                            </div>
                        </div>
                        <div class="offPrice h40 lineBottom" v-if="shopGoodsInfo.isdiscountprice">
                            <div class="fl ml15">促销优惠</div>
                            <div class="fr mr15">
                              <span class="color9a">￥{{shopGoodsInfo?shopGoodsInfo.isdiscountprice:''}}</span>
                            </div>
                        </div>
                        <div class="offPrice h40 lineBottom" v-if="shopGoodsInfo.enoughmoney">
                            <div class="fl ml15">商城单笔满 <span class="colorf45d">{{shopGoodsInfo?shopGoodsInfo.enoughmoney:''}}</span>元立减 </div>
                            <div class="fr mr15">
                              <span class="color9a">-￥{{shopGoodsInfo?shopGoodsInfo.enoughdeduct:''}}</span>
                            </div>
                        </div>
                        <div class="offPrice h40 lineBottom" v-if="shopGoodsInfo.merch_enoughmoney">
                            <div class="fl ml15">商户单笔满 <span class="colorf45d">{{shopGoodsInfo?shopGoodsInfo.merch_enoughmoney:''}}</span>元立减 </div>
                            <div class="fr mr15">
                              <span class="color9a">-￥{{shopGoodsInfo?shopGoodsInfo.merch_enoughdeduct:''}}</span>
                            </div>
                        </div>
                        <div class="offSaleCard h40 lineBottom mt20 mb10"
                          @click="$router.push({ path:'/pagesSub/voucher/voucher'})"
                        >
                            <div class="fl ml15">优惠券</div>
                            <div class="fr mr39">
                              <span class="color9a">使用优惠券</span>
                            </div>
                            <div class="arrow"></div>
                        </div>
                        <div class="offPrice h40 lineBottom">
                            <div class="fl ml15">优惠金额</div>
                            <div class="fr mr15">
                              <span class="color9a">￥0.00</span>
                            </div>
                        </div>
                        <div class="postage h40 lineBottom">
                            <div class="fl ml15">运费</div>
                            <div class="fr mr15">
                              <span class="color9a">￥{{shopGoodsInfo?shopGoodsInfo.dispatch_price:''}}</span>
                            </div>
                        </div>

                    </div>
                    <div class="submit">
                        <div class=" h50 bgcfff lineTop">
                            <div class="actPay fl">
                                <span class="mr15 ">实付</span>
                                <span class="colorf45d f16">￥{{shopGoodsInfo?shopGoodsInfo.realprice:''}}</span>
                            </div>
                            <div class="submitOrder hcenter" @click.stop="goPay">
                                提交订单
                            </div>
                       </div>
                        <div v-if="iPhoneshow" class="h34"></div>
                    </div>
                </div>
                </scroll-view>
              </swiper-item>
               <swiper-item>
                  <div id='item2' class="storePicking" >
                      <div class="receiver h40 lineBottom">
                          <div class="fl ml15 mr40">收货人姓名：</div>
                          <div class="fl">XXXXXXXXXX</div>
                      </div>
                      <div class="receiverPhone h40 lineBottom">
                          <div class="fl ml15 mr40">收货人电话：</div>
                          <div class="fl">XXXXXXXXXX</div>
                      </div>
                      <div class="shopName h40">
                          <div class="itemName">
                              <span class="triangle"></span>
                              <span>XXXXXXXXX</span>
                          </div>
                          <div class="itemName">
                              <span class="triangle"></span>
                              <span>XXXXXXXXX</span>
                          </div>
                      </div>
                      <div class="protocol h40 ml15">
                               <span class="selectIcon"></span>
                               <span>我已阅读并同意  <span class="notice"> 《门店自提须知》 </span> </span>
                      </div>

                  </div>
              </swiper-item>
          </swiper>
     </div>
     
  </div>
</template>
<script>
import GoodsDetail from '@/components/goodsDetail.vue'
import isLoading from "@/components/isLoading";
import { showActionSheet ,requestPayment} from "@/utils/wechat";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      tabs: [
        {
          name: "快递送货",
          type: "1",
          checked: true
        },
        {
          name: "门店自取",
          type: "2",
          checked: true
        }
      ],
      activeIndex: 0,
      currentTab: 0,
      winWidth: 0,
      winHeight: 0,
      shopGoodsList:null,
      shopGoodsInfo:'',
      exaHeight:0,
      msg:'',
      scrool_swper:'',
      iPhoneshow:false,
      iphoneheight:''
    };
  },
  components: {
    isLoading,
    GoodsDetail
  },
  created() {
    
    
  },
  methods: {
     ...mapActions(["getAllProducts"]),
    tabClick(e) {
      this.activeIndex = e.currentTarget.id;
      this.currentTab = this.activeIndex;
    },
     iphone_xsp(){
    	  if(this.$store.state.user.iphoneX){
  					this.iPhoneshow=true;
  			}
    	  
    },
    swiperChange(e) {
      this.currentTab = e.mp.detail.current;
      this.activeIndex = this.currentTab;
    },
    onAnimationfinish() {
      console.log("滑动完成.....");
    },
    async goPay() {
  	if(this.shopGoodsInfo.address==false){
				this.$tips.toast('请添加收货地址',function(){},'none');
    		
    		return;
  	}
     const [err, res] = await this._to(showActionSheet(['微信支付', '余额支付']))
      if(res==0){
        console.log('微信支付')

         console.log( this.shopGoodsList[0].goods)
         this.$http.submitOrder(
          JSON.stringify(this.shopGoodsList[0].goods),
          this.shopGoodsInfo.address.id,
          this.$route.query.from=='fromCar'?1:0,
          this.msg,
          this.$store.state.user.userInfo.openId
        ).then(data=>{
             this.getAllProducts()
             return this.$http.orderPay(data.orderid,this.$store.state.user.userInfo.openId)
        }).then(payInfo=>{
            requestPayment(
              payInfo.wechat.payinfo.timeStamp,
              payInfo.wechat.payinfo.nonceStr,
              payInfo.wechat.payinfo.package,
              payInfo.wechat.payinfo.signType,
              payInfo.wechat.payinfo.paySign
            )
        })
     
      // const payInfo =   await this._to()
      // const  wechatPay = await requestPayment(
      //   payInfo.wechat.payinfo.timeStamp,
      //   payInfo.wechat.payinfo.nonceStr,
      //   payInfo.wechat.payinfo.package,
      //   payInfo.wechat.payinfo.signType,
      //   payInfo.wechat.payinfo.paySign
      // )
     
        
      }else if(res==1){
        this.$tips.alert('您当前余额为0！')
      }
    },
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        
        this.winHeight = this.shopGoodsList?this.shopGoodsList.length*(this.shopGoodsList[0].goods.length*104 +40) +340 +this.exaHeight:0
        return "navbar_slider_0";
      }
      if (this.activeIndex == 1) {
        var res = wx.getSystemInfoSync();
        this.winWidth = res.windowWidth;
        
        this.winHeight = res.windowHeight-60;
        return "navbar_slider_1";
      }
    },
    contentHeight() {
      return this.winHeight + "px";
    },
 isLoading(){
				return this.$store.state.user.isLoading
				}
  },
  mounted() {
		this.iphone_xsp();
  },
  onPullDownRefresh() {},
 async onShow() {
    this.exaHeight =0
    let data =null
  	
     const arr =[
       this.$store.state.products.createOrderInfo.id,
       this.$store.state.products.createOrderInfo.currentNum,
       this.$store.state.products.createOrderInfo.optionid,
       this.$store.state.user.userInfo.openId
     ] 
this.$store.commit('SET_IS_LOADING',false)
    this.$store.commit('SET_IS_LOADING',true)
      if(this.$route.query.from){
        this.$http.createOrder(...arr).then(
           data=>{
              
         this.shopGoodsList = data.goods
          this.shopGoodsInfo =data
      console.log(this.shopGoodsInfo,8);
         
      
           }
        )
        
        
         
      }else{
       this.$http.createOrder('','','',this.$store.state.user.userInfo.openId).then(
         data=>{
            this.shopGoodsList = data.goods 
            
             this.shopGoodsInfo =data
 
             console.log(this.shopGoodsInfo,9);
         },err=>{

         }
       )
         
           
      }
      this.$store.commit('SET_IS_LOADING',false)
     let res2 = wx.getSystemInfoSync();
			
			this.scrool_swper=res2.windowHeight - 60;
     
 }
};
</script>
<style  scoped lang='scss'>

.container {
  background-color: #f2f2f2;
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
      border-bottom: 2px solid #ff455D;
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
        .selective{
          color: #ff455D;
        }
        .navbar_item_on {
          color: #ff455D;
        }
      }
      .navbar_slider {
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 6px;
        height: 4px;
        border-radius: 50%;
        background-color: #ff455D;

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

        .expressContent{
            height: 100%;
            .newAdress{
              position: relative;
              height: 40px;
              background: #fff;
              display: flex;
              margin-bottom: 10px;
              .add{
                width: 20px;
                height: 20px;
                margin: 10px 23px 0 15px;
                background: url('#{$imgUrl}icon_new-built.png') no-repeat center center;
                background-size: cover;
              }
              .addName{
                line-height: 40px;
                font-size: 14px;
              }
              .arrow{}
            }
            .goodsDetail{
              .shopName {
                  background: #fff;
                  display: flex;
                  height: 40px;
                  .logo {
                    width: 21px;
                    height: 20px;
                    margin: 10px 22px 0 15px;

                    // background: url("../../static/images/icon_default.png") no-repeat center
                    //   center;
                    // background-size: cover;
                    img {
                      width: 100%;
                      height: 100%;
                    }
                  }
                  .name {
                    line-height: 40px;
                    font-size: 14px;
                  }
                }
              &>div{
                background: #fff;
              }
              // .shopName{
                 
              //     display: flex;
              //     height: 40px;
              //     .logo{
              //           width: 21px;
              //           height: 20px;
              //           margin: 10px 22px 0 15px;
                       
              //           background: url('#{$imgUrl}icon_default.png') no-repeat center center;
              //           background-size: cover;
              //     }
              //     .name{
              //       line-height: 40px;
              //       font-size: 14px;
              //     }
              // }
              // .goods{
                   
              //      display: flex;
              //   .goodsLogo{
              //     position: absolute;
              //     width: 84px;
              //     height: 84px;
              //     top:10px;
              //     left: 15px;
              //     background: url('#{$imgUrl}img_mensclothing.png') no-repeat center center;
              //     background-size: cover;

              //   }
              //   .goods_detail_wrap{
              //       padding-bottom: 10px;
              //       margin-left:110px; 
              //       width: 100%;
              //     .titleNum{
              //          margin-top: 20px;
              //         padding-left: 15px;
              //         .title{}
              //         .num{
              //           float: right;
              //         }
              //     }
              //     .price{
              //       color: #ff455D;
              //       font-size: 16px;
              //       margin-top: 10px;margin-bottom: 10px;
              //     }
              //     .colorSize{
                   
              //      span{
              //        margin-right: 15px;
              //      }
              //     }
              //   }
         
              // }
              .sendOption{
               
               

              }
              .leaveMsg{
                .msgInput_wrap{
                   position: relative;
                   height: 100%;
                   width:100px;

                  .msgInput{
                   

                  }
                }
                
              }
              .total{}
              .offSaleCard{}
              .offPrice{}
              .postage{}
            }
            .submit{
              padding: 0 15px;
              position: fixed;
              width: 100%;
              bottom: 0;
              background:#fff;
              z-index:999;

              .actPay{

              }
              .submitOrder{
                background: #ff455D;
                color: #fff;
                height: 30px;
                width: 85px;
                border-radius: 3px;
                text-align: center;
                line-height: 30px;
                right: 15px;
              }
            }
        }
        .storePicking{
          &>div{
            /*  height: 40px;*/
              background: #fff;
          }
          .shopName{
            padding-left: 15px;
            margin: 10px 0;
              .itemName{
                display: inline-block;
                margin-right: 19px;
                  .triangle{
                    display:inline-block;
                    margin-right: 8px;
                    width: 11px;
                    height: 13px;
                    background: url(#{$imgUrl}icon_arrow.png) no-repeat center center;
                    background-size: cover;
                  }
              }
          }
          .protocol{
             background: #f2f2f2;
              .selectIcon{
                    display:inline-block;
                   
                    margin-right: 8px;
                    width: 12px;
                    height: 12px;
                    background: url(#{$imgUrl}icon_check.png) no-repeat center center;
                    background-size: cover;
              }
              .notice{
                 
                  border-bottom: 1px solid #ff455D;
                  color: #ff455D;
              }
          }
        }
      
    }
  }



}
</style>
