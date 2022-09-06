<template>
	<view>
		<view class="topBox">
			<view :style="{paddingTop:barHightTop+'px'}" class="backImg">
				<u-icon name="arrow-left" size="16" color="#ffffff" @click="backTap"></u-icon>
			</view>
		</view>
		<view class="content" :style="{marginTop:barHightTop+'px'}">
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
			<view class="modalBox">
				<view class="pTitle">费用信息</view>
				<view class="pBox">
					在线支付
					<view class="price"><text>￥</text>{{detail.payPrice}}</view>
				</view>
				<view class="ruleBox" v-if="detail.status==='1'">
					取消规则
					<view class="">预订成功后30分钟内<text>免费取消</text></view>
				</view>
			</view>
			<view class="modalBox shopBox">
				<view class="shop">
					<image :src="productDetail.merchantMainImg" class="shopImg"></image>
					<view class="shopInfo">
						<view class="shopName" @click="toShop">{{productDetail.merchantName}}
							<u-icon name="arrow-right" color="#333333" size="14"></u-icon>
						</view>
						<!-- <view class="shopDistance"><image src="../../static/strategy/address.png"></image>距离你1.2km</view> -->
					</view>
				</view>
				<image src="../../static/parktour/navigation.png" class="navigation" @click="navigationTap"></image>
			</view>
			<view class="modalBox" v-for="(item,index) in productDetail.orderItemDetailVoList" :key="index">
				<view class="dateBox">
					<view class="dateText">{{item.startDate}}({{item.startWeek}})</view>
					<view class="dateNum">{{item.day}}晚</view>
					<view class="dateText">{{item.endDate}}({{item.endWeek}})</view>
				</view>
				<view class="setMeal">
					<view class="sName">{{item.productInfo.hotelTypeName}}</view>
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
			<view class="modalBox">
				<view class="title">订单信息</view>
				<view class="lineBox">
					<view class="lTitle">实付金额：</view>
					<view class="price">￥{{detail.payPrice}}</view>
				</view>
				<view class="lineBox">
					<view class="lTitle">数 量：</view>
					<view>{{productDetail.orderItemDetailVoList[0].productInfo.number}}</view>
				</view>
				<view class="lineBox">
					<view class="lTitle">订单号：</view>
					<view class="copyBox" @click="copyTap">{{detail.orderSn}}
						<image src="../../static/order/copy.png"></image>
					</view>
				</view>
				<view class="lineBox">
					<view class="lTitle">预留号码：</view>
					<view>{{productDetail.otherInfo.tel}}</view>
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
			<view class="cancelTap" v-if="detail.status==='1'">取消订单</view>
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
				productDetail: '',
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
			// 复制订单号
			copyTap() {
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
			// 跳转商家
			toShop() {
				uni.navigateTo({
					url: `/pages_minute/hotelDetail/hotelDetail?id=${this.productDetail.merchantId}`
				})
			},
			backTap() {
				console.log('11')
				uni.navigateBack({
					delta: 1
				})
			},
			// 导航
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
			async getDetail() {
				const {
					data
				} = await getOrderDetail({
					id: this.id
				})
				this.detail = data
				const productDetail = data.childrenOrder[0]
				productDetail.orderItemDetailVoList.forEach(item => {
					item.day = this.dateDiff(item.productInfo.reserveStartTime, item.productInfo
						.reserveEndTime)
					item.startWeek = this.getWeek(item.productInfo.reserveStartTime)
					item.endWeek = this.getWeek(item.productInfo.reserveEndTime)
					const startList = item.productInfo.reserveStartTime.split('-')
					item.startDate = `${startList[1]}月${startList[2]}日`
					const endList = item.productInfo.reserveEndTime.split('-')
					item.endDate = `${endList[1]}月${endList[2]}日`
				})
				this.productDetail = productDetail
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
	.content {
		padding: 0 24rpx;
		box-sizing: border-box;
		position: relative;
		top: -320rpx;

		.cancelTap {
			width: 100%;
			height: 94rpx;
			background: #EDF8EF;
			box-shadow: 0px 0px 20px 2px rgba(204, 204, 204, 0.1);
			margin-top: 36rpx;
			font-weight: 500;
			color: #08B761;
			font-size: 30rpx;
			border: 2rpx solid #08B761;
			text-align: center;
			line-height: 94rpx;
			border-radius: 24rpx;
		}

		.shopBox {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.shop {
				display: flex;
				flex: 1;
				margin-right: 20rpx;

				.shopImg {
					width: 108rpx;
					height: 108rpx;
					border-radius: 12rpx;
					margin-right: 24rpx;
				}

				.shopInfo {
					display: flex;
					flex: 1;
					flex-direction: column;

					.shopName {
						display: flex;
						align-items: center;
						font-weight: 500;
						color: #333333;
						font-size: 30rpx;
					}

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

				}
			}

			.navigation {
				width: 42rpx;
				height: 42rpx;
			}
		}

		.tipBox {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			color: #fff;
			margin-bottom: 20rpx;

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
			margin-bottom: 24rpx;

			.lineBox {
				display: flex;
				margin-top: 30rpx;
				font-weight: 500;
				color: #333333;
				font-size: 28rpx;

				.copyBox {
					display: flex;
					align-items: center;

					image {
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

			.otherInfo {
				padding-bottom: 12rpx;

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
				padding: 12rpx 0 28rpx 0;

				.dateText {
					font-size: 36rpx;
					font-weight: 600;
					color: #333333;


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

				}
			}

			.ruleBox {
				border-top: 1px solid #EBEBEB;
				padding: 34rpx 0 14rpx 0;
				box-sizing: border-box;
				margin-top: 18rpx;
				display: flex;
				align-items: center;
				font-weight: 400;
				color: #666666;
				font-size: 28rpx;

				view {
					margin-left: 68rpx;

					text {
						color: #08B761;
					}
				}
			}

			.pBox {
				margin-top: 28rpx;
				display: flex;
				align-items: center;
				font-weight: 400;
				color: #666666;
				font-size: 28rpx;

				.price {
					margin-left: 68rpx;
					font-weight: bold;
					color: #FE5A3D;
					font-size: 40rpx;

					text {
						font-size: 30rpx;
					}
				}
			}

			.pTitle {
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
