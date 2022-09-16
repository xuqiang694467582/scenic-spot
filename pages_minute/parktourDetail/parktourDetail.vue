<template>
	<view class="pages">
		<view class="banner">
			<image src="../../static/back.png" :style="{top:barHightTop+'px'}" class="backImg" @click="backTap"></image>
			<image :src="formData.coverImg" class="bannerImg"></image>
		</view>
		<view class="content">
			<view class="content-title">
				<text>{{ formData.name }}</text>
				<view class="content-title-one">
					<view class="content-title-one-left">
						<view class="content-title-one-left-t">
							{{ formData.score }}分
						</view>
						<!-- <u-tag text="500+点评" bgColor="#08B761" borderColor="#08B761" ></u-tag> -->
					</view>
					<veiw>
						<image src="@/static/parktour/navigation.png" @click="getAddress()"></image>
					</veiw>
				</view>
				<view class="content-title-tag">
					<view class="content-title-tag-c" v-for="(item,index) in formData.label" :key="index">
						<u-tag :text="item" :plain="true" borderColor="#08B761" color="#08B761" bgColor="#EDF8EF">
						</u-tag>
					</view>
				</view>
				<u-read-more showHeight="50" closeText="展开" :toggle="true">
					<rich-text :nodes="formData.introduction"></rich-text>
				</u-read-more>
			</view>
			<view class="content-image">
				<view class="text"><view></view>图片介绍</view>
				<scroll-view class="imgBox" scroll-x="true">
					<image :src="item" v-for="(item,index) in formData.photoExplanation" :key="index"
						@click="preViewImg(index)"></image>
					<view class="imgNum" v-show="formData.photoExplanation.length>4">{{formData.photoExplanation.length}}图
					</view>
				</scroll-view>
			</view>
			<!-- 评论 -->
			<view class="comment">
				<view class="comment-title">
					<view class="comment-title-text"><view></view>图片介绍</view>
					<view class="comment-title-right" @click="viewEvaluation">
						<!-- 共254条评价 -->
						全部评价
						<u-icon name="arrow-right" size="14"></u-icon>
					</view>
				</view>
				<view class="comment-list" v-for="(item, index1) in pointList" :key="index1">
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
						<image :src="item2" v-for="(item2,index2) in item.commentImg" :key="index2"
							@click="preViewImage(index1,index2)"></image>
						<view class="imgNum" v-show="item2.commentImg.length>4">{{item2.commentImg.length}}图
						</view>
					</scroll-view>
				</view>
				<view>
					<u-button text="我也来写评价~" color="#EBFFF5" icon="edit-pen" iconColor="#08B761" :customStyle="{'border':'1px solid #08B761','color': '#08B761','border-radius':'24rpx'}" @click="editReview"></u-button>
				</view>
			</view>
			<!-- 附近玩乐 -->
			<NearbyPlay id="nearby" />
		</view>
	</view>
</template>

<script>
	import {
		attrDetail,
		attrPointList
	} from '@/api/parktour.js';
	import NearbyPlay from '@/compontents/NearbyPlay.vue'
	export default {
		components: {
			NearbyPlay
		},
		data() {
			return {
				id: '',
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				barHightTop: '',
				formData: {},
				pointList: []
			}
		},
		onLoad(option) {
			this.barHightTop = uni.getSystemInfoSync().statusBarHeight + 5
			this.load(option.id)
			this.id = option.id;
		},
		methods: {
			async load(id) {
				try {
					const {
						data
					} = await attrDetail({
						id: id
					})
					this.formData = data;
					this.point(id)
				} catch (e) {}
			},
			async point(id) {
				const { data } = await attrPointList({
					attractionPointId: id
				})
				this.pointList = data.records;
			},
			backTap() {
				uni.navigateBack({
					delta: -1
				})
			},
			preViewImg(index) {
				uni.previewImage({
					current: index,
					urls: this.formData.photoExplanation
				})
			},
			preViewImage(index1, index2){
				uni.previewImage({
					current: index2,
					urls: this.pointList[index1].commentImg
				})
			},
			getAddress() {
				uni.openLocation({
					latitude: this.formData.latitude * 1,
					longitude: this.formData.latitude * 1,
					name: this.formData.name,
					address: this.formData.address,
					success: function() {
						console.log('success');
					}
				});
			},
			// 查看全部评价
			viewEvaluation(){
				uni.navigateTo({
					url: `/pages_minute/evaluation/evaluation?id=${this.id}`
				})
			},
			// 填写评价
			editReview(){
				uni.navigateTo({
					url: `/pages_minute/writeReview/writeReview?id=${this.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
	}

	.banner {
		width: 100%;
		height: 448rpx;
		position: relative;

		.backImg {
			width: 60rpx;
			height: 60rpx;
			position: fixed;
			left: 28rpx;
			z-index: 11;
		}

		.bannerImg {
			width: 100%;
			height: 100%;
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

	.content {
		padding: 0 24rpx;
		box-sizing: border-box;
		top: -54rpx;
		position: relative;

		.content-title {
			background-color: #fff;
			border-radius: 24rpx;
			padding: 30rpx 32rpx;

			.content-title-one {
				margin: 30rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;

				&-left {
					display: flex;

					&-t {
						width: 92rpx;
						height: 44rpx;
						background: linear-gradient(180deg, #F3982B 0%, #FF543E 100%);
						border-radius: 12rpx 0px 12rpx 0px;
						font-size: 24rpx;
						font-weight: 500;
						color: #FFFFFF;
						text-align: center;
						line-height: 44rpx;
					}
				}

				image {
					width: 58rpx;
					height: 58rpx;
				}
			}

			.content-title-tag {
				display: flex;
				flex-wrap: wrap;
				margin-bottom: 20rpx;

				.content-title-tag-c {
					margin-right: 10rpx;
					margin-bottom: 10rpx;
				}
			}
		}

		.content-image {
			background-color: #fff;
			border-radius: 24rpx;
			padding: 30rpx 32rpx;
			margin: 20rpx 0;

			.text {
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				
				view{
					width: 6rpx;
					height: 30rpx;
					background: linear-gradient(180deg, #BDE1CF 0%, #03B85F 100%);
					margin-right:12rpx;
				}
			}
		}
		
		.comment{
			background-color: #fff;
			border-radius: 24rpx;
			padding: 30rpx 32rpx;
			margin: 20rpx 0;
			
			&-title{
				margin-bottom: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&-text{
					display: flex;
					align-items: center;
					
					view{
						width: 6rpx;
						height: 30rpx;
						background: linear-gradient(180deg, #BDE1CF 0%, #03B85F 100%);
						margin-right:12rpx;
					}
				}
				&-right{
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					font-size: 500;
				}
			}
			
			&-list{
				margin-bottom: 40rpx;
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
		}
	}
</style>
