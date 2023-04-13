import { useState, useEffect } from 'react'
import { useApi } from '../use-api'
import { Methods } from '../../types/fetch-methods'
import { Diocese } from '../../types/diocese/diocese'

export function useDioceses() {
  const { getApiResponse } = useApi()

  const [dioceses, setDioceses] = useState<Diocese[]>()
  const [loaded, setLoaded] = useState(false)

  const load = () => {
    getApiResponse<Diocese[]>('/dioceses/list', Methods.GET).then((res) => {
      if (!res.isSuccess) return console.error(res)

      const dioceses = res.data

      console.log(dioceses)

      if (!dioceses) return

      setDioceses(dioceses)
      setLoaded(true)
    })
  }

  const reload = async () => {
    setLoaded(false)
    await load()
  }

  useEffect(load, [])

  return { dioceses, reload, loaded }
}
