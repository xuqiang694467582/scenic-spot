<template>
	<view class="abbr">
		<view class="textArea">
			<view class="title">评价内容</view>
			<u--textarea v-model="formData.commentDetails" height="100" placeholder="请输入您对该景区评价以及景区的亮点和不足吧~" border="none" ></u--textarea>
		</view>
		<view>
			<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" accept='image' name="1"
				:multiple="multiple" maxCount="9">
			</u-upload>
		</view>
		<view class="rate">
			<view class="title">总体评价</view>
			<u-rate :count="count" inactiveColor="#D1D1D1" activeColor="#FFB124" v-model="formData.score"></u-rate>
		</view>
		<view class="switch">
			<view class="title">匿名评价</view>
			<u-switch v-model="formData.isAnonymous"></u-switch>
		</view>
		<view class="btn">
			<u-button color="#08B761" text="确认发布" :customStyle="{ 'border-radius':'24rpx' }" @click="submitRelese"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		addComment
	} from '@/api/parktour.js';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				formData: {
					attractionPointId: '',
					commentDetails: '',
					score: '3',
					isAnonymous: false,
					commentImg: []
				},
				count: '5',
				// 是否开启图片多选，部分安卓机型不支持
				multiple: false,
				// 显示已上传的文件列表
				fileList: [],
			}
		},
		computed: mapState(['uploadUrl','token']),
		onLoad(option) {
			this.formData.attractionPointId = option.id;
		},
		methods: {
			async submitRelese(){
				// 判断是否填写评价内容
				if (this.formData.commentDetails !== ''){
					if (this.fileList.length > 0) {
						this.formData.commentImg = this.fileList.map(item => {
							return item.url
						})
					}
					console.log(this.formData);
					await addComment({
						...this.formData
					})
					uni.navigateBack({
						delta: -1
					})
				} else {
					uni.$u.toast('请先输入评价内容！')
				}
			},
			// 删除图片
			deletePic(event) {
				this.fileList.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this.fileList.length
				lists.map((item) => {
					this.fileList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this.fileList[fileListLen]
					this.fileList.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
					this.$emit('uploadList', this.fileList)
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: this.uploadUrl, // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						header: {
							Authorization: "Bearer " + this.token
						},
						formData: {
							type: 'img'
						},
						success: (res) => {
							resolve(JSON.parse(res.data).data.url)
						}
					});
				})
			},
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
