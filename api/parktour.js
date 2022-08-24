import {
	http
} from '@/api/service.js'


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