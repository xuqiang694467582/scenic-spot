import {
	http
} from '@/api/service.js'
/**
 * 特产列表
 */
export const getSpecialtyGood = (params) => {
  return http.get('/wx/specialty-good/list', {
    params
  })
}
/**
 * 特产商品信息详情
 */
export const getSpecialtyGoodDetail = (params) => {
  return http.get('/wx/specialty-good/detail', {
    params
  })
}
/**
 * 添加购物车
 */
export const addCart = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/shopping-cart/add',
		data: data,
	})
}
/**
 * 商品规格列表-特产商品id查询
 */
export const getGoodList = (params) => {
  return http.get('/wx/specialty-good-specification/good/list', {
    params
  })
}
/**
 * 特产商家详情
 */
export const getSpecialtyDtail = (params) => {
  return http.get('/wx/specialty/detail', {
    params
  })
}