import {
  GoodsDetail,
  GoodsInfoResponse,
  GoodsResponse,
  QueryResponse
} from '@/api/goods/response.ts'
import { jsonRequest, rawRequest } from '@/api/axios/index.ts'
import { UserVerifyArgument } from '@/api/user/request.ts'
import {
  PublishRequest,
  QueryByGoodsRequest,
  QueryGoodsInfoRequest,
  QueryRequest,
  RemoveGoodsRequest
} from '@/api/goods/request.ts'

enum API {
  PUBLISH = '/goods/publish',
  ICON = '/goods/icon',
  REMOVE = '/goods/remove',
  DETAIL = '/query/info',
  QUERY = '/query'
}

export function publish(param: PublishRequest): Promise<GoodsResponse>{
    param.keywords = param.keywords?.join(',')
    param.tags = param.tags?.join(',')
    return jsonRequest
        .post(API.PUBLISH, param)

}

export function uploadIcon(param: File, goodsId: number, userVerify: UserVerifyArgument): Promise<Any>{
    return jsonRequest
        .put(API.ICON, param, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "X-User-Id": userVerify.userId,
                "X-User-Code" : userVerify.code,
                "X-Goods-Id": goodsId
            }
        })
}

export function getIcon(param: QueryByGoodsRequest): Promise<File>{
    return rawRequest
        .get(API.ICON, {
            params: param
        })
}

export function checkIconsExist(param: QueryGoodsInfoRequest): Promise<bigint[]>{
    return jsonRequest
        .get(API.ICON, {
            params: {"goodsIds": param.goodsIds.join(',')}
        }).then(e => {
          return e.map(i => parseInt(i))
      })
}


export function iconUrl(param: QueryByGoodsRequest): string {
    return import.meta.env.VITE_APP_BASE_API + "goodsId=" + param.goodsId
}

export function removeGoods(param: RemoveGoodsRequest, userVerify: UserVerifyArgument): Promise<Any>{
    return jsonRequest
        .delete(API.REMOVE, {
            headers: {
                "X-User-Id": userVerify.userId,
                "X-User-Code" : userVerify.code,
            },
            data: param
        })
}

export function completeDeal(){
    // todo completeDeal logic
}

export function queryGoodsInfo(param: QueryGoodsInfoRequest): Promise<GoodsInfoResponse> {
  return jsonRequest
      .get(API.DETAIL, {
        params: {"goodsIds": param.goodsIds.join(',')}
      })
      .then((raw: QueryResponse) => {
          const body: Record<number, GoodsDetail> = {}
          for (const k in raw)
              body[parseInt(k)] = raw[k]
          return body
      })
}

export function queryGoods(param: QueryRequest): Promise<QueryResponse>{
    param.keywords = param.keywords?.join(',')
    param.tags = param.tags?.join(',')
    return jsonRequest
        .get(API.QUERY, {
            params: param
        })

}