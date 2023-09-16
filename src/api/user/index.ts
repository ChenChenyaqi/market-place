import request from '../axios'
import {
  AutoSignInRequest,
  QueryByUserRequest,
  SignInRequest,
  SignUpRequest,
  VerifyRequest
} from "@/api/user/request.ts";
import {
  CodeResponse, SignInResponse, UserInfoResponse
} from "@/api/user/response.ts";
import {ResponsePromise} from "@/api/global/response.ts";

enum API {
  INFO_URL = '/userinfo',
  VERIFY_URL = '/verify',
  SIGNUP_RUL = '/signup',
  SIGNIN_URL = '/signin',
  AUTO_SIGNIN_URL = '/auto-signin'
}

export function sendVerifyCode(param: VerifyRequest): ResponsePromise<null>{
    return request
        .post(API.VERIFY_URL, param)
}

export function signUp(param: SignUpRequest): ResponsePromise<SignInResponse>{
    return request
        .post(API.SIGNUP_RUL, param)

}

export function signIn(param: SignInRequest): ResponsePromise<SignInResponse>{
    return request
        .post(API.SIGNIN_URL, param)
}

export function autoSignIn(param: AutoSignInRequest): ResponsePromise<CodeResponse>{
  return request
      .post(API.AUTO_SIGNIN_URL, param)

}

export function getUserInfo(param: QueryByUserRequest): ResponsePromise<UserInfoResponse>{
  return request
      .get(API.INFO_URL, param)

}

