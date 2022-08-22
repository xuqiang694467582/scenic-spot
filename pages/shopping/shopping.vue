<template>
	<view>
		<view class="content">
			<view class="list" v-for="(item,index) in 2" :key="index">
				<view class="selectBox">
					<image src="../../static/order/select.png"></image>
				</view>
				<view class="listR">
					<image src="../../static/index/menu_4.png" class="goodsImg"></image>
					<view class="infoBox">
						<view class="name">【营养均衡】园区谷物蛋自农户有机土鸡蛋30枚净重（1.5kg/份）</view>
						<view class="priceBox">
							<view class="price">
								<text class="pPrice"><text>￥</text>30.60</text>
								<text class="oldPrice">￥49</text>
							</view>
							<view class="numBox">
								<image src="../../static/order/jia.png"></image>
								<input value="1" />
								<image src="../../static/order/jian.png"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="botBox">
			<view class="allSelect">
				<image src="../../static/order/select.png"></image>
				全选
			</view>
			<view class="botR">
				<view><text class="totalText">合计：</text><text class="unit">￥</text><text class="totalPrice">61.20</text></view>
				<view class="payTap">去支付(2)</view>
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

		}
	}
</script>

<style lang="scss">
	.botBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		padding: 0 12rpx 0 30rpx;
		box-sizing: border-box;
		height: 124rpx;
		width: 100%;
		box-shadow: 0px -66rpx 126rpx 26rpx rgba(205,205,205,0.16);
		.botR{
			display: flex;
			align-items: center;
			.payTap{
				width: 180rpx;
				height: 80rpx;
				border-radius: 100rpx;
				background-color: rgba(8, 183, 97, 1);
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 80rpx;
				margin-left: 26rpx;
			}
			.totalText{
				font-size: 28rpx;
			}
			.unit{
				font-size: 26rpx;
				color: rgba(238, 17, 17, 1);
			}
			.totalPrice{
				font-size: 32rpx;
				color: rgba(238, 17, 17, 1);
			}
		}
		.allSelect {
			display: flex;
			align-items: center;
			font-weight: 500;
			color: #333333;
			font-size: 28rpx;

			image {
				width: 36rpx;
				height: 36rpx;
				margin-right: 16rpx;
			}
		}
	}

	.content {
		background: #fff;
		padding: 1rpx 24rpx 54rpx 30rpx;
		box-sizing: border-box;
		border-radius: 24rpx;

		.list {
			margin-top: 54rpx;
			display: flex;
			align-items: center;

			.listR {
				display: flex;
				flex: 1;
				margin-left: 22rpx;

				.goodsImg {
					width: 176rpx;
					height: 176rpx;
					border-radius: 24rpx;
				}

				.infoBox {
					display: flex;
					flex: 1;
					margin-left: 24rpx;
					flex-direction: column;

					.numBox {
						display: flex;
						align-items: center;

						image {
							width: 40rpx;
							height: 40rpx;
						}

						input {
							width: 50rpx;
							text-align: center;
							font-size: 32rpx;
							font-weight: 500;
							color: #333333;
						}
					}

					.priceBox {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 50rpx;

						.pPrice {
							font-weight: bold;
							color: #F01A1A;
							font-size: 32rpx;

							text {
								font-size: 30rpx;
							}
						}

						.oldPrice {
							font-size: 24rpx;
							font-weight: 400;
							color: #999999;
							margin-left: 22rpx;
							text-decoration: line-through;
						}
					}

					.name {
						font-weight: 500;
						color: #333333;
						font-size: 30rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
			}

			.selectBox {
				width: 50rpx;
				height: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 36rpx;
					height: 36rpx;
				}
			}
		}
	}

	page {
		background: rgba(243, 243, 243, 1);
		padding-top: 20rpx;
	}
</style>
