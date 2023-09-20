import {
  autoSignIn,
  getUserInfo,
  signIn,
  signUp,
  visitorSignIn
} from '@/api/user'
import { SignInRequest, SignUpRequest } from '@/api/user/request.ts'
import {
  getLastCheck,
  getUser,
  saveUserInfo,
  UserInfo
} from '@/utils/userStorage.ts'
import { defineStore, storeToRefs } from 'pinia'
import { reactive } from 'vue'
import { UserType } from '@/api/global/enum.ts'

const useUserStore = defineStore('user', () => {
  const userInfo = reactive<UserInfo>({
    userId: 0,
    name: '',
    type: '',
    code: ''
  })

  const userSignin = async (form: SignInRequest) => {
    const result = await signIn({
      identifier: form.identifier,
      password: form.password
    })

    const { code, userId } = result
    userInfo.userId = userId
    userInfo.code = code
    return await updateUserInfo()
  }

  const autoSignin = async () => {
    if ((Date.now() - getLastCheck()) / 1000 / 60 <= 15) return userInfo

    const record = getUser()
    if (record == null) return null
    userInfo.userId = record.userId
    userInfo.code = record.code

    return await autoSignIn({
      userId: userInfo.userId,
      code: userInfo.code
    })
      .then((e) => {
        userInfo.code = e.code
        return updateUserInfo()
      })
      .catch(() => {
        userInfo.code = ''
        return null
      })
  }

  const userSignup = async (param: SignUpRequest) => {
    const result = await signUp(param)

    const { code, userId } = result
    userInfo.userId = userId
    userInfo.code = code
    saveUserInfo(userInfo)
    return await updateUserInfo()
  }

  const visitorSignup = async (name: string) => {
    const result = await visitorSignIn(name)
    userInfo.name = name
    userInfo.userId = result.userId
    userInfo.type = UserType.VISITOR
    userInfo.code = result.code
    saveUserInfo(result)
  }

  const updateUserInfo = async () => {
    const record = await getUserInfo({
      userId: userInfo.userId
    })
    userInfo.name = record.name
    userInfo.type = record.type
    saveUserInfo(userInfo)
    return userInfo
  }

  return {
    userSignin,
    autoSignin,
    userSignup,
    visitorSignup,
    ...storeToRefs(userInfo)
  }
})

export default useUserStore