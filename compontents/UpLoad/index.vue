<template>
	<view>
		<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" :accept='accept' name="1"
			:multiple="multiple" :maxCount="maxCount" :width="width + 'rpx'" :height="height + 'rpx'">
			<image :src="src" mode="widthFix" :style="{width: width + 'rpx', height: height + 'rpx'}">
			</image>
		</u-upload>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		props: {
			// 接受的文件类型：all | media | image | file | video
			accept: {
				type: String,
				default: 'image'
			},
			// 最大选择图片的数量
			maxCount: {
				type: Number,
				default: 9
			},
			src: {
				type: String,
			},
			// 自定义样式宽度
			width: {
				type: String,
				default: '150'
			},
			// 自定义样式高度
			height: {
				type: String,
				default: '150'
			},
		},
		data() {
			return {
				// 是否开启图片多选，部分安卓机型不支持
				multiple: false,
				// 显示已上传的文件列表
				fileList: [],
			}
		},
		computed: mapState(['uploadUrl','token']),
		methods: {
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

</style>
