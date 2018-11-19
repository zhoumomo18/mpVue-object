<template>
<div class="container lineTop">
        <div class="shopNamePublish lineBottom" v-if="!rateSuccess">
                    <div class="f16 over_hidden">{{shopName}}</div>
                    <div class="publish" @click="publish">发表</div>
        </div>
        <div v-if="!rateSuccess" class="content">
                
                <div class="rateTitle mt30">
                    <div class="f16">有什么想说的嘛？</div>
                    <div class="f13 color9a">请对该店铺做整体评价吧~</div>
                </div>
                <div class="rate">
                        <div class="line"></div>
                        <div class="f12 color9a mb10">综合评价</div>
                        <div class="mb20"><wux-rater @change="onChange"  font-size='36' slot="footer" allow-half allow-clear allow-touch-move default-value="0" /></div>
                        <div> <span>环境：</span> <wux-rater @change="onChange1" font-size='24' slot="footer" allow-half allow-clear allow-touch-move default-value="0" /></div>
                        <div> <span>服务：</span> <wux-rater @change="onChange2" font-size='24' slot="footer" allow-half allow-clear allow-touch-move default-value="0" /></div>
                        <div> <span>价格：</span> <wux-rater @change="onChange3" font-size='24' slot="footer" allow-half allow-clear allow-touch-move default-value="0" /></div>
                </div>
                <div class="textarea">
                    <textarea maxlength='200' @input="descInput" v-model="desc"  placeholder="亲，分享环境、服务、性价比等方面的服务还可以添加话题来评价哟~"></textarea>
                    <div class="fontNum">{{remFont}}/200</div>
                </div>
                <div class="imgs" v-if="imgs.length>0">
                    <div v-for='(item,index) in imgs' :key='index'>
                    	<span @click="del(index,'img')">
                    		
                    	</span>
                        <img :src="item" alt="" srcset="" @click="openimg">
                    </div>
                </div>
                <div class="videos" v-if="videos.length>0">
                	
         
                    <div v-for='(item,index) in videos' :key='index'>
                    
                        <video :src="item">
                     
                    		 <cover-view class="play" @click="del(index,'video')">
                    		 	<!--<cover-image class="img" src="../../../static/images/icon_close.png" />-->
                    		 	✕
							 </cover-view>
                    
                        </video>
                    </div>
                </div>
                <div class="picVideo mb15">
                    <div class="pic" @click="addImg">
                        <div class="picIcon"></div>
                        <div>上传照片</div>
                    </div>
                    <div class="video" @click="addVideo">
                        <div class="videoIcon"></div>
                        <div>上传视频</div>
                    </div>
                    
                </div>
                
        </div>
        <div class="priceSale mt4"  v-if="!rateSuccess">
                    <span class="mr20 f16">人均消费</span>
                    <input type="number" placeholder="请输入消费金额" v-model="priceSale" class="f14 color9a">
        </div>

        <div v-if="rateSuccess" class="rateSuccess mt10">
            <div class="title">
                <div class="successIcon mr12"></div>
                <div class="f21">感谢您的评价</div>
               
            </div>
             <div class="color9a mt10">您已获得+10积分哟~</div>
        </div>


</div>
</template>
<script>
import { uploadFile, chooseImage, showActionSheet } from "@/utils/wechat";
export default {
  data() {
    return {
        remFont:200,
        imgs:[],
        videos:[],
        rateSuccess:false,
        shopName:'',
        desc:'',
        priceSale:''
    };
  },
  components: {},
  created() {},
  methods: {
   
    async hasauth() {
     
      
    },
    onChange({mp}){
       this.zh=mp.detail.value
    },
    onChange1({mp}){
        this.hj=mp.detail.value
    },
    onChange2({mp}){
        this.fw=mp.detail.value
    },
    onChange3({mp}){
        this.jg=mp.detail.value
    },
     descInput(){
        this.remFont = 200 - this.desc.length;
      }, 
    async addImg(e) {
        let that =this
      const [err, res] = await this._to(
        showActionSheet(["从相册中选择", "拍照"])
      );
      if (res == 0) {
        chooseImage("album").then( path => {
         uploadFile(
            "https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=index.upload_img",
            path[0]
          ).then(data=>{
              if(that.imgs.length>=3){
                that.imgs.unshift(JSON.parse(data.data).result.url)
                that.imgs= that.imgs.slice(0,3)
                }else{
                   that.imgs.push(JSON.parse(data.data).result.url)
                }
          });
        })
      } else if(res == 1) {
        chooseImage("camera").then( path => {
          uploadFile(
            "https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=index.upload_img",
            path[0]
          ).then(data=>{
               if(that.imgs.length>=3){
                that.imgs.unshift(JSON.parse(data.data).result.url)
                that.imgs= that.imgs.slice(0,3)
                }else{
                   that.imgs.push(JSON.parse(data.data).result.url)
                }
             
          });
        });
      }
    }, 
    del(index,type){
    	if(type=='img'){
    		this.imgs.splice(index,1)
    		
    	}if(type=="video"){
    		this.videos.splice(index,1)
    		
    	}
    },
   
    	
    addVideo(){
        let that =this
        wx.chooseVideo({
        sourceType: ['album','camera'],
        maxDuration: 15,
        camera: 'back',
        success(res) {
           uploadFile(
            "https://sh.szwfy.com.cn/app/ewei_shopv2_api.php?i=3&r=index.upload_img",
            res.tempFilePath
          ).then(data=>{
            if(that.videos.length>3){
                that.videos.unshift(JSON.parse(data.data).result.url)
                that.videos= that.videos.slice(0,3)
            }else{
                that.videos.push(JSON.parse(data.data).result.url)
            }
             
               
          });
           
        }
        })
    },
   async publish(){
        if (this.$store.state.user.loginStatus==false) {
          this.$router.push({
            path: '/pagesSub/login/loginIndex'
          });
          return
        }

		else if(!this.zh){
			 this.$tips.toast('未选择综合评分',function(){},'none',2000);
			return
		} else if(!this.hj){
			this.$tips.toast('未选择环境评分',function(){},'none',2000);
			return
		}else if(!this.fw){
			this.$tips.toast('您未选择服务评分',function(){},'none',2000);
			return
		}else if(!this.jg){
			this.$tips.toast('您未选择价格评分',function(){},'none',2000);
			return
		}
		else{
			
		let res = await 
          this.$http.shopRate(
            this.$route.query.id,
            this.$store.state.user.userInfo.openId,
            this.zh,
            this.hj,
            this.fw,
            this.jg,
            this.desc,
            this.imgs.join(','),
            this.videos.join(','),
            this.priceSale
            
          )
          if(res.status==1){
               this.$tips.toast('已评价成功');
               setTimeout(()=>{
                    this.rateSuccess =true
                    this.desc=''
                    this.imgs=[]
                    this.videos=[]
                    this.priceSale=''
               },1000)
          }else if(res.status==0){
              this.$tips.toast(res.result.message,function(){},'none',2000);
          }
		}

        
    },
	openimg(){
		wx.previewImage({
		  urls: this.imgs
		})
	}
 
  },
  mounted() {
    this.hasauth();

   
  },
   onShareAppMessage(options) {
      return {
        title: (this.$store.state.user.userInfo?this.$store.state.user.userInfo.nickName:'') + '给您分享天天逛街的商品...',
        path: this.$route.fullPath
      }
  },
  onShow() {
        this.shopName=this.$route.query.shopName
        this.rateSuccess=false
  },
 
};
</script>
<style  scoped lang='scss'>
    .container{
      background-color: #e8e8e8;
      padding-bottom: 32px;
            .shopNamePublish{
                    display: flex;
                    justify-content:space-between;
                    align-items: center;
                    background-color: #fff;
                    padding:0 15px;
                    margin: 12px 15px 0 15px ;
                    height: 40px;
                    width:100%;
                    .publish{
                        width: 50px;
                        height: 24px;
                        background-color: #ff455d;
                        border-radius: 3px;
                        font-size: 14px;
                        text-align: center;
                        line-height: 24px;
                        color: #ffffff;
                    }
                }
            .content{
                width: 100%;  
                padding: 0 15px;
                background-color: #fff;
                display: flex;
                flex-direction: column;
                align-items:center;
                
                .rateTitle{
                    width:100%;
                    text-align:center;
                }
                .rate{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    >div{
                         text-align:center;
                    }
                    .line{
                        width: 180px;
                        height: 1px;
                        background: #E8E8E8;
                        transform: scaleY(0.5);
                        margin: 15px 0 18px 0;
                    }

                }
                .textarea{
                    width: 300px;
                    height: 150px;
                    background-color: #f2f2f2;
                    border-radius: 2px;
                    margin: 20px 0 14px 0;
                    padding: 12px;
                    box-sizing: border-box;
                    position: relative;
                    >textarea{
                        width: 100%;
                        height: 100%;
                    }
                    .fontNum{
                        position: absolute;
                        right: 12px;
                        bottom: 9px;
                        font-size: 10px;
                        color: #b7b7b7;
                    }
                }
                .imgs{
                    width: 300px;
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap:wrap;
                    margin-bottom: 10px;
                     >div{
                        width: 80px;
                        height: 80px;
                        border-radius: 2px;
                        margin-right: 13px;
                        position: relative;
                        
                        >img{
                            width: 100%;
                            height: 100%;
                        }
                       >span{
                        	
                        	width:20px;
                        	height:20px;
                        	display: flex;
                        	justify-content: center;
                        	align-items: center;
                        	position: absolute;
                        	right:-5px;
                        	top:-5px;
                        	background-color: rgba(0,0,0,.8);
                        	border-radius: 50%;
                        	
                        
          					
          					&::before{
          						content: "✕";
						    	font-size: 12px;
						        color: #fff;
							      
          					}
                        }
                    } 
                }
                .videos{
                      width: 300px;
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap:wrap;
                    margin-bottom: 10px;
                     >div{
                        width: 100px;
                        height: 100px;
                        border-radius: 2px;
                        margin-right: 13px;
                        position: relative;
                        background: #000000;
                        >img{
                            width: 100%;
                            height: 100%;
                        }
                        >video{
                         width: 100%;
                         height: 100%; 
                         object-fit: fill;
                         position: relative;  
                          .play{
                        	z-index: 1000;
                        	color:#000;
                        	width:15px;
                        	height:15px;
                        	display: flex;
                        	justify-content: center;
                        	align-items: center;
                        	position: absolute;
                        	right:1px;
                        	top:1px;
                        	background-color: #fff;
                        	text-align: center;
                        	font-weight: 500;
                        	border-radius: 50%;
                        	font-size: 12px;
                        	
                        		
          					
          					
                        }
                        }
          
                    } 
                }
                .picVideo{
                    width: 300px;
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap:wrap;
                    >div{
                        width: 80px;
                        height: 80px;
                        border-radius: 2px;
                        margin-right: 13px;
                        border: dashed 1px #9a9a9a;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        >div{
                            font-size: 15px;
                        }
                        .picIcon{
                            width: 30px;
                            height: 30px;
                            background: url("#{$imgUrl}icon_photo.png") no-repeat center center;
                            background-size: contain;
                        }
                        .videoIcon{
                            width: 30px;
                            height: 30px;
                            background: url("#{$imgUrl}icon_video_icon.png") no-repeat center center;
                            background-size: contain;
                        }
                      
                    }
                    

                }
               

            }
            .priceSale{
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    background:#fff;
                    margin-top:4px;
                    padding-left:15px;
                    >input{
                        width: 200px;
                    }
                }
            .rateSuccess{
                width: 100%;
                height: 90px;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                background: #fff;
                .title{
                    display:flex;
                    .successIcon{
                        width: 27px;
                        height: 27px;
                        background: url("#{$imgUrl}icon_pressed_sm@2x.png") no-repeat center center;
                        background-size: contain;
                     }
                 }
            }
            
    }
</style>
