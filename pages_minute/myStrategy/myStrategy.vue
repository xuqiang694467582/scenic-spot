<template>
	<view class="content">
		<view class="listBox" v-for="(item,index) in 4" :key="index" @click="toDetail">
			<view class="infoBox">
				<view class="title">旅游攻略丨景点打卡 3天2晚人均300攻略</view>
				<view class="info">宽窄巷子位于四川省成都市青羊区长顺街附近，由宽巷子、窄巷子、井巷子平行排列组成，全为青黛砖瓦的仿古四合院落院落院落院落院落</view>
				<view class="imgBox">
					<image src="../../static/index/menu_4.png" v-for="(item,index) in 4" :key="index"></image>
					<view class="imgNum">9图</view>
				</view>
			</view>
			<view class="botBox">
				<view class="time">2天前</view>
				<view class="operate">
					<view class="operateBox">
						<image src="../../static/strategy/editor.png"></image>
					</view>
					<view class="operateBox">
						<image src="../../static/strategy/del.png"></image>
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

			}
		},
		methods: {
			toDetail(){
				uni.navigateTo({
					url: '/pages_minute/strategyDetail/strategyDetail'
				})
			},
			
		}
	}
</script>

<style lang="scss">


	.listBox {
		margin-top: 24rpx;
		border-radius: 24rpx;
		background: #FFFFFF;
		padding: 28rpx 24rpx 32rpx 24rpx;
		box-sizing: border-box;

		.botBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 28rpx;

			.operate {
				display: flex;
				align-items: center;
				
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

			.time {
				font-weight: 400;
				color: #999999;
				font-size: 30rpx;
			}
		}

		.infoBox {
			border-bottom: 1px solid #F7F7F7;
			padding-bottom: 26rpx;
		}

		.imgBox {
			display: flex;
			margin-top: 20rpx;
			position: relative;

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

			image {
				width: 152rpx;
				height: 152rpx;
				border-radius: 12rpx;
				margin-right: 20rpx;
			}

			image:last-child {
				margin-right: 0rpx;
			}
		}

		.info {
			font-weight: 400;
			color: #333333;
			font-size: 24rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;

			line-height: 44rpx;
			margin-top: 16rpx;
		}

		.title {
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

	.content {
		padding: 0 24rpx;
		box-sizing: border-box;
	}

	page {
		background: #F4F4F4;
	}
</style>
