import {GoodsType, IOType, UserType} from "@/api/global/enum.ts";

// post arguments

/**
 *  @member goodsIds 商品ID数组, 元素是int64
 */
export interface QueryGoodsInfoRequest {
    goodsIds: number[]
}

/**
 * @member goodsId 商品ID, int64
 */
export interface QueryByGoodsRequest {
    goodsId: number
}

/**
 * @member keywords 关键词数组
 * @member minCost 最小价格
 * @member maxCost 最大价格
 * @member publisher 发布者类型
 * @member ioType 交易类型
 * @member goodsType 商品类型
 * @member tags 标签数组
 * @member perPage 每页数量
 * @member page 页码
 */
export interface QueryRequest {
    keywords?: string[]
    minCost?: number
    maxCost?: number
    publisher?: UserType
    ioType?: IOType
    goodsType?: GoodsType
    tags?: string[]
    perPage?: number
    page?: number
}

// post arguments
/**
 * @member goodsName 用户名
 * @member validDate 失效日期, int64的epoch seconds
 * @member money 价格, int32的分
 * @member keywords 关键词数组
 * @member goodsType 商品类型
 * @member ioType 交易类型
 * @member tags 标签数组
 */
export interface PublishRequest {
    goodsName: string
    validDate: number
    money: number
    keywords: string[]

    goodsType: GoodsType
    ioType: IOType
    tags: string[]
}

// delete arguments

export type RemoveGoodsRequest = QueryByGoodsRequest
