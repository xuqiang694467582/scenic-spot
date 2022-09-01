<template>
	<view>
		<view class="topBox">
			<view :style="{paddingTop:barHightTop+'px'}" class="backImg">
				<u-icon name="arrow-left" size="16" color="#ffffff" @click="backTap"></u-icon>
			</view>
			<view class="tipBox"  v-if="detail.status=='1'">
				<image src="../../static/order/time.png"></image>
				<view>待核销<text>待用户消费后请及时核销</text></view>
			</view>
			<view class="tipBox" v-else>
				<image src="../../static/order/success.png"></image>
				<view>已核销<text>已对用户该次消费进行核销</text></view>
			</view>
		</view>
		<view class="content">
			<view class="modalBox">
				<view class="pTitle">费用信息</view>
				<view class="pBox">
					在线支付
					<view class="price"><text>￥</text>{{detail.payPrice}}</view>
				</view>
				<view class="ruleBox">
					取消规则
					<view class="">预订成功后30分钟内<text>免费取消</text></view>
				</view>
			</view>
			<view class="modalBox" v-for="(item,index) in productDetail.orderItemDetailVoList" :key="index">
				<view class="dateBox">
					<view class="dateText">{{item.startDate}}({{item.startWeek}})</view>
					<view class="dateNum">{{item.day}}晚</view>
					<view class="dateText">{{item.endDate}}({{item.endWeek}})</view>
				</view>
				<view class="setMeal">
					<view class="sName">{{item.productInfo.hotelTypeName}}</view>
					<view class="tag">{{item.productInfo.meal}}·{{item.productInfo.roomType}}</view>
				</view>
				<view class="otherInfo">
					<view>
						<text>住客姓名</text>
						<text class="otherText">{{productDetail.otherInfo.name}}</text>
					</view>
					<view>
						<text>联系电话</text>
						<text class="otherText">{{productDetail.otherInfo.tel}}</text>
					</view>
				</view>
			</view>
				<view class="modalBox">
					<view class="title">订单信息</view>
					<view class="lineBox">
						<view class="lTitle">实付金额：</view>
						<view class="price">￥{{detail.payPrice}}</view>
					</view>
					<view class="lineBox">
						<view class="lTitle">数 量：</view>
						<view>{{productDetail.orderItemDetailVoList[0].productInfo.number}}</view>
					</view>
					<view class="lineBox">
						<view class="lTitle">订单号：</view>
						<view>{{detail.orderSn}}</view>
					</view>
					<view class="lineBox">
						<view class="lTitle">预留号码：</view>
						<view>{{productDetail.otherInfo.tel}}</view>
					</view>
					<view class="lineBox">
						<view class="lTitle">付款时间：</view>
						<view>{{detail.payTimeStr}}</view>
					</view>
					<view class="lineBox">
						<view class="lTitle">下单时间：</view>
						<view>{{detail.placeTimeStr}}</view>
					</view>
				</view>
				<view class="btnBox" @click="writeOffTap" v-show="detail.status==='1'">确认核销</view>
		</view>
	</view>
</template>

<script>
	import {
		getOrderDetail,
	} from '@/api/order.js'
	import {
		addWriteOffVoucher
	} from '@/api/writeOff.js'
	export default {
		data() {
			return {
				detail:'',
				productDetail:'',
				id:'',
				lId:'',
				barHightTop: ''
			}
		},
		onLoad(options) {
			this.barHightTop = uni.getSystemInfoSync().statusBarHeight + 20
			this.id=options.id
			this.lId=options.lId
			this.getDetail()
		},
		methods: {
			backTap(){
				uni.navigateBack({
					delta:1
				})
			},
			async writeOffTap(){
				uni.showModal({
					title: '提示',
					content: '确定核销？',
					success: async (res)=> {
						if (res.confirm) {
							await addWriteOffVoucher({id:this.lId})
							uni.showToast({
								title:'核销成功'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async getDetail() {
				const {
					data
				} = await getOrderDetail({
					id: this.id
				})
				this.detail = data
				const productDetail = data.childrenOrder[0]
				productDetail.orderItemDetailVoList.forEach(item => {
					item.day = this.dateDiff(item.productInfo.reserveStartTime, item.productInfo
						.reserveEndTime)
					item.startWeek = this.getWeek(item.productInfo.reserveStartTime)
					item.endWeek = this.getWeek(item.productInfo.reserveEndTime)
					const startList=item.productInfo.reserveStartTime.split('-')
					item.startDate=`${startList[1]}月${startList[2]}日`
					const endList=item.productInfo.reserveEndTime.split('-')
					item.endDate=`${endList[1]}月${endList[2]}日`
				})
				this.productDetail = productDetail
			},
			getWeek(date) {
				let myDate = new Date(date)
				let wk = myDate.getDay()
				let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
				let week = weeks[wk]
				return week
			},
			dateDiff(sDate1, sDate2) {
				var aDate, oDate1, oDate2, iDays;
				aDate = sDate1.split("-");
				oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]); //转换为yyyy-MM-dd格式
				aDate = sDate2.split("-");
				oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
				iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
				return iDays; //返回相差天数
			},
		}
	}
</script>


<style lang="scss">
	.content {
		padding: 0 24rpx;
		box-sizing: border-box;
		position: relative;
		top: -102rpx;
		.btnBox {
			margin-top: 36rpx;
			height: 94rpx;
			background: #08B761;
			box-shadow: 0px 0px 20rpx 2rpx rgba(204, 204, 204, 0.1);
			border-radius: 24rpx;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
			line-height: 94rpx;
			font-size: 30rpx;
		}
		.modalBox {
			box-shadow: 0px 0px 20rpx 2rpx rgba(204, 204, 204, 0.1);
			background: #FFFFFF;
			border-radius: 24rpx;
			padding: 26rpx 28rpx;
			box-sizing: border-box;
			margin-bottom: 24rpx;
			.lineBox {
				display: flex;
				margin-top: 30rpx;
				font-weight: 500;
				color: #333333;
				font-size: 28rpx;
			
				.lTitle {
					width: 140rpx;
				}
			
				.price {
			
					font-weight: bold;
				}
			}
			
			.title {
				font-weight: 500;
				color: #333333;
				font-size: 30rpx;
			}
			.otherInfo {
				padding-bottom: 12rpx;

				view {
					margin-top: 28rpx;
					font-weight: 400;
					color: #666666;
					font-size: 28rpx;
				}

				.otherText {
					font-weight: 400;
					color: #333333;
					font-size: 28rpx;
					margin-left: 72rpx;
				}
			}

			.setMeal {
				margin-top: 28rpx;
				border-bottom: 1px solid #EBEBEB;

				.sName {
					font-weight: 600;
					color: #333333;
					font-size: 32rpx;
					margin-bottom: 16rpx;
				}

				.tag {
					margin-bottom: 28rpx;
					font-weight: 400;
					color: #999999;
					font-size: 28rpx;
				}
			}

			.dateBox {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #EBEBEB;
				padding: 12rpx 0 28rpx 0;

				.dateText {
					font-size: 36rpx;
					font-weight: 600;
					color: #333333;


				}

				.dateNum {
					width: 72rpx;
					height: 40rpx;
					border-radius: 40rpx;
					font-weight: 400;
					color: #08B761;
					font-size: 26rpx;
					text-align: center;
					line-height: 40rpx;
					border: 1px solid #08B761;

				}
			}

			.ruleBox {
				border-top: 1px solid #EBEBEB;
				padding: 34rpx 0 14rpx 0;
				box-sizing: border-box;
				margin-top: 18rpx;
				display: flex;
				align-items: center;
				font-weight: 400;
				color: #666666;
				font-size: 28rpx;

				view {
					margin-left: 68rpx;

					text {
						color: #08B761;
					}
				}
			}

			.pBox {
				margin-top: 28rpx;
				display: flex;
				align-items: center;
				font-weight: 400;
				color: #666666;
				font-size: 28rpx;

				.price {
					margin-left: 68rpx;
					font-weight: bold;
					color: #FE5A3D;
					font-size: 40rpx;

					text {
						font-size: 30rpx;
					}
				}
			}

			.pTitle {
				font-weight: 500;
				color: #333333;
				font-size: 30rpx;
			}
		}
	}

	.topBox {
		width: 100%;
		height: 400rpx;
		background: linear-gradient(180deg, #A0D7BB 0%, #03B75F 100%);

		.tipBox {
			display: flex;
			align-items: center;
			padding: 54rpx 40rpx 0 40rpx;
			box-sizing: border-box;
			color: #fff;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}

			view {
				font-size: 44rpx;
				font-weight: 600;

				text {
					margin-left: 28rpx;
					font-weight: 400;
					font-size: 26rpx;
				}
			}
		}

		.backImg {
			margin-left: 24rpx;
		}
	}

	page {
		background-color: #FAFAFA;
	}
</style>
