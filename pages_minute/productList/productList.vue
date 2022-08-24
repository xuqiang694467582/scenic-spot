<template>
	<view>
		<view class="banner">
			<image src="../../static/back.png" :style="{top:barHightTop+'px'}" class="backImg" @click="backTap"></image>
			<image :src="typeList[curt].img" class="bannerImg"></image>
		</view>
		
		<view class="content">
			<view class="typeBox">
				<view v-for="(item,index) in typeList" :key="index" :class="curt===index?'active':''"
					@click="changeType(index)">{{item.name}}
				</view>
			</view>
			<view class="listBox" v-for="(item,index) in 5" :key="index" @click="toDetail">
				<image src="../../static/food.png" class="goodsImg"></image>
				<view class="listR">
					<view class="name">蒸小碗私房菜</view>
					<view class="infoBox">
						<view class="grade">
							<text><text class="bold">4.8</text>分</text>
							<view></view>
						</view>
						<view class="distance">距您0.5km</view>
					</view>
					<!-- 除酒店显示 -->
					<block v-if="curt===0||curt===2">
						<view class="time">
							<image src="../../static/time.png"></image>
							11:00-13:00，17:00-21:00
						</view>
						<view class="more">
							<text>“家常特色菜”</text>
						</view>
					</block>
					<block v-else>
						<view class="more">
							<text>“家常特色菜”</text>
						</view>
						<view class="price">
							<text class="unit">￥</text>
							<text class="money">133</text>
							<text class="qi">起</text>
							<text class="oldPrice">￥168</text>
						</view>
					</block>



				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import {getChooseFood,getChooseHotel,getChooseAmusement} from '@/api/index.js'
	export default {
		data() {
			return {
				curt: 0,
				typeList: [{
						name: '选美食',
						img: '../../static/food.png'
					},
					{
						name: '订住宿',
						img: '../../static/hotel.png'
					},
					{
						name: '玩娱乐',
						img: '../../static/entertainment.png'
					}
				],
				barHightTop:'',
				listQuery:{
					latitude:'',
					longitude:'',
					page :1,
					pageSize:10
				},
				list:[]
			}
		},
		onLoad() {
			this.barHightTop = uni.getSystemInfoSync().statusBarHeight +5
		},
		methods: {
			// async getList(){					
			// 	if(this.curt===0){
			// 		await getChooseFood()
					
			// 	}else if(this.curt===1){
					
			// 	}else if(this.curt===2){
					
			// 	}
			// },
			toDetail() {
				switch (this.curt) {
					case 2:
						uni.navigateTo({
							url: '/pages_minute/entertainmentDetail/entertainmentDetail'
						})
					break;

				}
			},
			changeType(index) {
				this.curt = index
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
	.listBox {
		display: flex;
		align-items: center;
		margin-bottom: 36rpx;

		.listR {
			display: flex;
			flex: 1;
			flex-direction: column;
			margin-left: 20rpx;

			.more {
				margin-top: 14rpx;
				font-weight: 400;
				color: #999999;
				font-size: 24rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;

				text {
					margin-right: 20rpx;
				}
			}

			.price {
				margin-top: 14rpx;

				.oldPrice {
					font-weight: 400;
					color: #999999;
					margin-left: 24rpx;
					font-size: 24rpx;
					text-decoration: line-through;
				}

				.qi {
					font-size: 24rpx;
					font-weight: 400;
					color: #666666;
					margin-left: 14rpx;
				}

				.money {
					font-size: 40rpx;
					color: #FE5A3D;
					font-weight: bold;
				}

				.unit {
					font-size: 28rpx;
					color: #FE5A3D;
					font-weight: bold;
				}
			}

			.time {
				display: flex;
				align-items: center;
				margin-top: 14rpx;
				font-weight: 400;
				color: #999999;
				font-size: 24rpx;

				image {
					width: 22rpx;
					height: 22rpx;
					margin-right: 12rpx;
				}
			}

			.infoBox {
				display: flex;
				align-items: center;
				margin-top: 10rpx;

				.grade {
					font-size: 28rpx;
					font-weight: 500;
					color: #08B761;
					position: relative;

					text {
						position: relative;
						z-index: 111;
					}

					view {
						position: absolute;
						width: 100%;
						background: #CDF8D5;
						left: 0;
						bottom: 0;
						border-radius: 4rpx;
						height: 12rpx;
						z-index: 1;
					}
				}
			}

			.distance {
				position: relative;
				margin-left: 16rpx;
				padding-left: 16rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #999999;
			}

			.distance::after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				width: 1px;
				height: 16rpx;
				background: #999;
				margin-top: -8rpx;
			}

			.name {
				font-size: 30rpx;
				font-weight: 500;
				color: #333333;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
		}

		.goodsImg {
			width: 188rpx;
			height: 188rpx;
			border-radius: 24rpx;
		}
	}

	.typeBox {
		display: flex;
		margin-bottom: 48rpx;

		view {
			width: 138rpx;
			height: 58rpx;
			background: #E9E9E9;
			border-radius: 12rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #333333;
			text-align: center;
			line-height: 58rpx;
			margin-right: 24rpx;
		}

		.active {
			font-weight: 500;
			color: #08B761;
			background: #EDF8EF;
			border: 1px solid #08B761;
		}
	}

	.content {
		position: relative;
		top: -50rpx;
		padding: 40rpx 32rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 24rpx 24rpx 0px 0px;
	}

	.banner {
		width: 100%;
		height: 516rpx;
		position: relative;
		.backImg{
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			left: 28rpx;
			z-index: 11;
		}
		.bannerImg{
			width: 100%;
			height: 100%;
		}
	}
</style>
