<template>
	<view class="content">
		<view class="mouduleBox">
			<image :src="detail.mainImage" class="goodsImg"></image>
			<view class="goodsR">
				<view class="name">{{detail.name}}</view>
				<view class="tip">随时退·过期退</view>
				<view class="priceBox">
					<view>
						<text class="unit">￥</text>
						<text class="price">{{detail.price}}</text>
						<text class="oldPrice">￥{{detail.originalPrice}}</text>
					</view>
					<view class="numBox">
						<image src="../../static/order/jian.png" @click="jianTap"></image>
						<view>{{num}}</view>
						<image src="../../static/order/jia.png" @click="jiaTap"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="mouduleBox" style="flex-direction: column;">
			<view class="telBox">
				<view>预留手机尾号</view>
				<input placeholder="填写手机尾号" :value="phone" />
			</view>
			<view class="telBox">
				<view>备注</view>
				<input placeholder="填写备注" :value="remark" />
			</view>
		</view>
		<view class="botBox">
			<view>
				<text class="total">合计：</text>
				<text class="unit">￥</text>
				<text class="price">{{price}}</text>
			</view>
			<view class="pay" @click="payTap">立即预订</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		getAmusementPackageDetail
	} from '@/api/index.js'
	import {addPlace,addOrderPay} from'@/api/order.js'
	export default {
		data() {
			return {
				id: '',
				detail: '',
				phone: '',
				num:1,
				remark:''
			}
		},
		computed: {
			...mapState(['userInfo']),
			price(){
				return this.detail.price*1*this.num
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getDetail()
			this.phone = this.userInfo.phone
		},
		methods: {
			async payTap(){
				const params = [{
					type: 1,
					specialtyGoodInfoVo: {
						remakes: this.remark,
						tel: this.phone,
						time: ''
					},
					merchantId:this.detail.amusementId,
					merchantName:this.detail.amusementName,
					amusementPackageInfoVo:{
						name:this.userInfo.nickname,
						number:'',
						tel:this.phone
					},
					orderItems:[{
						productId:this.id,
						itemAmusementPackageDetailInfo:{
							number:this.num
						}
					}]
				}]
				const {data}=await addPlace({orders:params})
				this.payOrder(data)
			},
			async payOrder(orderSn){
				await addOrderPay({orderSn:orderSn})
				uni.showToast({
					title:'支付成功'
				})
				setTimeout(()=>{
					uni.switchTab({
						url:'/pages/order/order'
					})
				},1000)
			},
			jianTap(){
				if(this.num>1){
					this.num--
				}
				
			},
			// 数量加
			jiaTap(){
				this.num++
			},
			async getDetail() {
				const {
					data
				} = await getAmusementPackageDetail({
					id: this.id
				})
				this.detail = data
			},
		}
	}
</script>

<style lang="scss">
	.botBox {
		width: 100%;
		height: 124rpx;
		background: #FFFFFF;
		border-radius: 24rpx 24rpx 0px 0px;
		position: fixed;
		left: 0;
		bottom: 0;
		padding: 0 32rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.pay {
			width: 256rpx;
			height: 80rpx;
			background: #0BB762;
			border-radius: 100rpx;
			font-weight: 500;
			color: #FFFFFF;
			font-size: 28rpx;
			text-align: center;
			line-height: 80rpx;
		}

		.total {
			font-weight: 500;
			color: #333333;
			font-size: 28rpx;
		}

		.unit {
			font-size: 28rpx;
			color: #FE5A3D;
			font-weight: bold;
		}

		.price {
			font-size: 44rpx;
			color: #FE5A3D;
			font-weight: bold;
		}
	}

	.mouduleBox {
		width: 100%;
		background: #fff;
		border-radius: 24rpx;
		padding: 24rpx 18rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;

		.telBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			width: 100%;
			margin-bottom: 24rpx;
			input {
				text-align: right;
			}
		}

		.goodsImg {
			width: 148rpx;
			height: 148rpx;
			border-radius: 12rpx;
		}

		.goodsR {
			display: flex;
			flex-direction: column;
			flex: 1;
			margin-left: 22rpx;

			.priceBox {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20rpx;

				.numBox {
					display: flex;
					align-items: center;

					image {
						width: 40rpx;
						height: 40rpx;
					}

					view {
						width: 50rpx;
						font-weight: 500;
						color: #333333;
						font-size: 32rpx;
						text-align: center;
					}
				}

				.unit {
					font-size: 28rpx;
					color: #FE5A3D;
					font-weight: bold;
				}

				.price {
					font-size: 36rpx;
					color: #FE5A3D;
					font-weight: bold;
				}

				.oldPrice {
					font-weight: 400;
					color: #999999;
					margin-left: 14rpx;
					font-size: 24rpx;
					text-decoration: line-through;
				}
			}

			.name {
				font-weight: 500;
				color: #333333;
				font-size: 32rpx;
			}

			.tip {
				margin-top: 12rpx;
				font-weight: 400;
				color: #333333;
				font-size: 24rpx;
			}
		}
	}

	.content {
		padding: 24rpx;
		box-sizing: border-box;
	}

	page {
		background: rgba(244, 244, 244, 1);
	}
</style>
