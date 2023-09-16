
import {GoodsInfoResponse, GoodsResponse} from "@/api/goods/response.ts";
import request from "../axios";
import {UserVerifyArgument} from "@/api/user/request.ts";
import {
    QueryByGoodsRequest,
    RemoveGoodsRequest,
    PublishRequest,
    QueryGoodsInfoRequest,
    QueryRequest
} from "@/api/goods/request.ts";
import {ResponsePromise} from "@/api/global/response.ts";

enum API{
    PUBLISH = '/goods/publish',
    ICON = '/goods/icon',
    REMOVE = '/goods/remove',
    DETAIL = '/query/info',
    QUERY = '/query',
}

export function publish(param: PublishRequest): ResponsePromise<GoodsResponse>{
    param.keywords = param.keywords?.join(';')
    param.tags = param.tags?.join(';')
    return request
        .post(API.PUBLISH, param)

}

export function uploadIcon(param: File, goodsId: number, userVerify: UserVerifyArgument): ResponsePromise<Any>{
    return request
        .put(API.ICON, param, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "X-User-Id": userVerify.userId,
                "X-User-Code" : userVerify.code,
                "X-Goods-Id": goodsId
            }
        })
}

export function getIcon(param: QueryByGoodsRequest): ResponsePromise<File>{
    return request
        .get(API.ICON, param)
}

export function iconUrl(param: QueryByGoodsRequest): string {
    return import.meta.env.VITE_APP_BASE_API + "/" + param.goodsId
}

export function removeGoods(param: RemoveGoodsRequest, userVerify: UserVerifyArgument): ResponsePromise<Any>{
    return request
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

export function queryGoodsInfo(param: QueryGoodsInfoRequest): ResponsePromise<GoodsInfoResponse> {
  return request
      .get(API.DETAIL, {"goodsIds": param.goodsIds.join(';')})

}

export function queryGoods(param: QueryRequest): ResponsePromise<QueryRequest>{
    param.keywords = param.keywords?.join(';')
    param.tags = param.tags?.join(';')
    return request
        .get(API.QUERY, param)

}