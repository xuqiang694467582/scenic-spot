<template>
	<view>
		<view class="banner">
			<image src="../../static/back.png" :style="{top:barHightTop+'px'}" class="backImg" @click="backTap"></image>
			<image src="../../static/index/menu_4.png" class="bannerImg"></image>
		</view>
		<view class="content">
			<view class="mouduleBox">
				<view class="name">新运动潮玩空间</view>
				<view class="shopInfo">
					<view class="fraction">4.8分</view>
					<image src="../../static/parktour/navigation.png" class="navigationIco"></image>
				</view>
				<view class="shopDate">
					<image src="../../static/time.png"></image>
					<view>开放时间：周一至周五10:00-22:00周一至周五10:00-22:00</view>
				</view>
				<view class="deviceBox">
					<view v-for="(item,index) in 5" :key="index">空调开放</view>
				</view>
			</view>
			<view class="mouduleBox">
				<view class="title">图片介绍</view>
				<scroll-view class="imgBox" scroll-x="true">
					<image src="../../static/index/menu_4.png" v-for="(item,index) in 5" :key="index"></image>
					<view class="imgNum">6图</view>
				</scroll-view>
			</view>
			<view class="mouduleBox">
				<view class="title">推荐套餐</view>
				<view class="setMeal" v-for="(item,index) in 5" :key="index" @click="toDetail">
					<image src="../../static/index/menu_4.png"></image>
					<view class="setMealR">
						<view class="sName">【双人】全天全场通玩</view>
						<view class="sInfo">免预约<text>半年消费550</text></view>
						<view class="priceBox">
							￥
							<text class="price">289</text>
							<text class="oldPrice">￥289</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barHightTop: ''
			}
		},
		onLoad() {
			this.barHightTop = uni.getSystemInfoSync().statusBarHeight + 5
		},
		methods: {
			toDetail() {
				uni.navigateTo({
					url: '/pages_minute/entertainmentSetMeal/entertainmentSetMeal'
				})
			},
			backTap() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.mouduleBox {
		width: 100%;
		border-radius: 24rpx;
		background: #fff;
		padding: 30rpx 32rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;

		.setMeal {
			display: flex;
			align-items: center;
			margin-bottom: 34rpx;

			.priceBox {
				font-size: 24rpx;
				font-weight: bold;
				color: #FE5A3D;
				margin-top: 20rpx;

				.price {

					font-size: 34rpx;
				}

				.oldPrice {
					font-size: 24rpx;
					font-weight: 400;
					color: #999999;
					text-decoration: line-through;
					margin-left: 14rpx;
				}
			}

			image {
				width: 152rpx;
				height: 152rpx;
				border-radius: 12rpx;
			}

			.setMealR {
				display: flex;
				flex: 1;
				flex-direction: column;
				margin-left: 24rpx;

				.sName {
					font-weight: 500;
					color: #333333;
					font-size: 30rpx;
				}

				.sInfo {
					margin-top: 14rpx;
					font-weight: 400;
					color: #666666;
					font-size: 24rpx;

					text {
						margin-left: 40rpx;
					}
				}
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

		.title {
			font-weight: 500;
			color: #333333;
			font-size: 30rpx;
			margin-bottom: 24rpx;
		}

		.deviceBox {
			display: flex;
			flex-wrap: wrap;

			view {
				height: 40rpx;
				background: #E1E1E1;
				border-radius: 8rpx 8rpx 0px 8rpx;
				line-height: 40rpx;
				padding: 0 8rpx;
				font-weight: 400;
				color: #666666;
				font-size: 20rpx;
				margin-right: 12rpx;
				margin-top: 22rpx;
			}
		}

		.shopDate {
			margin-top: 28rpx;
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

		.fraction {
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

		.navigationIco {
			width: 58rpx;
			height: 58rpx;
		}

		.name {
			font-weight: 500;
			color: #333333;
			font-size: 32rpx;
		}

		.shopInfo {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 28rpx;
			padding-bottom: 26rpx;
			border-bottom: 1px solid #EBEBEB;
		}
	}

	.content {
		padding: 0 24rpx;
		box-sizing: border-box;
		top: -54rpx;
		position: relative;
	}

	.banner {
		width: 100%;
		height: 448rpx;
		position: relative;

		.backImg {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			left: 28rpx;
			z-index: 11;
		}

		.bannerImg {
			width: 100%;
			height: 100%;
		}
	}


	page {
		background: rgba(244, 244, 244, 1);
	}
</style>
