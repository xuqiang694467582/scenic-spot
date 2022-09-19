<template>
	<view class="content">
		<u-swiper :list="[detail.mainImage]" @change="change" @click="click" radius="12" height="197" :autoplay="false">
		</u-swiper>
		<view class="mouduleBox">
			<view class="name">{{detail.name}}</view>
			<view class="infoBox">
				<view>
					<text class="unit">￥</text>
					<text class="price">{{detail.price}}</text>
					<tetx class="oldPrice">￥{{detail.originalPrice}}</tetx>
					<text class="iInfo">免预约</text>
					<!-- <text class="iInfo" style="margin-left: 20rpx;">半年消费550</text> -->
				</view>
				<view class="reserve" @click="toPlaceOrder">预订</view>
			</view>
			<view class="tipBox">
				<text class="tTitle">提示</text>
				<text>{{shopData.alternate.openingHours}}</text>
			</view>
			<view class="tipBox">
				<text class="tTitle">保障</text>
				<text>可退款</text>
			</view>
		</view>
		<view class="mouduleBox">
			<view class="name">规则介绍</view>
			<view class="ruleBox">
				{{detail.introduce}}
			</view>
		</view>
		<view class="mouduleBox">
			<view class="name">可用商户</view>
			<view class="shopBox" @click="toShop">
				<image :src="shopData.coverImg" class="shopImg"></image>
				<view class="shopR">
					<view class="shopName">{{shopData.name}}</view>
					<view class="fraction">{{shopData.score}}分</view>
					<view class="time">开放时间：{{shopData.alternate.openingHours}}</view>
				</view>
			</view>
			<view class="name">本店套餐</view>
			<view class="productBox">
				<view class="product" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
					<image :src="item.mainImage"></image>
					<view class="pName">{{item.name}}</view>
					<view class="pPrice">
						<text class="unit">￥</text>
						<text class="price">{{item.price}}</text>
						<text class="oldPrice">￥{{item.originalPrice}}</text>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import {
		getAmusementPackageDetail,
		getAmusementDetail,
		getAmusementPackage
	} from '@/api/index.js'
	export default {
		data() {
			return {
				id: '',
				detail: '',
				shopData: '',
				list: []
			}
		},
		onLoad(options) {
			this.id = options.id
			this.list = []
			this.getDetail()
		},
		methods: {
			toShop(){
				uni.redirectTo({
					url:`/pages_minute/entertainmentDetail/entertainmentDetail?id=${this.detail.amusementId}`
				})
			},
			toDetail(id){
				uni.redirectTo({
					url:`/pages_minute/entertainmentSetMeal/entertainmentSetMeal?id=${id}`
				})
			},
			async getDetail() {
				const {
					data
				} = await getAmusementPackageDetail({
					id: this.id
				})
				this.detail = data
				this.getData()
			},
			getData() {
				getAmusementDetail({
					id: this.detail.amusementId
				}).then(res => {
					this.shopData = res.data
				})
				getAmusementPackage({
					page: 1,
					pageSize: 10,
					amusementId: this.detail.amusementId
				}).then(res => {
					this.list = res.data.records
				})
			},
			toPlaceOrder() {
				uni.navigateTo({
					url: `/pages_minute/entertainmentPlaceOrder/entertainmentPlaceOrder?id=${this.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.productBox {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 24rpx;

		.pPrice {
			margin-top: 24rpx;

			.unit {
				font-size: 24rpx;
				color: #333;
			}

			.oldPrice {
				font-weight: 400;
				color: #999999;
				font-size: 24rpx;
				text-decoration: line-through;
				margin-left: 14rpx;
			}

			.price {
				font-weight: bold;
				color: #333333;
				font-size: 34rpx;
			}
		}

		.product {
			width: 308rpx;
			margin-bottom: 40rpx;

			image {
				width: 308rpx;
				height: 236rpx;
				border-radius: 24rpx;
			}

			.pName {
				font-weight: 500;
				color: #333333;
				font-size: 30rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				margin-top: 20rpx;
			}
		}
	}

	.shopBox {
		display: flex;
		margin-top: 28rpx;
		padding-bottom: 28rpx;
		border-bottom: 1px solid #EBEBEB;
		display: flex;
		align-items: center;
		margin-bottom: 28rpx;

		.shopR {
			margin-left: 24rpx;
			display: flex;
			flex: 1;
			flex-direction: column;

			.time {
				font-weight: 400;
				color: #333333;
				font-size: 24rpx;
				margin-top: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}

			.shopName {
				font-weight: 500;
				color: #333333;
				font-size: 32rpx;
			}

			.fraction {
				margin-top: 16rpx;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 44rpx;
				font-size: 24rpx;
				width: 92rpx;
				height: 44rpx;
				background: linear-gradient(180deg, #F3982B 0%, #FF543E 100%);
				border-radius: 12rpx 0px 12rpx 0px;
			}
		}

		.shopImg {
			width: 160rpx;
			height: 160rpx;
			border-radius: 24rpx;
		}
	}

	.mouduleBox {
		width: 100%;
		border-radius: 24rpx;
		background: #FFFFFF;
		margin-bottom: 20rpx;
		padding: 24rpx 30rpx;
		box-sizing: border-box;

		.ruleBox {
			margin-top: 20rpx;
			font-weight: 400;
			color: #333333;
			line-height: 52rpx;
			font-size: 26rpx;
		}

		.tipBox {
			margin-top: 20rpx;
			font-weight: 400;
			color: #333333;
			font-size: 24rpx;

			.tTitle {
				font-weight: 500;
				color: #333333;
				margin-right: 28rpx
			}
		}

		.infoBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 20rpx;
			padding-bottom: 18rpx;
			border-bottom: 1px solid #EBEBEB;

			.reserve {
				width: 120rpx;
				height: 60rpx;
				background: linear-gradient(180deg, #9AD7B8 0%, #14BB69 100%);
				border-radius: 12rpx;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
				line-height: 60rpx;
				font-size: 28rpx;
			}

			.iInfo {
				font-weight: 400;
				color: #999999;
				font-size: 24rpx;

			}

			.oldPrice {
				margin-left: 20rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
				text-decoration: line-through;
				margin-right: 38rpx;
			}

			.price {
				font-size: 44rpx;
				color: #FE5A3D;
				font-weight: bold;
			}

			.unit {
				font-size: 28rpx;
				color: #FE5A3D;
				font-weight: bold;
			}
		}

		.name {
			font-weight: 500;
			color: #333333;
			font-size: 30rpx;
			margin-top: 6rpx;
		}
	}

	.content {
		padding: 38rpx 24rpx;
		box-sizing: border-box;
	}

	page {
		background: rgba(244, 244, 244, 1);
	}
</style>
