<template>
  <div class="container full" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}" @click="hideDot">
    <isLoading :isLoading='isLoading'></isLoading>
    <!-- 右侧导航楼梯 -->
    <div class="leftTop" v-if="floorShow">
      <div class="item mt10" :class="{'active':activeIndex == 0}"  v-if="recom_list&&recom_list.length>0" @click="goFloor(0,$event)" id="0">
        推荐
      </div>
      <div class="like mt10" v-if="follow_list&&follow_list.length>0" @click="goFloor(1,$event)" id="1">
        <div class="likeIn"></div>
      </div>
      <div class="item mt10" @click="goFloor((index+2),$event)" v-if="floor_list&&floor_list.length>0" v-for="(item,index) in floor_list" :key='index' :class="{'active':activeIndex == (index+2)}" :id="(index+2)">{{item.name}}</div>
      <div class="goTop mt10" @click="goBack()">
        <div class=".goTopIn"></div>
      </div>
    </div>
    <!-- 右侧导航楼梯 -->

    <!-- 主体 -->

    <scroll-view class="scroll-view_H" scroll-y style="width: 100%" @scroll="scroll" :scroll-into-view="toView">
      
      <div id="floorTop" class="circleimg w100">
        <wux-image wux-class="image" shape="circle" :src="cluster_info.images">
        </wux-image>
        <div class="poshead">
          <div class="focus" :class="{'active':isFocus=='1'}" @click="focus">关注</div>
          <div class="tri_dot" @click.stop="clickDotShow"></div>
        </div>

        <div class="tri_dot_down" v-show="dotShow">
          <div class="lineBottom" @click="$router.push({ path:'/pages/user/feedback',query:{pageName:$router.currentRoute.fullPath}})">
            报错
          </div>
          <button open-type="share">分享</button>
        </div>
      </div>
        
      <!-- 商圈信息 -->
      <div class="circleinfo managementList">
        <div class="handerItem">
          <div></div>
          <div class="icon">
            <img src="../../../static/images/icon_addresse.png">
          </div>
          <div class="hander_name over_hidden" @click="openLocation">{{cluster_info.province}}{{cluster_info.city}}{{cluster_info.area}}{{cluster_info.addr}}</div>
          <div class="lineLeft rightbtn" @click="dialTel(cluster_info.tel)">
            <div class="icon icon1">
              <img src="../../../static/images/icon_iphone.png">
            </div>
          </div>
        </div>
        <div class="handerItem">
          <div class="icon">
            <img src="../../../static/images/icon_time.png">
          </div>
          <div class="hander_name over_hidden">{{cluster_info.business_time}}</div>
        </div>

        <div class="handerItem mt10" v-if="msgList.length>0">
          <div class="icon">
            <img src="../../../static/images/icon_activity.png">
          </div>
          <div class="hander_name over_hidden">
            <swiper class="swiper_container" vertical="true" autoplay="true" circular="true" interval="2000">
              <div v-for="(item,index) in msgList" :key="index">
                <div @click="$router.push({ path:'/pagesSub/busineshop/activeinfo',query:{id:item.id,clusterid:$route.query.id,cluster:1}})">
                  <swiper-item @touchmove.stop="catchtouchmove">
                    <div class="swiper_item">{{item.title}}</div>
                  </swiper-item>
                </div>
              </div>
            </swiper>
          </div>
          <div class="hander_r"></div>
        </div>
      </div>

      <!-- 筛选 -->
      <div class="selectwrap mt10">
        <div class="selectitem selectitem0 lineBottom">
          <div class="searchBox" v-if="searchShow">
            <!-- :class="{'possearch':!searchShow}" --> 
            <span class="searchIcon mr10"></span>
            <input type="text" class="search" placeholder-class="placeholder" v-model="keywords" placeholder="搜索店铺" @confirm="searchConfirm" @blur="searchBlur" focus="isautoFocus">
          </div>
          <div class="searchBox searchBox1" v-if="!searchShow" @click="clickSearch">
            <span class="searchIcon mr10"></span>
            <p class="placeholder">搜索店铺</p>
          </div>
        </div>
        <div class="selectitem selectitem0 lineBottom">
          <div class="l">自动筛选活动店铺</div>
          <div class="r">
            <div>
              <switch class="switchtag wx-switch-input" v-if="isactivity=='1'" checked @change="switch1Change"/>
              <switch class="switchtag wx-switch-input" v-if="isactivity=='0'" @change="switch1Change"/>
            </div>
          </div>
        </div>
        <div class="selectitem selectitem1">
          <van-tab class="catewrap"
            data-item-id="11111"
            :list="catelist.list"
            tab-class="cateclass"
            active-tab-class="cateselected"
            :selected-id="catelist.selectedId"
            :scroll="catelist.scroll"
            :height="catelist.height"
            @tabchange="catetabChange"
          />          
        </div>
      </div>

      <div id="floorwrap">
        <!-- 推荐的商场 -->
        <div id="floor0" class="scroll-view-item_H focus w100" v-if="recom_list&&recom_list.length>0">
          <div class="dt colorf45d">推荐</div>
          <div class="dd flexwrap">
            <div v-for="(item,index) in recom_list" :key="index" @click="$router.push({ path:'/pagesSub/busineshop/shop',query:{id:item.id}})">
                <wux-image wux-class="image" shape="circle" :src="item.logo"></wux-image>
                <div :class="[item.has_activity==1 ? 'discount' : '','tag']"></div>
            </div>
          </div>
        </div>

        <!-- 关注的商场 -->
        <div id="floor1" class="scroll-view-item_H focus w100" v-if="follow_list&&follow_list.length>0">
          <div class="dt colorf45d">关注</div>
          <div class="dd flexwrap">
            <div v-for="(item,index) in follow_list" :key="index" @click="$router.push({ path:'/pagesSub/busineshop/shop',query:{id:item.id}})">
                <wux-image wux-class="image" shape="circle" :src="item.logo"></wux-image>
                <div :class="[item.has_activity==1 ? 'discount' : '','tag']"></div>
            </div>
          </div>
        </div>

        <!-- 商场楼层 -->
        <div v-if="floor_list&&floor_list.length<=0" class="empty">
          <img src="../../../static/images/icon_none.png">
          <div>该商场还没有相关店铺哦o(∩_∩)o</div>
        </div>

        <div class="circlecont w100" v-if="floor_list&&floor_list.length>0">
          <div class="scroll-view-item_H w100" v-for="(item,index) in floor_list" :key="index">
            <div :id="'floor'+(index+2)" class="w100" v-if="item.merch_list&&item.merch_list.length>0">
              <div class="dt">{{item.name}}</div>
              <div class="dd flexwrap">
                <div v-for="(childitem,childindex) in item.merch_list" :key="childindex" @click="$router.push({ path:'/pagesSub/busineshop/shop',query:{id:childitem.id}})">
                  <wux-image wux-class="image" shape="circle" :src="childitem.logo"></wux-image>
                  <div :class="[childitem.has_activity==1 ? 'discount' : '','tag']"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import {
  login,
  getUserInfo,
  getSetting,
  setStorage,
  getStorage,
  getLocation
} from "@/utils/wechat";
import { mapState, mapGetters, mapActions } from "vuex";
import isLoading from "@/components/isLoading";
export default {
  data() {
    return {      
      dotShow: false,
      msgList: [],
      isFocus: 0,
      openid: null,
      authkey: null,
      cluster_info: {
        images: "",
        province: "",
        city: "",
        area: "",
        addr: "",
        tel: "",
        business_time: "",
        latitude: "0",
        longitude: "0"
      },
      recom_list:[],
      floor_list: [],
      follow_list: [],
      toView: "",
      floor_list_floor: [],
      activeIndex: -1,
      floorShow:false,
      floorShowHeight:0,
      hasAuthInfo: false,
      userInfo: "",
      iPhoneshow: false,
      iphoneheight: "",
      isactivity:0,
      cateid:"",
      cateactive:-1,
      catelist: {
        list: [],
        selectedId: '',
        scroll: true,
        height: 36
      },
      isautoFocus:false,
      searchShow:false,
      keywords:'',
    };
  },
  components: {
    isLoading
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    isLoading() {
      return this.$store.state.user.isLoading;
    }
  },
  onShareAppMessage(options) {
    return {
      title:
        (this.$store.state.user.userInfo
          ? this.$store.state.user.userInfo.nickName
          : "") + "给您分享天天逛街的商场...",
      path: "/pagesSub/busineshop/shoplist?id=" + this.$route.query.id
    };
  },
  methods: {
    async hasauth() {
      const res = await getSetting();
      if (res.authSetting["scope.userInfo"]) {
        console.log("用户已经授权过");
        this.hasAuthInfo = true;
        const data = await getUserInfo();
        this.userInfo = data.userInfo;
      } else {
        console.log("用户还未授权过");
      }
    },
    catchtouchmove() {
      return false;
    },
    async initData(){
      const [err, res] = await this._to(
        this.$http.getWeekListMore(this.$route.query.id, this.openid,this.isactivity,this.cateid,this.keywords)
      );
      this.cluster_info = res.result.cluster_info;
      this.recom_list = res.result.cluster_info.recommend_merchs;
      this.floor_list = res.result.floor_list;
      this.follow_list = res.result.follow_list;
      this.isFocus = res.result.cluster_info.clusterFollow;
      this.msgList = res.result.cluster_info.activity;
      this.$store.commit("SET_IS_LOADING", false);
      this.isautoFocus = false;
      
      let that=this;
      that.floor_list_floor=[];
      setTimeout(() => {
        var query = wx.createSelectorQuery();
        query
          .select("#floorwrap")
          .boundingClientRect(res => {
            that.floorShowHeight=res.top;
          })
          .exec();        

        if(that.follow_list.length>0){
        var query = wx.createSelectorQuery();
        query
          .select("#floor0")
          .boundingClientRect(res => {
            that.floor_list_floor.push(res.top)
          })
          .exec();
        }else{
          that.floor_list_floor.push(0)
        }

        if(that.follow_list.length>0){
        var query = wx.createSelectorQuery();
        query
          .select("#floor1")
          .boundingClientRect(res => {
            that.floor_list_floor.push(res.top)
          })
          .exec();
        }else{
          that.floor_list_floor.push(0)
        }

        for (let i = 0; i < that.floor_list.length; i++) {
          let index=parseInt(i)+2;
          var query = wx.createSelectorQuery();
          query
            .select("#floor" + index)
            .boundingClientRect(res => {
              setStorage("floorY" + index, res.top);
              that.floor_list_floor.push(res.top)
            })
            .exec();
        }
      }, 500);

      for (let i = 0; i < that.floor_list_floor.length; i++) {
        if(that.floor_list_floor[i]>0){
          that.floorShowHeight=that.floor_list_floor[i];
          break;
        }
      }
    },
    async focus() {
      if (!this.$store.state.user.loginStatus) {
        this.$router.push({
          path: "/pagesSub/login/loginIndex"
        });
        return;
      }

      if (this.isFocus == "1") {
        let res = await this.$http.getclusterfollow(
          this.$route.query.id,
          this.$store.state.user.userInfo.openId,
          0
        );
        if (res.status == 1) {
          this.isFocus = 0;
        }
      } else {
        let res = await this.$http.getclusterfollow(
          this.$route.query.id,
          this.$store.state.user.userInfo.openId,
          1
        );
        if (res.status == 1) {
          this.isFocus = 1;
        }
      }
    },
    clickDotShow() {
      this.dotShow = !this.dotShow;
    },
    hideDot() {
      this.dotShow = false;
    },
    dialTel(num) {
      if (num) {
        wx.makePhoneCall({
          phoneNumber: num
        });

        return false;
      } else {
        this.$tips.alert("该商场暂未添加联系方式");
        return false;
      }
    },
    goBack() {
      this.toView = "floorTop";
      this.activeIndex = -1;
    },
    goFloor(index, e) {
      this.activeIndex = e.currentTarget.id;
      this.toView = "floor" + index;
    },
    scroll({ mp }) {      
      this.toView = "";
      let that = this;
      let scrollTop=mp.detail.scrollTop;
      // console.log(scrollTop)
      // console.log(that.floor_list_floor)

      if(that.floor_list_floor.length>2 && scrollTop>=that.floorShowHeight){
        that.floorShow=true;
        for (let i = 0; i < that.floor_list_floor.length; i++) {
          let index = parseInt(i) + 1;
          if (scrollTop >= that.floor_list_floor[i] && scrollTop <  that.floor_list_floor[index]) {
            that.activeIndex = i;
          }else if(scrollTop > that.floor_list_floor[that.floor_list_floor.length-1]){
            that.activeIndex = that.floor_list_floor.length-1;
          }
        }
      }else{
        that.floorShow=false;
      }
    },
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
    openLocation() {
      var that = this;
      let [latitude, longitude] = this._U.bMapTransqqMap(
        this.cluster_info.latitude,
        this.cluster_info.longitude
      );
      wx.openLocation({
        latitude,
        longitude,
        scale: 18
      });
    },
    async switch1Change(e) {
      this.isactivity= (e.mp.detail.value?"1":"0");
      await this.initData();
    },
    async catetabChange(e){
      console.log(e)
      this.cateid=e.mp.detail;
      this.catelist.selectedId=e.mp.detail;
      await this.initData();
    },
    async clickSearch(){
      this.searchShow=true;
      this.isautoFocus=true;
    },
    async searchConfirm(){
      if(this.keywords.trim()==""){
        this.searchShow=false;
      }
      await this.initData();
    },
    async searchBlur(){
      if(this.keywords.trim()==""){
        this.searchShow=false;
      }
    }
  },
  mounted() {
    this.iphone_xsp();
  },
  onPullDownRefresh() {},
  async onShow() {
    setStorage("scrollY", 0);
    this.$store.commit("SET_IS_LOADING", false);
    this.$store.commit("SET_IS_LOADING", true);

    //console.log(this.$route.query); //id 21 title 万象城
    wx.setNavigationBarTitle({
      title: this.$route.query.title
    });

    this.openid = this.$store.state.user.userInfo
      ? this.$store.state.user.userInfo.openid
      : null;

    const [err, res] = await this._to(
      this.$http.getShopCategory()
    );

    let arr=[{
      id:"-1",
      title:"全部"
    }];
    res.result.map(val=>{
      arr.push({
        id:val.id,
        title:val.catename
      })
    })
    this.catelist.list = arr;
    this.catelist.selectedId=arr[0].id;
    console.log(this.catelist)
    this.initData();
  },
  onUnload(){
    this.toView="";
    this.follow_list=[];
    this.floor_list=[];
    this.floor_list_floor=[];
    this.activeIndex=-1;
    this.isautoFocus=false;
    this.searchShow=false;
    this.keywords='';
    this.isactivity=0;
  }
};
</script>
<style>
  /* 全局的  修改子组件的样式  在<style scoped lang='scss'>中无效*/
  .cateselected{color:#323232 !important;border-bottom:none !important;font-size:14px !important;}
  .cateclass{position:relative;}
  .cateclass::after {
    content: "";
    width: 1px;
    height: 12px;
    transform: scaleX(0.5);
    position: absolute;
    right: 0;
    top: 0;
    bottom:0;
    margin:auto;
    background: #e8e8e8;
    z-index: 1;
  }
</style>
<style scoped lang='scss'>
.flex {
  display: -webkit-flex;
  display: flex;
}

.flex > div {
  text-align: center;
  width: 0%;
  -webkit-flex: 1;
  flex: 1;
}

.flexwrap {
  display: flex;
  flex-wrap: wrap;
}

.poshead {
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 30px;
  display: flex;

  .focus {
    width: 35px;
    height: 18px;
    line-height: 18px;
    font-size: 10px;
    text-align: center;
    background: #9a9a9a;
    color: #ffffff;
    border-radius: 2px;
    margin-right: 20px;
  }

  .focus.active {
    background: #ff455d;
  }

  .tri_dot {
    width: 28px;
    height: 18px;
    background: url(#{$imgUrl}icon_more.png) no-repeat center center;
    background-repeat: no-repeat;
    background-size: 100% auto;
  }
}

.tri_dot_down {
  position: absolute;
  z-index: 2;
  top: 28px;
  right: 13px;
  width: 64px;
  height: 88px;
  line-height: 41px;
  text-align: center;
  font-size: 16px;
  padding: 0 3px;
  background: url(#{$imgUrl}icon_box.png) no-repeat center center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  padding-top: 5px;

  button {
    background: rgba(255, 255, 255, 0);
  }
}

.leftTop {
  width: 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 99;
  right: 15px;
  top: 40%;

  .like,
  .item,
  .goTop {
    width: 20px;
    height: 21px;
    color: #9a9a9a;
    border: solid 0.5px #e8e8e8;
    border-radius: 50%;
    background: #ffffff;
    font-size: 8px;
    line-height: 21px;
    white-space: nowrap;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    .likeIn {
      width: 12px;
      height: 11px;
      background: url("#{$imgUrl}icon_heart_act.png") no-repeat center center;
      background-size: cover;
    }

    .goTopIn {
      width: 13px;
      height: 13px;
      background: url("#{$imgUrl}icon_settop.png") no-repeat center center;
      background-size: cover;
    }
  }

  .item.active {
    color: #ff455d;
  }
}
.full {
  position: absolute;
  height: 100%;
  width: 100%;
}
scroll-view {
  height: 100%;
  width: 100%;
}
.container {
  background: #f2f2f2;
  .circleimg {
    background: #f2f2f2;
    overflow: hidden;
    height: 170px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .managementList {
    width: 100%;

    .handerItem {
      background: #ffffff;
      position: relative;
      width: 100%;
      height: 40px;
      display: flex;

      &::before {
        content: "";
        width: 100%;
        height: 1px;
        transform: scaleY(0.5);
        position: absolute;
        bottom: 0;
        background: #e8e8e8;
      }

      .icon {
        margin-left:15px;
        margin-right:10px;
        width: 20px;
        height: 100%;
        position: relative;

        img {
          width: 20px;
          height: 20px;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        }
      }
      .icon1 {
        margin-left:0;
        margin-right:0;
        width: 100%;
      }
      .rightbtn {
        width: 150rpx;
        height: 100%;

        .icon {
          width: 100%;
        }
      }

      .hander_name {
        font-size: 14px;
        color: #404040;
        line-height: 40px;
        width: 0%;
        -webkit-flex: 1;
        flex: 1;
      }

      .hander_r {
        margin-right: 15px;
        width: 30px;
        height: 100%;
        background: url("#{$imgUrl}icon_corner mark.png") no-repeat center top;
        background-size: 100%;
      }

      .swiper_container {
        height: 40px;
        width: 100%;
      }

      .swiper_item {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .selectwrap{  
    background:#ffffff;
    .searchBox {
      // opacity: 1;
      width: 100%; 
      display: flex;
      background:#ffffff;
      align-items: center;
      .placeholder {
        color: #b7b7b7;
        font-size: 12px;
      }          

      .searchIcon {
        width: 14px;
        height: 14px;
        background: url("#{$imgUrl}search.png") no-repeat center center;
        background-size: 100%;
      }

      .search {
        height: 20px;
        line-height: 20px;
        width: 0%;
        -webkit-flex: 1;
        flex: 1;
      }
    }  
    .searchBox1{
      justify-content: center;
    }
    .possearch{position: absolute;z-index:2;top:0;left:0;height: 100%;width:100%;opacity: 0;}
    .selectitem{
      display:flex;
      align-items: center;
      position: relative;
      .catewrap{width:100%;font-size:12px;color:#9a9a9a;}
      .l{
        width: 0%;
        -webkit-flex: 1;
        flex: 1;
      }
      .r{
        display:flex;
        align-items: center;        
      }
    }
    .selectitem0{
      padding:0 15px;
      height:40px;
      line-height:40px;
    }
    .selectitem1{
      height:36px;
      line-height:36px;
    }
  }
  .dt {
    line-height: 80rpx;
    padding: 0 30rpx;
  }

  .dd {
    background: #ffffff;

    > div {
      position: relative;
      text-align: center;
      width: 25%;
      height: 188rpx;
      padding: 44rpx;

      &::before {
        content: "";
        width: 1px;
        height: 100%;
        transform: scaleX(0.5);
        position: absolute;
        top: 0;
        right: 0;
        background: #e8e8e8;
      }

      &::after {
        content: "";
        width: 100%;
        height: 1px;
        transform: scaleY(0.5);
        position: absolute;
        bottom: 0;
        left: 0;
        background: #e8e8e8;
        z-index: 2;
      }

      img {
        width: 100rpx;
        height: 100rpx;
        margin: 0 auto;
      }

      .tag {
        font-size: 14px;
        text-align: center;
        color: #ffffff;
        width: 30px;
        height: 30px;
        line-height: 30px;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% auto;
      }

      .discount {
        background-image: url("#{$imgUrl}img_boxg.png");
      }
    }

    > div:nth-child(4) {
      &::before {
        width: 0px;
      }
    }
  }
}
</style>
