<template>
	<view>
		<view class="topBox">
			<view :style="{paddingTop:barHightTop+'px'}" class="backImg"  @click="backTap">
				<u-icon name="arrow-left" size="16" color="#ffffff"></u-icon>
			</view>
		</view>
		<view class="container" :style="{marginTop:barHightTop+'px'}">
			<view class="infoBox">
				<view class="infoTitle" v-show="detail.state==='2'">退款成功</view>
				<view class="infoTitle" v-show="detail.state==='1'">退款中</view>
					<view class="infoTitle" v-show="detail.state==='3'">退款失败</view>
				<view class="infoLine">
					<view>退款金额</view>
					<view class="rPrice"><text>￥</text>{{detail.orderDetail.payPrice}}</view>
				</view>
				<view class="infoLine">
					<view>退款账户</view>
					<view class="account">原支付账户</view>
				</view>
			</view>

			<view class="orderBox" >
				<view class="titleBox" @click="toShop">
					<image src="../../static/order/shopIco.png" class="shopIco"></image>
					{{detail.orderDetail.merchantName}}
					<image src="../../static/jtR.png" class="jt"></image>
				</view>
				<!-- 特产 -->
				<view class="listInfo" v-for="(item,index) in detail.orderDetail.orderItemDetailVoList" :key="index"  v-if="item.type==='3'">
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
								
							</view>
							<view class="sNum">×{{item.productInfo.number}}</view>
						</view>
					</view>
				</view>
				<!-- 娱乐 -->
				<view class="listInfo" v-for="(item,index) in detail.orderDetail.orderItemDetailVoList" :key="index"  v-if="item.type==='1'">
					<image :src="item.productInfo.amusementPackageImage"></image>				
					<view class="infoR">
						<view class="infoName">{{item.productInfo.amusementPackageName}}</view>
						<view class="setMealBox">
							<view class="priceBox">
								<text class="unit">￥</text>
								<text class="price">{{item.productInfo.price}}</text>							
							</view>
							<view class="sNum">×{{item.productInfo.number}}</view>
						</view>
					</view>
				</view>
				<!-- 酒店 -->
				<view class="listInfo" v-for="(item,index) in detail.orderDetail.orderItemDetailVoList" :key="index"  v-if="item.type==='2'">
					<image :src="item.productInfo.hotelTypeImage"></image>				
					<view class="infoR">
						<view class="infoName">{{item.productInfo.hotelTypeName}}</view>
						<view class="setMealBox">
							<view class="priceBox">
								<text class="unit">￥</text>
								<text class="price">{{item.productInfo.price}}</text>							
							</view>
							<view class="sNum">×{{item.productInfo.number}}</view>
						</view>
					</view>
				</view>
				<!-- 餐厅 -->
				<view class="listInfo" v-for="(item,index) in detail.orderDetail.orderItemDetailVoList" :key="index"  v-if="item.type==='0'">
					<image :src="item.productInfo.diningRoomPackageImage"></image>				
					<view class="infoR">
						<view class="infoName">{{item.productInfo.diningRoomPackageName}}</view>
						<view class="setMealBox">
							<view class="priceBox">
								<text class="unit">￥</text>
								<text class="price">{{item.productInfo.price}}</text>							
							</view>
							<view class="sNum">×{{item.productInfo.number}}</view>
						</view>
					</view>
				</view>

			</view>

			<view class="infoBox" style="margin-top: 20rpx;">
				<view class="infoTitle">退款流程</view>
				<view class="processBox">
					<view class="process" v-show="detail.refundState==='1'">
						<view class="pTitle">
							<image src="../../static/my/yuan.png"></image>
							退款已入账
						</view>
						<view class="botProcess" >
							<view class="pInfo">您的退款金额已返回到原支付账户</view>
							<view class="time">{{detail.applyTimeStr}}</view>
						</view>			
					</view>
					<view class="process" v-show="detail.state==='2'">
						<view class="pTitle">
							<image src="../../static/my/yuan.png"></image>
							平台审核通过
						</view>
						<view class="botProcess" >
							<view class="pInfo">平台已受理您的退款申请</view>
							<view class="time">{{detail.reviewerTimeStr}}</view>
						</view>			
					</view>
					<view class="process" v-show="detail.state==='3'">
						<view class="pTitle">
							<image src="../../static/my/yuan.png"></image>
							平台审核未通过
						</view>
						<view class="botProcess" >
							<view class="pInfo">{{detail.opinion}}</view>
							<view class="time">{{detail.reviewerTimeStr}}</view>
						</view>			
					</view>
					<view class="process" >
						<view class="pTitle">
							<image src="../../static/my/yuan.png"></image>
							发起取消订单申请
						</view>
						<view class="botProcess" style="border: none;">
							<view class="pInfo">系统审核通过后将为您退款</view>
							<view class="time">{{detail.applyTimeStr}}</view>
						</view>			
					</view>


				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getRefundDetail} from '@/api/order.js'
	export default {
		data() {
			return {
				barHightTop: '',
				id:'',
				detail:''
			}
		},
		onLoad(options) {
			this.barHightTop = uni.getSystemInfoSync().statusBarHeight + 20
			this.id=options.id
			this.getDetail()
		},
		methods: {
			toShop(){
				switch (this.detail.orderDetail.type) {
					case '0':
						uni.navigateTo({
							url: `/pages_minute/diningDetail/diningDetail?id=${this.detail.orderDetail.merchantId}`
						})
						break;
					case '1':
						uni.navigateTo({
							url: `/pages_minute/entertainmentDetail/entertainmentDetail?id=${this.detail.orderDetail.merchantId}`
						})
						break;
					case '2':
						uni.navigateTo({
							url: `/pages_minute/hotelDetail/hotelDetail?id=${this.detail.orderDetail.merchantId}`
						})
						break;
					case '3':
						uni.navigateTo({
							url: `/pages_minute/specialtyShop/specialtyShop?id=${this.detail.orderDetail.merchantId}`
						})
						break;
				}
			},
			backTap(){
				uni.navigateBack({
					delta:1
				})
			},
			async getDetail(){
				const {data}=await getRefundDetail({id:this.id})
				this.detail=data
			}
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;
		top: -280rpx;

		.processBox {
			margin-top: 40rpx;
			.process{
				margin-top: 6rpx;
				
			}
			.botProcess{
				border-left: 1px solid #F0F0F0;
				margin-left: 10rpx;
				padding-left: 24rpx;
				box-sizing: border-box;
				padding-bottom: 48rpx;
				padding-top: 20rpx;
			}
			.time {
				margin-top: 16rpx;
				font-weight: 400;
				color: #999999;
				font-size: 24rpx;
			
			}

			.pInfo {
				font-weight: 400;
				color: #666666;
				font-size: 24rpx;
				line-height: 40rpx;
			}

			.pTitle {
				align-items: center;
				display: flex;
				font-weight: 500;
				color: #333333;
				font-size: 28rpx;

				image {
					width: 24rpx;
					height: 24rpx;
					margin-right: 12rpx;
				}
			}
		}

		.orderBox {
			margin-top: 20rpx;
			padding: 0 26rpx;
			box-sizing: border-box;
			background-color: #fff;
			box-shadow: 0px 0px 20rpx 2rpx rgba(204, 204, 204, 0.1);
			border-radius: 24rpx;

			.setMealBox {
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
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

		.infoBox {
			width: 100%;
			background-color: #fff;
			border-radius: 24rpx;
			padding: 36rpx 34rpx 40rpx 34rpx;
			box-sizing: border-box;

			.account {
				font-weight: 500;
				color: #333333;
				font-size: 28rpx;
			}

			.rPrice {
				font-weight: bold;
				color: #FE5A3D;
				font-size: 36rpx;

				text {
					font-size: 28rpx;
				}
			}

			.infoLine {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 28rpx;
				font-weight: 400;
				color: #999999;
				font-size: 28rpx;
			}

			.infoTitle {
				font-weight: 600;
				color: #333333;
				font-size: 32rpx;
				margin-bottom: 8rpx;
			}
		}
	}

	.topBox {
		width: 100%;
		height: 360rpx;
		background: linear-gradient(180deg, #A0D7BB 0%, #03B75F 100%);

		.backImg {
			margin-left: 24rpx;
		}
	}

	page {
		background-color: #FAFAFA;
	}
</style>
