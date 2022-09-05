<template>
	<view class="content">
		<view class="listBox" v-for="(item,index) in list" :key="index">
			<image :src="item.coverImg" class="img"></image>
			<view class="goodsInfo">
				<view class="name">{{item.name}}</view>
				<view class="info">{{item.introduce}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getFeatureList
	} from '@/api/index.js'
	export default {
		data() {
			return {
				listQuery: {
					amusementId: '',
					page: 1,
					pageSize: 10,
				},
				list:[]
			}
		},
		onLoad(options){
			this.listQuery.amusementId=options.id
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
			async getList() {
				const {
					data
				} = await getFeatureList(this.listQuery)
				uni.stopPullDownRefresh()
				this.list = this.list.concat(data.records)
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 32rpx;
		box-sizing: border-box;
	}
	.listBox {
		display: flex;
		align-items: center;
		margin-bottom: 48rpx;
		.goodsInfo {
			display: flex;
			flex: 1;
			margin-left: 20rpx;
			flex-direction: column;
			.name {
				font-size: 32rpx;
				font-weight: 600;
				color: #333333;
			}
			.info {
				font-size: 28rpx;
				font-weight: 500;
				color: #999;
				margin-top: 16rpx;
			}
			}
		.img {
			width: 192rpx;
			height: 192rpx;
			border-radius: 24rpx;
		}
	}
</style>
