import { AutoSignInRequest } from '@/api/user/request.ts'
import { UserType } from '@/api/global/enum.ts'

export type SignInResponse = AutoSignInRequest

/**
 * @member name 用户名
 * @member type 用户类型
 */
export interface UserInfoResponse {
  name: string
  type: UserType
}

/**
 * @member code 服务器分发的新口令
 */
export interface CodeResponse {
  code: string
}