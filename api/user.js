import {
	http
} from '@/api/service.js'

/**
 * 登录
 */
export const addToken = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: 'oauth/token',
		data: data,
		header:{ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'} 
	})
}
/**
 * 用户信息获取
 */
export const getUserInfo = (params) => {
  return http.get('/wechat-user-info', {
    params
  })
}
/**
 * 获取手机号
 */
export const addTel = (data) => {	
	return http.middleware({
		method: 'PUT', // 必须大写
		url: '/authorize-tel',
		data: data,
		header:{ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'} 
	})
}
/**
 * 修改用户信息
 */
export const editUserInfo = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/update/wechat-user-info',
		data: data,
	})
}