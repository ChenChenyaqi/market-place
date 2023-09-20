<template>
  <TopBanner
    :search-value="searchValue"
    @show-action="showActions"
    @show-me="showMe"
  />
  <div class="mt-12">
    <div class="goods-class-wrapper"></div>
    <div class="goods-cards-wrapper p-3 flex justify-center items-center">
      <GoodsList
        ref="goodsList"
        :goods-list="resultList"
        :has-more="hasMore"
        @clicked="clickItem"
        @refresh="refresh"
        @load="load"
      />
    </div>
  </div>
  <single-input
    ref="visitorInput"
    title="怎么称呼？"
    :allow-submit="(s) => s.toString().length > 2"
    @submit="visitorSignInProc"
  />
  <nut-action-sheet
    v-model:visible="showAction"
    :menu-items="choices"
    @choose="choose"
  />
</template>

<script setup lang="ts">
import TopBanner from './top-banner/top-banner.vue'
import GoodsList from '@/components/goods-list/goodsList.vue'
import { onBeforeMount, reactive, ref } from 'vue'
import { QueryResponse } from '@/api/goods/response.ts'
import { queryGoods } from '@/api/goods'
import useUserStore from '@/store/user'
import { showToast } from '@nutui/nutui'
import { menuItems } from '@/views/home/top-banner/type.ts'
import { UserType } from '@/api/global/enum.ts'
import SingleInput from '@/components/single-input/singleInput.vue'
import router from '@/router'
import { switchType } from '@/views/home/util.ts'

let currentPage = 0

const user = useUserStore()

const meLink = ref('/sign')
const hasMore = ref(true)
const showAction = ref(false)
const searchValue = ref('')
const goodsList = ref<GoodsList>(null)
const visitorInput = ref<SingleInput>(null)

const resultList = reactive<QueryResponse>([])
const choices = reactive<menuItems[]>([
  {
    name: '加载中……',
    subname: '请稍后',
    loading: true
  }
])

function showMe() {
  router.push(meLink.value)
}

function visitorSignInProc() {
  const name = visitorInput.value.input
  user
    .visitorSignup(name)
    .then(() => {
      showToast.success('欢迎您，' + name)
      visitorInput.value.visible = false
      switchType(UserType.VISITOR, choices)
      return
    })
    .catch((err) => {
      showToast.error('登录失败，请查看网络或者联系管理员：' + err)
      visitorInput.value.visible = false
    })
}

function clickItem(goodsId: bigint): void {
  // todo
}

function choose(item) {
  if (typeof item.action == 'string') router.push(item.action)
  else item.action()
}

function load() {
  queryGoods({ page: currentPage++ }).then((e) => {
    goodsList.value.loading = false
    resultList.push(...e)
    if (e.length < 10) hasMore.value = false
  })
}

function refresh() {
  currentPage = 0
  resultList.length = 0
  queryGoods({ page: currentPage++ }).then((e) => {
    goodsList.value.refreshing = false
    resultList.push(...e.sort((i1, i2) => i2.goodsId - i1.goodsId))
    if (e.length < 10) hasMore.value = false
  })
}

function showActions() {
  showAction.value = true
}

onBeforeMount(() => {
  user.autoSignin().then((e) => {
    choices.splice(0, 1)
    if (e == null) {
      showToast.success('欢迎来到云集!')
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
            visitorInput.value.visible = true
          }
        }
      )
      return
    }

    console.log(e)
    meLink.value = '/me'
    showToast.success('欢迎回来，' + e.name)

    switchType(e.type, choices)
  })
  load()
})
</script>

<style scoped></style>