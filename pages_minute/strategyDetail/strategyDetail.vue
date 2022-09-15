<template>
	<view>
		<uni-nav-bar :statusBar="true" :border="false" leftWidth="530rpx" backgroundColor="transparent">
			<view slot="left" class="navBox">
				<image src="../../static/jtL.png" class="backImg" @click="backTap"></image>
				<image :src="detail.wechatUserAvatar" class="avaBox"></image>
				<view class="navTitle">{{detail.wechatUserName}}</view>
			</view>
		</uni-nav-bar>
		<u-swiper :list="detail.introductionImg" height="261" radius="12" :autoplay="false" indicator
			v-if="detail.introductionImg.length>0"></u-swiper>
		<view class="content">
			<view class="title">{{detail.title}}</view>
			<view class="time">{{detail.createTimeStr}}
				·
				已有{{detail.pageViews}}人浏览
			</view>
			<view class="text">
				{{detail.context}}
			</view>
			<view class="replyTitle">评论回复<text>共{{detail.commentReplyCount}}条评论</text></view>
			<view class="list" v-for="(item,index) in list" :key="index">
				<image :src="item.userAvatar" class="avaImg"></image>
				<view class="tR">
					<view class="topBox">
						<view>{{item.userName}}<text class="author" v-if="item.identityFlag=='0'">作者</text></view>
						<view style="font-size: 26rpx;">{{item.commentDateStr}}</view>
					</view>
					<view class="replyText" @click="replyTap(item.id)">{{item.commentDetails}}</view>
					<view class="replyChild">
						<view class="replyUser" v-for="(items,indexs) in item.children" :key="indexs">
							<image :src="items.userAvatar" class="avaImg"></image>
							<view class="tR">
								<view class="topBox">
									<view>{{items.userName}}<text class="author"
											v-if="items.identityFlag=='0'">作者</text></view>
									<view style="font-size: 26rpx;">{{items.commentDateStr}}</view>
								</view>
								<view class="replyText">{{items.commentDetails}}</view>
							</view>
						</view>
						<view class="more" @click="moreTap(item.id,index)"
							v-if="item.replyCount>0&&item.isMore===false">
							<view class="heng"></view>
							<text>展开更多回复</text>
							<u-icon name="arrow-down" color="#333333" size="12"></u-icon>
						</view>
					</view>


				</view>

			</view>
		</view>
		<view class="botBox">
			<view class="commentBox">
				<image src="../../static/strategy/edit.png"></image>
				<input placeholder="评论一下吧~" @click="isReptrue=false" @focus="focusTap" v-model="temp.commentDetails"
					@confirm="confirmTap" :focus="isFocus" @blur="blurTap" />
			</view>
			<view class="operateBox" v-if="!isFocus">
				<!-- <view class="operate">
					<image src="../../static/strategy/zan.png"></image>5.6w
				</view> -->
				<view class="operate" @click="collectTap">
					<image :src="detail.isKeep?'../../static/my/starA.png':'../../static/my/star.png'"></image>
					{{detail.keepRaiderCount}}
				</view>
				<view class="operate">
					<image src="../../static/strategy/comment.png"></image>{{detail.commentReplyCount}}
				</view>
			</view>

		</view>
	</view>


</template>

<script>
	import {
		getRaiderDetail,
		addComment,
		getReplyList,
		addReply,
		getReply
	} from '@/api/strategy.js'
	import {
		addFavorite,
		addFavoriteCancel
	} from '@/api/product.js'
	export default {
		data() {
			return {
				bannerList: [],
				id: '',
				detail: '',
				isFocus: false,
				temp: {
					commentDetails: '',
					raiderId: ''
				},
				list: [],
				listQuery: {
					raiderId: '',
					page: 1,
					pageSize: 10,
				},
				isReply: false, //当前是否是回复
				replyTemp: {
					commentDetails: '',
					raiderId: '',
					id: ''
				},
				// replyListQuery: {
				// 	id: '',
				// 	page: 1,
				// 	pageSize: 10,
				// },
			}
		},
		onLoad(options) {
			this.id = options.id
			this.temp.raiderId = this.id
			this.listQuery.raiderId = this.id
			this.replyTemp.raiderId = this.id
			this.getDetail()
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
			// 回复列表
			async moreTap(id, index) {
				const replyListQuery = this.list[index].replyListQuery
				const {
					data
				} = await getReply(replyListQuery)
				data.forEach(item => {
					item.commentDateStr = item.commentDateStr.slice(5, 10)
				})
				this.list[index].children = data
				this.list[index].isMore = true
			},
			// 回复
			replyTap(id) {
				this.isFocus = true
				this.isReptrue = true
				this.replyTemp.id = id
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
						type: 1,
						raiderKeep: {
							raiderId: this.id
						}
					}]
					await addFavorite({keepInfoList:params})
					this.getDetail()
				}

			},
			// 评论列表
			async getList() {
				const {
					data
				} = await getReplyList(this.listQuery)
				uni.stopPullDownRefresh()
				data.records.forEach(item => {
					item.replyListQuery = {
						id: item.id,
					}
					item.isMore = false
					item.commentDateStr = item.commentDateStr.slice(5, 10)

					if (item.children) {
						item.children.forEach(items => {
							items.commentDateStr = items.commentDateStr.slice(5, 10)
						})
					}

				})
				this.list = this.list.concat(data.records)
			},
			// 评论
			async confirmTap() {
				if (this.isReptrue) { //回复
					this.replyData()
				} else {
					this.commentData()
				}

			},
			async replyData() {
				if (!this.temp.commentDetails) {
					uni.$u.toast('请输入回复内容')
					return
				}
				this.replyTemp.commentDetails = this.temp.commentDetails
				await addReply(this.replyTemp)
				uni.showToast({
					title: '回复成功'
				})
				this.temp.commentDetails = ''
				this.list = []
				this.listQuery.page = 1
				this.getList()
			},
			async commentData() {
				if (!this.temp.commentDetails) {
					uni.$u.toast('请输入内容')
					return
				}
				await addComment(this.temp)
				uni.showToast({
					title: '评论成功'
				})
				this.temp.commentDetails = ''
				this.list = []
				this.listQuery.page = 1
				this.getList()
			},

			// 评论获取焦点
			focusTap() {
				this.isFocus = true
				this.isReply = false
			},
			blurTap() {
				this.isFocus = false
				this.isFocus = false
			},
			async getDetail() {
				const {
					data
				} = await getRaiderDetail({
					id: this.id
				})
				this.detail = data
			},
			backTap() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.botBox {
		width: 100%;
		height: 120rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;



		.operateBox {
			display: flex;
			align-items: center;
		}

		.operate {
			display: flex;
			align-items: center;
			font-size: 26rpx;
			font-weight: 500;
			color: #333333;
			margin-right: 16rpx;

			image {
				width: 42rpx;
				height: 42rpx;
				margin-right: 12rpx;
			}
		}

		.commentBox {
			margin-left: 34rpx;
			display: flex;
			flex: 1;
			height: 64rpx;
			background: #F6F6F6;
			border-radius: 100rpx;
			display: flex;
			align-items: center;
			padding-left: 32rpx;
			font-size: 28rpx;
			margin-right: 18rpx;

			image {
				width: 24rpx;
				height: 24rpx;
				margin-right: 14rpx;
			}

			input {
				width: 70%;
			}
		}
	}

	page {
		padding-bottom: 120rpx;
	}

	.list {
		margin-bottom: 24rpx;
		display: flex;

		.tR {
			margin-left: 20rpx;
			display: flex;
			flex: 1;
			flex-direction: column;
			font-weight: 400;
			color: #999999;
			font-size: 28rpx;

			.author {
				width: 68rpx;
				height: 36rpx;
				background: #EFEFEF;
				display: inline-block;
				border-radius: 12rpx;
				font-weight: 500;
				color: #666666;
				font-size: 24rpx;
				text-align: center;
				line-height: 36rpx;
				margin-left: 16rpx;
			}

			.more {
				display: flex;
				align-items: center;
				font-weight: 500;
				color: #333333;
				font-size: 30rpx;

				text {
					margin-right: 16rpx;
				}

				.heng {
					width: 60rpx;
					height: 1px;
					background: #E8E8E8;
					margin-right: 14rpx;
				}
			}

			.replyChild {
				border-bottom: 1px solid #F7F7F7;
				padding-bottom: 24rpx;
			}

			.replyUser {
				display: flex;



			}

			.replyText {
				font-weight: 400;
				color: #333333;
				font-size: 30rpx;
				margin-top: 10rpx;
				margin-bottom: 28rpx;
			}

			.topBox {
				display: flex;
				flex: 1;
				justify-content: space-between;
			}
		}

		.avaImg {
			width: 64rpx;
			height: 64rpx;
			border-radius: 100%;
		}
	}

	.replyTitle {
		font-weight: 500;
		color: #333333;
		font-size: 30rpx;
		margin-top: 16rpx;
		margin-bottom: 56rpx;

		text {
			font-weight: 400;
			color: #666666;
			font-size: 28rpx;
			margin-left: 16rpx;
		}
	}

	.content {
		padding: 24rpx;
		box-sizing: border-box;

		.text {
			font-weight: 400;
			color: #333333;
			line-height: 44rpx;
			font-size: 28rpx;
			border-bottom: 1px solid #F7F7F7;
			padding-bottom: 24rpx;
			margin-top: 24rpx;
		}

		.time {
			font-weight: 400;
			color: #999999;
			font-size: 26rpx;
			margin-top: 20rpx;
		}

		.title {
			font-weight: 600;
			color: #333333;
			font-size: 36rpx;
		}
	}

	.navBox {
		display: flex;
		align-items: center;

		.backImg {
			width: 32rpx;
			height: 32rpx;
		}

		.avaBox {
			width: 64rpx;
			height: 64rpx;
			margin-left: 24rpx;
			border-radius: 64rpx;
		}

		.navTitle {
			font-weight: 500;
			color: #333333;
			font-size: 34rpx;
			margin-left: 16rpx;
			display: flex;
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}
	}
</style>
