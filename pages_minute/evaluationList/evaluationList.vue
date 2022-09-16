<template>
	<view class="comment">
		<view class="comment-list" v-for="(item,index) in list" :key="index">
			<view class="comment-list-title">
				<view class="comment-list-title-left">
					<image src="@/static/parktour/tm_1.png" ></image>
					<text class="comment-list-title-left-text">{{ item.attractionPointName }}</text>
				</view>
				<view class="comment-list-title-right">{{ item.commentDateStr }}</view>
			</view>
			<view class="comment-list-text">
				{{ item.commentDetails }}
			</view>
			<scroll-view class="imgBox" scroll-x="true">
				<image :src="item1" v-for="(item1,index1) in item.commentImg" :key="index1"
					@click="preViewImg(index, index1)"></image>
				<view class="imgNum" v-show="item1.commentImg.length > 4">{{item1.commentImg.length}}图
				</view>
			</scroll-view>
			<view class="comment-list-bottom">
				<view class="comment-list-bottom-left">{{ item.isAnonymous === true ? '匿名评价' : '' }}</view>
				<view class="comment-list-bottom-right">
					<u-button type="text" icon="trash" iconColor="#666666" text="删除" @click="deletePoint(item.id)"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		attrMySelf,
		deleteComment
	} from '@/api/parktour.js';
	import {
		mapState,
	} from 'vuex'
	export default {
		data() {
			return {
				list: []
			}
		},
		computed: mapState(['scenicData']),
		onLoad() {
			this.load()
		},
		methods: {
			async load(){
				const { data } = await attrMySelf({
					attractionId: this.scenicData.id
				})
				this.list = data.records;
			},
			preViewImg(index, index1) {
				uni.previewImage({
					current: index1,
					urls: this.list[index].commentImg
				})
			},
			// 删除
			async deletePoint(id){
				try{
					await deleteComment(id);
					this.load();
					uni.$u.toast('已删除');
				}catch(e){}
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
			border-bottom: 2rpx solid #F7F7F7;
			padding-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			&-left{
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				& image{
					width: 44rpx;
					height: 44rpx;
				}
				
				&-text{
					font-size: 30rpx;
					font-weight: 600;
					margin-left: 24rpx;
					margin-right: 28rpx;
				}
			}
			
			&-right{
				color: #999;
				font-size: 26rpx;
			}
		}
		
		&-text{
			margin: 20rpx 0;
			font-size: 26rpx;
			color: #333;
			line-height: 52rpx;
		}
		
		&-bottom{
			border-top: 2rpx solid #F7F7F7;
			padding-top: 20rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			&-left{
				color: #999999;
				font-size: 28rpx;
			}
			
			&-right{
				
			}
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
