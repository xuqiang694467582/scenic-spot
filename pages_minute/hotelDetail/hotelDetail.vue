<template>
	<view class="pages">
		<view class="banner">
			<image src="../../static/back.png" :style="{top:barHightTop+'px'}" class="backImg" @click="backTap"></image>
			<image :src="formData.coverImg" class="bannerImg"></image>
		</view>
		<view class="content">
			<view class="content-title">
				<text>{{ formData.name }}</text>
				<view class="content-title-one">
					<view class="content-title-one-left">
						<view class="content-title-one-left-t">
							{{ formData.score }}分
						</view>
						<!-- <view class="content-title-one-left-l">
							108/人
						</view> -->
						<!-- <u-tag text="500+点评" bgColor="#08B761" borderColor="#08B761" ></u-tag> -->
					</view>
					<view>
						<image style="margin-right: 20rpx;" src="@/static/parktour/phone.png" @click="getPhone"></image>
						<image src="@/static/parktour/navigation.png" @click="getAss()"></image>
					</view>
				</view>
				<!-- <u-divider></u-divider> -->
				<view>
					<view>
						<!-- <u-icon name="clock-fill" color="#08B761" :label="'开放时间：'+ formData.alternate.openingHours"></u-icon> -->
						<view style="display: flex;flex-wrap: wrap;margin-top: 20rpx;">
							<view v-for="item in formData.label" style="margin-right: 10rpx;margin-bottom: 10rpx;">
								<u-tag size="mini" :text="item" bgColor="#EDF8EF" borderColor="#08B761" color="#08B761">
								</u-tag>
							</view>
						</view>
					</view>
					<!-- <view style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
						<text style="font-size: 30rpx;color: #FF1616;font-weight: bold;">￥{{ item.price }}</text>
						<text style="font-size: 24rpx;color: #999;">￥{{ item.originalPrice }}</text>
					</view> -->
					<!-- <u-icon name="arrow-right"></u-icon> -->
				</view>
			</view>
			<!-- 吸顶 筛选 -->
			<!-- <u-sticky> -->
			<view class="filter">
				<view style="display: flex;align-items: center;justify-content: space-between;margin: 20rpx 0;">
					<view style="display: flex;align-items: center;" @click="showTime = true">
						<text style="font-size: 28rpx;margin-right: 12rpx;font-weight: bold;">{{ startTime }}</text>
						<view style="margin: 0 20rpx;">
							<u-tag :text="num +'晚'" shape="circle" bgColor="#fff" borderColor="#08B761" color="#08B761" size="mini"></u-tag>
						</view>
						<text style="font-size: 28rpx;margin-right: 12rpx;font-weight: bold;">{{ endTime }}</text>
					</view>
					<view style="border-left: 2rpx solid #D2D2D2;margin: 0 20rpx;height: 40rpx;"></view>
					<!-- <view style="display: flex;align-items: center;" @click="showResident = true">
						<text style="font-size: 40rpx;font-weight: bold;">1</text>
						<text style="font-size: 26rpx;color: #333;">间</text>
						<text style="font-size: 40rpx;">·</text>
						<text style="font-size: 40rpx;font-weight: bold;">{{ residentNumber }}</text>
						<text style="font-size: 26rpx;color: #333;">人</text>
					</view> -->
					<view style="font-size: 28rpx;font-weight: bold;" @click="showResident = true">
						可住{{ residentNumber }}人
					</view>
				</view>
				<view style="display: flex;align-items: center;justify-content: flex-end;">
					<!-- <view style="display: flex;align-items: center;">
						<view style="margin-right: 10rpx;" v-for="(item, index) in checkboxs" :key="index">
							<u-tag :text="item.text" :plain="!item.checked" :name="index" type="success" size="mini"
								@click="checkboxClick">
							</u-tag>
						</view>
					</view>
					<view style="border-left: 2rpx solid #D2D2D2;margin: 0 20rpx;height: 40rpx;"></view> -->
					<view style="width: 150rpx;">
						<u-button type="info" icon="arrow-down" plain hairline text="更多筛选" size="mini" @click="show = true"></u-button>
					</view>
				</view>
			</view>
			<!-- </u-sticky> -->
			<!-- tab -->
			<view class="tab">
				<u-tabs :list="Tablist" activeStyle="{ color: '#0CB662' }" lineColor="#0CB662" :scrollable="false" @click="changeType">
				</u-tabs>
			</view>
			<view class="content-image" id="foodBox">
				<view class="text">图片介绍</view>
				<scroll-view class="imgBox" scroll-x="true">
					<image :src="item" v-for="(item,index) in formData.photoExplanation" :key="index"
						@click="preViewImg(index)"></image>
					<view class="imgNum" v-show="formData.photoExplanation.length>4">{{formData.photoExplanation.length}}图
					</view>
				</scroll-view>
			</view>
			<view class="content-combo" id="hotelBox">
				<view class="content-combo-title">
					<view>优选房型</view>
					<view style="color: #999;font-size: 26rpx;" @click="toProductList()">更多></view>
				</view>
				<view class="combo-list" v-for="(item, index) in recommend" :key="index">
					<view style="display: flex;align-items: center;">
						<image style="width: 152rpx;height: 152rpx;margin-right: 20rpx;" :src="item.mainImage"></image>
						<view>
							<text>{{ item.name }}</text>
							<view style="display: flex;flex-wrap: wrap;margin-top: 20rpx;">
								<view v-for="(item1,index1) in item.label" :key="index1"
									style="margin-right: 10rpx;margin-bottom: 10rpx;">
									<u-tag size="mini" :text="item1" bgColor="#E1E1E1" borderColor="#E1E1E1"
										color="#666"></u-tag>
								</view>
							</view>
							<view style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
								<text
									style="font-size: 30rpx;color: #FF1616;font-weight: bold;">￥{{ item.price }}</text>
								<text style="font-size: 24rpx;color: #999;margin-left: 20rpx;text-decoration: line-through;">￥{{ item.originalPrice }}</text>
							</view>
						</view>
					</view>
					<veiw>
						<veiw style="font-size: 24rpx;color: #999;margin-bottom: 20rpx;">
							剩余房间:{{ item.remainingRoomNumber }}
						</veiw>
						<view>
							<u-button :disabled="item.remainingRoomNumber === 0 ? true : false" :text="item.remainingRoomNumber === 0 ? '已售罄' : '预定'" color="linear-gradient(180deg, #9AD7B8 0%, #14BB69 100%)" @click="getReserve(item)"></u-button>
						</view>
					</veiw>
				</view>
			</view>
			<!-- <view class="content-combo" id="policy">
				<view class="content-combo-title">
					<view>政策与设施</view>
				</view>
				
			</view> -->
			<!-- 附近玩乐 -->
			<NearbyPlay id="nearby" />
		</view>
		<!-- 日期 -->
		<u-calendar :show="showTime" mode="range" @confirm="confirm" @close="showTime = false" startText="住店"
			endText="离店" confirmDisabledText="请选择离店日期"></u-calendar>
		<!-- 人数 -->
		<u-picker :show="showResident" :columns="columns" @confirm="confirmRes" @cancel="showResident = false"></u-picker>
		<!-- 筛选弹框 -->
		<u-popup :show="show" mode="top" round="20" closeOnClickOverlay @close="show = false">
			<view style="padding: 20rpx;margin-top: 3rem;">
				<!-- <view style="display: flex;align-items: center;justify-content: space-between;margin: 20rpx 0;">
					<view style="display: flex;align-items: center;" @click="show = false,showTime = true">
						<text style="font-size: 28rpx;margin-right: 12rpx;font-weight: bold;">{{ startTime }}</text>
						<view style="margin: 0 20rpx;">
							<u-tag :text="num +'晚'" shape="circle" bgColor="#fff" borderColor="#08B761" color="#08B761" size="mini"></u-tag>
						</view>
						<text style="font-size: 28rpx;margin-right: 12rpx;font-weight: bold;">{{ endTime }}</text>
					</view>
					<view style="border-left: 2rpx solid #D2D2D2;margin: 0 20rpx;height: 40rpx;"></view> -->
					<!-- <view style="display: flex;align-items: center;">
						<text style="font-size: 40rpx;font-weight: bold;">1</text>
						<text style="font-size: 26rpx;color: #333;">间</text>
						<text style="font-size: 40rpx;">·</text>
						<text style="font-size: 40rpx;font-weight: bold;">1</text>
						<text style="font-size: 26rpx;color: #333;">人</text>
					</view> -->
					<!-- <view style="font-size: 28rpx;font-weight: bold;" @click="showResident = true">
						可住{{ residentNumber }}人
					</view>
				</view> -->
				<!-- <view style="display: flex;align-items: center;justify-content: flex-end;"> -->
					<!-- <view style="display: flex;align-items: center;">
						<view style="margin-right: 10rpx;" v-for="(item, index) in checkboxs" :key="index">
							<u-tag :text="item.text" :plain="!item.checked" :name="index" type="success" size="mini"
								@click="checkboxClick">
							</u-tag>
						</view>
					</view>
					<view style="border-left: 2rpx solid #D2D2D2;margin: 0 20rpx;height: 40rpx;"></view> -->
					<!-- <view style="width: 150rpx;">
						<u-button type="info" icon="arrow-up" plain hairline text="筛选" size="mini"
							@click="show = true"></u-button>
					</view>
				</view> -->
				<u-divider></u-divider>
				<view>
					<text>房型</text>
					<view style="display: flex;align-items: center;margin: 20rpx 0;">
						<view style="margin-right: 10rpx;" v-for="(item, index) in tag1" :key="index">
							<u-tag :text="item.text" :plain="!item.checked" :name="item.text" type="success"
								@click="checkClick1">
							</u-tag>
						</view>
					</view>
				</view>
				<!-- <view>
					<text>价格</text>
					<view style="display: flex;align-items: center;margin: 20rpx 0;">
						<view style="margin-right: 10rpx;" v-for="(item, index) in tag2" :key="index">
							<u-tag :text="item.text" :plain="!item.checked" :name="index" type="success"
								@click="checkClick2">
							</u-tag>
						</view>
					</view>
				</view> -->
				<view>
					<text>餐食</text>
					<view style="display: flex;align-items: center;margin: 20rpx 0;">
						<view style="margin-right: 10rpx;" v-for="(item, index) in tag3" :key="index">
							<u-tag :text="item.text" :plain="!item.checked" :name="item.text" type="success"
								@click="checkClick3">
							</u-tag>
						</view>
					</view>
				</view>
				<view>
					<text>Wifi</text>
					<view style="display: flex;align-items: center;margin: 20rpx 0;">
						<view style="margin-right: 10rpx;" v-for="(item, index) in tag4" :key="index">
							<u-tag :text="item.text" :plain="!item.checked" :name="item.text" type="success"
								@click="checkClick4">
							</u-tag>
						</view>
					</view>
				</view>
				<!-- <view>
					<text>支付方式</text>
					<view style="display: flex;align-items: center;margin: 20rpx 0;">
						<view style="margin-right: 10rpx;" v-for="(item, index) in tag5" :key="index">
							<u-tag :text="item.text" :plain="!item.checked" :name="item.text" type="success"
								@click="checkClick5">
							</u-tag>
						</view>
					</view>
				</view> -->
				<u-divider></u-divider>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<text style="font-size: 26rpx;color: #666;margin: 0 40rpx;" @click="clearItem()">清空</text>
					<view style="width: 60%;">
						<u-button text="确认筛选" type="success" shape="circle" color="#0BB762" @click="ConfirmScreening"></u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		hotelDetail,
		hotelRecoType,
		hotelRecoList,
		getDictCode
	} from '@/api/parktour.js';
	import NearbyPlay from '@/compontents/NearbyPlay.vue'
	export default {
		components: {
			NearbyPlay
		},
		data() {
			return {
				barHightTop: '',
				id: '',
				show: false,
				showTime: false,
				showResident: false,
				formData: {},
				columns: [
					['1', '2', '3', '4','5','6','7','8']
				],
				urls: [],
				num: 1,
				recommend: [],
				Tablist: [
					{
						name: '图片介绍',
					},
					{
						name: '优选房型',
					},
					{
						name: '附近推荐',
					}
				],
				checkboxs: [{
						text: '大床',
						checked: false
					},
					{
						text: '双床',
						checked: false
					},
					{
						text: '到店付',
						checked: false
					},
					{
						text: '免费取消',
						checked: false
					}
				],
				tag1: [],
				tag2: [{
						text: '￥0-150',
						checked: false
					},
					{
						text: '￥150-300',
						checked: false
					},
					{
						text: '￥300-450',
						checked: false
					},
					{
						text: '￥450-600',
						checked: false
					}
				],
				tag3: [],
				tag4: [],
				// tag5: [],
				// 筛选参数
				startTime: '',
				endTime: '',
				residentNumber: '',
				roomType: '',
				wifi: '',
				meal: '',
				paymentMethod: ''
			}
		},
		onLoad(option) {
			this.barHightTop = uni.getSystemInfoSync().statusBarHeight + 5
			this.load(option.id)
			this.id = option.id;
			this.dict();
		},
		methods: {
			async load(id) {
				try {
					const {
						data
					} = await hotelDetail({
						id: id
					})
					this.formData = data;
					this.urls = data.photoExplanation;
					// 当前时间
					this.startTime = uni.$u.timeFormat(new Date(), 'yyyy-mm-dd');
					// 结束时间
					this.endTime = uni.$u.timeFormat(+new Date() + 24 * 60 * 60 * 1000, 'yyyy-mm-dd');
					this.loadReco(id)
				} catch (e) {}
			},
			async loadReco(id){
				try{
					const res = await hotelRecoList({
						hotelId: id,
						checkInStartTime: this.startTime,
						checkOutEndTime: this.endTime,
						residentNumber: this.residentNumber,
						roomType: this.roomType,
						wifi: this.wifi,
						meal: this.meal,
						// paymentMethod: this.paymentMethod
					})
					this.recommend = res.data.records;
				}catch(e){}
			},
			// 字典数据
			async dict() {
				// 房型
				const res = await getDictCode({
					dictCode: 'roomtype'
				})
				res.data.map((val) => {
					this.tag1.push({
						text: val.name,
						checked: false
					})
				})
				// 餐食
				const res1 = await getDictCode({
					dictCode: 'meal'
				})
				res1.data.map((val) => {
					this.tag3.push({
						text: val.name,
						checked: false
					})
				})
				// wifi
				const res2 = await getDictCode({
					dictCode: 'wifi'
				})
				res2.data.map((val) => {
					this.tag4.push({
						text: val.name,
						checked: false
					})
				})
				// 支付方式
				// const res3 = await getDictCode({
				// 	dictCode: 'paymentMethod'
				// })
				// res3.data.map((val) => {
				// 	this.tag5.push({
				// 		text: val.name,
				// 		checked: false
				// 	})
				// })
			},
			backTap() {
				uni.navigateBack({
					delta: -1
				})
			},
			confirm(e){
				this.num = e.length - 1;
				// 当前时间
				this.startTime = e[0];
				// 结束时间
				this.endTime = e[e.length - 1];
				this.showTime = false;
				this.loadReco(this.id);
			},
			confirmRes(e){
				this.residentNumber = e.value[0];
				this.showResident = false;
				this.loadReco(this.id)
			},
			// 切换商品类型
			changeType(e) {
				let id = ''
				if (e.index === 0) {
					id = '#foodBox'
				} else if (e.index === 1) {
					id = '#hotelBox'
				} else if (e.index === 2) {
					id = '#nearby'
				}
				uni.createSelectorQuery()
					.select(".pages") //对应外层节点
					.boundingClientRect((pages) => {
						uni.createSelectorQuery()
							.select(id) //目标节点
							.boundingClientRect((target) => {
								uni.pageScrollTo({
									scrollTop: target.top - pages.top,
								});
							})
							.exec();
					})
					.exec();
			},
			gotoPage() {
				uni.navigateTo({
					url: '/pages_minute/reserve/reserve'
				})
			},
			preViewImg(index) {
				uni.previewImage({
					current: index,
					urls: this.formData.photoExplanation
				})
			},
			getReserve(val) {
				let obj = {
					id: val.id,
					startTime: this.startTime,
					endTime: this.endTime,
					num: this.num
				}
				let item = encodeURIComponent(JSON.stringify(obj));
				uni.navigateTo({
					url: `/pages_minute/hotelOrder/hotelOrder?obj=${item}`
				})
			},
			toProductList() {
				uni.navigateTo({
					url: `/pages_minute/productList/productList?type=${1}`
				})
			},
			checkboxClick(name) {
				this.checkboxs[name].checked = !this.checkboxs[name].checked
			},
			checkClick1(name) {
				this.roomType = name;
				this.tag1.map((item) => {
					item.checked = item.text === name ? true : false
				})
			},
			checkClick2(name) {
				this.tag2[name].checked = !this.tag2[name].checked
			},
			checkClick3(name) {
				this.meal = name;
				this.tag3.map((item) => {
					item.checked = item.text === name ? true : false
				})
			},
			checkClick4(name) {
				this.wifi = name;
				this.tag4.map((item) => {
					item.checked = item.text === name ? true : false
				})
			},
			// checkClick5(name){
			// 	this.paymentMethod = name;
			// 	this.tag5.map((item) => {
			// 		item.checked = item.text === name ? true : false
			// 	})
			// },
			// 清空所选
			clearItem() {
				this.tag1 = [];
				this.tag3 = [];
				this.tag4 = [];
				// this.tag5 = [];
				this.dict();
				this.roomType = '';
				this.wifi = '';
				this.meal = '';
				// this.paymentMethod = '';
				this.loadReco(this.id);
				this.show = false;
			},
			// 确认筛选
			ConfirmScreening(){
				this.loadReco(this.id);
				this.show = false;
			},
			getAss(val) {
				uni.openLocation({
					latitude: this.formData.latitude * 1,
					longitude: this.formData.latitude * 1,
					name: this.formData.name,
					address: this.formData.address,
					success: function() {
						console.log('success');
					}
				});
			},
			// 打电话
			getPhone(){
				uni.makePhoneCall({
					phoneNumber: this.formData.tel
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
	}

	.banner {
		width: 100%;
		height: 448rpx;
		position: relative;
	
		.backImg {
			width: 60rpx;
			height: 60rpx;
			position: fixed;
			left: 28rpx;
			z-index: 11;
		}
	
		.bannerImg {
			width: 100%;
			height: 100%;
		}
	}
	.imgBox {
		width: 100%;
		display: flex;
		white-space: nowrap;
		position: relative;
	
		image {
			width: 212rpx;
			height: 170rpx;
			border-radius: 12rpx;
			margin-right: 8rpx;
			display: inline-block;
		}
	
		.imgNum {
			padding: 0 6rpx;
			height: 38rpx;
			background: rgba(0, 0, 0, 0.6);
			border-radius: 8rpx;
			position: absolute;
			right: 8rpx;
			bottom: 50rpx;
			z-index: 11;
			font-weight: 400;
			color: #FFFFFF;
			font-size: 24rpx;
		}
	}

	.content {
		padding: 0 24rpx;
		box-sizing: border-box;
		top: -54rpx;
		position: relative;
		

		.content-title {
			background-color: #fff;
			border-radius: 24rpx;
			padding: 20rpx;

			.content-title-one {
				margin: 30rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;

				&-left {
					display: flex;

					&-t {
						width: 92rpx;
						height: 44rpx;
						background: linear-gradient(180deg, #F3982B 0%, #FF543E 100%);
						border-radius: 12rpx 0px 12rpx 0px;
						font-size: 24rpx;
						font-weight: 500;
						color: #FFFFFF;
						text-align: center;
						line-height: 44rpx;
					}

					&-l {
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
				}

				image {
					width: 58rpx;
					height: 58rpx;
				}
			}
		}

		.filter {
			padding: 20rpx;
			background-color: #fff;
			margin: 20rpx 0;
			border-radius: 20rpx;
		}

		.tab {
			padding: 20rpx;
			background-color: #fff;
			margin: 20rpx 0;
			border-radius: 20rpx;
		}

		.content-image {
			background-color: #fff;
			border-radius: 24rpx;
			padding: 20rpx;
			margin-top: 20rpx;

			.text {
				margin-bottom: 20rpx;
			}
		}

		.content-combo {
			background-color: #fff;
			border-radius: 24rpx;
			padding: 20rpx;
			margin: 20rpx 0;

			.text {
				margin-bottom: 20rpx;
			}

			&-title {
				display: flex;
				justify-content: space-between;
			}

			.combo-list {
				margin: 20rpx 0;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>
