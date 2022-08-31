<template>
	<view>
		<view class="topBox">
			<view :style="{paddingTop:barHightTop+'px'}" class="backImg">
				<u-icon name="arrow-left" size="16" color="#ffffff"></u-icon>
			</view>
			<view class="tipBox">
				<image src="../../static/order/time.png"></image>
				<view>待核销<text>待用户消费后请及时核销</text></view>
			</view>
		</view>
		<view class="codeBox">
			<image src="../../static/order/detailBg.png" class="bgImg"></image>
			<view class="codeInfo">
				<view class="goodsInfo">
					<image src="../../static/index/menu_4.png" class="goodsImg"></image>
					<view class="giR">
						<view class="gName">【双人】全天全场通玩</view>
						<view class="gInfo">随时退·过期退</view>
						<view class="gPrice"><text>￥</text>298</view>
					</view>
				</view>
				<view>
					<view class="codeText">券码信息</view>
					<view class="codeNum useCode">1489-0089</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="modalBox">
				<view class="title">订单信息</view>
				<view class="lineBox">
					<view class="lTitle">实付金额：</view>
					<view class="price">￥128</view>
				</view>
				<view class="lineBox">
					<view class="lTitle">数 量：</view>
					<view>1</view>
				</view>
				<view class="lineBox">
					<view class="lTitle">订单号：</view>
					<view>165989897845698878458994</view>
				</view>
				<view class="lineBox">
					<view class="lTitle">预留号码：</view>
					<view>136****3689s</view>
				</view>
				<view class="lineBox">
					<view class="lTitle">付款时间：</view>
					<view>136****3689s</view>
				</view>
				<view class="lineBox">
					<view class="lTitle">下单时间：</view>
					<view>136****3689s</view>
				</view>
			</view>
			<view class="btnBox">确认核销</view>
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
			this.barHightTop = uni.getSystemInfoSync().statusBarHeight + 20
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.codeBox {
		position: relative;
		top: -142rpx;
		position: relative;

		.codeInfo {
			padding: 24rpx 48rpx;
			box-sizing: border-box;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 11;
			width: 100%;

			.codeText {
				font-weight: 500;
				color: #333333;
				margin-top: 32rpx;
				font-size: 30rpx;
			}

			.codeNum {
				font-weight: bold;
				color: #333333;
				margin-top: 16rpx;
				font-size: 44rpx;
			}

			.useCode {
				text-decoration: line-through;
				color: #999999;
			}

			.goodsInfo {
				display: flex;
				padding: 26rpx 0;
				box-sizing: border-box;
				border-bottom: 1px dashed #EBEBEB;

				.giR {
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;

					.gPrice {
						font-weight: bold;
						color: #FE5A3D;
						margin-top: 18rpx;
						font-size: 36rpx;

						text {
							font-size: 28rpx;
						}
					}

					.gInfo {
						margin-top: 16rpx;
						font-weight: 400;
						color: #333333;
						font-size: 24rpx;
					}

					.gName {
						font-weight: 500;
						color: #333333;
						font-size: 30rpx;
					}
				}

				.goodsImg {
					width: 156rpx;
					height: 156rpx;
				}
			}
		}

		.bgImg {
			width: 100%;
			height: 450rpx;
		}
	}

	.content {
		padding: 0 24rpx;
		box-sizing: border-box;
		position: relative;
		top: -152rpx;

		.btnBox {
			margin-top: 36rpx;
			height: 94rpx;
			background: #08B761;
			box-shadow: 0px 0px 20rpx 2rpx rgba(204, 204, 204, 0.1);
			border-radius: 24rpx;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
			line-height: 94rpx;
			font-size: 30rpx;
		}

		.modalBox {
			box-shadow: 0px 0px 20rpx 2rpx rgba(204, 204, 204, 0.1);
			background: #FFFFFF;
			border-radius: 24rpx;
			padding: 26rpx 28rpx;
			box-sizing: border-box;

			.lineBox {
				display: flex;
				margin-top: 30rpx;
				font-weight: 500;
				color: #333333;
				font-size: 28rpx;

				.lTitle {
					width: 140rpx;
				}

				.price {

					font-weight: bold;
				}
			}

			.title {
				font-weight: 500;
				color: #333333;
				font-size: 30rpx;
			}
		}
	}

	.topBox {
		width: 100%;
		height: 400rpx;
		background: linear-gradient(180deg, #A0D7BB 0%, #03B75F 100%);

		.tipBox {
			display: flex;
			align-items: center;
			padding: 54rpx 40rpx 0 40rpx;
			box-sizing: border-box;
			color: #fff;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}

			view {
				font-size: 44rpx;
				font-weight: 600;

				text {
					margin-left: 28rpx;
					font-weight: 400;
					font-size: 26rpx;
				}
			}
		}

		.backImg {
			margin-left: 24rpx;
		}
	}

	page {
		background-color: #FAFAFA;
	}
</style>
