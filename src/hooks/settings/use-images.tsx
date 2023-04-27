import { useState, useEffect } from 'react'
import { useApi } from '../use-api'
import { Methods } from '../../types/fetch-methods'
import { ImageObject } from '../../types/settings/image-object'

export function useImages() {
  const { getApiResponse } = useApi()

  const [logo, setLogo] = useState<ImageObject>()
  const [header, setHeader] = useState<ImageObject>()

  const [loaded, setLoaded] = useState(false)

  const load = () => {
    const headerPromise = getApiResponse<any>('/settings/images?type=header_image', Methods.GET)
    const logoPromise = getApiResponse<any>('/settings/images?type=logo_image', Methods.GET)

    Promise.all([headerPromise, logoPromise]).then(([header, logo]) => {
      if (!header.isSuccess) return console.error('Błąd przy pobieraniu headera', header)
      if (!logo.isSuccess) return console.error('Błąd przy pobieraniu logo', logo)

      const headerFile = new File(
        [header.data],
        header.res.headers.get('content-disposition') ?? 'header.png',
      )
      const logoFile = new File(
        [logo.data],
        logo.res.headers.get('content-disposition') ?? 'logo.png',
      )

      const headerUrl = URL.createObjectURL(header.data)
      const logoUrl = URL.createObjectURL(logo.data)

      const _logo = { objectUrl: logoUrl, file: logoFile }
      const _header = { objectUrl: headerUrl, file: headerFile }
      setLogo(_logo)
      setHeader(_header)
      setLoaded(true)
    })
  }

  const reload = async () => {
    setLoaded(false)
    await load()
  }

  useEffect(load, [])

  return { header, logo, reload, loaded }
}
