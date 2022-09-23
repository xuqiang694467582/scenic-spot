<template>
	<view>
		<view class="back"></view>
		<!-- 导航栏 -->
		<uni-nav-bar :statusBar="true" :border="false" leftIcon="left" color="#fff" backgroundColor="transparent" @clickLeft="clickLeft"></uni-nav-bar>
		<view class="cont">
			<!-- 提示 -->
			<view style="display: flex;align-items: center;margin: 20rpx;">
				<u-icon name="checkmark-circle" color="#fff" labelColor="#fff" size="24" label="已预定"></u-icon>
				<text style="color: #fff;font-size: 26rpx;margin-left: 20rpx;">您已成功预定，请及时使用！</text>
			</view>
			<!-- 顶部 -->
			<view class="block">
				<view class="block-title">
					<!-- <image src="../../static/hotel.png"></image> -->
					<view style="width: 80%;">
						<view>双人餐，提供免费饮品</view>
						<view style="font-size: 24rpx;color: #333;margin: 10rpx 0;">11:00-13:00、17:00-21:30</view>
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<text style="font-size: 36rpx;color: #FE5A3D;">￥209</text>
						</view>
					</view>
				</view>
				<u-divider :dashed="true"></u-divider>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view>
						<view style="font-size: 30rpx;color: #333;margin-bottom: 20rpx;">卷码信息</view>
						<view style="font-size: 44rpx;">1489-0089</view>
					</view>
					<text style="color: #999;font-size: 28rpx;">已使用</text>
				</view>
			</view>
			<!-- 距离 -->
			<view class="block">
				<view class="list">
					<view class="list-l">
						<view class="list-l-r">
							<text>元宫门与二十四臣像</text>
							<u-icon name="map-fill" label="距离你1.2KM" color="#08B761" size="24rpx" labelSize="24rpx"></u-icon>
						</view>
					</view>
					<view class="list-r">
						<image src="@/static/parktour/navigation.png"></image>
					</view>
				</view>
			</view>
			<!-- 套餐菜品 -->
			<view class="block">
				<text style="font-weight: bold;">套餐菜品</text>
				<view>
					<view style="display: flex;justify-content: space-between;margin: 20rpx 0;" v-for="item in 5">
						<text style="color: #333;font-size: 28rpx;">脆皮鸭（1份）</text>
						<text style="font-weight: bold;">￥48</text>
					</view>
				</view>
			</view>
			<!-- 订单信息 -->
			<view class="block">
				<text style="font-weight: bold;">订单信息</text>
				<view style="font-size: 28rpx;">
					<view style="display: flex;margin: 20rpx 0;">
						<text style="color: #333;">实付金额：</text>
						<text style="font-weight: bold;">￥128</text>
					</view>
					<view style="display: flex;margin: 20rpx 0;">
						<text style="color: #333;">数量：</text>
						<text>1</text>
					</view>
					<view style="display: flex;margin: 20rpx 0;">
						<text style="color: #333;">订单号：</text>
						<view style="display: flex;">
							<text>13464656498415649844156</text>
							<u-icon name="file-text" color="#999"></u-icon>
						</view>
					</view>
					<view style="display: flex;margin: 20rpx 0;">
						<text style="color: #333;">预留号码：</text>
						<text>13895524125</text>
					</view>
					<view style="display: flex;margin: 20rpx 0;">
						<text style="color: #333;">付款金额：</text>
						<text>2021-02-06 14:26</text>
					</view>
					<view style="display: flex;margin: 20rpx 0;">
						<text style="color: #333;">下单时间：</text>
						<text>2021-02-06 14:26</text>
					</view>
				</view>
			</view>
		</view>
		<!-- bottom -->
		<view class="bom">
			<u-button :customStyle="{'color': '#08B761','background-color': '#EDF8EF','border-radius': '20rpx'}" text="取消订单" type="success"></u-button>
			<u-button :customStyle="{'border-radius': '20rpx'}" color="#08B761" text="继续支付" type="success"></u-button>
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
	height: 440rpx;
	background: linear-gradient(180deg, #A0D7BB 0%, #03B75F 100%);
	position: absolute;
	z-index: -1;
}

.cont{
	padding: 20rpx;
	padding-bottom: 150rpx;
}

.block{
	padding: 20rpx;
	background-color: #fff;
	border-radius: 20rpx;
	margin-bottom: 20rpx;
	
	&-title{
		display: flex;
		align-items: center;

		image {
			width: 148rpx;
			height: 148rpx;
			border-radius: 12rpx;
			margin-right: 20rpx;
		}
	}
	
	.list {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	
		&-l {
			display: flex;
			align-items: center;
	
			&-r {
				height: 100rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				
				text {
					font-size: 30rpx;
					font-weight: 500;
				}
			}
		}
		
		&-r{
			image {
				width: 58rpx;
				height: 58rpx;
			}
		}
	}
}

.bom{
	padding: 20rpx;
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
}
</style>
