<template>
	<view class="back">
		<!-- 顶部菜单列表 -->
		<view class="top">
			<view class="top-menu" v-for="(item,index) in menulist" :key="index" @click="getMenu(item.type)">
				<image :src="menuType === item.type ? item.imgUrls:item.imgUrl"></image>
				<text :style="{'color': menuType === item.type ? '#08B761':'#999999' }"
					class="top-menu-text">{{ item.text }}</text>
			</view>
		</view>
		<!-- 地图 -->
		<view class="mapview">
			<map :markers="markers" :latitude="latitude" :longitude="longitude" :show-location="true"
				@tap="mapTab"></map>
		</view>
		<!-- 底部右侧按钮 -->
		<view class="map-btn">
			<view class="map-btn-c" @click="contactClick()">
				<image src="@/static/parktour/img_2.png"></image>
			</view>
			<view class="map-btn-c" @click="positionClick()">
				<image src="@/static/parktour/img_1.png"></image>
			</view>
		</view>
		<!-- 底部列表弹框 -->
		<u-popup :show="show" mode="bottom" :overlay="false" round="12">
			<view class="cont-list">
				<view class="list" v-for="(item,index1) in list">
					<view class="list-l"  @click="gotoPage(item)">
						<image :src="item.coverImg"></image>
						<view class="list-l-r">
							<text>{{ item.name }}</text>
							<u-icon name="map-fill" :label="'距离你' + item.distanceStr" color="#08B761" size="24rpx" labelSize="24rpx"></u-icon>
						</view>
					</view>
					<view class="list-r">
						<image src="@/static/parktour/navigation.png" @click="getAss(item)"></image>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 底部简介弹框 -->
		<!-- <u-popup :show="showDetail" mode="bottom" :overlay="false" round="12">
			<view class="content">
				<view class="content-title">
					<view style="display: flex;align-items: center;">
						<view style="display: flex;flex: 1;">
							<image style="width: 192rpx;height: 192rpx;margin-right: 10rpx;" src="../../static/parktour/back_image.png"></image>
							<view style="flex: 1;">
								<text>元宫门与二十四臣像</text>
								<view class="content-title-one">
									<view class="content-title-one-left">
										<view class="content-title-one-left-t">
											4.8分
										</view>
										<u-tag text="500+点评" bgColor="#08B761" borderColor="#08B761" ></u-tag>
									</view>
								</view>
								<view class="content-title-tag">
									<view class="content-title-tag-c" v-for="item in 5">
										<u-tag text="古老建筑" size="mini" :plain="true" borderColor="#08B761" color="#08B761" bgColor="#EDF8EF"></u-tag>
									</view>
								</view>
							</view>
						</view>
						<image style="width: 58rpx;height: 58rpx;" src="@/static/parktour/navigation.png"></image>
					</view>
					<u-read-more showHeight="50" closeText="展开" :toggle="true">
						<rich-text :nodes="content"></rich-text>
					</u-read-more>
				</view>
				<view class="content-image">
					<view class="text">图片介绍</view>
					<u-album maxCount="3" space="10" singleSize="210rpx" multipleSize="100" :urls="urls"></u-album>
				</view>
			</view>
		</u-popup> -->
	</view>
</template>

<script>
	import { soptList, diningList, hotelList, mentList } from '@/api/parktour.js';
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				// 顶部菜单列表
				menuType: 1,
				menulist: [
					{
						type: 1,
						imgUrl: '../../static/parktour/tm1.png',
						imgUrls: '../../static/parktour/tm_1.png',
						text: '景点'
					},
					{
						type: 2,
						imgUrl: '../../static/parktour/tm2.png',
						imgUrls: '../../static/parktour/tm_2.png',
						text: '餐厅'
					},
					{
						type: 3,
						imgUrl: '../../static/parktour/tm3.png',
						imgUrls: '../../static/parktour/tm_3.png',
						text: '酒店'
					},
					{
						type: 4,
						imgUrl: '../../static/parktour/tm4.png',
						imgUrls: '../../static/parktour/tm_4.png',
						text: '娱乐'
					}
				],
				list: [],
				// 当前地图中心经纬度
				latitude: "30.463158909233673",
				longitude: "104.58973142824175",
				// 标记点，多个对象可生成多个点
				markers: [],
				show: true,
			}
		},
		computed: mapState(['location']),
		onLoad() {
			this.load();
		},
		methods: {
			// 获取列表
			async load(){
				// 清空地图标点
				this.markers = [];
				switch(this.menuType){
					case 1:
						const { data } = await soptList({
							latitude: "30.463158909233673",
							longitude: "104.58973142824175",
						});
						// 列表取值
						this.list = data.records;
						// 地图标点
						data.records.map((val) => {
							this.markers.push({
								id: Number(val.id),
								width: 20,
								height: 30,
								latitude: val.latitude,
								longitude: val.longitude,
								title: val.name
							})
						})
						break;
					case 2:
						const data1 = await diningList({
							latitude: "30.463158909233673",
							longitude: "104.58973142824175",
						})
						this.list = data1.data.records;
						// 地图标点
						data1.data.records.map((val) => {
							this.markers.push({
								id: Number(val.id),
								width: 20,
								height: 30,
								latitude: val.latitude,
								longitude: val.longitude,
								title: val.name
							})
						})
						break;
					case 3:
						const data2 = await hotelList({
							latitude: "30.463158909233673",
							longitude: "104.58973142824175",
						})
						this.list = data2.data.records;
						// 地图标点
						data2.data.records.map((val) => {
							this.markers.push({
								id: Number(val.id),
								width: 20,
								height: 30,
								latitude: val.latitude,
								longitude: val.longitude,
								title: val.name
							})
						})
						break;
					case 4:
						const data3 = await mentList({
							latitude: "30.463158909233673",
							longitude: "104.58973142824175",
						});
						this.list = data3.data.records;
						// 地图标点
						data3.data.records.map((val) => {
							this.markers.push({
								id: Number(val.id),
								width: 20,
								height: 30,
								latitude: val.latitude,
								longitude: val.longitude,
								title: val.name
							})
						})
				}
			},
			// 点击顶部菜单触发
			getMenu(type) {
				this.show = true;
				this.menuType = type;
				this.list = [];
				this.load();
			},
			// 联系客服
			contactClick() {

			},
			// 点击地图触发
			mapTab() {
				this.show = false;
			},
			// 定位/点击以后跳至当前所在位置
			positionClick() {
				let _this = this;
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function(res) {
						_this.latitude = res.latitude;
						_this.longitude = res.longitude;
					}
				});
			},
			gotoPage(val){
				switch(this.menuType){
					case 1:
						uni.navigateTo({
							url: `/pages_minute/parktourDetail/parktourDetail?id=${val.id}`
						})
						break;
					case 2:
						uni.navigateTo({
							url: `/pages_minute/diningDetail/diningDetail?id=${val.id}`
						})
						break;
				}
			},
			getAss(val){
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function (res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							success: function () {
								console.log('success');
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.back {
		background-color: #f2f1ed;
	}

	.top {
		width: 100%;
		height: 152rpx;
		background-color: #f8f8f8;
		border-radius: 0 0 24rpx 24rpx;
		display: flex;
		justify-content: space-around;
		position: fixed;
		top: 0;
		z-index: 99;

		.top-menu {
			display: flex;
			flex-direction: column;
			justify-content: center;

			image {
				width: 60rpx;
				height: 60rpx;
			}

			.top-menu-text {
				font-size: 28rpx;
			}
		}
	}

	.mapview {
		width: 100%;
		height: 100vh;

		map {
			width: 100%;
			height: 100%;
		}
	}

	.map-btn {
		position: fixed;
		top: 152rpx;
		right: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		image {
			width: 80rpx;
			height: 80rpx;
			margin-top: 28rpx;
		}
	}

	.cont-list {
		height: 500rpx;
		padding: 20rpx;
		overflow: auto;
	}

	.list {
		height: 100rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-l {
			display: flex;
			align-items: center;

			image {
				width: 100rpx;
				height: 100rpx;
				margin-right: 20rpx;
			}

			&-r {
				height: 100rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				
				text {
					font-size: 30rpx;
					font-weight: 500;
					color: #333;
				}
			}
		}
		
		&-r{
			image {
				width: 58rpx;
				height: 58rpx;
			}
		}
	}
	
	// .content{
	// 	// height: 800rpx;
	// 	padding: 20rpx;
		
	// 	.content-title{
	// 		background-color: #fff;
	// 		border-radius: 24rpx;
	// 		padding: 20rpx;
			
	// 		.content-title-one{
	// 			margin: 10rpx 0;
	// 			display: flex;
	// 			justify-content: space-between;
	// 			align-items: center;
	// 			&-left {
	// 				display: flex;
	// 				&-t {
	// 					width: 100rpx;
	// 					border-radius: 10rpx 0 10rpx 0;
	// 					background: linear-gradient(180deg, rgba(243,152,43,1) 50%, rgba(255,83,62,1) 85%);
	// 					display: flex;
	// 					color: #fff;
	// 					font-size: 24rpx;
	// 					align-items: center;
	// 					justify-content: center;
	// 					margin-right: 20rpx;
	// 				}
	// 			}
	// 		}
	// 		.content-title-tag{
	// 			display: flex;
	// 			flex-wrap: wrap;
				
	// 			.content-title-tag-c{
	// 				margin-right: 10rpx;
	// 				margin-bottom: 10rpx;
	// 			}
	// 		}
	// 	}
		
	// 	.content-image{
	// 		background-color: #fff;
	// 		border-radius: 24rpx;
	// 		padding: 20rpx;
	// 		margin-top: 20rpx;
			
	// 		.text{
	// 			margin-bottom: 20rpx;
	// 		}
	// 	}
	// }
</style>
