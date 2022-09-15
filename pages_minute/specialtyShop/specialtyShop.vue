<template>
	<view>
		<view class="topBox">
			<view class="bgBox"></view>
			<image :src="detail.coverImg" class="bgImg" ></image>
			<view :style="{paddingTop:barHightTop+'px'}" class="shopBox">
				<view class="searchBox">
					<image src="../../static/back.png" class="back" @click="backTap"></image>
					<view class="search">
						<u-search placeholder="请搜索商品" v-model="listQuery.name" bgColor="rgba(255,255,255,0.5)" color="#ffffff"
							:showAction="false" searchIconColor="#fff" placeholderColor="#fff" @search="searchTap"></u-search>
					</view>
				</view>
				<view class="shopInfo">
					<view class="siL">
						<image :src="detail.coverImg"></image>
						<view>
							<view class="shopName">{{detail.name}}</view>
							<view class="collectNum">已有{{detail.specialtyKeepCount?detail.specialtyKeepCount:0}}人收藏店铺</view>
						</view>
					</view>
					<view class="siR">
						<view @click="telTap">
							<image src="../../static/tel.png"></image>电话
						</view>
						<view @click="collectTap">
							<image :src="detail.isKeep?'../../static/my/starA.png':'../../static/collect.png'"></image>收藏
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="list" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
				<image :src="item.mainImage" class="goodsImg"></image>
				<view class="infoBox">
					<view class="name">{{item.name}}</view>
					<view class="priceBox">
						<view class="price"><text>￥</text>{{item.price}}</view>
						<!-- <view class="sale">已售1000+</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
		import {getSpecialtyGood,getSpecialtyDtail} from '@/api/specialty.js'
		import {
			addFavorite,
			addFavoriteCancel
		} from '@/api/product.js'
	export default {
		data() {
			return {
				barHightTop: '',
				listQuery:{
					name:'',
					page :1,
					pageSize:10,
					attractionId:'',
					specialtyId:''
				},
				list:[],
				id:'',
				detail:''
			}
		},
		computed: mapState(['scenicData']),
		onLoad(options) {
			this.id=options.id
			this.barHightTop = uni.getSystemInfoSync().statusBarHeight + 5
			this.listQuery.attractionId=this.scenicData.id
			this.listQuery.specialtyId=this.id
			this.list = []
			this.listQuery.page = 1
			this.getList()
			this.getDetail()
		},
		onPullDownRefresh() {
			this.list = []
			this.listQuery.page = 1
			this.getList()
		},
		onReachBottom() {
			this.listQuery.page++
			this.getList()
		},
		methods: {
			// 收藏
			async collectTap() {
				if (this.detail.isKeep) {
					await addFavoriteCancel({
						ids: [this.detail.keepId]
					})
					this.getDetail()
				} else {
					const params=[{
						type: 2,
						specialtyKeep: {
							specialtyId: this.id
						}
					}]
					await addFavorite({keepInfoList:params})
					this.getDetail()
				}
			
			},
			telTap(){
				uni.makePhoneCall({
					phoneNumber: this.detail.tel
				});
			},
			async getDetail(){
				const {data}=await getSpecialtyDtail({id:this.id})
				this.detail=data
			},
			searchTap(){
				this.list = []
				this.listQuery.page = 1
				this.getList()
			},
			async getList(){
				const {data}=await getSpecialtyGood(this.listQuery)
				uni.stopPullDownRefresh()
				this.list = this.list.concat(data.records)
			},
			toDetail(item){
				uni.navigateTo({
					url:`/pages_minute/specialtyDetail/specialtyDetail?id=${item.id}`
				})
			},
			backTap(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 24rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.list{
			background: #FFFFFF;
			border-radius: 24rpx;
			width: 344rpx;
			padding-bottom: 16rpx;
			margin-bottom: 24rpx;
			.infoBox{
				padding: 16rpx 14rpx 0 14rpx;
				box-sizing: border-box;
				.priceBox{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-top: 22rpx;
					.sale{
						font-weight: 400;
						color: #999999;
						font-size: 24rpx;
					}
					.price{
						font-size: 30rpx;
						color: rgba(240, 26, 26, 1);
						font-weight: bold;
						text{
							font-size: 26rpx;
						}
					}
				}
				.name{
					font-size: 26rpx;
					font-weight: 500;
					color: #202020;
					overflow: hidden; 				
					text-overflow: ellipsis; 			
					display: -webkit-box;			
					-webkit-line-clamp: 1; 			
					-webkit-box-orient: vertical;
	
				}
			}
			.goodsImg{
				width: 344rpx;
				height: 340rpx;
				border-radius: 24rpx;
			}
		}
	}
	
	.topBox {
		width: 100%;
		height: 344rpx;
		position: relative;

		.shopBox {
			width: 100%;
			height: 100%;
			padding: 0 24rpx;
			box-sizing: border-box;
			position: relative;
			z-index: 111;

			.shopInfo {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 54rpx;
				.siR {
					display: flex;

					view {
						width: 128rpx;
						height: 50rpx;
						background: rgba(255, 255, 255, 0.3);
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 50rpx;
						margin-left: 16rpx;
						font-weight: 400;
						color: #FFFFFF;
						font-size: 24rpx;

						image {
							width: 36rpx;
							height: 36rpx;
							margin-right: 8rpx;
						}
					}
				}

				.siL {
					display: flex;
					align-items: center;

					.collectNum {
						font-weight: 400;
						color: rgba(255, 255, 255, 0.8);
						font-size: 24rpx;
						margin-top: 8rpx;
					}

					.shopName {
						font-weight: 500;
						color: #FFFFFF;
						font-size: 30rpx;
					}

					image {
						width: 78rpx;
						height: 78rpx;
						border-radius: 12rpx;
						border: 2rpx solid rgba(255, 255, 255, 0.6);
						margin-right: 20rpx;
					}
				}
			}

			.u-search__content__input {
				background-color: rgba(255, 255, 255, 0) !important;
			}

			.searchBox {
				display: flex;
				align-items: center;

				.search {
					width: 438rpx;
					height: 64rpx;
					margin-left: 26rpx;
				}

				.back {
					width: 60rpx;
					height: 60rpx;
				}
			}
		}

		.bgImg {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
		}

		.bgBox {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.6);
			position: absolute;
			z-index: 1;
			left: 0;
			top: 0;
		}
	}

	page {
		background: #F3F3F3;
	}
</style>
