<template>
	<view class="content">
		<view class="topBox" v-show="detail.status==='1'">
			<view>
				<view class="status">订单待核销</view>
				<view class="statusInfo">待用户取货后请及时核销</view>
			</view>
			<view class="btn" @click.stop="writeOffTap">确认核销</view>
		</view>
		<view class="topBox" v-show="detail.status==='2'">
			<view>
				<view class="status">订单已核销</view>
				<view class="statusInfo">已对用户该次消费进行核销</view>
			</view>
			<view class="btn over" >确认核销</view>
		</view>
		<view class="orderBox">
			<view class="listInfo" v-for="(item,index) in detail.orderItemDetailVoList" :key="index">
				<image :src="item.productInfo.productImage"></image>
				<view class="infoR">
					<view class="infoName">{{item.productInfo.productName}}</view>
					<view>
						<view class="spec">{{item.productInfo.productSpecificationName}}</view>
					</view>
					<view class="setMealBox">
						<view class="priceBox">
							<text class="unit">￥</text>
							<text class="price">{{item.productInfo.price}}</text>
							<!-- <text class="oldPrice">￥40</text> -->
						</view>
						<view class="sNum">×{{item.productInfo.number}}</view>
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
				<view class="orderInfo">
					<view>订单号：</view>
					<view>{{detail.orderSn}}</view>
				</view>
				<view class="orderInfo">
					<view>下单时间：</view>
					<view>{{detail.placeTimeStr}}</view>
				</view>
				<view class="orderInfo">
					<view>支付时间：</view>
					<view>{{detail.payTimeStr}}</view>
				</view>
				<view class="orderInfo">
					<view>核销码：</view>
					<view>{{detail.couponInfo.couponNumber}}</view>
				</view>
				<view class="orderInfo">
					<view>备注：</view>
					<view>{{detail.otherInfo.remakes}}</view>
				</view>
			</view>
		</view>
	</view>
	</view>
	</view>
</template>

<script>
	import {
		getOrderDetail,
	} from '@/api/order.js'
	import {
		addWriteOffVoucher
	} from '@/api/writeOff.js'
	export default {
		data() {
			return {
				detail:'',
				detail:'',
				id:'',
				lId:'',
			}
		},
		onLoad(options) {
			this.id=options.id
			this.lId=options.lId
			this.getDetail()
		},
		methods: {
			backTap(){
				uni.navigateBack({
					delta:1
				})
			},
			async writeOffTap(){
				uni.showModal({
					title: '提示',
					content: '确定核销？',
					success: async (res)=> {
						if (res.confirm) {
							await addWriteOffVoucher({id:this.lId})
							uni.showToast({
								title:'核销成功'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
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
		}
	}
</script>

<style lang="scss">
	.orderBox {
		margin-top: 20rpx;
		padding: 1rpx 26rpx;
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

		.titleBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #EBEBEB;
			font-weight: 600;
			color: #333333;
			font-size: 32rpx;
			padding: 30rpx 0 28rpx 0;
		}

		.priceBox {
			margin-top: 20rpx;

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

		.setMealBox {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.sNum {
				font-size: 28rpx;
				color: #333333;
				position: relative;
				top: 10rpx;
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
		.over{
			background: #999999;
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
