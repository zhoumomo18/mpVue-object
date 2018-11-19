<template>
<div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
	<div @click="isBuild" class="fansAuth"></div>
	<goAuth></goAuth>
    <div class="phone w100 h40 lineBottom">
      <span class="f16 ml15 mr44 color32"> 收货人</span>
      <input type="text" v-model="data.realname" placeholder="请输入收货人">      
    </div>
		
   <div class="phone w100 h40">
      <span class="f16 ml15 mr25">联系电话</span>
      <input type="number" v-model="data.mobile" placeholder="请输入电话号码">      
    </div>
    
    <picker class="w100" mode="region" @change="bindRegionChange($event)" :value="region">
      <view class="picker w100">
        <div class="set w100 h40 lineBottom">
          <span class="f16 ml15 mr25">所在地区</span>
          <span class="mr38 f14" v-if="data.province">{{data.province}}{{data.city}}{{data.area}}</span>
        </div>
      </view>
    </picker>

    <div class="phone w100 h40 lineBottom">
      <span class="f16 ml15 mr25">详细地址</span>
      <input type="text" v-model="data.address" 
      	placeholder="例如:道路、小区、楼栋、门牌号" readonly>      
    </div> 

    <!-- <div class="set w100 h40 lineBottom" @click="toMap">
    	<span class="f16 ml15 mr25">所在地区</span>
    	<span class="fr mr38 f14" v-if="data.province">{{data.province}}{{data.city}}{{data.area}}</span>
    	<span class="fr mr38 f14 color9a" v-if="!data.province">请选择</span>
    	 <div class="arrow"></div>
    </div> -->
    
   <!-- <div class="phone w100 h40 lineBottom" @click="toMap">
      <span class="f16 ml15 mr25">详细地址</span>
      <input type="text" v-model="data.address" 
      	placeholder="例如:道路、小区、楼栋、门牌号" readonly>      
    </div> -->
    <div class="set w100 h40 lineBottom mb20">
    	<span class="f16 ml15 mr25">设为默认</span> 	
      <switch class="fr mr15 wx-switch-input" v-if="data.isdefault=='1'" checked @change="switch1Change"/>
       <switch class="fr mr15 wx-switch-input" v-if="data.isdefault=='0'" @change="switch1Change"/>
    </div>

    <div class="newAress f18" @click="gatesub">保存地址</div>
  
</div>
</template>
<script>
	import { login, getUserInfo, getSetting, setStorage } from "@/utils/wechat";
	import { mapState, mapGetters, mapActions } from "vuex";
  import validator from "@/utils/validator";

const cityDefault=["广东省", "广州市", "海珠区"];

export default {
  data() {
    return {
      openid: null,
      authkey: null,
      id:null,
      region:cityDefault,
      data:{
        realname: "",
        mobile:"",
        province:cityDefault[0],
        city:cityDefault[1],
        area:cityDefault[2],
        address: "",
        isdefault:1,
        subtype:'',
        iPhoneshow:false,
      	iphoneheight:''
      },
      rules: {
        realname: [{ required: true, message: "收货人不能为空" }],
        mobile: [{
          validator: (rule, value, callback) => {
              if (!value) {
                callback("请输入手机号码");
              } else if (/^[1][0-9]{10}$/.test(value)) {
                callback();
              } else {
                callback("请输入正确的手机号码");
              }
            }
          }
        ],
        province: [{ required: true, message: "所在地区不能为空" }],
        city: [{ required: true, message: "所在地区不能为空" }],
        area: [{ required: true, message: "所在地区不能为空" }],
        address: [{ required: true, message: "详细地址不能为空" }]
      }      
    };
  },
  components: {},
  created() {
    this.validator = validator(this.rules, this.data);
  },
  methods: {
    /**
     * 验证方法
     * @param callback
     * @param data
     */
    validate(callback, data) {
      this.validator.validate((errors, fields) => {
        if (errors) {
          fields.forEach(item => {
            if (item.message) {
              wx.showToast({
                title: item.message,
                icon: "none"
              });
              return false;
            }
          });
        }
        callback && callback(errors, fields);
      }, data);
    },
     iphone_xsp(){
    	  if(this.$store.state.user.iphoneX){
  					this.iPhoneshow=true;
					this.iphoneheight = this.$store.state.user.systemInfo.windowHeight + 50 +"px";
					
  			}
    	  
    },
    bindRegionChange(e) {
      console.log("picker发送选择改变，携带值为", e.mp.detail.value);
      this.region = e.mp.detail.value;
      this.data.province=this.region[0];
        this.data.city=this.region[1];
        this.data.area=this.region[2];
      // this.region = e.mp.detail.value.join(",");
    },
    toMap(){
      this.$router.push({ path:'/pages/user/map',query: { province: this.data.province, city: this.data.city,area: this.data.area,address: this.data.address}})
    },
    switch1Change(e) {
      // console.log("switch1 发生 change 事件，携带值为", e.mp.detail.value);
      this.data.isdefault= (e.mp.detail.value?"1":"0");
    },
    gatesub(){
    	
    	if(this.subtype=='edit'){
    		this.editsub();
    	}else if(this.subtype=='add'){
    		this.submit();
    	}else{
    		return;
    	}
    },
    async submit(){
      var that = this;
      //点击提交
      that.validate((errors, fields) => {
        if(!errors){
          this.$http.addAdress(this.data.realname, this.data.mobile, this.data.province, this.data.city, this.data.area, this.data.address, this.data.isdefault, this.openid, this.authkey).then(function(res){
            if(!res.error){
              that.$tips.toast('添加成功');
              setTimeout(function(){
                that.$router.back();
              },1000)
            }else{
              that.$tips.toast(res.message);
            }
          });
        }else{
          return false;
        }
      })
    },
     async editsub(){
    	var that = this;
      //点击edit提交
      that.validate((errors, fields) => {
        if(!errors){
          this.$http.editAdress(this.$route.query.id,this.data.realname, this.data.mobile, this.data.province, this.data.city, this.data.area, this.data.address, this.data.isdefault,this.$store.state.user.userInfo.openid).then(function(res){
            if(!res.error){
              that.$tips.toast('编辑成功');
              setTimeout(function(){
                that.$router.back();
              },1000)
            }else{
              that.$tips.toast(res.message);
            }
          });
        }else{
          return false;
        }
      })
    }
  },
  mounted() {
    this.subtype=this.$route.query.type;
    this.iphone_xsp();
  },
  onPullDownRefresh() {},
  computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      }),
  },
  async onShow() {
    this.id=this.$route.query.id;    
    this.openid = this.$store.state.user.userInfo.openid;
    this.authkey = this.$store.state.user.userInfo.authkey;

    if(this.id){
      let [err, getAdressInfo] = await this._to(
        this.$http.getAdressInfo(this.id, this.openid, this.authkey)
      );
      
      if(!err){
        this.data.realname=getAdressInfo.detail.realname;
        this.data.mobile=getAdressInfo.detail.mobile;
        this.data.province=getAdressInfo.detail.province;
        this.data.city=getAdressInfo.detail.city;
        this.data.area=getAdressInfo.detail.area;
        this.data.address=getAdressInfo.detail.address;
        this.data.isdefault=getAdressInfo.detail.isdefault;
        return false;
      }else{
        this.$tips.toast("获取地址信息失败");
        return false;
      }
    }
    console.log(this.$route.query.province)
    if(this.$route.query.province){
      this.data.province=this.$route.query.province;
      this.data.city=this.$route.query.city;
      this.data.area=this.$route.query.area;
      this.data.address=this.$route.query.address;
    }
  }
};
</script>
<style  scoped lang='scss'>
.container {
  .newAress {
    width: 345px;
    height: 47px;
    text-align: center;
    line-height: 47px;
    color: #fff;
    background: #ff455d;
    border-radius: 5px;
    margin: 0 auto;
  }
  input {
    width: 650rpx;
  }
  background-color: #f2f2f2;
  .set {
    background-color: #fff;
    position: relative;
    letter-spacing: 2px;
    white-space: nowrap;
  }
  .phone {
    /* padding-top: 10px;*/
    background-color: #fff;
    display: flex;
    align-items: center;
    letter-spacing: 2px;
    white-space: nowrap;

    input::-webkit-input-placeholder {
      color: #9a9a9a;
      font-size: 14px;
    }
    input::-moz-placeholder {
      color: #9a9a9a;
      font-size: 14px;
    }
    .placeholder {
      font-size: 14px;
      color: #9a9a9a;

      vertical-align: middle;
    }
  }
}
</style>