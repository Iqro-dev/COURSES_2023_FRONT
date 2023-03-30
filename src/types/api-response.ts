type Success<T = any> = {
  isSuccess: true
  code: number
  data: T
}

type Error<T = string> = {
  isSuccess: false
  code: number
  data?: T
}

export type ApiResponse<T> = Success<T> | Error
