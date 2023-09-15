import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let message
    const { status } = error.response
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        // todo fill 404 with err reason
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络故障'
        return
    }

    return Promise.reject(error)
  }
)

export default request
