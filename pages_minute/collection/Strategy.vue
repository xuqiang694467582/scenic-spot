<template>
	<view class="content">
		<view class="listBox" v-for="(item,index) in list" :key="index" @click="toDetail(item.keepRaider.id)">
			<view class="topBox">
				<view class="avaBox">
					<image :src="item.keepRaider.wechatUserAvatar"></image>
					<view>{{item.keepRaider.wechatUserName}}</view>
				</view>
				<image src="../../static/my/starA.png" class="star" @click="cancelTap(item.id)"></image>
			</view>
			<view>
				<view class="title">{{item.keepRaider.title}}</view>
				<view class="info">{{item.keepRaider.context}}</view>
				<view class="imgBox">
					<image :src="items" v-for="(items,indexs) in item.keepRaider.introductionImg" :key="indexs" v-show="indexs<4"></image>
					<view class="imgNum" v-show="item.keepRaider.introductionImg.length>4">{{item.keepRaider.introductionImg.length}}图</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getKeepList,
		addFavoriteCancel
	} from '@/api/product.js'
	export default {
		data() {
			return {
				isEdit: false,
				listQuery: {
					type: 1,
					page: 1,
					pageSize: 10
				},
				list: [],
				total: 0,
				isAllSelect: false
			}
		},
		created() {
			this.list = []
			this.listQuery.page = 1
			this.getList()
		},
		methods: {
			toDetail(id){
				uni.navigateTo({
					url:`/pages_minute/strategyDetail/strategyDetail?id=${id}`
				})
			},
			pullDownRefresh() {
				this.list = []
				this.listQuery.page = 1
				this.getList()
			},
			reachBottom() {
				this.listQuery.page++
				this.getList()
			},
			// 取消收藏
			async cancelTap(id) {				
				await addFavoriteCancel({
					ids: [id]
				})
				uni.showToast({
					title: '取消成功'
				})
				this.list = []
				this.listQuery.page = 1
				this.getList()
			},
			allSelect() {
				this.isAllSelect = !this.isAllSelect
				this.list.forEach(item => {
					item.checked = this.isAllSelect
				})
			},
			// 选择
			selectTap(index) {
				this.list[index].checked = !this.list[index].checked
				this.$forceUpdate()
				console.log(this.list)
			},
			// 编辑
			editTap() {
				this.isAllSelect = false
				this.isEdit = true
				this.list.forEach((item) => {
					item.checked = false
				})
			},
			async getList() {
				const {
					data
				} = await getKeepList(this.listQuery)
				uni.stopPullDownRefresh()
				this.list = this.list.concat(data.records)
				this.total = data.total
			},
		}
	}
</script>


<style scoped lang="scss">
	.listBox {
		margin-top: 24rpx;
		border-radius: 24rpx;
		background: #FFFFFF;
		padding: 28rpx 24rpx 32rpx 24rpx;
		box-sizing: border-box;

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
</style>
