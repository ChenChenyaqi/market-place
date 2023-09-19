import {autoSignIn, getUserInfo, signIn, signUp} from '@/api/user'
import {SignInRequest, SignUpRequest} from '@/api/user/request.ts'
import {saveUser, getUser, updateCode, getLastCheck} from '@/utils/userStorage.ts'
import {defineStore, storeToRefs} from 'pinia'
import {reactive} from 'vue'
import {UserType} from "@/api/global/enum.ts";


const useUserStore = defineStore('user', () => {
  const userInfo = reactive<{
    userId: number,
    name: string,
    type: UserType | "UNKNOWN",
    code: string
  }>({
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
    saveUser(result)
    return await updateUserInfo()
  }

  const autoSignin = async () => {

    if ( (Date.now() - getLastCheck()) / 1000 / 60 <= 15 )
      return null

    const record = getUser()
    if (record.code == '')
      return "欢迎来到云集!"
    userInfo.userId = record.userId
    userInfo.code = record.code
    const code = await autoSignIn(record)
        .then(e=>e, ()=>{
          userInfo.code = ''
        })

    userInfo.code = code.code
    updateCode(code.code)

    return await updateUserInfo()
  }

  const userSignup = async (param: SignUpRequest) => {
    const result = await signUp(param)


    const { code, userId } = result
    userInfo.userId = userId
    userInfo.code = code
    saveUser(userInfo)
    return await updateUserInfo()
  }

  const updateUserInfo = async () => {
    const record = await getUserInfo({
        userId: userInfo.userId,
    })
    userInfo.name = record.name
    userInfo.type = record.type
  }


  return {
    userSignin,
    autoSignin,
    userSignup,
    ...storeToRefs(userInfo)
  }
})

export default useUserStore