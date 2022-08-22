<template>
	<view class="content">
		<view class="topBox">
			<view>
				<view class="status">订单已支付</view>
				<view class="statusInfo">正在打包中，稍后可前往自提点提取</view>
			</view>
			<view class="btn" @click="show=true">取货码</view>
		</view>
		<view class="orderBox">
			<view class="titleBox">
				<view>园区农产品自提点</view>
				<view>
					<image src="../../static/order/navigation.png"></image>
					<image src="../../static/order/tel.png"></image>
				</view>
			</view>
			<view class="listInfo" v-for="(item,index) in 2" :key="index">
				<image src="../../static/index/menu_4.png"></image>
				<view class="infoR">
					<view class="infoName">【营养均衡】园区江粮谷物蛋自培农户有机土鸡蛋30枚净重（1.5kg/份）</view>
					<view class="spec">30枚 1.5kg/份</view>
					<view class="priceBox">
						<text class="unit">￥</text>
						<text class="price">61.20</text>
						<text class="oldPrice">￥49</text>
					</view>
				</view>
			</view>
			<view class="totalPriceBox">
				<view class="text">合计</view>
				<view class="totalPrice"><text>￥</text>61.20</view>
			</view>
		</view>
		<view class="orderBox">
			<view class="titleBox">
				<view>订单信息</view>
			</view>
			<view class="orderInfoBox">
				<view class="orderInfo">
					<view>订单号：</view>
					<view>165989897845698878458994</view>
				</view>
				<view class="orderInfo">
					<view>下单时间：</view>
					<view>2022-06-25 16:26:36</view>
				</view>
				<view class="orderInfo">
					<view>取货码：</view>
					<view>0089</view>
				</view>
				<view class="orderInfo">
					<view>备注：</view>
					<view>--</view>
				</view>
			</view>
		</view>
		<view class="cancelTap">取消订单</view>
		<!-- 取货码 -->
		<u-popup :show="show" mode="top"  @close="close"  bgColor="transparent">
		    <view class="codeBox">
				<image src="../../static/order/codeBg.png" class="codeBg"></image>
				<view class="codeContent">
					<view class="code">0089</view>
					<image src="../../static/index/menu_4.png"></image>
				</view>
			</view>  
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false
			}
		},
		methods: {
			close(){
				this.show=false
			}
		}
	}
</script>

<style lang="scss">
	.codeBox{
		width: 596rpx;
		height: 650rpx;
		margin: 20% auto 0 auto;
		position: relative;
		.codeBg{
			width: 100%;
			height: 100%;
		}		
		.codeContent{
			position: absolute;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			z-index: 111;
			top: 0;
			left: 0;
			image{
				width: 380rpx;
				height: 380rpx;
				margin-top: 56rpx;
			}
			.code{
				width: 526rpx;
				height: 156rpx;
				line-height: 156rpx;
				text-align: center;
				font-weight: bold;
				color: #333333;
				font-size: 62rpx;
				border-bottom: 1px dashed #ccc;
			}
		}
	}
	.cancelTap{
		height: 94rpx;
		background: #EDF8EF;
		box-shadow: 0px 0px 20px 2px rgba(204,204,204,0.1);
		border-radius: 24rpx;
		border: 1px solid #08B761;
		margin-top: 20rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #08B761;
		text-align: center;
		line-height: 94rpx;
	}
	.orderBox {
		margin-top: 20rpx;
		padding: 0 26rpx;
		box-sizing: border-box;
		background-color: #fff;
		box-shadow: 0px 0px 20rpx 2rpx rgba(204, 204, 204, 0.1);
		border-radius: 24rpx;
		.orderInfoBox{
			padding: 8rpx 0 28rpx 0;
			.orderInfo{
				margin-top: 24rpx;
				font-weight: 400;
				color: #666666;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
		
		.totalPriceBox{
			display: flex;
			justify-content: flex-end;
			padding: 30rpx 0 34rpx 0;
			font-weight: 500;
			color: #333333;
			font-size: 28rpx;
			.text{
				position: relative;
				bottom: -4rpx;
			}
			.totalPrice{
				font-weight: bold;
				color: #333333;
				font-size: 32rpx;
				margin-left: 8rpx;
				text{
					font-size: 26rpx;
				}
			}
		}
		.listInfo {
			display: flex;
			align-items: center;
			display: flex;
			margin-top: 24rpx;
			border-bottom: 1px solid #EBEBEB;
			padding-bottom: 34rpx;
			.infoR {
				display: flex;
				flex: 1;
				margin-left: 16rpx;
				flex-direction: column;
				.spec{
					height: 50rpx;
					background: #EBEBEB;
					border-radius: 12rpx;
					padding: 0 20rpx;
					margin-top: 16rpx;
					font-weight: 400;
					color: #666666;
					font-size: 24rpx;
					display: inline-block;
					line-height: 50rpx;
				}
				.priceBox {
					margin-top: 20rpx;
					.oldPrice{
						font-weight: 400;
						color: #999999;
						font-size: 24rpx;
						text-decoration: line-through;
						margin-left: 22rpx;
					}
					.unit {
						font-size: 30rpx;
						font-weight: bold;
					}

					.price {
						font-size: 40rpx;
						font-weight: bold;
					}

					.num {
						margin-left: 22rpx;
						font-size: 24rpx;
						color: #666666;
					}
				}

				.infoName {
					font-weight: 500;
					color: #333333;
					line-height: 48rpx;
					font-size: 28rpx;
				}
			}

			image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 24rpx;
			}
		}

		.titleBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #EBEBEB;
			font-weight: 600;
			color: #333333;
			font-size: 32rpx;
			padding: 30rpx 0 28rpx 0;

			image {
				width: 40rpx;
				margin-left: 36rpx;
				height: 40rpx;
			}
		}
	}

	.topBox {
		background-color: #fff;
		padding: 40rpx 22rpx 36rpx 32rpx;
		box-sizing: border-box;
		box-shadow: 0px 0px 20rpx 2rpx rgba(204, 204, 204, 0.1);
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.status {
			font-weight: 600;
			color: #000000;
			font-size: 34rpx;
			margin-bottom: 24rpx;
		}

		.statusInfo {
			font-weight: 400;
			color: #999999;
			font-size: 26rpx;
		}

		.btn {
			width: 156rpx;
			height: 60rpx;
			background: #08B761;
			border-radius: 100rpx;
			font-weight: 400;
			color: #FFFFFF;
			font-size: 26rpx;
			text-align: center;
			line-height: 60rpx;
		}
	}

	.content {
		padding: 24rpx;
		box-sizing: border-box;
	}

	page {
		background: rgba(243, 243, 243, 1);
	}
</style>
