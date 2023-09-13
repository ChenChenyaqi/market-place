<template>
  <div class="flex gap-2">
    <div class="left flex flex-col gap-2 w-phone-w">
      <GoodsCard
        v-for="goodItem in leftGoodsList"
        :key="goodItem.goodsId"
        :goods="goodItem"
      />
    </div>
    <div class="right flex flex-col gap-2 w-phone-w">
      <GoodsCard
        v-for="goodItem in rightGoodsList"
        :key="goodItem.goodsId"
        :goods="goodItem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Goods } from './goods-card/types'
import GoodsCard from './goods-card/goods-card.vue'
const leftGoodsList: Goods[] = [
  {
    goodsId: '1',
    goodsDescription:
      '【活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水',
    goodsPictureUrl:
      'https://th.bing.com/th/id/OIP.1LWP5wjc5XR8BNRcmSFtOAHaQC?w=161&h=350&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    goodsPrice: '388'
  },
  {
    goodsId: '2',
    goodsDescription:
      '【活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水',
    goodsPictureUrl:
      'https://th.bing.com/th/id/R.c4a2322bc9416b32a64f0aa7bd367ca9?rik=svyVl6sE11qODA&riu=http%3a%2f%2f5.1015600.com%2f2015%2fpic%2f000%2f369%2fc4a2322bc9416b32a64f0aa7bd367ca9.jpg&ehk=0mmuwpIGGir4w9PRn%2fdmeK2TJtE8ImOIRpcFUZXQ658%3d&risl=&pid=ImgRaw&r=0',
    goodsPrice: '388'
  },
  {
    goodsId: '3',
    goodsDescription:
      '【活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水',
    goodsPictureUrl:
      'https://th.bing.com/th/id/R.5a2d5caf5a7d5e107b6e896c4f1ffdc1?rik=%2bqQDPSW3C88qCw&riu=http%3a%2f%2fhimg2.huanqiu.com%2fattachment2010%2f2017%2f1030%2f20171030091428793.jpeg&ehk=wjv8RU7g6gUivvbNFdtO9iurMk5dL%2fBp8pOPtBja5VQ%3d&risl=&pid=ImgRaw&r=0',
    goodsPrice: '388'
  },
  {
    goodsId: '4',
    goodsDescription:
      '【活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水',
    goodsPictureUrl:
      'https://th.bing.com/th/id/OIP.TjebbUwPdSZVCV2sjmoP4AHaLH?w=186&h=279&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    goodsPrice: '388'
  }
]
const rightGoodsList: Goods[] = [
  {
    goodsId: '1',
    goodsDescription:
      '【活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水',
    goodsPictureUrl:
      'https://th.bing.com/th/id/OIP.l66TGRFW0fjgEXT8pS6H3gHaNK?w=186&h=331&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    goodsPrice: '388'
  },
  {
    goodsId: '2',
    goodsDescription:
      '【活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水',
    goodsPictureUrl:
      'https://th.bing.com/th/id/R.c4a2322bc9416b32a64f0aa7bd367ca9?rik=svyVl6sE11qODA&riu=http%3a%2f%2f5.1015600.com%2f2015%2fpic%2f000%2f369%2fc4a2322bc9416b32a64f0aa7bd367ca9.jpg&ehk=0mmuwpIGGir4w9PRn%2fdmeK2TJtE8ImOIRpcFUZXQ658%3d&risl=&pid=ImgRaw&r=0',
    goodsPrice: '388'
  },
  {
    goodsId: '3',
    goodsDescription:
      '【活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水',
    goodsPictureUrl:
      'https://th.bing.com/th/id/R.9406aa76e1ed1ae2ff4d2227f506a56f?rik=2JlKchhcargArg&riu=http%3a%2f%2fimg.mm4000.com%2ffile%2fd%2ffc%2f62506f2088.jpg&ehk=9prTp0pHRyuEl7yBuyF7MODqXlpgpPymspFdorrn67M%3d&risl=&pid=ImgRaw&r=0',
    goodsPrice: '388'
  },
  {
    goodsId: '4',
    goodsDescription:
      '【活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水',
    goodsPictureUrl:
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.lAdebWl7yFsbKWbqKwO90QHaFf?pid=ImgDet&rs=1',
    goodsPrice: '388'
  }
]
</script>

<style scoped></style>
