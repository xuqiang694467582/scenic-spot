<template>
	<view class="pages">
		<view class="back">
			<image :src="formData.coverImg"></image>
		</view>
		<!-- 导航栏 -->

		<uni-nav-bar :statusBar="true" :border="false" leftIcon="left" color="#fff" backgroundColor="transparent"
			@clickLeft="clickLeft"></uni-nav-bar>
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
					<image src="@/static/parktour/navigation.png"></image>
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
			<!-- <view class="filter">
				<u-sticky>
					<view style="display: flex;align-items: center;justify-content: space-between;margin: 20rpx 0;">
						<view style="display: flex;align-items: center;">
							<text style="font-size: 40rpx;font-weight: bold;margin-right: 12rpx;">6-20</text>
							<text style="font-size: 26rpx;color: #333;">今天</text>
							<view style="margin: 0 20rpx;">
								<u-tag text="1晚" bgColor="#fff" borderColor="#08B761" color="#08B761"></u-tag>
							</view>
							<text style="font-size: 40rpx;font-weight: bold;margin-right: 12rpx;">6-21</text>
							<text style="font-size: 26rpx;color: #333;">明天</text>
						</view>
						<view style="border-left: 2rpx solid #D2D2D2;margin: 0 20rpx;height: 40rpx;"></view>
						<text style="font-size: 40rpx;font-weight: bold;">1间·1人</text>	
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view style="display: flex;align-items: center;">
							<view style="margin-right: 10rpx;" v-for="(item, index) in checkboxs" :key="index">
								<u-tag :text="item.text" :plain="!item.checked" :name="index" type="success" size="mini"
									@click="checkboxClick">
								</u-tag>
							</view>
						</view>
						<view style="border-left: 2rpx solid #D2D2D2;margin: 0 20rpx;height: 40rpx;"></view>
						<view style="width: 150rpx;">
							<u-button type="info" icon="arrow-down" plain hairline text="筛选" size="mini" @click="show = true"></u-button>
						</view>
					</view>
				</u-sticky>
			</view> -->
			<!-- tab -->
			<view class="tab">
				<u-tabs :list="Tablist" activeStyle="{ color: '#0CB662' }" lineColor="#0CB662" :scrollable="false">
				</u-tabs>
			</view>
			<view class="content-image">
				<view class="text">图片介绍</view>
				<u-album maxCount="3" space="10" singleSize="210rpx" multipleSize="100" :urls="urls"></u-album>
			</view>
			<view class="content-combo">
				<view class="content-combo-title">
					<view>优选房型</view>
					<view style="color: #999;font-size: 26rpx;">更多></view>
				</view>
				<view class="combo-list" v-for="(item, index) in recommend" :key="index">
					<view style="display: flex;align-items: center;" @click="gotoPage()">
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
								<text style="font-size: 24rpx;color: #999;">￥{{ item.originalPrice }}</text>
							</view>
						</view>
					</view>
					<view class="combo-list-btn" @click="getReserve(item)">
						预定
					</view>
				</view>
			</view>
		</view>
		<!-- 筛选弹框 -->
		<u-popup :show="show" mode="top" round="20" closeOnClickOverlay @close="show = false">
			<view style="padding: 20rpx;margin-top: 3rem;">
				<view style="display: flex;align-items: center;justify-content: space-between;margin: 20rpx 0;">
					<view style="display: flex;align-items: center;">
						<text style="font-size: 40rpx;font-weight: bold;margin-right: 12rpx;">6-20</text>
						<text style="font-size: 26rpx;color: #333;">今天</text>
						<view style="margin: 0 20rpx;">
							<u-tag text="1晚" bgColor="#fff" borderColor="#08B761" color="#08B761"></u-tag>
						</view>
						<text style="font-size: 40rpx;font-weight: bold;margin-right: 12rpx;">6-21</text>
						<text style="font-size: 26rpx;color: #333;">明天</text>
					</view>
					<view style="border-left: 2rpx solid #D2D2D2;margin: 0 20rpx;height: 40rpx;"></view>
					<text style="font-size: 40rpx;font-weight: bold;">1间·1人</text>	
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view style="display: flex;align-items: center;">
						<view style="margin-right: 10rpx;" v-for="(item, index) in checkboxs" :key="index">
							<u-tag :text="item.text" :plain="!item.checked" :name="index" type="success" size="mini"
								@click="checkboxClick">
							</u-tag>
						</view>
					</view>
					<view style="border-left: 2rpx solid #D2D2D2;margin: 0 20rpx;height: 40rpx;"></view>
					<view style="width: 150rpx;">
						<u-button type="info" icon="arrow-down" plain hairline text="筛选" size="mini" @click="show = true"></u-button>
					</view>
				</view>
				<u-divider></u-divider>
				<view>
					<text>房型</text>
					<view style="display: flex;align-items: center;margin: 20rpx 0;">
						<view style="margin-right: 10rpx;" v-for="(item, index) in tag1" :key="index">
							<u-tag :text="item.text" :plain="!item.checked" :name="index" type="success"
								@click="checkClick1">
							</u-tag>
						</view>
					</view>
				</view>
				<view>
					<text>价格</text>
					<view style="display: flex;align-items: center;margin: 20rpx 0;">
						<view style="margin-right: 10rpx;" v-for="(item, index) in tag2" :key="index">
							<u-tag :text="item.text" :plain="!item.checked" :name="index" type="success" 
								@click="checkClick2">
							</u-tag>
						</view>
					</view>
				</view>
				<view>
					<text>餐食</text>
					<view style="display: flex;align-items: center;margin: 20rpx 0;">
						<view style="margin-right: 10rpx;" v-for="(item, index) in tag3" :key="index">
							<u-tag :text="item.text" :plain="!item.checked" :name="index" type="success"
								@click="checkClick3">
							</u-tag>
						</view>
					</view>
				</view> 
				<view>
					<text>Wifi</text>
					<view style="display: flex;align-items: center;margin: 20rpx 0;">
						<view style="margin-right: 10rpx;" v-for="(item, index) in tag4" :key="index">
							<u-tag :text="item.text" :plain="!item.checked" :name="index" type="success"
								@click="checkClick4">
							</u-tag>
						</view>
					</view>
				</view>
				<u-divider></u-divider>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<text style="font-size: 26rpx;color: #666;margin: 0 40rpx;" @click="clearItem()">清空所选</text>
					<view style="width: 60%;">
						<u-button text="确认筛选" type="success" shape="circle" color="#0BB762"></u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		hotelDetail,
		hotelRecoType
	} from '@/api/parktour.js';
	export default {
		data() {
			return {
				show: false,
				formData: {},
				urls: [],
				recommend: [],
				Tablist: [{
						name: '图片介绍',
					},
					{
						name: '优选房型',
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
				tag1:[
					{
						text: '大床房',
						checked: false
					},
					{
						text: '双床房',
						checked: false
					}
				],
				tag2:[
					{
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
				tag3:[
					{
						text: '含早餐',
						checked: false
					},
					{
						text: '无餐食',
						checked: false
					}
				],
				tag4:[
					{
						text: '有Wifi',
						checked: false
					},
					{
						text: '无Wifi',
						checked: false
					}
				]
			}
		},
		onLoad(option) {
			this.load(option.id)
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
					const res = await hotelRecoType({
						hotelId: id
					})
					console.log(res);
					this.recommend = res.data;
				} catch (e) {}
			},
			clickLeft() {
				uni.navigateBack({
					delta: -1
				})
			},
			gotoPage() {
				uni.navigateTo({
					url: '/pages_minute/reserve/reserve'
				})
			},
			getReserve(val) {
				uni.navigateTo({
					url: `/pages_minute/hotelOrder/hotelOrder?id=${val.id}`
				})
			},
			checkboxClick(name) {
				this.checkboxs[name].checked = !this.checkboxs[name].checked
			},
			checkClick1(name) {
				this.tag1[name].checked = !this.tag1[name].checked
			},
			checkClick2(name) {
				this.tag2[name].checked = !this.tag2[name].checked
			},
			checkClick3(name) {
				this.tag3[name].checked = !this.tag3[name].checked
			},
			checkClick4(name) {
				this.tag4[name].checked = !this.tag4[name].checked
			},
			// 清空所选
			clearItem(){
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
	}

	.back {
		width: 100%;
		height: 448rpx;
		position: fixed;
		top: 0;
		z-index: -1;

		image {
			width: 100%;
		}
	}

	.content {
		padding: 20rpx;
		margin-top: 8rem;

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
						width: 100rpx;
						border-radius: 10rpx 0 10rpx 0;
						background: linear-gradient(180deg, rgba(243, 152, 43, 1) 50%, rgba(255, 83, 62, 1) 85%);
						display: flex;
						color: #fff;
						font-size: 24rpx;
						align-items: center;
						justify-content: center;
						margin-right: 20rpx;
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
			margin-top: 20rpx;

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
	}
</style>
