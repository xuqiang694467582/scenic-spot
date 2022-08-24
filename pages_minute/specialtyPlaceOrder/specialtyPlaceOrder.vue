<template>
	<view>
		<view class="topBox">
			<view class="bgBox">
				<image src="../../static/order/orderBg.png" class="bgImg"></image>
				<view class="pointBox">
					<view class="pTitle">自提点自提</view>
					<view class="point">
						<view>
							<view class="pText">园区农产品自提点</view>
							<view class="pickUpData">
								<view class="puDate">
									<view class="puText">自取时间</view>
									<picker mode="time" :value="time" :start="startTime" end="21:00"
										@change="bindTimeChange">
										<view class="puInfo">{{time}}</view>
									</picker>
								</view>
								<view>
									<view class="puText">预留电话</view>
									<view class="puInfo">
										<input :value="phone" placeholder="请输入电话号码" />
										<image src="../../static/order/edit.png"></image>
									</view>
								</view>
							</view>
							<view class="agreeBox">
								<u-checkbox-group>
									<u-checkbox activeColor="#08B761" label="同意并接受" labelSize="10" size="14"
										:checked="isAgree" @change="checkboxChange">
									</u-checkbox>
								</u-checkbox-group>
								<text>《自提自取服务协议》</text>
							</view>
						</view>
						<view class="distanceBox">
							<image src="../../static/order/shop.png" class="shopImg"></image>
							<!-- 	<view class="distance">
								<image src="../../static/order/distance.png"></image>
								<view class="dText">距您1.3km</view>
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="goodsContent">
				<view class="list" v-for="(item,index) in orderData" :key="index">
					<view class="listR">
						<image :src="item.mainImage" class="goodsImg"></image>
						<view class="infoBox">
							<view class="name">{{item.name}}</view>
							<view class="priceBox">
								<view class="price">
									<text class="pPrice"><text>￥</text>{{item.price}}</text>
									<text class="oldPrice">￥{{item.originalPrice}}</text>
								</view>
								<view class="numBox">
									×{{item.number}}
									<!-- <image src="../../static/order/jian.png" ></image>
									<input value="1" />
									<image src="../../static/order/jia.png"></image> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="remarkBox">
				<view>订单备注</view>
				<input placeholder="输入备注信息" :value="remark" />
			</view>
		</view>
		<view class="botBox">
			<view><text class="totalText">总计：</text><text class="unit">￥</text><text class="tPrice">{{price}}</text>
			</view>
			<view class="payTap" @click="payTap">支付</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import getDateTime from '@/utils/getdateTime.js';
	import {addPlace} from'@/api/order.js'
	export default {
		data() {
			return {
				startTime: '',
				time: '',
				isAgree: true,
				remark: '',
				phone: ''
			}
		},
		computed: {
			...mapState(['orderData', 'userInfo']),
			price() {
				let price = 0
				this.orderData.forEach(item => {
					price += item.price * 1 * item.number * 1
				})
				return price
			}
		},
		onShow() {
			this.startTime = getDateTime.timeStr('y-m-d h:i:s');
			this.time = getDateTime.timeStr('y-m-d h:i:s');
			this.phone = this.userInfo.phone
			console.log(this.time)

		},
		methods: {
			bindTimeChange(e) {
				this.time = e.detail.value
			},
			checkboxChange(e) {
				this.isAgree = e
			},
			async payTap() {
				if (this.isAgree === false) {
					wx.showToast({
						title: '请勾选协议',
						icon: 'none'
					})
					return
				}
				const params = [{
					type: 3,
					specialtyGoodInfoVo: {
						remakes: this.remark,
						tel: this.phone,
						time: this.time
					},
					merchantId:0,
					merchantName:0,
					orderItems: []
				}]
				this.orderData.forEach(item => {
					params[0].orderItems.push({
						productId: item.id,
						specialtyGoodDetailInfo: {
							number: item.number
						}
					})
				})
				await addPlace({orders:params})
				uni.showToast({
					title:'支付成功'
				})
				setTimeout(()=>{
					uni.switchTab({
						url:'/pages/order/order'
					})
				},1000)
				
			}
		}
	}
</script>

<style lang="scss">
	.botBox {
		width: 100%;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 24rpx 24rpx 0px 0px;
		position: fixed;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		padding-left: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.payTap {
			width: 240rpx;
			height: 100rpx;
			background: #0BB762;
			border-radius: 24rpx 24rpx 0px 0px;
			font-weight: 500;
			color: #FFFFFF;
			font-size: 32rpx;
			text-align: center;
			line-height: 100rpx;
		}

		.totalText {
			font-size: 28rpx;
			color: #333333;
		}

		.unit {
			font-size: 32rpx;
			font-weight: bold;
			color: #0BB762;
		}

		.tPrice {
			font-weight: bold;
			color: #0BB762;
			font-size: 40rpx;
		}
	}

	.remarkBox {
		height: 100rpx;
		background: #FFFFFF;
		width: 100%;
		margin-top: 20rpx;
		border-radius: 24rpx;
		box-shadow: 0px 0px 20rpx 2rpx rgba(204, 204, 204, 0.1);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx;
		box-sizing: border-box;
		font-weight: 500;
		color: #333333;
		font-size: 28rpx;

		input {
			text-align: right;
		}
	}

	.content {
		padding: 0 24rpx;
		box-sizing: border-box;
	}

	.goodsContent {
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


		}
	}

	.topBox {
		width: 100%;
		height: 430rpx;
		background: linear-gradient(180deg, #03B85F 0%, rgba(45, 159, 102, 0.82) 47%, rgba(235, 246, 240, 0.08) 60%, rgba(255, 255, 255, 0) 100%);
		display: flex;
		justify-content: center;

		.bgBox {
			width: 100%;
			height: 430rpx;
			position: relative;

			.pointBox {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				padding: 22rpx 52rpx 0 52rpx;
				box-sizing: border-box;

				.point {
					display: flex;
					align-items: center;
					margin-top: 32rpx;
					justify-content: space-between;

					.distanceBox {
						width: 278rpx;
						height: 252rpx;
						position: relative;

						.shopImg {
							width: 100%;
							height: 100%;
						}

						.distance {
							position: absolute;
							width: 188rpx;
							height: 92rpx;
							left: 60rpx;
							top: 24rpx;

							image {
								width: 100%;
								height: 100%;
							}

							.dText {
								position: absolute;
								left: 0;
								top: 0;
								width: 100%;
								height: 100%;
								text-align: center;
								line-height: 92rpx;
								color: #fff;
								font-weight: 500;
								font-size: 22rpx;
							}
						}
					}

					.agreeBox {
						display: flex;
						margin-top: 28rpx;
						font-size: 20rpx;

						text {
							color: #787B9E;
						}
					}

					.pText {
						font-weight: 600;
						color: #333333;
						font-size: 32rpx;
					}

					.pickUpData {
						display: flex;
						margin-top: 24rpx;

						.puDate {
							padding-right: 20rpx;
							border-right: 1px solid #EFEFEF;
							margin-right: 18rpx;
						}

						.puText {
							font-size: 24rpx;
							font-weight: 400;
							color: #666666;
						}

						.puInfo {
							font-weight: 500;
							color: #333333;
							font-size: 28rpx;
							margin-top: 16rpx;
							display: flex;
							align-items: center;

							input {
								width: 180rpx;
							}

							image {
								width: 32rpx;
								height: 32rpx;
								margin-left: 4rpx;
							}
						}
					}
				}

				.pTitle {
					font-size: 36rpx;
					font-weight: 600;
					color: #333333;
					margin-top: 16rpx;
					width: 300rpx;
					text-align: center;
				}
			}

			.bgImg {
				width: 100%;
				height: 100%;
			}
		}
	}

	page {
		background: rgba(243, 243, 243, 1);
		padding-bottom: 150rpx;
	}
</style>
