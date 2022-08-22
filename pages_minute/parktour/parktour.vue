<template>
	<view class="back">
		<!-- 顶部菜单列表 -->
		<view class="top">
			<view class="top-menu" v-for="(item,index) in menulist" :key="index" @click="getMenu(item.type)">
				<image :src="menuType === item.type ? item.imgUrls:item.imgUrl"></image>
				<text :style="{'color': menuType === item.type ? '#08B761':'#999999' }" class="top-menu-text">{{ item.text }}</text>
			</view>
		</view>
		<!-- 地图 -->
		<view class="mapview">
			<map :markers="markers" :latitude="latitude" :longitude="longitude" :show-location="true" @tap="mapTab"></map>
		</view>
		<!-- 底部右侧按钮 -->
		<view class="map-btn">
			<view class="map-btn-c" @click="contactClick()">
				<image src="../../static/parktour/img_2.png"></image>
			</view>
			<view class="map-btn-c" @click="positionClick()">
				<image src="../../static/parktour/img_1.png"></image>
			</view>
		</view>
		<!-- 底部弹框 -->
		<u-popup :show="show" mode="bottom" :overlay="false" round="12">
			<view class="cont-list">
				<text>出淤泥而不染，濯清涟而不妖</text>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 顶部菜单列表
				menuType: 1,
				menulist:[
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
				// 当前地图中心经纬度
				latitude: "30.463158909233673",
				longitude: "104.58973142824175",
				// 标记点，多个对象可生成多个点
				markers:[
					{
						id: 1,
						width: 20,
						height: 30,
						latitude: "30.463158909233673",
						longitude: "104.58973142824175",
						title: '前锋村景区'
					},
					{
						id: 2,
						width: 20,
						height: 30,
						latitude: "30.463208909233673",
						longitude: "104.58945142824175",
						title: '前锋村景区'
					}
				],
				show: false,
			}
		},
		methods: {
			// 顶级顶部菜单触发
			getMenu(type){
				this.show = false;
				this.menuType = type;
				setTimeout(()=> {
					this.show = true;
				},500)
			},
			// 联系客服
			contactClick(){
				
			},
			// 点击地图触发
			mapTab(){
				this.show = false;
			},
			// 定位/点击以后跳至当前所在位置
			positionClick(){
				let _this = this;
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function (res) {
						_this.latitude = res.latitude;
						_this.longitude = res.longitude;
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.back{
	background-color: #f2f1ed;
}
.top{
	width: 100%;
	height: 152rpx;
	background-color: #f8f8f8;
	border-radius: 0 0 24rpx 24rpx;
	display: flex;
	justify-content: space-around;
	position: fixed;
	top: 0;
	z-index: 99;
	
	.top-menu{
		display: flex;
		flex-direction: column;
		justify-content: center;

		image{
			width: 60rpx;
			height: 60rpx;
		}
		.top-menu-text{
			font-size: 28rpx;
		}
	}
}
.mapview{
	width: 100%;
	height: 100vh;
	map{
		width: 100%;
		height: 100%;
	}
}

.map-btn{
	position: fixed;
	top: 152rpx;
	right: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	image{
		width: 80rpx;
		height: 80rpx;
		margin-top: 28rpx;
	}
}

.cont-list{
	width: 100%;
	height: 500rpx;
	padding: 20rpx;
}
</style>
