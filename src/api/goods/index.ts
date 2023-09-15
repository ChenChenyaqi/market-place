
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

enum API{
    PUBLISH = '/goods/publish',
    ICON = '/goods/icon',
    REMOVE = '/goods/remove',
    DETAIL = '/query/info',
    QUERY = '/query',
}

export function publish(param: PublishRequest): Promise<GoodsResponse>{
    param.keywords = param.keywords?.join(';')
    param.tags = param.tags?.join(';')
    return request
        .post(API.PUBLISH, param)
                .then(JSON.stringify)
}

export function uploadIcon(param: File, goodsId: number, userVerify: UserVerifyArgument): Promise<Any>{
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

export function getIcon(param: QueryByGoodsRequest): Promise<File>{
    return request
        .get(API.ICON, param)
}

export function iconUrl(param: QueryByGoodsRequest): string {
    return import.meta.env.VITE_APP_BASE_API + "/" + param.goodsId
}

export function removeGoods(param: RemoveGoodsRequest, userVerify: UserVerifyArgument): Promise<Any>{
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

export function queryGoodsInfo(param: QueryGoodsInfoRequest): Promise<GoodsInfoResponse> {
  return request
      .get(API.DETAIL, {"goodsIds": param.goodsIds.join(';')})
            .then(JSON.stringify)
}

export function queryGoods(param: QueryRequest): Promise<QueryRequest>{
    param.keywords = param.keywords?.join(';')
    param.tags = param.tags?.join(';')
    return request
        .get(API.QUERY, param)
                .then(JSON.stringify)
}