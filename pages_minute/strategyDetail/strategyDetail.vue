<template>
	<view>
		<uni-nav-bar :statusBar="true" :border="false" leftWidth="530rpx" backgroundColor="transparent">
			<view slot="left" class="navBox">
				<image src="../../static/jtL.png" class="backImg" @click="backTap"></image>
				<image :src="detail.wechatUserAvatar" class="avaBox"></image>
				<view class="navTitle">{{detail.wechatUserName}}</view>
			</view>
		</uni-nav-bar>
		<u-swiper :list="detail.introductionImg" height="261" radius="12" :autoplay="false" indicator></u-swiper>
		<view class="content">
			<view class="title">{{detail.title}}</view>
			<view class="time">{{detail.createTimeStr}} 
			<!-- · 
			已有125.9w人浏览 -->
			</view>
			<view class="text">
				{{detail.context}}
			</view>
			<view class="replyTitle">评论回复<text>共13.5w条评论</text></view>
			<view class="list" v-for="(item,index) in list" :key="index">
				<image :src="item.userAvatar" class="avaImg"></image>
				<view class="tR">
					<view class="topBox">
						<view>{{item.userName}}<text class="author" v-show="item.identityFlag=='0'">作者</text></view>
						<view>{{item.commentDateStr}}</view>
					</view>
					<view class="replyText">{{item.commentDetails}}</view>
					<!-- <view class="replyUser">
						<image src="../../static/index/menu_4.png" class="avaImg"></image>
						<view class="tR">
							<view class="topBox">
								<view>youke131983hhj<text class="author">作者</text></view>
								<view>06-14</view>
							</view>
							<view class="replyText">想了解一下具体的费用情况</view>
						</view>
					</view> -->
				</view>

			</view>
		</view>
		<view class="botBox">
			<view class="commentBox">
				<image src="../../static/strategy/edit.png"></image>
				<input placeholder="评论一下吧~" @focus="focusTap" v-model="temp.commentDetails" @confirm="confirmTap"/>
			</view>
			<view class="operateBox" v-if="!isFocus">
				<view class="operate">
					<image src="../../static/strategy/zan.png"></image>5.6w
				</view>
				<view class="operate" @click="collectTap">
					<image :src="detail.isKeep?'':'../../static/my/star.png'"></image>5.6w
				</view>
				<view class="operate">
					<image src="../../static/strategy/comment.png"></image>5.6w
				</view>
			</view>
			
		</view>
	</view>


</template>

<script>
	import {getRaiderDetail,addComment,getReplyList} from '@/api/strategy.js'
	import {addFavorite} from '@/api/product.js'
	export default {
		data() {
			return {
				bannerList: [],
				id:'',
				detail:'',
				isFocus:false,
				temp:{
					commentDetails:'',
					raiderId:''
				},
				list:[],
				listQuery: {
					raiderId:'',
					page: 1,
					pageSize: 10,
				}
			}
		},
		onLoad(options){
			this.id=options.id
			this.temp.raiderId=this.id
			this.listQuery.raiderId=this.id
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
			// 收藏
			 async collectTap(){
				 if(this.detail.isKeep){
					// await addFavorite({type:0,specialtyGoodKeep:{specialtyGoodId:this.id}})
					// this.getDetail()
				 }else{
					 await addFavorite({type:1,raiderKeep:{raiderId:this.id}})
					 this.getDetail()
				 }
				
			},
			async getList(){
				const {
					data
				} = await getReplyList(this.listQuery)
				uni.stopPullDownRefresh()
				this.list = this.list.concat(data.records)
			},
			// 评论
			async confirmTap(){
				if(!this.temp.commentDetails){
					uni.$u.toast('请输入内容')
					return
				}
				await addComment(this.temp)
				uni.showToast({
					title: '评论成功'
				})
				this.temp.commentDetails=''
				this.list = []
				this.listQuery.page = 1
				this.getList()
			},
			focusTap(){
				console.log('1')
				this.isFocus=true
			},
			async getDetail(){
				const {data}=await getRaiderDetail({id:this.id})
				this.detail=data
			},
			backTap(){
				uni.navigateBack({
					delta:1
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
		.operateBox{
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

			.replyUser {
				display: flex;
				padding-bottom: 24rpx;
				border-bottom: 1px solid #F7F7F7;

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
