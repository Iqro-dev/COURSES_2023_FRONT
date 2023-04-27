import { useState, useEffect } from 'react'
import { useApi } from '../use-api'
import { Methods } from '../../types/fetch-methods'
import { SettingsResponse } from '../../types/settings/settings-response'

export function useSettings() {
  const { getApiResponse } = useApi()

  const [settings, setSettings] = useState<SettingsResponse>({
    headerText: localStorage.getItem('headerText') ?? '',
    headerColor: localStorage.getItem('headerColor') ?? '',
  })
  const [loaded, setLoaded] = useState(true)

  const load = () => {
    getApiResponse<SettingsResponse>('/settings', Methods.GET).then((res) => {
      if (!res.isSuccess) return console.error(res)

      const settings = res.data

      if (!settings) return

      localStorage.setItem('headerText', settings.headerText)
      localStorage.setItem('headerColor', settings.headerColor)

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
