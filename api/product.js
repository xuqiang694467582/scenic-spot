import {
	http
} from '@/api/service.js'

/**
 * 收藏-商品-攻略
 */
export const addFavorite = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/keep-info/favorite',
		data: data,
	})
}
// 收藏-商品-攻略列表
export const getKeepList= (params) => {
	return http.get('/wx/keep-info/list', {
	  params
	})
}
/**
 * 取消收藏
 */
export const addFavoriteCancel = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/keep-info/cancel/favorite',
		data: data,
	})
}