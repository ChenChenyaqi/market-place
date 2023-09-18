import {AutoSignInRequest} from "@/api/user/request.ts";

export function saveUser(info: AutoSignInRequest) {
  localStorage.setItem('userId', info.userId)
  localStorage.setItem('code', info.code)
  localStorage.setItem('last_check', Date.now())
}

export function getUser(): AutoSignInRequest {
  return {
    userId: localStorage.getItem('userId') || 0,
    code: localStorage.getItem('code') || ''
  }
}

export function resetUser() {
  localStorage.setItem('userId', 0)
  localStorage.setItem('code', '')
  localStorage.setItem('last_check', 0)
}

export function getLastCheck(): bigint {
  return localStorage.getItem('last_check') || 0
}

export function updateCode(code: string) {
  localStorage.setItem('code', code)
}
