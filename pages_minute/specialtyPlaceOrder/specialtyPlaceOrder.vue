<template>
	<view>
		<view class="topBox">
			<view class="bgBox">
				<image src="../../static/order/orderBg.png" class="bgImg"></image>
				<view class="pointBox">
					<view class="pTitle">商品自提</view>
					<view class="point">
						<view>
							<view class="pText">顾客请前往商店自提</view>
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
										<input v-model="phone" type="number" placeholder="请输入电话号码" />
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
								<text @click="toAgree">《自提自取服务协议》</text>
							</view>
						</view>
						<!-- <view class="distanceBox">
							<image src="../../static/order/shop.png" class="shopImg"></image>
								<view class="distance">
								<image src="../../static/order/distance.png"></image>
								<view class="dText">距您1.3km</view>
							</view>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="goodsContent">
				<view class="list" v-for="(items,indexs) in orderData" :key="indexs">
					<view class="shopBox">
						<image src="../../static/order/shopIco.png" class="shopIco"></image>
						<view>{{items.merchantName}}</view>
						<image src="../../static/jtR.png" class="jt"></image>
					</view>
					<view class="gList" v-for="(item,index) in items.details" :key="index">
						<view class="listR">
							<image :src="item.mainImage" class="goodsImg"></image>
							<view class="infoBox">
								<view class="name">{{item.name}}</view>
								<view> <view class="specBox">{{item.specificationName}}</view></view>
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
			</view>
			<view class="remarkBox">
				<view>订单备注</view>
				<input placeholder="输入备注信息" v-model="remark" />
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
	import {
		addPlace,
		addOrderPay,
		delCart
	} from '@/api/order.js'
	export default {
		data() {
			return {
				startTime: '',
				time: '',
				isAgree: true,
				remark: '',
				phone: '',
				type:''
			}
		},
		computed: {
			...mapState(['orderData', 'userInfo','scenicData']),
			
			price() {
				let price = 0
				this.orderData.forEach(item => {
					item.details.forEach(items => {
							price += items.productPrice * 1 * items.number * 1
					})
				})
				return price
			}
		},
		onLoad(options){
			this.type=options.type
			console.log(this.orderData)
		},
		onShow() {
			this.startTime = getDateTime.timeStr('y-m-d h:i:s');
			this.time = getDateTime.timeStr('y-m-d h:i:s');
			this.phone = this.userInfo.phone
			console.log(this.time)

		},
		methods: {
			toAgree(){
				uni.navigateTo({
					url:'/pages_minute/agree/agree'
				})
			},
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
				if(!this.phone){
					uni.showToast({
						title:'请输入电话',
						icon:'none'
					})
					return
				}
				// const params = [{
				// 	type: 3,
				// 	specialtyGoodInfoVo: {
				// 		remakes: this.remark,
				// 		tel: this.phone,
				// 		time: this.time
				// 	},
				// 	merchantId: this.orderData[0].specialtyId,
				// 	merchantName:  this.orderData[0].specialtyName,
				// 	orderItems: []
				// }]
				// const listId=[]
				// this.orderData.forEach(item => {
				// 	params[0].orderItems.push({
				// 		productId: item.id,
				// 		specialtyGoodDetailInfo: {
				// 			number: item.number,
				// 			productSpecificationId:item.specificationId
				// 		}
				// 	})
				// 	listId.push(item.cartId)
				// })
				const listId=[]
				const params=[]
				this.orderData.forEach(item => {
					const obj={
						merchantId:item.merchantId,
						merchantName:item.merchantName,
						merchantType:3,
						type:3,
						specialtyGoodInfoVo:{
							remakes: this.remark,
							tel: this.phone,
							time: this.time
						},
						orderItems:[]
					}
					item.details.forEach(items=>{
						obj.orderItems.push({
							productId:items.id,
							specialtyGoodDetailInfo:{
								number:items.number,
								productSpecificationId:items.specificationId
							}
						})
						listId.push(items.cartId)
					})
					params.push(obj)
				})
				const {
					data
				} = await addPlace({
					orders: params,
					attractionId: this.scenicData.id
				})
				this.payOrder(data,listId)


			},
			async payOrder(data,listId) {
				if(this.type==='cart'){
					await delCart({shoppingCartIds:listId})
				}
			
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
							uni.navigateTo({
								url: '/pages/order/order'
							})
						}, 1000)

					},
					// 支付失败回调
					fail(err) {

					}
				})

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
		.shopBox {
			display: flex;
			align-items: center;
			font-weight: 600;
			color: #333333;
			font-size: 30rpx;
			padding-bottom: 28rpx;
			border-bottom: 1px solid #EBEBEB;
			margin-bottom: 32rpx;
		
			.shopIco {
				width: 32rpx;
				height: 32rpx;
				margin-right: 20rpx;
			}
		
			.jt {
				width: 30rpx;
				height: 30rpx;
				margin-left: 4rpx;
			}
		}
		.gList{
			display: flex;
			align-items: center;
			margin-top: 40rpx;
		}
		.list {
			margin-top: 32rpx;
			

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
					.specBox{
						border-radius: 12rpx;
						background: #EBEBEB;
						height: 50rpx;
						padding: 0 12rpx;
						line-height: 50rpx;
						font-weight: 400;
						color: #666666;
						font-size: 24rpx;
						margin-top: 16rpx;
						display: inline-block;
					}
					.priceBox {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-top: 16rpx;

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
