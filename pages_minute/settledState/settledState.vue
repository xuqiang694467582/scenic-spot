<template>
	<view>
		<!-- 待审核 -->
		<view class="statusPage" v-if="type === '1'">
			<u-icon name="clock-fill" size="90" color="#FEBD26"></u-icon>
			<view class="statusPage-text">正在审核中</view>
			<view class="statusPage-texts">预计48小时内审核完成，请您耐心等待</view>
			<view class="statusPage-router" @click="backCenter">
				<view>返回个人中心</view>
				<u-icon name="arrow-right" size="15" color="#08B761"></u-icon>
			</view>
		</view>
		<!-- 审核通过 -->
		<view class="statusPage" v-if="type === '2'">
			<u-icon name="checkmark-circle-fill" size="90" color="#08B761"></u-icon>
			<view class="statusPage-text">提交审核成功</view>
			<view class="statusPage-texts">您的审核已通过，可登录后台查看店铺</view>
			<view class="statusPage-router" @click="backCenter">
				<view>返回个人中心</view>
				<u-icon name="arrow-right" size="15" color="#08B761"></u-icon>
			</view>
		</view>
		<!-- 审核失败 -->
		<view class="statusPage" v-if="type === '3'">
			<u-icon name="close-circle-fill" size="90" color="#FE3D3D"></u-icon>
			<view class="statusPage-text">提交审核未通过</view>
			<view class="statusPage-texts">您的审核未通过，请重新核对后提交</view>
			<view class="statusPage-router" @click="backSettled">
				<view>返回入驻步骤</view>
				<u-icon name="arrow-right" size="15" color="#08B761"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '1'
			}
		},
		onLoad(option) {
			this.type = option.type;
		},
		methods: {
			backCenter(){
				uni.switchTab({
					url: '/pages/my/my'
				})
			},
			backSettled(){
				uni.redirectTo({
					url: '/pages_minute/addSettled/addSettled'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.statusPage{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5rem;
	
	&-text{
		color: #333;
		font-size: 40rpx;
		font-weight: bold;
		margin: 20px 0;
	}
	
	&-texts{
		color: #999;
		font-size: 32rpx;
		    margin: 20px 0;
	}
	
	&-router{
		font-size: 30rpx;
		color: #08B761;
		display: flex;
		align-items: center;
	}
	
}
</style>
