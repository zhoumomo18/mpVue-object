<template>
<div class="container fullPage lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
  <map id="map" 
    :longitude="myLongitude" 
    :latitude="myLatitude" 
    scale="18" 
    @controltap="controltap" 
    :markers="markers" 
    @markertap="markertap" 
    @regionchange="regionchange" 
    @changeEnd="changeend"
    show-location 
    style="width: 100%; height: 300px;"></map>
  
  <div  class="addressinfo">
  <block v-for="(item,index) in addressList" :key="index">
     <view class="weui-media-box weui-media-box_text w100" @click='clickItem(item.location.lat,item.location.lng,item.title,item.address)' style='background-color:#fff;'>
          <view class="weui-media-box__title weui-media-box__title_in-text f16">{{item.title}}</view>
          <view class="weui-media-box__desc f14">{{item.address}}</view>
     </view>
</block>
</div>
</div>
</template>
<script>
import { getLocation, getSystemInfoSync } from "@/utils/wechat";
import QQMapWX from '../../../static/lib/qqmap-wx-jssdk';
var qqmapsdk;

export default {
  data() {
    return {
			myLatitude: 0.0,
      myLongitude: 0.0,
      addressList:[],
      markers: [{
          id: 0,
          iconPath: "/static/images/icon_adr.png",
          longitude: 0,
          latitude: 0,
          width: 26,
          height: 40
      }],
      data:{
        province:"",
        city:"",
        area:"",
        address: ""
      }, 
      iPhoneshow:false,
      iphoneheight:''
    };
  },
  components: {},
  created() {},
  methods: {
    //获取中间点的经纬度，并mark出来
     getLngLat: function() {
          var that = this;
          this.mapCtx = wx.createMapContext("map");
          this.mapCtx.getCenterLocation({
               success: function(res) {
                    that.markers= [{
                              id: 0,
                              iconPath: "/static/images/icon_adr.png",
                              longitude: res.longitude,
                              latitude: res.latitude,
                              width: 26,
                              height: 40
                         }]
                    
                    that.getPoiList(res.longitude, res.latitude)
               }
          })
     }, //视野发生变化时触发
      iphone_xsp(){
    	  if(this.$store.state.user.iphoneX){
  					this.iPhoneshow=true;
					this.iphoneheight = this.$store.state.user.systemInfo.windowHeight + 50 +"px";
					
  			}
    	  
    },
     regionchange(e) {
          if (e.type == 'end') {
            console.log("视野发生变化时触发")
               this.getLngLat()
          } else { //begin
          }
     },
     changeend(e) {
            console.log("视野发生变化时触发")
               this.getLngLat()
         
     },
     getPoiList: function(longitude, latitude) {
          var that = this
          // 调用接口
          qqmapsdk.reverseGeocoder({
               location: {
                    latitude: latitude,
                    longitude: longitude,
               },
               get_poi: 1,
               poi_options: 'policy=2;radius=3000;page_size=20;page_index=1',
               success: function(res) {
                    that.addressList= res.result.pois
               },
               fail: function(res) {
                    console.log(res);
               },
               complete: function(res) {
                    console.log(res);
               }
          });
     },

     clickItem: function(latitude,longitude,title,address) {
          // let pages = getCurrentPages();
          // let prevPage = pages[pages.length - 2];
          // prevPage.setData({
          //      address: e.currentTarget.dataset.address,
          // })
          // wx.navigateBack({
          //      delta: 1,
          // })
          var that=this;
          var addressname=title;
          //选择地点之后返回到原来页面
           // 调用接口
          qqmapsdk.reverseGeocoder({
            location: {
                latitude: latitude,
                longitude: longitude,
            },
            success: function (res) {
              console.log(res)

              that.$router.push({ path:'/pages/user/editAdress',query: { province: res.result.address_component.province, city: res.result.address_component.city,area: res.result.address_component.district,address: res.result.address_component.street+addressname}})
             
            },
            fail: function (res) {
              //console.log(res);
            },
            complete: function (res) {
              //console.log(res);
            }
          });
          // this.$router.push({ path:'/pages/user/editAdress',query: { address: address}})
     },
  },

  mounted() {
  	this.iphone_xsp();
  },
  onPullDownRefresh() {},
  onLoad: function(options) {
    var that = this
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
        key: '6IQBZ-KWUCD-S764U-P7WO6-YQQCO-7RF5F' // 必填
    });
    
    console.log(this.$route.query.province)
    var that=this;
    if(this.$route.query.province){
      this.data.province=this.$route.query.province;
      this.data.city=this.$route.query.city;
      this.data.area=this.$route.query.area;
      this.data.address=this.$route.query.address;
      
      qqmapsdk.geocoder({
        address:this.data.province+this.data.city+this.data.area+this.data.address,
        success: function (res) {
          console.log(res)
          that.myLatitude=res.result.location.lat;
          that.myLongitude=res.result.location.lng;        
        },
        fail: function (res) {
          //console.log(res);
        },
        complete: function (res) {
          //console.log(res);
        }
      });
    }else{
      wx.getLocation({
        type: 'gcj02',
        success: function(res) {
            console.log(res);
            that.myLatitude=res.latitude;
            that.myLongitude=res.longitude;
        }
      })
    }
    // 调用接口
    qqmapsdk.search({
        keyword: '酒店',
        location:{
          latitude: that.myLatitude,
          longitude: that.myLongitude
        },
        success: function (res) {
            console.log(res);
        },
        fail: function (res) {
            console.log(res);
        },
        complete: function (res) {
            console.log(res);
        }
    })
  },
  onReady: function() {
      this.getLngLat()
  },
  onShow() {  
    
		// this.latitude= this.$store.state.user.locationInfo.latitude;
		// this.longitude= this.$store.state.user.locationInfo.longitude;
		// this.markers=[
    //     {
    //       iconPath: "/static/images/icon_addressmanagement.png",
    //       id: 0,
    //       latitude: this.latitude,
		// 			longitude: this.longitude,
    //       width: 26,
    //       height: 40
    //     }
    //   ];

		// this.windowWidth = this.$store.state.user.systemInfo.windowWidth
		// this.windowHeight = this.$store.state.user.systemInfo.windowHeight

			// debugger
    // const systemInfo = getSystemInfoSync();
    // this.$store.commit("SET_SYSTEM_INFO", systemInfo);
    // let [err1, data] = await this._to(getLocation());
		// this.$store.commit("SET_LOCATION_INFO", data);
		// console.log(this.$store.state.user.systemInfo.windowWidth)
		// debugger
	}
	
};
</script>

<style  scoped lang='scss'>
.weui-media-box{padding:20rpx 0;}
  .weui-media-box__title{padding:0 30rpx;line-height:1.5;}
  .weui-media-box__desc{padding:0 30rpx;line-height:1.5;}
.addressinfo{position:fixed;z-index:199999;width:100%;bottom:0;height:500rpx;overflow-y:scroll;}
</style>