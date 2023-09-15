
// get argument

/**
 * @member groupId 组ID, int64
 */
export interface QueryByGroupRequest {
    groupId: number
}

// websocket arguments
/**
 * @member userId 用户ID, int64
 * @member code 服务器分发的口令
 * @member groupId 组ID, int64
 * @member fromTime 从该时间开始的历史消息, int64时间戳的epoch seconds
 */
export interface MessageQueryArgument {
    userId: number,
    code: string,
    groupId: number,
    fromTime?: number
}

/**
 * @member content 消息内容
 * @member time 消息时间, int64的epoch seconds
 */
export interface MessageArgument {
    content: string
    time: number
}

