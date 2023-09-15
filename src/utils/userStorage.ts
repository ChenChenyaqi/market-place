import {AutoSignInRequest} from "@/api/user/request.ts";

export function saveUser(info: AutoSignInRequest) {
  localStorage.setItem('userId', info.userId)
  localStorage.setItem('code', info.code)
}

export function getUser(): AutoSignInRequest {
  return {
    userId: localStorage.getItem('userId') || 0,
    code: localStorage.getItem('code') || ''
  }
}

export function updateCode(code: string) {
  localStorage.setItem('code', code)
}
