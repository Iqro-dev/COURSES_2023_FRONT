import { Methods } from '../types/fetch-methods'
import { ApiResponse } from '../types/api-response'

export function useApi() {
  const getApiResponse = async <T,>(url: string, method: Methods, data?: any) => {
    const res = await fetchApi<T>(url, method, data)

    return res
  }

  return {
    getApiResponse,
  }
}

export async function fetchApi<T>(
  url: string,
  method: Methods,
  data?: any,
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('auth.token')

  console.log(token)
  let res

  try {
    res = await fetch(import.meta.env.VITE_API_URL + url, {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    })
  } catch (error: Error | any) {
    const { status, data } = error.response ?? { status: 0 }

    const code = status

    return { code, isSuccess: false, data }
  }

  let body
  try {
    body = await res.json()
  } catch (error: Error | any) {
    body = {}
  }

  const apiRes: ApiResponse<T> = {
    code: res.status,
    isSuccess: res.ok,
    data: body,
  }

  return apiRes
}
