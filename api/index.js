import {
	http
} from '@/api/service.js'
/**
 * 餐厅信息列表
 */
export const getDiningRoom = (params) => {
  return http.get('/wx/dining-room/list', {
    params
  })
}
/**酒店信息列表
 */
export const getHotel = (params) => {
  return http.get('/wx/hotel/list', {
    params
  })
}
/**
 * 选美食-餐厅
 */
export const getChooseFood = (params) => {
  return http.get('/wx/dining-room/choose-food', {
    params
  })
}
/**
 * 定住宿
 */
export const getChooseHotel = (params) => {
  return http.get('/wx/hotel/choose-hotel', {
    params
  })
}
/**
 * 定住宿
 */
export const getChooseAmusement = (params) => {
  return http.get('/wx/amusement/chose-amusement', {
    params
  })
}
/**
 * 娱乐项目信息列表
 */
export const getAmusement = (params) => {
  return http.get('/wx/amusement/list', {
    params
  })
}
/**
 * 娱乐项目信息详情
 */
export const getAmusementDetail = (params) => {
  return http.get('/wx/amusement/detail', {
    params
  })
}
/**
 * 娱乐项目套餐
 */
export const getAmusementPackage = (params) => {
  return http.get('/wx/amusement-package/list', {
    params
  })
}
/**
 * 娱乐项目套餐
 */
export const getAmusementPackageDetail = (params) => {
  return http.get('/wx/amusement-package/detail', {
    params
  })
}
/**
 * banner列表
 */
export const getBanner = (params) => {
  return http.get('/wx/banner/list', {
    params
  })
}
/**
 * banner详情
 */
export const getBannerDetail = (params) => {
  return http.get('/wx/banner/detail', {
    params
  })
}