import { autoSignIn, signIn } from '@/api/user'
import {AutoSignInRequest, SignInRequest} from '@/api/user/request.ts'
import {saveUser, getUser, updateCode} from '@/utils/userStorage.ts'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

type UserState = AutoSignInRequest

export default useUserStore = defineStore('user', () => {
  const useInfo = reactive<UserState>({
    userId: 0,
    code: ''
  })

  const userSignin = async (form: FormData| SignInRequest) => {
    const result = await signIn({
      identifier: form.identifier,
      password: form.password
    })

    const { code, userId } = result
    useInfo.userId = userId
    useInfo.code = code
    saveUser(useInfo)
    return '登录成功！'
  }

  const autoSignin = async () => {
    const record = getUser()
    useInfo.userId = record.userId
    useInfo.code = record.code
    const code = await autoSignIn(useInfo)
        .then(e=> e.code)
    useInfo.code = code
    updateCode(code)
    return "自动登录成功!"
  }

  return {
    userSignin,
    autoSignin
  }
})
