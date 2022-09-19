<template>
	<view class="content">
		<image src="../../static/strategy/wait.png"></image>
		<view class="title">攻略正在审核中</view>
		<view class="info">预计2小时内审核完成，请您耐心等待</view>
		<view class="back" @click="backTap"><text>返回攻略</text>
			<u-icon name="arrow-right" color="#08B761" size="12"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
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
