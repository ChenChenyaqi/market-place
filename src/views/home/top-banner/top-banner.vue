<template>
  <div
    class="fixed top-0 left-0 w-full z-50 flex items-center h-12 pt-3 bg-white"
  >
    <div class="pl-3">
      <IconFont name="horizontal" @click="showAction = true"></IconFont>
    </div>
    <div class="px-1 flex-1">
      <nut-searchbar
        class="h-5 -translate-y-1"
        v-model="searchValue"
        placeholder="搜索商品"
        @search="$emit('search')"
      >
        <template v-slot:leftin>
          <IconFont name="search"></IconFont>
        </template>
      </nut-searchbar>
    </div>
    <div class="pr-2">
      <IconFont class="text-main-color" name="my2" @click="showMe"></IconFont>
    </div>
  </div>
  <nut-dialog
    v-model:visible="visitorNameDialog"
    :closeOnPopstate="true"
    no-footer
  >
    <h1>怎么称呼？</h1>
    <nut-input v-model="visitorName" input-align="center">
      <template #right>
        <nut-button
          size="small"
          :disabled="visitorName.length < 2"
          @click="visitorSignInProc">
          确认
        </nut-button>
      </template>
    </nut-input>
  </nut-dialog>

  <nut-action-sheet
    v-model:visible="showAction"
    :menu-items="choices"
    @choose="choose"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconFont } from '@nutui/icons-vue'
import router from '@/router'
import useUserStore from '@/store/user'
import { showToast } from '@nutui/nutui'
import { visitorSignIn } from '@/api/user'
import { saveUser } from '@/utils/userStorage.ts'

const user = useUserStore()
const searchValue = ref('')
const showAction = ref(false)
const visitorName = ref('')
const visitorNameDialog = ref(false)
const choices = [
  {
    name: '加载中……',
    subname: '请稍后',
    loading: true
  }
]
let meIconTarget = '/sign'

user.autoSignin().then((e) => {
  choices.splice(0, 1)
  if (e != null) {
    if (e.includes('欢迎')) {
      showToast.success(e)
      choices.push(
        {
          name: '成为会员！',
          subname: '注册/登录',
          action: showMe
        },
        {
          name: '没空注册？',
          subname: '游客登录',
          action: () => {
            visitorNameDialog.value = true
          }
        }
      )
    } else {
      showToast.fail(e)
      choices.push({
        name: '出错了！',
        subname: '请重新登录',
        disable: true
      })
    }
    return
  }
  meIconTarget = '/me'
  console.log(user.type)

  if (user.type == 'UNKNOWN') {
    choices.push({
      name: '想发布需求/出闲置物品？',
      subname: '成为验证会员'
    })
    return
  }
})

function showMe() {
  router.push(meIconTarget)
}

function choose(item) {
  item.action()
}
function visitorSignInProc() {
  visitorSignIn(visitorName.value).then((result) => {
    if (typeof result == 'string') {
      showToast.fail(result)
      return
    }
    saveUser(result)
    showToast.success('欢迎您，' + visitorName.value)
    visitorNameDialog.value = false
  })
}
</script>

<style scoped lang="less"></style>