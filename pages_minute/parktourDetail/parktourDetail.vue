<template>
	<view class="pages">
		<view class="back">
			<image src="../../static/parktour/back_image.png"></image>
		</view>
		<!-- 导航栏 -->
		<uni-nav-bar :statusBar="true" :border="false" leftIcon="left" color="#fff" backgroundColor="transparent" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="content">
			<view class="content-title">
				<text>元宫门与二十四臣像</text>
				<view class="content-title-one">
					<view class="content-title-one-left">
						<view class="content-title-one-left-t">
							4.8分
						</view>
						<u-tag text="500+点评" bgColor="#08B761" borderColor="#08B761" ></u-tag>
					</view>
					<image src="@/static/parktour/navigation.png"></image>
				</view>
				<view class="content-title-tag">
					<view class="content-title-tag-c" v-for="item in 6">
						<u-tag text="古老建筑" :plain="true" borderColor="#08B761" color="#08B761" bgColor="#EDF8EF"></u-tag>
					</view>
				</view>
				<u-read-more showHeight="50" closeText="展开" :toggle="true">
				    <rich-text :nodes="content"></rich-text>
				</u-read-more>
			</view>
			<view class="content-image">
				<view class="text">图片介绍</view>
				<u-album maxCount="3" space="10" singleSize="210rpx" multipleSize="100" :urls="urls"></u-album>
			</view>
		</view>
	</view>
</template>	

<script>
	export default {
		data() {
			return {
				content: `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
				苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
				无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？`,
				urls:[
					'https://cdn.uviewui.com/uview/album/1.jpg',
					'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg',
					'https://cdn.uviewui.com/uview/album/4.jpg',
					'https://cdn.uviewui.com/uview/album/5.jpg',
				]
			}
		},
		methods: {
			clickLeft(){
				uni.navigateBack({
					delta: -1
				})
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
