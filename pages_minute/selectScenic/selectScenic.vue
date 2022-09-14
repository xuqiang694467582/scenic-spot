<template>
	<view class="content">
		<view class="topBox">
			<u-search v-model="listQuery.name" borderColor="#08B761" placeholder="搜索景区名称" bgColor="#fff" searchIconColor="#999999" height="34"
				:actionStyle="{
background: '#08B761',width: '132rpx',height: '72rpx',borderRadius: '100rpx',position: 'absolute',fontSize: '26rpx',color:'#fff',textAlign: 'center',lineHeight:'72rpx',right:'30rpx',top:'33rpx'}" @custom="searchTap">
			</u-search>
			<view class="title">推荐景区</view>
			<view class="recommend">
				<view v-for="(item,index) in recommendList" :key="index"  @click="select(item)">{{item.name}}</view>
			</view>
			<view class="title" style="margin-top: 50rpx;">景区列表</view>
		</view>
		<view class="list" v-for="(item,index) in list" :key="index" @click="select(item)">{{item.name}}</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import {
		soptList,getAttractionRecommend
	} from '@/api/parktour.js'
	export default {
		data() {
			return {
				listQuery: {
					name: '',
					page: 1,
					pageSize: 20,
				},
				list: [],
				recommendList:[]
			}
		},
		onShow() {
			this.list = []
			this.listQuery.page = 1
			this.getList()
			this.getRecommend()
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
			...mapMutations(['SET_SCENICDATA']),
			 async getRecommend(){
				const {
					data
				} = await getAttractionRecommend()
				this.recommendList=data
			},
			select(item){
				this.SET_SCENICDATA(item)
				uni.navigateBack({
					delta:1
				})
			},
			searchTap(){
				this.list = []
				this.listQuery.page = 1
				this.getList()
			},
			async getList() {
				const {
					data
				} = await soptList(this.listQuery)
				uni.stopPullDownRefresh()
				this.list = this.list.concat(data.records)
			},
		}
	}
</script>

<style lang="scss">
	.list {
		padding: 24rpx 32rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F2F2F2;
		font-weight: 400;
		color: #333333;
		font-size: 28rpx;
	}

	.recommend {
		margin-top: 32rpx;
		display: flex;
		flex-wrap: wrap;

		view {
			height: 52rpx;
			background: #F0F0F0;
			border-radius: 12rpx;
			margin-bottom: 24rpx;
			font-weight: 400;
			color: #666666;
			font-size: 26rpx;
			line-height: 52rpx;
			padding: 0 24rpx;
			margin-right: 16rpx;
		}
	}

	.title {
		font-weight: 500;
		color: #333333;
		font-size: 32rpx;
		margin-top: 42rpx;
	}

	.topBox {
		padding: 32rpx;
		box-sizing: border-box;
		position: relative;


	}
</style>
