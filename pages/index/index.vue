<template>
	<view>
		<!-- 顶部底色 -->
		<view class="back"></view>
		<!-- 主体结构 -->
		<view>
			<!-- 导航栏 -->
			<uni-nav-bar :statusBar="true" :border="false" leftWidth="530rpx" backgroundColor="transparent">
				<view slot="left">
					<view class="top-content">
						<u-search v-model="keyword" :showAction="false" placeholder="搜索美食/住宿/商品"></u-search>
						<view class="top-content-icon">
							<image src="@/static/index/cust.png"></image>
							<!-- <u-icon name="../../static/index/cust.png" color="#fff" size="32"></u-icon> -->
						</view>
					</view>
				</view>
			</uni-nav-bar>
			<!-- 滚动通知 -->
			<view class="notice">
				<u-notice-bar color="#E4E4E4" :text="text"></u-notice-bar>
			</view>
			<!-- 轮播图 -->
			<view class="swiperBanner">
				<u-swiper :list="list" bgColor="transparent" radius="12"></u-swiper>
			</view>
			<!-- 菜单 -->
			<view class="menu">
				<u-scroll-list :indicator="false">
					<view class="scroll-list">
						<view class="scroll-list__line" v-for="(item, index) in menuArr" :key="index">
							<view class="scroll-list__line__item" v-for="(item1, index1) in item" :key="index1"
								:class="[(index1 === item.length - 1) && 'scroll-list__line__item--no-margin-right']" @click="getJump(index1)">
								<image class="scroll-list__line__item__image" :src="item1.icon" mode=""></image>
								<text class="scroll-list__line__item__text">{{ item1.name }}</text>
							</view>
						</view>
					</view>
				</u-scroll-list>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				text: 'uView UI众多组件覆盖开发过程的各个需求，组件功能丰富，多端兼容。让您快速集成，开箱即用',
				list: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				menuArr: [
					[{
						name: '园区导览',
						icon: '../../static/index/menu_1.png'
					},
					{
						name: '餐饮美食',
						icon: '../../static/index/menu_2.png'
					}, {
						name: '旅馆住宿',
						icon: '../../static/index/menu_3.png'
					}, {
						name: '园区特产',
						icon: '../../static/index/menu_4.png'
					}, {
						name: '休闲娱乐',
						icon: '../../static/index/menu_5.png'
					}],
				]
			}
		},
		onLoad() {

		},
		methods: {
			// 跳转页面
			getJump(index1){
				switch(index1){
					case 0:
						uni.navigateTo({
							url: '/pages_minute/parktour/parktour'
						})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.back {
		width: 100%;
		height: 568rpx;
		background: linear-gradient(180deg, rgba(3, 184, 95, 1) 75%, rgba(255, 255, 255, 1) 95%);
		position: fixed;
		top: 0;
	}

	.top-content {
		display: flex;
		align-items: center;

		&-icon {
			margin-left: 20rpx;
			width: 56rpx;
			height: 56rpx;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
	}

	.notice {
		margin-top: 20rpx;
	}

	.swiperBanner {
		padding: 20rpx;
	}

	.menu {
		padding: 20rpx;

		.scroll-list {
			@include flex(column);

			&__goods-item {
				margin-right: 20px;

				&__image {
					width: 60px;
					height: 60px;
					border-radius: 4px;
				}

				&__text {
					color: #f56c6c;
					text-align: center;
					font-size: 12px;
					margin-top: 5px;
				}
			}

			&__show-more {
				background-color: #fff0f0;
				border-radius: 3px;
				padding: 3px 6px;
				@include flex(column);
				align-items: center;

				&__text {
					font-size: 12px;
					width: 12px;
					color: #f56c6c;
					line-height: 16px;
				}
			}

			&__line {
				@include flex;
				margin-top: 10px;

				&__item {
					margin-right: 15px;

					&__image {
						width: 48px;
						height: 48px;
					}

					&__text {
						margin-top: 5px;
						color: $u-menuText-color;
						font-size: 12px;
						text-align: center;
					}

					&--no-margin-right {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>
