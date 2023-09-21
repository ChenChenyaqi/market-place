<template>
  <nut-popup
    position="left"
    v-model:visible="visible"
    style="width: 80%; height: 100%; background: mintcream"
  >
    <nut-cell>
      <template #title>
        <p class="text-center text-3xl text-grey-700">{{ title }}</p>
      </template>
      <template #link>
        <nut-button type="danger" class="w-full" @click="trySignOut">
          <IconFont name="del2" class="center mt-0.5" />
        </nut-button>
      </template>
    </nut-cell>

    <nut-cell
      class="mt-3"
      @click="upgrade"
      :is-link="userType == UserType.UNKNOWN || userType == UserType.VISITOR"
    >
      <template #icon>用户类型</template>
      <template #title>&emsp;&emsp;{{ typeLocalise }}</template>
      <template #link>
        <label
          :class="[
            userType == UserType.UNKNOWN || userType == UserType.VISITOR
              ? 'animate-pulse'
              : '',
            'text-red'
          ]"
          >{{ userTypeHint }}</label
        >
      </template>
    </nut-cell>
    <nut-cell v-if="userType == UserType.STUDENT">
      <template #icon>验证学号（非公开）</template>
      <!--todo finish student id function-->
      <template #title>00000000</template>
    </nut-cell>
    <nut-cell v-if="userType == UserType.COMPANY">
      <template #icon>验证营业执照编号</template>
      <!--todo finish company id function-->
      <template #title>00000000</template>
    </nut-cell>
    <!--todo more information-->
    <nut-cell title="网站管理员联系方式" desc="155xxxx7055" />
  </nut-popup>
  <nut-dialog
    v-model:visible="confirmDialog"
    title="确定要退出登录吗？"
    :show-cancel="true"
    :onOk="() => $emit('signOut')"
  >
    <tips class="mr-2" />
    <span>{{
      userType == UserType.VISITOR
        ? '为隐私考虑，访客退出登录后，只能申请新的访客账号，原账号信息将被废弃'
        : '您随时可以通过用户名（或者您留下的联系方式）以及密码重新登录'
    }}</span>
  </nut-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { IconFont, Tips } from '@nutui/icons-vue'
import { enumLocalize, UserType } from '@/api/global/enum.ts'
import router from '@/router'

const props = defineProps<{
  title: string
  userType: UserType
}>()

defineEmits<{
  signOut: () => void
}>()

const visible = ref(false)
const confirmDialog = ref(false)
const typeLocalise = computed(() => enumLocalize(props.userType))
const userTypeHint = computed(() => {
  if (props.userType == UserType.UNKNOWN) return '点击验证'
  else if (props.userType == UserType.VISITOR) return '点击升级'
  else return ''
})

function trySignOut() {
  confirmDialog.value = true
}

function upgrade() {
  if (props.userType == UserType.UNKNOWN) router.push('/verify')
  else if (props.userType == UserType.VISITOR) router.push('/upgrade')
  else return
}

defineExpose({
  show() {
    visible.value = true
  }
})
</script>