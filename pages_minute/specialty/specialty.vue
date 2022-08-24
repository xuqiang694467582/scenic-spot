<template>
	<view>
		<uni-nav-bar :statusBar="true" :border="false" leftWidth="460rpx" backgroundColor="#fff">
			<view slot="left">
				<u-search v-model="listQuery.name" :showAction="false" clearabled placeholder="搜索特产商品" bgColor="#fff" borderColor="rgba(60, 180, 82, 1)" height="28" @search="searchTap"></u-search>
			</view>
		</uni-nav-bar>
		<view class="content">
			<view class="list" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
				<image :src="item.mainImage" class="goodsImg"></image>
				<view class="infoBox">
					<view class="name">{{item.name}}</view>
					<view class="priceBox">
						<view class="price"><text>￥</text>{{item.price}}</view>
						<!-- <view class="sale">已售1000+</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getSpecialtyGood} from '@/api/specialty.js'
	export default {
		data() {
			return {
				listQuery:{
					name:'',
					page :1,
					pageSize:10
				},
				list:[]
			}
		},
		onLoad() {
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
			searchTap(){
				this.list = []
				this.listQuery.page = 1
				this.getList()
			},
			async getList(){
				const {data}=await getSpecialtyGood(this.listQuery)
				uni.stopPullDownRefresh()
				this.list = this.list.concat(data.records)
			},
			toDetail(item){
				uni.navigateTo({
					url:`/pages_minute/specialtyDetail/specialtyDetail?id=${item.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 24rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.list{
			background: #FFFFFF;
			border-radius: 24rpx;
			width: 344rpx;
			padding-bottom: 16rpx;
			margin-bottom: 24rpx;
			.infoBox{
				padding: 16rpx 14rpx 0 14rpx;
				box-sizing: border-box;
				.priceBox{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 22rpx;
					.sale{
						font-weight: 400;
						color: #999999;
						font-size: 24rpx;
					}
					.price{
						font-size: 30rpx;
						color: rgba(240, 26, 26, 1);
						font-weight: bold;
						text{
							font-size: 26rpx;
						}
					}
				}
				.name{
					font-size: 26rpx;
					font-weight: 500;
					color: #202020;
					overflow: hidden; 				
					text-overflow: ellipsis; 			
					display: -webkit-box;			
					-webkit-line-clamp: 1; 			
					-webkit-box-orient: vertical;

				}
			}
			.goodsImg{
				width: 344rpx;
				height: 340rpx;
				border-radius: 24rpx;
			}
		}
	}
page{
	background: rgba(244, 244, 244, 1);
}
</style>
