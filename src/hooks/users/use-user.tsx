import { useState, useEffect } from 'react'
import { useApi } from '../use-api'
import { Methods } from '../../types/fetch-methods'
import { User } from '../../types/user'

export function useUser(id: number) {
  const { getApiResponse } = useApi()

  const [user, setUser] = useState<User>()
  const [loaded, setLoaded] = useState(false)

  const load = () => {
    getApiResponse<User>(`/users?id=${id}`, Methods.GET).then((res) => {
      if (!res.isSuccess) return console.error(res)

      const user = res.data

      if (!user) return

      setUser(user)
      setLoaded(true)
    })
  }

  const reload = async () => {
    setLoaded(false)
    await load()
  }

  useEffect(load, [])

  return { user, reload, loaded }
}
