import { useState, useEffect } from 'react'
import { useApi } from './use-api'
import { Methods } from '../types/fetch-methods'

interface SettingsResponse {
  headerText: string
  headerColor: string
}

export function useSettings() {
  const { getApiResponse } = useApi()

  const [settings, setSettings] = useState<SettingsResponse>({ headerText: '', headerColor: '' })
  const [loaded, setLoaded] = useState(false)

  const load = () => {
    getApiResponse<SettingsResponse>('/settings', Methods.GET).then((res) => {
      if (!res.isSuccess) return console.error(res)

      const settings = res.data

      if (!settings) return

      setSettings(settings)
      setLoaded(true)
    })
  }

  const reload = async () => {
    setLoaded(false)
    await load()
  }

  useEffect(load, [])

  return { settings, reload, loaded }
}
