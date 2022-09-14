<template>
	<view class="abbr">
		<view class="textArea">
			<view class="title">评价内容</view>
			<u--textarea v-model="value" height="100" placeholder="请输入您对该景区评价以及景区的亮点和不足吧~" border="none" ></u--textarea>
		</view>
		<view class="rate">
			<view class="title">总体评价</view>
			<u-rate :count="count" inactiveColor="#D1D1D1" activeColor="#FFB124" v-model="rateValue"></u-rate>
		</view>
		<view class="switch">
			<view class="title">匿名评价</view>
			<u-switch v-model="value2"></u-switch>
		</view>
		<view class="btn">
			<u-button color="#08B761" text="确认发布" :customStyle="{ 'border-radius':'24rpx' }"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				rateValue: '3',
				count: '5',
				value2: false,
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.abbr{
	padding: 0 26rpx;
	
	.textArea{
		margin-top: 36rpx;
		
		/deep/.u-textarea{
			padding: 18rpx 0;
		}
	}
	
	.rate{
		margin: 52rpx 0;
		display: flex;
		align-items: center;
	}
	
	.switch{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.btn{
		position: fixed;
		bottom: 60rpx;
		left: 26rpx;
		right: 26rpx;
	}
	
	.title{
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
	}
}
</style>
