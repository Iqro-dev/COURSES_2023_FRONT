import { Methods } from '../types/fetch-methods'
import { ApiResponse } from '../types/api-response'

export function useApi() {
  const getApiResponse = async <T,>(url: string, method: Methods, data?: any, omitParse = false) => {
    const res = await fetchApi<T>(url, method, data, omitParse)

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
  omitParse = false
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('auth.token')

  let res

  try {
    res = await fetch(import.meta.env.VITE_API_URL + url, {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
      body: omitParse ? data : JSON.stringify(data),
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
