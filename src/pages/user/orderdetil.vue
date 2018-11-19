<template>
<div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
	 <isLoading :isLoading='isLoading'></isLoading>
  <div class="code_01">
	<div class="shopName lineBottom" >
        <div class="logo" ></div>
        <div class="name color32 f16">订单状态：<span class="color77">{{orderDetail?orderDetail.order.statusstr:''}}</span></div>
    </div>	

    <div class="shopName" >
        <div class="logo2"></div>
        <div class="name">顺丰速运&nbsp;&nbsp;运单号：&nbsp;421223233333</div>
    </div>
    <div class="shopaddress">
    	 <div class="logo3"></div>
    	 <div class="shop_text">
    	 	<p>收货人：{{orderDetail?orderDetail.address.realname:''}} <span class="fr">
           {{orderDetail?orderDetail.address.mobile:''}}
           </span></p>
    	 	<p>{{orderDetail?orderDetail.address.province:''}}
            {{orderDetail?orderDetail.address.city:''}}
             {{orderDetail?orderDetail.address.area:''}}
              {{orderDetail?orderDetail.address.address:''}}</p>
    	 </div>
        
    </div>
    <div @click="$router.push({ path:'/pagesSub/busineshop/shop',query:{id:orderDetail?orderDetail.order.merchid:''}})" class="shopName lineBottom" >
        <div class="logo1" >
          <img :src="orderDetail?orderDetail.shop.logo:''" alt="">
        </div>
        <div class="name">{{orderDetail?orderDetail.shop.name:''}}</div>
        <div class="arrow"></div>
    </div>
    <!--商品详情-->
    <div>

       <div v-for="(item,index) in orderDetail?orderDetail.goods:[]" :key="index"
       class="goods lineBottom clearfix">
        <div class="goodsLogo">
          <img :src="item.thumb" alt="">
        </div>
        <div class="goods_detail_wrap">
            <div class="titleNum" @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item.id }})">
                <span class="title">
                    <span>{{item.title}}</span>
                </span>
                <span class="num mr15">X{{item.total}}</span>
            </div>
            <div class="price" @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item.id }})">￥{{item.price/item.total}}</div>
            <div class="colorSize" @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item.id }})">
                <span>颜色：{{item.color}}</span>
                <span>尺寸：{{item.size}}</span>
            </div>
             <div v-if="orderDetail&&orderDetail.order.status=='0'" class="c_button" >
        		    <span @click="cancelOrder(orderDetail.order.id)">取消订单</span>
                <span @click="goPay(orderDetail.order.id)" class="span_red">去支付</span>
        	  </div>
            <div v-if="orderDetail&&orderDetail.order.status=='1'" class="c_button">
        		    <span @click="rateOrder(orderDetail.order.id)">订单评价</span>
                <span @click="applyReturn(orderDetail.order.id)" class="span_red">申请退款</span>
        	  </div>
        </div>   
      </div>
         
    </div> 
  
	</div>
	<div class="code_02">

		
	</div>
      <div class="userInfo">
      	   <div class="userName lineBottom">
            <span>运费:</span>
            <p>￥{{orderDetail?orderDetail.order.dispatchprice:''}}</p>
          </div>
          <div class="userName">
            <span>买家备注:</span>
            <p>无备注</p>
          </div>
           <div class="userName lineBottom">
            <span>合计:</span>
            <p class="colorf45d">￥{{orderDetail?orderDetail.order.price:''}}</p>
          </div>
           <div class="lineBottom">
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
  
            </div>
           	<span class="text_logo">
           		
           	</span>
           	<span class="text_p">
           		在线客服
           	</span>
         
          </div>
    
     
      </div>
       <div class="userInfo">
      	   <div class="userName lineBottom">
            <span>商品金额:</span>
            <p class="colorf45d">￥{{orderDetail?orderDetail.order.goodsprice:''}}</p>
          </div>
          <!-- <div class="userName">
            <span>运费:</span>
            <p class="colorf45d">+￥{{orderDetail?orderDetail.order.dispatchprice:''}}</p>
          </div> -->
           <div class="userName lineBottom">
            <span>优惠名称:</span>
            <p>-￥{{orderDetail?orderDetail.order.isdiscountprice:''}}</p>
          </div>
           <div v-if="orderDetail&&orderDetail.order.status" class="userName lineBottom">
            <span>付款方式：</span>
            <p>微信支付</p>
          </div>
           <div class="userName lineBottom">
            <span>实付金额:</span>
            <p class="colorf45d">￥{{orderDetail?orderDetail.order.price:''}}</p>
          </div>
      </div>
       <div class="userInfo">
       	<div class="userName lineBottom">
            <span>下单编号：</span>
            <p>{{orderDetail?orderDetail.order.ordersn:''}}</p>
          </div>
           <div class="userName lineBottom">
            <span>下单时间:</span>
            <p>{{orderDetail?orderDetail.order.createtime:''}}</p>
          </div>
          <div v-if="orderDetail&&orderDetail.order.status" class="userName lineBottom">
            <span>付款时间：</span>
            <p>{{orderDetail?orderDetail.order.createtime:''}}</p>
          </div>
      </div>

  
</div>
</template>
<script>
import { mapState } from 'vuex'
import isLoading from "@/components/isLoading";
import { uploadFile, chooseImage, showActionSheet,requestPayment } from "@/utils/wechat";
export default {
  data() {
    return {
     date:'',
      orderDetail:'',
      iPhoneshow:false,
      iphoneheight:''
    };
  },
  components: {
   isLoading,
  },

  methods: {
   
   async goPay(id) {
     const [err, res] = await this._to(showActionSheet(['微信支付', '余额支付']))
      if(res==0){
        console.log('微信支付')
        this.$http.orderPay(id,
        this.$store.state.user.userInfo.openId).then(payInfo=>{
            return  requestPayment(
              payInfo.wechat.payinfo.timeStamp,
              payInfo.wechat.payinfo.nonceStr,
              payInfo.wechat.payinfo.package,
              payInfo.wechat.payinfo.signType,
              payInfo.wechat.payinfo.paySign
            )
        })
       
     
        
      }else{
        this.$tips.alert('您当前余额为0！')
      }
    },
    iphone_xsp(){
    	  if(this.$store.state.user.iphoneX){
  					this.iPhoneshow=true;
					this.iphoneheight = this.$store.state.user.systemInfo.windowHeight + 50 +"px";
					
  			}
    	  
    },
    bindDateChange(e) {
        this.date = e.mp.detail.value;
      },
      async cancelOrder(id){
      	let ids = id;
     	let openid = this.$store.state.user.userInfo.openid;
     	let authkey = this.$store.state.user.userInfo.authkey;
    	let cancel = await this._to(
      		this.$http.poinscancel(ids,openid,authkey)
   		);
 		this.$router.back();
      }
 
 

  },
    computed: {
    
    ...mapState({
     
      userInfo : state => state.user.userInfo
     
    }),
     isLoading(){
				return this.$store.state.user.isLoading
				}
    
  },
  mounted() {
   this.iphone_xsp();
  },
  onPullDownRefresh() {},
  async onShow() {
    this.$store.commit('SET_IS_LOADING',false)
    this.$store.commit('SET_IS_LOADING',true)
    const orderDetail = await this.$http.orderDetail(this.$route.query.id,this.$store.state.user.userInfo.openId)
    orderDetail.goods.map(i=>{
               i['color'] = /^[A-Za-z]+$/.test(i.optionname.split('+')[0])?i.optionname.split('+')[1]:i.optionname.split('+')[0]
               i['size'] = /^[A-Za-z]+$/.test(i.optionname.split('+')[0])?i.optionname.split('+')[0]:i.optionname.split('+')[1]
               
      })
    this.orderDetail = orderDetail
    this.$store.commit('SET_IS_LOADING',false)
  }
};
</script>
<style  scoped lang='scss'>
.container{
	background: #f2f2f2;
  .userInfo{
  	background: #fff;
    width: 100%;
      &>div{
        height: 40px;
        display: flex;
        align-items:center;
        justify-content:space-between;
        position: relative;
        &>span{
          margin-left: 15px;
        }
         &>p{
           float: right;
           font-size: 14px;
           color: #9a9a9a;
          margin-right: 15px;
        }
        .colorf45d{
        	color: #ff455d;
        }

      }
    .header{
      height: 50px;
        img{
          width: 37px;
          height: 37px;
          border-radius: 50%;
        }
    }
    .text_p{
    	color: #00a2de;
    	font-size: 16px;
    	position: relative;
    	right:33%;
    	font-family: PingFang-SC-Regula
    	
    	
    }
    .text_logo{
		position: relative;
		left: 33%;
	    width: 34px;
		height: 26px;
		background: url("../../../static/images/icon_customerservice.png") no-repeat center center;
   		 background-size: cover;
   		 color: #00a2de;
		
		
    }

  }
  .code_01{
  	width:100%;

  	.shopName {
    background: #fff;
  display: flex;
  height: 40px;
  .logo{
  	 width: 21px;
    height: 20px;
    margin: 10px 22px 0 15px;

    background: url("../../../static/images/icon_orderforgoods.png") no-repeat center
      center;
    background-size: cover;
  }
  .logo1 {
    width: 21px;
    height: 21px;
    margin: 10px 22px 0 15px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .logo2{
  	width: 26px;
    height: 20px;
    margin: 10px 20px 0 11px;

    background: url("../../../static/images/icon_pendingreceipt.png") no-repeat center
      center;
    background-size: cover;
  }
  .name {
    line-height: 40px;
    font-size: 14px;
  }
}
.shopaddress{
	 background: #fff;
	 height:80px;
	 margin-bottom: 10px;
	 overflow: hidden;
	 .logo3{
	 	width: 23px;
    	height: 36px;
    	margin: 27px 20px 0 15px;
    	float: left;

    	background: url("../../../static/images/icon_adr.png") no-repeat center
      	center;
	    background-size: cover;
	 }
	 .shop_text{
	 	padding:15px;
	 	p{
	 		line-height:28px;
	 	}
	 }

}
.goods {
	margin:10px 0;
  display: flex;
    background: #fff;
  .goodsLogo {
    position: absolute;
    width: 84px;
    height: 84px;
    top: 10px;
    left: 15px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .goods_detail_wrap {
    padding-bottom: 10px;
    margin-left: 110px;
    width: 100%;
    .titleNum {
      margin-top: 20px;
      
      .title {
      }
      .num {
        float: right;
      }
    }
    .price {
      color: #ff455d;
      font-size: 16px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .colorSize {
      span {
        margin-right: 15px;
      }
    }
    .c_button{
    	float:right;
		margin-right:15px;
		padding-top:10px;

    	span{
    		margin-left: 10px;
    		display: inline-block;
    		width: 64px;
			height: 24px;
			border-radius: 5px;
			border: solid 0.5px #ff7700;
			color: #ff7700;
			font-size: 12px;
			text-align: center;
			line-height: 22px;
    	}
    	.span_red{
    		border: solid 0.5px #ff455d;
    		color:#ff455d;
    	}
    }
  }
}
  }


}






</style>
