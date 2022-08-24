import {
	http
} from '@/api/service.js'
/**
 * 下单
 */
export const addPlace = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/order/parent/place',
		data: data,
	})
}
/**
 * 购物车列表
 */
export const getCartList = (params) => {
  return http.get('/wx/shopping-cart/list', {
    params
  })
}
/**
 * 购物车更改产品数量
 */
export const updateNumber = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/shopping-cart/update/number',
		data: data,
	})
}