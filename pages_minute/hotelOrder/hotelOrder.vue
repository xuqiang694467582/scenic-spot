<template>
	<view class="pages">
		<view class="block">
			<image :src="packData.mainImage"></image>
			<view style="width: 80%;">
				<view>{{ packData.name }}</view>
				<view style="font-size: 24rpx;color: #333;margin: 10rpx 0;">{{ packData.introduce }}</view>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view style="display: flex;align-items: center;justify-content: space-between;width: 200rpx;">
						<text style="font-size: 30rpx;color: #FE5A3D;font-weight: bold;">￥{{ packData.price }}</text>
						<text style="font-size: 24rpx;color: #999;text-decoration: line-through;">￥{{ packData.originalPrice }}</text>
					</view>
					<u-number-box v-model="value" :integer="true" min="1" @change="change">
						<view slot="minus">
							<u-icon name="/static/reduce.png" width="20" height="20" ></u-icon>
						</view>
						<text slot="input" style="margin-right: 20rpx;">{{value}}</text>
						<view slot="plus">
							<u-icon name="/static/add.png" width="20" height="20" ></u-icon>
						</view>
					</u-number-box>
				</view>
			</view>
		</view>
		<view style="background-color: #fff;padding: 20rpx;border-radius: 20rpx;">
			<u--form labelWidth="auto" labelPosition="left" :model="model" labelAlign="right" :rules="rules" ref="form">
				<u-form-item label="姓名" prop="name">
					<u--input v-model="model.name" inputAlign="right" border="none" placeholder="姓名"></u--input>
				</u-form-item>
				<u-form-item label="手机号" prop="tel">
					<u--input v-model="model.tel" inputAlign="right" border="none" placeholder="填写手机号"></u--input>
				</u-form-item>
				<u-form-item label="起始日期" prop="hotel" @click="showCalendar = true; hideKeyboard()">
					<u--input v-model="model.hotel" inputAlign="right" disabled disabledColor="#ffffff" placeholder="请选择起始日期"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
			</u--form>
		</view>

		<view class="bom">
			<view>
				<text style="font-size: 28rpx;">合计：</text>
				<text style="color: #FE5A3D;font-weight: bold;font-size: 36rpx;">￥{{ price }}</text>
			</view>
			<view style="width: 200rpx;">
				<u-button color="#0BB762" shape="circle" @click="getBooknow()">立即预定</u-button>
			</view>
		</view>
		<u-calendar :show="showCalendar" :defaultDate="defaultDate" mode="range" @confirm="calendarConfirm" @close="showCalendar = false" startText="住店"
			endText="离店" confirmDisabledText="请选择离店日期"></u-calendar>
	</view>
</template>

<script>
	import {
		hotelRecoDetail
	} from '@/api/parktour.js';
	import {
		addPlacePay,
		addOrderPay
	} from '@/api/order.js';
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				packData: {},
				showCalendar: false,
				value: 1,
				price: 0,
				defaultDate: [],
				num: 1,
				model: {
					name: '',
					tel: '',
					hotel: ''
				},
				rules: {
					name: [{
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}, {
						validator: (rule, value, callback) => {
							return uni.$u.test.chinese(value);
						},
						message: "姓名必须为中文",
						trigger: ["change", "blur"],
					}],
					tel: {
						type: 'string',
						required: true,
						message: '请填写手机号',
						trigger: ['blur']
					},
					hotel: {
						type: 'string',
						required: true,
						message: '请选择住店时间',
						trigger: ['change']
					},
				},
				time: []
			}
		},
		computed: mapState(['userInfo', 'scenicData']),
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form.setRules(this.rules)
		},
		onLoad(option) {
			const obj = JSON.parse(decodeURIComponent(option.obj));
			this.load(obj.id);
			this.model.hotel = obj.startTime + ' / ' + obj.endTime;
			this.num = obj.num;
			this.time = [obj.startTime,obj.endTime];
			this.defaultDate = [obj.startTime,obj.endTime];
			this.model.tel = this.userInfo.phone;
		},
		methods: {
			async load(id) {
				const {
					data
				} = await hotelRecoDetail({
					id: id
				})
				this.packData = data;
				this.price = data.price * this.num;
			},
			gotoPage() {
				// uni.navigateTo({
				// 	url: '/pages_minute/diningOrder/diningOrder'
				// })
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			change(e) {
				this.value = e.value;
				let data = Number(this.packData.price) * this.num * e.value;
				this.price = data.toFixed(1);
			},
			calendarConfirm(e) {
				this.showCalendar = false;
				this.model.hotel = `${e[0]} / ${e[e.length - 1]}`;
				this.time = [e[0],e[e.length - 1]];
				this.num = e.length - 1;
				let data = Number(this.packData.price) * this.num * this.value;
				this.price = data.toFixed(1);
				this.$refs.form.validateField('hotel')
			},
			// 立即预定
			getBooknow() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form.validate().then(async res => {
					const params = [{
						type: 2,
						merchantType: 2,
						merchantId: this.packData.hotelId,
						merchantName: this.packData.hotelName,
						hotelTypeOtherInfo: {
							name: this.model.name,
							tel: this.model.tel
						},
						orderItems: [{
							productId: this.packData.id,
							itemHotelTypeDetailInfo: {
								days: this.num,
								number: this.value,
								reserveStartTime: this.time[0],
								reserveEndTime: this.time[1],
							}
						}]
					}]
					try {
						const {
							data
						} = await addPlacePay({
							attractionId: this.scenicData.id,
							orders: params
						})
						this.payOrder(data)
					} catch (e) {}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			async payOrder(orderSn) {
				// const {
				// 	data
				// } = await addOrderPay({
				// 	orderSn: orderSn
				// })
				uni.requestPayment({
					// 时间戳
					timeStamp: orderSn.orderResult.timeStamp,
					// 随机字符串 
					nonceStr: orderSn.orderResult.nonceStr,
					// 统一下单接口返回的 prepay_id 参数值
					package: orderSn.orderResult.packageValue,
					// 签名算法，应与后台下单时的值一致
					signType: orderSn.orderResult.signType,
					// 签名
					paySign: orderSn.orderResult.paySign,
					// 支付成功的回调
					success(result) {
						uni.showToast({
							title: '支付成功'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/order/order'
							})
						}, 1000)
					},
					// 支付失败回调
					fail(err) {
						uni.showToast({
							title: '支付失败'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/order/order'
							})
						}, 1000)
					}
				})
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

	.bom {
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
