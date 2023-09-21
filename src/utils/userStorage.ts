import { UserType } from '@/api/global/enum.ts'

export interface UserInfo {
  userId: number
  name: string
  type: UserType
  code: string
}

export function saveUserInfo(info: UserInfo) {
  localStorage.setItem('info', JSON.stringify(info))
  localStorage.setItem('last_check', Date.now())

}

export function getUser(): UserInfo | null {
  const s = localStorage.getItem('info')
  return s == '' ? null : JSON.parse(s)
}

export function resetUser() {
  localStorage.setItem('info', '')
  localStorage.setItem('last_check', 0)
}

export function getLastCheck(): bigint {
  return localStorage.getItem('last_check') || 0
}

export function updateInfo(info: UserInfo) {
  localStorage.setItem('info', info)
}
