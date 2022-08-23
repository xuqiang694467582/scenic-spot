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
						<view class="content-title-one-left-l">
							108/人
						</view>
						<u-tag text="500+点评" bgColor="#08B761" borderColor="#08B761" ></u-tag>
					</view>
					<image src="@/static/parktour/navigation.png"></image>
				</view>
				<u-divider></u-divider>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view>
						<u-icon name="clock-fill" color="#08B761" label="开放时间:11:00-13:00,17:00-21:00"></u-icon>
						<view style="display: flex;flex-wrap: wrap;margin-top: 20rpx;">
							<view v-for="item in 4" style="margin-right: 10rpx;margin-bottom: 10rpx;">
								<u-tag size="mini" text="500+点评" bgColor="#E1E1E1" borderColor="#E1E1E1" color="#666"></u-tag>
							</view>
						</view>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<!-- tab -->
			<view class="tab">
				<u-tabs :list="Tablist" activeStyle="{ color: '#0CB662' }" lineColor="#0CB662" :scrollable="false">
				</u-tabs>
			</view>
			<view class="content-image">
				<view class="text">图片介绍</view>
				<u-album maxCount="3" space="10" singleSize="210rpx" multipleSize="100" :urls="urls"></u-album>
			</view>
			<view class="content-combo">
				<view class="content-combo-title">
					<view>休闲娱乐</view>
					<view style="color: #999;font-size: 26rpx;">更多></view>
				</view>
				<view class="combo-list" v-for="item in 4">
					<view style="display: flex;align-items: center;">
						<image style="width: 152rpx;height: 152rpx;margin-right: 20rpx;" src="../../static/logo.png"></image>
						<view>
							<text>双人餐，提供免费饮品</text>
							<view style="display: flex;flex-wrap: wrap;margin-top: 20rpx;">
								<view v-for="item in 1" style="margin-right: 10rpx;margin-bottom: 10rpx;">
									<u-tag size="mini" text="环境优美 分量很足" bgColor="#E1E1E1" borderColor="#E1E1E1" color="#666"></u-tag>
								</view>
							</view>
							<view style="display: flex;align-items: center;justify-content: space-between;width: 70%;">
								<text style="font-size: 30rpx;color: #FF1616;font-weight: bold;">￥128</text>
								<text style="font-size: 24rpx;color: #999;">￥209</text>
							</view>
						</view>
					</view>
					<view class="combo-list-btn" @click="gotoPage()">
						预定
					</view>
				</view>
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
				],
				Tablist: [
					{
						name: '图片介绍',
					},
					{
						name: '推荐套餐',
					}
				]
			}
		},
		methods: {
			clickLeft(){
				uni.navigateBack({
					delta: -1
				})
			},
			gotoPage(){
				uni.navigateTo({
					url: '/pages_minute/reserve/reserve'
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
				&-l {
					width: 100rpx;
					border-radius: 20rpx;
					background: #EDF8EF;
					display: flex;
					color: #333;
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
	}
	
	.tab {
		padding: 20rpx;
		background-color: #fff;
		margin: 20rpx 0;
		border-radius: 20rpx;
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
	
	.content-combo{
		background-color: #fff;
		border-radius: 24rpx;
		padding: 20rpx;
		margin-top: 20rpx;
		
		.text{
			margin-bottom: 20rpx;
		}
		
		&-title{
			display: flex;
			justify-content: space-between;
		}
		
		.combo-list{
			margin: 20rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&-btn{
				width: 90rpx;
				height: 52rpx;
				background: linear-gradient(180deg, #9AD7B8 0%, #14BB69 100%);
				display: flex;
				color: #fff;
				align-items: center;
				justify-content: center;
				border-radius: 10rpx;
				padding: 10rpx;
			}
		}
	}
}
</style>
