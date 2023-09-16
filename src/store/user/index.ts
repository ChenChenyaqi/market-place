import {autoSignIn, signIn, signUp} from '@/api/user'
import {AutoSignInRequest, SignInRequest, SignUpRequest} from '@/api/user/request.ts'
import {saveUser, getUser, updateCode} from '@/utils/userStorage.ts'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

type UserState = AutoSignInRequest

const useUserStore = defineStore('user', () => {
  const useInfo = reactive<UserState>({
    userId: 0,
    code: ''
  })

  const userSignin = async (form: SignInRequest) => {
    const result = await signIn({
      identifier: form.identifier,
      password: form.password
    }).then(e => {
      console.log(e.code)
      if (e.code != 200)
        return e.reason!
      return e.body!
    })
    console.log(result)

    if (typeof result === "string")
        return result

    const { code, userId } = result
    useInfo.userId = userId
    useInfo.code = code
    saveUser(useInfo)
    return null
  }

  const autoSignin = async () => {
    const record = getUser()
    useInfo.userId = record.userId
    useInfo.code = record.code
    const code = await autoSignIn(useInfo).then(e => {
      if (e.code != 200)
        return e.reason!
      return e.body!
    })
    if (typeof code === "string")
        return code

    useInfo.code = code.code
    updateCode(code)
    return null
  }

  const userSignup = async (param: SignUpRequest) => {
    const result = await signUp(param)
        .then(e => {
          if (e.code != 200)
            return e.reason!
          return e.body!
        })

    if (typeof result === "string")
        return result

    const { code, userId } = result
    useInfo.userId = userId
    useInfo.code = code
    saveUser(useInfo)
    return null
  }

  return {
    userSignin,
    autoSignin,
    userSignup
  }
})

export default useUserStore