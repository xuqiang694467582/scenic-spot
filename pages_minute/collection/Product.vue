<template>
	<view>
		<view class="contentBox">
			<view class="topBox">
				<view class="numBox">共<text>{{total}}</text> 件商品</view>
				<view @click="editTap" v-show="!isEdit">编辑</view>
				<view @click="isEdit=false" v-show="isEdit" style="color: #08B761;">完成</view>
			</view>
			<view class="listBox">
				<view class="list" v-for="(item,index) in list" :key="index" @click="toDetail(item.keepSpecialtyGood.id)">
					<view class="selectBox" @click="selectTap(index)" v-if="isEdit">
						<image :src="item.checked?'../../static/order/selectA.png':'../../static/order/select.png'">
						</image>
					</view>
					<view class="listR">
						<image :src="item.keepSpecialtyGood.specialtyGoodMainImage" class="goodsImg"></image>
						<view class="infoBox">
							<view class="name">{{item.keepSpecialtyGood.specialtyGoodName}}</view>
							<view class="priceBox">
								<view class="price">
									<text
										class="pPrice"><text>￥</text>{{item.keepSpecialtyGood.specialtyGoodPrice}}</text>
									<text class="oldPrice">￥{{item.keepSpecialtyGood.specialtyGoodOriginalPrice}}</text>
								</view>
								<image src="../../static/my/cart.png" class="cartImg"></image>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<!-- 	<view class="newBox">
			<view class="nl"></view>
			<view>探索新品</view>
			<view class="nr"></view>
		</view>
		<view class="content">
			<view class="list" v-for="(item,index) in 10" :key="index" @click="toDetail(item)">
				<image src="../../static/index/menu_4.png" class="goodsImg"></image>
				<view class="infoBox">
					<view class="name">园区自培农户有机土鸡蛋</view>
					<view class="priceBox">
						<view class="price"><text>￥</text>20</view>
					</view>
				</view>
			</view>
		</view> -->

		<view class="botBox" v-if="isEdit">
			<view class="allSelect" @click="allSelect">
				<image :src="isAllSelect?'../../static/order/selectA.png':'../../static/order/select.png'"></image>
				全选
			</view>
			<view class="botR">
				<view class="payTap" @click="cancelTap">取消收藏</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getKeepList,
		addFavoriteCancel
	} from '@/api/product.js'
	export default {
		data() {
			return {
				isEdit: false,
				listQuery: {
					type: 0,
					page: 1,
					pageSize: 10
				},
				list: [],
				total: 0,
				isAllSelect: false
			}
		},
		created() {
			this.list = []
			this.listQuery.page = 1
			this.getList()
		},
		methods: {
			toDetail(id){
				uni.navigateTo({
					url:`/pages_minute/specialtyDetail/specialtyDetail?id=${id}`
				})
			},
			pullDownRefresh() {
				this.list = []
				this.listQuery.page = 1
				this.getList()
			},
			reachBottom() {
				this.listQuery.page++
				this.getList()
			},
			// 取消收藏
			async cancelTap() {
				const list = []
				this.list.forEach(item => {
					if (item.checked) {
						list.push(item.id)
					}
				})
				if (list.length === 0) {
					uni.showToast({
						title: '请选择商品',
						icon: 'none'
					})
					return
				}
				await addFavoriteCancel({
					ids: list
				})
				uni.showToast({
					title: '取消成功'
				})
				this.list = []
				this.listQuery.page = 1
				this.getList()
			},
			allSelect() {
				this.isAllSelect = !this.isAllSelect
				this.list.forEach(item => {
					item.checked = this.isAllSelect
				})
			},
			// 选择
			selectTap(index) {
				this.list[index].checked = !this.list[index].checked
				this.$forceUpdate()
				console.log(this.list)
			},
			// 编辑
			editTap() {
				this.isAllSelect = false
				this.isEdit = true
				this.list.forEach((item) => {
					item.checked = false
				})
			},
			async getList() {
				const {
					data
				} = await getKeepList(this.listQuery)
				uni.stopPullDownRefresh()
				this.list = this.list.concat(data.records)
				this.total = data.total
			},
		}
	}
</script>

<style scoped lang="scss">
	.botBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: rgba(255, 255, 255, 0.8100);
		padding: 0 12rpx 0 30rpx;
		box-sizing: border-box;
		height: 124rpx;
		width: 100%;
		box-shadow: 0px -66rpx 126rpx 26rpx rgba(205, 205, 205, 0.16);

		.botR {
			display: flex;
			align-items: center;

			.payTap {
				width: 220rpx;
				height: 80rpx;
				border-radius: 24rpx;
				background-color: rgba(8, 183, 97, 1);
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 80rpx;
				margin-left: 26rpx;
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
		padding: 24rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.list {
			background: #FFFFFF;
			border-radius: 24rpx;
			width: 344rpx;
			padding-bottom: 16rpx;
			margin-bottom: 24rpx;

			.infoBox {
				padding: 16rpx 14rpx 0 14rpx;
				box-sizing: border-box;

				.priceBox {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 22rpx;
					
					.sale {
						font-weight: 400;
						color: #999999;
						font-size: 24rpx;
					}

					.price {
						font-size: 30rpx;
						color: rgba(240, 26, 26, 1);
						font-weight: bold;

						text {
							font-size: 26rpx;
						}
					}
				}

				.name {
					font-size: 26rpx;
					font-weight: 500;
					color: #202020;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;

				}
			}

			.goodsImg {
				width: 344rpx;
				height: 340rpx;
				border-radius: 24rpx;
			}
		}
	}

	.newBox {
		display: flex;
		align-items: center;
		margin-top: 48rpx;
		font-weight: 500;
		color: #333333;
		font-size: 32rpx;
		justify-content: center;

		.nl {
			width: 178rpx;
			height: 6rpx;
			background: linear-gradient(270deg, #08B761 0%, rgba(255, 255, 255, 0) 100%);
			margin-right: 24rpx;
		}

		.nr {
			width: 178rpx;
			height: 6rpx;
			background: linear-gradient(90deg, #08B761 0%, rgba(255, 255, 255, 0) 100%);
			margin-left: 24rpx;
		}
	}

	.contentBox {
		margin-top: 24rpx;
		background-color: #fff;
		border-radius: 24rpx;
		padding: 0 24rpx;
		box-sizing: border-box;

		.listBox {
			margin-top: 32rpx;
			padding-bottom: 1rpx;

			.list {
				margin-bottom: 40rpx;
				display: flex;
				align-items: center;

				.listR {
					display: flex;
					flex: 1;
					margin-left: 22rpx;

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

						.priceBox {
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-top: 40rpx;
							.cartImg{
								width: 50rpx;
								height: 50rpx;
							}
							.pPrice {
								font-weight: bold;
								color: #333333;
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

		.topBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 36rpx 10rpx 22rpx 10rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #EBEBEB;
			font-weight: 400;
			color: #333333;
			font-size: 28rpx;

			.numBox {
				font-weight: 500;

				text {
					color: #08B761;
					font-size: 32rpx;
					margin: 0 8rpx;
				}
			}
		}
	}
</style>
