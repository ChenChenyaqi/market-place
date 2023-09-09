import request from '../axios'
import { LoginForm, LoginResponseData, UserResponseData } from './type'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info'
}

// 用户登录
export const reqLogin = (data: LoginForm) => {
  return request.post<any, LoginResponseData>(API.LOGIN_URL, data)
}

// 获取用户信息
export const reqUserInfo = () =>
  request.get<any, UserResponseData>(API.USERINFO_URL)
