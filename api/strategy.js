import {
	http
} from '@/api/service.js'
/**
 * 攻略添加
 */
export const addRaider = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/raider/add',
		data: data,
	})
}
/**
 * 总订单列表
 */
export const getRaider = (params) => {
  return http.get('/wx/raider/list', {
    params
  })
}