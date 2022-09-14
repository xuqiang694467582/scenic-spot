<template>
	<view class="content">
		<view class="listBox" v-for="(item,index) in 10" :key="index">
			<image src="../../static/index/menu_4.png"></image>
			<view>
				<view class="shopName">园区一号农产品商店</view>
				<view class="collectNum">已有2.5w人收藏店铺</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.content {
		padding: 0 24rpx;
		box-sizing: border-box;
	
	.listBox {
			margin-top: 20rpx;
			background: #fff;
			padding: 30rpx 24rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			border-radius: 24rpx;
			.collectNum {
				font-weight: 400;
				color: #999999;
				font-size: 26rpx;
				margin-top: 24rpx;
			}

			.shopName {
				font-weight: 500;
				color: #333333;
				font-size: 30rpx;
			}

			image {
				width: 116rpx;
				height: 116rpx;
				border-radius: 12rpx;
				margin-right: 28rpx;
			}
		}
	}
</style>
