<template>
	<view>
		<uni-nav-bar :statusBar="true" :border="false" leftWidth="460rpx" backgroundColor="#F2F2F4">
			<view slot="left" class="topBox">
				<image src="../../static/jtL.png" class="back" @click="backTap"></image>
				<u-search v-model="listQuery.name" :showAction="false" clearabled placeholder="搜索订单" bgColor="#fff"
					height="28" @search="searchTap"></u-search>
			</view>
		</uni-nav-bar>
		<view>
			<u-tabs :list="typeList" @click="click" lineColor="#08B761"
				:activeStyle="{color:'#08B761',fontSize:'28rpx'}" :inactiveStyle="{color:'#333333',fontSize:'28rpx'}"
				:itemStyle="{width:'25%',height: '42px'}"></u-tabs>
		</view>
		<view class="listBox">
			<view class="list" @click="toDetail(index)" v-for="(item,index) in 3" :key="index">
				<view class="topBox">
					<view class="codeBox">核销码：<text>0089</text></view>
					<view>待核销</view>
				</view>
				<view class="listInfo">
					<image src="../../static/index/menu_4.png"></image>
					<view class="infoR">
						<view class="infoName">【营养均衡】园区江粮谷物蛋自培农户有机土鸡蛋30枚净重（1.5kg/份）</view>
						<view>
							<view class="specBox">20kg</view>
						</view>
						<view class="priceBox">
							<text class="unit">￥</text>
							<text class="price">11</text>
							<text class="num">共2件</text>
						</view>
					</view>
				</view>
				<view class="botBox">
					<view class="tel">预留号码：13198568974</view>
					<view class="btnBox">确认核销</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList: [{
						name: '全部'
					},
					{
						name: '待核销'
					},
					{
						name: '已核销'
					},
				]
			}
		},
		methods: {
			toDetail(index) {
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '/pages_minute/writeOffDetail/cwdetail'
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/pages_minute/writeOffDetail/hotelDetail'
						})
						break;
						case 2:
							uni.navigateTo({
								url: '/pages_minute/writeOffDetail/specialtyDetail'
							})
							break;

				}

			},
		}
	}
</script>

<style lang="scss">
	.listBox {
		margin-top: 30rpx;
		padding: 0 24rpx;
		box-sizing: border-box;

		.list {
			margin-bottom: 24rpx;
			background-color: #fff;
			border-radius: 24rpx;
			padding: 26rpx;
			box-sizing: border-box;

			.botBox {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 24rpx;

				.btnBox {
					width: 152rpx;
					height: 64rpx;
					background: #08B761;
					border-radius: 100rpx;
					font-weight: 400;
					color: #FFFFFF;
					font-size: 26rpx;
					text-align: center;
					line-height: 64rpx;
				}

				.tel {
					font-weight: 400;
					color: #666666;
					font-size: 28rpx;
				}
			}

			.listInfo {
				display: flex;
				align-items: center;
				display: flex;
				margin-top: 24rpx;
				border-bottom: 1px solid #EBEBEB;
				padding-bottom: 24rpx;

				.specBox {
					height: 50rpx;
					background: #EBEBEB;
					border-radius: 12rpx;
					padding: 0 20rpx;
					margin-top: 8rpx;
					font-weight: 400;
					color: #666666;
					font-size: 24rpx;
					display: inline-block;
					line-height: 50rpx;
				}

				.infoR {
					display: flex;
					flex: 1;
					margin-left: 16rpx;
					flex-direction: column;

					.priceBox {
						margin-top: 16rpx;

						.unit {
							font-size: 30rpx;
							font-weight: bold;
							color: #FE5A3D;
						}

						.price {
							font-size: 40rpx;
							font-weight: bold;
							color: #FE5A3D;
						}

						.num {
							margin-left: 22rpx;
							font-size: 24rpx;
							color: #666666;
						}
					}

					.infoName {
						font-weight: 500;
						color: #333333;
						line-height: 48rpx;
						font-size: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
				}

				image {
					width: 160rpx;
					height: 160rpx;
					border-radius: 24rpx;
				}
			}

			.topBox {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
				padding-bottom: 28rpx;
				border-bottom: 1px solid rgba(235, 235, 235, 1);

				.codeBox {
					font-size: 32rpx;
					font-weight: bold;
					color: #333;

					text {
						font-size: 32rpx;
						font-weight: bold;
						color: #08B761;
					}
				}
			}
		}
	}

	page {
		background-color: #F2F2F4;
	}

	.topBox {
		display: flex;
		align-items: center;

		.back {
			width: 35rpx;
			height: 35rpx;
			margin-right: 24rpx;
		}
	}
</style>
