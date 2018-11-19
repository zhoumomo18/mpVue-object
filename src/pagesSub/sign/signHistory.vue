<template>
  <div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
    <isLoading :isLoading='isLoading'></isLoading>
		<div class="historyBox">
				<div class="historyList lineBottom" v-for="(item,index) in signList" :key="index">
					<div class="historyLeft">
							<p class="color32 f16 bords">日常签到</p>
							<p class="color9a f4">{{item.Y}}-{{item.M}}-{{item.D}}</p>
					</div>
					<div class="historyRight colorf45d f16">
						+{{item.status}}积分
					</div>
				</div>
		</div>	



	 <div class="mt10" v-if="loadMore">
		<zan-loadmore v-if="!isBottom" type="loading"></zan-loadmore>
		<zan-loadmore v-if="isBottom" type="text" text="没有更多啦~"></zan-loadmore>
	</div>
		
   <div v-if="!loadMore" class="empty">
      <img src="../../../static/images/icon_none.png">
      <p class="color9a">您在本店铺还没有签到记录</p>
    </div>
  </div>
</template>

<script>
  import isLoading from "@/components/isLoading";
  export default {
    data() {
      return {
        nearlySale: [],
        signList:'',
        page: 1,
        prePage: 10,
        isBottom: false,
        iPhoneshow: false,
        iphoneheight: "",
        loadMore:true
      };
    },
    async onShow() {
// 		this.$route.query.id;
this.getlist();
    },
    components: {
      isLoading
    },
    async mounted() {
      this.iphone_xsp();
    },
    computed: {
      isLoading() {
        return this.$store.state.user.isLoading;
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
      async getlist(){
      	
      	let List = await this._to(
       this.$http.getSignList(this.$store.state.user.userInfo.openId,this.$route.query.id,this.page)
//         this.$http.getSignList('sns_wa_oUnEr5GA3q-i17_y18F8nMGNKGOU',558,this.page)
        )
      	
    	  this.signList = List[1].result.data;
    	  if(this.signList.length==0){
    	  	 this.loadMore = false
    	  }
				if(this.signList.length<20){
					 this.isBottom = true;
				}
      }


 
    },

    async onReachBottom() {
    if (this.isBottom) return;
    this.$store.commit("SET_IS_LOADING", true);
    let List = await this._to(this.$http.getSignList(
					  this.$store.state.user.userInfo.openId,
					  this.$route.query.id,
					  ++this.page,

				));
				console.log(List[1])
		if (List[1].result.data.length < 20){
				this.isBottom = true;
		}
		this.signList = [...this.signList, ...List[1].result.data];
		this.$store.commit("SET_IS_LOADING", false);

    },
    watch: {

    },

  };

</script>

<style scoped lang='scss'>

  .container {
    width: 100%;
    padding: 0;
    .historyBox{
    	width:100%;
    	.historyList{
    	padding:18px 15px;
			position: relative;
			display: flex;
			justify-content: flex-start;
			align-items: center;

		
			.historyLeft{
				.bords{
					font-weight: 500;
				}
				
			}
			.historyRight{
				text-align: center;
					position: absolute;
					right:15px;
			}
		}
    }

   
  }

</style>
