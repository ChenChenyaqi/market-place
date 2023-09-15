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

enum API {
  INFO_URL = '/userinfo',
  VERIFY_URL = '/verify',
  SIGNUP_RUL = '/signup',
  SIGNIN_URL = '/signin',
  AUTO_SIGNIN_URL = '/auto-signin'
}

export function sendVerifyCode(param: VerifyRequest){
    return request
        .post(API.VERIFY_URL, param)
        .then(null, err => console.log(err.data))
}

export function signUp(param: SignUpRequest): Promise<SignInResponse>{
    return request
        .post(API.SIGNUP_RUL, param)
                .then(JSON.stringify)
}

export function signIn(param: SignInRequest): Promise<SignInResponse>{
    return request
        .post(API.SIGNIN_URL, param)
                .then(JSON.stringify)
}

export function autoSignIn(param: AutoSignInRequest): Promise<CodeResponse>{
  return request
      .post(API.AUTO_SIGNIN_URL, param)
            .then(JSON.stringify)
}

export function getUserInfo(param: QueryByUserRequest): Promise<UserInfoResponse>{
  return request
      .get(API.INFO_URL, param)
            .then(JSON.stringify)
}

