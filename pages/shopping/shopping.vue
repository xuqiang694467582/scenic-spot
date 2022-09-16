<template>
	<view>
		<view class="manageBox">
			<view>购物车（{{total}}）</view>
			<view v-if="!isManage" @click="manageChange(true)">管理</view>
			<view v-else @click="manageChange(false)" style="color:#FE3D3D;">退出管理</view>
		</view>
		<view class="content" v-if="list.length>0">
			<view class="list" v-for="(items,indexs) in list" :key="indexs">
				<view class="shopBox">
					<image src="../../static/order/shopIco.png" class="shopIco"></image>
					<view>{{items.merchantName}}</view>
					<image src="../../static/jtR.png" class="jt"></image>
				</view>
				<view class="proList" v-for="(item,index) in items.details" :key="index">
					<view class="selectBox" @click="selectTap(indexs,index)">
						<image :src="item.checked?'../../static/order/selectA.png':'../../static/order/select.png'">
						</image>
					</view>
					<view class="listR">
						<image :src="item.productMainImage" class="goodsImg"></image>
						<view class="infoBox">
							<view class="name">{{item.productName}}</view>
							<view>
								<view class="specBox">{{item.specificationName}}</view>
							</view>
							<view class="priceBox">
								<view class="price">
									<text class="pPrice"><text>￥</text>{{item.productPrice}}</text>
									<text class="oldPrice">￥{{item.productOriginalPrice}}</text>
								</view>
								<view class="numBox">
									<image src="../../static/order/jian.png" @click="jianTap(indexs,index)"></image>
									<view class="num">{{item.number}}</view>
									<image src="../../static/order/jia.png" @click="jiaTap(indexs,index)"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<u-empty mode="car" icon="http://cdn.uviewui.com/uview/empty/car.png" text="购物车空空如也" v-else>
		</u-empty>
		<view class="botBox">
			<view class="allSelect" @click="allSelect">
				<image :src="isAllSelect?'../../static/order/selectA.png':'../../static/order/select.png'"></image>
				全选
			</view>
			<view class="botR" v-if="!isManage">
				<view><text class="totalText">合计：</text><text class="unit">￥</text><text
						class="totalPrice">{{price}}</text></view>
				<view class="payTap" @click="payTap">去支付({{selectNum}})</view>
			</view>
			<view class="botR" v-if="isManage">
				<view class="collection" @click="collectTap">移入收藏</view>
				<view class="del" @click="delTap">删除</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	import {
		getCartList,
		updateNumber,
		delCart
	} from '@/api/order.js'
	import {
		addFavorite
	} from '@/api/product.js'
	export default {
		data() {
			return {
				list: [],
				isAllSelect: false,
				merchantId: '',
				merchantName: '',
				isManage: false
			}
		},
		onShow() {
			this.isAllSelect = false
			this.list = []
			this.getList()
		},
		computed: {
			...mapState(['scenicData']),

			price() {
				let price = 0
				this.list.forEach(item => {
					item.details.forEach(items => {
						if (items.checked) {
							price += items.productPrice * 1 * items.number * 1
						}
					})

				})
				return price.toFixed(2)
			},
			selectNum() {
				const list = []
				this.list.forEach(item => {
					item.details.forEach(items => {
						if (items.checked) {
							list.push(items)
						}
					})
				})
				return list.length
			},
			total() {
				const list = []
				this.list.forEach(item => {
					item.details.forEach(items => {
						list.push(items)
					})
				})
				return list.length
			}
		},
		methods: {
			...mapMutations(['SET_ORDERDATA']),
			// 移入收藏
			async collectTap() {
				const list = []			
				this.list.forEach(item => {
					item.details.forEach(items => {
						if (items.checked) {
							list.push({
								specialtyGoodKeep: {specialtyGoodId:items.productId},
								type: 0
							})
							
						}
					})
				})
				if (list.length === 0) {
					uni.showToast({
						title: '请选择商品',
						icon: 'none'
					})
					return
				}
				await addFavorite({
					keepInfoList: list
				})
				this.delTap()

			},
			manageChange(type) {
				this.isManage = type
			},
			// 跳转提交订单
			payTap() {
				const list = []
				const that = this
				this.list.forEach(item => {
					const isChecked = item.details.some(items => {
						return items.checked
					})
					if (isChecked) {
						const obj = {
							merchantId: item.merchantId,
							merchantName: item.merchantName,
							merchantType: 3,
							type: 3,
							details: []
						}
						item.details.forEach(items => {
							if (items.checked) {
								obj.details.push({
									...items,
									cartId: items.id,
									id: items.productId,
									name: items.productName,
									price: items.productPrice,
									originalPrice: items.productOriginalPrice,
									mainImage: items.productMainImage,
								})
							}
						})
						list.push(obj)
					}

				})

				if (list.length === 0) {
					uni.showToast({
						title: '请选择商品',
						icon: 'none'
					})
					return
				}
				this.SET_ORDERDATA(list)
				uni.navigateTo({
					url: '/pages_minute/specialtyPlaceOrder/specialtyPlaceOrder?type=cart'
				})
			},
			// 删除
			async delTap(index) {
				const list = []
				this.list.forEach(item => {
					item.details.forEach(items => {
						if (items.checked) {
							list.push(items.id)
						}
					})
				})
				if (list.length === 0) {
					uni.showToast({
						title: '请选择商品',
						icon: 'none'
					})
					return
				}
				await delCart({
					shoppingCartIds: list
				})
				this.getList()
			},
			// 减
			jiaTap(indexs, index) {
				this.list[indexs].details[index].number++
				this.chageNumber(this.list[indexs].details[index].id, this.list[indexs].details[index].number)
			},
			// 加
			jianTap(indexs, index) {
				if (this.list[indexs].details[index].number > 1) {
					this.list[indexs].details[index].number--
					this.chageNumber(this.list[indexs].details[index].id, this.list[indexs].details[index].number)
				}
			},
			async chageNumber(id, number) {
				await updateNumber({
					id: id,
					number: number
				})
			},
			allSelect() {
				this.isAllSelect = !this.isAllSelect
				this.list.forEach(item => {
					item.details.forEach(items => {
						items.checked = this.isAllSelect
					})
				})
				// this.list.forEach(item => {
				// 	item.checked = this.isAllSelect
				// })
			},
			// 选择
			selectTap(indexs, index) {
				this.list[indexs].details[index].checked = !this.list[indexs].details[index].checked
			},
			// 购物车列表
			async getList() {
				const {
					data
				} = await getCartList({
					attractionId: this.scenicData.id
				})
				if (data.length === 0) {
					this.list = []
					return
				}
				data.forEach(item => {
					item.details.forEach(items => {
						items.checked = false
					})
				})
				this.list = data
				// const list = data[0].details
				// list.forEach(item => {
				// 	item.checked = false
				// 	item.options = [{
				// 		text: '删除',
				// 		style: {
				// 			backgroundColor: 'red'
				// 		}
				// 	}]
				// })
				// this.list = list
				// this.merchantName=data[0].merchantName
				// this.merchantId=data[0].merchantId
				// console.log(list)
			}
		}
	}
</script>

<style lang="scss">
	.del {
		width: 180rpx;
		height: 80rpx;
		border-radius: 80rpx;
		text-align: center;
		line-height: 80rpx;
		margin-right: 20rpx;
		font-weight: 400;
		color: #fff;
		font-size: 26rpx;
		background: #FE3D3D;
	}

	.collection {
		width: 176rpx;
		height: 76rpx;
		border: 1px solid #08B761;
		border-radius: 80rpx;
		text-align: center;
		line-height: 80rpx;
		margin-right: 20rpx;
		font-weight: 400;
		color: #08B761;
		font-size: 26rpx;
	}

	.manageBox {
		width: 100%;
		height: 84rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		padding: 0 36rpx;
		font-weight: 400;
		color: #333;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		margin-bottom: 20rpx;
	}

	.botBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		padding: 0 12rpx 0 30rpx;
		box-sizing: border-box;
		height: 124rpx;
		width: 100%;
		box-shadow: 0px -66rpx 126rpx 26rpx rgba(205, 205, 205, 0.16);

		.botR {
			display: flex;
			align-items: center;

			.payTap {
				width: 180rpx;
				height: 80rpx;
				border-radius: 100rpx;
				background-color: rgba(8, 183, 97, 1);
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 80rpx;
				margin-left: 26rpx;
			}

			.totalText {
				font-size: 28rpx;
			}

			.unit {
				font-size: 26rpx;
				color: rgba(238, 17, 17, 1);
			}

			.totalPrice {
				font-size: 32rpx;
				color: rgba(238, 17, 17, 1);
			}
		}

		.allSelect {
			display: flex;
			align-items: center;
			font-weight: 500;
			color: #333333;
			font-size: 28rpx;

			image {
				width: 36rpx;
				height: 36rpx;
				margin-right: 16rpx;
			}
		}
	}

	.content {
		background: #fff;
		padding: 1rpx 24rpx 54rpx 30rpx;
		box-sizing: border-box;
		border-radius: 24rpx;

		.list {
			margin-top: 32rpx;

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

			.proList {
				display: flex;
				align-items: center;
			}

			.listR {
				display: flex;
				flex: 1;
				margin-left: 22rpx;
				margin-top: 24rpx;

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

					.specBox {
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

					.numBox {
						display: flex;
						align-items: center;

						image {
							width: 40rpx;
							height: 40rpx;
						}

						.num {
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

			.selectBox {
				width: 50rpx;
				height: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 36rpx;
					height: 36rpx;
				}
			}
		}
	}

	page {
		background: rgba(243, 243, 243, 1);
		padding-top: 20rpx;
		padding-bottom: 150rpx;
	}
</style>
