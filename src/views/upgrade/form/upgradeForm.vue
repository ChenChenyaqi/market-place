<template>
  <nut-form :model-value="_form" ref="_form_r">
    <nut-form-item label="会员ID" prop="id">
      <nut-input v-model="_form.id" readonly />
    </nut-form-item>
    <nut-form-item label="会员昵称" prop="name">
      <nut-input
        v-model="_form.name"
        class="text-black"
        placeholder="nickname"
      />
    </nut-form-item>
    <nut-form-item
      label="密码"
      prop="password"
      :rules="[
        {
          message: '长度不得小于6',
          regex: /^\S{6}\S*$/
        }
      ]"
      show-error-line
    >
      <nut-input
        v-model="_form.password"
        type="password"
        class="text-black"
        placeholder="password"
      />
    </nut-form-item>
    <nut-form-item label="联系渠道" prop="type" required>
      <nut-radio-group direction="horizontal" v-model="_form.type">
        <nut-radio label="PHONE">电话号码</nut-radio>
        <nut-radio label="EMAIL">电子邮箱</nut-radio>
        <nut-radio label="QQ">QQ号</nut-radio>
        <nut-radio label="WECHAT">微信号</nut-radio>
      </nut-radio-group>
    </nut-form-item>
    <nut-form-item
      v-if="_form.type !== ''"
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
        class="nut-input-text text-black"
        v-model="_form.contact"
        :placeholder="_form.type"
        type="text"
        confirm-type="send"
      >
        <template #right>
          <nut-button
            size="small"
            :disabled="
              coolDown > 0 || !validator(_form.contact) ? 'disabled' : null
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
      required
      show-error-line
    >
      <nut-input
        max-length="6"
        class="nut-input-text text-black font-black"
        v-model="_form.code"
        placeholder="请填写验证码"
        type="text"
        confirm-type="done"
      />
    </nut-form-item>
    <nut-button size="large" type="primary" :disabled="waiting" @click="submit"
      >提交</nut-button
    >
  </nut-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { typeToTemplate } from '@/components/sign-in-up-form/type.ts'
import { sendVerifyCode } from '@/api/user'
import { useUserStore } from '@/store/user'
import { showToast } from '@nutui/nutui'
import router from '@/router'

const user = useUserStore()

const _form = reactive({
  id: user.userId.toString(),
  name: user.name,
  password: '',
  type: '',
  contact: '',
  code: ''
})
const _form_r = ref(null)
const send = ref(false)
const coolDown = ref(-1)
const waiting = ref(false)

function requestVerify() {
  countCoolDown()
  sendVerifyCode({
    username: _form.name,
    contact: _form.contact,
    type: _form.type
  }).then(() => {
    send.value = true
  })
}

function validator(s: string): boolean {
  const template = typeToTemplate(_form.type)
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

function submit() {
  waiting.value = true
  _form_r.value.validate().then((v, e) => {
    if (!v) return

    user
      .visitorUpgrade({
        username: _form.name,
        password: _form.password,
        contact: _form.contact,
        type: _form.type,
        code: _form.code
      })
      .then(() => {
        waiting.value = false
        showToast.success('升级成功')
        router.replace('/verify')
      })
      .catch(showToast.fail)
      .finally(() => {
        waiting.value = false
      })
  })
}
</script>

<style scoped></style>