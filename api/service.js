/**
 * @version 3.0.5
 * @Author lu-ch
 * @Email webwork.s@qq.com
 * 文档: https://www.quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * DCloud: http://ext.dcloud.net.cn/plugin?id=392
 * HBuilderX: beat-3.0.4 alpha-3.0.4
 */

import Request from "@/utils/luch-request/index.js"
import store from '@/store'

const getTokenStorage = () => {
	let token = ""
	try {
		token =uni.getStorageSync("token")
	} catch (e) {}
	return token
}

const http = new Request()
http.setConfig((config) => {
	/* 设置全局配置 */

	// config.baseURL = "https://newqiye.huiyunbh.com/" /* 正式 */
	config.baseURL = "https://qianfengtestapi.huiyunbh.com/"
	// config.baseURL = "http://192.168.0.202:8777"

	config.header = {
		...config.header,
	}
	return config
})

http.interceptors.request.use(
	(config) => {
		/* 请求之前拦截器。可以使用async await 做异步操作 */
		if(getTokenStorage()){
			config.header = {
				...config.header,
				Authorization: getTokenStorage()? "Bearer "+getTokenStorage():'',
			}
		}
		
		/*
 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
   return Promise.reject(config)
 }
 */
		return config
	},
	(config) => {
		return Promise.reject(config)
	}
)

http.interceptors.response.use(
	async (response) => {
			/* 请求之后拦截器。可以使用async await 做异步操作  */
			if (response.config.custom.loading) {
				uni.hideLoading()
			}

			if (response.data.code !== "00000000") {
				// 服务端返回的状态码不等于200，则reject()
				uni.showToast({
					title: response.data.msg,
					icon: "none",
				})
				if (response.data.code === 'SCENIC_TOURISM_A0008') { //token过期
					uni.showToast({
						title: '登录过期，自动登录中...',
						icon: 'none'
					})
					uni.switchTab({
						url: '/pages/index/index'
					})
					// uni.reLaunch({
					// 	url: '/pages/login/login'
					// });
					// store.dispatch('login')
				}
				return Promise.reject(response)
			}
			uni.hideLoading()
			return response.data
		},
		(response) => {
			// 请求错误做点什么。可以使用async await 做异步操作
			if (response.config.custom.loading) {
				uni.hideLoading()
			}
			uni.showToast({
				title: "网络错误,请稍后重试",
				icon: "none",
			})
			return Promise.reject(response)
		}
)

export {
	http
}
