import { useState, useEffect } from 'react'
import { useApi } from '../use-api'
import { Methods } from '../../types/fetch-methods'
import { Parish } from '../../types/parish/parish'

export function useParish(id: number) {
  const { getApiResponse } = useApi()

  const [parish, setParish] = useState<Parish>()
  const [loaded, setLoaded] = useState(false)

  const load = () => {
    getApiResponse<Parish>(`/parishes?id=${id}`, Methods.GET).then((res) => {
      if (!res.isSuccess) return console.error(res)

      const parish = res.data

      console.log(parish)

      if (!parish) return

      setParish(parish)
      setLoaded(true)
    })
  }

  const reload = async () => {
    setLoaded(false)
    await load()
  }

  useEffect(load, [])

  return { parish, reload, loaded }
}
