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
				<view class="text">图片介绍</view>
				<scroll-view class="imgBox" scroll-x="true">
					<image :src="item" v-for="(item,index) in formData.photoExplanation" :key="index"
						@click="preViewImg(index)"></image>
					<view class="imgNum" v-show="formData.photoExplanation.length>4">
						{{formData.photoExplanation.length}}图
					</view>
				</scroll-view>
			</view>
			<!-- 附近玩乐 -->
			<NearbyPlay id="nearby" />
		</view>
	</view>
</template>

<script>
	import {
		soptDetail
	} from '@/api/parktour.js';
	import NearbyPlay from '@/compontents/NearbyPlay.vue'
	export default {
		components: {
			NearbyPlay
		},
		data() {
			return {
				barHightTop: '',
				formData: {},
			}
		},
		onLoad(option) {
			this.barHightTop = uni.getSystemInfoSync().statusBarHeight + 5
			this.load(option.id)
		},
		methods: {
			async load(id) {
				try {
					const {
						data
					} = await soptDetail({
						id: id
					})
					this.formData = data;
				} catch (e) {}
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
			padding: 20rpx;

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
			padding: 20rpx;
			margin: 20rpx 0;

			.text {
				margin-bottom: 20rpx;
			}
		}
	}
</style>
