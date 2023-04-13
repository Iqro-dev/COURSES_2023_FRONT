import { useState, useEffect } from 'react'
import { useApi } from '../use-api'
import { Methods } from '../../types/fetch-methods'
import { Diocese } from '../../types/diocese/diocese'

export function useDiocese(id: number) {
  const { getApiResponse } = useApi()

  const [diocese, setDiocese] = useState<Diocese>()
  const [loaded, setLoaded] = useState(false)

  const load = () => {
    getApiResponse<Diocese>(`/dioceses?id=${id}`, Methods.GET).then((res) => {
      if (!res.isSuccess) return console.error(res)

      const diocese = res.data

      console.log(diocese)

      if (!diocese) return

      setDiocese(diocese)
      setLoaded(true)
    })
  }

  const reload = async () => {
    setLoaded(false)
    await load()
  }

  useEffect(load, [])

  return { diocese, reload, loaded }
}
