type Success<T = any> = {
  isSuccess: true
  code: number
  data: T
  res?: any
}

type Error<T = string> = {
  isSuccess: false
  code: number
  data?: T
  res?: any
}

export type ApiResponse<T> = Success<T> | Error
