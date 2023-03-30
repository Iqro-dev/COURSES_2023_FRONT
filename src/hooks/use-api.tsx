<<<<<<< HEAD
=======

>>>>>>> 33031ba7be4116a18a5bcf485091d535ef035431
import { Methods } from '../types/fetch-methods'
import { ApiResponse } from '../types/api-response'

export function useApi() {
<<<<<<< HEAD
  const getApiResponse = async <T,>(url: string, method: Methods, data?: any) => {
    const res = await fetchApi<T>(url, method, data)
=======
  const getApiResponse = async (url: string, method: Methods, data?: any) => {
    const res = await fetchApi(url, method, data)
>>>>>>> 33031ba7be4116a18a5bcf485091d535ef035431

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
<<<<<<< HEAD
  const token = localStorage.getItem('auth.token')

  console.log(token)
  let res
=======
  const token = localStorage.getItem('token')

  let res, body
>>>>>>> 33031ba7be4116a18a5bcf485091d535ef035431

  try {
    res = await fetch(import.meta.env.VITE_API_URL + url, {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
<<<<<<< HEAD
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    })
=======
        Authentication: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    });
>>>>>>> 33031ba7be4116a18a5bcf485091d535ef035431
  } catch (error: Error | any) {
    const { status, data } = error.response ?? { status: 0 }

    const code = status

    return { code, isSuccess: false, data }
  }

<<<<<<< HEAD
  let body
  try {
    body = await res.json()
  } catch (error: Error | any) {
    body = {}
  }
=======
  try {
    body = JSON.parse(await res.text())
  } catch { }
>>>>>>> 33031ba7be4116a18a5bcf485091d535ef035431

  const apiRes: ApiResponse<T> = {
    code: res.status,
    isSuccess: res.ok,
    data: body,
  }

  return apiRes
}
