<template>
	<view class="content">
		 <u-parse :content="detail.particular" ></u-parse>
	</view>
</template>

<script>
	import {getBannerDetail} from '@/api/index.js'
	export default {
		 
		data() {
			return {
				id:'',
				detail:''
			}
		},
		onLoad(options) {
			this.id=options.id
			this.getDetail()
		},
		methods: {
			async getDetail(){
				const {data}=await getBannerDetail({id:this.id})
				this.detail=data
			}
		}
	}
</script>

<style>
.content{
	padding: 32rpx;
	box-sizing: border-box;
}
</style>
