<template>
	<view class="content">
		<image src="../../static/strategy/fail.png"></image>
		<view class="title">攻略审核未通过</view>
		<view class="info">{{orderData.opinion}}</view>
		<view class="back" @click="backTap"><text>返回我的攻略</text>
			<u-icon name="arrow-right" color="#08B761" size="12"></u-icon>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: mapState(['orderData']),
		methods: {
			backTap(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		align-items: center;
		flex-direction: column;

		.back {
			margin-top: 80rpx;
			font-weight: 400;
			color: #08B761;
			font-size: 30rpx;
			display: flex;
			align-items: center;

			text {
				margin-right: 12rpx;
				top: -5rpx;
				position: relative;
			}
		}

		.info {
			font-weight: 400;
			color: #999999;
			font-size: 32rpx;
			margin-top: 52rpx;
		}

		.title {
			font-weight: 500;
			color: #333333;
			margin-top: 50rpx;
			font-size: 40rpx;
		}

		image {
			width: 180rpx;
			height: 180rpx;
			margin-top: 190rpx;
		}

	}
</style>
