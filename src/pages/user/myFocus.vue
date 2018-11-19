<template>
<div class="container lineTop" :style="{ height: windowHeight + 'px' }">

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
                      <div class="w100 item-wrap" v-if="0">
                          <div class="myFocusAll">
                              <h3 class="f13 color32 lineBottom">你可能感兴趣的人</h3>
                              <div class="item lineBottom" v-for="(item,index) in 3"  :key="index">            
                                    <img  class="fl shopLogo" src="../../../static/images/icon_official.png" alt="">
                                    <div class="shopName">
                                        <span class=" over_hidden f16" >老王</span>
                                        <span class="text">你可能认识的人</span>
                                    </div>
                                    <div class="cancelFocus fr mr15">
                                        <span>关注</span>
                                    </div>
                              </div> 
                      
                          </div>
                          <div class="myFocusAll">
                              <h3 class="f13 color32 lineBottom">你关注的好友</h3>
                              <div class="item lineBottom" v-for="(item,index) in 2"  :key="index">            
                                    <img  class="fl shopLogo" src="../../../static/images/icon_official.png" alt="">
                                    <div class="shopName">
                                        <span class=" over_hidden f16" >老王</span>
                                        <span class="text">100个粉丝</span>
                                    </div>
                                  
                                  <div class="cancelFocus fr mr15">
                                      <span class="editbgc">关注</span>
                                  </div>
                              </div> 
                      
                          </div> 
			                </div>
                      <div class="empty_2">
                        <img src="../../../static/images/img_focus.png">
                        <div>您还没有关注过用户哟o(∩_∩)o</div>
                      </div>
        		    </div>

        </swiper-item>
        <swiper-item>
        		<div class="likeAll" id="item2">
	        			<div class="w100 item-wrap">
        				   <div class="myFocusAll"  v-if="list&&list.length>0">
      
							        <div class="item lineBottom" v-for="(item,index) in list" v-if="item.isfollow==1" :key="index">            
							              <img  class="fl shopLogo" :src="item.logo" alt="">
							         <div class="shopName">
							         		<span class=" over_hidden f16" @click="$router.push({ path:'/pagesSub/busineshop/shop',query: { id: item.merchid }})">{{item.merchname}}</span>
							         		<span class="text">有50人点赞</span>
							         </div>
							            
							            <div class="cancelFocus fr mr15" @click="tabfollow(item.isfollow,item.merchid,index)">
							                <span>{{item.isfollow==1?"已关注":"关注"}}</span>
							            </div>
							      </div> 
							
							    </div> 
			           </div>
        		</div>
        
        </swiper-item>
        <swiper-item>
            <div class="likeAll" id="item3">
                <div class="empty_2">
                  <img src="../../../static/images/img_focus.png">
                  <div>您还没有关注过商场哟o(∩_∩)o</div>
                </div>

        		</div>
        		</swiper-item>
        </swiper>
      </div>
</div>
</template>
<script>
import { getSystemInfoSync } from "@/utils/wechat";
export default {
  data() {
    return {
      contentHeight: '500px',
      windowHeight: 0,
      page: 1,
      per_page: 10,
      list: [],
      fllow_s: "",
      activeIndex: 0,
      currentTab: 0,
      tabs: [
        {
          name: "用户",
          type: "1",
          checked: true
        },
        {
          name: "商家",
          type: "2",
          checked: true
        },
        {
          name: "商场",
          type: "3",
          checked: true
        }
      ]
    };
  },
  components: {},
  created() {},
  methods: {
    tabClick(e) {
      this.activeIndex = e.currentTarget.id;

      this.currentTab = this.activeIndex;
    },
    swiperChange(e) {
      this.currentTab = e.mp.detail.current;
      this.activeIndex = this.currentTab;
      setTimeout(()=>{
         if (this.currentTab == 0) {
          var query = wx.createSelectorQuery();
          query
            .select("#item1")
            .boundingClientRect(res => {
              // this.contentHeight = res.height + 28 + "px";
            })
            .exec();
        } else if (this.currentTab == 1) {
          var query = wx.createSelectorQuery();
          query
            .select("#item2")
            .boundingClientRect(res => {
              this.contentHeight = res.height + 28 + "px";
            })
            .exec();
        } else if (this.currentTab == 2) {
          var query = wx.createSelectorQuery();
          query
            .select("#item3")
            .boundingClientRect(res => {
              this.contentHeight = res.height + 28 + "px";
            })
            .exec();
        }
      },500)
    },
    async getMore() {
      var dataList = this.list;
      let result = await this._to(
        this.$http.myfollow(
          this.$store.state.user.userInfo.openId,
          this.page,
          this.per_page
        )
      );

      if (!result[1].error && !result[1].list.total) {
        this.list = [];
      } else if (!result[1].error && result[1].list.data.length > 0) {
        console.log(dataList);
        this.list = dataList.concat(result[1].list.data);
        this.page++;
      } else {
        console.log("加载失败");
        return false;
      }
    },
    async tabfollow(fllow, merchid, index) {
      if (fllow == 1) {
        let resultList = await this._to(
          this.$http.getfollow(
            merchid,
            this.$store.state.user.userInfo.openId,
            0
          )
        );
        if (resultList[1].status == 1) {
          this.list = this.list.filter(function(val, i) {
            return i != index;
          });
        }
      }
    },
    async sharelist() {
      let result = await this._to(
        this.$http.myfollow(this.$store.state.user.userInfo.openId)
      );
      this.list = result[1].list.data;

      
    }
  },

  onPullDownRefresh() {},
  onShow() {
    this.activeIndex = 0;
    setTimeout(() => {
      var query = wx.createSelectorQuery();
      query
        .select("#item1")
        .boundingClientRect(res => {
          // this.contentHeight = res.height + 28 + "px";
        })
        .exec();
    }, 500);
  },
  onReachBottom: function() {
    console.log("加载更多");
    var that = this;
    that.loadMoreTxt = "拼命加载中";

    setTimeout(() => {
      this.getMore();
    }, 1000);
  },
  async mounted() {
    const systemInfo = getSystemInfoSync();
    console.log(systemInfo);
    if (systemInfo.model == "iPhone X") {
      this.windowHeight = systemInfo.windowHeight - 34;
    } else {
      this.windowHeight = systemInfo.windowHeight;
    }
    this.getMore();
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return "navbar_slider_0";
      }
      if (this.activeIndex == 1) {
        return "navbar_slider_1";
      }
      if (this.activeIndex == 2) {
        return "navbar_slider_2";
      }
    }
  }
};
</script>
<style  scoped lang='scss'>
.container {
  background: #f2f2f2f2;

  .h100 {
    height: 100px;
    line-height: 100px;
  }
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
        width: 80px;
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
        left: 22.5%;
        z-index: 10;
      }

      .navbar_slider_1 {
        z-index: 10;
        left: 43.5%;
      }
      .navbar_slider_2 {
        z-index: 10;
        left: 65%;
      }
    }

    .content {
      box-sizing: border-box;
      /* height: 100%;*/
      width: 100%;
      -webkit-overflow-scrolling: touch;
      .likeAll {
        .item-wrap {
          .myFocusAll {
            width: 100%;
            padding: 0 15px;
            h3 {
              height: 45px;
              line-height: 45px;
            }
            .item {
              height: 60px;
              line-height: 60px;
              .shopLogo {
                width: 37px;
                height: 37px;
                position: absolute;
                top: 12px;

                border-radius: 50%;
              }
              .shopName {
                display: inline-block;
                width: 440rpx;
                margin-left: 37px;
                padding: 14.5px 10px;
                span {
                  display: block;
                  height: 18px;
                  line-height: 18px;
                }
                .text {
                  color: #9a9a9a;
                  font-size: 11px;
                }
              }
              .cancelFocus {
                & > span {
                  display: inline-block;
                  width: 54px;
                  height: 26px;
                  border: 1px solid #ff455d;
                  color: #fff;
                  background: #ff455d;
                  text-align: center;
                  font-size: 12px;
                  line-height: 26px;
                  // vertical-align: middle;
                  border-radius: 5px;
                }
                .editbgc {
                  border: 1px solid #9a9a9a;
                  color: #9a9a9a;
                  background: #fff;
                }
              }
            }
          }
        }
      }
      #item1 {
        .myFocusAll {
          margin-top: 10px;
          background: #fff;
        }
      }
      #item2 {
        .item-wrap {
          display: flex;
          /*background: #f2F2F2;*/
          flex-wrap: wrap;

          justify-content: flex-start;

          /*促销活动*/
          .myFocusAll {
            margin-top: 10px;
            background: #fff;
          }
        }
      }
      #item3 {
        height: 600px;
      }
    }
  }
  /*.myFocusAll {
    width: 100%;
    .item {
      .shopLogo {
        width: 26px;
        height: 26px;
        position: absolute;
        top: 7px;
        left: 15px;
        border-radius: 50%;
      }
      .shopName {
        display:inline-block;
        width:440rpx;
        margin-left: 57px;
      }
      .cancelFocus {
        // height: 40px;
        // line-height: 40px;
        & > span {
          display: inline-block;
          width: 54px;
          height: 24px;
          border: 1px solid #ff455d;
          color: #ff455d;
          text-align: center;
          font-size: 12px;
          line-height: 24px;
          // vertical-align: middle;
          border-radius: 5px;
        }
      }
    }
  }*/
}
</style>
