<template>
	<view class="pages">
		<view class="banner">
			<image src="../../static/back.png" :style="{top:barHightTop+'px'}" class="backImg" @click="backTap"></image>
			<image :src="formData.coverImg" class="bannerImg"></image>
		</view>
		<view class="content">
			<view class="content-title">
				<text>{{ formData.name }}</text>
				<view class="content-title-one">
					<view class="content-title-one-left">
						<view class="content-title-one-left-t">
							{{ formData.score }}分
						</view>
						<!-- <view class="content-title-one-left-l">
							108/人
						</view> -->
						<!-- <u-tag text="500+点评" bgColor="#08B761" borderColor="#08B761" ></u-tag> -->
					</view>
					<view>
						<image style="margin-right: 20rpx;" src="@/static/parktour/phone.png" @click="getPhone"></image>
						<image src="@/static/parktour/navigation.png" @click="getAss()"></image>
					</view>
					
				</view>
				<u-divider></u-divider>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view>
						<!-- <u-icon name="clock-fill" color="#08B761" :label="'开放时间：'+ formData.alternate.openingHours">
						</u-icon> -->
						<view class="shopDate">
							<image src="../../static/time.png"></image>
							<view>开放时间：{{formData.alternate.openingHours}}</view>
						</view>
						<view style="display: flex;flex-wrap: wrap;margin-top: 20rpx;">
							<view v-for="item in formData.label" style="margin-right: 10rpx;margin-bottom: 10rpx;">
								<u-tag size="mini" :text="item" bgColor="#EDF8EF" borderColor="#08B761" color="#08B761">
								</u-tag>
							</view>
						</view>
					</view>
					<!-- <u-icon name="arrow-right"></u-icon> -->
				</view>
			</view>
			<!-- tab -->
			<view class="tab">
				<u-tabs :list="Tablist" activeStyle="{ color: '#0CB662' }" lineColor="#0CB662" :scrollable="false"
					@click="changeType">
				</u-tabs>
			</view>
			<!-- 图片介绍 -->
			<view class="content-image" id="foodBox">
				<view class="text">图片介绍</view>
				<scroll-view class="imgBox" scroll-x="true">
					<image :src="item" v-for="(item,index) in formData.photoExplanation" :key="index"
						@click="preViewImg(index)"></image>
					<view class="imgNum" v-show="formData.photoExplanation.length>4">{{formData.photoExplanation.length}}图
					</view>
				</scroll-view>
			</view>
			<!-- 推荐套餐 -->
			<view class="content-combo" id="hotelBox">
				<view class="content-combo-title">
					<view>推荐套餐</view>
					<view style="color: #999;font-size: 26rpx;" @click="toProductList(0)">更多></view>
				</view>
				<view class="combo-list" v-for="(item, index) in recommend" :key="index">
					<view style="display: flex;align-items: center;" @click="gotoRese(item.id)">
						<image style="width: 152rpx;height: 152rpx;margin-right: 20rpx;" :src="item.mainImage"></image>
						<view>
							<text>{{ item.name }}</text>
							<view style="display: flex;flex-wrap: wrap;margin-top: 20rpx;">
								<view v-for="(item1,index1) in item.label" :key="index1"
									style="margin-right: 10rpx;margin-bottom: 10rpx;">
									<u-tag size="mini" :text="item1" bgColor="#EDF8EF" borderColor="#08B761" color="#08B761"></u-tag>
								</view>
							</view>
							<view style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
								<text
									style="font-size: 30rpx;color: #FF1616;font-weight: bold;">￥{{ item.price }}</text>
								<text style="font-size: 24rpx;color: #999;text-decoration: line-through;">￥{{ item.originalPrice }}</text>
							</view>
						</view>
					</view>
					<view class="combo-list-btn" @click="getReserve(item)">
						预定
					</view>
				</view>
			</view>
			<!-- 商家菜品 -->
			<view class="content-combo" id="dishes">
				<view class="content-combo-title">
					<view>商家菜品</view>
					<view style="color: #999;font-size: 26rpx;" @click="toProductList(1)">更多></view>
				</view>
				<view class="combo-list" v-for="(item, index) in dishesList" :key="index">
					<view style="display: flex;">
						<image style="width: 152rpx;height: 152rpx;margin-right: 20rpx;" :src="item.coverImg"></image>
						<view>
							<view style="font-size: 30rpx;font-weight: bold;color: #333;">{{ item.name }}</view>
							<view style="font-size: 24rpx;color: #666;margin: 15rpx 0;">{{ item.description }}</view>
							<view style="font-size: 34rpx;color: #FE5A3D;font-weight: bold;">￥{{ item.price }}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 附近玩乐 -->
			<NearbyPlay id="nearby" />
		</view>
	</view>
</template>

<script>
	import {
		diningDetail,
		diningRecoDetail,
		diningRoomDish
	} from '@/api/parktour.js';
	import NearbyPlay from '@/compontents/NearbyPlay.vue'
	export default {
		components: {
			NearbyPlay
		},
		data() {
			return {
				barHightTop: '',
				formData: {},
				recommend: [],
				dishesList: [],
				Tablist: [{
						name: '图片介绍',
					},
					{
						name: '推荐套餐',
					},
					{
						name: '餐厅菜品',
					},
					{
						name: '附近推荐',
					}
				]
			}
		},
		onLoad(option) {
			this.barHightTop = uni.getSystemInfoSync().statusBarHeight + 5
			this.load(option.id)
			this.roomDish(option.id)
		},
		methods: {
			async load(id) {
				try {
					const {
						data
					} = await diningDetail({
						id: id
					})
					this.formData = data;
					this.urls = data.photoExplanation;
					const res = await diningRecoDetail({
						diningRoomId: id
					})
					this.recommend = res.data;
				} catch (e) {}
			},
			// 获取商家菜品
			async roomDish(id) {
				const {
					data
				} = await diningRoomDish({
					diningRoomId: id
				});
				this.dishesList = data.records;
			},
			preViewImg(index) {
				uni.previewImage({
					current: index,
					urls: this.formData.photoExplanation
				})
			},
			backTap() {
				uni.navigateBack({
					delta: -1
				})
			},
			gotoRese(id) {
				uni.navigateTo({
					url: `/pages_minute/reserve/reserve?id=${id}`
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
					id = '#dishes'
				} else if (e.index === 3) {
					id = '#nearby'
				}
				uni.createSelectorQuery()
					.select(".pages") //对应外层节点
					.boundingClientRect((pages) => {
						uni.createSelectorQuery()
							.select(id) //目标节点
							.boundingClientRect((target) => {
								uni.pageScrollTo({
									scrollTop: target.top - pages.top,
								});
							})
							.exec();
					})
					.exec();
			},
			// 预订
			getReserve(val) {
				uni.navigateTo({
					url: `/pages_minute/submitorder/submitorder?id=${val.id}`
				})
			},
			//餐厅
			toProductList(type) {
				uni.navigateTo({
					url: `/pages_minute/diningDishes/diningDishes?id=${this.formData.id}&type=${type}`
				})
			},
			getAss(val) {
				uni.openLocation({
					latitude: this.formData.latitude * 1,
					longitude: this.formData.latitude * 1,
					name: this.formData.name,
					address: this.formData.address,
					success: function() {
						console.log('success');
					}
				});
			},
			// 打电话
			getPhone(){
				uni.makePhoneCall({
					phoneNumber: this.formData.tel
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
	}

	.banner {
		width: 100%;
		height: 448rpx;
		position: relative;

		.backImg {
			width: 60rpx;
			height: 60rpx;
			position: fixed;
			left: 28rpx;
			z-index: 11;
		}

		.bannerImg {
			width: 100%;
			height: 100%;
		}
	}
	
	.imgBox {
		width: 100%;
		display: flex;
		white-space: nowrap;
		position: relative;
	
		image {
			width: 212rpx;
			height: 170rpx;
			border-radius: 12rpx;
			margin-right: 8rpx;
			display: inline-block;
		}
	
		.imgNum {
			padding: 0 6rpx;
			height: 38rpx;
			background: rgba(0, 0, 0, 0.6);
			border-radius: 8rpx;
			position: absolute;
			right: 8rpx;
			bottom: 50rpx;
			z-index: 11;
			font-weight: 400;
			color: #FFFFFF;
			font-size: 24rpx;
		}
	}

	.content {
		padding: 0 24rpx;
		box-sizing: border-box;
		top: -54rpx;
		position: relative;

		.content-title {
			background-color: #fff;
			border-radius: 24rpx;
			padding: 20rpx;

			.content-title-one {
				margin: 30rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;

				&-left {
					display: flex;

					&-t {
						width: 92rpx;
						height: 44rpx;
						background: linear-gradient(180deg, #F3982B 0%, #FF543E 100%);
						border-radius: 12rpx 0px 12rpx 0px;
						font-size: 24rpx;
						font-weight: 500;
						color: #FFFFFF;
						text-align: center;
						line-height: 44rpx;
					}

					&-l {
						width: 100rpx;
						border-radius: 20rpx;
						background: #EDF8EF;
						display: flex;
						color: #333;
						font-size: 24rpx;
						align-items: center;
						justify-content: center;
						margin-right: 20rpx;
					}
				}

				image {
					width: 58rpx;
					height: 58rpx;
				}
			}
		}

		.shopDate {
			display: flex;
			font-weight: 500;
			color: #333333;
			font-size: 26rpx;

			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 14rpx;
				position: relative;
				top: 5rpx;
			}

			view {
				display: flex;
				flex: 1;
			}
		}

		.tab {
			padding: 20rpx;
			background-color: #fff;
			margin: 20rpx 0;
			border-radius: 20rpx;
		}

		.content-image {
			background-color: #fff;
			border-radius: 24rpx;
			padding: 20rpx;
			margin-top: 20rpx;

			.text {
				margin-bottom: 20rpx;
			}
		}

		.content-combo {
			background-color: #fff;
			border-radius: 24rpx;
			padding: 20rpx;
			margin: 20rpx 0;

			.text {
				margin-bottom: 20rpx;
			}

			&-title {
				display: flex;
				justify-content: space-between;
			}

			.combo-list {
				margin: 20rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;

				&-btn {
					width: 90rpx;
					height: 52rpx;
					background: linear-gradient(180deg, #9AD7B8 0%, #14BB69 100%);
					display: flex;
					color: #fff;
					align-items: center;
					justify-content: center;
					border-radius: 10rpx;
					padding: 10rpx;
				}
			}
		}
	}
</style>
