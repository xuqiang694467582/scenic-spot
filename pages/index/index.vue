<template>
	<view>
		<!-- 顶部底色 -->
		<view class="back"></view>
		<!-- 主体结构 -->
		<view>
			<!-- 导航栏 -->
			<uni-nav-bar :statusBar="true" :border="false" leftWidth="530rpx" backgroundColor="transparent">
				<view slot="left">
					<view class="top-content">
						<u-search v-model="keyword" :showAction="false" placeholder="搜索美食/住宿/商品"></u-search>
						<view class="top-content-icon">
							<image src="@/static/index/cust.png"></image>
							<!-- <u-icon name="../../static/index/cust.png" color="#fff" size="32"></u-icon> -->
						</view>
					</view>
				</view>
			</uni-nav-bar>
			<!-- 滚动通知 -->
			<!-- <view class="notice">
				<u-notice-bar bgColor="transparent" color="#E4E4E4" :text="text"></u-notice-bar>
			</view> -->
			<!-- 轮播图 -->
			<view class="swiperBanner">
				<u-swiper :list="list" bgColor="transparent" radius="12"></u-swiper>
			</view>
			<!-- 菜单 -->
			<view class="menu">
				<u-scroll-list :indicator="false">
					<view class="scroll-list">
						<view class="scroll-list__line" v-for="(item, index) in menuArr" :key="index">
							<view class="scroll-list__line__item" v-for="(item1, index1) in item" :key="index1"
								:class="[(index1 === item.length - 1) && 'scroll-list__line__item--no-margin-right']"
								@click="getJump(index1)">
								<image class="scroll-list__line__item__image" :src="item1.icon" mode=""></image>
								<text class="scroll-list__line__item__text">{{ item1.name }}</text>
							</view>
						</view>
					</view>
				</u-scroll-list>
			</view>
			<!-- 园区特产 -->
			<view class="specialty">
				<view class="specialty-title">园区特产</view>
				<u-scroll-list indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c">
					<view class="specialty-list">
						<view class="specialty-list-con" v-for="item in 6">
							<image src="../../static/logo.png"></image>
							<view class="specialty-list-con-text">园区自培农户有机土鸡蛋</view>
							<view class="specialty-list-con-price">
								<text style="color: #333;font-size: 30rpx;">￥30.6</text>
								<text style="color: #999;font-size: 26rpx;">￥49</text>
							</view>
						</view>
					</view>
				</u-scroll-list>
			</view>
			<!-- tab -->
			<view class="tab">
				<u-tabs :list="Tablist" activeStyle="{ color: '#0CB662' }" lineColor="#0CB662" :scrollable="false">
				</u-tabs>
			</view>
			<!-- 特色餐饮 -->
			<view class="food">
				<view style="display: flex;justify-content: space-between;">
					<view class="food-title">特色餐厅</view>
					<view style="color: #999;font-size: 26rpx;" @click="toProductList">更多></view>
				</view>
				<view class="food-block">
					<view class="food-block-l" v-for="(item,index) in diningRoomList" :key="index">
						<image :src="item.coverImg"></image>
						<view class="food-block-l-text">{{item.name}}</view>
						<!-- <u-icon name="home" :label="item.name"></u-icon> -->
						<!-- <view class="food-block-l-price">
							<text style="color: #333;font-size: 30rpx;color: #FF1616;font-weight: bold;">￥30.6</text>
							<u-icon name="thumb-up" label="63444"></u-icon>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 旅游住宿 -->
			<view class="food">
				<view style="display: flex;justify-content: space-between;">
					<view class="food-title">旅游住宿</view>
					<view style="color: #999;font-size: 26rpx;">更多></view>
				</view>
				<view class="food-block">
					<view class="food-block-l" v-for="(item,index) in hotelList" :key="index">
						<image :src="item.coverImg"></image>
						<view class="food-block-l-text">{{item.name}}</view>
						<!-- <u-icon name="home" label="七虹餐饮中心"></u-icon>
						<view class="food-block-l-price">
							<text style="color: #333;font-size: 30rpx;color: #FF1616;font-weight: bold;">￥30.6</text>
							<u-icon name="thumb-up" label="63444"></u-icon>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 休闲娱乐 -->
		<!-- 	<view class="food">
				<view style="display: flex;justify-content: space-between;">
					<view class="food-title">休闲娱乐</view>
					<view style="color: #999;font-size: 26rpx;">更多></view>
				</view>
				<view class="food-block">
					<view class="food-block-l" v-for="item in 4">
						<image src="../../static/logo.png"></image>
						<view class="food-block-l-text">农户养殖生态柴火鸡</view>
						<u-icon name="home" label="七虹餐饮中心"></u-icon>
						<view class="food-block-l-price">
							<text style="color: #333;font-size: 30rpx;color: #FF1616;font-weight: bold;">￥30.6</text>
							<u-icon name="thumb-up" label="63444"></u-icon>
						</view>
					</view>
				</view>
			</view> -->
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {getDiningRoom,getHotel} from '@/api/index.js'
	export default {
		data() {
			return {
				keyword: '',
				text: 'uView UI众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用',
				list: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				menuArr: [
					[{
							name: '园区导览',
							icon: '../../static/index/menu_1.png'
						},
						{
							name: '餐饮美食',
							icon: '../../static/index/menu_2.png'
						}, {
							name: '旅馆住宿',
							icon: '../../static/index/menu_3.png'
						}, {
							name: '园区特产',
							icon: '../../static/index/menu_4.png'
						}, {
							name: '休闲娱乐',
							icon: '../../static/index/menu_5.png'
						}
					],
				],
				Tablist: [{
						name: '特色餐厅',
					},
					{
						name: '旅游住宿',
					},
					// {
					// 	name: '休闲娱乐',
					// }
				],
				diningRoomList:[],
				hotelList:[]
			}
		},
		computed: mapState(['token','userInfo','location']),
		onLoad() {
			// 登录获取token
			uni.login({
				provider: 'weixin',
				success: async (loginRes) => {
					this.$store.dispatch('login', loginRes.code).then(() => {	
						this.getList()
					})
				}
			});
			this.barHightTop = uni.getSystemInfoSync().statusBarHeight + 45
			
		},
		onShow(){
		this.getLocation()	
		},
		methods: {
			...mapMutations(['SET_LOCATION']),
			getList(){
				const params={
					...this.location,
					page:1,
					pageSize:4
				}
				getDiningRoom(params).then(res=>{
					this.diningRoomList=res.data.records
				})
				getHotel(params).then(res=>{
					this.hotelList=res.data.records
				})
			},			
			getLocation() {
				const that = this
				uni.getLocation({
					success: res => {
						const data = {
							latitude: res.latitude,
							longitude: res.longitude
						}
						that.SET_LOCATION(data)
					},
					fail: e => {
						uni.getSetting({
							success: res => {
								if (typeof(res.authSetting['scope.userLocation']) != 'undefined' &&
									!res.authSetting['scope.userLocation']) {
									uni.showModal({
										title: '提示',
										content: '您拒绝了定位权限，将无法使用某些功能',
										success: res => {
											if (res.confirm) {
												wx.openSetting({
													success: res => {
														if (res
															.authSetting[
																'scope.userLocation'
															]) {
															// 授权成功，重新定位
															wx.getLocation({
																success: res => {
																	const
																		data = {
																			latitude: res
																				.latitude,
																			longitude: res
																				.longitude
																		}
																	that.SET_LOCATION(
																		data
																	)
																}
															});
															
														} else {
															// 没有允许定位权限
															wx.showToast({
																title: '您拒绝了定位权限，将无法使用某些功能',
																icon: 'none'
															});
														}
													}
												})
											}
										}
									})
								}
							}
						})
					}
				})
			},
			
			//校验手机号
			isGetTel(){
				console.log(this.userInfo)
				if (!this.userInfo.phone) {
					uni.showModal({
						title: '提示',
						content: '请授权手机号',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/getTel/getTel'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return false
				}
			},
			toProductList(){
				if(this.isGetTel()===false) return			
				uni.navigateTo({
					url:'/pages_minute/productList/productList'
				})
			},
			// 跳转页面
			getJump(index1) {
				if(this.isGetTel()===false) return		
				switch (index1) {
					case 0:
						uni.navigateTo({
							url: '/pages_minute/parktour/parktour'
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages_minute/specialty/specialty'
						})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
	}

	.back {
		width: 100%;
		height: 568rpx;
		background: linear-gradient(180deg, rgba(3, 184, 95, 1) 75%, rgba(255, 255, 255, 1) 95%);
		position: absolute;
	}

	.top-content {
		display: flex;
		align-items: center;

		&-icon {
			margin-left: 20rpx;
			width: 56rpx;
			height: 56rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.notice {
		margin-top: 20rpx;
	}

	.swiperBanner {
		padding: 20rpx;
	}

	.menu {
		padding: 20rpx;
		background-color: #fff;

		.scroll-list {
			@include flex(column);

			&__goods-item {
				margin-right: 20px;

				&__image {
					width: 60px;
					height: 60px;
					border-radius: 4px;
				}

				&__text {
					color: #f56c6c;
					text-align: center;
					font-size: 12px;
					margin-top: 5px;
				}
			}

			&__show-more {
				background-color: #fff0f0;
				border-radius: 3px;
				padding: 3px 6px;
				@include flex(column);
				align-items: center;

				&__text {
					font-size: 12px;
					width: 12px;
					color: #f56c6c;
					line-height: 16px;
				}
			}

			&__line {
				@include flex;
				margin-top: 10px;

				&__item {
					margin-right: 15px;

					&__image {
						width: 48px;
						height: 48px;
					}

					&__text {
						margin-top: 5px;
						color: $u-menuText-color;
						font-size: 12px;
						text-align: center;
					}

					&--no-margin-right {
						margin-right: 0;
					}
				}
			}
		}
	}

	.specialty {
		padding: 20rpx;
		background-color: #fff;
		border-radius: 0 0 20rpx 20rpx;

		&-title {
			padding-left: 10rpx;
			border-left: 6rpx solid #03B85F;
			margin-bottom: 20rpx;
		}

		.specialty-list {
			display: flex;
		}

		.specialty-list-con {
			width: 180rpx;
			margin-right: 20rpx;

			image {
				width: 180rpx;
				height: 180rpx;
			}

			.specialty-list-con-text {
				font-size: 24rpx;
				font-weight: 600;
			}

			.specialty-list-con-price {
				width: 90%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 10rpx 0px;
			}
		}
	}

	.tab {
		padding: 20rpx;
		background-color: #fff;
		margin: 20rpx 0;
		border-radius: 20rpx;
	}

	.food {
		margin-bottom: 20rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;

		&-title {
			padding-left: 10rpx;
			border-left: 6rpx solid #03B85F;
			margin-bottom: 20rpx;
		}

		&-block {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			&-l {
				width: 48%;

				image {
					width: 100%;
					height: 270rpx;
				}

				&-price {
					width: 90%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 10rpx 0px;
				}
			}
		}
	}
</style>
