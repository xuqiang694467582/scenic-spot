<template>
	<view class="content">
		<view class="topBox" v-show="detail.status==='0'">
			<view>
				<view class="status">订单待支付</view>
				<view class="statusInfo">请尽快支付该订单</view>
			</view>
			<view class="btn" @click="payTap">立即支付</view>
		</view>
		<view class="topBox" v-show="detail.status==='1'">
			<view>
				<view class="status">订单已支付</view>
				<view class="statusInfo">正在打包中，稍后可前往自提点提取</view>
			</view>
			<view class="btn" @click="show=true">核销码</view>
		</view>
		<view class="topBox" v-show="detail.status==='2'">
			<view>
				<view class="status">订单已完成</view>
				<view class="statusInfo">取货完成，期待您的再次光顾</view>
			</view>
		</view>
		<view class="topBox" v-show="detail.status==='3'">
			<view>
				<view class="status">订单已取消</view>
				<view class="statusInfo">已取消订单，希望再次光顾</view>
			</view>
		</view>
		<view class="topBox" v-show="detail.status==='4'">
			<view>
				<view class="status">订单已退款</view>
				<view class="statusInfo">订单已退款，希望再次光顾</view>
			</view>
		</view>
		<view class="ztdBox">
			<view class="zl">
				<image src="../../static/order/ztd.png"></image>
				{{detail.merchantName}}
			</view>
			<view class="zr">
				<image src="../../static/order/navigation.png" @click="navigationTap()"></image>
				<image src="../../static/order/tel.png" @click="telTap"></image>
			</view>
		</view>
		<view class="orderBox" :key="index" >
			<view class="titleBox" @click="toShop">
				<image src="../../static/order/shopIco.png" class="shopIco"></image>
				{{detail.merchantName}}
				<image src="../../static/jtR.png" class="jt"></image>
			</view>
			<view class="listInfo" v-for="(items,indexs) in detail.orderItemDetailVoList" :key="indexs">
				<image :src="items.productInfo.productImage"></image>
				<view class="infoR">
					<view class="infoName">{{items.productInfo.productName}}</view>
					<view>
						<view class="spec">{{items.productInfo.productSpecificationName}}</view>
					</view>
					<view class="setMealBox">
						<view class="priceBox">
							<text class="unit">￥</text>
							<text class="price">{{items.productInfo.price}}</text>
							<text class="oldPrice">￥{{items.productInfo.totalPrice}}</text>
						</view>
						<view class="sNum">×{{items.productInfo.number}}</view>
					</view>
				</view>
			</view>

			<view class="totalPriceBox">
				<view class="text">合计</view>
				<view class="totalPrice"><text>￥</text>{{detail.payPrice}}</view>
			</view>
		</view>

		<view class="orderBox">
			<view class="titleBox">
				<view>订单信息</view>
			</view>
			<view class="orderInfoBox">
				<view class="orderInfo" v-if="detail.otherInfo.number">
					<view>人数：</view>
					<view>{{detail.otherInfo.number}}</view>
				</view>
				<view class="orderInfo" v-if="detail.status=='1'">
					<view>支付金额：</view>
					<view>￥{{detail.payPrice}}</view>
				</view>
				<view class="orderInfo">
					<view>订单号：</view>
					<view>{{detail.orderSn}}</view>
				</view>
				<view class="orderInfo">
					<view>下单时间：</view>
					<view>{{detail.placeTimeStr}}</view>
				</view>
				<view class="orderInfo" v-if="detail.status=='1'">
					<view>支付时间：</view>
					<view>{{detail.payTimeStr}}</view>
				</view>
				<view class="orderInfo" v-if="detail.childrenOrder[0].couponInfo.couponNumber">
					<view>核销码：</view>
					<view>{{detail.childrenOrder[0].couponInfo.couponNumber}}</view>
				</view>
				<view class="orderInfo" v-if="detail.childrenOrder[0].otherInfo.remakes">
					<view>备注：</view>
					<view>{{detail.childrenOrder[0].otherInfo.remakes}}
					</view>
				</view>
			</view>
		</view>
		<view class="cancelTap" v-show="detail.status==='0'" @click="cancelOrder">取消订单</view>
		<!-- 取货码 -->
		<u-popup :show="show" mode="center" @close="close" bgColor="transparent">
			<view class="codeBox">
				<image src="../../static/order/codeBg.png" class="codeBg"></image>
				<view class="codeContent">
					<view class="code">{{detail.couponInfo.couponNumber}}</view>
					<image :src="detail.couponInfo.qrCodeUrl" class="ewm"></image>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getOrderDetail,
		addOrderCancel,
		addOrderPay
	} from '@/api/order.js'
	export default {
		data() {
			return {
				show: false,
				id: '',
				detail: '',
				detail: ''
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getDetail()
		},
		methods: {
			telTap(){
				uni.makePhoneCall({
					phoneNumber: this.detail.merchantTel
				});
			},
			toShop(){
				uni.navigateTo({
					url: `/pages_minute/specialtyShop/specialtyShop?id=${this.detail.merchantId}`
				})
			},
			// 支付
			async payTap() {
				const that = this
				const {
					data
				} = await addOrderPay({
					id: this.id
				})

				uni.requestPayment({
					timeStamp: data.orderResult.timeStamp,
					nonceStr: data.orderResult.nonceStr,
					package: data.orderResult.packageValue,
					signType: data.orderResult.signType,
					paySign: data.orderResult.paySign,
					// 支付成功的回调
					success(result) {
						console.log(result)
						uni.showToast({
							title: '支付成功'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)

					},
					// 支付失败回调
					fail(err) {

					}
				})


			},
			navigationTap() {
				if (!this.detail.latitude) {
					uni.showToast({
						title: '暂无地址',
						icon: 'none'
					})
					return
				}
				uni.openLocation({
					latitude: this.detail.latitude * 1,
					longitude: this.detail.longitude * 1,
					name: this.detail.merchantName,
					address: this.detail.address,
					success: function() {
						console.log('success');
					}
				});
			},
			// 取消订单
			cancelOrder() {
				uni.showModal({
					title: '提示',
					content: '确定取消',
					success: async (res) => {
						if (res.confirm) {
							await addOrderCancel({
								id: this.id
							})
							uni.showToast({
								title: '取消成功'
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			async getDetail() {
				const {
					data
				} = await getOrderDetail({
					id: this.id
				})
				this.detail = data

			},
			close() {
				this.show = false
			},


		}
	}
</script>

<style lang="scss">
	.setMealBox{
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.ztdBox {
		background: #FFFFFF;
		box-shadow: 0px 0px 20rpx 2rpx rgba(204, 204, 204, 0.1);
		border-radius: 24rpx;
		padding: 0 34rpx 0 40rpx;
		height: 108rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
		.zr{
			display: flex;
			image{
				width: 40rpx;
				height: 40rpx;
				margin-left: 36rpx;
			}
		}
		.zl {
			display: flex;
			align-items: center;
			font-weight: 600;
			color: #333333;
			font-size: 30rpx;
			flex: 1;

			image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 16rpx;
			}
		}
	}

	.priceBox {
		

		.oldPrice {
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


	.otherInfo {
		padding-bottom: 28rpx;

		view {
			margin-top: 28rpx;
			font-weight: 400;
			color: #666666;
			font-size: 28rpx;
		}

		.otherText {
			font-weight: 400;
			color: #333333;
			font-size: 28rpx;
			margin-left: 72rpx;
		}
	}

	.setMeal {
		margin-top: 28rpx;
		border-bottom: 1px solid #EBEBEB;

		.sName {
			font-weight: 600;
			color: #333333;
			font-size: 32rpx;
			margin-bottom: 16rpx;
		}

		.tag {
			margin-bottom: 28rpx;
			font-weight: 400;
			color: #999999;
			font-size: 28rpx;
		}
	}

	.dateBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #EBEBEB;

		.dateText {
			font-size: 36rpx;
			font-weight: 600;
			color: #333333;
			padding: 38rpx 0 28rpx 0;

		}

		.dateNum {
			width: 72rpx;
			height: 40rpx;
			border-radius: 40rpx;
			font-weight: 400;
			color: #08B761;
			font-size: 26rpx;
			text-align: center;
			line-height: 40rpx;
			border: 1px solid #08B761;
			position: relative;
			top: 8rpx;
		}
	}

	.codeBox {
		width: 596rpx;
		height: 650rpx;

		position: relative;

		.codeBg {
			width: 100%;
			height: 100%;
		}

		.codeContent {
			position: absolute;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			z-index: 111;
			top: 0;
			left: 0;

			.ewm {
				width: 380rpx;
				height: 380rpx;
				margin-top: 56rpx;
			}

			.code {
				font-size: 62rpx;
				font-weight: bold;
				color: #333333;
				width: 526rpx;
				height: 156rpx;
				line-height: 156rpx;
				text-align: center;
				border-bottom: 1px dashed #ccc;
			}


		}
	}

	.cancelTap {
		height: 94rpx;
		background: #EDF8EF;
		box-shadow: 0px 0px 20px 2px rgba(204, 204, 204, 0.1);
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

		.orderInfoBox {
			padding: 8rpx 0 28rpx 0;

			.orderInfo {
				margin-top: 24rpx;
				font-weight: 400;
				color: #666666;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}

		.totalPriceBox {
			display: flex;
			justify-content: flex-end;
			padding: 30rpx 0 34rpx 0;
			font-weight: 500;
			color: #333333;
			font-size: 28rpx;

			.text {
				position: relative;
				bottom: -4rpx;
			}

			.totalPrice {
				font-weight: bold;
				color: #333333;
				font-size: 32rpx;
				margin-left: 8rpx;

				text {
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

				.spec {
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
			border-bottom: 1px solid #EBEBEB;
			font-weight: 600;
			color: #333333;
			font-size: 32rpx;
			padding: 30rpx 0 28rpx 0;
		
			.shopIco {
				width: 32rpx;
				margin-right: 20rpx;
				height: 32rpx;
			}
		
			.jt {
				width: 30rpx;
				height: 30rpx;
				margin-left: 4rpx;
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
