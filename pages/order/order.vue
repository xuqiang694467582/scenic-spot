<template>
	<view>
		<!-- 导航栏 -->
		<uni-nav-bar :statusBar="true" :border="false" leftWidth="530rpx" backgroundColor="transparent">
			<view slot="left">
				<u-search v-model="keyword" :showAction="false" placeholder="搜索全部订单"></u-search>
			</view>
		</uni-nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: ''
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
