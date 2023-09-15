/**
 * @member userId 用户ID, int64
 */
export interface QueryByUserRequest {
    userId: number
}

// post arguments
/**
 * @member identifier 用户标识
 * @member password 用户密码
 * @summary 用户标识可以是以下内容的字符串形式：
 *   - 用户ID
 *   - 用户邮箱
 *   - 用户手机号
 *   - 用户名
 */
export interface SignInRequest {
  identifier: string
  password: string
}

/**
 * @member userId 用户ID, int64
 * @member code 服务器分发的口令
 */
export interface AutoSignInRequest {
  userId: number
  code: string
}

export type UserVerifyArgument = AutoSignInRequest

/**
 * @member username 用户名称，用于格式化问候语
 * @member contact 用户联系方式，用于发送验证码
 */
export interface VerifyRequest {
  username: string,
  contact: string
}

/**
 * @member username 用户名
 * @member password 用户密码
 * @member contact 用户联系方式
 * @member code 验证码
 */
export interface  SignUpRequest {
  username: string
  password: string
  contact: string
  code: string
}