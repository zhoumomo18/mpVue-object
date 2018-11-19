<template>
  <div >
       <!-- <div class="shopName lineBottom" >
            <div class="logo" >
              <img :src="shopLogo" alt="">
            </div>
            <div class="name">{{shopName}}</div>
      </div> -->
      <div class="goods lineBottom clearfix" >
          <div class="goodsLogo">
            <img :src="goodsImg" alt="">
          </div>
          <div class="goods_detail_wrap">
              <div class="titleNum">
                  <span class="title">
                      <span>{{goodsTitle}}</span>
                  </span>
                  <span class="num mr15">X{{goodsNum}}</span>
              </div>
              <div class="price">￥{{goodsPrice}}</div>
              <div class="colorSize">
                  <span>颜色：{{goodsColor}}</span>
                  <span>尺寸：{{goodsSize}}</span>
              </div>
          </div>   
      </div>
     </div>
    
       
</template>

<script>
export default {
  props: [
    "goodsImg",
    "goodsNum",
    'goodsTitle',
    "goodsPrice",
    'goodsColor',
    'goodsSize'
  ]
};
</script>

<style  scoped lang='scss'>
// .shopName {
//   background: #fff;
//   display: flex;
//   height: 40px;
//   .logo {
//     width: 21px;
//     height: 20px;
//     margin: 10px 22px 0 15px;

//     // background: url("../../static/images/icon_default.png") no-repeat center
//     //   center;
//     // background-size: cover;
//     img {
//       width: 100%;
//       height: 100%;
//     }
//   }
//   .name {
//     line-height: 40px;
//     font-size: 14px;
//   }
// }
.goods {
   width: 100%;
    height: 104px;
  display: flex;
  background: #fff;
  .goodsLogo {
    position: absolute;
    width: 84px;
    height: 84px;
    top: 10px;
    left: 15px;
    // background: url("../../static/images/img_mensclothing.png") no-repeat center
    //   center;
    // background-size: cover;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .goods_detail_wrap {
    padding-bottom: 10px;
    margin-left: 110px;
    width: 100%;
    .titleNum {
      margin-top: 20px;

      .title {
      }
      .num {
        float: right;
      }
    }
    .price {
      color: #ff455d;
      font-size: 16px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .colorSize {
      span {
        margin-right: 15px;
      }
    }
  }
}
</style>