<template>
  <div class="container lineTop" :class="{'iphonex':iPhoneshow}" :style="{height:iphoneheight,minHeight:iphoneheight}">
    <div class="sign w100">
      <div class="sign_head">
        <div class="flex">
          <p class="flex1 f14 color3f">积分：{{jf | toFixed0}}</p>
          <p class="f14 color3f" @click="$router.push({ path:'/pagesSub/sign/signHistory',query:{id:merchid}})">详细记录>></p>
        </div>
        <div class="sign__head_btn align flex" @click="signIn">
          <p class="f18 bold lineBottom color_font">签到</p>
          <p class="f10 color_font">已连续签到{{continueDays}}天</p>
        </div>
        <div class="sign__head_location align" @click="reloadLocation">
          <span class="f10 color3f mr5">{{isNearly?"已":"未"}}进入【卡宾官方旗舰店】签到范围</span><span class="colory f10">{{address_lodding}}</span><i></i>
        </div>
      </div>
      <div class="sign_cand">
        <div class="sign_cand_cont">
          <div id="calendar">
            <div class="sign_cand_head flex flex_hc">
              <p class="f18 bold flex1">{{thisMonthDays.year}}年{{thisMonthDays.month}}月</p>
              <p class="f12 bold">总签到数<span class="colorf45d">{{signMark.length}}</span>天</p>
            </div>
            <div class="sign-box">
              <div class="calender">
                  <div class="ui-datepicker-wrapper ui-datepicker-wrapper-show">
                      <!-- <div class="ui-datepicker-header">
                          <a href="javascript:;" class="ui-datepicker-btn ui-datepicker-prev" @click="getPrevMonth(1)"></a>
                          <a href="javascript:;" class="ui-datepicker-btn ui-datepicker-next" @click="getNextMonth(2)"></a>
                          <span class="ui-datepicker-curr-month">{{thisMonthDays.year}}年{{thisMonthDays.month}}月</span>
                      </div> -->
                      <div class="ui-datepicker-body">
                          <div class="datepicker-weekday">
                              <!-- <ul class="weekday-head">
                                  <li>日</li>
                                  <li>一</li>
                                  <li>二</li>
                                  <li>三</li>
                                  <li>四</li>
                                  <li>五</li>
                                  <li>六</li>
                              </ul> -->
                              <!-- active -->
                              <ul class="weekday-days">
                                  <li v-for="item in thisMonthDays.days" :data-date="thisMonthDays.year+'-'+thisMonthDays.month+'-'+item.showDate"  :key="item.id" :class="{'active': item.hasMark ==thisMonthDays.year+'-'+thisMonthDays.month+'-'+item.showDate,'ifDiabled': !item.ifThisMonthDays}" @click="supplementSign(thisMonthDays.year,thisMonthDays.month,item.showDate,setDay,$event)">
                                      {{item.showDate}}
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sign_cand_rule mt20">
          <h5 class="f16 bold">【签到规则】</h5>
          <p class="f14">1.首签奖励10积分<br />
            2.当日签到奖励2积分；补签扣除5积分<br />
            3.当月连续签到7天奖励10积分<br />
            4.当月连续签到15天奖励20积分</p>
          <div class="color9a f10">tips:点击漏签日期可以补签哟~</div>
        </div>
      </div>
      <div class="gap"></div>
      <div class="sign_take">
        <h4 class="color9a f14">连续签到有礼</h4>
        <div class="sign_take_cont">
          <div class="flex" :class="{'disable':isTakeSeven}">
             <!--  @click="takeJf(1)" -->
            <div class="flex1 l1 f12 align color3f">
              <span class="l1big color3f">10</span>积分
            </div>
            <div class="l2 flex">
              <p class="f12 color3f bold lineBottom">连续签到7天</p>
              <p class="f8 color3f">SHOPPING EVERY DAY</p>
            </div>
            <div class="l3 flex">
              <div class="flex bold" v-if="isTakeSeven">
                <p class="color_font f12">已经</p>
                <p class="color_font f12">领取</p>
              </div>
              <div class="flex bold" v-else>
                <p class="color_font f12">自动</p>
                <p class="color_font f12">领取</p>
              </div>
            </div>
          </div>
          <div class="flex" :class="{'disable':isTakeFif}">
            <!-- @click="takeJf(2)" -->
            <div class="flex1 l1 f12 align color3f">
              <span class="l1big color3f">20</span>积分
            </div>
            <div class="l2 flex">
              <p class="f12 color3f bold lineBottom">连续签到15天</p>
              <p class="f8 color3f">SHOPPING EVERY DAY</p>
            </div>
            <div class="l3 flex">
              <div class="flex bold" v-if="isTakeFif">
                <p class="color_font f12">已经</p>
                <p class="color_font f12">领取</p>
              </div>
              <div class="flex bold" v-else>
                <p class="color_font f12">自动</p>
                <p class="color_font f12">领取</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 不在范围内弹框 -->
    <van-popup :show="isNotNearly" @close="togglePopup">
      <div class="popup align">
        <h3 class="f18 bold head">不在签到范围</h3>
        <div class="pop_cont">
          <p class="f14">当前不在商户地址附近，到店后</p>
          <p class="f14 colorf45d">签到赢积分</p>
        </div>        
        <div class="btn_group flex lineTop">
          <div class="flex1 f14 color9a" @click="togglePopup">知道了！</div>
        </div>
      </div>
    </van-popup>

    <!-- 签到成功弹框 -->
    <van-popup :show="isSignSuccessPop" @close="togglePopup1">
      <div class="popup align">
        <div class="pop_cont pop_cont1">
          <div class="ico sign_suc"></div>
          <p class="f16 bold">恭喜您</p>
          <p class="f14">{{successMsg}}</p>
        </div>        
        <div class="btn_group flex lineTop">
          <div class="flex1 f14 color9a" @click="togglePopup1">知道啦~</div>
        </div>
      </div>
    </van-popup>
    <!-- 已经签到了弹框 -->
    <van-popup :show="hasSignSuccessPop" @close="togglePopup2">
      <div class="popup align">
        <div class="pop_cont">
          <div class="ico"></div>
          <p class="f18 bold mt5">已经签到了哟~</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
  import {
    login,
    getUserInfo,
    getSetting,
    setStorage,
    getLocation
  } from "@/utils/wechat";
  import isLoading from "@/components/isLoading";
  export default {
    data() {
      return {
        iPhoneshow: false,
        iphoneheight: "",
        merchid:'',
        jf:0,
        address_lodding:'重新定位',
        isNotNearly:false,
        isNearly:true,
        isSignSuccessPop:false,
        hasSignSuccessPop:false,
        hasSign:false,
        successMsg:"签到成功",
        continueDays:0,
        isTakeSeven:false,
        isTakeFif:false,
        // latitude:30.486025,
        // longitude:114.42828,
        // curlatitude:0, 
        // curlongitude:0,
        latitude:22.543753029245877,
        longitude:113.98147042006931,  
        curlatitude:22.5376863323, 
        curlongitude:113.9750284979,
        ret: [],
        thisMonthDays: {
          days:[],
          year:'',
          month:'',
        },
        daysHtml: '',
        setYear: new Date().getFullYear(),
        setMonth: new Date().getMonth()+1,
        setDay: new Date().getDate(),
        uid: '',
        signMark: [
          // {
          //   time:'2018-10-01 12:00:00'
          // },
          // {
          //   time:'2018-10-08 12:00:00'
          // },
          // {
          //   time:'2018-10-09 12:00:00'
          // },
          // {
          //   time:'2018-10-10 12:00:00'
          // },         
        ]
      };
    },
    methods: {
      iphone_xsp() {
        if (
          this.$store.state.user.systemInfo &&
          this.$store.state.user.systemInfo.model == "iPhone X"
        ) {
          this.iPhoneshow = true;
          this.iphoneheight =
            this.$store.state.user.systemInfo.windowHeight + "px";
        }
      },
      async signIn(){
        if(this.hasSign){
          this.hasSignSuccessPop = true;
          return;
        }else{
          if(this.isNearly){
            let [err, data] = await this._to(this.$http.sign(
              this.merchid,
              this.$store.state.user.userInfo.openId,
              this.curlatitude,
              this.curlongitude,
              // 22.5376863323, 
              // 113.9750284979,
              0,
              ''
            ));

            // let err=null;
            if(err){
              this.$tips.alert('签到失败');
              return;
            }

            if(!data.status){
              // 该天已经签过到了！!
              if(data.result.message=="已经签过了！"){
                this.hasSignSuccessPop=true;
              }else{
                this.$tips.alert(data.result.message);
              }
              return;
            }
            let today={
              time:this.setYear+"-"+this.setMonth+"-"+(this.setDay<10?"0"+this.setDay:this.setDay),
            }
            this.signMark=[...this.signMark,today];
            this.getMonthData(this.setYear,this.setMonth);

            this.jf=parseInt(data.result.message.split('-')[1]).toFixed(0);
            if(data.result.message.split('-')[2] == "7"){
              this.isTakeSeven=true;
            }else if(data.result.message.split('-')[2] == "15"){
              this.isTakeFif=true;
            }else{
              this.successMsg = "日常签到，获得2积分哟~";
            }
            
            this.isSignSuccessPop = true;
            this.hasSign=true;
            this.countContinueDays();                      
          }else{
            this.isNotNearly=true;
            return;
          }
          return;
        }
      },
      async supplementSign(year,month, day, curDay, e){
        // console.log(e)
        // console.log(day)
        // console.log(curDay)
  
        if(parseInt(day)<parseInt(curDay)){
          if(this.isNearly){
            let [err, data] = await this._to(this.$http.sign(
              this.merchid,
              this.$store.state.user.userInfo.openId,
              this.curlatitude,
              this.curlongitude,
              1,
              day
            ));
            // let err = null;

            if(err){
              this.$tips.alert('补签失败');
              return;
            }

            if(!data.status){
              // 该天已经签过到了！!
              this.hasSignSuccessPop=true;
              return;
            }
            let suppleToday={
              time:year+"-"+month+"-"+ day,
            }
            
            let suppleDay=suppleToday.time.split('-')[2];
            let signMark=this.signMark.map(val=>{        
              return parseInt(val.time.split('-')[2]);
            })
            let index=0;
            for(var i = 0; i < signMark.length; i++){
              if(signMark[i] > suppleDay){
                index=i;
                break;
              }              
            }
            this.signMark.splice(index, 0, suppleToday);
            this.getMonthData(this.setYear,this.setMonth);
      
            this.jf=parseInt(data.result.message.split('-')[1]).toFixed(0);
            if(data.result.message.split('-')[2] == "7"){
              this.isTakeSeven=true;
              this.successMsg = "补签成功，连续7天签到，奖励10积分";
            }else if(data.result.message.split('-')[2] == "15"){
              this.isTakeFif=true;
              this.successMsg = "补签成功，连续15天签到，奖励20积分";
            }else{
              this.successMsg = "补签成功";
            }
            this.isSignSuccessPop = true;
            this.jf=parseInt(data.result.message.split('-')[1]).toFixed(0);
            this.countContinueDays();
          }else{
            this.isNotNearly=true;
            return;
          }
          return;
        }else if(parseInt(day)== parseInt(curDay)){
          this.signIn()
        }
      },
      fillZero(s) {
          return s < 10 ? '0' + s : s;
      },
      getNextMonth(mon){
          this.setMonth = this.setMonth + 1;
          this.getSignData(this.setMonth,this.setYear,this.setMonth,mon)
          //this.getMonthData(this.setYear,this.setMonth)
      },
      getPrevMonth(mon){
          this.setMonth = this.setMonth - 1;
          this.getSignData(this.setMonth,this.setYear,this.setMonth,mon)

          // this.getMonthData(this.setYear,this.setMonth)
      },
      getMonthData(year,month){
          if(!year || !month){
              var today = new Date();
              year = today.getFullYear();
              month = today.getMonth()+1;
          }
          var firstDay = new Date(year,month - 1, 1);
          var firstDayWeekDay = firstDay.getDay();
          if(firstDayWeekDay === 0) firstDayWeekDay = 7;

          year = firstDay.getFullYear();
          month = firstDay.getMonth() + 1;

          var lastDayOfLastMonth = new Date(year,month-1,0);
          var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

          var preMonthDayCount = firstDayWeekDay - 1;

          var lastDay = new Date(year,month,0);
          var lastDate = lastDay.getDate();
          this.ret = [];
          for (var i = 0; i < 42; i++) {
              var date = i - preMonthDayCount;
              var showDate = date;
              var thisMonth = month;
              var ifThisMonthDays = true;

              if (date <= 0) {
                  //上一月
                  thisMonth = month - 1;
                  showDate = lastDateOfLastMonth + date;
                  ifThisMonthDays = false;
              } else if(date > lastDate){
                  //下一月
                  thisMonth = month + 1;
                  showDate = showDate -lastDate;
                  ifThisMonthDays = false;
              }
              if (thisMonth === 0) thisMonth = 12;
              if (thisMonth === 13) thisMonth = 1;
              this.ret.push({
                  month: thisMonth,
                  date:date,
                  showDate: this.fillZero(showDate),
                  ifThisMonthDays: ifThisMonthDays
              });
          }

          this.signMark.map((obj1,index1)=>{
              var homologous1 = obj1.time;
              this.ret.map((obj2,index2)=>{
                  var mark1 = homologous1.split('-')[2];
                  // console.log(mark1);
                  if(obj2.showDate == mark1){
                      obj2.hasMark = homologous1;
                  }
              })
          })
          this.thisMonthDays = {
              year: year,
              month: this.fillZero(month),
              days: this.ret  
          }
          // console.log(this.thisMonthDays)
      },
      //获取签到信息
      async getSignData(defaultDate,changeYear,changeMonth,mon){
          // 不要删掉
          //     if(response.code == 404){
          //         alert(response.msg)
          //         if(mon == 2){
          //             this.setMonth = this.setMonth-1; 
          //         } else {
          //             this.setMonth = this.setMonth+1;
          //         }
          //         //this.setMonth = new Date().getMonth()+1;
          //         return;
          //     }

          let [err,data] = await this._to(
            this.$http.getSign(
              this.merchid,
              this.$store.state.user.userInfo.openId,
              this.curlatitude,
              this.curlongitude
            )
          );
          if(err){
            this.$tips.alert("请求出错")
            return;
          }
          if(!data.status){
            this.$tips.alert(data.result.message);
            return;
          }
          this.jf=data.result.user_credit1;
          this.hasSign=data.result.can_check_in?true:false;
          this.signMark=data.result.check_log.map(val=>{
            return {
              time:val.Y+"-"+val.M+"-"+(parseInt(val.d)<10?"0"+val.d:val.d),
              status:val.status
            }
          });
          this.getMonthData(changeYear,changeMonth);
          // console.log(this.signMark)
      },
      // 重新定位
      async reloadLocation(){
        if(this.address_lodding == '重新定位'){
          this.address_lodding='定位中...'

          let [err1, data1] = await this._to(getLocation());
                    
          if(err1){
            this.$tips.alert("定位失败");
            this.isNearly=false;
            return;
          }

          this.address_lodding='重新定位'
          this.curlatitude=data1.latitude;
          this.curlongitude=data1.longitude;
          
          let [err, data] = await this._to(
            this.$http.signReloadLocation(
              this.merchid,
              this.curlatitude,
              this.curlongitude
            )
          );
          if(err){
            this.$tips.alert("解析地理位置出错");
            this.isNearly=false;
            return;
          }
          this.isNearly=data?true:false;              
        }
      },
      togglePopup(){
        this.isNotNearly=!this.isNotNearly;
      },
      togglePopup1(){
        this.isSignSuccessPop=!this.isSignSuccessPop;
      },
      togglePopup2(){
        this.hasSignSuccessPop=!this.hasSignSuccessPop;
      },
      async takeJf(i){
        if(i==1){
          if(!this.isTakeSeven){            
            if(this.continueDays>=7){
              let [err,data] = await this._to(
                this.$http.takeSignJf(
                  this.merchid,
                  this.$store.state.user.userInfo.openId,
                  this.curlatitude,
                  this.curlongitude
                )
              );
              if(err){
                this.$tips.alert("请求出错")
                return;
              }
              if(!data.status){
                this.$tips.alert(data.result.message);
                return;
              }
              this.$tips.alert("领取成功");
              this.jf=this.jf+10;
            }else{
              this.$tips.alert("还没连续签到7天哦~")
            }
          }
        }else if(i==2){
          if(!this.isTakeFif){
            if(this.continueDays>=15){
              let [err,data] = await this._to(
                this.$http.takeSignJf(
                  this.merchid,
                  this.$store.state.user.userInfo.openId,
                  this.curlatitude,
                  this.curlongitude
                )
              );
              if(err){
                this.$tips.alert("请求出错")
                return;
              }
              if(!data.status){
                this.$tips.alert(data.result.message);
                return;
              }
              this.$tips.alert("领取成功");
              this.jf=this.jf+20;
            }else{
              this.$tips.alert("还没连续签到15天哦~")
            }
          }
        }
      },
      countContinueDays(){
        let signMark=this.signMark.map(val=>{
          return parseInt(val.time.split('-')[2]);
        })
        let signLastDay = signMark.length>0?signMark[signMark.length - 1]:0;//最近签到日
        let totalNum=signMark.length;

        // console.log(signMark)      
        // console.log(this.setDay)
        // console.log(signLastDay)

        if(this.setDay==signLastDay+1||this.setDay==signLastDay){
          if(signLastDay==0){
            this.continueDays = 0;
          }else {
            var num = 1;
              for(var i= totalNum; i>0; i--){
                if(signMark[i-1] - signMark[i-2] == 1){
                  num++;
                }else{
                  break;//如果只要找出所有连续的天数,不需要中断
                }     
              }
              this.continueDays=num;
          }        
        }else{
          this.continueDays=0;
        }

        if(this.continueDays>=7&&this.continueDays<15){
          this.isTakeSeven=true;          
          this.isTakeFif=false;
        }else if(this.continueDays>=15){
          this.isTakeSeven=true;          
          this.isTakeFif=true;
        }else{
          this.isTakeSeven=false;          
          this.isTakeFif=false;
        }
      }
    },
    async mounted() {
      this.merchid=this.$route.query.id;

      await this.reloadLocation();
      await this.getSignData(this.setMonth,this.setYear,this.setMonth);
      await this.countContinueDays();
    },
    computed: {
      isLoading() {
        return this.$store.state.user.isLoading;
      }
    },
    watch: {
      merchid: {
        async handler(ne, old) {
          await this.reloadLocation();
          await this.getSignData(this.setMonth,this.setYear,this.setMonth);
          await this.countContinueDays();
        },
        deep: true
      }
    },
  };

</script>
<style scoped lang='scss'>
.popup{    
  display: block;
  width:280px;
  max-height: 600px;
  margin:0 auto;
  border-radius: 5px;
  // overflow: hidden;     
  padding:0;  
  background:#ffffff;
  h3{
    line-height: 45px;
    padding: 0 15px;
  }
  .head{
    position: relative;
    &::before{
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right:0;
      margin: auto;
      width: 80px;
      height: 2px;
      border-radius: 100%;
      pointer-events: none;
      box-sizing: border-box;
      background: rgba(50, 50, 50, .2);
      box-shadow: 0px 0px 20px 0px rgba(50, 50, 50, .2);
    }
  }
  
  .pop_cont{
    max-height:545px;
    overflow-y: scroll;
    padding: 15px 15px;
    line-height: 1.8;

    .ico{
      width:34px;
      height: 34px;
      margin: 0 auto;
      background-image:url(#{$imgUrl}icon_completed@2x.png);
    }
    .sign_suc{
      width:70px;
      height: 86px;
      margin: 0 auto;
      background-image:url(#{$imgUrl}img_integral@2x.png);
      position:absolute;
      left:0;
      right:0;
      margin:auto;
      top:-43px;
    }
  }
  .pop_cont1{padding-top:43px;}
  .btn_group{
    line-height: 40px;
  }
}

.sign-box {
  width: 100%;
  min-height: 100%;
  background: #f5f5f5;
  position: relative;
  
    .calender {
        background: #fff;
        width: 100%;
        .ui-datepicker-wrapper {
            width: 100%;
            font-size: 14px;
            color: #323232;
            &.ui-datepicker-wrapper-show {
                display: block;
            }
            .ui-datepicker-header {
                height: 50px;
                line-height: 50px;
                text-align: center;
                border-bottom: 1px solid #eaeaea;
                font-weight: bold;
                .ui-datepicker-curr-month {
                    font-size: 16px;
                }
                .ui-datepicker-btn {
                    height: 50px;
                    width: 50px;
                }
                .ui-datepicker-prev {
                    // background: url(../assets/img/arrow-l.png) no-repeat center center;
                    background:#f2f2f2;
                    background-size: 100% auto;  
                    float: left;
                }
                .ui-datepicker-next {
                    // background: url(../assets/img/arrow-r.png) no-repeat center center;
                    background:#f2f2f2;
                    background-size: 100% auto;  
                    float: right;
                }
            }
            .ui-datepicker-body {
                .datepicker-weekday {
                    .weekday-head {
                        display: flex;
                        justify-content: space-around;
                        border-bottom: 1px solid #777;
                        li {
                            line-height: 40px;
                            font-size: 14px;
                        }
                    }
                    .weekday-days {
                        display: flex;
                        justify-content: space-around;
                        flex-wrap: wrap;
                        li {
                            flex: 0 1 40px;
                            text-align: center; 
                            line-height: 40px;
                            font-size: 14px;
                            position:relative;
                            margin-right: 5px;
                            margin-bottom: 5px;
                            &::before{
                              content: " ";
                              position: absolute;
                              top: 0;
                              left: 0;
                              width: 200%;
                              height: 200%;
                              -webkit-transform: scale(0.5);
                              transform: scale(0.5);
                              -webkit-transform-origin: 0 0;
                              transform-origin: 0 0;
                              pointer-events: none;
                              box-sizing: border-box;
                              border: 0 solid #e8e8e8;
                              border-width: 2rpx;
                            }
                            &.active {
                                background:#FFD8DD;
                                color:#ff455d;
                            }
                            &.ifDiabled {
                                color: #DDD;
                                visibility: hidden;
                                height:0;
                            }
                            &.ifDiabled::before{
                              height: 0;
                            }
                        }

                        li:nth-child(7n){
                          margin-right: 0px;
                        }
                    }
                }
            }
        }
    }
}

  .container {
    background-color: #fff;
    .color_font{
      background: linear-gradient(to right, #FF455D, #FF007E);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
    .sign_head {
      height: 200px;
      width: 100%;
      padding: 10px 15px;
      background: linear-gradient(to right, #ff1841, #ff0375);      
      overflow: hidden;
      position: relative;
      >div:first-child{
        z-index:2;
        position:relative;
      }
      .sign__head_btn {
        width: 130px;
        height: 130px;
        margin: 8px auto;
        border-radius: 100%;
        background: rgba(255, 255, 255, .6);
        box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, .2);
        position: relative;
        z-index:1;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        p {
          z-index: 2;
          line-height: 2;          
        }

        p.lineBottom {
          &::before {
            width: 40px;
            background: #ff455d;
            right: 0;
            margin: auto;

          }
        }

        &::before {
          content: "";
          width: 95px;
          height: 95px;
          border-radius: 100%;
          position: absolute;
          z-index: 1;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          background: #ffffff;
          box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, .2);
        }
      }

      .sign__head_location {
        z-index:2;
        position:relative;
        span{
          text-shadow: rgba(50,50,50,.2) 0 2px 6px;
        }
        i {
          display: inline-block;
          vertical-align: middle;
          height: 20px;
          width: 20px;
          background:url("#{$imgUrl}/icon_adreey@2x.png") no-repeat center center;
          background-size: auto 100%;
        }
      }
      &::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
        background-image:url("#{$imgUrl}/sign_bg.png");
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 100% auto;
      }
    }

    .sign_cand {
      padding: 35px 30px 14px;

      #calendar {
        width: 100%;
        margin: 0 auto;
      }
      .sign_cand_head{
        margin-bottom: 25px;
      }
      .sign_cand_rule {
        line-height: 1.8;
      }
    }

    .sign_take {
      padding: 0 15px;

      h4 {
        border-left: 5px solid #ff455d;
        padding-left: 7px;
        margin: 20px 0;
      }

      .sign_take_cont {
        // >div.disable {
        //   background: linear-gradient(to right, #9e9e9e, #a9a9a9);
        // }
        >div {
          height: 100px;
          margin-bottom: 18px;
          background: linear-gradient(to right, #FF455D, #FF007E);
          border-radius: 3px;
          align-items: center;
          justify-content: center;

          .l1 {
            .l1big {
              font-size: 60px;
            }
          }

          .l2 {
            line-height: 2;
            width: 125px;
            position: relative;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: 100%;

            &::before {
              content: "";
              width: 14px;
              height: 7px;
              border-radius: 0 0 14px 14px;
              position: absolute;
              z-index: 1;
              top: 0;
              right: 0;
              background: #ffffff;
            }

            &::after {
              content: "";
              width: 14px;
              height: 7px;
              border-radius: 14px 14px 0 0;
              position: absolute;
              z-index: 1;
              bottom: 0;
              right: 0;
              background: #ffffff;
            }

            p.lineBottom {
              &::before {
                width: 50px;
                background: #ffffff;
                right: 0;
                margin: auto;
              }
            }
          }

          .l3 {
            width: 105px;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            >div {
              width: 40px;
              height: 40px;
              border-radius: 100%;
              background: #ffffff;
              line-height: 1.1;
              text-align: center;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
  }

</style>
