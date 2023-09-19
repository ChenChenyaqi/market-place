import axios from 'axios'
import {showToast} from "@nutui/nutui";

export const jsonRequest = axios.create({
  // todo upgrade to https
  baseURL: "http://" + import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

export const rawRequest = axios.create({
    baseURL: "http://" + import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})

// 请求拦截器
jsonRequest.interceptors.request.use((config) => {
  return config
})


// 响应拦截器
jsonRequest.interceptors.response.use(
  (response: Response<any>) => {
    if (response.data.code == 200)
      return response.data.body
    return Promise.reject(response.data.reason)
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
          message = '请求地址错误'
          break
        case 500:
          message = '服务器出现问题'
          break
        default:
          message = '网络故障'
          return
      }
      showToast.fail(message)
      return Promise.reject(message)
    }
)

rawRequest.interceptors.response.use(
  e => e.data,
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
          message = '请求地址错误'
          break
        case 500:
          message = '服务器出现问题'
          break
        default:
          message = '网络故障'
          return
      }

      return Promise.reject(message)
    }
)



