<template>
	<div class="container lineBottom" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight}">
		<!-- <isLoading :isLoading='isLoading'></isLoading> -->
		
		<div class="main_img">
			<div class="swiperContainer">
				<swiper :indicator-dots="indicatorDots" :current="swiperCurrent" :autoplay="autoplay" :interval="interval" :duration="duration" @change="bannerSwiperChange" class="swiper">
					<block v-for="(item,index) in imgs" :key="index">
						<swiper-item>
							<div class="slide-image">
								<wux-image wux-class="image" shape="circle" :src="item">
								</wux-image>
							</div>
						</swiper-item>
					</block>
				</swiper>
				<div class="dots">
					<block v-for="(item,index) in imgs" :key="index">
						<view class="dot" :class="{'active':swiperCurrent == index}"></view>
					</block>
				</div>
			</div>
			<!-- <img src="../../../static/images/img_coat.png" alt="" /> -->
		</div>
		<div class="w100 praise lineBottom praisebox">
			<div class="praiseInfo lineBottom">
				<div class="praise_ico">
					<img src="../../../static/images/icon_mine.png" alt="">
				</div>
				<div class="praisepl">
					<p class="color32 f16">nikename</p>
				</div>
				<span class="islike f16">关注</span>
			</div>
			<div class="praiseMains">
				<p class="color32 f14">
					夏装搭配少不了T恤衫。T恤衫又被叫做老头衫，文化衫，本质是一种没有领子和袖子的衬衫，各位可能都已经穿了十几二十年了，也没什么特别新鲜的。
					   一件简单的圆领、合身白色T恤就是永不过时的度夏服装，不仅穿着舒适，而且别人看着也舒服，不过前提是要干净。
					   男生夏装搭配图片中T恤衫搭配短裤清爽感视觉，很应夏天明亮的季节。"
				</p>
			
			</div>


		</div>
		<div class="w100 praise praise2">
			<div class="praBox">
				<div class="commentcounts lineBottom">
					<span class="color32 f16">评论（200）</span>
					<div class="write" @click="autoKeyWord">
						<i></i>
						<span class="color9a f14">写评论</span>
					</div>
				</div>
				<div class="lineBottom alllist" v-for="(items,index) in 3" :key="index">
					<div class="praiseInfo">
						<div class="praise_ico">
							<img src="../../../static/images/icon_mine.png" alt="">
						</div>
						<div class="praisepl">
							<p class="color32 f14">nikename</p>
							<span class="color9a f10">2018-10-6</span>
						</div>
						<div class="praiselike">
							<i></i>
							<span class="f10 color32" v-if="true">999+</span>
                    	<!--	<span class="f10 color32" v-else>{{items.star}}</span>-->
						</div>
					</div>
					<div class="praiseMains">
						<p class="color32 f15">
							楼主这个很好看，还有其他的推荐吗?感觉楼主衣品非常好。
						</p>
						<div class="praiseWrite">
							<p class="textFrist">
								<span class="colorf45d f12">晴天:</span>
								<span class="color32 f11">同求推荐</span></p>
							
							<p class="textTwo">
								<span class="colorf45d f12">Gilbert:</span>
								<span class="color32 f11">回复</span>
								<span class="colorf45d f12">晴天</span>
								<span class="color32 f11">可以关注我哟，最新的搭配推荐都会发布在这里</span>
							</p>
							<div class="allWritelist"><span>查看全部12条回复</span> <i></i></div>
						</div>
					</div>
				</div>
				<div class="searchBoxWraper lineBottom" v-if="showTop">
					<div class="searchBox ">
						<span class="mr15"></span>
						<input type="text" class="search" v-model="setcontent"  @focus="searchFocus" :adjust-position="autokeyword" placeholder-class="placeholder" :placeholder="placeholder">

					</div>
					<div class="searchsend f14" >
						发送
					</div>
				</div>
				<div class="tabBox lineTop" v-if="!showTop">
					<div>
						<span></span>
						<p class="mt5 color32 f12"><i class="mr5">赞</i><i>255</i></p>
					</div>
					<div>
						<span></span>
						<p class="mt5 color32 f12"><i class="mr5">评论</i><i>255</i></p>
					</div>
					<div>
						<span></span>
						<p class="mt5 color32 f12"><i class="mr5">收藏</i><i>255</i></p>
					</div>
					<div @click="toggleActivityPopup">
						<span></span>
						<p class="mt5 color32 f12"><i class="mr5">可购商品</i></p>
					</div>
				</div>

			</div>
		</div>
		<van-popup :show="showActivitybottom" custom-class="bottom" @close="toggleActivityPopup" position="bottom">
			
			<div class="shopSwper">
			  <scroll-view class="scroll-view_H" scroll-x>
					  <view id="green" class="scroll-view-item_H" v-for="(item2,index2) in 6" :key="index2">
					  	<div class="scrollimg">
					  		<img src="../../../static/images/icon_official.png" alt="" />
					  	</div>
					  	<p>休闲衣</p>
					  	<div class="s_price f12 colorf45d">￥188.00</div>
					  </view>
					
				</scroll-view>
	
			</div>
			<div class="tabBox2 lineTop">
				<div>
					<span></span>
						<p class="mt5 color32 f12"><i class="mr5">赞</i><i>255</i></p>
					</div>
					<div>
						<span></span>
						<p class="mt5 color32 f12"><i class="mr5">评论</i><i>255</i></p>
					</div>
					<div>
						<span></span>
						<p class="mt5 color32 f12"><i class="mr5">收藏</i><i>255</i></p>
					</div>
					<div @click="toggleActivityPopup">
						<span></span>
						<p class="mt5 color32 f12"><i class="mr5">可购商品</i></p>
					</div>
			</div>
		</van-popup>
	</div>
</template>
<script>
	import {
		setStorage,
		getStorage,
		getSystemInfoSync,
} from "@/utils/wechat";
	import isLoading from "@/components/isLoading";
	export default {
		data() {
			return {
				commentId:null,
				imgs:[
				'https://sh.szwfy.com.cn/attachment/images/3/2018/09/B3Z3plH3S4X48KXf3x396rkszKV9uk.jpg',
				'https://sh.szwfy.com.cn/attachment/images/3/2018/10/Nwj6yZXeakH0X6gJ5aEA6hyhKqwxk8.jpg'
				],
				swiperCurrent: 0,
				 autoplay: true,
				  interval: 3000,
				  duration: 1000,
				iPhoneshow: false,
				iphoneheight: '',
				placeholder:'说点什么呢~',
				showTop:false,
				pf:'',
			
				pics:'',
				setcontent:'',
				i_h:'',
				p_h:'',
			
				showActivitybottom:false,
				autokeyword:false
	
			};
		},
		components: {
			isLoading,

		},
		watch:{
			commentId(v){

			}
		},
		computed: {
			isLoading() {
				return this.$store.state.user.isLoading
			}
		},
		methods: {
			iphone_xsp() {
				if(this.$store.state.user.systemInfo && this.$store.state.user.systemInfo.model == 'iPhone X') {
					this.iPhoneshow = true;
					this.iphoneheight = this.$store.state.user.systemInfo.windowHeight + 50 + "px";

				}

			},
			bannerSwiperChange(e) {
			  this.swiperCurrent = e.mp.detail.current;
			},
//			获取元素高度
			clientHeights(){
				
				setTimeout(()=>{
					 let query = wx.createSelectorQuery();
        		query.select(".main_img").boundingClientRect(res => {
        			
		          this.i_h=res.height;
		         
		         }).exec();
		        query.select(".praisebox").boundingClientRect(res => {
		             this.p_h=res.height
		         }).exec();
		         
		         },500)


		        
			},
			autoKeyWord(){
				let pageScroll = parseInt(this.i_h + this.p_h + 50);
				wx.pageScrollTo({
			        scrollTop: pageScroll,
			        duration: 300
			    });
			    this.placeholder_2 = "";
			},
	
			toggleActivityPopup() {
		      this.showActivitybottom = !this.showActivitybottom;
		    },
		     searchFocus() {
			      this.placeholder_2 = "";
			 },
			
	

		},
	
		mounted() {
			this.iphone_xsp();
			this.clientHeights();
		},
		onPageScroll: function(e) {
			
		setStorage("scrollY", e.scrollTop);
		let pageScroll = parseInt(this.i_h + this.p_h+10);
		    if (e.scrollTop > pageScroll) {
		      	this.showTop = true;
				 wx.setNavigationBarTitle({
			      title: '全部评论(244)'
			    });
		    } else if (e.scrollTop < pageScroll) {
		      this.showTop = false;
		      	 wx.setNavigationBarTitle({
			      title: '穿搭攻略'
			    });
		    }
		  },

		async onShow() {
			
		

		}
	};
</script>
<style scoped lang='scss'>
	.container {
		background: #F2F2F2;
		margin-bottom: 50px;

		.main_img {
		
          width: 100%;
          border-radius: 5px;
          height: 238px;
          overflow: hidden;
          .swiperContainer {
            width: 100%;
            position: relative;
            height:100%;
            .swiper {
              width: 100%;
              height: 238px;
              .slide-image {
                width: 100%;
                height: 100%;
              }
            }
            .dots {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 9px;
              display: flex;
              justify-content: center;
              .dot {
                margin: 0 4px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                transition: all 0.6s;
                border: 1.5px solid #fff;
                &.active {
                  width: 16px;
                  background: #fff;
                  border-radius:3px;
                }
              }
            }
          }
        }
		.praise {
			background: #ffffff;
			padding: 0px 15px 0 15px;
			.praiseInfo {
				position: relative;
				display: flex;
				padding:15px 0;
				// justify-content: space-between;
				align-items: center;
				width: 100%;
				.praise_ico {
					width: 30px;
					height: 30px;
					
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
				.islike{
					display: inline-block;
					position: absolute;
					padding:0 12px;
					height: 25px;
					line-height: 25px;
					background-color: #ff455d;
					border-radius: 13px;
					right: 0;
					
					color:#fff;
					text-align: center;
				}
			}
			.praiseMains {
				margin-bottom: 15px;
				margin-top:4px;
				
				>p{
					line-height: 28px;
				}
			}

		}
		.shopSwper{
			width:100%;
			height:204px;
			padding:20px 15px;
			background: #fff;
			>h4{
				font-weight: 700;
				font-size:14px;
				color:#323232;
			
				padding-bottom:20px;
			}
			.scroll-view_H {
			  width: 100%;
			  height:110px;
			 
			  white-space: nowrap;
	
			}
			
			.scroll-view-item_H {
			  width: 70px;
			  height: 105px;
			   margin-right:10px;
			  display: inline-block;
			  background: #fff;
			   .scrollimg{
			  	width:70px;
			  	height:70px;
			  	border-radius: 2px;
				border: solid 0.5px #e8e8e8;
				img{
					width:100%;
					height:100%;
				}
			  }
			  >p{
			  	text-align: center;
			  	color:#323232;
			  	font-size: 12px;
			  	margin-top:6px;
			  }
			  .s_price{
			  	margin-top:4px;
			  	text-align: center;
			  }
			}
	
		}
		.praise2 {
			margin-top: 10px;
			.commentcounts {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding:13px 0;
				.write{
					text-align: right;
					position: absolute;
					right:0px;
					
					>i{
						width:16px;
						margin-right:8px;
						
						height:15px;
						position: relative;
						top:3.5px;
						display: inline-block;
						background: url("#{$imgUrl}icon_writeacomment.png") no-repeat 100% 100%;
						background-size: cover;
					}
				}
				
			}
			.searchBoxWraper {
				width: 100%;
				padding: 10px 5px 10px 15px;
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
					background: #e8e8e8;
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

					line-height:30px;
					color:#fff;
					width: 55px;
					height: 30px;
					background-color: #ff455d;
					border-radius: 0 15px 15px 0;
					text-align: center;
					position: relative;
					right:12px;
					

				}
			}
			.tabBox{
				display: flex;
				padding:10px 15px;
			    justify-content: space-between;
				align-items: center;
				height:54px;
				background: #fff;
		
					position: fixed;
    				bottom: 0px;
    				left: 0;
				div{
					width:25%;
					height:auto;
					text-align: center;
					span{
						display: block;
						margin:0 auto;
						width:18px;
						margin-top:2px;
						height:18px;
						background: url("#{$imgUrl}icon_fabulous.png") no-repeat center center;
						background-size: 100% 100%;
					}
					p{
						i{
							display: inline-block;
							
						}
					}
				}
				div:nth-child(1) {
				      span{
				 		background: url("#{$imgUrl}icon_fabulous.png") no-repeat center center;
						background-size: 100% 100%;
						
				      }
				 }
				 div:nth-child(2) {
				      span{
				   		background: url("#{$imgUrl}icon_comment2.png") no-repeat center center;
						background-size: 100% 100%;
				      /*	background: url("#{$imgUrl}icon_comment2.png") no-repeat center center;*/
				      }
				 }
				 div:nth-child(3) {
				      span{
				     background: url("#{$imgUrl}icon_kindheart.png") no-repeat center center;
						background-size: 100% 100%;
				     
				      }
				 }
				 div:nth-child(4) {
				      span{
				       background: url("#{$imgUrl}icon_commodity.png") no-repeat center center;
						background-size: 100% 100%;
				   
				      }
				 }
			}
			.alllist {
				padding: 15px 0;
				padding-bottom: 32px;
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
					top: 10px;
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
				padding-left:39px;
				p {
					line-height: 24px;
					
				}
				.praiseWrite{
					margin-top:4px;
					width:307px;
					height:110px;
					background-color: #f2f2f2;
					padding:15px 18px;
					>p{
						line-height:18px;
						span{
							margin:0 2px;
						}
					}
					.allWritelist{
							margin-top:8px;
						span{
							
							color:#9A9A9A;
						font-size: 12px;
					
						}
						i{
							display: inline-block;
							width:18px;
							height:16px;
							transform:rotate(270deg);
							position: relative;
							top:3px;
						background: url("#{$imgUrl}icon_arrow_down.png") no-repeat center center;
						background-size: 100% 100%;
						}
					}
				}
			}
		}
			.tabBox2{
				width:100%;
				display: flex;
				padding:10px 15px;
			    justify-content: space-between;
				align-items: center;
				height:54px;
				background: #fff;
		
					position: fixed;
    				bottom: 0px;
    				left: 0;
				div{
					width:25%;
					height:auto;
					text-align: center;
					span{
						display: block;
						margin:0 auto;
						width:18px;
						margin-top:2px;
						height:18px;
						background: url("#{$imgUrl}icon_fabulous.png") no-repeat center center;
						background-size: 100% 100%;
					}
					p{
						i{
							display: inline-block;
							
						}
					}
				}
				div:nth-child(1) {
				      span{
				 		background: url("#{$imgUrl}icon_fabulous.png") no-repeat center center;
						background-size: 100% 100%;
						
				      }
				 }
				 div:nth-child(2) {
				      span{
				   		background: url("#{$imgUrl}icon_comment2.png") no-repeat center center;
						background-size: 100% 100%;
				      /*	background: url("#{$imgUrl}icon_comment2.png") no-repeat center center;*/
				      }
				 }
				 div:nth-child(3) {
				      span{
				     background: url("#{$imgUrl}icon_kindheart.png") no-repeat center center;
						background-size: 100% 100%;
				     
				      }
				 }
				 div:nth-child(4) {
				      span{
				       background: url("#{$imgUrl}icon_commodity.png") no-repeat center center;
						background-size: 100% 100%;
				   
				      }
				 }
			}
	}
</style>