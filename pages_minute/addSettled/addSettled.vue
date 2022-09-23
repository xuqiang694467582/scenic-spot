<template>
	<view>
		<!-- 正常进度条 -->
		<view class="bar">
			<view class="bar-c" :class="{ 'bar-u': number >= 1 }" @click="barClick(1)"></view>
			<view class="bar-c" :class="{ 'bar-u': number >= 2 }" @click="barClick(2)"></view>
			<view class="bar-c" :class="{ 'bar-u': number >= 3 }" @click="barClick(3)"></view>
		</view>
		<!-- 特产进度条 -->
		<!-- <view class="bar" v-if="model.type === '3'">
			<view class="bar-tc" :class="{ 'bar-tu': number >= 1 }" @click="barClick(1)"></view>
			<view class="bar-tc" :class="{ 'bar-tu': number >= 2 }" @click="barClick(2)"></view>
		</view> -->
		<view class="form">
			<u--form labelPosition="left" labelWidth="100" :model="model" ref="formRef">
				<view v-if="number === 1">
					<view class="form-title">所在景区</view>
					<u-form-item label="所在景区" prop="attractionName" @click="scenicSpot = true; hideKeyboard()">
						<u--input v-model="model.attractionName" disabled disabledColor="#ffffff" border="none"
							placeholder="选择商家入驻的所在景区"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<view class="form-title">商家类型</view>
					<u-form-item label="商家类型" prop="typeName" @click="businessType = true; hideKeyboard()">
						<u--input v-model="model.typeName" disabled disabledColor="#ffffff" border="none" placeholder="选择入驻的商家类型"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<!-- <view v-if="model.type == '3'" class="form-title">店铺名称</view>
					<u-form-item v-if="model.type == '3'" label="店铺名称" prop="specialtyName">
						<u--input v-model="model.specialtyName" border="none" placeholder="填写店铺名称"></u--input>
					</u-form-item> -->
					<view class="form-title">联系方式</view>
					<u-form-item label="联系人" prop="contact" borderBottom>
						<u--input v-model="model.contact" border="none" placeholder="填写联系人姓名"></u--input>
					</u-form-item>
					<u-form-item label="联系电话" prop="contactNumber">
						<u--input v-model="model.contactNumber" type="number" border="none" placeholder="填写您的联系电话方便联系"></u--input>
					</u-form-item>
					<view class="form-title">商家地址</view>
					<u-form-item label="商家地址" prop="address" @click="getAddress">
						<u--input v-model="model.address" disabled disabledColor="#ffffff" border="none" placeholder="标记商家地址"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</view>
				<view v-if="number === 2">
					<view class="form-title">商家门店图片</view>
					<u-form-item labelPosition="top" label="门面图" borderBottom>
						<!-- <view>牌匾需确保真实完整</view> -->
						<Upload :custom="true" :src="img" :maxCount='1' width="500" height="300"
							@uploadList="uploadList"></Upload>
					</u-form-item>
					<u-form-item label="营业执照" borderBottom>
						<Upload :custom="true" :src="img" :maxCount='1' width="500" height="300"
							@uploadList="uploadList1"></Upload>
					</u-form-item>
					<u-form-item label="身份证">
						<!-- 身份证国徽面/正面 -->
						<Upload :custom="true" :src="img1" :maxCount='1' width="500" height="300"
							@uploadList="uploadList2"></Upload>
						<view style="height: 40rpx;"></view>
						<!-- 身份证人像面/反面 -->
						<Upload :custom="true" :src="img2" :maxCount='1' width="500" height="300"
							@uploadList="uploadList3"></Upload>
					</u-form-item>
				</view>
				<view v-if="number === 3">
					<view class="form-title">商家信息</view>
					<u-form-item label="商家名称" prop="shopName" borderBottom>
						<u--input v-model="model.shopName" border="none" placeholder="商家名称需与牌匾一致"></u--input>
					</u-form-item>
					<u-form-item label="商家标签" prop="shopTag" borderBottom>
						<u-input v-model="model.shopTag" clearable border="none" maxlength="5" placeholder="输入商家标签">
							<view slot="suffix" style="border-left: 2rpx solid #EEE;padding-left: 20rpx;">
								<text style="color: #08B761;font-size: 30rpx;margin-right: 24rpx;" @click="addTag">添加</text>
								<text v-if="closable === false" style="color: #FE3D3D;font-size: 30rpx;" @click="closeTag">删除</text>
								<text v-if="closable === true" style="color: #08B761;font-size: 30rpx;" @click="finishTag">完成</text>
							</view>
						</u-input>
						<view class="tag">
							<view class="tag-b" v-for="(item,index) in tagList" :key="index">
								<u-tag :text="item" bgColor="#EEE" borderColor="#EEE" color="#666" :closable="closable" @close="closeCurrentTag(index)"></u-tag>
							</view>
						</view>
						<view style="font-size: 24rpx;color: #999;">每个标签5字以内，标签个数不超过5个</view>
					</u-form-item>
					<u-form-item v-if="model.type === '0' || model.type === '1'" label="开放时间" prop="openingHours" borderBottom>
						<u--input v-model="model.openingHours" border="none" placeholder="请输入开放时间"></u--input>
					</u-form-item>
					<u-form-item label="商家简介" prop="introduction" borderBottom>
						<u--textarea v-model="model.introduction" border="none" placeholder="填写店铺的特色、环境、等亮点" count></u--textarea>
					</u-form-item>
					<u-form-item label="商家图片" prop="name">
						<Upload :custom="true" :src="img" :maxCount='6' width="500" height="300"
							@uploadList="uploadList4"></Upload>
					</u-form-item>
				</view>
				<!-- 特产 -->
				<!-- <view v-if="number === 2 && model.type === '3'">
					<view class="form-title">商家图片</view>
					<u-form-item label="商家图片">
						<Upload :custom="true" :src="img" :maxCount='6' width="500" height="300"
							@uploadList="uploadList5"></Upload>
						<view style="height: 40rpx;"></view>
					</u-form-item>
				</view> -->
			</u--form>
		</view>

		<!-- 正常按钮 -->
		<view class="btn">
			<u-button v-if="number < 3" text="下一步" color="#08B761" @click="nextStep"></u-button>
			<u-button v-if="number == 3" text="提交审核" color="#08B761" @click="submit"></u-button>
		</view>
		<!-- 特产按钮 -->
		<!-- <view class="btn" v-if="model.type === '3'">
			<u-button v-if="number < 2" text="下一步" color="#08B761" @click="nextSteps"></u-button>
			<u-button v-if="number == 2" text="提交审核" color="#08B761" @click="submit"></u-button>
		</view> -->
		<!-- 景区列表 -->
		<u-picker :show="scenicSpot" :columns="spotColumns" keyName="label" :closeOnClickOverlay="true" @confirm="spotConfirm" @cancel="scenicSpot = false" @close="scenicSpot = false"></u-picker>
		<!-- 商家类型 -->
		<u-picker :show="businessType" :columns="typeColumns" keyName="label" :closeOnClickOverlay="true" @confirm="typeConfirm" @cancel="businessType = false" @close="businessType = false"></u-picker>
	</view>
</template>

<script>
	import {
		applySettled,
		attractionMap
	} from '@/api/settled.js';
	import {
		mapState
	} from 'vuex';
	import Upload from '@/compontents/UpLoad/index.vue'
	
	export default {
		components: {
			Upload
		},
		data() {
			return {
				img: '../../static/uploadImg.png',
				img1: 'https://village-szxc.oss-cn-chengdu.aliyuncs.com/small/3b5dc603e1fcc09c28ed220e81b1570.png',
				img2: 'https://village-szxc.oss-cn-chengdu.aliyuncs.com/small/6e2a79ae8b2a4db2fe8908df7b84499.png',
				number: 1,
				model: {
					attractionId: '',
					attractionName: '',
					type: '',
					typeName: '',
					specialtyName: '',
					contact: '',
					contactNumber: '',
					address: '',
					latitude: '30.408413',
					longitude: '104.550018',
					coverImg: '',
					businessLicense: '',
					idCardFront: '',
					idCardBack: '',
					shopName: '',
					shopTag: '',
					label: [],
					openingHours: '',
					introduction: '',
					photoExplanation: [],
				},
				rules: {
					attractionName: {
						type: 'string',
						required: true,
						message: '请选择景区',
						trigger: ['blur', 'change']
					},
					typeName:{
						type: 'string',
						required: true,
						message: '请选择商家类型',
						trigger: ['blur', 'change']
					},
					specialtyName:{
						type: 'string',
						required: true,
						message: '请填写店铺名称',
						trigger: ['change']
					},
					contact:{
						type: 'string',
						required: true,
						message: '请填写联系人',
						trigger: ['change']
					},
					contactNumber:{
						type: 'string',
						max: 11,
						required: true,
						message: '请填写联系电话',
						trigger: ['change']
					},
					address: {
						type: 'string',
						required: true,
						message: '请选择商家地址',
						trigger: ['blur', 'change']
					},
					shopName: {
						type: 'string',
						required: true,
						message: '请填写商家名称',
						trigger: ['change']
					},
					openingHours: {
						type: 'string',
						required: true,
						message: '请填写开放时间',
						trigger: ['change']
					},
					introduction:{
						type: 'string',
						required: true,
						message: '请填写简介',
						trigger: ['change']
					}
				},
				scenicSpot: false,
				spotColumns: [
					[]
				],
				businessType: false,
				typeColumns:[
					[
						{
							label: '娱乐',
							type: '0'
						}, {
							label: '餐厅',
							type: '1'
						}, {
							label: '酒店',
							type: '2'
						}, {
							label: '特产商品',
							type: '3'
						},
					]
				],
				tagList:[],
				closable: false,
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.formRef.setRules(this.rules)
		},
		onLoad() {
			this.load()
		},
		methods: {
			// 获取景区数据
			async load(){
				const { data } = await attractionMap();
				this.spotColumns[0] = data;
			},
			// 选择景区
			spotConfirm(e){
				this.model.attractionId = e.value[0].value;
				this.model.attractionName = e.value[0].label;
				this.$refs.formRef.validateField('attractionName')
				this.scenicSpot = false;
			},
			// 选择商家类型
			typeConfirm(e){
				this.number = 1;
				this.model.type = e.value[0].type;
				this.model.typeName = e.value[0].label;
				this.$refs.formRef.validateField('typeName');
				// 调整页面
				this.businessType = false;
			},
			// 选择位置
			getAddress(){
				let _this = this;
				uni.chooseLocation({
					success(res) {
						_this.model.address = res.address;
						_this.model.latitude = res.latitude;
						_this.model.longitude = res.longitude;
					}
				})
			},
			// 提交审核
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				if(this.model.coverImg === ''){
					uni.$u.toast('请上传门面图！')
				}
				if(this.model.businessLicense === ''){
					uni.$u.toast('请上传营业执照！')
				}
				if(this.model.idCardFront === ''){
					uni.$u.toast('请上传身份证正面图片！')
				}
				if(this.model.idCardBack === ''){
					uni.$u.toast('请上传身份证反面图片！')
				}
				if(this.tagList.length === 0){
					uni.$u.toast('请添加标签！')
				}
				this.$refs.formRef.validate().then(async res => {
					if(this.model.type == '0'){
						// 娱乐
						let params = {
							attractionId: this.model.attractionId,
							type: this.model.type,
							contact: this.model.contact,
							contactNumber: this.model.contactNumber,
							address: this.model.address,
							latitude: this.model.latitude,
							longitude: this.model.longitude,
							coverImg: this.model.coverImg,
							businessLicense: this.model.businessLicense,
							idCardFront: this.model.idCardFront,
							idCardBack: this.model.idCardBack,
							amusementMerchantInfo: {
								name: this.model.shopName,
								label: this.tagList,
								openingHours: this.model.openingHours,
								introduction: this.model.introduction,
								photoExplanation: this.model.photoExplanation
							}
						}
						try{
							await applySettled({
								...params
							})
							uni.redirectTo({
								url: '/pages_minute/settledState/settledState'
							})
						}catch(e){}
					} else if(this.model.type == '1'){
						// 餐厅
						let params = {
							attractionId: this.model.attractionId,
							type: this.model.type,
							contact: this.model.contact,
							contactNumber: this.model.contactNumber,
							address: this.model.address,
							latitude: this.model.latitude,
							longitude: this.model.longitude,
							coverImg: this.model.coverImg,
							businessLicense: this.model.businessLicense,
							idCardFront: this.model.idCardFront,
							idCardBack: this.model.idCardBack,
							diningRoomMerchantInfo: {
								name: this.model.shopName,
								label: this.tagList,
								openingHours: this.model.openingHours,
								introduction: this.model.introduction,
								photoExplanation: this.model.photoExplanation
							}
						}
						try{
							await applySettled({
								...params
							})
							uni.redirectTo({
								url: '/pages_minute/settledState/settledState'
							})
						}catch(e){}
					} else if(this.model.type == '2') {
						// 酒店
						let params = {
							attractionId: this.model.attractionId,
							type: this.model.type,
							contact: this.model.contact,
							contactNumber: this.model.contactNumber,
							address: this.model.address,
							latitude: this.model.latitude,
							longitude: this.model.longitude,
							coverImg: this.model.coverImg,
							businessLicense: this.model.businessLicense,
							idCardFront: this.model.idCardFront,
							idCardBack: this.model.idCardBack,
							hotelMerchantInfo: {
								name: this.model.shopName,
								label: this.tagList,
								introduction: this.model.introduction,
								photoExplanation: this.model.photoExplanation
							}
						}
						try{
							await applySettled({
								...params
							})
							uni.redirectTo({
								url: '/pages_minute/settledState/settledState'
							})
						}catch(e){}
					} else {
						// 特产
						let params = {
							attractionId: this.model.attractionId,
							type: this.model.type,
							contact: this.model.contact,
							contactNumber: this.model.contactNumber,
							address: this.model.address,
							latitude: this.model.latitude,
							longitude: this.model.longitude,
							coverImg: this.model.coverImg,
							businessLicense: this.model.businessLicense,
							idCardFront: this.model.idCardFront,
							idCardBack: this.model.idCardBack,
							specialtyMerchantInfo: {
								name: this.model.shopName,
								label: this.tagList,
								introduction: this.model.introduction,
								photoExplanation: this.model.photoExplanation
							}
						}
						try{
							await applySettled({
								...params
							})
							uni.redirectTo({
								url: '/pages_minute/settledState/settledState'
							})
						}catch(e){}
					}
				}).catch(errors => {
					uni.$u.toast('请检查是否填写完整！')
				})
			},
			// 下一步,字段校验通过后执行
			nextStep() {
				this.$refs.formRef.validate().then(res => {
					if (this.number < 3) {
						this.number++
					}
				}).catch(errors => {})
			},
			// nextSteps() {
			// 	this.$refs.formRef.validate().then(res => {
			// 		if (this.number < 2) {
			// 			this.number++
			// 		}
			// 	}).catch(errors => {})
			// },
			// 点击进度条跳转对应的位置,字段校验通过后执行
			barClick(index) {
				this.$refs.formRef.validate().then(res => {
					this.number = index;
				}).catch(errors => {})
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			// 门面图回显
			uploadList(val){
				this.model.coverImg = val[0].url;
			},
			// 营业执照回显
			uploadList1(val){
				this.model.businessLicense = val[0].url;
			},
			// 身份证国徽面回显
			uploadList2(val){
				this.model.idCardFront = val[0].url;
			},
			// 身份证国徽面回显
			uploadList3(val){
				this.model.idCardBack = val[0].url;
			},
			// 商家图片
			uploadList4(fileList){
				this.model.photoExplanation = [];
				fileList.map((val) => {
					this.model.photoExplanation.push(val.url)
				});
			},
			// 特产商家图片
			uploadList5(fileList){
				this.model.photoExplanation = [];
				fileList.map((val) => {
					this.model.photoExplanation.push(val.url)
				});
			},
			// 添加标签
			addTag(){
				if(this.model.shopTag !== ''){
					if(this.tagList.length < 5){
						this.tagList.push(this.model.shopTag)
						this.model.shopTag = '';
					} else {
						uni.$u.toast('最多可添加5个！')
					}
				} else {
					uni.$u.toast('请先输入后添加！')
				}
			},
			// 开启删除标签
			closeTag(){
				if(this.tagList.length !== 0){
					this.closable = true;
				} else {
					uni.$u.toast('请至少添加一个！')
				}
			},
			// 删除标签
			closeCurrentTag(index){
				this.tagList.splice(index)
			},
			// 完成删除
			finishTag(){
				this.closable = false;
			}
		}
	}
</script>

<style lang="scss">
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-c {
			width: 33%;
			height: 12rpx;
			background-color: #E5E4E2;
		}

		&-u {
			width: 33%;
			height: 12rpx;
			background-color: #08B761;
		}
		
		&-tc {
			width: 49.5%;
			height: 12rpx;
			background-color: #E5E4E2;
		}
		
		&-tu {
			width: 49.5%;
			height: 12rpx;
			background-color: #08B761;
		}
	}

	.form {
		padding: 20rpx;
		padding-bottom: 150rpx;

		&-title {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 28rpx;
			color: #333;
			background-color: #FAFAFA;
		}
	}
	
	.tag{
		display: flex;
		flex-wrap: wrap;
		margin: 20rpx 0;
		&-b{
			margin-right: 20rpx;
			margin-bottom: 20rpx;
		}
	}

	.btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		padding: 0 24rpx 40rpx 24rpx;
		z-index: 1;
	}
</style>
