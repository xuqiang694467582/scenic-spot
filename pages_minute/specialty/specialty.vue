<template>
	<view>
		<uni-nav-bar :statusBar="true" :border="false" leftWidth="460rpx" backgroundColor="#fff">
			<view slot="left">
				<u-search v-model="keyword" :showAction="false" placeholder="搜索特产商品" bgColor="#fff" borderColor="rgba(60, 180, 82, 1)" height="28"></u-search>
			</view>
		</uni-nav-bar>
		<view class="content">
			<view class="list" v-for="(item,index) in 10" :key="index" @click="toDetail">
				<image src="../../static/index/menu_4.png" class="goodsImg"></image>
				<view class="infoBox">
					<view class="name">园区自培农户有机土鸡蛋土鸡蛋土鸡蛋</view>
					<view class="priceBox">
						<view class="price"><text>￥</text>30.60</view>
						<view class="sale">已售1000+</view>
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
				
			}
		},
		methods: {
			toDetail(){
				uni.navigateTo({
					url:'/pages_minute/specialtyDetail/specialtyDetail'
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
