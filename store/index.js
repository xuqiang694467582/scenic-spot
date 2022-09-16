//引入vue和vuex
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import {
	addToken,
	getUserInfo
} from "@/api/user.js"

const store = new Vuex.Store({
	//全局变量定义
	state: {
		userInfo: uni.getStorageSync("userInfo") ?uni.getStorageSync("userInfo") : "", //用户信息
		token: uni.getStorageSync("token") ? uni.getStorageSync("token") : "", //token
		location: uni.getStorageSync("location") ? uni.getStorageSync("location") : "", //当前位置
		wechatUserId:uni.getStorageSync("wechatUserId") ?uni.getStorageSync("wechatUserId") : "",
		orderData:'',
		uploadUrl: 'https://qianfengtestapi.huiyunbh.com/sys/storage/upload',
		scenicData:uni.getStorageSync("scenicData") ? uni.getStorageSync("scenicData") : "", //景区信息
	},
	mutations: {
		SET_USERINFO(state, data) {
			state.userInfo = data
			uni.setStorageSync("userInfo", state.userInfo)
		},
		SET_TOKEN(state, data) {
			state.token = data
			uni.setStorageSync("token", state.token)
		},
		SET_LOCATION(state, data) {
			state.location = data
			uni.setStorageSync("location", state.location)
		},
		SET_WECHATUSERID(state, data){
			state.wechatUserId = data
			uni.setStorageSync("wechatUserId", state.location)
		},
		SET_ORDERDATA(state, data){
			state.orderData = data
		},
		SET_SCENICDATA(state, data){
			state.scenicData = data
			uni.setStorageSync("scenicData", state.scenicData)
		}
	},
	actions: {
		login({
			commit,
			state
		}, code) {
			const that = this
			return new Promise((resolve, reject) => {
				commit("SET_TOKEN", '')
				const params = {
					code: code,
					grant_type: 'wechat',
					client_id: 'wechat-user',
					client_secret: 'CFtxxnK9LU0B8m0eQ/A6FYiR8T4rJd9w4hlIf08SKdL6agvLitIG179f6B1lkmS5WZcKqDyini2t↵aBVKHwbXAxwmYC2kQoiLpkp56X6Wrg2esk/4QtsySDqsMqKOpf0Zm0dB3LIloOALSKwOhZpY7MhI↵bYYpMnMXMzT/ovrk2tVGwd5IfMkm9w+shlSN9G+U2zE4FTt1RCPy8eE6e8qwTgq5a3tHV4sbM5CR↵oN5ToB0p468e2H0dhUxuMaUcZtt9OJc4+5HPoOScYFRVLesoG83ljZ+ed1pi7Ntpvu9wVv1lcvn1↵xrkEpqmY7LztgTxg7N6Xg6vF4x4/PtjYIef5lw=='
				}
				addToken(params).then(async (response) => {
					const {
						data
					} = response
					commit("SET_TOKEN", data.access_token)
					commit("SET_WECHATUSERID", data.wechatUserId)
					getUserInfo({id:data.wechatUserId})
						.then((response) => {
							const  info = response							
							commit("SET_USERINFO", info.data)
							resolve()
						})
						.catch((error) => {
							reject(error)
						})
				}).catch((error) => {
					reject(error)
				})

			})

		},
		// 获取用户信息
		getUserInfos({
			commit,
			state
		}, params) {
			return new Promise((resolve, reject) => {
				getUserInfo({id:state.wechatUserId})
					.then((response) => {
						const {
							data
						} = response
						commit("SET_USERINFO", data)
					
						resolve()
					})
					.catch((error) => {
						reject(error)
					})
			})
		},
		// 退出
		signOut({
			commit
		}) {
			commit("SET_TOKEN", "")
			commit("SET_USERINFO", "")
		},
	},
})
export default store
