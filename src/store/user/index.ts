import { reqLogin } from '@/api/user'
import { LoginForm } from '@/api/user/type'
import { getToken, setToken } from '@/utils/token'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface UserState {
  userId: string
  username: string
  token: string
}

const useUserStore = defineStore('user', () => {
  const useInfo = reactive<UserState>({
    userId: '',
    username: '',
    token: getToken()
  })

  const userLogin = async (formData: LoginForm) => {
    const result = await reqLogin(formData)
    const { code, data } = result
    if (code === 200) {
      useInfo.token = data.token as string
      setToken(useInfo.token)
      return '登录成功！'
    } else {
      return Promise.reject(new Error(data.message))
    }
  }
  return {
    useInfo,
    userLogin
  }
})

export default useUserStore
