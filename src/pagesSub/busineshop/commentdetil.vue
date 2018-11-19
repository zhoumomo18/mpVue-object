<template>
	<div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
		<!-- <isLoading :isLoading='isLoading'></isLoading> -->
		<div class="w100 praise lineBottom">

			<div class="praiseInfo">
				<div class="praise_ico">
					<img :src="commentinfo.avatar" alt="">
				</div>
				<div class="praisepl">
					<p class="color32 f14">{{commentinfo.nickname}}</p>
					<span>
						<div>
                    		<wux-rater font-size='20' :auto="false" :value="commentinfo.zh" />
						</div>
					</span>
				</div>
				<span class="praiseTime color9a f10">{{startime}}</span>
			</div>
			<div class="praiseMains">
				<p class="color32 f15">
					{{commentinfo.content}}
				</p>
			</div>
			<div class="praiseImg">
				<div v-for="(v,k) in pics" :key="k" @click="openimg(k)">
					<wux-image wux-class="image" :src="v"></wux-image>
				</div>
				<div v-for="(v2,k2) in videos" :key="k2">
		
					<video id="myVideo" :src="v2">
						  	
					</video>
	
				</div>
			</div>
		   <!--<div class="videos">
	    		<div class="section tc" v-for="(v2,k2) in videos" :key="k2">
		
					<video id="myVideo" :src="v2">
						  	
					</video>
	
				</div>
            </div>-->
			<div class="praiseIike">
				<div class="praiseRight">
					<div class="likePeople" @click="pointLike">
						<i></i>
						<span class="f10 color32" v-if="commentinfo.star>999">{{commentinfo.star}}+</span>
                    	<span class="f10 color32" v-else>{{commentinfo.star}}</span>
					</div>
					<div class="allMessage">
						<i></i>
						<span class="f10 color32" v-if="commentinfo.hf>999">{{commentinfo.hf}}+</span>
                    	<span class="f10 color32" v-else>{{commentinfo.hf}}</span>
					</div>
				</div>
			</div>

		</div>
		<div class="w100 praise praise2">
			<div class="praBox">
				<div class="commentcounts"><i></i><span class="color9a f14">回复（{{userindex}}条）</span> </div>
				<div class="lineBottom alllist" v-for="(items,index) in usercommentList" :key="index">
					<div class="praiseInfo">
						<div class="praise_ico">
							<img :src="items.avatar" alt="">
						</div>
						<div class="praisepl">
							<p class="color32 f14">{{items.nickname}}</p>
							<span class="color9a f10">{{items.add_time}}</span>
						</div>
						<div class="praiselike" @click="userLike(items.id)">
							<i></i>
							<span class="f10 color32" v-if="items.star>999">{{items.star}}+</span>
                    		<span class="f10 color32" v-else>{{items.star}}</span>
						</div>
					</div>
					<div class="praiseMains">
						<p class="color32 f15">{{items.content}}
						</p>
					</div>
				</div>
				<div class="searchBoxWraper lineBottom">
					<div class="searchBox ">
						<span class="mr15"></span>
						<input type="text" class="search" v-model="setcontent"  placeholder-class="placeholder" :placeholder="placeholder">

					</div>
					<div class="searchsend color32 f16" @click="setcomment">
						发送
					</div>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	import isLoading from "@/components/isLoading";
	export default {
		data() {
			return {
				commentId:null,
				content: '',
				iPhoneshow: false,
				iphoneheight: '',
				placeholder:'说点什么呢~',
				commentinfo:'',
				pf:'',
				status:'',
				pics:'',
				setcontent:'',
				usercommentList:'',
				userindex:0,
				startime:'',
				videos:''
			};
		},
		components: {
			isLoading,

		},
		watch:{
			commentId(v){
				this.initData()
			}
		},
		computed: {
			isLoading() {
				return this.$store.state.user.isLoading
			}
		},
		methods: {
			iphone_xsp() {
				if(this.$store.state.user.iphoneX) {
					this.iPhoneshow = true;
					this.iphoneheight = this.$store.state.user.systemInfo.windowHeight + 50 + "px";

				}

			},
			async getinfoList(){
				  let searchList = await this._to(
        				this.$http.commentInfo(this.$route.query.commentId)
        			);
				this.commentinfo=searchList[1].result;
				this.pf = this.commentinfo.zh;
				if(this.commentinfo.pics==''){
					this.pics=[];
				}else{
					this.pics = this.commentinfo.pics.split(",");
				}
				if(this.commentinfo.video==''){
					this.videos=[];
				}else{
				this.videos = this.commentinfo.video.split(",");
				}
			
				this.startime = this._U.formatDate(this.commentinfo.add_time,'MM月dd日 HH:mm');
				
				
			},
		async replyList(){
			
			let commentreplyList = await this._to(
        		this.$http.commentReply(this.$route.query.commentId)
        	);
        	if(commentreplyList[1]){
        		this.usercommentList=commentreplyList[1].result.data;
        		let c = Object.keys(commentreplyList[1].result.data);
        		this.userindex=c.length;
		        for(var key in this.usercommentList){ 
		        	this.usercommentList[key].add_time = this._U.formatDate(this.usercommentList[key].add_time,'MM月dd日 HH:mm')
		        }

        		
        	}
        
		},
		async setcomment(){
				if (this.$store.state.user.loginStatus == false) {
					     this.$router.push({
					          path: "/pagesSub/login/loginIndex"
					        });
					        return
				}else{
					if(this.setcontent==''){
						this.placeholder="输入不能为空";
						return
					}else{
						let set = await this._to(
	        			this.$http.setComment(this.$route.query.commentId,this.$store.state.user.userInfo.openId,this.setcontent)
	        			)
						this.getinfoList();
						this.replyList();
						this.$tips.toast('发送成功');
					}
				
				}

		},
		async userLike(id){
				if (this.$store.state.user.loginStatus == false) {
					     this.$router.push({
					          path: "/pagesSub/login/loginIndex"
					        });
					        return
				}else{
					let List = await this._to(
		          		this.$http.setLike(1,id,this.$store.state.user.userInfo.openid)
		        	)
					
					if(List[1].result.message=="ok"){
						this.replyList();
					}else{
						this.$tips.toast('已经赞过了！');
					}
				}
		
			},
		async pointLike(){
			if (this.$store.state.user.loginStatus == false) {
				this.$router.push({
				path: "/pagesSub/login/loginIndex"
				});
				return;
			}else{
				let List = await this._to(
				this.$http.setLike(0,this.$route.query.commentId,this.$store.state.user.userInfo.openid)
				)
					
						if(List[1].result.message=="ok"){
							this.getinfoList();
						}else{
							this.$tips.toast('您已经点过赞');
						}
     		 }
		},
		openimg(k){
			wx.previewImage({
			  current:this.pics[k],
			  urls: this.pics// 需要预览的图片http链接列表
			})
		},
		initData(){
			this.pics=[];
			this.getinfoList();
			this.replyList();
		}
		},
	
		mounted() {
			this.iphone_xsp();
		},
		async onShow() {
			
		 this.commentId=	this.$route.query.commentId

		}
	};
</script>
<style scoped lang='scss'>
	.container {
		background: #F2F2F2;
		margin-bottom: 50px;
		.praise {
			background: #ffffff;
			padding: 15px 15px 0 15px;
			.praiseInfo {
				position: relative;
				display: flex;
				// justify-content: space-between;
				align-items: center;
				width: 100%;
				.praise_ico {
					width: 40px;
					height: 40px;
					
					img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.praisepl {
					padding-left: 10px;
					span {
						display: block;
						width: 114px;
						/*border: 0.5px solid #323232;*/
						/*height: 15px;*/
					}
				}
				.praiseTime {
					display: inline-block;
					position: absolute;
					right: 0;
					top: 12px;
				}
			}
			.praiseMains {
				padding: 0 15px;
				margin: 15px 0;
			}
			.praiseImg {
				display:inline-block;
				/*justify-content: space-between;*/
				/*align-items: center;*/
				
				div {
					width: 111px;
					height: 111px;
					background-color: #9a9a9a;
					border-radius: 3px;
					float: left;
					margin:0 4.5px 4.5px 0;
					img {
						width: 100%;
						height: 100%;
					}
					video{
                  	width:100%;
                  	height:100%;
                  }
				}
				div:nth-child(2n) {
					/*	float:left !important;*/
					  /*margin-left:4.5px;
                  	  margin-right:4.5px;*/
				}
			}
			.videos{
            	display: flex;
              /*justify-content: space-between;*/
              align-items:center;
          		margin:5px 0 ;
              width:100%;
      
              .section{
              	width:112px;
              	height:112px;
              	overflow: hidden;
              	#myVideo{
              		width:112px;
              		height:112px;
              		overflow: hidden;
              	}
              	
              }
                 div:nth-child(2) {
              /*	float:left !important;*/
              margin:0 5px;

              }
            }
			.praiseIike {
				width: 100%;
				.praiseRight {
					padding: 15px 0;
					float: right;
					.likePeople {
						vertical-align: middle;
						display: inline-block;
						i {
							width: 15px;
							height: 16px;
							display: inline-block;
							background: url("#{$imgUrl}icon_snap.@2x.png") no-repeat 100% 100%;
							background-size: cover;
							margin-right: 6px;
							position: relative;
							top: 2px;
						}
					}
					.allMessage {
						margin-left: 12px;
						display: inline-block;
						vertical-align: middle;
						i {
							display: inline-block;
							width: 14px;
							height: 14px;
							background: url("#{$imgUrl}icon_comment@2x.png") no-repeat 100% 100%;
							background-size: cover;
							margin-right: 6px;
							position: relative;
							top: 2px;
						}
					}
				}
			}
		}
		.praise2 {
			margin-top: 10px;
			.commentcounts {
				display: flex;
				/*justify-content: space-between;*/
				align-items: center;
				i {
					display: inline-block;
					margin-right: 11px;
					width: 3px;
					height: 15px;
					background-color: #ff455d;
				}
			}
			.searchBoxWraper {
				width: 100%;
				padding: 10px 5px 10px 10px;
				display: flex;
				justify-content: space-between;
				background: #fff;
				align-items: center;
				position: fixed;
    				bottom: 0px;
    				left: 0;
				.searchBox {
					.placeholder {
						color: #b7b7b7;
						font-size: 10px;
						vertical-align: middle;
					}
					background: #f2f2f2;
					display: inline-block;
					height: 30px;
					line-height: 30px;
					width: 100%;
					border-radius: 15px;
					padding-left: 12px;
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
						
						vertical-align: middle;
					}
				}
				.searchsend{
					width:60px;
					padding-left:10px;
					height:30px;
					line-height:30px;
					

				}
			}
			.alllist {
				padding: 15px 0;
			}
	
			.praiseInfo {
				.praise_ico {
					width: 30px;
					height: 30px;
					border: 0.5px solid #E8E8E8;
					border-radius: 50%;
				}
				.praisepl {
					span {
						border: 0;
					}
				}
				.praiselike {
					width: 60px;
					position: absolute;
					right: 0;
					top: 2px;
					text-align: right;
					i {
						width: 15px;
						height: 16px;
						display: inline-block;
						background: url("#{$imgUrl}icon_snap.@2x.png") no-repeat 100% 100%;
						background-size: cover;
						margin-right: 6px;
						position: relative;
						top: 2px;
					}
				}
			}
			.praiseMains {
				margin-bottom: 0px;
				p {
					line-height: 24px;
					;
				}
			}
		}
	}
</style>