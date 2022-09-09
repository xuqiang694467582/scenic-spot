import {
	http
} from '@/api/service.js'
/**
 * 下单
 */
export const addPlace = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/order/parent/place-pay',
		data: data,
	})
}
/**
 * 下单-支付
 */
export const addPlacePay = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/order/parent/place-pay',
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
/**
 * 删除购物车
 */
export const delCart = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/shopping-cart/delete',
		data: data,
	})
}
/**
 * 总订单列表
 */
export const getOrderList = (params) => {
  return http.get('/wx/order/list', {
    params
  })
}
/**
 * 取消订单
 */
export const addOrderCancel = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/order/cancel',
		data: data,
	})
}
/**
 * 支付
 */
export const addOrderPay = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/order/pay',
		data: data,
	})
}
/**
 * 订单详情
 */
export const getOrderDetail = (params) => {
  return http.get('/wx/order/detail', {
    params
  })
}
/**
 * 退款申请
 */
export const addRefundOrder = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/refund-order/apply',
		data: data,
	})
}