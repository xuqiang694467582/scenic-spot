import {
	http
} from '@/api/service.js'


// 景区map
export const attractionMap= (params) => {
	return http.get('/wx/attraction/map', {
	  params
	})
}

// 商家入驻申请审核列表(我的申请)
export const auditSettled= (params) => {
	return http.get('/wx/merchant-settled/list', {
	  params
	})
}

/**
 * 商家入驻申请
 */
export const applySettled = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/merchant-settled/apply',
		data: data,
	})
}