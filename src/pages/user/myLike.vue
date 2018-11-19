<template>
<div class="container lineTop">    
    <!--<div v-if="list&&list.length<=0" class="empty_2">
        <img src="../../../static/images/img_collect_none.png">
        <div>您还没有收藏过商品哟o(∩_∩)o</div>
      </div>-->
      <div class="swiper">
 			<div class="navbar">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item" @click="tabClick">
            <div class="navbar_title" :class="{'selective':activeIndex == index}">{{item.name}}</div>
          </div>
        </block>
        <div class="navbar_slider" :class="navbarSliderClass"></div>
      </div>
       <swiper class="content" :duration="50" @change="swiperChange" :style="'height:'+contentHeight" :current="currentTab"
        @animationfinish="onAnimationfinish">
        <swiper-item>
        		<div class="likeAll" id="item1">
        				   <div class="w100 item-wrap active_t">
        				   	<!--<div class="item lineLeft lineBottom2" v-for="(item2,index2) in list" :key="index2" @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item2.id }})">-->
			              <div class="item" v-for="(item2,index2) in list" :key="index2" @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item2.id }})">
			              	<div class="over_box">
			                <a href="">
			
			                  <wux-image wux-class="image" :src="item2.thumb">
			                  </wux-image>
			                </a>
			                <div class="item_text over_hidden">
			                  {{item2.title}}
			                </div>
			                <div class="itemDetial">
			
			                  <span class="fl colorf45d f14">￥{{item2.productprice}}</span>
			                  <span class="fr f12 color_s">已售{{item2.sales}}件</span>
			
			                </div>
			                </div>
			              </div>
			            </div>
        		</div>
        </swiper-item>
        <swiper-item>
        		<div class="likeAll" id="item2">
        			      <div class="w100 item-wrap active_f">
           
            	
							<div class="active_box1">
               <div class="item active_fiex" v-for="(item,index) in list" :key="index" v-if="index%2 !==1" @click="activity_info(item.id)">
              	<div class="item_box_1">
                <a href="">
                	<img :src="item.thumb" alt="">
                	<span class="z_price_2">
                		<i>
                			
                		</i>{{item.productprice}}
                	</span>
                </a>
                <div class="item_text item_text2">
                  	#话题#Made in china:<i>晒一下你在国外买到的假洋货吧</i>

                </div>
   				<div class="item_ico">
   					<li class="lis_1">
   						<span>
   							<img src="../../../static/images/icon_official.png" alt="" /> 
   						</span>
   						<i class="f14">老王</i>
   					</li>
   					<li class="lis_2">
   						<span>
   						<img src="../../../static/images/icon_kindheart.png" alt="" /> 
   						</span>
   						<i class="f14">1204</i>
   					</li>
   					
   				</div>
                
                </div>
              </div>
              </div>
              <div class="active_box2">
               <div class="item active_fiex" v-for="(item,index) in list" :key="index" v-if="index%2 ==1" @click="activity_info(item.id)">
              	<div class="item_box">
                <a href="">
                	<wux-image wux-class="image" :src="item.thumb">
									</wux-image>
                	
                	<span class="z_price_2">
                		<i>
                			
                		</i>{{item.productprice}}
                	</span>
                </a>
                <div class="item_text item_text2">
                  #话题#Made in china:<i>晒一下你在国外买到的假洋货吧</i>

                </div>
              		<div class="item_ico">
   					<li class="lis_1">
   						<span>
   							<img src="../../../static/images/icon_official.png" alt="" /> 
   						</span>
   						<i class="f14">老王</i>
   					</li>
   					<li class="lis_2">
   						<span>
   						<img src="../../../static/images/icon_kindheart.png" alt="" /> 
   						</span>
   						<i class="f14">1204</i>
   					</li>
   					
   				</div>
                
                </div>
              </div>
              </div>

              
            </div>
        		</div>
        </swiper-item>
        </swiper>
      </div>
    <!--<div class="likeAll" v-if="list&&list.length>0">
  
          <div class="item" v-for="(item,index) in list" :key="index" @click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item.goodsid }})">
          	<div style="width:100%;height:155px;">
              <wux-image wux-class="image" shape="thumbnail" :src="item.thumb">
            	</wux-image>
          	</div>
           
            <div class="itemDetial">
              <span class="fl f16 width_s over_hidden">{{item.title}}</span>
              <span class="fr colorf45d f16">￥{{item.productprice}}</span>
            </div>
        </div> 
        	
		
    </div>-->
  	<div class="mt10" v-if="list&&list.length>5">
		<zan-loadmore v-if="!isBottom" type="loading" ></zan-loadmore>
		<zan-loadmore v-if="isBottom" type="text"  text="暂无数据"></zan-loadmore>
	</div>
	
</div>
</template>
<script>
import {getSystemInfoSync} from "@/utils/wechat";

export default {
  data() {
    return {
      windowHeight:0,
      page: 1,
      per_page: 10,
      list:[],
      page : 1,
      prePage : 6,
      isBottom:false,
      contentHeight: 0,
        tabs: [{
        name: "商品",
        type: "1",
        checked: true
      },
      {
        name: "文章",
        type: "2",
        checked: true
      },
      
    ],
    activeIndex: 0,
    currentTab: 0,
    };
  },
  components: {},
  created() {},
  methods: {
    async getMore(){
      var dataList=this.list;
      let result = await this._to(
        this.$http.mylike(this.$store.state.user.userInfo.openId,this.page,this.per_page)
      );
      if(!result.error&&!result.list.total){
        this.list = [];
      }else if(!result.error&&result.list.data.length>0){
        console.log(dataList)
        this.list = dataList.concat(result.list.data);
        this.page++;
      }else{
        console.log("加载失败")
        return false;
      }
    },
      tabClick(e) {
        this.activeIndex = e.currentTarget.id;

        this.currentTab = this.activeIndex;
      },
            swiperChange(e) {
        this.currentTab = e.mp.detail.current;
        this.activeIndex = this.currentTab;
        if (this.currentTab == 0) {

          var query = wx.createSelectorQuery();
          query
            .select("#item1")
            .boundingClientRect(res => {
              this.contentHeight = res.height + 28 + 'px';
            })
            .exec();
        } else if (this.currentTab == 1) {
          var query = wx.createSelectorQuery();
          query
            .select("#item2")
            .boundingClientRect(res => {
              this.contentHeight = res.height + 28 + 'px';
            })
            .exec();
        } 
      },
         onAnimationfinish() {
        console.log("滑动完成.....");
      }
  },
  async onReachBottom() {
    
   if( this.isBottom) return
     
//   let data = await this.$http.marketList(
//        this.$store.state.user.locationInfo.latitude,
//        this.$store.state.user.locationInfo.longitude,
//        ++this.page,
//        this.prePage,
//        1
//		)
     
     
     	let result = await this._to(
		       this.$http.mylike(this.$store.state.user.userInfo.openId,
		       	++this.page,
		       	this.prePage
		       )
     	);
    	
    
     
     
    
		if(result[1].list.data.length<this.prePage){
			this.isBottom=true
		}
		this.list = [...this.list,...result[1].list.data];
   
    
   	

    
  },
  async mounted() {
   	 let result = await this._to(
       this.$http.mylike(this.$store.state.user.userInfo.openId)
     );
    
     this.list = result[1].list.data;

  },
    computed: {
      navbarSliderClass() {
        if (this.activeIndex == 0) {
          return "navbar_slider_0";
        }
        if (this.activeIndex == 1) {
          return "navbar_slider_1";
        }
      },
    },

  onPullDownRefresh() {},
  async onShow() {
		 setTimeout(() => {

        var query = wx.createSelectorQuery()
        query.select('#item1').boundingClientRect((res) => {
       
          this.contentHeight = res.height + 28 + 'px';

        }).exec()
      }, 500)
  }
};
</script>
<style  scoped lang='scss'>
.container {
	background:#f2f2f2;
padding-bottom:10px;
    .swiper {
      width: 100%;

      .navbar {
        border-radius: 3px 3px 0 0;
        /*display: -webkit-box;
        display: -webkit-flex;
        display: flex;*/
        position: relative;
        top: 0;
        height: 40px;
        width: 100%;
        background-color: #fff;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        text-align: center;

        /*	box-shadow: 0px 4px 7.4px 0.6px rgba(0, 0, 0, 0.1) !important;*/
        .navbar_item {
          position: relative;
          display: inline-block;
          width:80px;
          /*-webkit-box-flex: 1;
          -webkit-flex: 1;
          flex: 1;*/
          padding: 10px 0;
          text-align: center;
          font-size: 0;

          .navbar_title {
            color: #9a9a9a;
            font-weight: 500;
            display: inline-block;
            font-size: 14px;
            max-width: 8em;
            width: auto;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
          }

          .selective {
            color: #323232;
            font-size: 16px;
          }

          .navbar_item_on {
            color: #ff455d;
          }
        }

        .navbar_slider {
          position: absolute;
          left: 0;
          bottom: -2px;
          z-index: 10;
          width: 48px;
          height: 3px;
          background-color: #000000;
          border-radius: 2px;
          transition: all 0.1s;
        }

        .navbar_slider_0 {
          left: 33%;
          z-index: 10;
        }

        .navbar_slider_1 {
        z-index: 10;
          left: 54.5%;
        }

      }

      .content {
        box-sizing: border-box;
        /* height: 100%;*/
        width: 100%;
        -webkit-overflow-scrolling: touch;

        #item1 {
          /*padding:10px;*/
         display: block;
          background: #f2F2F2;
			.item-wrap {
				/*padding:15px;*/
				 display: flex;
        		align-items:center;
        		justify-content:space-between;
        		padding:7.5px;
        		.item {
        			padding:7.5px;
        			.over_box{
        				background: #fff;
        				overflow: hidden;
        				border-radius: 5px;
        			}
        		}
			}
    
        }
        #item2{
        
          .item-wrap {
            display: flex;
            /*background: #f2F2F2;*/
            flex-wrap: wrap;

            justify-content: flex-start;

            .item {
              position: relative;
              border-radius: 2px;
              width: 50%;
              padding: 8px 10px;




              a {
                display: block;
                height: 169px;
                width: 100%;
                overflow: hidden;
                margin: 0 auto;

                img {
                  width: 100%;
                  height: 100%;
                }

              }

              .item_text {
                width: 170px;
                height: 31.5px;
                font-family: PingFang-SC-Regular;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 20px;
                letter-spacing: 0;
                color: #323232;
                padding: 9px 16px;
                position: relative;

              }



              .z_price {

                display: inline-block;
                position: absolute;
                left: 0px;
                width: 40px;
                height: 20px;
                line-height: 20px;
                background-color: #ff455d;
                border-radius: 0px 4px 4px 4px;

                text-align: center;
                font-size: 12px;
                color: #ffffff;
                overflow: hidden;
                top: 0px;

              }
            }

            /*促销活动*/



            .active_fiex {

              /*	border:0.5px solid #e8e8e8;*/
              display: block;
              /*float: right;*/

              border-radius: 6px;
              padding: 4px;

              .item_box {
                border: 0.5px solid #e8e8e8;
                border-radius: 8px;
                background: #fff;
                overflow: hidden;
                box-shadow: 0rem 1px 1.9px 0.1px rgba(0, 0, 0, 0.2);

                a {
                  position: relative;

                  .z_price_2 {

                    display: inline-block;
                    position: absolute;
                    right: 7.5px;
                    width: 80px;
                    height: 30px;
                    line-height: 20px;
                    /*background-color: #ff455d;*/
                    border-radius: 0px 4px 4px 4px;
                    vertical-align: middle;
                    text-align: center;
                    font-size: 12px;
                    color: #ffffff;
                    overflow: hidden;
                    bottom: 7.5px;

                    i {
                      display: inline-block;
                      width: 14px;
                      height: 13px;
                      margin-right: 6px;
                      vertical-align: middle;
                      margin-bottom: 2px;
                      background: url("#{$imgUrl}icon_heart_xing.png") no-repeat 100% 100%;
                      background-size: cover;
                    }


                  }
                }

                .itemDetial2 {
                  padding: 20px 9px 9px 9px;
                }

                .item_text2 {
                  width: 100%;
                  height: auto;

                  i {
                    display: inline;
                    color: #9A9A9A;
                    font-size: 12px;
                  }
                }
                               .item_ico{
	                	height:30px;
	                	
	                	display: flex;
	    				flex-wrap: wrap;
						 justify-content:space-between;
						 position: relative;
						 line-height:30px;
						 

						 
                	.lis_1{
                		
                		position: absolute;
                		left:7.5px;
                		width:60px;
                		vertical-align:middle;
                		span{
                			margin:3px;
                			display: inline-block;
                			width:23px;
                			height:23px;
                			border-radius: 50%;
                			img{
                				width:100%;
                				height:100%;
                			}
                		}
                		i{
                			position: relative;
                			top:-6px;
                			display: inline-block;
                			color:#323232;
                		} 
                	}
                	.lis_2{
                	
                		right:0px;
                		width:60px;
                		position: absolute;
                		span{
                			display: inline-block;
                			width:13px;
                			height:12px;
                			border-radius: 50%;
                			margin-right:5.5px;
                			position: relative;
                			top:2px;
                			img{
                				width:100%;
                				height:100%;
                			}
                		}           
                		i{
                			display: inline-block;
                			color: #9a9a9a;
                		}     		
                	}
                }

              }

              /*	padding:16rpx 20rpx;*/

            }
          }
          .active_f {
          	padding: 7.5px;
            div {
              width: 100%;
            }

            /*	display: block !important;*/
            .active_box1 {
              display: flex;
              flex-direction: column;
              width: 50%;
              height: 100%;
				.active_fiex{
					border-radius:12rpx;
					padding:8rpx;
					.item_box_1{
						/* border: 0.5px solid #e8e8e8;*/
                border-radius: 4px;
                background: #fff;
                overflow: hidden;
                box-shadow: 0px 1px 1.9px 0.1px rgba(0, 0, 0, 0.2);
                    .item_text2 {
                  width: 100%;
                  height: auto;

                  i {
                    display: inline;
                    color: #9A9A9A;
                    font-size: 12px;
                  }
                }
                .item_ico{
	                	height:30px;
	                	
	                	display: flex;
	    				flex-wrap: wrap;
						 justify-content:space-between;
						 position: relative;
						 line-height:30px;
						 

						 
                	.lis_1{
                		
                		position: absolute;
                		left:7.5px;
                		width:60px;
                		vertical-align:middle;
                		span{
                			margin:3px;
                			display: inline-block;
                			width:23px;
                			height:23px;
                			border-radius: 50%;
                			img{
                				width:100%;
                				height:100%;
                			}
                		}
                		i{
                			position: relative;
                			top:-6px;
                			display: inline-block;
                			color:#323232;
                		} 
                	}
                	.lis_2{
                	
                		right:0px;
                		width:60px;
                		position: absolute;
                		span{
                			display: inline-block;
                			width:13px;
                			height:12px;
                			border-radius: 50%;
                			margin-right:5.5px;
                			position: relative;
                			top:2px;
                			img{
                				width:100%;
                				height:100%;
                			}
                		}           
                		i{
                			display: inline-block;
                			color: #9a9a9a;
                		}     		
                	}
                }
					}

				}
            }

            .active_box2 {
              display: flex;
              flex-direction: column;
              width: 50%;
              height: 100%;

            }
          }
        }

        .likeAll {
          .active_f .active_fiex:nth-child(1) {
            /*	float:left !important;*/

          }

          .item-wrap {
            display: flex;
            background: #f2F2F2;
            flex-wrap: wrap;

            justify-content: flex-start;

            .item {
              position: relative;
              border-radius: 2px;
              width: 50%;
              padding: 8px 10px;




              a {
                display: block;
                height: 169px;
                width: 100%;
                overflow: hidden;
                margin: 0 auto;

                img {
                  width: 100%;
                  height: 100%;
                }

              }

              .item_text {
                width: 150px;
                height: 31.5px;
                font-family: PingFang-SC-Regular;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 20px;
                letter-spacing: 0;
                color: #323232;
                padding: 9px 13.5px;
                position: relative;

              }

              .itemDetial {
                height: 28px;
                padding: 0 13.5px;

                .color_s {
                  color: #9a9a9a;
                }
              }

              .z_price {

                display: inline-block;
                position: absolute;
                left: 0px;
                width: 40px;
                height: 20px;
                line-height: 20px;
                background-color: #ff455d;
                border-radius: 0px 4px 4px 4px;

                text-align: center;
                font-size: 12px;
                color: #ffffff;
                overflow: hidden;
                top: 0px;

              }
            }

            /*促销活动*/



            .active_fiex {

              /*	border:0.5px solid #e8e8e8;*/
              display: block;
              /*float: right;*/

              border-radius: 6px;
              padding: 4px;

              .item_box {
              
                border-radius: 4px;
                background: #fff;
                overflow: hidden;
                box-shadow: 0rem 1px 1.9px 0.1px rgba(0, 0, 0, 0.2);

                a {
                  position: relative;

                  .z_price_2 {

                    display: inline-block;
                    position: absolute;
                    right: 7.5px;
                    width: 80px;
                    height: 30px;
                    line-height: 20px;
                    /*background-color: #ff455d;*/
                    border-radius: 0px 4px 4px 4px;
                    vertical-align: middle;
                    text-align: center;
                    font-size: 12px;
                    color: #ffffff;
                    overflow: hidden;
                    bottom: 7.5px;

                    i {
                      display: inline-block;
                      width: 14px;
                      height: 13px;
                      margin-right: 6px;
                      vertical-align: middle;
                      margin-bottom: 2px;
                      background: url("#{$imgUrl}icon_heart_xing.png") no-repeat 100% 100%;
                      background-size: cover;
                    }


                  }
                }

                .itemDetial2 {
                  padding: 20px 9px 9px 9px;
                }

                .item_text2 {
                  width: 100%;
                  height: auto;

                  i {
                    display: inline;
                    color: #9A9A9A;
                    font-size: 12px;
                  }
                }

              }

              /*	padding:16rpx 20rpx;*/

            }
          }

          .active_f {
            div {
              width: 100%;
            }

            /*	display: block !important;*/
            .active_box1 {
              display: flex;
              flex-direction: column;
              width: 50%;
              height: 100%;

            }

            .active_box2 {
              display: flex;
              flex-direction: column;
              width: 50%;
              height: 100%;

            }
          }
        }
      }
    }
  .likeAll {
    display: flex;
	width:100%;
    flex-wrap: wrap;
    justify-content: flex-start;
       .item {
      width:185px;
      padding:15px;
      border-radius: 2px;
      & > img {
       	width:164px;
		height:215px;
     
      }

    }

    
  }
}
</style>
