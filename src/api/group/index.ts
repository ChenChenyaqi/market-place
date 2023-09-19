import {MessageQueryArgument} from "request.ts";
import {QueryByGoodsRequest} from "@/api/goods/request.ts";
import {GroupResponse} from "./response.ts";
import {SellerResponse} from "@/api/goods/response.ts";
import {QueryByGroupRequest} from "@/api/group/request.ts";
import {jsonRequest} from "@/api/axios";

enum API{
    GROUP_URL = "/group",
    GROUP_QUERY = "/group/redirect",
    GROUP_SELLER = "/group/seller"
}

export class ConnectionBuilder{
    readonly init: MessageQueryArgument
    private messageHandler: (MessageChunk) => void = () => {}
    private errorHandler: (Event) => void = () => {}
    private closeHandler: (Event) => void = () => {}

    constructor(init: MessageQueryArgument) {
        this.init = init
        if (init.fromTime === undefined)
            init.fromTime = 0
        return this;
    }

    setMessageHandler(handler: (MessageChunk) => void): this {
        this.messageHandler = handler
        return this;
    }

    setErrorHandler(handler: (Event) => void): this {
        this.errorHandler = handler
        return this;
    }

    setCloseHandler(handler: (Event) => void): this {
        this.closeHandler = handler
        return this;
    }

    build(): WebSocket {
        const ws = new WebSocket("ws://" + API.GROUP_URL)
        ws.onopen = () => {
            ws.send(JSON.stringify(this.init))
        }
        ws.onmessage = e =>
            this.messageHandler(JSON.parse(e.data))
        ws.onerror = this.errorHandler
        ws.onclose = this.closeHandler
        return ws
    }
}

export function getGroupId(param: QueryByGoodsRequest): Promise<GroupResponse> {
    return jsonRequest
        .get(API.GROUP_QUERY, {
            params: param
        })

}

export function getSellerId(param: QueryByGroupRequest): Promise<SellerResponse> {
    return jsonRequest
        .get(API.GROUP_SELLER, {
            params: param
        })

}