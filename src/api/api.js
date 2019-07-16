import request from '../util/request'

export function login (data) {
	return request({
		method: 'POST',
		url: '/front/login',
		data: data
	})
}
// eslint-disable-next-line camelcase
export function product_list (data) {
	return request({
		method: 'POST',
		url: '/product/frontShowAll',
		data: data
	})
}
