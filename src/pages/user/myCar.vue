<template>
<div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
      <div class="goodsContainer">
        <div v-for="(Wrapitem, key) in !productsList.merch_list?[]: productsList.merch_list" :key='key'>
              <div class="shopTitle lineBottom">
                    <span class="fl f16 ml15">{{Wrapitem.merchname}}</span>
                    <!-- <span class="fr mr15">领券</span> -->
              </div>
            <div class="item" v-for="(item, index) in !productsList.merch_list?[]: Wrapitem.list" :key='index'>
                    <div class="left">
                    
                      <span @click="isSelect(item.id,item.selected=='1'?'0':'1')" class="icon mr12" :class="{'active':item.selected=='1'}"></span>
                      <div class="bg">
                        <wux-image wux-class="image" shape="circle" :src="item.thumb">
                        </wux-image>
                      </div>                      
                    </div>
                    <div class="right">
                        <div class="goodsTitle f14 mt3">{{item.title}}</div> 
                        <span class="del fr" @click="del(item.id)"></span>
                        <div class="colorSize f12 mt6">
                        
                          <span>颜色：{{item.color}} </span>&nbsp;:
                          <span>尺码：{{item.size}}</span>
                        </div> 
                        <div class="mt10">
                          <span class="colorf45d f16">￥{{item.marketprice}}</span>
                          <div class="count fr">
                              <span @click="dec(item.id, item.optionid, item.total)" class="dec align">-</span>
                              <span class="f16">{{item.total}}</span>
                              <span @click="add(item.id, item.optionid, item.total,item.totalmaxbuy)"  class="add align">+</span>
                          </div>
                        </div>
                    </div>
            </div>
        </div>    
     </div>
            <div class="bottom" :class="{'fixedBox_2':iPhoneshow}">
                <div class="select fl">
                      <span @click="isSelectAll()" class="icon mr12" :class="{'active':productsList.ischeckall}"></span> 
                      <span class="f16">全选</span>
                </div>
                <div class="calc f14 fr">
                    <span class="colorf45d f14 mr14">￥{{carTotalPrice}}</span>
                    <span @click="$router.push({ path:'/pages/user/myPay',query: { from: 'fromCar' }})" class="btn">共{{selectCount}}件去结算</span>
                </div>
            </div>
            <div class="noneGoods fullPage" v-if="productsList.merch_list==null">
                  <div class="noneContent">
                      <div class="icon"></div>
                      <div @click ="$router.push({ path: '/pages/home/home', isTab: true })" class="add mt12">添加商品+</div>
                  </div>
            </div>
          
        </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
    	iPhoneshow:false,
      iphoneheight:''
    };
  },
  components: {},
  created() {},
  computed: {
    ...mapState({
      productsList: state => state.products.productsList,
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(["selectCount", "carTotalPrice"])
  },
  methods: {
    ...mapActions(["getAllProducts", "delateProducts"]),
    async upDate(id, optionid, total) {
      const [err, data] = await this._to(
        this.$http.upDateProducts(this.userInfo.openId, { id, optionid, total })
      );
      if (err) {
        console.log(err);
      }

      await this.getAllProducts();
      console.log(this.productsList);
    },
    iphone_xsp(){
    	  if(this.$store.state.user.iphoneX){
  					this.iPhoneshow=true;
					this.iphoneheight = this.$store.state.user.systemInfo.windowHeight + 50 +"px";
					
  			}
    	  
    },
    async add(id, optionid, total, totalmaxbuy) {
      total++;
      if (total > totalmaxbuy) {
        this.$tips.alert("最大可添加" + totalmaxbuy);
        return;
      }
      await this.upDate(id, optionid, total);
    },
    async dec(id, optionid, total) {
      total--;
      if (total < 1) {
        return;
      }
      await this.upDate(id, optionid, total);
    },
    async isSelect(id, selected) {
      const [err, data] = await this._to(
        this.$http.selectProducts(this.userInfo.openId, { id, selected })
      );
      if (err) {
        console.log(err);
      }

      await this.getAllProducts();
      console.log(this.productsList);
    },
    async isSelectAll() {
      let id = "all";
      let selected = null;
      selected = this.productsList.ischeckall ? "0" : "1";
      const [err, data] = await this._to(
        this.$http.selectProducts(this.userInfo.openId, { id, selected })
      );
      if (err) {
        console.log(err);
      }

      await this.getAllProducts();
    },
    async delateProducts(ids) {
      const [err, data] = await this._to(
        this.$http.delateProducts(this.userInfo.openId, ids)
      );
      if (err) {
        console.log(err);
      }
      await this.getAllProducts();
    },
    async del(ids) {
      let [err, res] = await this._to(this.$tips.confirm("确认要删除吗"));
      if (res == "confirm") {
        await this.delateProducts(ids);
      }
    }
  },

  async mounted() {
    await this.getAllProducts();
    
  },
  onPullDownRefresh() {},
  async onShow() {
  	this.iphone_xsp();
  }
};
</script>
<style  scoped lang='scss'>
.container {
  background: #f2f2f2;
  padding-bottom: 49px;
  .goodsContainer {
    width: 100%;
      .shopTitle {
        height: 40px;
        line-height: 40px;
        margin-top: 10px;
        background-color: #fff;
        position: relative;
        .fr {
          width: 45px;
          height: 22px;
          color: #ff7700;
          border: 1px solid #ff7700;
          text-align: center;
          line-height: 22px;
          position: absolute;
          right: 15px;
          top: 0;
          bottom: 0;
          margin: auto 0;
          border-radius: 5px;
        }
      }
    .item {
      position: relative;
      padding: 10px 0 10px 129px;
      height: 94px;
     
      background-color: #fff;

      .left {
        display: flex;
        align-items: center;
        position: absolute;
        left: 15px;
        .icon {
          width: 17.5px;
          height: 17.5px;
          display: inline-block;
          //  border:1px solid #9a9a9a;
          //  border-radius: 50%;
          background: url(#{$imgUrl}icon_wxz.png) no-repeat center center;
          background-size: cover;
        }
        .active {
          background: url(#{$imgUrl}icon_pressed_sm@2x.png) no-repeat center
            center;
          background-size: cover;
          // padding: 1px;
          // background-color: #ff455d;
        }
        .bg {
          width: 74px;
          height: 74px;
          border-radius: 2px;
          display: block;
        }
      }
      .right {
        margin-right: 15px;
        .del {
          width: 12.5px;
          height: 14px;
          display: inline-block;
          background: url(#{$imgUrl}icon_delete.png) no-repeat center center;
          background-size: cover;
        }
        .count {
          width: 79px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #b7b7b7;
          border-radius: 3px;
          display: flex;
          justify-content: space-between;
          .dec {
            border-right: 1px solid #b7b7b7;
            width: 22px;
            color: #b7b7b7;
          }
          .add {
            border-left: 1px solid #b7b7b7;
            color: #b7b7b7;
            width: 22px;
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 49px;
    background-color: #fff;
    line-height: 49px;
    position: fixed;
    padding: 0 15px;
    bottom: 0;
    .select {
      height: 100%;
      padding: 6px 12px 6px 0;
      border-right: 1px solid #e8e8e8;
      display: flex;
      align-items: center;
      .icon {
        width: 17.5px;
        height: 17.5px;
        display: inline-block;
        //  border:1px solid #9a9a9a;
        //  border-radius: 50%;
        background: url(#{$imgUrl}icon_wxz.png) no-repeat center center;
        background-size: cover;
      }
      .active {
        background: url(#{$imgUrl}icon_pressed_sm@2x.png) no-repeat center
          center;
        background-size: cover;
        // padding: 1px;
        // background-color: #ff455d;
      }
    }
    .calc {
      height: 100%;
      display: flex;
      align-items: center;
      .btn {
        // width: 71px;
        padding: 0px 15px;
        height: 30px;
        background-color: #ff455d;
        border-radius: 3px;
        color: #fff;
        line-height: 30px;
        text-align: center;
      }
    }
  }
  .noneGoods {
    background-color: #f2f2f2;

    .noneContent {
      margin-top: -100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 170px;
        height: 120px;
        display: inline-block;
        background: url(#{$imgUrl}icon_nonesxhdpi.png) no-repeat center center;
        background-size: cover;
      }
      .add {
        width: 100px;
        height: 30px;
        background-color: #ff455d;
        border-radius: 3px;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        color: #ffffff;
      }
    }
  }
}
</style>
