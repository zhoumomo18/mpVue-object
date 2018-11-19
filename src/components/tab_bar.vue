<template>
    <div class="w100" > 
      <form @submit="formSubmit_collect" report-submit="true">     
          <div class="tabBar lineTop">  
                   <!-- 方法1 -->
                    <!-- <block v-for="(item,index) in bindData" :key="index">
                    <div class="tabBar-item">
                    
                      <div @click="$route.path!=item.pagePath  && $router.push({ path: item.pagePath ,isTab: true})">
                        <div><img class="icon" :src='item.iconPath'></div>
                        <div :class="{'tabBartext':item.current== 1}" class="f12 color9a">{{item.text}}</div>
                      </div>  
                    </div>
                  </block> -->

              <!-- 优化将img转css背景 -->
  
              <div class="tabBar-item" v-for="(item,index) in bindData" :key="index">
            
                <div @click="$route.path!=item.pagePath  && $router.push({ path: item.pagePath ,isTab: true})">
                  
                    <div>
                      <div class="icon" :class= "item.current==1?'tabIconActive'+(index+5):'tabIcon'+(index+1)" >
                        <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                      </div>
                    </div>
                  <div :class="{'tabBartext':item.current== 1}" class="f12 color9a">
                    <button formType="submit" hover-class="none" class='submit_kong_btn'></button>
                    {{item.text}}
                  </div>
                </div>  
              </div>
           
          </div>
          <div v-if="iPhoneshow2" class="h34"></div>
   </form>
    </div>
</template>
<script>
import { getSystemInfoSync } from "@/utils/wechat";
export default {
   props: ['cur_index'],
    data() {
      return {
          bindData:[],
          iPhoneshow2:false
      };
   },
   onshow(){

   },
   created() {
        var otabbar = this._U.tabbarinit();
        otabbar[this.cur_index]['iconPath'] = otabbar[this.cur_index]['selectedIconPath']
        otabbar[this.cur_index]['current'] = 1;
       
        this.bindData=otabbar;  
      	const systemInfo = getSystemInfoSync();
   		if(systemInfo.model == 'iPhone X' ||systemInfo.model == 'unknown<iPhone11,6>'){
   			this.iPhoneshow2=true;
   		}
  },
  methods: { 
       formSubmit_collect({mp}) {
        let formId = mp.detail.formId;
        if(formId=='' || formId == 'undefined'){
          return
        }
         let data = {
            formid: formId,
            timestamp: parseInt(new Date().getTime() / 1000) 
        }
        let formIds = this.$store.state.user.formIds.slice(0)
        formIds.push(data)
        
        this.$store.commit('SET_FORM_IDS',formIds)
        
       
   }
  },
  computed: {
  
  },
   
  mounted() {},
};
</script>
<style  scoped lang='scss'>

$iconList : '../../static/images/icon_index_default.png',
            '../../static/images/icon_nearby_default.png',
            // '../../static/images/icon_fans_default.png',
            '../../static/images/icon_news_default.png',
            '../../static/images/icon_mine_default.png',
            '../../static/images/icon_index.png',
            '../../static/images/icon_nearby.png',
            // '../../static/images/icon_fans.png',
            '../../static/images/icon_newss.png',
            '../../static/images/icon_mine.png';

  @for $i from 1 to length($iconList)+1 {
    .tabIcon#{$i}{
        background: url('#{nth($iconList,$i)}') no-repeat center center;
        background-size: cover;
      }
  }
  @for $i from 5 to length($iconList)+1 {
    .tabIconActive#{$i}{
        background: url('#{nth($iconList,$i)}') no-repeat center center;
        background-size: cover;
      }
  }

  // @each $i, $url in $iconList {
  //   .tabIcon#{$i} {
  //       background:url('#{$url}') no-repeat center center;
  //       background-size: cover;
  //     }
  //   }


.icon{
  width:22px;
  height: 22px;
  margin:0 auto;
  margin-top: 5px;

}
.w100{
  width:100%;
  position: fixed !important;
  bottom:0px;
  background:#fff;
  z-index:999;
}
.tabBar{
  color:#9a9a9a;
  background:#fff;
  height: 50px;
 
}

.iphone_tabBar{
  width:100%;
  position: fixed !important;
  bottom:34px !important;
  background:#fff;
  color:#9a9a9a;
  height: 50px;
  z-index:999;
}
 .tabBar-item{
   position:relative;
  float:left;
  width:25%;
  text-align: center;
  overflow: hidden;
  font-size: 12px;
  margin: 5px 0 0 0;
}

.tabBartext{
  color:#323232;
}
.f12{
  margin-top: 3px;
}
</style>
