<template>
	<view>
		<u-swiper :list="bannerList" @change="change" @click="click" radius="0" height="375" indicator
			:autoplay="false"></u-swiper>
		<view class="content" style="border-radius: 0px 0px 24rpx 24rpx;">
			<view class="name">【营养均衡】园区江粮谷物蛋自培农户有机土鸡蛋30枚净重（1.5kg/份）</view>
			<view class="priceBox">
				<view>
					<text class="unit">￥</text>
					<text class="price">30.60</text>
					<text class="oldPrice">￥49</text>
				</view>
				<view class="sale">已售1000+</view>
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
		<view class="content">
			<view class="mTitle">规格信息</view>
			<view class="specInfo">
				<view class="lineBox">
					<view class="lTitle">产地</view>
					<view class="lInfo">园区自产</view>
				</view>
				<view class="lineBox">
					<view class="lTitle">规格</view>
					<view class="lInfo">400g/盒</view>
				</view>
				<view class="lineBox">
					<view class="lTitle">保质期</view>
					<view class="lInfo">30天</view>
				</view>
				<view class="lineBox">
					<view class="lTitle">储存方式</view>
					<view class="lInfo">常温</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="mTitle">商品详情</view>
			<image src="../../static/index/menu_4.png" class="goodsInfo" mode="widthFix"></image>
		</view>
		<view class="footerBox">
			<view class="cartBox">
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
					<image src="../../static/index/menu_4.png"></image>
					<view class="goodsInfo">
						<view class="goodsName">【营养均衡】园区江粮谷物蛋自培农户有机土鸡蛋30枚净重（1.5kg/份）</view>
						<view class="goodsPrice">
							<text class="unit">￥</text>
							<text class="price">30.60</text>
							<text class="oldPrice">￥49</text>
						</view>
					</view>
				</view>
				<view class="specTitle">规格</view>
				<view class="specList">
					<view v-for="(item,index) in 4" :key="index" :class="sepcCurt===index?'active':''">30枚 1.5kg/份 一盒
					</view>
				</view>
				<view class="specTitle">品种</view>
				<view class="specList">
					<view v-for="(item,index) in 4" :key="index" :class="sepcCurt===index?'active':''">谷物蛋
					</view>
				</view>
				<view class="numBox">
					<view>数量</view>
					<view class="num">
						<image src="../../static/order/jia.png"></image>
						<input value="1" />
						<image src="../../static/order/jian.png"></image>
					</view>
				</view>
				<view class="specBtn">
					<view >加入购物车</view>
					<view class="payTap" @click="payTap">立即购买</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				show: false,
				sepcCurt: 0
			}
		},
		methods: {
			payTap(){
				uni.navigateTo({
					url:'/pages_minute/specialtyPlaceOrder/specialtyPlaceOrder'
				})
			}
		}
	}
</script>

<style lang="scss">
	.specBox {
		width: 100%;
		background: #fff;
		border-radius: 24rpx 24rpx 0px 0px;
		padding: 46rpx 42rpx 22rpx 24rpx;
		box-sizing: border-box;
		.specBtn{
			display: flex;
			margin-top: 100rpx;
			justify-content: space-between;
			view{
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
			.payTap{
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

				input {
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

				.goodsPrice {
					margin-top: 30rpx;

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
