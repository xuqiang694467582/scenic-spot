<template>
	<view class="content">
		<u--form labelPosition="top" :model="temp" :rules="rules" ref="form">
			<u-form-item label="标题" prop="title" borderBottom>
				<u--textarea v-model="temp.title" placeholder="输入一个符合您攻略的标题吧~" fontSize="30rpx" count maxlength="50"
					border="none" height="40rpx" autoHeight></u--textarea>
			</u-form-item>
			<u-form-item label="正文" prop="context">
				<u--textarea v-model="temp.context" placeholder="添加正文~" fontSize="30rpx" border="none" maxlength="-1" autoHeight>
				</u--textarea>
			</u-form-item>
		</u--form>
		<view class="uploadBox">
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="9"
				width="180rpx" height="180rpx">
				<view class="imgBox">
					<u-icon name="plus" color="#EBEBEB" size="20"></u-icon>
				</view>
			</u-upload>
		</view>
		<view class="addressBox" @click="selectAddress">
			<view class="address">
				<image src="../../static/strategy/address.png"></image>
				<view>{{temp.address?temp.address:'所在位置'}}</view>
			</view>
			<u-icon name="arrow-right" color="#333" size="14"></u-icon>
		</view>
		<view class="release" @click="releaseTap">发布攻略</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		addRaider,getRaiderDetail,updateRaider
	} from '@/api/strategy.js'
	export default {
		data() {
			return {
				temp: {
					title: '',
					context: '',
					address: '',
					introductionImg: [],
					latitude: '',
					longitude: ''
				},
				fileList1: [],
				rules: {
					title: {
						type: 'string',
						required: true,
						message: '请填写标题',
						trigger: ['blur', 'change']
					},
					context: {
						type: 'string',
						required: true,
						message: '请添加正文',
						trigger: ['blur', 'change']
					},
				},
				id:'',
			}
		},
		computed: mapState(['uploadUrl', 'token']),
		onLoad(options) {
			if(options.id){
				this.id=options.id
				this.getDetail()
			}
			
		},
		methods: {
			// 详情
			async getDetail(){
				const {data}=await getRaiderDetail({id:this.id})
				for (let key in data) {
				 this.temp[key]=data[key]
				}
				if(data.introductionImg.length>0){
					this.fileList1=data.introductionImg.map(item=>{
						return {url:item}
					})
				}
			},
			// 选择位置
			selectAddress() {
				const that = this
				uni.chooseLocation({
					success: function(res) {
						that.temp.address = res.name
						that.temp.latitude = res.latitude
						that.temp.longitude = res.longitude
					}
				});
			},
			releaseTap() {
				const that=this
				this.$refs.form.validate().then(async (res) => {
					if (this.fileList1.length > 0) {
						this.temp.introductionImg = this.fileList1.map(item => {
							return item.url
						})
					}
					try{
						if(that.id){
							that.temp.id=that.id
							await updateRaider(this.temp)
							uni.showToast({
								title: '发布成功'
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)
							
						}else{
							await addRaider(this.temp)
							uni.showToast({
								title: '发布成功'
							})
							setTimeout(() => {
								let pages = getCurrentPages(); // 当前页面
								let beforePage = pages[pages.length - 2]; // 上一页
								uni.navigateBack({
								    success: function() {
								        beforePage.onLoad(); // 执行上一页的onLoad方法
								    }
								});
							}, 1000)
						}
						
					}catch(res){
						uni.$u.toast(res.data.msg)
					}
					
				}).catch(errors => {
					uni.$u.toast('请填写完整')
				})
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: this.uploadUrl,
						filePath: url,
						name: 'file',
						header: {
							Authorization: "Bearer " + this.token
						},
						formData: {
							type: 'img'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(JSON.parse(res.data).data.url)
							}, 1000)
						}
					});
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		padding-bottom: 150rpx;
	}
	.release {
		width: 642rpx;
		height: 94rpx;
		background: #08B761;
		box-shadow: 0px 0px 20rpx 2rpx rgba(204, 204, 204, 0.1);
		border-radius: 24rpx;
		position: fixed;
		left: 50%;
		margin-left: -321rpx;
		bottom: 48rpx;
		font-weight: 500;
		color: #FFFFFF;
		font-size: 30rpx;
		text-align: center;
		line-height: 94rpx;
		z-index: 1111;
	}

	.addressBox {
		margin-top: 40rpx;
		border-bottom: 1px solid #F7F7F7;
		padding-bottom: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.address {
			display: flex;
			align-items: center;
			margin-right: 24rpx;

			image {
				width: 32rpx;
				height: 32rpx;
			}

			view {
				font-weight: 400;
				color: #333333;
				margin-left: 12rpx;
				font-size: 30rpx;
				flex: 1;
			}
		}
	}

	.imgBox {
		width: 180rpx;
		height: 180rpx;
		border-radius: 24rpx;
		border: 1px solid #EBEBEB;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.uploadBox {
		margin-top: 70rpx;
		border-bottom: 1px solid #F7F7F7;
		padding-bottom: 34rpx;
	}

	.content {
		padding: 24rpx;
		box-sizing: border-box;
	}
</style>
