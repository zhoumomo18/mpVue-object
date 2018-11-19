<template>
  <div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
    <div class="news" v-for="(item,index) in newsdetil_list" v-if="show_1" :key="index">
      <p class="color9a data_new f12 mb15">{{item.createtime}}</p>
      <ul>
        <li class="lis_1">
          <h4 class="f14 color32">{{item.title}}</h4>
          <p class="f10 color9a">{{item.createtime}}</p>
        </li>
        <li class="lis_2 mt14">
          <p class="f12 color32" v-html="item.detail"></p>
        </li>
      </ul>
    </div>
    <div class="news" v-for="(item, index) in newsdetil_list" v-if="show_2" :key='index'>
      <p class="color9a data_new f12 mb15">{{item.createtime}}</p>
      <ul>
        <li class="lis_1">
          <h4 class="f14 color32">{{item.merchname}}</h4>
          <p class="f10 color9a">{{item.createtime}}</p>
        </li>
        <li class="lis_2 mt14">
          <p class="f12 color32">{{item.bannername}}</p>
        </li>
      </ul>
    </div>
    <div class="news" v-for="(item, index) in newsdetil_list" v-if="show_3" :key='index'>
      <p class="color9a data_new f12 mb15">{{item.createtime}}</p>
      <ul>
        <li class="lis_1">
          <h4 class="f14 color32">订单付款成功</h4>
          <p class="f10 color9a">{{item.createtime}}</p>
        </li>
        <li class="lis_2 mt14">
          <p class="f12 color32">订单号：{{item.ordersn}}</p>
        </li>
      </ul>
    </div>
    
		<div v-if="newsdetil_list&&newsdetil_list.length==0" class="empty_2">
      <img src="../../../static/images/icon_news2.png">
      <div>暂无相关消息哟o(∩_∩)o</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        newsdetil_list: [],
        show_1: false,
        show_2: false,
        show_3: false,
        iPhoneshow: false,
        iphoneheight: ''
      };
    },
    methods: {
      iphone_xsp() {
        if (this.$store.state.user.iphoneX) {
          this.iPhoneshow = true;
          this.iphoneheight = this.$store.state.user.systemInfo.windowHeight + 50 + "px";
        }
      }
    },
    mounted() {
      this.iphone_xsp();
    },
    onPullDownRefresh() {},
    async onShow() {
      const data = await this.$http.saleMsg(this.$store.state.user.userInfo.openId)

      if (this.$route.query.type == 1) {
        this.show_1 = true;
        this.show_2 = false;
        this.show_3 = false;

        this.newsdetil_list = data.list.shopNotice.map((v,i) => {
          if(i==0){
            v.createtime = this._U.formatDate(v.createtime,'MM月dd日')
          }else{
            v.createtime = this._U.formatDate(v.createtime,'yyyy年MM月dd日  HH:mm:ss')
          }
          return v;
        });
      } else if (this.$route.query.type == 2) {
        this.show_1 = false;
        this.show_2 = true;
        this.show_3 = false;

        this.newsdetil_list = data.list.merchNotice[this.$route.query.id].map((v,i) => {
          if(i==0){
            v.createtime = this._U.formatDate(v.createtime,'MM月dd日')
          }else{
            v.createtime = this._U.formatDate(v.createtime,'yyyy年MM月dd日  HH:mm:ss')
          }
          return v;
        });
      } else if (this.$route.query.type == 3) {
        this.show_1 = false;
        this.show_2 = false;
        this.show_3 = true;

        this.newsdetil_list = data.list.orderNotice.map((v,i) => {
          if(i==0){
            v.createtime = this._U.formatDate(v.createtime,'MM月dd日')
          }else{
            v.createtime = this._U.formatDate(v.createtime,'yyyy年MM月dd日  HH:mm:ss')
          }
          return v;
        });
      }
    }
  };

</script>
<style scoped lang='scss'>
  .container {
    background: #f2f2f2;

    .news {
      margin-top: 28px;

      .data_new {
        text-align: center;
      }

      ul {
        width: 345px;
        padding: 14px 13px;
        background: rgba(255, 255, 255, 1);
        border-radius: 3px;
        box-shadow: 2px 3px 3px rgba(154, 154, 154, 0.15);

        .lis_1 {
          h4 {
            font-weight: 700;
          }

          p {
            margin-top: 5px;

          }
        }
      }
    }
  }
</style>
