<template>
	<view>
		<!-- 导航栏 -->
		<uni-nav-bar :statusBar="true" :border="false" leftWidth="530rpx" backgroundColor="transparent">
			<view slot="left">
				<u-search v-model="keyword" :showAction="false" placeholder="搜索全部订单" bgColor="#fff"></u-search>
			</view>
		</uni-nav-bar>
		
		<u-tabs :list="typeList" @click="click"  :activeStyle="{ color: 'rgba(8, 183, 97, 1)' }" :inactiveStyle="{ color: 'rgba(51, 51, 51, 1)' }" :itemStyle="{width:'14%',height:'80rpx'}" lineColor="rgba(8, 183, 97, 1)"></u-tabs>
		 
		<view class="content">
			 <view class="listBox" v-for="(item,index) in 10" :key="index" @click="toDetail">
				 <view class="topBox">
					 <view>2022-06-15 16:26:35</view>
					 <view>待付款</view>
				 </view>
				 <view class="listInfo">
					 <image src="../../static/index/menu_4.png"></image>
					 <view class="infoR">
						 <view class="infoName">【营养均衡】园区江粮谷物蛋自培农户有机土鸡蛋30枚净重（1.5kg/份）</view>
						 <view class="priceBox">
							 <text class="unit">￥</text>
							 <text class="price">61.20</text>
							 <text class="num">共2件</text>
						 </view>
					 </view>
				 </view>
				 <view class="btnBox">
					 <view class="cancel">取消订单</view>
					 <view>支付</view>
				 </view>
			 </view>
		 </view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				typeList:[{name:'全部'},{name:'待付款'},{name:'已支付'},{name:'已完成'},{name:'已取消'}]
			}
		},
		methods: {
			toDetail(){
				uni.navigateTo({
					url:'/pages_minute/orderDetail/orderDetail'
				})
			},
			click(item) { 
			}
		}
	}
</script>

<style lang="scss" >
	.content{
		padding: 24rpx;
		box-sizing: border-box;
		.listBox{
			margin-bottom: 20rpx;
			background-color: #fff;
			padding: 36rpx 26rpx 28rpx 36rpx;
			box-sizing: border-box;
			.btnBox{
				display: flex;
				justify-content: flex-end;
				margin-top: 42rpx;
				view{
					width: 152rpx;
					height: 64rpx;
					border-radius: 100rpx;
					text-align: center;
					line-height: 64rpx;
					font-size: 26rpx;
					border:1px solid #08B761;
					color: #08B761;
				}
				.cancel{					
					border:1px solid #999;
					color: #999999;	
					margin-right: 16rpx;
				}
			}
			.listInfo{
				display: flex;
				align-items: center;
				display: flex;
				margin-top: 24rpx;
				.infoR{
					display: flex;
					flex: 1;
					margin-left: 16rpx;
					flex-direction: column;
					.priceBox{
						margin-top: 20rpx;
						.unit{
							font-size: 30rpx;
							font-weight: bold;
						}
						.price{
							font-size: 40rpx;
							font-weight: bold;
						}
						.num{
							margin-left: 22rpx;
							font-size: 24rpx;
							color: #666666;
						}
					}
					.infoName{
						font-weight: 500;
						color: #333333;
						line-height: 48rpx;
						font-size: 28rpx;
					}
				}
				image{
					width: 160rpx;
					height: 160rpx;
					border-radius: 24rpx;
				}
			}
			
			.topBox{
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
				padding-bottom: 28rpx;
				border-bottom: 1px solid rgba(235, 235, 235, 1);
			}
		}
	}
page{
	background: rgba(243, 243, 243, 1);
}
</style>
