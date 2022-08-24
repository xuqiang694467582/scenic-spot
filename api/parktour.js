import {
	http
} from '@/api/service.js'
// 景区
export const soptList = (params) => {
	return http.get('/wx/attraction/list', {
	  params
	})
}
// 景区详情
export const soptDetail = (params) => {
	return http.get('/wx/attraction/detail', {
	  params
	})
}
// 餐厅
export const diningList = (params) => {
	return http.get('/wx/dining-room/list', {
	  params
	})
}
// 餐厅详情
export const diningDetail = (params) => {
	return http.get('/wx/dining-room/detail', {
	  params
	})
}
// 餐厅套餐详情
export const diningPackDetail = (params) => {
	return http.get('/wx/dining-room-package/detail', {
	  params
	})
}
// 酒店
export const hotelList = (params) => {
	return http.get('/wx/hotel/list', {
	  params
	})
}
// 娱乐
export const mentList = (params) => {
	return http.get('/wx/amusement/list', {
	  params
	})
}
