import {
  autoSignIn,
  getUserInfo,
  signIn,
  signUp,
  visitorSignIn,
  visitorUpgrade
} from '@/api/user'
import {
  SignInRequest,
  SignUpRequest,
  UpgradeRequest
} from '@/api/user/request.ts'
import {
  getLastCheck,
  getUser,
  resetUser,
  saveUserInfo
} from '@/utils/userStorage.ts'
import { defineStore } from 'pinia'
import { UserType } from '@/api/global/enum.ts'

export const useUserStore = defineStore('user', {
  state: () =>
    getUser() || {
      userId: 0,
      name: '',
      type: '',
      code: ''
    },
  actions: {
    async userSignin(form: SignInRequest) {
      const result = await signIn({
        identifier: form.identifier,
        password: form.password
      })

      const { code, userId } = result
      this.userId = userId
      this.code = code
      return await this.updateUserInfo()
    },
    async autoSignin() {
      const record = getUser()
      if (record == null) return null
      this.$patch(record)

      if ((Date.now() - getLastCheck()) / 1000 / 60 <= 15) {
        if (this.name != '') return this
        return this.updateUserInfo()
      }

      return await autoSignIn({
        userId: this.userId,
        code: this.code
      })
        .then((e) => {
          this.code = e.code
          return this.updateUserInfo()
        })
        .catch(() => {
          this.code = ''
          return null
        })
    },
    async userSignup(param: SignUpRequest) {
      const result = await signUp(param)

      const { code, userId } = result
      this.userId = userId
      this.code = code
      saveUserInfo(userInfo)
      return await this.updateUserInfo()
    },
    async visitorSignup(name: string) {
      const result = await visitorSignIn(name)
      this.$patch({
        userId: result.userId,
        name: name,
        type: UserType.VISITOR,
        code: result.code
      })
      saveUserInfo(result)
    },
    async visitorUpgrade(param: UpgradeRequest) {
      const result = await visitorUpgrade(param, {
        xUserId: this.userId,
        xUserCode: this.code
      })
      this.name = param.username
      this.code = result.code
      this.type = UserType.UNKNOWN

      saveUserInfo(this.$state)
    },
    async updateUserInfo() {
      const record = await getUserInfo({
        userId: this.userId
      })
      this.$patch(record)
      saveUserInfo(this)
      return this
    },
    signOut() {
      resetUser()
      this.$reset()
    }
  }
})