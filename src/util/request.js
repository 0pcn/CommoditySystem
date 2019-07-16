import axios from 'axios'

const service = axios.create({
	baseURL: '/test',
	timeout: 5000,
	responseType: 'json',
	headers: {
		'Content-Type': 'application/json',
		'Pragma': 'no-cache',
		'Cache-Control': 'no-cache'
	},
	withCredentials: false
})

service.interceptors.request.use(config => {
	const user_uuid = sessionStorage.getItem('key')
	if (user_uuid) {
		config.data['user_uuid'] = user_uuid
	}
	return config
}, error => {
	console.log(error)
	Promise.reject(error)
})

service.interceptors.response.use(response => {
	/*  const res = response.data !== '' ? response.data : '';
	  if(res.error==null){
		  return response;
	  }else if (res.error.code === '10006') {
		  refreshToken(sessionStorage.getItem('refresh_token')).then(res => {
			  decodeToken(res.data.token, sessionStorage.getItem('refresh_token'));
			  console.log(res);
		  })
	  } */
	return response
}, error => {
	return Promise.reject(error)
})

export default service
