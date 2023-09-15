import {IOType, UserType} from "@/api/global/enum.ts";
import {QueryByGoodsRequest} from "@/api/goods/request.ts";

/**
 * @member name 商品名
 * @member price 商品价格(单位:分)
 * @member publisherType 发布者类型
 * @member ioType 交易类型
 */
export interface GoodsDetail {
  name: string
  price: number
  publisherType: UserType
  ioType: IOType
}

export type GoodsResponse = QueryByGoodsRequest

/**
 * @member sellerId 卖家ID, int64
 */
export interface SellerResponse {
  sellerId: number
}

export type GoodsInfoResponse = Record<number, GoodsDetail>

export type QueryResponse = QueryResult[]

/**
 * @member goodsId 商品ID, int64
 * @member score 商品评分, 是关键词评分的累加
 * @member keywords 关键词映射, key是关键词, value是评分
 */
export interface QueryResult{
    goodsId: number
    score: number
    keywords: Record<string, number>
}