<template>
	<view class="comment">
		<view class="comment-list" v-for="(item,index) in list" :key="index">
			<view class="comment-list-title">
				<view class="comment-list-title-left">
					<u-avatar :src="item.userAvatar" size="36"></u-avatar>
					<view class="comment-list-title-left-text">
						<text class="comment-list-title-left-text-n">{{ item.userName }}</text>
						<text class="comment-list-title-left-text-t">{{ item.commentDateStr }}</text>
					</view>
				</view>
				<view class="comment-list-title-right">{{ item.score }}分</view>
			</view>
			<view class="comment-list-text">
				{{ item.commentDetails }}
			</view>
			<scroll-view class="imgBox" scroll-x="true">
				<image :src="item1" v-for="(item1,index1) in item.commentImg" :key="index1"
					@click="preViewImg(index)"></image>
				<view class="imgNum" v-show="item1.commentImg.length > 4">{{item1.commentImg.length}}图
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		attrPointList
	} from '@/api/parktour.js';
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad(option) {
			this.load(option.id)
		},
		methods: {
			async load(id){
				const { data } = await attrPointList({
					attractionPointId: id
				})
				this.list = data.records;
			},
			preViewImg(index) {
				uni.previewImage({
					current: index,
					urls: this.list.commentImg
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f4f4f4;
	
	.comment{
		padding: 24rpx 20rpx;
	}
	
	.comment-list{
		padding: 24rpx 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		
		&-title{
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			&-left{
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				&-text{
					
					&-n{
						font-size: 30rpx;
						font-weight: 600;
						margin-left: 24rpx;
						margin-right: 28rpx;
					}
					
					&-t{
						color: #999;
						font-size: 28rpx;
						font-weight: 400;
					}
				}
			}
			
			&-right{
				color: #08B761;
				font-size: 28rpx;
				font-weight: bold;
			}
		}
		
		&-text{
			margin: 20rpx 0;
			font-size: 26rpx;
			color: #333;
			line-height: 52rpx;
			// display: -webkit-box;
			// -webkit-box-orient: vertical;
			// -webkit-line-clamp: 3;
			// overflow: hidden;
		}
	}
	
	.imgBox {
		width: 100%;
		display: flex;
		white-space: nowrap;
		position: relative;
	
		image {
			width: 212rpx;
			height: 170rpx;
			border-radius: 12rpx;
			margin-right: 8rpx;
			display: inline-block;
		}
	
		.imgNum {
			padding: 0 6rpx;
			height: 38rpx;
			background: rgba(0, 0, 0, 0.6);
			border-radius: 8rpx;
			position: absolute;
			right: 8rpx;
			bottom: 50rpx;
			z-index: 11;
			font-weight: 400;
			color: #FFFFFF;
			font-size: 24rpx;
		}
	}
}
</style>
