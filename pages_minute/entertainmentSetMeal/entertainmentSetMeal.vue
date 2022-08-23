<template>
	<view class="content">
		<u-swiper :list="bannerList" @change="change" @click="click" radius="12" height="197" :autoplay="false">
		</u-swiper>
		<view class="mouduleBox">
			<view class="name">【双人】全天全场通玩</view>
			<view class="infoBox">
				<view>
					<text class="unit">￥</text>
					<text class="price">298</text>
					<tetx class="oldPrice">￥289</tetx>
					<text class="iInfo">免预约</text>
					<text class="iInfo" style="margin-left: 20rpx;">半年消费550</text>
				</view>
				<view class="reserve" @click="toPlaceOrder">预订</view>
			</view>
			<view class="tipBox">
				<text class="tTitle">提示</text>
				<text>周一至周五10:00-22:00 周六周日10:00-23:00</text>
			</view>
			<view class="tipBox">
				<text class="tTitle">保障</text>
				<text>可退款·过期自动退款</text>
			</view>
		</view>
		<view class="mouduleBox">
			<view class="name">规则介绍</view>
			<view class="ruleBox">
				卡座区域不可以吸烟哦，吸烟请到吸烟区。
				工作日畅玩套餐使用时间:周一至周五10:00-22:00期间连
				续畅玩5小时。
				若游玩时长超出5小时且未超出门店正常打烊时间的,按照
				本套餐价格20元/小时计时收费。超出门门店打烊时间的，
				按门店价35元/小时收费。
			</view>
		</view>
		
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				]
			}
		},
		methods: {
			toPlaceOrder(){
				uni.navigateTo({
					url:'/pages_minute/entertainmentPlaceOrder/entertainmentPlaceOrder'
				})
			}
		}
	}
</script>

<style lang="scss">
	.mouduleBox {
		width: 100%;
		border-radius: 24rpx;
		background: #FFFFFF;
		margin-bottom: 20rpx;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		.ruleBox{
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
