<template>
	<view class="container">
		<!-- 顶部底色 -->
		<view class="back"></view>
		<!-- 主体结构 -->
		<view>
			<!-- 导航栏 -->
			<uni-nav-bar :statusBar="true" :border="false" leftWidth="530rpx" backgroundColor="transparent">
				<view slot="left">
					<view class="scenicBox" @click="toSelectScenic">
						<image src="../../static/addressB.png" class="address"></image>
						<view class="scenicName">{{scenicData.name}}</view>
						<image src="../../static/jtX.png" class="jtImg"></image>
					</view>
				</view>
			</uni-nav-bar>
			<!-- <uni-nav-bar :statusBar="true" :border="false" leftWidth="530rpx" backgroundColor="transparent">
				<view slot="left">
					<view class="top-content">
						<u-search v-model="keyword" :showAction="false" placeholder="搜索商家名称" @search="searchTap">
						</u-search>
						<button open-type='contact' class="kfBox">
							<view class="top-content-icon">
								<image src="@/static/index/cust.png"></image>
							</view>
						</button>
					</view>
				</view>
			</uni-nav-bar> -->
			<view class="top-content">
				<u-search v-model="keyword" :showAction="false" placeholder="搜索商家名称" height="30" @search="searchTap"
					bgColor="#ffffff">
				</u-search>
				<button open-type='contact' class="kfBox">
					<view class="top-content-icon">
						<image src="@/static/index/cust.png"></image>
					</view>
				</button>
			</view>
			<!-- 滚动通知 -->
			<view class="notice">
				<u-notice-bar bgColor="transparent" color="#E4E4E4" :text="text"></u-notice-bar>
			</view>
			<!-- 轮播图 -->
			<view class="swiperBanner">
				<u-swiper :list="bannerList" bgColor="transparent" radius="12" height="150" keyName="img"
					@click="toBannerDetail"></u-swiper>
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
			<!-- 网红景点 -->
			<view class="cele" v-if="celebrity.length !== 0">
				<view style="display: flex;justify-content: space-between;">
					<view class="food-title">
						<view class="titleSu"></view>景点网红打卡榜
					</view>
					<!-- <view style="color: #999;font-size: 26rpx;display: flex;align-items: center;" @click="toProductList(0)">查看榜单<u-icon name="arrow-right" size="12"></u-icon></view> -->
				</view>
				<view class="cele-c">
					<view v-if="celebrity[0]" class="cele-c-l" @click="gotoCele(0)">
						<image :src="celebrity && celebrity[0].coverImg"></image>
						<view class="cele-c-tag">TOP1</view>
						<view class="cele-c-text">
							<view class="cele-c-text-t">
								<view class="cele-c-text-t-l">{{ celebrity && celebrity[0].name }}</view>
								<image src="../../static/index/right.png"></image>
							</view>
							<!-- <view class="cele-c-text-b">13698人打卡</view> -->
						</view>
					</view>
					<view class="cele-c-r">
						<view v-if="celebrity[1]" class="cele-c-r-t" @click="gotoCele(1)">
							<image class="cele-c-r-t-image"
								:src="celebrity && celebrity[1].coverImg"></image>
							<view class="cele-c-tag">TOP2</view>
							<view class="cele-c-text">
								<view class="cele-c-text-t">
									<view class="cele-c-text-t-l">{{ celebrity && celebrity[1].name }}</view>
									<image src="../../static/index/right.png"></image>
								</view>
								<!-- <view class="cele-c-text-b">11543人打卡</view> -->
							</view>
						</view>
						<view v-if="celebrity[2]" class="cele-c-r-t" @click="gotoCele(2)">
							<image class="cele-c-r-t-image"
								:src="celebrity && celebrity[2].coverImg"></image>
							<view class="cele-c-tag">TOP3</view>
							<view class="cele-c-text">
								<view class="cele-c-text-t">
									<view class="cele-c-text-t-l">{{ celebrity && celebrity[2].name }}</view>
									<image src="../../static/index/right.png"></image>
								</view>
								<!-- <view class="cele-c-text-b">10146人打卡</view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 园区特产 -->
			<view class="specialty">
				<view class="specialty-title">
					<view class="titleSu"></view>园区特产
				</view>
				<u-scroll-list indicatorActiveColor="#A8A1A1" indicatorColor="#ABABAB">
					<view class="specialty-list">
						<view class="specialty-list-con" v-for="(item,index) in specialtyList" :key="index"
							@click="tospecialty(item.id)">
							<image :src="item.mainImage"></image>
							<view class="specialty-list-con-text">{{item.name}}</view>
							<view class="specialty-list-con-price">
								<text style="color: #333;font-size: 30rpx;">￥{{item.price}}</text>
								<text
									style="color: #999;font-size: 26rpx;text-decoration: line-through;">￥{{item.originalPrice}}</text>
							</view>
						</view>
					</view>
				</u-scroll-list>
			</view>
			<!-- tab -->
			<view class="tab">
				<u-tabs :list="Tablist" @click="changeType" activeStyle="{ color: '#0CB662' }" lineColor="#0CB662"
					:scrollable="false">
				</u-tabs>
			</view>
			<!-- 特色餐饮 -->
			<view class="food" id="foodBox">
				<view style="display: flex;justify-content: space-between;">
					<view class="food-title">
						<view class="titleSu"></view>特色餐厅
					</view>
					<view style="color: #999;font-size: 26rpx;display: flex;align-items: center;"
						@click="toProductList(0)">更多<u-icon name="arrow-right" size="12"></u-icon>
					</view>
				</view>
				<view class="food-block">
					<view class="food-block-l" v-for="(item,index) in diningRoomList" :key="index"
						@click="toFood(item.id)">
						<image :src="item.coverImg"></image>
						<view class="shopName">{{item.name}}</view>
						<!-- <u-icon name="home" :label="item.name"></u-icon> -->
						<!-- <view class="food-block-l-price">
							<text style="color: #333;font-size: 30rpx;color: #FF1616;font-weight: bold;">￥30.6</text>
							<u-icon name="thumb-up" label="63444"></u-icon>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 旅游住宿 -->
			<view class="food" id="hotelBox">
				<view style="display: flex;justify-content: space-between;">
					<view class="food-title">
						<view class="titleSu"></view>旅游住宿
					</view>
					<view style="color: #999;font-size: 26rpx;display: flex;align-items: center;"
						@click="toProductList(1)">更多<u-icon name="arrow-right" size="12"></u-icon>
					</view>
				</view>
				<view class="food-block">
					<view class="food-block-l" v-for="(item,index) in hotelList" :key="index" @click="toHotel(item.id)">
						<image :src="item.coverImg"></image>
						<view class="shopName">{{item.name}}</view>
						<!-- <u-icon name="home" label="七虹餐饮中心"></u-icon>
						<view class="food-block-l-price">
							<text style="color: #333;font-size: 30rpx;color: #FF1616;font-weight: bold;">￥30.6</text>
							<u-icon name="thumb-up" label="63444"></u-icon>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 休闲娱乐 -->
			<view class="food" id="amusementBox">
				<view style="display: flex;justify-content: space-between;">
					<view class="food-title">
						<view class="titleSu"></view>休闲娱乐
					</view>
					<view style="color: #999;font-size: 26rpx;display: flex;align-items: center;"
						@click="toProductList(2)">更多<u-icon name="arrow-right" size="12"></u-icon>
					</view>
				</view>
				<view class="food-block">
					<view class="food-block-l" v-for="(item,index) in amusementList" :key="index"
						@click="toAmusementDetail(item.id)">
						<image :src="item.coverImg"></image>
						<view class="shopName">{{item.name}}</view>
						<!-- <u-icon name="home" label="七虹餐饮中心"></u-icon> -->
						<!-- <view class="food-block-l-price">
							<text style="color: #333;font-size: 30rpx;color: #FF1616;font-weight: bold;">￥30.6</text>
							<u-icon name="thumb-up" label="63444"></u-icon>
						</view> -->
					</view>
				</view>
			</view>
			<view class="strategyBox" id="strategy">
				<view class="sTitle">
					<view class="title">
						<view></view>
						景区攻略
					</view>
					<view class="more" @click="strategyMoreTap">
						<text>更多</text>
						<u-icon name="arrow-right" size="12"></u-icon>
					</view>
				</view>
				<view class="strategyList" v-for="(item,index) in strategyList" :key="index" @click="toStrategyDetail(item.id)">
					<view class="sName">{{item.title}}</view>
					<view class="sContent">{{item.context}}</view>
					<view class="sImgBox">
						<image :src="items" v-for="(items,indexs) in item.introductionImg" :key="index" v-show="indexs<4">
						</image>
						<view class="imgNum" v-show="item.introductionImg.length>4">{{item.introductionImg.length}}图</view>
					</view>
					<view class="botBox">
						<view class="userBox">
							<image :src="item.wechatUserAvatar"></image>
							<view class="userName">{{item.wechatUserName}}</view>
							<view class="time">{{item.createTimeStr}}</view>
						</view>
						<view class="operate">
							<!-- <view class="operateBox">
								<image src="../../static/strategy/zan.png"></image>25.6w
							</view> -->
							<view class="operateBox">
								<image src="../../static/strategy/comment.png"></image>{{item.commentReplyCount}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		getDiningRoom,
		getHotel,
		getAmusement,
		getBanner,
		getAnnouncementList,
		getCeleList
	} from '@/api/index.js'
	import {
		getSpecialtyGood
	} from '@/api/specialty.js'
	import {
		soptList
	} from '@/api/parktour.js'
	import {
		getRaider
	} from '@/api/strategy.js'
	export default {
		data() {
			return {
				keyword: '',
				text: [],
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
					{
						name: '休闲娱乐',
					},
					{
						name: '景区攻略',
					}
				],
				diningRoomList: [],
				hotelList: [],
				amusementList: [],
				specialtyList: [],
				bannerList: [],
				celebrity: [],
				strategyList: []
			}
		},
		computed: mapState(['token', 'userInfo', 'location', 'scenicData']),
		onLoad() {
			// 登录获取token
			uni.login({
				provider: 'weixin',
				success: async (loginRes) => {
					this.$store.dispatch('login', loginRes.code).then(() => {
						this.getSoptList()
					})
				}
			});
			this.barHightTop = uni.getSystemInfoSync().statusBarHeight + 45;
		},
		onShow() {
			this.keyword = ''
			this.getLocation()
			this.getSoptList()
		},
		methods: {
			...mapMutations(['SET_LOCATION', 'SET_SCENICDATA']),
			strategyMoreTap(){
				uni.switchTab({
					url:'/pages/strategy/strategy'
				})
			},
			toStrategyDetail(id) {
				if (!this.userInfo.nickname) {
					uni.showModal({
						title: '提示',
						content: '请授权用户信息',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url:'/pages/my/my'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return 
				}
				uni.navigateTo({
					url: `/pages_minute/strategyDetail/strategyDetail?id=${id}`
				})
			},
			async getStrategyList() {
				const {
					data
				} = await getRaider({
					page: 1,
					pageSize: 2,
					attractionId: this.scenicData.id
				})
				this.strategyList = data.records
			},
			// 选择景区
			toSelectScenic() {
				uni.navigateTo({
					url: '/pages_minute/selectScenic/selectScenic'
				})
			},
			// 景区列表
			async getSoptList() {
				const {
					data
				} = await soptList()
				if (this.scenicData === '') {
					this.SET_SCENICDATA(data.records[0])
				}
				this.getList()
				this.getBannerList()
				this.getNoticebar()
				this.getCelebrity()
				if(this.token){
					this.getStrategyList()
				}
			
			},
			toHotel(id) {
				if (this.isGetTel() === false) return
				uni.navigateTo({
					url: `/pages_minute/hotelDetail/hotelDetail?id=${id}`
				})
			},
			toFood(id) {
				if (this.isGetTel() === false) return
				uni.navigateTo({
					url: `/pages_minute/diningDetail/diningDetail?id=${id}`
				})
			},
			toBannerDetail(e) {
				uni.navigateTo({
					url: `/pages_minute/bannerDetail/bannerDetail?id=${this.bannerList[e].id}`
				})
			},
			// 获取banner
			async getBannerList() {
				const {
					data
				} = await getBanner({
					attractionId: this.scenicData.id
				})
				this.bannerList = data
			},
			// 获取公告
			async getNoticebar() {
				const {
					data
				} = await getAnnouncementList({
					attractionId: this.scenicData.id
				})
				let newList = [];
				data.map((val) => {
					newList.push(val.context)
				})
				this.text = newList;
			},
			// 获取网红景点
			async getCelebrity() {
				const {
					data
				} = await getCeleList({
					attractionId: this.scenicData.id,
				})
				this.celebrity = data.slice(0, 3)
			},
			// 查看景点
			gotoCele(index) {
				uni.navigateTo({
					url: `/pages_minute/parktourDetail/parktourDetail?id=${this.celebrity[index].id}`
				})
			},
			// 搜索
			searchTap() {
				if (this.isGetTel() === false) return
				uni.navigateTo({
					url: `/pages_minute/productList/productList?keyword=${this.keyword}`
				})
			},
			// 切换商品类型
			changeType(e) {
				let id = ''
				if (e.index === 0) {
					id = '#foodBox'
				} else if (e.index === 1) {
					id = '#hotelBox'
				} else if (e.index === 2) {
					id = '#amusementBox'
				}else if(e.index === 3){
					id = '#strategy'
				}
				uni.createSelectorQuery()
					.select(".container") //对应外层节点
					.boundingClientRect((container) => {
						uni.createSelectorQuery()
							.select(id) //目标节点
							.boundingClientRect((target) => {
								uni.pageScrollTo({
									scrollTop: target.top - container.top,
								});
							})
							.exec();
					})
					.exec();

			},
			getList() {
				const params = {
					// ...this.location,
					page: 1,
					pageSize: 4,
					attractionId: this.scenicData.id
				}
				getDiningRoom(params).then(res => {
					this.diningRoomList = res.data.records
				})
				getHotel(params).then(res => {
					this.hotelList = res.data.records
				})
				getAmusement(params).then(res => {
					this.amusementList = res.data.records
				})
				getSpecialtyGood({
					...params,
					pageSize: 8
				}).then(res => {
					this.specialtyList = res.data.records
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
			isGetTel() {
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
			// 商品列表
			toProductList(type) {
				if (this.isGetTel() === false) return
				uni.navigateTo({
					url: `/pages_minute/productList/productList?type=${type}`
				})
			},
			// 特产详情
			tospecialty(id) {
				if (this.isGetTel() === false) return
				uni.navigateTo({
					url: `/pages_minute/specialtyDetail/specialtyDetail?id=${id}`
				})
			},
			// 娱乐详情
			toAmusementDetail(id) {
				if (this.isGetTel() === false) return
				uni.navigateTo({
					url: `/pages_minute/entertainmentDetail/entertainmentDetail?id=${id}`
				})
			},
			// 跳转页面
			getJump(index1) {
				if (this.isGetTel() === false) return
				switch (index1) {
					case 0:
						uni.navigateTo({
							url: '/pages_minute/parktour/parktour'
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/pages_minute/productList/productList?type=0'
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/pages_minute/productList/productList?type=1'
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages_minute/specialty/specialty'
						})
						break;
					case 4:
						uni.navigateTo({
							url: '/pages_minute/productList/productList?type=2'
						})
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.strategyBox {
		width: 100%;
		background: #fff;
		border-radius: 24rpx;
		padding: 32rpx 24rpx;
		box-sizing: border-box;

		.strategyList {
			margin-top: 24rpx;
			padding-bottom: 24rpx;
			border-bottom: 1px solid #F4F4F4;

			.botBox {
				display: flex;
				align-items: center;
				margin-top: 30rpx;
				justify-content: space-between;

				.operate {
					display: flex;
					align-items: center;
					font-weight: 400;
					color: #999999;
					font-size: 28rpx;

					.operateBox {
						display: flex;
						align-items: center;
						margin-left: 32rpx;
					}

					image {
						width: 36rpx;
						height: 36rpx;
						margin-right: 8rpx;
					}
				}

				.userBox {
					display: flex;
					align-items: center;

					.time {
						font-weight: 400;
						color: #999999;
						font-size: 26rpx;
						margin-left: 16rpx;
					}

					.userName {
						font-weight: 500;
						color: #333333;
						font-size: 26rpx;
						margin-left: 12rpx;
						max-width: 200rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp:1;
						-webkit-box-orient: vertical;
					}

					image {
						width: 38rpx;
						height: 38rpx;
						border-radius: 50%;
					}
				}
			}

			.sImgBox {
				display: flex;
				margin-top: 24rpx;
				position: relative;

				image {
					width: 164rpx;
					height: 164rpx;
					border-radius: 12rpx;
					margin-right: 20rpx;
				}

				.imgNum {
					width: 48rpx;
					height: 38rpx;
					background: rgba(0, 0, 0, 0.6);
					border-radius: 8rpx;
					font-weight: 400;
					color: #FFFFFF;
					font-size: 24rpx;
					right: 8rpx;
					bottom: 8rpx;
					position: absolute;
					text-align: center;
					line-height: 38rpx;
				}
			}

			.sContent {
				margin-top: 16rpx;
				font-weight: 400;
				color: #333333;
				font-size: 26rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.sName {
				font-weight: 500;
				color: #333333;
				font-size: 32rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
		}

		.sTitle {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 16rpx;

			.more {
				font-weight: 400;
				color: #999999;
				font-size: 26rpx;
				display: flex;
				align-items: center;

				text {
					margin-right: 10rpx;
				}
			}

			.title {
				display: flex;
				align-items: center;
				font-weight: 500;
				color: #333333;
				font-size: 32rpx;

				view {
					width: 6rpx;
					height: 30rpx;
					background: linear-gradient(180deg, #BDE1CF 0%, #03B85F 100%);
					margin-right: 12rpx;
				}
			}
		}
	}

	.scenicBox {
		display: flex;
		align-items: center;
		box-sizing: border-box;

		.address {
			width: 28rpx;
			height: 28rpx;
		}

		.scenicName {
			font-weight: 500;
			color: #FFFFFF;
			font-size: 32rpx;
			margin-left: 8rpx;
			max-width: 400rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}

		.jtImg {
			width: 16rpx;
			height: 16rpx;
			margin-left: 16rpx;
		}
	}

	page {
		background-color: #f4f4f4;
	}

	.shopName {
		font-weight: 500;
		color: #333333;
		margin-top: 14rpx;
		font-size: 32rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.titleSu {
		width: 6rpx;
		height: 30rpx;
		background: linear-gradient(180deg, #BDE1CF 0%, #03B85F 100%);
		margin-right: 12rpx;
	}

	.kfBox {
		margin: 0;
		padding: 0;
		background-color: inherit;
		position: static;
		height: 60rpx;
	}

	.kfBox:after {
		content: none;
	}

	/* 去掉边框 */
	.kfBox::after {
		border: none;
	}

	.back {
		width: 100%;
		height: 672rpx;
		background: linear-gradient(180deg, rgba(3, 184, 95, 1) 75%, rgba(255, 255, 255, 1) 95%);
		position: absolute;
	}

	.top-content {
		display: flex;
		align-items: center;
		position: relative;
		z-index: 111;
		padding: 0 22rpx;
		box-sizing: border-box;
		margin-top: 16rpx;

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
		padding: 0 20rpx;
		box-sizing: border-box;
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
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					&__image {
						width: 76rpx;
						height: 76rpx;
					}

					&__text {
						margin-top: 12rpx;
						color: #333;
						font-size: 28rpx;
						text-align: center;
					}

					&--no-margin-right {
						margin-right: 0;
					}
				}
			}
		}
	}

	.cele {
		padding: 20rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 0 0 20rpx 20rpx;

		&-c {
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-l {
				width: 48%;
				height: 380rpx;
				position: relative;

				image {
					width: 100%;
					height: 100%;
					border-radius: 24rpx;
				}
			}

			&-tag {
				width: 110rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 30rpx;
				background: linear-gradient(180deg, #A1D8BC 0%, #0DB964 100%);
				position: absolute;
				top: 0;
				border-radius: 24rpx 0 30rpx 0;
			}

			&-text {
				position: absolute;
				bottom: 25rpx;
				left: 25rpx;
				right: 0;

				&-t {
					display: flex;
					align-items: center;

					&-l {
						max-width: 80%;
						font-size: 30rpx;
						color: #fff;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					image {
						width: 28rpx;
						height: 28rpx;
						margin-left: 10rpx;
					}
				}

				&-b {
					color: #C0C0C0;
					font-size: 24rpx;
				}
			}

			&-r {
				width: 48%;
				height: 380rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				&-t {
					width: 100%;
					height: 180rpx;
					position: relative;

					&-image {
						width: 100%;
						height: 100%;
						border-radius: 24rpx;
					}
				}
			}
		}
	}

	.specialty {
		padding: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;

		&-title {
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			font-weight: 500;
			color: #333333;
			font-size: 32rpx;
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
				border-radius: 12rpx;
			}

			.specialty-list-con-text {
				font-size: 24rpx;
				font-weight: 600;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				height: 68rpx;
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
			display: flex;
			align-items: center;
			font-weight: 500;
			color: #333333;
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}

		&-block {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			&-l {
				width: 48%;
				margin-bottom: 32rpx;

				image {
					width: 100%;
					height: 254rpx;
					border-radius: 24rpx;
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
