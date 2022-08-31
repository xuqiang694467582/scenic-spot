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
				<u-album :maxCount="3" :space="10" :singleSize="210" :multipleSize="100"
					:urls="formData.photoExplanation"></u-album>
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
			getAddress() {
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function(res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							success: function() {
								console.log('success');
							}
						});
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
