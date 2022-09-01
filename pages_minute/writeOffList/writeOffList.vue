<template>
	<view>
		<uni-nav-bar :statusBar="true" :border="false" leftWidth="460rpx" backgroundColor="#F2F2F4">
			<view slot="left" class="topBox">
				<image src="../../static/jtL.png" class="back" @click="backTap"></image>
				<u-search v-model="listQuery.orderSn" :showAction="false" clearabled placeholder="搜索订单号" bgColor="#fff"
					height="28" @search="searchTap"></u-search>
			</view>
		</uni-nav-bar>
		<view>
			<u-tabs :list="typeList" @click="changeType" lineColor="#08B761"
				:activeStyle="{color:'#08B761',fontSize:'28rpx'}" :inactiveStyle="{color:'#333333',fontSize:'28rpx'}"
				:itemStyle="{width:'25%',height: '42px'}"></u-tabs>
		</view>
		<view class="listBox">
			<view class="list" @click="toDetail(item.type,item.orderParentId,item.id)" v-for="(item,index) in list"
				:key="index">
				<view class="topBox">
					<view class="codeBox" :style="item.couponStatus==='2'?'color:#999999':''">核销码：<text
							:style="item.couponStatus==='2'?'color:#999999':''">{{item.couponInfo.couponNumber}}</text>
					</view>
					<view>{{item.couponStatus==='1'?'待核销':'已核销'}}</view>
				</view>
				<view class="listInfo" v-if="item.name">
					<image :src="item.images[0]"></image>
					<view class="infoR">
						<view class="infoName">{{item.name}}</view>
						<view class="priceBox">
							<text class="unit">￥</text>
							<text class="price">{{item.payPrice}}</text>
							<text class="num">共{{item.number}}件</text>
						</view>
					</view>
				</view>
				<view class="listInfo" v-else>
					<image :src="items" v-for="(items,indexs) in item.images" :key="indexs" v-show="indexs<4"></image>
					<view class="infoR">
						<view class="priceBox">
							<text class="num">共{{item.number}}件</text>
						</view>
					</view>
				</view>
				<view class="botBox">
					<view class="tel">预留号码：{{item.merchantTel}}</view>
					<view class="btnBox" v-show="item.couponStatus==='1'" @click.stop="writeOffTap(item.id)">确认核销</view>
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
		getWriteOfList,
		addWriteOffVoucher
	} from '@/api/writeOff.js'
	export default {
		data() {
			return {
				listQuery: {
					tel: '',
					orderSn: '',
					page: 1,
					pageSize: 10,
					couponStatus: ''
				},
				list: [],
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
		computed: mapState(['userInfo']),
		onShow(options) {
			this.listQuery.tel = this.userInfo.phone
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
			backTap() {
				uni.navigateBack({
					delta: 1
				})
			},
			searchTap() {
				this.list = []
				this.listQuery.page = 1
				this.getList()
			},
			async writeOffTap(id) {
				uni.showModal({
					title: '提示',
					content: '确定核销？',
					success: async (res) => {
						if (res.confirm) {
							await addWriteOffVoucher({
								id: id
							})
							uni.showToast({
								title: '核销成功'
							})
							this.list = []
							this.listQuery.page = 1
							this.getList()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async getList() {
				this.listQuery.couponStatus = this.curt == 0 ? '' : this.curt
				const {
					data
				} = await getWriteOfList(this.listQuery)
				uni.stopPullDownRefresh()
				this.list = this.list.concat(data.records)
			},
			changeType(item) {
				this.curt = item.index
				this.list = []
				this.listQuery.page = 1
				this.getList()
			},
			toDetail(index, id, lId) {
				switch (index) {
					case '0':
						uni.navigateTo({
							url: `/pages_minute/writeOffDetail/cwdetail?id=${id}&lId=${lId}`
						})
						break;
					case '1':
						uni.navigateTo({
							url: `/pages_minute/writeOffDetail/cwdetail?id=${id}&lId=${lId}`
						})
						break;
					case '2':
						uni.navigateTo({
							url: `/pages_minute/writeOffDetail/hotelDetail?id=${id}&lId=${lId}`
						})
						break;
					case '3':
						uni.navigateTo({
							url: `/pages_minute/writeOffDetail/specialtyDetail?id=${id}&lId=${lId}`
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
						-webkit-line-clamp: 2;
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
