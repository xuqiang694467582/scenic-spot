<template>
	<view>
		<view class="back">
			<image src="../../static/my/back.png"></image>
		</view>
		<view style="padding: 20rpx;margin-top: 5rem;">
			<view class="avatar">
				<view class="avatar-left" v-if="userInfo.nickname">
					<u-avatar size="48" :src="userInfo.avatar"></u-avatar>
					<text>{{userInfo.nickname}}</text>
				</view>
				<view class="avatar-left" v-else>
					<u-button type="success" @click="getUserProfile" size="small">授权用户信息</u-button>
				</view>
				<!-- <u-icon name="setting" size="20"></u-icon> -->
			</view>
			<view class="myOrder">
				<view class="myOrder-text">我的订单</view>
				<u-scroll-list :indicator="false">
					<view class="scroll-list">
						<view class="scroll-list__line" v-for="(item, index) in menuArr" :key="index">
							<view class="scroll-list__line__item" v-for="(item1, index1) in item" :key="index1"
								:class="[(index1 === item.length - 1) && 'scroll-list__line__item--no-margin-right']"
								@click="toOrder(item1.type)">
								<image class="scroll-list__line__item__image" :src="item1.icon" mode=""></image>
								<text class="scroll-list__line__item__text">{{ item1.name }}</text>
							</view>
						</view>
					</view>
				</u-scroll-list>
			</view>
			<view class="modalBox">
				<view class="lineBox" @click="toDetail(0)" v-if="userInfo.isMerchant">
					<view class="lbL">
						<image src="../../static/my/sjhx.png"></image>
						<view>商家核销</view>
					</view>
					<u-icon name="arrow-right" size="12"></u-icon>
				</view>
				<view class="lineBox" v-for="(item,index) in menuList" :key="index" @click="toDetail(index+1)">
					<view class="lbL">
						<image :src="item.img"></image>
						<view>{{item.name}}</view>
					</view>
					<u-icon name="arrow-right" size="12"></u-icon>
				</view>
			</view>
			<view class="modalBox">
				<view class="orderTop">
					<view class="otTitle">已支付的订单</view>
					<view class="otAll" @click="toOrder(2)">查看全部<u-icon name="arrow-right" color="#999999" size="12"></u-icon>
					</view>
				</view>
				<view class="orderList" v-for="(item,index) in list" :key="index"
					@click="toOrderDetail(item.id,item.type[0])">
					<view class="shopName">
						<image src="../../static/order/shopIco.png" class="shopIco"></image>
						{{item.merchantName}}
						<u-icon name="arrow-right" color="#999999" size="12"></u-icon>
					</view>
					<view class="goodsBox" v-if="item.name">
						<image :src="item.images[0]" class="goodsImg"></image>
						<view class="goodsInfo">
							<view class="goodsName">{{item.name}}</view>
							<!-- <view class="goodsTip">11:00-13:00、17:00-21:30</view> -->
							<view class="goodsP">
								<view class="priceBox">
									<text class="unit">￥</text>
									<text class="price">{{item.payPrice}}</text>
									<text class="num">共{{item.number}}件</text>
								</view>
								<view class="wait">待使用</view>
							</view>
						</view>
					</view>
					<view class="goodsBox" v-else>
						<image :src="items" v-for="(items,indexs) in item.images" :key="indexs" v-show="indexs<4">
							class="goodsImg"></image>
						<view class="goodsInfo">
							<view class="goodsP">
								<view class="priceBox">
									<text class="num">共{{item.number}}件</text>
								</view>
								<view class="wait">待使用</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		editUserInfo
	} from '@/api/user.js'
	import {
		getOrderList
	} from '@/api/order.js'
	export default {
		data() {
			return {
				src: '',
				menuArr: [
					[{
							name: '待付款',
							icon: '../../static/my/1.png',
							type: 1
						},
						{
							name: '已支付',
							icon: '../../static/my/2.png',
							type: 2
						}, {
							name: '已完成',
							icon: '../../static/my/3.png',
							type: 3
						}, {
							name: '已取消',
							icon: '../../static/my/4.png',
							type: 4
						}, {
							name: '全部订单',
							icon: '../../static/my/5.png',
							type: 0
						}
					],
				],
				menuList: [{
						name: '收藏管理',
						img: '../../static/my/wdsc.png'
					},
					{
						name: '我的攻略',
						img: '../../static/my/wdgl.png'
					},
				],
				listQuery: {
					page: 1,
					pageSize: 10,
					status: 1
				},
				list: [],
			}
		},
		computed: mapState(['userInfo', 'wechatUserId']),
		onShow() {
			this.list = []
			this.listQuery.page = 1
			this.getList()
		},
		onPullDownRefresh() {
			this.list = []
			this.listQuery.page = 1
			this.getList()
		},
		onReachBottom() {
			this.listQuery.page++
			this.getList()
		},
		methods: {
			toOrderDetail(id, type) {
				switch (type) {
					case '0':
						uni.navigateTo({
							url: `/pages_minute/orderDetail/cwDetail?id=${id}`
						})
						break;
					case '1':
						uni.navigateTo({
							url: `/pages_minute/orderDetail/cwDetail?id=${id}`
						})
						break;
					case '2':
						uni.navigateTo({
							url: `/pages_minute/orderDetail/hotelDetail?id=${id}`
						})
						break;
					case '3':
						uni.navigateTo({
							url: `/pages_minute/orderDetail/specialtyDetail?id=${id}`
						})
						break;


				}
			},
			async getList() {
				const {
					data
				} = await getOrderList(this.listQuery)
				uni.stopPullDownRefresh()
				this.list = this.list.concat(data.records)
			},
			toDetail(index) {
				if (this.isGetTel() === false) return
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '/pages_minute/writeOffList/writeOffList'
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/pages_minute/collection/collection'
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/pages_minute/myStrategy/myStrategy'
						})
						break;
				}
			},
			toOrder(type) {
				if (this.isGetTel() === false) return
				uni.navigateTo({
					url: `/pages/order/order?type=${type}`
				})
			},
			//校验手机号
			isGetTel() {
				if (!this.userInfo.phone) {
					uni.showModal({
						title: '提示',
						content: '请授权手机号',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/getTel/getTel'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return false
				}
			},
			// 获取用户信息
			getUserProfile() {
				const that = this
				uni.getUserProfile({
					desc: '用于完善用户资料',
					success: async (e) => {
						await editUserInfo({
							avatar: e.userInfo.avatarUrl,
							nickname: e.userInfo.nickName,
							sex: e.userInfo.gender,
							id: that.wechatUserId
						})
						this.$store.dispatch('getUserInfos')
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F4;
	}

	.goodsBox {
		margin-top: 36rpx;
		display: flex;
		align-items: center;

		.goodsInfo {
			display: flex;
			flex-direction: column;
			flex: 1;

			.goodsP {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20rpx;

				.wait {
					font-weight: 500;
					color: #08B761;
					font-size: 24rpx;
				}
			}

			.priceBox {


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

			.goodsName {
				font-weight: 500;
				color: #333333;
				font-size: 26rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.goodsTip {
				font-weight: 400;
				color: #333333;
				font-size: 24rpx;
				margin-top: 16rpx;
			}
		}

		.goodsImg {
			width: 152rpx;
			height: 152rpx;
			border-radius: 24rpx;
			margin-right: 20rpx;
		}
	}

	.orderList {
		padding: 34rpx 0;
		border-bottom: 1px solid #EBEBEB;

		.shopName {
			display: flex;
			align-items: center;
			font-weight: 500;
			color: #333333;
			font-size: 28rpx;

			.shopIco {
				width: 28rpx;
				height: 28rpx;
				margin-right: 16rpx;
			}
		}
	}

	.orderTop {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.otTitle {
			font-weight: 600;
			color: #333333;
			font-size: 30rpx;
		}

		.otAll {
			font-weight: 400;
			color: #999999;
			font-size: 24rpx;
			display: flex;
			align-items: center;
		}
	}

	.modalBox {
		margin-top: 24rpx;
		background: #fff;
		border-radius: 24rpx;
		padding: 36rpx 32rpx;
		box-sizing: border-box;

		.lbL {
			display: flex;
			align-items: center;
			font-weight: 500;
			color: #333333;
			font-size: 28rpx;
		}

		.lineBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 52rpx;

			image {
				width: 44rpx;
				height: 44rpx;
				margin-right: 24rpx;
			}
		}

		.lineBox:last-child {
			margin-bottom: 0;
		}
	}

	.back {
		width: 100%;
		height: 334rpx;
		position: fixed;
		top: 0;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.avatar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
		margin-bottom: 20rpx;

		.avatar-left {
			display: flex;
			align-items: center;

			text {
				margin-left: 20rpx;
				font-size: 36rpx;
				font-weight: 500;
				color: #333;
			}
		}
	}

	.myOrder {
		background-color: #fff;
		padding: 26rpx;
		border-radius: 20rpx;

		.myOrder-text {
			font-size: 30rpx;
			font-weight: 600;
			margin-bottom: 20rpx;
		}

		.scroll-list {
			@include flex(column);

			&__goods-item {
				margin-right: 20px;

				&__image {
					width: 60px;
					height: 60px;
					border-radius: 4px;
				}

				&__text {
					color: #f56c6c;
					text-align: center;
					font-size: 12px;
					margin-top: 5px;
				}
			}

			&__show-more {
				background-color: #fff0f0;
				border-radius: 3px;
				padding: 3px 6px;
				@include flex(column);
				align-items: center;

				&__text {
					font-size: 12px;
					width: 12px;
					color: #f56c6c;
					line-height: 16px;
				}
			}

			&__line {
				@include flex;
				margin-top: 10px;

				&__item {
					margin-right: 15px;
					display: flex;
					flex-wrap: wrap;
					justify-content: center;

					&__image {
						width: 28px;
						height: 28px;
					}

					&__text {
						margin-top: 5px;
						color: $u-menuText-color;
						font-size: 12px;
						font-weight: 500;
						text-align: center;
					}

					&--no-margin-right {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>
