<template>
<div class="container lineTop">
	<div class="code_01">
		<div class="code_img1">
			
		</div>
		<p>228468943201</p>
	</div>
	<div class="code_02">
		<div class="code_img2">
			
		</div>
		<p>2284-6894-3201</p>
		
	</div>
      <div class="userInfo">
          <div class="userName lineTop">
            <span>名称:</span>
            <p>阿里王专卖店</p>
          </div>
            <div class="userName lineBottom">
            <span>面额:</span>
            <p>￥15.00</p>
          </div>
           <div class="userName lineBottom">
            <span>使用限制:</span>
            <p>无限制</p>
          </div>
           <div class="userName lineBottom">
            <span>有效期:</span>
            <p>2018/07/11 00：00-2018/10/18 23:59</p>
          </div>
      </div>

  
</div>
</template>
<script>
import { mapState } from 'vuex'
import { uploadFile, chooseImage, showActionSheet } from "@/utils/wechat";
export default {
  data() {
    return {
     date:'',

    };
  },
  components: {},

  methods: {
   //添加图片
   async joinPicture(e) {
     const [err, res] = await this._to(showActionSheet())
      if(res==0){
        const [err, res] = await this._to(chooseImage('album'))
      }else{
        const [err, res] = await this._to(chooseImage('camera'))
      }
  },
 bindDateChange(e) {
    this.date = e.mp.detail.value;
  },
 
 

  },
    computed: {
    
    ...mapState({
     
      userInfo : state => state.user.userInfo
     
    })
    
  },
  mounted() {
   
  },
  onPullDownRefresh() {},
  async onShow() {
    const res  =await this.$http.getPersonInfo();
   
  }
};
</script>
<style  scoped lang='scss'>
.container{
  .userInfo{
    width: 100%;
      &>div{
        height: 40px;
        display: flex;
        align-items:center;
        justify-content:space-between;
        position: relative;
        &>span{
          margin-left: 15px;
        }
         &>p{
           float: right;
           font-size: 14px;
           color: #9a9a9a;
          margin-right: 15px;
        }

      }
    .header{
      height: 50px;
        img{
          width: 37px;
          height: 37px;
          border-radius: 50%;
        }
    }

  }
  .code_01{
  	margin: 30px 0;
  	margin-bottom:0px;
  	.code_img1{
  		width: 249px;
		height: 75.5px;
		margin:0 auto;
		border: 0.5px solid #9A9A9A;
		margin:0px auto;
  	}
  	p{
  		text-align: center;
  		font-size: 18px;
  		color: #424242;
  		margin-top:4px;
  	}

 
  }
  .code_02{
  	margin: 30px 0;
  	margin-bottom:30px;

	 .code_img2{
  		width: 155.5px;
		height: 155.5px;
		margin:0 auto;
		border: 0.5px solid #9A9A9A;
		margin:0px auto;
		
  	}
  	p{
  		text-align: center;
  		color: #424242;
  		font-size: 18px;
  		margin-top:4px;

  	}
	
  }
}






</style>
