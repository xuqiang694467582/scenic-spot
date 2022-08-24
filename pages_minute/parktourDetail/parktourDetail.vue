<template>
	<view class="pages">
		<view class="back">
			<image :src="formData.coverImg"></image>
		</view>
		<!-- 导航栏 -->
		<uni-nav-bar :statusBar="true" :border="false" leftIcon="left" color="#fff" backgroundColor="transparent" @clickLeft="clickLeft"></uni-nav-bar>
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
						<u-tag :text="item" :plain="true" borderColor="#08B761" color="#08B761" bgColor="#EDF8EF"></u-tag>
					</view>
				</view>
				<u-read-more showHeight="50" closeText="展开" :toggle="true">
				    <rich-text :nodes="formData.introduction"></rich-text>
				</u-read-more>
			</view>
			<view class="content-image">
				<view class="text">图片介绍</view>
				<u-album :maxCount="3" :space="10" :singleSize="210" :multipleSize="100" :urls="formData.photoExplanation"></u-album>
			</view>
		</view>
	</view>
</template>	

<script>
	import { soptDetail } from '@/api/parktour.js';
	export default {
		data() {
			return {
				formData: {},
			}
		},
		onLoad(option) {
			this.load(option.id)
		},
		methods: {
			async load(id){
				try{
					const { data } = await soptDetail({
						id: id
					})
					this.formData = data;
				}catch(e){}
			},
			clickLeft(){
				uni.navigateBack({
					delta: -1
				})
			},
			getAddress(){
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function (res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							success: function () {
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
page{
	background-color: #f4f4f4;
}
.back{
	width: 100%;
	height: 448rpx;
	position: fixed;
	top: 0;
	z-index: -1;
	
	image{
		width: 100%;
	}
}

.content{
	padding: 20rpx;
	margin-top: 8rem;
	
	.content-title{
		background-color: #fff;
		border-radius: 24rpx;
		padding: 20rpx;
		
		.content-title-one{
			margin: 30rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			&-left {
				display: flex;
				&-t {
					width: 100rpx;
					border-radius: 10rpx 0 10rpx 0;
					background: linear-gradient(180deg, rgba(243,152,43,1) 50%, rgba(255,83,62,1) 85%);
					display: flex;
					color: #fff;
					font-size: 24rpx;
					align-items: center;
					justify-content: center;
					margin-right: 20rpx;
				}
			}
			
			image{
				width: 58rpx;
				height: 58rpx;
			}
		}
		.content-title-tag{
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 20rpx;
			
			.content-title-tag-c{
				margin-right: 10rpx;
				margin-bottom: 10rpx;
			}
		}
	}
	
	.content-image{
		background-color: #fff;
		border-radius: 24rpx;
		padding: 20rpx;
		margin-top: 20rpx;
		
		.text{
			margin-bottom: 20rpx;
		}
	}
}
</style>
