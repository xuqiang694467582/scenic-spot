<template>
	<view>
		<view class="banner">
			<image src="../../static/back.png" :style="{top:barHightTop+'px'}" class="backImg" @click="backTap"></image>
			<u-swiper :list="[detail.mainImage]" @change="change" @click="click" radius="0" height="375" indicator
				:autoplay="false"></u-swiper>
		</view>

		<view class="content" style="border-radius: 0px 0px 24rpx 24rpx;">
			<view class="name">{{detail.name}}</view>

			<view class="priceBox">
				<view>
					<text class="unit">￥</text>
					<text class="price">{{detail.price}}</text>
					<text class="oldPrice">￥{{detail.originalPrice}}</text>
				</view>
				<!-- <view class="sale">已售1000+</view> -->
			</view>
		</view>
		<view class="content">
			<view class="infoBox" style="margin-bottom: 38rpx;">
				<view class="title">自提</view>
				<view>景区特产农品自提点，预计1小时后</view>
			</view>
			<view class="infoBox">
				<view class="title">保障</view>
				<view>不支持7天无理由·品质保证</view>
			</view>
		</view>
		<view class="content shopBox" @click="toShop">
			<view class="shopL">
				<image src="../../static/index/menu_4.png"></image>
				<view>
					<view>园区一号农产品商店</view>
					<view class="productNum">共124件商品</view>
				</view>
			</view>
			<view class="toShop">进店逛逛</view>
		</view>
		<view class="content">
			<view class="mTitle">规格信息</view>
			<view class="specInfo">
				<view class="lineBox">
					<view class="lTitle">产地</view>
					<view class="lInfo">{{detail.specificationInformation.origin}}</view>
				</view>
				<view class="lineBox">
					<view class="lTitle">规格</view>
					<view class="lInfo">{{detail.specificationInformation.standard}}</view>
				</view>
				<view class="lineBox">
					<view class="lTitle">保质期</view>
					<view class="lInfo">{{detail.specificationInformation.shelfLife}}</view>
				</view>
				<view class="lineBox">
					<view class="lTitle">储存方式</view>
					<view class="lInfo">{{detail.specificationInformation.storageMethod}}</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="mTitle">商品详情</view>
			<image :src="item" class="goodsInfo" mode="widthFix" v-for="(item,index) in detail.detailsImg" :key="index">
			</image>
		</view>
		<view class="footerBox">
			<view class="cartBox" @click="collectTap">
				<image :src="detail.isKeep?'../../static/my/starA.png':'../../static/collect.png'"></image>
				<view>收藏</view>
			</view>
			<view class="cartBox" @click="toCart">
				<image src="../../static/order/cart.png"></image>
				<view>购物车</view>
			</view>
			<view class="btnBox" @click="show=true">
				<view class="addCart">加入购物车</view>
				<view class="pay">立即购买</view>
			</view>
		</view>
		<!-- 加入购物车 -->
		<u-popup :show="show" mode="bottom" @close="close">
			<view class="specBox">
				<view class="goodsBox">
					<image :src="detail.mainImage"></image>
					<view class="goodsInfo">
						<view class="goodsName">{{detail.name}}</view>
						<view class="specInfoBox">
							<view class="goodsPrice">
								<text class="unit">￥</text>
								<text class="price">{{specList[sepcCurt].price}}</text>
								<text class="oldPrice">￥{{specList[sepcCurt].originalPrice}}</text>
							</view>
							<view class="surplus">剩余：{{specList[sepcCurt].stock}}</view>
						</view>

					</view>
				</view>
				<view class="specTitle">规格</view>
				<view class="specList">
					<view v-for="(item,index) in specList" :key="index" :class="sepcCurt===index?'active':''"
						@click="changeSpec(index)">{{item.name}}
					</view>
				</view>

				<view class="numBox">
					<view>数量</view>
					<view class="num">
						<image src="../../static/order/jian.png" @click="jianTap"></image>
						<view>{{num}}</view>
						<image src="../../static/order/jia.png" @click="jiaTap"></image>
					</view>
				</view>
				<view class="specBtn">
					<view @click="addCart">加入购物车</view>
					<view class="payTap" @click="payTap">立即购买</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		getSpecialtyGoodDetail,
		addCart,
		getGoodList
	} from '@/api/specialty.js'
	import {
		addFavorite,
		addFavoriteCancel
	} from '@/api/product.js'
	export default {
		data() {
			return {
				bannerList: [],
				show: false,
				sepcCurt: 0,
				barHightTop: '',
				id: '',
				detail: '',
				num: 1,
				specList: []
			}
		},
		onLoad(options) {
			this.id = options.id
			this.barHightTop = uni.getSystemInfoSync().statusBarHeight + 5
			this.getDetail()
		},
		computed: mapState(['scenicData']),
		methods: {
			...mapMutations(['SET_ORDERDATA']),
			toShop() {
				uni.navigateTo({
					url: `/pages_minute/specialtyShop/specialtyShop?id=${this.detail.specialtyId}`
				})
			},
			// 收藏
			async collectTap() {
				if (this.detail.isKeep) {
					await addFavoriteCancel({
						ids: [this.detail.keepId]
					})
					this.getDetail()
				} else {
					const params=[{
						type: 0,
						specialtyGoodKeep: {
							specialtyGoodId: this.id
						}
					}]
					await addFavorite({keepInfoList:params})
					this.getDetail()
				}

			},
			// 选择规格
			changeSpec(index) {
				this.sepcCurt = index
			},
			toCart() {
				uni.switchTab({
					url: '/pages/shopping/shopping'
				})
			},
			close() {
				this.show = false
			},
			// 加入购物车
			async addCart() {
				await addCart({
					number: this.num,
					productId: this.id,
					specificationId: this.specList[this.sepcCurt].id,
					merchantId: this.detail.specialtyId,
					attractionId: this.scenicData.id
				})
				uni.showToast({
					title: '添加成功'
				})
			},
			// 数量减
			jianTap() {
				if (this.num > 1) {
					this.num--
				}

			},
			// 数量加
			jiaTap() {
				this.num++
			},
			async getDetail() {
				const {
					data
				} = await getSpecialtyGoodDetail({
					id: this.id
				})
				this.detail = data
				const list = await getGoodList({
					specialtyGoodId: this.id
				})
				this.specList = list.data
			},
			backTap() {
				uni.navigateBack({
					delta: 1
				})
			},
			payTap() {
				const data = this.detail
				data.number = this.num
				data.productPrice = this.specList[this.sepcCurt].price
				data.specificationName = this.specList[this.sepcCurt].name
				data.specificationId = this.specList[this.sepcCurt].id
				const list = {
					merchantId: data.specialtyId,
					merchantName: data.specialtyName,
					merchantType: 3,
					type: 3,
					details: [data]
				}
				this.SET_ORDERDATA([list])
				uni.navigateTo({
					url: '/pages_minute/specialtyPlaceOrder/specialtyPlaceOrder'
				})
			}
		}
	}
</script>

<style lang="scss">
	.shopBox {
		display: flex;
		align-items: center;

		.toShop {
			width: 140rpx;
			height: 52rpx;
			background: #F3982B;
			border-radius: 100rpx;
			font-weight: 400;
			color: #FFFFFF;
			font-size: 24rpx;
			text-align: center;
			line-height: 52rpx;
		}

		.shopL {
			display: flex;
			align-items: center;
			flex: 1;
			font-weight: 500;
			color: #333333;
			font-size: 30rpx;

			.productNum {
				margin-top: 20rpx;
				font-weight: 400;
				color: #999999;
				font-size: 26rpx;
			}

			image {
				width: 104rpx;
				height: 104rpx;
				border-radius: 12rpx;
				margin-right: 20rpx;
			}
		}
	}

	.banner {
		width: 100%;
		position: relative;

		.backImg {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			left: 28rpx;
			z-index: 11;
		}

		.bannerImg {
			width: 100%;
			height: 100%;
		}
	}

	.specBox {
		width: 100%;
		background: #fff;
		border-radius: 24rpx 24rpx 0px 0px;
		padding: 46rpx 42rpx 22rpx 24rpx;
		box-sizing: border-box;

		.specBtn {
			display: flex;
			margin-top: 100rpx;
			justify-content: space-between;

			view {
				width: 328rpx;
				height: 80rpx;
				background: #F3982B;
				border-radius: 100rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 80rpx;
			}

			.payTap {
				background: rgba(11, 183, 98, 1);
			}
		}

		.numBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 68rpx;
			font-weight: 500;
			color: #333333;
			font-size: 28rpx;

			.num {
				display: flex;
				align-items: center;

				image {
					height: 40rpx;
					width: 40rpx;
				}

				view {
					width: 50rpx;
					text-align: center;
					font-weight: 500;
					color: #333333;
					font-size: 32rpx;
				}
			}
		}

		.specList {
			display: flex;
			flex-wrap: wrap;

			view {
				height: 60rpx;
				background: #F2F2F2;
				padding: 0 30rpx;
				border-radius: 100rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #333333;
				margin-bottom: 24rpx;
				line-height: 60rpx;
				margin-right: 16rpx;
			}

			.active {
				color: #0AB662;
				border: 1px solid #05B860;
				background: rgba(60, 180, 82, 0.09);
			}
		}

		.specTitle {
			font-weight: 500;
			color: #333333;
			font-size: 28rpx;
			margin: 38rpx 0 28rpx 0;
		}

		.goodsBox {
			display: flex;
			align-items: center;

			image {
				width: 188rpx;
				height: 186rpx;
				border-radius: 24rpx;
			}

			.goodsInfo {
				display: flex;
				flex: 1;
				flex-direction: column;
				margin-left: 12rpx;

				.specInfoBox {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 30rpx;
				}

				.surplus {
					font-size: 24rpx;
					color: #999;
				}

				.goodsPrice {


					.unit {
						font-size: 38rpx;
						font-weight: bold;
						color: rgba(240, 26, 26, 1);
					}

					.price {
						font-size: 52rpx;
						font-weight: bold;
						color: rgba(240, 26, 26, 1);
					}

					.oldPrice {
						font-size: 24rpx;
						font-weight: 400;
						color: #999999;
						margin-left: 18rpx;
						text-decoration: line-through;
					}
				}

				.goodsName {
					font-size: 30rpx;
					font-weight: 500;
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					line-height: 48rpx;
				}
			}
		}
	}

	.footerBox {
		display: flex;
		align-items: center;
		position: fixed;
		width: 100%;
		height: 124rpx;
		background: #fff;
		left: 0;
		bottom: 0;
		padding: 0 28rpx 0 34rpx;
		box-sizing: border-box;
		justify-content: space-between;
		border-radius: 24rpx 24rpx 0px 0px;

		.btnBox {
			display: flex;

			view {
				width: 256rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
			}

			.pay {
				background: #0BB762;
				border-radius: 0px 100rpx 100rpx 0px;
			}

			.addCart {
				border-radius: 100rpx 0px 0px 100rpx;
				background: #F3982B;
			}
		}

		.cartBox {
			display: flex;
			align-items: center;
			flex-direction: column;
			font-size: 24rpx;
			font-weight: 400;
			color: #333333;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	.content {
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 24rpx;
		padding: 32rpx 44rpx 22rpx 34rpx;
		box-sizing: border-box;

		.goodsInfo {
			width: 100%;
		}

		.specInfo {
			background: #FAFAFA;
			border-radius: 24rpx;
			font-weight: 400;
			color: #666666;
			font-size: 26rpx;

			.lineBox {
				display: flex;
				border-bottom: 1px solid #fff;
			}

			.lTitle {
				width: 176rpx;
				height: 84rpx;
				line-height: 84rpx;
				padding-left: 32rpx;
				box-sizing: border-box;
				border-right: 1px solid #fff;
			}

			.lInfo {
				line-height: 84rpx;
				padding-left: 32rpx;
				box-sizing: border-box;
			}
		}

		.mTitle {
			font-weight: 500;
			color: #333333;
			font-size: 30rpx;
			margin-bottom: 20rpx;
		}

		.infoBox {
			display: flex;
			align-items: center;
			font-weight: 400;
			color: #333333;
			font-size: 28rpx;

			.title {
				font-weight: 500;
				color: #333333;
				font-size: 28rpx;
				margin-right: 58rpx;
			}
		}

		.priceBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 28rpx;

			.unit {
				font-size: 38rpx;
				font-weight: bold;
				color: rgba(240, 26, 26, 1);
			}

			.price {
				font-size: 52rpx;
				font-weight: bold;
				color: rgba(240, 26, 26, 1);
			}

			.oldPrice {
				font-weight: 400;
				color: #999999;
				margin-left: 18rpx;
				text-decoration: line-through;
			}

			.sale {
				font-weight: 400;
				color: #999999;
				font-size: 28rpx;
			}
		}

		.name {
			font-weight: 600;
			color: #333333;
			line-height: 64rpx;
			font-size: 36rpx;
		}
	}

	page {
		background: rgba(243, 243, 243, 1);
		padding-bottom: 150rpx;
	}
</style>
