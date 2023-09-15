<template>
  <nut-cell>
      <nut-form :model-value="state" ref="form">'
        <nut-form-item label="注册">
          <nut-switch v-model="signSwitch"></nut-switch>
        </nut-form-item>
        <nut-form-item
          label="用户名"
          prop="identifier"
          required
          show-error-line
          :rules="[{
            required: true,
             message: '用户名长度不得小于2',
              validator: (s, _) => s.length > 1
          }]">
          <nut-input
            class="nut-input-text"
            v-model="state.name"
            placeholder="请填写用户名" type="text"
          />
        </nut-form-item>
        <nut-form-item
          label="密码"
          prop="password"
          required
          show-error-line
          :rules="[{
             message: '密码长度不得小于6',
              validator: (s, _) => s.length > 6
          }]">
          <nut-input
            class="nut-input-text"
            v-model="state.password"
            placeholder="请填写密码" type="password"
          />
        </nut-form-item>
        <nut-form-item
          label="联系渠道"
          v-if="signSwitch"
          :required="signSwitch? 'required' : null">
          <nut-radio-group direction="horizontal" v-model="state.type">
            <nut-radio label="Phone">电话号码</nut-radio>
            <nut-radio label="Email">电子邮箱</nut-radio>
            <nut-radio label="QQ">QQ号</nut-radio>
            <nut-radio label="WeChat">微信号</nut-radio>
          </nut-radio-group>
        </nut-form-item>
        <nut-form-item
          v-if="signSwitch && state.type !== ''"
          label="联系方式"
          prop="contact"
          required
          show-error-line
          :rules="[{
             message: '格式不正确',
              validator: validator
          }]">
          <nut-input
            class="nut-input-text"
            v-model="state.contact"
            :placeholder="state.type" type="text"
          />
          <nut-button
            size="small"
            style="float:right"
            :disabled="(coolDown > 0 || state.contact == '') ? 'disabled' : null"
            @click="requestVerify">
            发送验证码 {{coolDown > 0 ? "(" + coolDown + ")" : ""}}
          </nut-button>
        </nut-form-item>
        <nut-form-item
          v-if="signSwitch"
          label="验证码"
          prop="code"
          :required="signSwitch? 'required' : null"
          show-error-line>
          <nut-input
            max-length="6"
            class="nut-input-text"
            v-model="state.code"
            placeholder="请填写验证码" type="text"
          />
        </nut-form-item>
        <nut-button
          @click="submit"
          type="primary"
          style="margin-top: 10%;margin-bottom: 5%"
          size="large">提交</nut-button>
      </nut-form>

  </nut-cell>
</template>

<script setup lang="ts">
import {onActivated, reactive, ref} from "vue";
import {sendVerifyCode} from "@/api/user";
const signSwitch = ref(false)
const state = reactive(({
  identifier: "",
  password: "",
  contact: "",
  type: "",
  code: ""
}))

const form = ref(null)
const send = ref(false)
const coolDown = ref(-1)

function validator(s: string): boolean{
  return true
}

onActivated(()=>{
  send.value = false
  state.password = ""
  state.type = ""
  state.contact = ""
  state.code = ""
  coolDown.value = -1
})
function countCoolDown(){
  coolDown.value = 60
  const task = setInterval(()=>{
    if (coolDown.value === 0){
      clearInterval(task)
      return
    }
    coolDown.value --
  }, 1000)
}

function requestVerify(){
  countCoolDown()
  // todo
}

</script>

<style scoped>

</style>