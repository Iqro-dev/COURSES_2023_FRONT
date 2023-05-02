import { useState, useEffect } from 'react'
import { useApi } from '../use-api'
import { Methods } from '../../types/fetch-methods'
import { Parish } from '../../types/parish/parish'

export function useParishes() {
  const { getApiResponse } = useApi()

  const [parishes, setParishes] = useState<Parish[]>([])
  const [loaded, setLoaded] = useState(false)

  const load = () => {
    getApiResponse<Parish[]>('/parishes/list', Methods.GET).then((res) => {
      if (!res.isSuccess) return console.error(res)

      const parishes = res.data

      console.log(parishes)

      if (!parishes) return

      setParishes(parishes)
      setLoaded(true)
    })
  }

  const reload = async () => {
    setLoaded(false)
    await load()
  }

  useEffect(load, [])

  return { parishes, reload, loaded }
}
