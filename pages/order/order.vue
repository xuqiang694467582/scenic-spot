<template>
	<view>
		<!-- 导航栏 -->
		<!-- <uni-nav-bar :statusBar="true" :border="false" leftWidth="530rpx" backgroundColor="transparent">
			<view slot="left">
				<u-search v-model="keyword" :showAction="false" placeholder="搜索全部订单" bgColor="#fff"></u-search>
			</view>
		</uni-nav-bar> -->

		<u-tabs :list="typeList" @click="changeType" :activeStyle="{ color: 'rgba(8, 183, 97, 1)' }"
			:inactiveStyle="{ color: 'rgba(51, 51, 51, 1)' }" :itemStyle="{width:'14%',height:'80rpx'}"
			lineColor="rgba(8, 183, 97, 1)" :current="curt"></u-tabs>

		<view class="content">
			<view class="listBox" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
				<view class="topBox">
					<view>{{item.placeTimeStr}}</view>
					<view>{{item.statusStr}}</view>
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
				<view class="btnBox"> 
					<view class="cancel" v-show="item.status==='0'" @click.stop="cancelOrder(item.id)">取消订单</view>
					<view v-show="item.status==='0'">支付</view>
					<view v-show="item.status==='1'">取货码</view>
					<!-- <view v-show="item.status==='1'">确认收货</view> -->
				</view>
			</view>
		</view>
		<!-- 取货码 -->
		<!-- <u-popup :show="show" mode="top"  @close="close"  bgColor="transparent">
		    <view class="codeBox">
				<image src="../../static/order/codeBg.png" class="codeBg"></image>
				<view class="codeContent">
					<view class="title">取货码</view>
					<view class="code">0089</view>
					<view class="tip">凭取货码到自提点取货</view>
				</view>
			</view>  
		</u-popup> -->

	</view>
</template>

<script>
	import {
		getOrderList,addOrderCancel
	} from '@/api/order.js'
	export default {
		data() {
			return {
				listQuery: {
					name: '',
					page: 1,
					pageSize: 10,
					status: ''
				},
				list: [],
				typeList: [{
					name: '全部'
				}, {
					name: '待付款'
				}, {
					name: '已支付'
				}, {
					name: '已完成'
				}, {
					name: '已取消'
				}],
				show:false,
				curt:0
			}
		},
		onLoad(options) {
			this.curt=options.type?options.type:0
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
			// 取消订单
			cancelOrder(id){
				uni.showModal({
					title: '提示',
					content: '确定取消',
					success: async (res)=> {
						if (res.confirm) {
							await addOrderCancel({id:id})
							uni.showToast({
								title:'取消成功'
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
				this.listQuery.status=this.curt==0?'':this.curt-1
				const {
					data
				} = await getOrderList(this.listQuery)
				uni.stopPullDownRefresh()
				this.list = this.list.concat(data.records)
			},
			toDetail(id) {
				uni.navigateTo({
					url: `/pages_minute/orderDetail/orderDetail?id=${id}`
				})
			},
			changeType(item) {
				this.curt = item.index
				this.list = []
				this.listQuery.page = 1
				this.getList()
			}
		}
	}
</script>

<style lang="scss">
	.codeBox{
		width: 596rpx;
		height: 390rpx;
		margin: 50% auto 0 auto;
		position: relative;
		.codeBg{
			width: 100%;
			height: 100%;
		}		
		.codeContent{
			position: absolute;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			z-index: 111;
			top: 0;
			left: 0;
			.tip{
				margin-top: 26rpx;
				font-weight: 400;
				color: #999999;
				font-size: 24rpx;
			}
			.code{
				font-size: 72rpx;
				font-weight: bold;
				color: #333333;
				margin-top: 38rpx;
			}
			.title{
				width: 526rpx;
				height: 136rpx;
				line-height: 156rpx;
				text-align: center;
				font-weight: 600;
				color: #333333;
				font-size: 40rpx;
				border-bottom: 1px dashed #ccc;
			}
		}
	}
	.content {
		padding: 24rpx;
		box-sizing: border-box;

		.listBox {
			margin-bottom: 20rpx;
			background-color: #fff;
			padding: 36rpx 26rpx 28rpx 36rpx;
			box-sizing: border-box;

			.btnBox {
				display: flex;
				justify-content: flex-end;
				margin-top: 42rpx;

				view {
					width: 152rpx;
					height: 64rpx;
					border-radius: 100rpx;
					text-align: center;
					line-height: 64rpx;
					font-size: 26rpx;
					border: 1px solid #08B761;
					color: #08B761;
					margin-left: 16rpx;
				}

				.cancel {
					border: 1px solid #999;
					color: #999999;
					
				}
			}

			.listInfo {
				display: flex;
				align-items: center;
				display: flex;
				margin-top: 24rpx;

				.infoR {
					display: flex;
					flex: 1;
					margin-left: 16rpx;
					flex-direction: column;

					.priceBox {
						margin-top: 20rpx;

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
			}
		}
	}

	page {
		background: rgba(243, 243, 243, 1);
	}
</style>
