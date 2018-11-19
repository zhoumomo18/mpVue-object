<template>
    <div class="lineTop">
        <isLoading :isLoading='isLoading'></isLoading>
        <div class="clusterList">
          <van-popup :show="showCenter" custom-class="center" position="center"
         @close="togglePopup" >
         	 <div class="item item_2 lineBottom">
              		选择商圈
            </div>
            <div class="item lineBottom" v-for="(i,index) in clusterList" :key="index"
            @click="goHome(i)">
                {{i.name}}
            </div>
        </van-popup>
        </div>
      <div class="search-city" v-if="show_search">
      	<!--<div class="city_text">
      		<i class="adressIcon  mr5"></i>
      		<i class="f12 color28 city">关谷商圈</i>
      		<i class="city_toggle"></i>
      	</div>-->
      	<input type="text" placeholder="请输入要搜索的城市" v-model="citySearch">
      	<span>取消</span>
      </div>
      <div class="box_1" v-if="ishowbox1">
	  	<div class="cate_city">
	      	<p>当前定位城市：<span>{{locationCity}}</span></p>
	      	<h3>热门城市：</h3>
	      	<div class="s_buttons">
	  			<span  @click="getMasterList('深圳市')">深圳</span>
	  			<span  @click="getMasterList('武汉市')">武汉</span>
	  			
	  		</div>
	      </div>
	      <div>
	        <div ref="showCityContent" :class="{'tipShow':tipShow}">{{showCityContentInnerTxt}}</div>
	        <div v-for="(item,index) in showCity" :key="index" class="letter-item">
	          <div><a :id="item.letter">{{item.letter}}</a></div>
	          <div v-for="(i,key) in item.citylist" :key="key"
	            @click="getMasterList(i)"
	          >{{i}} </div>
	        </div>
	      </div>
	      <aside class="letter-aside">
	        <ul>
	          <li v-for="(item,index) in showCity" :key="index" @click="naver(item.letter)">{{item.letter}} </li>
	        </ul>
	      </aside>
	      <div ref="tip" id="tip" :class="{'tipAppear':tipAppearShow}">
        	{{tipString}}
    	  </div>
    
    
    	
      </div>
    <!--新页面-->
    	<div class="box_2" v-if="ishowbox2">
    		<div class="b_header">
	    		<div class="city_text" @click="poin_tabaddress">
		      		<i class="adressIcon  mr5"></i>
		      		<i class="f12 color28 city">{{locationCity}}</i>
		      		<i class="city_toggle"></i>
		      		<i class="lines"></i>
		      	</div>
		      	<h3 class="over_hidden">{{address_name}}</h3>
		      
		      	<div class="city_address" @click="reloadLocation">
		      		<i class="cityIcon  mr5"></i>
		      		<i class="f12 colorf45d poin_city">{{address_lodding}}</i>
		      	</div>
    		</div>
    		<ul>
    				<h4 class="f14 color9a">附近商圈</h4>
		      		<!--<li class="f14 colorf45d">龙岗	COOCC城 <span class="f12 color9a">(当前定位)</span></li>-->
		      		<li class="f14 color32" :class="{'adr_name':address_name==i.name}" v-for="(i,index) in clusterList" :key="index" @click="goHome(i)">
		      			{{i.name}} <span class="f12 color9a" v-if="address_name==i.name">(当前定位)</span>
		      		</li>
    		</ul>
	  
    	</div>
    
    </div>
</template>


<script>
// import pinyin from 'pinyin'
import isLoading from "@/components/isLoading";
import { setStorage, getStorage,getLocation} from "@/utils/wechat";
  import pinyin from '../../../static/lib/web-pinyin/bundle.js'
  var cityLists = []
  var cityNames = []
  var cityNamesFilter = []
  var letter = []
  var countPage = 0
  var tipLetter = ''
  var citySearch = ''
  var showCity = []
  var showCityList = []
  var showCityTemp
  export default {
    mounted: function () {
        wx.pageScrollTo({
        scrollTop: 500,
        duration: 300
        })
    //   window.scrollTo(0, 500)


    },
    components:{
        isLoading
    },
    methods: {
      buildLetter: function () {  // 构建字母项
        letter = []
        for (let i = 0; i < 26; i++) {
          let obj = {}
          obj.letter = String.fromCharCode((65 + i))
          obj.citylist = []
          letter.push(obj)
        }
      },
      getFirstLetter: function (str) { //  得到城市第一个字的首字母
        return pinyin.pinyin(str)[0][0].charAt(0).toUpperCase()
      },
      buildItem: function (cityNamesFilter) {  // 构建城市
        this.buildLetter()
        let _this = this
        for (let i = 0; i < 26; i++) {
          letter[i].citylist = []
        }
        for (let i = 0; i < cityNamesFilter.length; i++) {
          let _index = Number(_this.getFirstLetter(cityNamesFilter[i]).charCodeAt() - 65)
          if (_index >= 0 && _index < 26) {
            letter[_index].citylist.push(cityNamesFilter[i])
          }
        }
        // 如果letter中citylist中没有值的话，过滤这一项
        showCity = showCityTemp = letter.filter(function (value) {
          let len = value.citylist.length
          return len > 0
        })
      },
       naver:function (id) { // 点击右边字母滚动
        this.tipString = id
      
        
         var query = wx.createSelectorQuery()
            query.select('#'+id).boundingClientRect((res)=>{
             this.tipAppearShow=true
                setTimeout(()=> {
                this.tipAppearShow=false
                }, 500)
                
                let posY =  getStorage('posY')
                let oPos =  res.top 
                let Y = posY?posY:0
                console.log(oPos)
                console.log(oPos+Y)
                wx.pageScrollTo({
                    scrollTop: oPos+Y - 36,
                    duration: 300
                })
                   setStorage('posY',oPos-36)
                }).exec()
       
        
          
        return 
      },
      cityFilter: function (city) {  // 城市搜索筛选
        let showCityListTemp
        this.buildItem(cityNamesFilter)
        showCity = showCityTemp
        showCity = showCity.filter(function (value) {
          showCityList = value.citylist
          showCityListTemp = showCityList.filter(function (val) {
            return (val.indexOf(city) > -1)
          })
          value.citylist = showCityListTemp
          return value.citylist.length > 0
        })
        this.showCity = showCity
        if (showCity.length === 0) {
        //   let _showCityContent = this.$refs.tip.showCityContent
          this.showCityContentInnerTxt = '查询不到结果'
          tipShow:true
        //   _showCityContent.setAttribute('class', 'tipShow')
        } else {
        //   this.$refs.showCityContent.innerText = ''
         this.showCityContentInnerTxt = ''
        }
      },
     async getMasterList(i){
     
   		this.ishowbox1=false;
    	this.ishowbox2=true;
    	this.show_search=false;
//      this.showCenter =!this.showCenter
        const [err ,res ] =await this._to(this.$http.marketCityList(
          this.$store.state.user.locationInfo.latitude, this.$store.state.user.locationInfo.longitude, 1, 20, i
        ))
        
        
        
        let ids =''
        res.result.data.map(i=>{
            ids+= i.id+','
        })
        this.$store.commit("SET_IDS",ids.slice(0,ids.length-1));
        this.clusterList =res.result.data
       
       // ···································································
	       
        // ···································································
      },
      poin_tabaddress(){
      	this.ishowbox1=!this.ishowbox1;
      	this.ishowbox2=!this.ishowbox2;
      	this.show_search=true;
      },
      togglePopup() {
        this.showCenter=!this.showCenter
      },
      goHome(item){
//        this.showCenter=!this.showCenter
           this.$store.commit("SET_CLUSTER_INFO",item);
        //  this.$store.commit("SET_CLUSTER_INFO",{id,title});
        
         this.$router.push({ path: "/pages/home/home", isTab: true });
       
      },
     async reloadLocation(){
     	this.address_lodding='定位中...'
    
      	let [err1, data] = await this._to(getLocation());
      	 
      	let [err2, BusinessList] = await this._to(
        this.$http.getBusinessPosition(data.latitude, data.longitude)
      );
      
		
		
      //如果此地点没有商圈   提示此位置没有相应的商圈
       let clusterInfo =BusinessList.result[0]
      if (clusterInfo) {
       
          clusterInfo['isCurrent']=true
          this.$store.commit("SET_CLUSTER_INFO", clusterInfo);
        
        
      } 
      
   		
		this.$router.push({ path: "/pages/home/home", isTab: true });
	
		
				
   

      }
    },
    data () {
      return {
        cityNames: cityNamesFilter,
        letter: letter,
        tipString: tipLetter,
        citySearch: citySearch,
        showCity: showCity,
        showCityContentInnerTxt :'',
        tipAppearShow:false,
        showCenter:false,
        clusterList:null,
        locationCity:'',
        ishowbox1:false,
        ishowbox2:true,
        address_name:'',
        address_lodding:'重新定位',
        show_search:false
        
      }
    },
    watch: {
      citySearch: function (newCitySearch) {
        this.cityFilter(newCitySearch)
      }
    },
   async onShow(){
    if(!this.$store.state.user.clusterInfo){
      	this.ishowbox1=true;
        this.ishowbox2=false;
        this.show_search=true;
    }
     this.locationCity =this.$store.state.user.clusterInfo?this.$store.state.user.clusterInfo.city:'选择位置'
     this.$store.commit('SET_IS_LOADING',false)
     this.$store.commit('SET_IS_LOADING',true)
     const [err, response]  =  await  this._to(this.$http.getcityList())
       
      countPage++
      if (countPage < 2) {
            console.log(response)


          let cityList = response.list
         
          for (let i in cityList) {
           if(cityList[i]!=null){
              cityNames.push(cityList[i])
           } 
            // cityLists = cityList[i].city
           
            // for (let j in cityLists) {
            //   cityNames.push(cityLists[j].citysName)
            // }
          }
          cityNamesFilter = cityNames
          
          this.cityFilter(this.citySearch)
        //   this.someData = response.data.body
        
      }
     
      if(this.ishowbox2==true){
      	this.show_search=false;
      	this.address_lodding='重新定位';
      	this.address_name=	this.$store.state.user.clusterInfo.name;
      	this.getMasterList(this.locationCity);
      }else{
      	this.show_search=true;
      }
       this.$store.commit('SET_IS_LOADING',false)
    }
  }
</script>

<style scoped lang="scss" >
  * {
    margin: 0;
    padding: 0;
  }
  .clusterList{
      width: 100%;
    .item{
       width: 295px;
       height: 40px;
       line-height:40px;
       color:#323232;
       font-size: 14px;
       text-align: center; 
    }
    .item_2{
    	color:#323232;
    	font-size:17px;
    	font-weight: 700;
    }
  }
  #city {
    position: relative;
  }

  .letter-item {
  	padding:0 15px;
  
  
    > div:first-child {
    padding-bottom:15px;
     border-top:0.5px solid #f0f0f0;
      font-size: 16px;
      line-height: 2em;
      background: #fff;
      
      margin-bottom: 2px;
      margin-right:15px;
      color:#9a9a9a;
      div{
      	 border-top:0.5px solid #f0f0f0;
      }
    }
    > div {
      padding-right: 10%;
	
      line-height:24px;
		font-size:14px;
     /* border-bottom: 1px solid #f2f2f2;*/
    }
  }

  .letter-aside {
    position: fixed;
    right: 10px;
    top: 2.3rem;
    ul {
      list-style: none;
      line-height: 1.6em;
      font-size: 12px;
      position: relative;
      color: #9a9a9a;
      font-family: PingFang-SC-Regular;
    }
  }

  #tip {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 1px solid #333333;
    width: 100px;
    height: 100px;
    z-index: 10;
    text-align: center;
    line-height: 100px;
    font-size: 50px;
    opacity: 0;
  }

  .tipAppear {
    animation: appearTip 1 linear 0.5s;
  }

  @keyframes appearTip {
    0% {
      opacity: 1;
    }
    80% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
    }
  }

  .search-city {
    text-align:left;
	padding:15px 60px 15px 15px;
	position: relative;


    input {
    	padding-left:10px;
    	background-color: #f0f0f0;
		border-radius:40px;
		height:40px;
      line-height: 40px;
      border-radius: 40px;
      outline: none;
      padding-top:3rpx;
    }
    span{
    	position: absolute;
    	right:15px;
    	top: 24px;
    	font-size: 14px;
    	color: #9a9a9a;
    }
  }

	.box_2{
		width:100%;
		height:100%;
		ul{
			padding:25px 15px;
			h4{
				font-weight: 700;
			}
			li{
				padding-top:28px;
			}
			.adr_name{
				color:#FF455D;
			}
		}
		.b_header{
			height:45px;
			width:100%;
			line-height:45px;
			padding:0 15px;
			h3{
				float:left;
				height:100%;
				
				line-height:45px;
				text-align:center;
				color:#323232;
				font-size:16px;
				font-weight:700;

			}
		.city_text{
		/*width:108px;*/
		float:left;
		/*padding-top:8px;*/
		.adressIcon {
	      width: 13.5px;
	      height: 20px;
	      display: inline-block;
	      background: url("#{$imgUrl}icon_adr.png") no-repeat center center;
	      background-size: cover;
	      position: relative;
	      top: 4.5px;
	    }
    
		 .city {
	      text-overflow: ellipsis;
	      white-space: nowrap;
	      overflow: hidden;
	      display: inline-block;
	      line-height: 12px;
	    }
	    .city_toggle{
	    	width:11px;
			height:5.5px;
			margin-left:4px;
			/*left:6px;*/
	      display: inline-block;
	      background: url("#{$imgUrl}img_cut.png") no-repeat center center;
	      background-size: cover;
	      position: relative;
	      
	    }
	    .lines{
	    	width:0.5px;
			height:17px;
			margin:0 12px;
			/*left:41rpx;*/
			display:inline-block;
			/*border:1rpx solid #9a9a9a;*/
			background:#9a9a9a;
			position:relative;
			top:4px;

	    }
	    
	}
	.city_address{
		width:80px;
		height:100%;
		float:right;
		.cityIcon{
			width:38rpx;
			height:38rpx;

	      display: inline-block;
	      background: url("#{$imgUrl}icon_dingw.png") no-repeat center center;
	      background-size: cover;
	      position: relative;
	      top:9rpx;
		left:-4px;

		}
		.poin_city{
			display: inline-block;
		}
		 
	}
		
		}

	}
  .tipShow {
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    color: #bbbbbb;
  }
    .cate_city{
    	padding:0 15px;
  	h3{
  		margin:5px 0;
			height: 30px;
			font-family: PingFang-SC-Regular;
			font-size: 16px;
			font-weight: normal;
			line-height: 30px;
			letter-spacing: 0rem;
			color: #9a9a9a;	
  	}
  	p{
  			margin-top:5px;
			height: 30px;
			font-family: PingFang-SC-Regular;
			font-size: 14px;
			font-weight: normal;
			line-height: 30px;
			letter-spacing: 0rem;
			color: #9a9a9a;
  	}
  	 .s_buttons{
  	 	padding-bottom: 15px;
  			span{
  				padding:0 15.5px;
  				margin-bottom:15.5px;
  				margin-right:14px;
  				margin-top:5px;
  			display: inline-block;
  			/*width: 71px;*/
			height: 26px;
			
			line-height: 26px;
			border-radius: 5px;
			color: #9a9a9a;
			border: solid 0.5px #9a9a9a;;
			font-size: 14px;
			text-align: center;	
  			}
  		
  		}
  		.center{
  			width:100%;
  		}
  }
</style>
