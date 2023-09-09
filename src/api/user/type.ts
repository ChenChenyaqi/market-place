// 用户登录
export interface LoginForm {
  username: string
  password: string
}

interface DataType {
  token?: string
  message?: string
}

export interface LoginResponseData {
  code: number
  data: DataType
}

// 用户信息
interface UserInfo {
  userId: number
  avatar: string
  username: string
}

export interface UserResponseData {
  code: number
  data: {
    userInfo: UserInfo
  }
}
