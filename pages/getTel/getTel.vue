<template>
	<view class="btn">
		<u-button type="success" icon="chat" openType="getPhoneNumber" @getphonenumber="onGetPhoneNumber">授权手机号</u-button>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {addTel} from '@/api/user.js'
	export default {
		data() {
			return {
				
			}
		},
		computed:mapState(['token']),
		methods: {
			onGetPhoneNumber(e){  
				uni.showLoading({
					title: '加载中'
				});
				const that = this
				if(e.detail.errMsg=="getPhoneNumber:fail user deny"){       //用户据绝授权  
					uni.hideLoading();
				}else{   					
					that.login(e.detail.code)
				
				}
			},
			async login(code){
				await addTel({code:code})
				this.$store.dispatch('getUserInfos').then(()=>{
					uni.hideLoading();
					uni.reLaunch({
							url:'/pages/index/index'
						})
				}).catch(()=>{
					uni.hideLoading();
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.btn{
	padding: 40rpx;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center
}
</style>
