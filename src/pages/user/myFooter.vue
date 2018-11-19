<template>
<div class="container lineTop">
    <div v-if="list==''&&list.length==0" class="empty_2">
        <img src="../../../static/images/img_footprint.png">
        <div>您还没有足迹记录哟o(∩_∩)o</div>
      </div>
    <div class="likeAll" v-if="list&&list.length>0">
        <div class="item" v-for="(item,index) in list" :key="index" @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item.id }})">
          
            <div style="width:100%;height:155px;">
              <wux-image wux-class="image" shape="thumbnail" :src="item.thumb">
            	</wux-image>
          	</div>
            <div class="itemDetial">
              <span class="fl f16 titles over_hidden">{{item.title}}</span>
              <span class="fr colorf45d f16">￥{{item.productprice}}</span>
            </div>
        </div>        
    </div>
    <!--<div class="mt10" v-if="list&&list.length>0">
						<zan-loadmore v-if="!isBottom" type="loading" ></zan-loadmore>
						<zan-loadmore v-if="isBottom" type="text"  text="暂无数据"></zan-loadmore>
			</div>-->
  
</div>
</template>
<script>
export default {
  data() {
    return {
      list:[],
      page : 1,
      prePage : 2,
      isBottom:false
    };
  },
  components: {},
  created() {},
  methods: {},
//async onReachBottom() {
//  
// if( this.isBottom) return
//
//	let result = await this._to(
//    this.$http.myfooter(this.$store.state.user.userInfo.openId,this.$store.state.user.userInfo.authkey,
//    	++this.page,
//		this.prePage)
//  );
//		if(result[1].list.data.length<this.prePage){
//			this.isBottom=true
//		}
//		this.list = [...this.list,...result[1].list];
//
//},
  async mounted() {
    let result = await this._to(
      this.$http.myfooter(this.$store.state.user.userInfo.openId,this.$store.state.user.userInfo.authkey)
    );
    this.list = result[1].list;

    console.log(this.list);
  },
  onPullDownRefresh() {},
  onShow() {}
};
</script>
<style  scoped lang='scss'>
.container {
	padding-bottom:10px;
  // margin-top: 14px;
  .likeAll {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .item {
      width:185px;
      padding:15px;
      border-radius: 2px;
      & > img {
       	width:164px;
		height:204px;
     
      }
      .itemDetial {
        height: 44px;
        padding-top: 11px;
        .titles{
        	width:80px;
        }
      }
    }
  }
}
</style>
