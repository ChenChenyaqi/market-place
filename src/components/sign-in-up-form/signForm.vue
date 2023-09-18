<template>
  <nut-cell center>
    <nut-form :model-value="state" ref="form" class="w-full">
      <nut-form-item prop="signSwitch" :label="signSwitch ? '注册会员' : '会员登录'">
        <nut-switch
          v-model="signSwitch"
          class="ml-[45%] mr-45% w-[10%]"></nut-switch>
      </nut-form-item>
      <nut-form-item
        :label="signSwitch ? '用户名' : '身份'"
        prop="identifier"
        required
        show-error-line
        :rules="[
          {
            required: true,
            message: '长度不得小于2',
            regex: /^\S\S+$/
          }
        ]"
      >
        <nut-input
          class="nut-input-text"
          v-model="state.identifier"
          :placeholder="signSwitch ? '用户名' : '用户名/联系方式/用户ID'"
          type="text"
          confirm-type="next"
        />
      </nut-form-item>
      <nut-form-item
        label="密码"
        prop="password"
        required
        show-error-line
        :rules="[
          {
            message: '长度不得小于6',
            regex: /^\S{6}\S*$/
          }
        ]"
      >
        <nut-input
          class="nut-input-text"
          v-model="state.password"
          placeholder="请填写密码"
          type="password"
          :confirm-type="signSwitch ? 'next' : 'send'"
        />
      </nut-form-item>
      <nut-form-item
        label="联系渠道"
        prop="type"
        v-if="signSwitch"
        :required="signSwitch ? 'required' : null"
      >
        <nut-radio-group direction="horizontal" v-model="state.type">
          <nut-radio label="PHONE">电话号码</nut-radio>
          <nut-radio label="EMAIL">电子邮箱</nut-radio>
          <nut-radio label="QQ">QQ号</nut-radio>
          <nut-radio label="WECHAT">微信号</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item
        v-if="signSwitch && (state.type !== '')"
        label="联系方式"
        prop="contact"
        required
        show-error-line
        :rules="[
          {
            message: '格式不正确',
            validator: validator
          }
        ]"
      >
        <nut-input
          class="nut-input-text"
          v-model="state.contact"
          :placeholder="state.type"
          type="text"
          confirm-type="send"
        >
          <template #right>
            <nut-button
              size="small"
              :disabled="
                coolDown > 0 || !validator(state.contact) ? 'disabled' : null
              "
              @click="requestVerify"
            >
              发送验证码 {{ coolDown > 0 ? '(' + coolDown + ')' : '' }}
            </nut-button>
          </template>
        </nut-input>
      </nut-form-item>
      <nut-form-item
        v-if="send"
        label="验证码"
        prop="code"
        :required="signSwitch ? 'required' : null"
        show-error-line
      >
        <nut-input
          max-length="6"
          class="nut-input-text"
          v-model="state.code"
          placeholder="请填写验证码"
          type="text"
          confirm-type="done"
        />
      </nut-form-item>
      <nut-button
        @click="submit"
        type="primary"
        style="margin-top: 10%; margin-bottom: 5%"
        :disabled="waiting ? 'disabled' : null"
        size="large"
        >提交</nut-button
      >
    </nut-form>
  </nut-cell>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { sendVerifyCode } from '@/api/user'
import { state } from 'vue-tsc/out/shared'
import { typeToTemplate } from '@/components/sign-in-up-form/type.ts'
import useUserStore from '@/store/user'
import { showToast } from '@nutui/nutui'
import router from "@/router";

const user = useUserStore()
const signSwitch = ref(false)
const state = reactive({
  signSwitch: signSwitch,
  identifier: '',
  password: '',
  contact: '',
  type: '',
  code: ''
})

const form = ref(null)
const send = ref(false)
const coolDown = ref(-1)
const waiting = ref(false)

function validator(s: string): boolean {
  const template = typeToTemplate(state.type)
  if (template == null) return false

  return s.match(template)
}

function countCoolDown() {
  coolDown.value = 60
  const task = setInterval(() => {
    if (coolDown.value === 0) {
      clearInterval(task)
      return
    }
    coolDown.value--
  }, 1000)
}

function requestVerify() {
  send.value = true
  countCoolDown()
  if (state.identifier.length < 2) {
    showToast.warn('用户名长度不得少于2')
    send.value = false
    return
  }
  sendVerifyCode({
    username: state.identifier,
    contact: state.contact,
    type: state.type
  }).then((e) => {
    if (e.code != 200) {
      send.value = false
      showToast.warn(e.reason)
      return
    }
    showToast.success("验证码已发送")
  })
}

function submit() {
  form.value.validate().then(({ valid }: any) => {
    if (!valid) {
      return
    }
    waiting.value = true

    if (!signSwitch.value)
      user
        .userSignin({
          identifier: state.identifier,
          password: state.password
        })
        .then((e) => {
          waiting.value = false
          if (e != null) return showToast.warn(e)
          showToast.success('登录成功')
          router.replace('/home')
        })
    else
      user
        .userSignup({
          username: state.identifier,
          password: state.password,
          contact: state.contact,
          code: state.code
        })
        .then((e) => {
          waiting.value = false
          if (e != null) return showToast.warn(e)
          showToast.success('注册成功')
          router.replace('/home')
        })
  })
}
</script>

<style scoped></style>