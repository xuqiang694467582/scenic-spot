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