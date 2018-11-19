<template>
	<div class="container">
		<isLoading :isLoading='isLoading'></isLoading>
		<div class="swiper">

			<scroll-view scroll-x="true" class="navbar" :scroll-left="scrollLeft">
				<block v-for="(item,index) in tabs" :key="index">
					<div :id="index" :class="{'navbar_item_on':activeIndex == index}" class="navbar_item lineTop" @click="tabClick">
						<div class="navbar_title">{{item.name}}</div>
					</div>
				</block>
			</scroll-view>

			<swiper class="content" :duration="duration" :style="{ height: scrool_swper + 'px' }" @change="swiperChange" :current="currentTab" @animationfinish="onAnimationfinish">
				<swiper-item class="orderAll">
					<scroll-view scroll-y :style="{ height: scrool_swper + 'px' }">
						<div v-if="orderAllList&&orderAllList.length>0" class="item" v-for="(itm,key) in orderAllList" :key='key'>
							<div class="orderStatus colorf45d">{{itm.statusstr}}</div>
							<div class="item" v-for="(i,index) in itm.goods" :key='index' @click="$router.push({ path:'/pages/user/orderdetil',query:{id:itm.id}})">
								<div class="shopName lineBottom">
									<div class="logo">
										<img :src="i.logo" alt="">
									</div>
									<div class="name">{{i.shopname}}</div>
								</div>
								<!--@click="$router.push({ path:'/pagesSub/goodsDetail/index',query: { id: item.goodsid }})"-->

								<div v-for="(item,indexIn) in i.goods" @click="$router.push({ path:'/pages/user/orderdetil',query:{id:itm.id}})" :key='indexIn'>
									<GoodsDetail :goodsImg='item.thumb' :goodsTitle='item.title' :goodsNum="item.total" :goodsPrice="item.price" :goodsColor="item.color" :goodsSize="item.size"></GoodsDetail>
									<!-- <p> {{item.goodsid}}33</p>-->
								</div>
							</div>
							<div class="acturPay h40 lineBottom">
								<div class="fl ml15">实付：</div>
								<div class="fr mr15">
									<span class="colorf45d mr11"> ￥{{itm.price}}</span>
									<span class="color9a">（免运费）</span>
								</div>
							</div>
							<div class="confirmWrap h40">

								<!-- 待付款 -->
								<div v-if="itm.status=='0'" class="fr mr15">
									<span class="cancel" @click="poincancel(itm.id)">取消订单</span>
									<span class="colorf45d confirm" @click.stop="goPay(itm.id)">去支付</span>
								</div>
								<!-- 代发货 -->
								<div v-if="itm.status=='1'" class="fr mr15">
									<span class="cancel">再来一单</span>

								</div>
								<!-- 待收货 -->
								<div v-if="itm.status=='2'" class="fr mr15">
									<span class="cancel">再来一单</span>
									<span class="colorf45d confirm" @click.stop="goPay(itm.id)">订单评价</span>
									<span class="colorf45d confirm" @click.stop="goPay(itm.id)">查看物流</span>
								</div>
								<!-- 待评价 -->
								<div v-if="itm.status=='3'" class="fr mr15">
									<span class="cancel">再来一单</span>
									<span class="colorf45d confirm" @click.stop="goPay(itm.id)">查看物流</span>
									<span class="colorf45d confirm" @click.stop="goPay(itm.id)">快去评价</span>
								</div>
							</div>
						</div>

						<div v-if="orderAllList&&orderAllList.length<=0">
							<div class="noOrder">

							</div>
							<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
						</div>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y :style="{ height: scrool_swper + 'px' }">
						<div v-if="orderPendingPaymentList&&orderPendingPaymentList.length>0" class="item" v-for="(itm,key) in orderAllList" :key='key'>
							<div class="orderStatus colorf45d">待支付</div>
							<div class="item" v-for="(i,index) in itm.goods" :key='index' @click="$router.push({ path:'/pages/user/orderdetil',query:{id:itm.id}})">
								<div class="shopName lineBottom">
									<div class="logo">
										<img :src="i.logo" alt="">
									</div>
									<div class="name">{{i.shopname}}</div>
								</div>
								<div v-for="(item,indexIn) in i.goods" @click="$router.push({ path:'/pages/user/orderdetil',query:{id:itm.id}})" :key='indexIn'>
									<GoodsDetail :goodsImg='item.thumb' :goodsTitle='item.title' :goodsNum="item.total" :goodsPrice="item.price" :goodsColor="item.color" :goodsSize="item.size"></GoodsDetail>
								</div>
							</div>
							<div class="acturPay h40 lineBottom">
								<div class="fl ml15">实付：</div>
								<div class="fr mr15">
									<span class="colorf45d mr11"> ￥{{itm.price}}</span>
									<span class="color9a">（免运费）</span>
								</div>
							</div>
							<div class="confirmWrap h40">

								<div class="fr mr15">
									<span class="cancel" @click="poincancel(itm.id)">取消订单</span>
									<span class="colorf45d confirm" @click.stop="goPay(itm.id)">去支付</span>
								</div>
							</div>
						</div>

						<div v-if="orderPendingPaymentList&&orderPendingPaymentList.length<=0">
							<div class="noOrder">

							</div>
							<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
						</div>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y :style="{ height: scrool_swper + 'px' }">
						<div v-if="pendingdispath&&pendingdispath.length>0">
							<div class="orderStatus colorf45d">买家已付款</div>
							<GoodsDetail></GoodsDetail>
							<div class="acturPay h40 lineBottom" @click="$router.push({ path:'/pages/user/orderdetil',query:{id:6}})">
								<div class="fl ml15">实付：</div>
								<div class="fr mr15">
									<span class="colorf45d mr11"> ￥90</span>
									<span class="color9a">（免运费）</span>
								</div>
							</div>
							<div class="confirmWrap h40">

								<div class="fr mr15">
									<!-- <span class="btnb7 mr14">再来一单</span> 
                                    <span class="btnb7 mr14">查看物流</span> 
                                    <span class="btnb7">确认评价</span> -->
								</div>
							</div>
						</div>
						<div v-if="pendingdispath&&pendingdispath.length<=0">
							<div class="noOrder">

							</div>
							<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
						</div>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y :style="{ height: scrool_swper + 'px' }">
						<div v-if="pendingGetGoods&&pendingGetGoods.length>0">
							<div class="orderStatus colorf45d">待收货</div>
							<GoodsDetail></GoodsDetail>
							<div class="acturPay h40 lineBottom">
								<div class="fl ml15">实付：</div>
								<div class="fr mr15">
									<span class="colorf45d mr11"> ￥90</span>
									<span class="color9a">（免运费）</span>
								</div>
							</div>
							<div class="confirmWrap h40">

								<div class="fr mr15">
									<span class="btnb7 mr14">再来一单</span>
									<span class="btnb7 mr14">查看物流</span>
									<span class="btnb7">确认评价</span>

								</div>
							</div>
						</div>
						<div v-if="pendingGetGoods&&pendingGetGoods.length<=0">
							<div class="noOrder">

							</div>
							<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
						</div>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y :style="{ height: scrool_swper + 'px' }">
						<div v-if="pendingRejectGoods&&pendingRejectGoods.length>0">
							<div class="orderStatus colorf45d">待评价</div>
							<GoodsDetail></GoodsDetail>
							<div class="acturPay h40 lineBottom">
								<div class="fl ml15">实付：</div>
								<div class="fr mr15">
									<span class="colorf45d mr11"> ￥90</span>
									<span class="color9a">（免运费）</span>
								</div>
							</div>
							<div class="confirmWrap h40">

								<div class="fr mr15">
									<span class="btnb7 mr14">再来一单</span>
									<span class="btnb7 mr14">查看物流</span>
									<span class="btnb7">快去评价</span>
								</div>
							</div>
						</div>
						<div v-if="pendingRejectGoods&&pendingRejectGoods.length<=0">
							<div class="noOrder">

							</div>
							<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
						</div>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y :style="{ height: scrool_swper + 'px' }">
						<div v-if="pendingRejectGoods&&pendingRejectGoods.length>0">
							<div class="orderStatus colorf45d">已完成</div>
							<GoodsDetail></GoodsDetail>
							<div class="acturPay h40 lineBottom">
								<div class="fl ml15">实付：</div>
								<div class="fr mr15">
									<span class="colorf45d mr11"> ￥90</span>
									<span class="color9a">（免运费）</span>
								</div>
							</div>
							<div class="confirmWrap h40">

								<div class="fr mr15">
									<span class="btnb7 mr14">再来一单</span>
									<span class="btnb7 mr14">查看物流</span>
									<span class="btnb7">确认收货</span>
								</div>
							</div>
						</div>
						<div v-if="pendingRejectGoods&&pendingRejectGoods.length<=0">
							<div class="noOrder">

							</div>
							<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
						</div>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y :style="{ height: scrool_swper + 'px' }">
						<div v-if="pendingRejectGoods&&pendingRejectGoods.length>0">
							<div class="orderStatus colorf45d">售后中</div>
							<GoodsDetail></GoodsDetail>
							<div class="acturPay h40 lineBottom">
								<div class="fl ml15">实付：</div>
								<div class="fr mr15">
									<span class="colorf45d mr11"> ￥90</span>
									<span class="color9a">（免运费）</span>
								</div>
							</div>
							<div class="confirmWrap h40">

								<div class="fr mr15">
									<span class="cancel">取消订单</span>
									<span class="colorf45d confirm">确认支付</span>
								</div>
							</div>
						</div>
						<div v-if="pendingRejectGoods&&pendingRejectGoods.length<=0">
							<div class="noOrder">

							</div>
							<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
						</div>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y :style="{ height: scrool_swper + 'px' }">
						<div v-if="pendingRejectGoods&&pendingRejectGoods.length>0">
							<div class="orderStatus colorf45d">已关闭</div>
							<GoodsDetail></GoodsDetail>
							<div class="acturPay h40 lineBottom">
								<div class="fl ml15">实付：</div>
								<div class="fr mr15">
									<span class="colorf45d mr11"> ￥90</span>
									<span class="color9a">（免运费）</span>
								</div>
							</div>
							<div class="confirmWrap h40">

								<div class="fr mr15">

									<span class="btnb7 mr14">查看物流</span>
									<span class="btnb7">售后查询</span>
								</div>
							</div>
						</div>
						<div v-if="pendingRejectGoods&&pendingRejectGoods.length<=0">
							<div class="noOrder">

							</div>
							<div class="noOrderTitle color9a">您还没有相关订单哟o(∩_∩)o</div>
						</div>
					</scroll-view>
				</swiper-item>
			</swiper>
			<div v-if="iPhoneshow" class="h34"></div>
		</div>

	</div>
</template>
<script>
	import GoodsDetail from '@/components/goodsDetail'
	import tab_bar from '@/components/tab_bar'
	import isLoading from "@/components/isLoading";
	import { showActionSheet, requestPayment } from "@/utils/wechat";
	export default {
		data() {
			return {
				tabs: [{
						name: "全部",
						type: "0",
						checked: true
					},
					{
						name: "待付款",
						type: "1",
						checked: true
					},
					{
						name: "待发货",
						type: "2",
						checked: true
					},
					{
						name: "待收货",
						type: "3",
						checked: true
					},
					{
						name: "待评价",
						type: "4",
						checked: true
					},
					{
						name: "已完成",
						type: "5",
						checked: true
					},
					{
						name: "售后中",
						type: "6",
						checked: true
					},
					{
						name: "已关闭",
						type: "7",
						checked: true
					}
				],
				activeIndex: 0,
				currentTab: 0,
				winWidth: 0,
				winHeight: 0,
				scrollLeft: 0,
				duration: 50,
				orderAllList: [],
				orderPendingPaymentList: [],
				pendingdispath: [],
				pendingGetGoods: [],
				pendingRejectGoods: [],
				orderHeight: 0,
				scrool_swper: '',
				page: 1,
				prePage: 4,
				isBottom: false,
				toglestatus: false,
				iPhoneshow: false,
			};
		},
		components: {
			isLoading,
			GoodsDetail
		},
		created() {

		},
		methods: {
			tabClick(e) {
				this.activeIndex = e.currentTarget.id;
				this.currentTab = this.activeIndex;
				this.duration = 500;
			},
			iphone_xsp() {
				if(this.$store.state.user.iphoneX) {
					this.iPhoneshow = true;
				}
				

			},
			async poincancel(id) {

				let ids = id;
				let openid = this.$store.state.user.userInfo.openid;
				let authkey = this.$store.state.user.userInfo.authkey;
				console.log(ids)

				let cancel = await this._to(
					this.$http.poinscancel(ids, openid, authkey)
				);
				const [err, res] = await this._to(this.$http.getOrderList(this.$store.state.user.userInfo.openId))
				this.orderAllList = res.list
				// let allheight = 246*this.orderAllList.length;
				// this.orderHeight=allheight==0?500+ 'px': allheight + 'px';

				//  	id,openid,authkey,merchid
			},
			async swiperChange(e) {
				
				this.currentTab = e.mp.detail.current;
				this.activeIndex = this.currentTab;
				this.duration = 500;
				if(this.currentTab > 3) {
					this.scrollLeft = 600
				} else {
					this.scrollLeft = 0
				}
				this.initData()

			},
			onAnimationfinish() {
				console.log("滑动完成.....");
			},
			initData(){
				this.$store.commit('SET_IS_LOADING', false)
				this.$store.commit('SET_IS_LOADING', true)
				if(this.currentTab == 0) {
					this.$http.getOrderList(this.$store.state.user.userInfo.openId).then(res => {
						this.orderAllList = res.list
						// let allheight = 246*this.orderAllList.length;
						//  this.orderHeight=allheight==0?500+ 'px': allheight + 'px';  
					})

				} else if(this.currentTab == 1) {
					this.$http.getOrderList(this.$store.state.user.userInfo.openId, 1, 0).then(res => {
						this.orderPendingPaymentList = res.list
					})

				} else if(this.currentTab == 2) {
					this.$http.getOrderList(this.$store.state.user.userInfo.openId, 1, 1).then(res => {
						this.pendingdispath = res.list
					})

				} else if(this.currentTab == 3) {
					this.$http.getOrderList(this.$store.state.user.userInfo.openId, 1, 2).then(res => {
						this.pendingGetGoods = res.list
					})

				} else if(this.currentTab == 4) {
					this.$http.getOrderList(this.$store.state.user.userInfo.openId, 1, 3).then(res => {
						this.pendingRejectGoods = res.list
					})

				}
				this.$store.commit('SET_IS_LOADING', false)
			},
			async goPay(id) {
				const [err, res] = await this._to(showActionSheet(['微信支付', '余额支付']))
				if(res == 0) {
					console.log('微信支付')
					this.$http.orderPay(id,
						this.$store.state.user.userInfo.openId).then(payInfo => {
						return requestPayment(
							payInfo.wechat.payinfo.timeStamp,
							payInfo.wechat.payinfo.nonceStr,
							payInfo.wechat.payinfo.package,
							payInfo.wechat.payinfo.signType,
							payInfo.wechat.payinfo.paySign
						)
					})
					// const  wechatPay = await requestPayment(
					//   payInfo.wechat.payinfo.timeStamp,
					//   payInfo.wechat.payinfo.nonceStr,
					//   payInfo.wechat.payinfo.package,
					//   payInfo.wechat.payinfo.signType,
					//   payInfo.wechat.payinfo.paySign
					// )

				} else {
					this.$tips.alert('您当前余额为0！')
				}
			},
		},
		computed: {

			contentHeight() {
				return this.winHeight + "px";
			},
			isLoading() {
				return this.$store.state.user.isLoading
			}
		},
		mounted() {
			var res = wx.getSystemInfoSync();
			this.winWidth = res.windowWidth;
			this.winHeight = res.windowHeight - 60;
			this.iphone_xsp();

		},
		onPullDownRefresh() {},
		async onShow() {

			if(this.$route.query.orderType !== undefined) {

				this.currentTab = parseInt(this.$route.query.orderType)
				this.activeIndex = parseInt(this.$route.query.orderType)
				this.initData()

			}
			this.$store.commit('SET_IS_LOADING', false)
			this.$store.commit('SET_IS_LOADING', true)
			const [err, res] = await this._to(this.$http.getOrderList(this.$store.state.user.userInfo.openId))
			this.orderAllList = res.list
			let res2 = wx.getSystemInfoSync();

			this.scrool_swper = res2.windowHeight - 57-34;
			this.$store.commit('SET_IS_LOADING', false)

		}
	};
</script>
<style scoped lang='scss'>
	.btnb7 {
		display: inline-block;
		width: 71px;
		height: 25px;
		border: 1px solid #b7b7b7;
		color: #9a9a9a;
		text-align: center;
		line-height: 25px;
		vertical-align: middle;
		border-radius: 2px;
	}
	
	.noOrder {
		width: 95px;
		height: 69px;
		background: url(#{$imgUrl}img_orderforgoods_none.png) no-repeat center center;
		background-size: cover;
		position: absolute;
		top: 110px;
		left: 133px;
	}
	
	.noOrderTitle {
		text-align: center;
		margin-top: 0px;
		font-size: 16px;
		color: #9a9a9a;
		position: relative;
		top: 225px;
	}
	.h34{

	}
	.container {
		background-color: #f2f2f2;
		.swiper {
			width: 100%;
			padding-top: 42px;
			.navbar {
				transition: all ease 0.5s;
				padding: 0 30px 0 15px;
				background: #fff;
				white-space: nowrap;
				position: fixed;
				top: 0px;
				left: 0;
				z-index: 99;
				height: 42px;
				line-height: 42px;
				background: #fff;
				.navbar_item_on {
					border-bottom: 1px solid #ff455d;
				}
				.navbar_item {
					display: inline-block;
					width: 65px;
					height: 40px;
					text-align: center;
					.navbar_title {
						color: #323232;
						font-weight: 500;
						display: inline-block;
						font-size: 16px;
					}
					.selective {
						color: #ff455d;
					}
					.navbar_item_on {
						color: #ff455d;
					}
				}
				.navbar_item:last-child {
					margin-right: 30px;
				}
				.navbar_slider {
					position: absolute;
					left: 0;
					bottom: -2px;
					width: 6px;
					height: 6px;
					border-radius: 50%;
					background-color: #ff455d;
					transition: all 0.1s;
				}
			}
			.content {
				margin-top: 10px;
				box-sizing: border-box;
				height: 100%;
				width: 100%;
				-webkit-overflow-scrolling: touch;
				.orderAll {
					.noOrder {
						width: 95px;
						height: 69px;
						background: url(#{$imgUrl}img_orderforgoods_none.png) no-repeat center center;
						background-size: cover;
						position: absolute;
						top: 110px;
						left: 133px;
					}
					.noOrderTitle {
						text-align: center;
						font-size: 16px;
						color: #9a9a9a;
					}
				}
				.orderStatus {
					position: absolute;
					right: 15px;
					top: 10px;
					z-index: 9;
				}
				.shopName {
					background: #fff;
					display: flex;
					height: 40px;
					.logo {
						width: 21px;
						height: 20px;
						margin: 10px 22px 0 15px;
						// background: url("../../static/images/icon_default.png") no-repeat center
						//   center;
						// background-size: cover;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.name {
						line-height: 40px;
						font-size: 14px;
					}
				}
				.h40 {
					background-color: #fff;
				}
				.confirmWrap {
					.cancel {
						display: inline-block;
						width: 71px;
						height: 25px;
						border: 1px solid #09bb07;
						color: #09bb07;
						text-align: center;
						margin-right: 14px;
						line-height: 25px;
						vertical-align: middle;
						border-radius: 2px;
					}
					.confirm {
						display: inline-block;
						width: 71px;
						height: 25px;
						line-height: 25px;
						border: 1px solid #ff455d;
						text-align: center;
						vertical-align: middle;
						border-radius: 2px;
					}
				}
			}
		}
	}
</style>