<template>
	<view>
		<view>
			<u-tabs :list="tabslist" :current="type" lineColor="#08B761" :activeStyle="{ color: '#08B761' }" @click="click"></u-tabs>
		</view>
		<!-- 推荐套餐 -->
		<view class="content-combo" v-if="type === 0">
			<view class="combo-list" v-for="(item, index) in recommend" :key="index">
				<view style="display: flex;align-items: center;" @click="gotoRese(item.id)">
					<image style="width: 152rpx;height: 152rpx;margin-right: 20rpx;" :src="item.mainImage"></image>
					<view>
						<text>{{ item.name }}</text>
						<view style="display: flex;flex-wrap: wrap;margin-top: 20rpx;">
							<view v-for="(item1,index1) in item.label" :key="index1"
								style="margin-right: 10rpx;margin-bottom: 10rpx;">
								<u-tag size="mini" :text="item1" bgColor="#EDF8EF" borderColor="#08B761"
									color="#08B761"></u-tag>
							</view>
						</view>
						<view style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
							<text style="font-size: 30rpx;color: #FF1616;font-weight: bold;">￥{{ item.price }}</text>
							<text
								style="font-size: 24rpx;color: #999;text-decoration: line-through;">￥{{ item.originalPrice }}</text>
						</view>
					</view>
				</view>
				<view class="combo-list-btn" @click="getReserve(item)">
					预定
				</view>
			</view>
			<view style="margin: 4rem 0;" v-if="recommend.length === 0 && type === 0">
				<u-empty mode="list" text="当前商家暂无推荐套餐"></u-empty>
			</view>
		</view>
		<!-- 商家菜品 -->
		<view class="content-combo" v-if="type === 1">
			<view class="combo-list" v-for="(item, index) in dishesList" :key="index">
				<view style="display: flex;">
					<image style="width: 152rpx;height: 152rpx;margin-right: 20rpx;" :src="item.coverImg"></image>
					<view>
						<view style="font-size: 30rpx;font-weight: bold;color: #333;">{{ item.name }}</view>
						<view style="font-size: 24rpx;color: #666;margin: 15rpx 0;">{{ item.description }}</view>
						<view style="font-size: 34rpx;color: #FE5A3D;font-weight: bold;">￥{{ item.price }}</view>
					</view>
				</view>
			</view>
			<view style="margin: 4rem 0;" v-if="dishesList.length === 0 && type === 1">
				<u-empty mode="list" text="当前商家暂无菜品"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	import { diningRecoDetail, diningRoomDish } from '@/api/parktour.js'
	export default {
		data() {
			return {
				id: '',
				type: 0,
				tabslist: [{
						name: '推荐套餐'
					},
					{
						name: '商家菜品'
					}
				],
				recommend:[],
				dishesList: [],
				listQuery: {
					page: 1,
					pageSize: 10,
				},
			}
		},
		onReachBottom(){
			this.listQuery.page++
			this.load()
		},
		onLoad(option) {
			this.id = option.id;
			this.type = Number(option.type);
			this.load()
		},
		methods: {
			async load() {
				if(this.type === 0){
					const { data } = await diningRecoDetail({
						diningRoomId: this.id,
					})
					this.recommend = data;	
				} else {
					this.dishesList = [];
					const { data } = await diningRoomDish({
						diningRoomId: this.id,
						...this.listQuery
					})
					this.dishesList = this.dishesList.concat(data.records);
				}
			},
			// 预定
			getReserve(val) {
				uni.navigateTo({
					url: `/pages_minute/submitorder/submitorder?id=${val.id}`
				})
			},
			click(item) {
				this.type = item.index;
				this.listQuery.page = 1;
				this.load()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F3F3F3;
	}

	.content-combo {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 20rpx;
		margin: 20rpx 0;

		.text {
			margin-bottom: 20rpx;
		}

		.combo-list {
			margin: 20rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&-btn {
				width: 90rpx;
				height: 52rpx;
				background: linear-gradient(180deg, #9AD7B8 0%, #14BB69 100%);
				display: flex;
				color: #fff;
				align-items: center;
				justify-content: center;
				border-radius: 10rpx;
				padding: 10rpx;
			}
		}
	}
</style>
