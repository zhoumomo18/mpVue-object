<template>
<div class="container lineTop">
    <div v-if="list==''&&list.length==0" class="empty_2">
        <img src="../../../static/images/img_publish.png">
        <div>您还没有相关发布哟o(∩_∩)o</div>
      </div>
    <div class="likeAll" v-if="list&&list.length>0">
        <div class="item" v-for="(item,index) in list" :key="index" @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item.id }})">
            <img :src="item.thumb" alt="">
            <div class="itemDetial">
              <span class="fl f16">{{item.title}}</span>
              <span class="fr colorf45d f16">￥{{item.productprice}}</span>
            </div>
        </div>        
    </div>  
</div>
</template>
<script>
export default {
  data() {
    return {
      list: ""
    };
  },
  components: {},
  created() {},
  methods: {},

  async mounted() {
    // let result = await this._to(
    //   this.$http.myfooter(this.$store.state.user.userInfo.openId,this.$store.state.user.userInfo.authkey)
    // );
    // this.list = result[1].data.data;
  },
  onPullDownRefresh() {},
  onShow() {}
};
</script>
<style  scoped lang='scss'>
.container {
  margin-top: 14px;
  .likeAll {
    display: flex;

    flex-wrap: wrap;
    padding-left: 7px;
    justify-content: flex-start;
    .item {
      margin: 0 8px;
      border-radius: 2px;
      & > img {
        width: 164px;
        height: 215px;
      }
      .itemDetial {
        height: 44px;
        padding-top: 11px;
      }
    }
  }
}
</style>
