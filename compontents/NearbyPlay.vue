<template>
	<view class="mouduleBox">
		<view class="title">附近吃喝玩乐</view>
		<view class="typeBox">
			<view v-for="(item,index) in typeList" :key="index" :class="index==curt?'active':''"
				@click="changeType(index)">{{item}}</view>
		</view>
		<view class="listBox" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
			<image :src="item.coverImg" class="img"></image>
			<view class="goodsInfo">
				<view class="name">{{item.name}}</view>
				<view class="grade">{{item.score}}分</view>
				<view class="tag">
					<view v-for="(items,indexs) in item.label" :key="indexs">{{items}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		soptList,
		diningList,
		hotelList,
		mentList
	} from '@/api/parktour.js';
	export default {
		data() {
			return {
				typeList: ['景点', '美食', '酒店', '娱乐'],
				curt: 0,
				listQuery: {
					page: 1,
					pageSize: 10
				},
				list: []
			}
		},
		created() {
			this.getList()
		},
		methods: {
			toDetail(id) {
				switch (this.curt) {
					case 0:
						uni.redirectTo({
							url: `/pages_minute/parktourDetail/parktourDetail?id=${id}`
						})
						break;
					case 1:
						uni.redirectTo({
							url: `/pages_minute/diningDetail/diningDetail?id=${id}`
						})
						break;
					case 2:
						uni.redirectTo({
							url: `/pages_minute/hotelDetail/hotelDetail?id=${id}`
						})
						break;
					case 3:
						uni.redirectTo({
							url: `/pages_minute/entertainmentDetail/entertainmentDetail?id=${id}`
						})
				}
			},
			async getList() {
				if (this.curt === 0) {
					const {
						data
					} = await soptList(this.listQuery)
					this.list = data.records
				} else if (this.curt == 1) {
					const {
						data
					} = await diningList(this.listQuery)
					this.list = data.records
				} else if (this.curt == 2) {
					const {
						data
					} = await hotelList(this.listQuery)
					this.list = data.records
				} else if (this.curt == 3) {
					const {
						data
					} = await mentList(this.listQuery)
					this.list = data.records
				}
			},
			changeType(index) {
				this.curt = index
				this.getList()
			}
		}
	}
</script>

<style scoped lang="scss">
	.mouduleBox {
		width: 100%;
		border-radius: 24rpx;
		background: #fff;
		padding: 30rpx 32rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;

		.listBox {
			display: flex;
			align-items: center;
			margin-top: 48rpx;

			.goodsInfo {
				display: flex;
				flex: 1;
				margin-left: 20rpx;
				flex-direction: column;

				.tag {
					display: flex;
					margin-top: 24rpx;
					overflow: hidden;

					view {
						height: 46rpx;
						background: #EDF8EF;
						border-radius: 8rpx;
						border: 1px solid #08B761;
						padding: 0 16rpx;
						line-height: 46rpx;
						font-weight: 400;
						color: #08B761;
						font-size: 24rpx;
						margin-right: 16rpx;
					}
				}

				.grade {
					width: 88rpx;
					height: 44rpx;
					background: linear-gradient(180deg, #F3982B 0%, #FF533E 100%);
					border-radius: 12rpx 0px 12rpx 0px;
					font-weight: 500;
					color: #FFFFFF;
					font-size: 24rpx;
					margin-top: 24rpx;
					text-align: center;
					line-height: 44rpx;
				}

				.name {
					font-size: 32rpx;
					font-weight: 600;
					color: #333333;
				}
			}

			.img {
				width: 192rpx;
				height: 192rpx;
				border-radius: 24rpx;
			}
		}

		.typeBox {
			display: flex;

			view {
				width: 96rpx;
				height: 58rpx;
				background: #E9E9E9;
				margin-right: 16rpx;
				text-align: center;
				line-height: 58rpx;
				font-weight: 400;
				color: #999999;
				font-size: 28rpx;
				border-radius: 12rpx;
			}

			.active {
				color: #08B761;
				background: #EDF8EF;
				border: 1px solid #08B761;
			}
		}

		.title {
			font-weight: 500;
			color: #333333;
			font-size: 30rpx;
			margin-bottom: 24rpx;
		}
	}
</style>
