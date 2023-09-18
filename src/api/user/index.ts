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
  VISITOR_SIGNIN_URL = '/visitor',
  AUTO_SIGNIN_URL = '/auto-signin'
}

export function sendVerifyCode(param: VerifyRequest): ResponsePromise<null>{
    return request
        .post(API.VERIFY_URL, param)
        .then(e => {
          if (e.code != 200)
            return e.reason!
          return e.body!
        })
}

export function signUp(param: SignUpRequest): ResponsePromise<SignInResponse>{
    return request
        .post(API.SIGNUP_RUL, param)
        .then(e => {
          if (e.code != 200)
            return e.reason!
          return e.body!
        })

}

export function signIn(param: SignInRequest): ResponsePromise<SignInResponse>{
    return request
        .post(API.SIGNIN_URL, param)
        .then(e => {
          if (e.code != 200)
            return e.reason!
          return e.body!
        })
}

export function autoSignIn(param: AutoSignInRequest): ResponsePromise<CodeResponse>{
  return request
      .post(API.AUTO_SIGNIN_URL, param)
      .then(e => {
        if (e.code != 200)
          return e.reason!
        return e.body!
      })

}

export function getUserInfo(param: QueryByUserRequest): ResponsePromise<UserInfoResponse>{
  return request
      .get(API.INFO_URL, {
          params: param
      })
      .then(e => {
        if (e.code != 200)
          return e.reason!
        return e.body!
      })

}

export function visitorSignIn(name: String):
    ResponsePromise<SignInResponse>{

  return request
      .post(API.VISITOR_SIGNIN_URL, {
          name: name
      }).then(e => {
          if (e.code != 200)
              return e.reason!
          return e.body!
      })
}

