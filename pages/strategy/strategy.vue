<template>
	<view class="content">
		<view class="listBox" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
			<view class="topBox">
				<view class="avaBox">
					<image :src="item.wechatUserAvatar"></image>
					<view>{{item.wechatUserName}}</view>
				</view>
				<!-- <image src="../../static/my/starA.png" class="star"></image> -->
			</view>
			<view class="infoBox">
				<view class="title">{{item.title}}</view>
				<view class="info">{{item.context}}</view>
				<view class="imgBox">
					<image :src="items" v-for="(items,indexs) in item.introductionImg" :key="index" v-show="indexs<4">
					</image>
					<view class="imgNum" v-show="item.introductionImg.length>4">{{item.introductionImg.length}}图</view>
				</view>
			</view>
			<view class="botBox">
				<view class="time">{{item.createTimeStr}}</view>
				<view class="operate">
					<!-- <view class="operateBox">
						<image src="../../static/strategy/zan.png"></image>25.6w
					</view> -->
					<view class="operateBox">
						<image src="../../static/strategy/comment.png"></image>{{item.commentReplyCount}}
					</view>
				</view>
			</view>
		</view>
		<image src="../../static/strategy/release.png" class="release" @click="releaseTap"></image>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		getRaider
	} from '@/api/strategy.js'
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
		onLoad() {
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
		computed: mapState(['userInfo','scenicData']),
		watch: {
		    scenicData:function(newData, oldData) {
				this.listQuery.attractionId=this.scenicData.id
				this.list = []
				this.listQuery.page = 1
				this.getList()
		    }
		  },
		methods: {
			//校验是否授权用户信息
			isUser() {
				if (!this.userInfo.nickname) {
					uni.showModal({
						title: '提示',
						content: '请授权用户信息',
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url:'/pages/my/my'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return false
				}
			},
			async getList() {
				const {
					data
				} = await getRaider(this.listQuery)
				uni.stopPullDownRefresh()
				this.list = this.list.concat(data.records)
			},
			toDetail(id) {
				if (this.isUser() === false) return
				uni.navigateTo({
					url: `/pages_minute/strategyDetail/strategyDetail?id=${id}`
				})
			},
			releaseTap() {
				if (this.isUser() === false) return
				uni.navigateTo({
					url: '/pages_minute/releaseStrategy/releaseStrategy'
				})
			}
		}
	}
</script>

<style lang="scss">
	.release {
		position: fixed;
		width: 120rpx;
		height: 120rpx;
		right: 24rpx;
		bottom: 40rpx;
	}

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

			.operate {
				display: flex;
				align-items: center;
				font-weight: 400;
				color: #999999;
				font-size: 28rpx;

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
			margin-top: 22rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}

		.topBox {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #F7F7F7;
			padding-bottom: 24rpx;
			justify-content: space-between;

			.star {
				width: 48rpx;
				height: 48rpx;
			}

			.avaBox {
				display: flex;
				align-items: center;
				font-weight: 600;
				color: #333333;
				font-size: 30rpx;

				image {
					width: 72rpx;
					height: 72rpx;
					border-radius: 160rpx;
					margin-right: 20rpx;
				}
			}
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
