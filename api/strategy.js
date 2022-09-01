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
/**
 * 攻略详情
 */
export const getRaiderDetail = (params) => {
  return http.get('/wx/raider/detail', {
    params
  })
}
/**
 * 我的攻略列表
 */
export const getRaiderMyself = (params) => {
  return http.get('/wx/raider/myself', {
    params
  })
}
/**
 * 攻略删除
 */
export const delRaider = (data) => {	
	return http.middleware({
		method: 'DELETE', // 必须大写
		url: '/wx/raider/delete',
		data: data,
	})
}
/**
 * 攻略修改
 */
export const updateRaider = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/raider/update',
		data: data,
	})
}
/**
 * 评论
 */
export const addComment = (data) => {	
	return http.middleware({
		method: 'POST', // 必须大写
		url: '/wx/comment-reply/comment',
		data: data,
	})
}
/**
 * 我的攻略列表
 */
export const getReplyList = (params) => {
  return http.get('/wx/comment-reply/list', {
    params
  })
}