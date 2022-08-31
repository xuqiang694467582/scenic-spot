<template>
	<view class="content">
		<u--form labelPosition="top" :model="temp" :rules="rules" ref="form">
			<u-form-item label="标题" prop="title" borderBottom>
				<u--textarea v-model="temp.title" placeholder="输入一个符合您攻略的标题吧~" fontSize="30rpx" count maxlength="50"
					border="none" height="40rpx"></u--textarea>
			</u-form-item>
			<u-form-item label="正文" prop="info">
				<u--textarea v-model="temp.info" placeholder="添加正文~" fontSize="30rpx" border="none" autoHeight>
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
		<view class="addressBox">
			<view class="address">
				<image src="../../static/strategy/address.png"></image>
				<view>简阳市·桃花村</view>
			</view>
			<u-icon name="arrow-right" color="#333" size="14"></u-icon>
		</view>
		<view class="release">发布攻略</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				temp: {
					title: '',
					info: ''
				},
				fileList1: []
			}
		},
		methods: {
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
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
		}
	}
</script>

<style lang="scss">
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
