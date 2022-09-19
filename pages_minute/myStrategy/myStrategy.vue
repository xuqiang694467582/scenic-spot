<template>
	<view class="content">
		<view v-if="list.length>0">
			<view class="listBox" v-for="(item,index) in list" :key="index" @click="toDetail(item.id,item)">
				<view class="infoBox">
					<view class="title">{{item.title}}</view>
					<view class="info">{{item.context}}</view>
					<view class="imgBox">
						<image :src="items" v-for="(items,indexs) in item.introductionImg" :key="index"
							v-show="indexs<4"></image>
						<view class="imgNum" v-show="item.introductionImg.length>4">{{item.introductionImg.length}}图
						</view>
					</view>
				</view>
				<view class="botBox">
					<view class="botL">
						<view class="state" style="background: #FEBD26;" v-show="item.state==='1'">审核中</view>
						<view class="state" style="background: #08B761" v-show="item.state==='2'">审核通过</view>
						<view class="state" style="background: #C9C9C9" v-show="item.state==='3'">审核失败</view>
						<view class="time">{{item.createTimeStr.slice(0,10)}}</view>
					</view>				
					<view class="operate" >
						<view class="operateBox" @click.stop="editTap(item.id)" v-if="item.state==='3'">
							<image src="../../static/strategy/editor.png"></image>
						</view>
						<view class="operateBox" @click.stop="delTap(item.id)">
							<image src="../../static/strategy/del.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png" text="暂无数据" v-else>
		</u-empty>

	</view>
</template>

<script>
	import {
		getRaiderMyself,
		delRaider
	} from '@/api/strategy.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				listQuery: {
					page: 1,
					pageSize: 10,
					attractionId:''
				},
				list: [],
			}
		},
		onShow() {
			this.listQuery.attractionId=this.scenicData.id
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
		computed: mapState(['scenicData']),
		methods: {
			...mapMutations(['SET_ORDERDATA']),
			editTap(id) {
				uni.navigateTo({
					url: `/pages_minute/releaseStrategy/releaseStrategy?id=${id}`
				})
			},
			delTap(id) {
				uni.showModal({
					title: '提示',
					content: '确定删除',
					success: async (res) => {
						if (res.confirm) {
							await delRaider(id)
							uni.showToast({
								title: '删除成功'
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
				const {
					data
				} = await getRaiderMyself(this.listQuery)
				uni.stopPullDownRefresh()
				this.list = this.list.concat(data.records)
			},
			toDetail(id,item) {
				switch(item.state){
					case '1':
						uni.navigateTo({
							url:'/pages_minute/myStrategy/wait'
						})
					break;
					case '2':
						uni.navigateTo({
							url: `/pages_minute/strategyDetail/strategyDetail?id=${id}`
						})
					break;
					case '3':
					this.SET_ORDERDATA(item)
						uni.navigateTo({
							url: '/pages_minute/myStrategy/fail'
						})
					break;
				}
				
			},

		}
	}
</script>

<style lang="scss">
	.listBox {
		margin-top: 24rpx;
		border-radius: 24rpx;
		background: #FFFFFF;
		padding: 28rpx 24rpx 32rpx 24rpx;
		box-sizing: border-box;

		.botBox {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 28rpx;
			.botL{
				display: flex;
				align-items: center;
				.state{
					width: 136rpx;
					height: 48rpx;
					border-radius: 12rpx;
					text-align: center;
					line-height: 48rpx;
					font-weight: 400;
					color: #FFFFFF;
font-size: 26rpx;
margin-right: 16rpx;
				}
			}
			.operate {
				display: flex;
				align-items: center;

				.operateBox {
					display: flex;
					align-items: center;
					margin-left: 32rpx;
				}

				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 8rpx;
				}
			}

			.time {
				font-weight: 400;
				color: #999999;
				font-size: 30rpx;
			}
		}

		.infoBox {
			border-bottom: 1px solid #F7F7F7;
			padding-bottom: 26rpx;
		}

		.imgBox {
			display: flex;
			margin-top: 20rpx;
			position: relative;

			.imgNum {
				width: 48rpx;
				height: 38rpx;
				background: rgba(0, 0, 0, 0.6);
				border-radius: 8rpx;
				font-weight: 400;
				color: #FFFFFF;
				font-size: 24rpx;
				right: 8rpx;
				bottom: 8rpx;
				position: absolute;
				text-align: center;
				line-height: 38rpx;
			}

			image {
				width: 152rpx;
				height: 152rpx;
				border-radius: 12rpx;
				margin-right: 20rpx;
			}

			image:last-child {
				margin-right: 0rpx;
			}
		}

		.info {
			font-weight: 400;
			color: #333333;
			font-size: 24rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;

			line-height: 44rpx;
			margin-top: 16rpx;
		}

		.title {
			font-weight: 500;
			color: #333333;
			font-size: 32rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}

	}

	.content {
		padding: 0 24rpx;
		box-sizing: border-box;
	}

	page {
		background: #F4F4F4;
	}
</style>
