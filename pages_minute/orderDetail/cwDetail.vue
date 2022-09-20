<template>
	<view>
		<view class="topBox">
			<view :style="{paddingTop:barHightTop+'px'}" class="backImg">
				<u-icon name="arrow-left" size="16" color="#ffffff" @click="backTap"></u-icon>
			</view>
		</view>
		<view class="container" :style="{marginTop:barHightTop+'px'}">
			<view class="tipBox" v-if="detail.status==='0'">
				<image src="../../static/order/time.png"></image>
				<view>待支付<text>请尽快支付该订单</text></view>
			</view>
			<view class="tipBox" v-if="detail.status==='1'">
				<image src="../../static/order/success.png"></image>
				<view>已预订<text>您已成功预订，请及时使用</text></view>
			</view>
			<view class="tipBox" v-if="detail.status==='2'">
				<image src="../../static/order/success.png"></image>
				<view>已完成<text>您的订单已消费，期待您再次预订哦</text></view>
			</view>
			<view class="tipBox" v-if="detail.status==='3'">
				<image src="../../static/order/success.png"></image>
				<view>已取消<text>已取消订单，希望再次光顾</text></view>
			</view>
			<view class="tipBox" v-if="detail.status==='4'">
				<image src="../../static/order/success.png"></image>
				<view>已退款<text>已退款，希望再次光顾</text></view>
			</view>
			<!-- 待支付显示 -->
			<view v-show="detail.status==='0'" v-for="(item,index) in detail.orderItemDetailVoList" :key="index"
				class="payGoodsBox">
				<view class="pgBox">
					<view class="goodsInfo">
						<image
							:src="detail.type==='1'?item.productInfo.amusementPackageImage:item.productInfo.diningRoomPackageImage"
							class="goodsImg"></image>
						<view class="giR">
							<view class="gName">
								{{detail.type==='1'?item.productInfo.amusementPackageName:item.productInfo.diningRoomPackageName}}
							</view>
							<view class="gInfo">随时退</view>
							<view class="gPrice"><text>￥</text>{{item.productInfo.price}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 支付后显示 -->
			<view class="codeBox" v-for="(item,index) in detail.orderItemDetailVoList" :key="index"
				v-show="detail.status!=='0'">
				<image src="../../static/order/detailBg.png" class="bgImg"></image>
				<view class="codeInfo">
					<view class="goodsInfo">
						<image
							:src="detail.type==='1'?item.productInfo.amusementPackageImage:item.productInfo.diningRoomPackageImage"
							class="goodsImg"></image>
						<view class="giR">
							<view class="gName">
								{{detail.type==='1'?item.productInfo.amusementPackageName:item.productInfo.diningRoomPackageName}}
							</view>
							<view class="gInfo">随时退</view>
							<view class="gPrice"><text>￥</text>{{item.productInfo.price}}</view>
						</view>
					</view>
					<view>
						<view class="codeText">券码信息</view>
						<view class="codeNum" >
							<text :class="detail.status==='2'||detail.status==='3'?'useCode':''">{{detail.couponInfo ?detail.couponInfo.couponNumber:'暂无'}}</text>
							<view class="cancelText" v-if="detail.status==='3'">已取消</view>
							<view class="cancelText" v-if="detail.status==='2'">已使用</view>
						</view>
					</view>
				</view>
			</view>

			<view class="content" :style="detail.status!=='0'?'margin-top:-10rpx':''">
				<!-- 商家 -->
				<view class="shopBox">
					<view>
						<view class="shopName">
							<image src="../../static/order/shopIco.png"></image>{{detail.merchantName}}
						</view>
					<!-- 	<view class="shopDistance">
							<image src="../../static/strategy/address.png"></image>距离你1.2km
						</view> -->
					</view>
					<image src="../../static/parktour/navigation.png" class="navigation" @click="navigationTap"></image>
				</view>
				<!-- 餐厅 -->
				<view class=" foodBox" v-show="detail.type==='0'">
					<view class="foodTitle">
						<view>套餐菜品</view>
					</view>
					<view class="foodLine"
						v-for="(item,index) in detail.orderItemDetailVoList[0].productInfo.dishList"
						:key="index">
						<view class="foodName">
							<view></view>{{item.dishName}}（{{item.number}}份）
						</view>
						<view class="foodPrice"><text>￥</text>{{item.price}}</view>
					</view>
				</view>
				<view class="modalBox">
					<view class="title">订单信息</view>
					<view class="lineBox">
						<view class="lTitle">实付金额：</view>
						<view class="price">￥{{detail.payPrice}}</view>
					</view>
					<view class="lineBox">
						<view class="lTitle">数 量：</view>
						<view>{{detail.orderItemDetailVoList[0].productInfo.number}}</view>
					</view>
					<view class="lineBox">
						<view class="lTitle">订单号：</view>
						<view class="copyBox" @click="copyTap">{{detail.orderSn}}<image src="../../static/order/copy.png"></image></view>
					</view>
					<view class="lineBox">
						<view class="lTitle">预留号码：</view>
						<view>{{detail.otherInfo.tel}}</view>
					</view>
					<view class="lineBox" v-if="detail.payTimeStr">
						<view class="lTitle">付款时间：</view>
						<view>{{detail.payTimeStr}}</view>
					</view>
					<view class="lineBox">
						<view class="lTitle">下单时间：</view>
						<view>{{detail.placeTimeStr}}</view>
					</view>
				</view>
				<view class="btnBox" v-if="detail.status==='0'">
					<view class="cancel" @click="cancelOrder">取消订单</view>
					<view class="pay" @click="payTap">继续支付</view>
				</view>
				<view class="btnBox" v-if="detail.status==='1'&&!detail.isRefundApply">
					<view class="cancel" @click="refundTap" style="width: 100%;">取消订单</view>
				</view>
				<view class="btnBox" v-if="detail.status==='2'">
					<view class="cancel" style="width: 100%;" @click="againTap">再次预定</view>
				</view>
				<view class="btnBox" v-if="detail.isRefundApply">
					<view class="cancel" @click="toRefund()">退款进度</view>
					<view class="pay" @click="againTap">再次预定</view>
				</view>
				<view class="btnBox" v-if="detail.status==='3'&&!detail.isRefundApply">
					<view class="cancel" style="width: 100%;" @click="againTap">再次预定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getOrderDetail,
		addOrderPay,
		addOrderCancel
	} from '@/api/order.js'

	export default {
		data() {
			return {
				detail: '',
				id: '',
				lId: '',
				barHightTop: ''
			}
		},
		onLoad(options) {
			this.barHightTop = uni.getSystemInfoSync().statusBarHeight + 20
			this.id = options.id
			this.lId = options.lId
			this.getDetail()
		},
		methods: {
			toRefund(){
				uni.navigateTo({
					url:`/pages_minute/refundDetail/refundDetail?id=${this.detail.refundApplyId}`
				})
			},
			// 再次预定
			againTap(){
				// 餐厅
				if(this.detail.type==='0'){
					uni.navigateTo({
						url:`/pages_minute/reserve/reserve?id=${this.detail.orderItemDetailVoList[0].productId}`
					})
				}else{
					uni.navigateTo({
						url:`/pages_minute/entertainmentSetMeal/entertainmentSetMeal?id=${this.detail.orderItemDetailVoList[0].productId}`
					})
				}
				
			},
			// 申请退款
			refundTap(id) {
				uni.showModal({
					title: '提示',
					content: '确定取消',
					success: async (res) => {
						if (res.confirm) {
							await addRefundOrder({
								orderId: this.id
							})
							uni.showToast({
								title: '取消成功'
							})
							this.getDetail()
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 复制订单号
			copyTap(){
				 uni.setClipboardData({
				      data: this.detail.orderSn,
				      success(res) {
				        wx.showToast({
				          title: '复制成功',
				          icon: 'none'
				        })
				      }
				    })
				
			},
			// 导航
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
							this.getDetail()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			backTap() {
				uni.navigateBack({
					delta: 1
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
						this.getDetail()

					},
					// 支付失败回调
					fail(err) {

					}
				})
			},
			async getDetail() {
				const {
					data
				} = await getOrderDetail({
					id: this.id
				})
				this.detail = data
			},
		}
	}
</script>


<style lang="scss">
	.container {
		position: relative;
		top: -320rpx;

		.tipBox {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			color: #fff;
			padding: 0 24rpx;
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

		.payGoodsBox {
			padding: 0 24rpx;
			box-sizing: border-box;
			margin-top: 46rpx;

			.pgBox {
				background: #FFFFFF;
				box-shadow: 0px 0px 20px 2px rgba(204, 204, 204, 0.1);
				border-radius: 24rpx;

				.goodsInfo {
					border: none;
					padding: 26rpx 28rpx 34rpx 28rpx;
					box-sizing: border-box;
				}
			}
		}
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
				margin-top: 32rpx;
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

	.foodBox {
		padding: 0 26rpx 26rpx 26rpx;
		box-sizing: border-box;
		background-color: #fff;
		box-shadow: 0px 0px 20rpx 2rpx rgba(204, 204, 204, 0.1);
		border-radius: 24rpx;
		margin-top: 20rpx;

		.foodTitle {
			font-weight: 500;
			color: #333333;
			font-size: 30rpx;
			padding-top: 26rpx;
			margin-bottom: 32rpx;
		}

		.foodLine {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 32rpx;

			.foodName {
				font-weight: 400;
				color: #333333;
				font-size: 28rpx;
				display: flex;
				align-items: center;

				view {
					width: 8rpx;
					height: 8rpx;
					background: #08B761;
					border-radius: 50%;
					margin-right: 12rpx;
				}
			}
		}
	}

	.codeBox {
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
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.cancelText {
					font-weight: 500;
					color: #999999;
					font-size: 28rpx;
				}
			}

			.useCode {
				text-decoration: line-through;
				color: #999999;
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
		margin-top: 20rpx;
		.shopBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 34rpx 28rpx 30rpx 28rpx;
			box-sizing: border-box;
			background: #fff;
			border-radius: 24rpx;
			

			.shopDistance {
				display: flex;
				align-items: center;
				font-weight: 400;
				color: #666666;
				font-size: 26rpx;
				margin-top: 34rpx;

				image {
					width: 24rpx;
					height: 24rpx;
					margin-right: 8rpx;
				}
			}

			.shopName {
				display: flex;
				align-items: center;
				font-weight: 600;
				color: #333333;
				font-size: 28rpx;

				image {
					width: 28rpx;
					height: 28rpx;
					margin-right: 16rpx;
				}
			}

			.navigation {
				width: 58rpx;
				height: 58rpx;
			}
		}

		.btnBox {
			display: flex;
			margin-top: 36rpx;
			justify-content: space-between;
			text-align: center;
			line-height: 94rpx;
			font-size: 30rpx;

			.cancel {
				width: 342rpx;
				height: 94rpx;
				background: #EDF8EF;
				box-shadow: 0px 0px 20px 2px rgba(204, 204, 204, 0.1);
				border-radius: 24rpx;
				color: #08B761;
				border: 2rpx solid #08B761;
			}

			.pay {
				width: 342rpx;
				height: 94rpx;
				box-shadow: 0px 0px 20px 2px rgba(204, 204, 204, 0.1);
				background: #08B761;
				border-radius: 24rpx;
				color: #FFFFFF;
			}
		}

		.modalBox {
			box-shadow: 0px 0px 20rpx 2rpx rgba(204, 204, 204, 0.1);
			background: #FFFFFF;
			border-radius: 24rpx;
			padding: 26rpx 28rpx;
			box-sizing: border-box;
			margin-top: 20rpx;

			.lineBox {
				display: flex;
				margin-top: 30rpx;
				font-weight: 500;
				color: #333333;
				font-size: 28rpx;
				.copyBox{
					display: flex;
					align-items: center;
					image{
						width: 30rpx;
						height: 30rpx;
						margin-left: 20rpx;
					}
				}
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



		.backImg {
			margin-left: 24rpx;
		}
	}

	page {
		background-color: #FAFAFA;
	}
</style>
