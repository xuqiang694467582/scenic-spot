<template>
	<view class="cont">
		<view class="cont-list" v-for="(item, index) in list" :key="index" @click="gotoState(item.state)">
			<image :src="item.coverImg"></image>
			<view class="cont-list-left">
				<text>{{ item.merchantInfo && item.merchantInfo.name }}</text>
				<view class="cont-list-left-tag">
					<u-tag v-if="item.state == '1'" :text="item.stateStr" bgColor="#FEBD26" borderColor="#FEBD26"></u-tag>
					<u-tag v-if="item.state == '2'" :text="item.stateStr" bgColor="#08B761" borderColor="#08B761"></u-tag>
					<u-tag v-if="item.state == '3'" :text="item.stateStr" bgColor="#C9C9C9" borderColor="#C9C9C9"></u-tag>
				</view>
			</view>
		</view>
		<view v-if="list.length === 0" class="emptys">
			<u-empty mode="list" text="暂无入驻，请先申请入驻"></u-empty>
		</view>
		<view class="btn">
			<u-button color="#08B761" text="申请入驻" @click="gotoSettled"></u-button>
		</view>
	</view>
</template>

<script>
	import { auditSettled } from '@/api/settled.js';
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				list: [],
				listQuery: {
					page: 1,
					pageSize: 10,
				},
			}
		},
		computed: mapState(['scenicData']),
		onLoad() {
			this.load()
		},
		onPullDownRefresh() {
			this.listQuery.page = 1;
			this.load();
		},
		onReachBottom(){
			this.listQuery.page++
			this.load()
		},
		methods: {
			async load(){
				this.list = [];
				const { data } = await auditSettled({
					attractionId: this.scenicData.id,
					...this.listQuery
				})
				uni.stopPullDownRefresh();
				this.list = this.list.concat(data.records);
			},
			// 查看状态
			gotoState(type){
				uni.navigateTo({
					url: `/pages_minute/settledState/settledState?type=${type}`
				})
			},
			// 申请入驻
			gotoSettled(){
				uni.navigateTo({
					url: '/pages_minute/addSettled/addSettled'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #fafafa;
	
	.cont{
		padding: 26rpx 24rpx;
		padding-bottom: 150rpx;
		
		&-list{
			padding: 30rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			margin-bottom: 26rpx;
			
			image{
				width: 116rpx;
				height: 116rpx;
				margin-right: 24rpx;
			}
			
			&-left{
				height: 116rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				
				text{
					font-size: 30rpx;
					color: #333;
				}
				
				&-tag{
					display: flex;
				}
			}
		}
		
		.emptys{
			margin-top: 12rem;
		}
		
		.btn{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			padding: 0 24rpx 40rpx 24rpx;
			z-index: 1;
		}
	}
}
</style>
