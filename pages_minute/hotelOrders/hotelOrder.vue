<template>
	<view class="pages">
		<view class="block">
			<view style="display: flex;align-items: center;justify-content: space-between;margin: 20rpx 0;">
				<view style="display: flex;align-items: center;">
					<text style="font-size: 40rpx;font-weight: bold;margin-right: 12rpx;">6-20</text>
					<text style="font-size: 26rpx;color: #333;">今天</text>
					<view style="margin: 0 20rpx;">
						<u-tag text="1晚" bgColor="#fff" borderColor="#08B761" color="#08B761"></u-tag>
					</view>
					<text style="font-size: 40rpx;font-weight: bold;margin-right: 12rpx;">6-21</text>
					<text style="font-size: 26rpx;color: #333;">明天</text>
				</view>
				<view style="border-left: 2rpx solid #D2D2D2;margin: 0 20rpx;height: 40rpx;"></view>
				<text style="font-size: 40rpx;font-weight: bold;">1间·1人</text>	
			</view>
			<view style="margin: 20rpx 0;font-weight: bold;">
				{{ packData.name }}
			</view>
			<view style="margin: 20rpx 0;color: #999;font-size: 28rpx;">
				<!-- {{ packData.name }} -->
				大床·含早餐·1人入住·30-38㎡
			</view>
			<u-icon name="checkmark-circle" label="2022-06-24 18:00前可免费取消" color="#08B761" labelColor="#08B761"></u-icon>
		</view>
		<!-- 入驻信息 -->
		<view class="block">
			<view style="font-weight: bold;">入驻信息</view>
			<u--form labelWidth="auto" labelPosition="left" :model="model" labelAlign="right" :rules="rules" ref="form">
				<u-form-item label="房间数量" prop="name" borderBottom @click="show = true; hideKeyboard()">
					<u--input v-model="model.name" inputAlign="right" disabled disabledColor="#ffffff" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="住客姓名" prop="phone" borderBottom>
					<u--input v-model="model.phone" inputAlign="right" border="none" placeholder="每间填1位住客姓名"></u--input>
				</u-form-item>
				<u-form-item label="联系电话" prop="phone" borderBottom>
					<u--input v-model="model.phone" inputAlign="right" border="none"></u--input>
				</u-form-item>
				<u-form-item label="预计到店" prop="phone">
					<u--input v-model="model.phone" inputAlign="right" border="none"></u--input>
				</u-form-item>
			</u--form>
		</view>
		<!-- 支付方式 -->
		<view style="background-color: #fff;padding: 20rpx;border-radius: 20rpx;margin-bottom: 20rpx;">
			<u--form labelWidth="auto" labelPosition="left" :model="model" labelAlign="right" :rules="rules" ref="form">
				<u-form-item label="支付方式" prop="name" @click="show = true; hideKeyboard()">
					<u--input v-model="model.name" disabled disabledColor="#ffffff" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
			</u--form>
		</view>
		<!--  -->
		<view style="background-color: #fff;padding: 20rpx;border-radius: 20rpx;">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<text style="font-size: 30rpx;font-weight: bold;">在线支付</text>
				<view style="display: flex;align-items: center;">
					<text style="font-size: 30rpx;font-weight: bold;margin-right: 20rpx;">1间1晚</text>
					<text style="font-size: 30rpx;font-weight: bold;">共</text>
					<text style="font-size: 30rpx;font-weight: bold;color: #FE5A3D;">￥133</text>
				</view>
			</view>
			<u-divider></u-divider>
			<view style="display: flex;align-items: center;justify-content: space-between;font-size: 30rpx;font-weight: bold;">
				<text>房费</text>
				<text style="color: #FE5A3D;">￥133</text>
			</view>
			<view style="font-size: 28rpx;margin: 20rpx 0;color: #333;">
				2021-06-21 无早餐
			</view>
			<view style="font-size: 28rpx;margin: 20rpx 0;color: #333;">
				2021-06-22 有早餐
			</view>
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
	import { mapState } from 'vuex';
	import { hotelRecoDetail } from '@/api/parktour.js';
	export default {
		data() {
			return {
				packData: {},
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
		computed: mapState(['userInfo']),
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form.setRules(this.rules)
		},
		onLoad(option) {
			this.load(option.id)
			console.log(this.userInfo);
		},
		methods: {
			async load(id){
				const { data } = await hotelRecoDetail({
					id: id
				})
				console.log(data);
				this.packData = data;
			},
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
		padding-bottom: 150rpx;

		.block {
			background-color: #fff;
			padding: 20rpx;
			margin-bottom: 20rpx;
			border-radius: 20rpx;
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
