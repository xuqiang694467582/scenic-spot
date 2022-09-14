<template>
	<view>
		<view class="typeBox">
			<u-sticky bgColor="#fff" >
			   <u-tabs :list="typeList" lineColor="#08B761" :activeStyle="{color: '#08B761',fontSize:'28rpx'}" :inactiveStyle="{color: '#333333',fontSize:'28rpx'}" :itemStyle="{ height: '44px',width:'33.33%',padding:'0'}" @click="changeType"></u-tabs>
			 </u-sticky>
		</view>
		<Product v-show="curt===0" ref="product"/>
		<Shop v-show="curt===1" ref="shop"/>
		<Strategy v-show="curt===2" ref="strategy"/>
		
	</view>
</template>

<script>
	import Product from './Product.vue'
	import Shop from './Shop.vue'
	import Strategy from './Strategy.vue'
	export default {
		components:{
			Product,
			Shop,
			Strategy
		},
		data() {
			return {
				typeList:[
					{name:'商品收藏'},
					{name:'店铺收藏'},
					{name:'攻略收藏'}
				],
				curt:0,
				listQueryP:{
					type:0,
					page :1,
					pageSize:10
				},
				listQueryS:{
					type:1,
					page :1,
					pageSize:10
				},
			}
		},
		onPullDownRefresh() {
			if(this.curt==0){
				this.$refs.product.pullDownRefresh()
			}else{
				this.$refs.strategy.pullDownRefresh()
			}
		},
		onReachBottom() {
			if(this.curt==0){
				this.$refs.product.reachBottom()
			}else{
				this.$refs.strategy.reachBottom()
			}
		},
		methods: {
			
			changeType(e){
				this.curt=e.index
			}
		}
	}
</script>

<style lang="scss">
	.typeBox{
		padding-bottom: 36rpx;
		background-color: #fff;
	}
page{
	background: #F2F2F4;
	padding-bottom: 150rpx;
}
</style>
