<template>
	<view class="reserve">
		<view class="reserve-title">
			<!-- 图片 -->
			<view class="reserve-title-image">
				<image :src="formData.mainImage"></image>
			</view>
			<!-- 介绍 -->
			<view class="content">
				<text>{{ formData.name }}</text>
				<view style="display: flex;align-items: center;justify-content: space-between;margin: 20rpx 0;">
					<view style="display: flex;align-items: center;">
						<text style="color: #FE5A3D;font-size: 30rpx;font-weight: bold;margin-right: 10rpx;">￥{{ formData.price }}</text>
						<text style="color: #999;font-size: 24rpx;margin-right: 15rpx;text-decoration: line-through;">￥{{ formData.originalPrice }}</text>
						<!-- <text style="color: #999;font-size: 24rpx;">已售1000+</text> -->
					</view>
					<view class="btn" @click="gotoPage()">
						预定
					</view>
				</view>
				<!-- <u-divider></u-divider>
				<view style="display: flex;align-items: center;margin-bottom: 10rpx;">
					<text style="font-size: 24rpx;color: #333;margin-right: 20rpx;">提示</text>
					<text style="font-size: 24rpx;color: #999;">周一至周日11：00-13：00、17：00-21：30可用</text>
				</view>
				<view style="display: flex;align-items: center;">
					<text style="font-size: 24rpx;color: #333;margin-right: 20rpx;">保障</text>
					<text style="font-size: 24rpx;color: #999;">可退款，过期自动退款</text>
				</view> -->
			</view>
		</view>
		<!-- 菜品 -->
		<view class="block">
			<text style="font-weight: bold;">套餐菜品</text>
			<view>
				<view style="display: flex;justify-content: space-between;margin: 20rpx 0;" v-for="(item,index) in formData.packageDishList" :key="index">
					<text style="color: #333;font-size: 28rpx;">{{ item.dishName }}（{{ item.number }}份）</text>
					<text style="font-weight: bold;">￥{{ item.price }}</text>
				</view>
			</view>
		</view>
		<!-- 购买须知 -->
		<!-- <view class="block">
			<text style="font-weight: bold;">购买须知</text>
			<view>
				<view style="margin: 20rpx 0;display: flex;">
					<u-tag text="有效期限" bgColor="#08B761" borderColor="#08B761"></u-tag>
				</view>
				<text style="font-size: 26rpx;">2021.04.21-2021.05.26(周末、法定节假日通用)</text>
				<view style="margin: 20rpx 0;display: flex;">
					<u-tag text="使用时间" bgColor="#08B761" borderColor="#08B761"></u-tag>
				</view>
				<text style="font-size: 26rpx;margin: 20rpx 0;">11：00-13:00、17:00-21:00</text>
			</view>
		</view> -->
		<!-- 可用商户 -->
		<view class="block">
			<!-- <text style="font-weight: bold;">可用商户</text>
			<view style="display: flex;align-items: center;margin-top: 20rpx;">
				<image style="width: 160rpx;height: 160rpx;margin-right: 20rpx;" src="../../static/logo.png"></image>
				<view>
					<text>{{ formData.diningRoomName }}</text>
					<view style="display: flex;align-items: center;">
						<view class="tag1">4.8分</view>
						<view class="tag2">108/人</view>
						<u-tag text="500+点评" bgColor="#08B761" borderColor="#08B761"></u-tag>
					</view>
					<text style="color: #333;font-size: 24rpx;">开放时间: 11:00-13:00 17:00-21:00</text>
				</view>
			</view>
			<u-divider></u-divider> -->
			<text style="font-weight: bold;">本店套餐</text>
			<view style="display: flex;flex-wrap: wrap;justify-content: space-between;">
				<view style="width: 49%;margin-top: 20rpx;" v-for="(item,index1) in packageList" :key="index1" @click="goPage(item.id)">
					<image style="width: 100%;height: 236rpx;border-radius: 20rpx;" :src="item.mainImage"></image>
					<view style="font-size: 30rpx;margin: 20rpx;">{{ item.name }}</view>
					<view style="display: flex;align-items: center;justify-content: space-between;width: 70%;">
						<text style="font-size: 30rpx;color: #FF1616;font-weight: bold;">￥{{ item.price }}</text>
						<text style="font-size: 24rpx;color: #999;text-decoration: line-through;">￥{{ item.originalPrice }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		diningPackDetail,
		diningRoomDetail
	} from '@/api/parktour.js';
	export default {
		data() {
			return {
				formData: {},
				packageList: [],
			}
		},
		onLoad(option) {
			this.load(option.id)
		},
		methods: {
			async load(id){
				const { data } = await diningPackDetail({
					id: id
				})
				this.formData = data;
				this.roomList(data.diningRoomId)
			},
			async roomList(id) {
				const { data } = await diningRoomDetail({
					diningRoomId: id
				})
				this.packageList = data.records;
			},
			gotoPage(){
				uni.navigateTo({
					url: `/pages_minute/submitorder/submitorder?id=${this.formData.id}`
				})
			},
			goPage(id) {
				uni.navigateTo({
					url: `/pages_minute/reserve/reserve?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f4f4f4;
}

.reserve{
	padding: 20rpx;
}

.reserve-title{
	background-color: #fff;
	border-radius: 24rpx;

	.reserve-title-image{
		width: 100%;
		height: 364rpx;
		
		image{
			width: 100%;
			height: 100%;
			border-radius: 20rpx;	
		}
	}
	
}

.content{
	padding: 20rpx;
}

.btn{
	width: 120rpx;
	height: 60rpx;
	background: linear-gradient(180deg, #9AD7B8 0%, #14BB69 100%);
	display: flex;
	font-size: 28rpx;
	color: #fff;
	align-items: center;
	justify-content: center;
	border-radius: 10rpx;
}

.block{
	margin-top: 20rpx;
	margin-bottom: 20rpx;
	padding: 20rpx;
	background-color: #fff;
	border-radius: 20rpx;
}

.tag1{
	width: 100rpx;
	border-radius: 10rpx 0 10rpx 0;
	background: linear-gradient(180deg, rgba(243,152,43,1) 50%, rgba(255,83,62,1) 85%);
	display: flex;
	color: #fff;
	font-size: 24rpx;
	align-items: center;
	justify-content: center;
	margin-right: 20rpx;
}

.tag2{
	width: 100rpx;
	border-radius: 20rpx;
	background: #EDF8EF;
	display: flex;
	color: #333;
	font-size: 24rpx;
	align-items: center;
	justify-content: center;
	margin-right: 20rpx;
}
</style>
