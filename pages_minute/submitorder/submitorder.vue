<template>
	<view class="pages">
		<view class="block">
			<image src="../../static/hotel.png"></image>
			<view style="width: 80%;">
				<view>双人餐，提供免费饮品</view>
				<view style="font-size: 24rpx;color: #333;margin: 10rpx 0;">11:00-13:00、17:00-21:30</view>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view style="display: flex;align-items: center;justify-content: space-between;width: 200rpx;">
						<text style="font-size: 30rpx;color: #FE5A3D;font-weight: bold;">￥128</text>
						<text style="font-size: 24rpx;color: #999;">￥209</text>
					</view>
					<u-number-box v-model="value" siz :integer="true" min="1"></u-number-box>
				</view>
			</view>
		</view>
		<view style="background-color: #fff;padding: 20rpx;border-radius: 20rpx;">
			<u--form labelWidth="auto" labelPosition="left" :model="model" labelAlign="right" :rules="rules" ref="form">
				<u-form-item label="支付方式" prop="name" borderBottom @click="show = true; hideKeyboard()">
					<u--input v-model="model.name" disabled disabledColor="#ffffff" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="预留手机尾号" prop="phone">
					<u--input v-model="model.phone" border="none" placeholder="填写手机尾号"></u--input>
				</u-form-item>
			</u--form>
		</view>
		
		<view class="bom">
			<view>
				<text style="font-size: 28rpx;">合计：</text>
				<text style="color: #FE5A3D;font-weight: bold;font-size: 36rpx;">￥128</text>
			</view>
			<view style="width: 200rpx;">
				<u-button color="#0BB762" shape="circle" @click="gotoPage()">立即预定</u-button>
			</view>
		</view>

		<u-picker :show="show" :columns="columns" :closeOnClickOverlay="true" @confirm="confirm" @cancel="show = false"
			@close="show = false"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				columns: [
					['在线支付', '线下支付']
				],
				value: 1,
				model: {
					name: '在线支付'
				},
				rules: {

				}
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		onLoad() {

		},
		methods: {
			gotoPage(){
				uni.navigateTo({
					url:'/pages_minute/diningOrder/diningOrder'
				})
			},
			confirm() {
				this.show = false;
			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
	}

	.pages {
		padding: 20rpx;

		.block {
			background-color: #fff;
			padding: 20rpx;
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			border-radius: 20rpx;

			image {
				width: 148rpx;
				height: 148rpx;
				border-radius: 12rpx;
				margin-right: 20rpx;
			}
		}
	}
	
	.bom{
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		padding: 20rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
