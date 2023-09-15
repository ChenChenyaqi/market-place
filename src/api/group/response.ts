import {QueryByGroupRequest} from "@/api/group/request.ts";

/**
 * @member senderId 发送者ID, int64
 * @member content 消息内容
 * @member time 消息时间, int64的epoch seconds
 */
export interface MessageChunk {
  senderId: number
  content: string
  time: number
}

export type GroupResponse = QueryByGroupRequest