<template>
	<view class="content">
		<view class="listBox" v-for="(item,index) in list" :key="index" @click="toDetail(item.keepSpecialty.specialtyId)">
			<image :src="item.keepSpecialty.specialtyCoverImage"></image>
			<view>
				<view class="shopName">{{item.keepSpecialty.specialtyName}}</view>
				<view class="collectNum">已有{{item.keepSpecialty.specialtyKeepCount}}人收藏店铺</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getKeepList
	} from '@/api/product.js'
	export default {
		data() {
			return {			
				listQuery: {
					type: 2,
					page: 1,
					pageSize: 10
				},
				list: [],	
			}
		},
		created() {
			this.list = []
			this.listQuery.page = 1
			this.getList()
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: `/pages_minute/specialtyShop/specialtyShop?id=${id}`
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
	.content {
		padding: 0 24rpx;
		box-sizing: border-box;
	
	.listBox {
			margin-top: 20rpx;
			background: #fff;
			padding: 30rpx 24rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			border-radius: 24rpx;
			.collectNum {
				font-weight: 400;
				color: #999999;
				font-size: 26rpx;
				margin-top: 24rpx;
			}

			.shopName {
				font-weight: 500;
				color: #333333;
				font-size: 30rpx;
			}

			image {
				width: 116rpx;
				height: 116rpx;
				border-radius: 12rpx;
				margin-right: 28rpx;
			}
		}
	}
</style>
