import {
  AutoSignInRequest,
  QueryByUserRequest,
  SignInRequest,
  SignUpRequest,
  UpgradeRequest,
  verifyHeader,
  VerifyRequest
} from '@/api/user/request.ts'

import {
  CodeResponse,
  SignInResponse,
  UserInfoResponse
} from '@/api/user/response.ts'
import { jsonRequest } from '@/api/axios/index.ts'

enum API {
  INFO_URL = '/userinfo',
  VERIFY_URL = '/verify',
  SIGNUP_RUL = '/signup',
  SIGNIN_URL = '/signin',
  VISITOR_SIGNIN_URL = '/visitor',
  AUTO_SIGNIN_URL = '/auto-signin',
  VISITOR_UPGRADE_URL = '/visitor/upgrade'
}

export function sendVerifyCode(param: VerifyRequest): Promise<null>{
    return jsonRequest
        .post(API.VERIFY_URL, param)
        
}

export function signUp(param: SignUpRequest): Promise<SignInResponse>{
    return jsonRequest
        .post(API.SIGNUP_RUL, param)
        

}

export function signIn(param: SignInRequest): Promise<SignInResponse>{
    return jsonRequest
        .post(API.SIGNIN_URL, param)
        
}

export function autoSignIn(param: AutoSignInRequest): Promise<CodeResponse>{
  return jsonRequest
      .post(API.AUTO_SIGNIN_URL, param)
}

export function getUserInfo(param: QueryByUserRequest): Promise<UserInfoResponse>{
  return jsonRequest
      .get(API.INFO_URL, {
          params: param
      })

}

export function visitorSignIn(name: String):
    Promise<SignInResponse>{
  return jsonRequest
      .post(API.VISITOR_SIGNIN_URL, {
          name: name
      })
}

export function visitorUpgrade(param: UpgradeRequest, header: verifyHeader):
    Promise<CodeResponse>{
  return jsonRequest.post(API.VISITOR_UPGRADE_URL, param, {
    headers: {
      "X-User-Id": header.xUserId,
      "X-User-Code": header.xUserCode
    }
  })
}