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
export function add_to_cart (data) {
	return request({
		method: 'POST',
		url: '/shoppingCart/insert',
		data: data
	})
}
export function cart_list (data) {
	return request({
		method: 'POST',
		url: '/shoppingCart/showAll',
		data: data
	})
}
export function cart_total (data) {
	return request({
		method: 'POST',
		url: '/shoppingCart/totalAmount',
		data: data
	})
}
export function cart_delete (data) {
	return request({
		method: 'POST',
		url: '/shoppingCart/delete',
		data: data
	})
}
export function cart_buy (data) {
	return request({
		method: 'POST',
		url: '/orders/produceOrder',
		data: data
	})
}
export function orders (data) {
	return request({
		method: 'POST',
		url: '/orders/showOrderListForFront',
		data: data
	})
}
export function order_detail (data) {
	return request({
		method: 'POST',
		url: '/orders/searchOrderDetailsForFront',
		data: data
	})
}
export function cancle_order (data) {
	return request({
		method: 'POST',
		url: '/orders/cancelOrder',
		data: data
	})
}
