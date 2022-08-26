<template>
	<view class="content">
		<view class="topBox" v-show="detail.status==='0'">
			<view>
				<view class="status">订单待支付</view>
				<!-- <view class="statusInfo">订单将在2分钟后自动取消</view> -->
			</view>
			<view class="btn" @click="payTap">立即支付</view>
		</view>
		<view class="topBox" v-show="detail.status==='1'">
			<view>
				<view class="status">订单已支付</view>
				<!-- <view class="statusInfo">正在打包中，稍后可前往自提点提取</view> -->
			</view>
			<view class="btn" @click="show=true">核销码</view>
		</view>
		<view class="topBox" v-show="detail.status==='2'">
			<view>
				<view class="status">订单已完成</view>
				<!-- <view class="statusInfo">取货完成，期待您的再次光顾</view> -->
			</view>
		</view>
		<view class="topBox" v-show="detail.status==='3'">
			<view>
				<view class="status">订单已取消</view>
				<view class="statusInfo">已取消订单，希望再次光顾</view>
			</view>
		</view>
		<!-- 特产显示 -->
		<view class="orderBox" :key="index" v-show="productDetail.type!='2'">
			<view class="titleBox">
				<view>{{productDetail.merchantName==0?'园区农产品自提点':productDetail.merchantName}}</view>
				<view>
					<image src="../../static/order/navigation.png" @click="navigationTap()"></image>
					<!-- <image src="../../static/order/tel.png"></image> -->
				</view>
			</view>
			<view class="listInfo" v-for="(items,indexs) in productDetail.orderItemDetailVoList" :key="indexs">
				<image :src="items.productInfo.diningRoomPackageImage" v-show="productDetail.type==='0'"></image>
				<image :src="items.productInfo.amusementPackageImage" v-show="productDetail.type==='1'"></image>
				<image :src="items.productInfo.hotelTypeImage" v-show="productDetail.type==='2'"></image>
				<image :src="items.productInfo.productImage"  v-show="productDetail.type==='3'"></image>
				<view class="infoR">
					<view class="infoName" v-show="productDetail.type==='0'">{{items.productInfo.diningRoomPackageName}}</view>
					<view class="infoName" v-show="productDetail.type==='1'">{{items.productInfo.amusementPackageName}}</view>
					<view class="infoName" v-show="productDetail.type==='2'">{{items.productInfo.hotelTypeName}}</view>
					<view class="infoName"  v-show="productDetail.type==='3'">{{items.productInfo.productName}}</view>
					<!-- <view class="spec">30枚 1.5kg/份</view> -->
					<view class="setMealBox" >
						<view class="priceBox" >
							<text class="unit">￥</text>
							<text class="price">{{items.productInfo.price}}</text>
							<text class="oldPrice">￥{{items.productInfo.totalPrice}}</text>
						</view>
						<view class="sNum" >×{{items.productInfo.number}}</view>
					</view>
				</view>
			</view>

			<view class="totalPriceBox">
				<view class="text">合计</view>
				<view class="totalPrice"><text>￥</text>{{detail.payPrice}}</view>
			</view>
		</view>
		<!-- 酒店显示 -->
		<view class="orderBox otherBox"  v-show="productDetail.type=='2'">
			<image :src="productDetail.merchantMainImg" class="shopImg"></image>
			<view class="shopBox">
				<view>{{productDetail.merchantName}}</view>
			</view>
			<image src="../../static/order/navigation.png" class="shopNav" @click="navigationTap()"></image>
		</view>
		<view class="orderBox" v-for="(item,index) in productDetail.orderItemDetailVoList" v-show="productDetail.type=='2'">
			<view class="dateBox">
				<view class="dateText">{{item.startDate}}({{item.startWeek}})</view>
				<view class="dateNum">{{item.day}}晚</view>
				<view class="dateText">{{item.endDate}}({{item.endWeek}})</view>
			</view>
			<view class="setMeal">
				<view class="sName">{{item.productInfo.hotelTypeName}}</view>
				<view class="setMealBox" style="margin-bottom: 16rpx;">
					<view class="priceBox" >
						<text class="unit">￥</text>
						<text class="price">{{item.productInfo.price}}</text>
						<text class="oldPrice">￥{{item.productInfo.totalPrice}}</text>
					</view>
					<view class="sNum">×{{item.productInfo.number}}</view>
				</view>
				
				<view class="tag">{{item.productInfo.meal}}·{{item.productInfo.roomType}}</view>
			</view>
			<view class="otherInfo">
				<view>
					<text>住客姓名</text>
					<text class="otherText">{{productDetail.otherInfo.name}}</text>
				</view>
				<view>
					<text>联系电话</text>
					<text class="otherText">{{productDetail.otherInfo.tel}}</text>
				</view>
			</view>
		</view>
		<view class="orderBox">
			<view class="titleBox">
				<view>订单信息</view>
			</view>
			<view class="orderInfoBox">
				<view class="orderInfo" v-if="productDetail.otherInfo.number">
					<view>人数：</view>
					<view>{{productDetail.otherInfo.number}}</view>
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
					<view class="title">核销码</view>
					<view class="code">{{detail.childrenOrder[0].couponInfo.couponNumber}}</view>
					<view class="tip">凭取货码到自提点取货</view>
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
				productDetail: ''
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getDetail()
		},
		methods: {
			// 支付
				async payTap() {
					const that = this
					const {
						data
					} = await addOrderPay({
						orderSn: this.detail.orderSn
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
				if (!this.productDetail.latitude) {
					uni.showToast({
						title: '暂无地址',
						icon: 'none'
					})
					return
				}
				uni.openLocation({
					latitude: this.productDetail.latitude * 1,
					longitude: this.productDetail.longitude * 1,
					name: this.productDetail.merchantName,
					address: this.productDetail.address,
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
				const productDetail = data.childrenOrder[0]
				if(productDetail.type==='2'){//酒店处理
					productDetail.orderItemDetailVoList.forEach(item => {
						item.day = this.dateDiff(item.productInfo.reserveStartTime, item.productInfo
							.reserveEndTime)
						item.startWeek = this.getWeek(item.productInfo.reserveStartTime)
						item.endWeek = this.getWeek(item.productInfo.reserveEndTime)
						const startList=item.productInfo.reserveStartTime.split('-')
						item.startDate=`${startList[1]}月${startList[2]}日`
						const endList=item.productInfo.reserveEndTime.split('-')
						item.endDate=`${endList[1]}月${endList[2]}日`
					})
				}
				this.productDetail = productDetail
			},
			close() {
				this.show = false
			},
			getWeek(date) {
				let myDate = new Date(date)
				let wk = myDate.getDay()
				let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
				let week = weeks[wk]
				return week
			},
			dateDiff(sDate1, sDate2) {
				var aDate, oDate1, oDate2, iDays;
				aDate = sDate1.split("-");
				oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]); //转换为yyyy-MM-dd格式
				aDate = sDate2.split("-");
				oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
				iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
				return iDays; //返回相差天数
			},

		}
	}
</script>

<style lang="scss">
	.setMealBox{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.sNum{
			font-size: 28rpx;
			color: #333333;
			position: relative;top: 10rpx;
		}
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
	.otherBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 28rpx 30rpx 36rpx 30rpx !important;

		.shopBox {
			display: flex;
			flex: 1;
			flex-direction: column;
			font-weight: 500;
			color: #333333;
			font-size: 30rpx;
			margin-left: 24rpx;
			margin-right: 40rpx;
		}

		.shopImg {
			width: 108rpx;
			height: 108rpx;
			border-radius: 12rpx;
		}

		.shopNav {
			width: 42rpx;
			height: 42rpx;
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
		height: 390rpx;

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

			.tip {
				margin-top: 26rpx;
				font-weight: 400;
				color: #999999;
				font-size: 24rpx;
			}

			.code {
				font-size: 72rpx;
				font-weight: bold;
				color: #333333;
				margin-top: 38rpx;
			}

			.title {
				width: 526rpx;
				height: 136rpx;
				line-height: 156rpx;
				text-align: center;
				font-weight: 600;
				color: #333333;
				font-size: 40rpx;
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
