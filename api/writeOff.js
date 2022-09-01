import {
	http
} from '@/api/service.js'
/**
 * 餐厅信息列表
 */
export const getWriteOfList = (params) => {
  return http.get('/wx/order/merchant/write-of/list', {
    params
  })
}
/**
 * 核销劵码
 */
export const addWriteOffVoucher = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/order/write-off-voucher',
		data: data,
	})
}