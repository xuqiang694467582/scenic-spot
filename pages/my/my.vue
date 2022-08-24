<template>
	<view>
		<view class="back">
			<image src="../../static/my/back.png"></image>
		</view>
		<view style="padding: 20rpx;margin-top: 5rem;">
			<view class="avatar">
				<view class="avatar-left" v-if="userInfo.nickname">
					<u-avatar size="48" :src="userInfo.avatar"></u-avatar>
					<text>{{userInfo.nickname}}</text>
				</view>
				<view class="avatar-left" v-else>
					<u-button type="success" @click="getUserProfile" size="small">授权用户信息</u-button>
				</view>
				<u-icon name="setting" size="20"></u-icon>
			</view>
			<view class="myOrder">
				<view class="myOrder-text">我的订单</view>
				<u-scroll-list :indicator="false">
					<view class="scroll-list">
						<view class="scroll-list__line" v-for="(item, index) in menuArr" :key="index">
							<view class="scroll-list__line__item" v-for="(item1, index1) in item" :key="index1"
								:class="[(index1 === item.length - 1) && 'scroll-list__line__item--no-margin-right']"
								@click="getJump(index1)">
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
	import {
		mapState
	} from 'vuex'
	import {editUserInfo} from '@/api/user.js'
	export default {
		data() {
			return {
				src: '',
				menuArr: [
					[{
							name: '待付款',
							icon: '../../static/my/1.png'
						},
						{
							name: '已支付',
							icon: '../../static/my/2.png'
						}, {
							name: '已完成',
							icon: '../../static/my/3.png'
						}, {
							name: '已取消',
							icon: '../../static/my/4.png'
						}, {
							name: '全部订单',
							icon: '../../static/my/5.png'
						}
					],
				],
			}
		},
		computed: mapState(['userInfo','wechatUserId']),
		methods: {
			// 获取用户信息
			getUserProfile() {
				const that = this
				uni.getUserProfile({
					desc: '用于完善用户资料',
					success: async (e) => {
						await editUserInfo({
							avatar: e.userInfo.avatarUrl,
							nickname: e.userInfo.nickName,
							sex: e.userInfo.gender,
							id:that.wechatUserId
						})
						this.$store.dispatch('getUserInfos')
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F4;
	}

	.back {
		width: 100%;
		height: 334rpx;
		position: fixed;
		top: 0;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.avatar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
		margin-bottom: 20rpx;

		.avatar-left {
			display: flex;
			align-items: center;

			text {
				margin-left: 20rpx;
				font-size: 36rpx;
				font-weight: 500;
				color: #333;
			}
		}
	}

	.myOrder {
		background-color: #fff;
		padding: 26rpx;
		border-radius: 20rpx;

		.myOrder-text {
			font-size: 30rpx;
			font-weight: 600;
			margin-bottom: 20rpx;
		}

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
					display: flex;
					flex-wrap: wrap;
					justify-content: center;

					&__image {
						width: 28px;
						height: 28px;
					}

					&__text {
						margin-top: 5px;
						color: $u-menuText-color;
						font-size: 12px;
						font-weight: 500;
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
