<template>
<div :class="{'iphonex':iPhoneshow}" class="container lineTop">
        <div class="discounts bgcfff lineBottom">
        <div class="present">
            <span>
            商家评价
            <span class="judges">( {{RateListLength}} )</span>
            </span>
            <span class="discount_msg text-right"></span>
        </div>
        <!-- <div class="check_all">
            查看全部>>
        </div> -->
    </div>
    <!-- 循环的数据 -->
    <div class="comment lineBottom" v-for="(item,index) in getGoodsRateList" :key="index">
      <div class="discounts bgcfff">
        <div class="present">
          <span class="gift portrait">
            <img :src="item.headimgurl" />
          </span>
          <span class="discount_msg">{{item.nickname}}</span>
        </div>
        <div class="check_all">
          {{item.createtime}}
        </div>
      </div>
      <div class="pdl15">{{item.content}}</div>
      <div class="pdl15 mgt5">颜色：{{item.optionname[0]}} 尺寸：{{item.optionname[1]}}</div>
    </div>
    
  
</div>
</template>
<script>

export default {
  data() {
    return {
          getGoodsRateList:null,
        RateListLength:null,
		  tinyPics: {
       
        customer: '/static/images/icon_customer.png',
        intro: '/static/images/img_concessionaryvolums.png',
        portrait: '/static/images/icon_headportrai.png',
        store: '/static/images/icon_default.png',
        promotion: '/static/images/icon_Promotion.png',
        gift: '/static/images/icon_gift.png'
      },
      iPhoneshow:false
    };
  },
   components: {},
    created() {},
    methods: {
        

    },
   
 	mounted() {
//	if(this.$store.state.user.iphoneX){
//	//	console.log(2222)
//		this.iPhoneshow=true;
//	}
    },
  onPullDownRefresh() {},
 async onShow() {

      const [getGoodsRateErr ,getGoodsRate ] = await this._to(this.$http.getGoodsRate(this.$route.query.id, 1, 2))
        this.getGoodsRateList = getGoodsRate.list.data
        this.RateListLength =getGoodsRate.count.all
        
      
	}
};
</script>
<style  scoped lang='scss'>
 .pdl15 {
    padding-left: 15px;
    font-size: 12px;
    letter-spacing: 1px;
    color: #323232;
  }
.container{
      .comment {
    width: 100%;
    height: 90px;
  }
  .discounts {
    width: 100%;
    height: 43px;
    line-height: 43px;
    background-color: #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px 0 19px;
    .right-arrow {
      width: 8px;
      height: 15px;
      background: url(#{$imgUrl}/icon_ret.png) no-repeat center/cover;
    }
    .present {
      flex: 1;
      display: flex;
      align-items: center;
      .discount_msg {
        height: 43px;
        line-height: 43px;
        font-family: PingFang-SC;
        font-size: 14px;
        letter-spacing: 1px;
        color: #323232;
      }
      .text-right {
        flex: 1;
        padding-right: 15px;
        text-align: right;
        font-size: 14px;
        letter-spacing: 1px;
        color: #9a9a9a;
      }
      .gift {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-right: 12px;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
  .bgcfff {
    background-color: #fff;
    .judges {
      margin-left: 12px;
    }
    .check_all {
      font-family: PingFang-SC;
      font-size: 14px;
      letter-spacing: 1px;
      color: #9a9a9a;
    }
  }
  .shopping_mall {
    width: 100%;
    height: 68px;
    padding: 0 15px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .pull_left {
      flex: 1;
      display: flex;
      align-items: center;
      .gift {
        width: 30px;
        height: 30px;
        margin-right: 12px;
        img {
          width: 30px;
          height: 30px;
        }
      }
      .portrait {
        width: 27px;
        height: 27px;
        img {
          width: 27px;
          height: 27px;
        }
      }
      .details {
        .discount_msg {
          font-family: PingFang-SC;
          font-size: 14px;
          letter-spacing: 1px;
          color: #323232;
          margin-bottom: 6px;
        }
        .gray {
          font-family: PingFang-SC;
          font-size: 12px;
          letter-spacing: 1px;
          color: #9a9a9a;
        }
      }
    }
    .pull_right {
      width: 60px;
      height: 30px;
      border-radius: 4px;
      border: solid 1px #9a9a9a;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
      letter-spacing: 1px;
      color: #9a9a9a;
    }
  }
  .intro {
    width: 100%;
    padding: 0 15px;
    height: 46px;
    line-height: 46px;
    display: flex;
    .info {
      flex: 1;
      span {
        margin-right: 10px;
      }
    }
    .saled {
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #9a9a9a;
    }
  }

}
  

</style>