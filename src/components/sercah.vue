<template>
    <div class="w100" >      
             <div class="searchBox mr4">
                              <span class="searchIcon mr15"></span>
                              <input type="text" class="search" placeholder-class="placeholder"
                              @focus='searchFocus' @blur="searchBlur" placeholder="搜本地商场、品牌优惠">
                             
                        </div>
                     
  
    </div>
</template>
<script>
export default {
   props: ['cur_index'],
    data() {
      return {
   		
      };
   },
   onshow(){
       
   },
   created() {

  },
  methods: { 
    
  },
  computed: {
  
  },
  mounted() {
  	
  },
};
</script>
<style  scoped lang='scss'>
	 .searchBox {
             /* background: #f2f2f2;*/
              display: inline-block;
              height: 34px;
              line-height: 30px;
							border-radius: 5px;
							border: solid 0.5px #b7b7b7;
              width: 345px;
             
              border-radius: 5px;
              padding-left: 14px;
              margin-left:15px;

              .searchIcon {
                display: inline-block;
                width: 13.5px;
                height: 14px;
             /*   background: url("#{$imgUrl}search.png") no-repeat center center;*/
                background-size: cover;
                vertical-align: middle;
              }
              .search {
                display: inline-block;
                width: 170px;
                height: 20px;
                line-height: 20px;
                min-height: 20px;
                vertical-align: middle;
              }
                .searchIcon {
                display: inline-block;
                width: 13.5px;
                height: 14px;
                background: url("../../static/images/search.png") no-repeat center center;
                background-size: cover;
                vertical-align: middle;
              }
            }
            .carIcon {
              position: relative;
              display: inline-block;
              width: 21px;
              height: 22px;
              background: url("../../static/images/icon_screen.png") no-repeat center center;
              background-size: cover;
              vertical-align: middle;
              .count{
                position: absolute;
                width: 15px;
                height: 15px;
                right: -10px;
                top:-6px;
                border-radius: 50%;
                background-color: #ff455d;
                color:#fff;
                text-align: center;
                line-height: 15px;
                font-size: 10px;
              }
            }
</style>
