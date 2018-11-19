<template>
<div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
<isLoading :isLoading='isLoading'></isLoading>
	<div class="w100">
		 <div>
			<wxParse :content="content" @preview="preview" @navigate="navigate" />
		</div>


	</div>
</div>
</template>
<script>
import wxParse from 'mpvue-wxparse'
import isLoading from "@/components/isLoading";
export default {
  data() {
    return {
		content:'',
		iPhoneshow:false,
      	iphoneheight:''
	};
  },
 components: {
	 isLoading,
    wxParse
  },
   computed:{
    isLoading(){
				return this.$store.state.user.isLoading
				}
  },
  methods: {
	   iphone_xsp(){
    	  if(this.$store.state.user.iphoneX){
  					this.iPhoneshow=true;
					this.iphoneheight = this.$store.state.user.systemInfo.windowHeight + 50 +"px";
					
  			}
    	  
    }, 
  },
  async mounted() {
  	this.iphone_xsp();
  },
  onShareAppMessage(options) {
      return {
        title: (this.$store.state.user.userInfo?this.$store.state.user.userInfo.nickName:'') + '给您分享天天逛街的商品...',
        path: this.$route.fullPath
      }
  },
  async onShow() {
		this.$store.commit('SET_IS_LOADING',false)
		this.$store.commit('SET_IS_LOADING',true)
		// 今日推荐
		this.content='';
		if(this.$route.query.type=='info'){
			let [err, everyRecommendList] = await this._to(
        		this.$http.getShopactiveinfo(this.$route.query.id)
	  		);
	  		this.content = everyRecommendList.result.content;
		}else if(this.$route.query.type=='week'){
			let [err, everyRecommendList] = await this._to(
        		this.$http.getWeekContentInfo(this.$route.query.id)
	  		);
	  		this.content = everyRecommendList.result.content;
		}else{
			 let [err, everyRecommendList] = await this._to(
        	this.$http.getEveryRecommend(this.$route.query.id)
	  		);
	  		this.content = everyRecommendList.list.content;
		}
		
 
	  
	  this.$store.commit('SET_IS_LOADING',false)
	  
      
  }
};
</script>
<style  scoped lang='scss'>
@import url("~mpvue-wxparse/src/wxParse.css");

.container {
  padding: 0 15px;

  
}
</style>
