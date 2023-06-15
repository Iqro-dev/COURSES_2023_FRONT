import { useState, useEffect } from 'react'
import { useApi } from '../use-api'
import { Methods } from '../../types/fetch-methods'
import { User } from '../../types/user'

export function useInstructors() {
  const { getApiResponse } = useApi()

  const [instructors, setInstructors] = useState<User[]>([])
  const [loaded, setLoaded] = useState(false)

  const load = () => {
    getApiResponse<User[]>('/users/list?role=instructor', Methods.GET).then((res) => {
      if (!res.isSuccess) return console.error(res)

      const instructors = res.data

      console.log(instructors)

      if (!instructors) return

      setInstructors(instructors)
      setLoaded(true)
    })
  }

  const reload = async () => {
    setLoaded(false)
    await load()
  }

  useEffect(load, [])

  return { instructors, reload, loaded }
}
