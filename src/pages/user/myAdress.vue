<template>
<div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
  <div class="w100" v-if="getAdressList&&getAdressList.length>0" v-for="(item,index) in getAdressList" :key="index">
    <div class="myAress w100">      
        <div class="item lineBottom  ">
            <div class="reciveNamePhone ml15 mb20">
              <span class="name f14 mr21 color32">{{item.realname}}</span>
              <span class="phone f14 color32">{{item.mobile}}</span>
            </div>
            <div class="adress ml15 f14 color32">{{item.province}}{{item.city}}{{item.area}}{{item.address}}</div>
       </div>      
    </div>
    <div class="adressAction w100">
        <div class="fl ml15 colorf45d" v-if="item.isdefault==='1'">默认地址</div>
        <div class="fr mr15 ">
            <span class="edite mr20" @click="editAddr(item.id)">              
              <img class="editIcon mr10" src="../../../static/images/icon_editor.png"  alt="">
              <span class="color9a">编辑</span>
            </span>
            <span class="delate" @click="deleteAddr(item.id,index)">
              <img class="delateIcon mr10" src="../../../static/images/icon_delete.png" alt="">
              <span class="color9a">删除</span>
            </span>
        </div>
    </div>
  </div>
  
  <div v-if="getAdressList.length<=0" class="empty_2 em_img">
    <img src="../../../static/images/icon_none.png">
    <div>您还没有添加地址哟o(∩_∩)o</div>
  </div>

  <div :class="{'w90':getAdressList.length>0}" class="newAress f14" @click="$router.push({ path:'/pages/user/editAdress',query: { type: 'add' }})">
      新增地址
  </div>
</div>
</template>
<script>
import { login, getUserInfo, getSetting, setStorage } from "@/utils/wechat";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      getAdressList: [],
      length: 0,
      openid: "",
      authkey: "",
      iPhoneshow:false,
      iphoneheight:''
    };
  },
  components: {},
  methods: {
    async deleteAddr(id, index) {
      var that = this;
      let data = await this._to(this.$tips.confirm("确定删除历史记录吗", ""));
      if (data[1] == "confirm") {
					  this.$http
        .deleteAdress(id, this.openid, this.authkey)
        .then(function(res) {
          if (!res.error) {
            that.$tips.toast("删除成功");
            that.getAdressList = that.getAdressList.filter(function(val, i) {
              console.log(i);
              return i != index;
            });
          } else {
            that.$tips.toast(res.message);
          }
        });
      } else {
        return;
      }
      console.log(index);
      
    
    },
     iphone_xsp(){
    	  if(this.$store.state.user.iphoneX){
  					this.iPhoneshow=true;
					this.iphoneheight = this.$store.state.user.systemInfo.windowHeight + 50 +"px";
					
  			}
    	  
    },
    editAddr(id){
      console.log(id)
      this.$router.push({ path:'/pages/user/editAdress',query: { id: id , type:'edit'}})
    }
  },

  async mounted() {
  	this.iphone_xsp();
  },
  onPullDownRefresh() {},
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  async onShow() {
    var that = this;
    this.openid = this.$store.state.user.userInfo.openid;
    this.authkey = this.$store.state.user.userInfo.authkey;
    let [err, getAdressList] = await this._to(
      this.$http.getAdressList(this.openid, this.authkey)
    );

    this.getAdressList = getAdressList.list;
    this.length = getAdressList.total;

   
  }
};
</script>
<style  scoped lang='scss'>
.container {
  background: #f2f2f2;
  .w90{
    width: 93% !important;
  }
  .myAress {
    background: #fff;
    .item {
      padding: 22px 0 18px 0;

      .reciveNamePhone {
      }
    }
  }
  .adressAction {
    height: 43px;
    line-height: 43px;
    margin-bottom: 15px;
    background: #fff;
    .editIcon {
      width: 12px;
      height: 14px;
      vertical-align: middle;
    }
    .delateIcon {
      width: 12.5px;
      height: 14px;
      vertical-align: middle;
    }
  }

  .newAress {
    width: 84px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    color: #fff;
    background: #ff455d;
    border-radius: 4px;
    margin: 30rpx auto;
  }
}
</style>
