import { useState, useEffect } from 'react'
import { useApi } from '../use-api'
import { Methods } from '../../types/fetch-methods'
import { User } from '../../types/user'

export function useAdmins() {
  const { getApiResponse } = useApi()

  const [admins, setAdmins] = useState<User[]>()
  const [loaded, setLoaded] = useState(false)

  const load = () => {
    getApiResponse<User[]>('/users/list?role=admin', Methods.GET).then((res) => {
      if (!res.isSuccess) return console.error(res)

      const admins = res.data

      console.log(admins)

      if (!admins) return

      setAdmins(admins)
      setLoaded(true)
    })
  }

  const reload = async () => {
    setLoaded(false)
    await load()
  }

  useEffect(load, [])

  return { admins, reload, loaded }
}
