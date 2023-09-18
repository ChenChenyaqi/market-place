export interface Response<T> {
  code: number,
  reason: string | null,
  body: T | null
}

export type ResponsePromise<T> = Promise<T | string>

