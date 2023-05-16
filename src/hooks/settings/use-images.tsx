import { useState, useEffect } from 'react'
import { useApi } from '../use-api'
import { Methods } from '../../types/fetch-methods'
import { ImageObject } from '../../types/settings/image-object'

export function useImages() {
  const { getApiResponse } = useApi()

  const [logo, setLogo] = useState<ImageObject>({})
  const [header, setHeader] = useState<ImageObject>({})

  const [loaded, setLoaded] = useState(false)

  const load = () => {
    const headerPromise = getApiResponse<any>('/settings/images?type=header_image', Methods.GET)
    const logoPromise = getApiResponse<any>('/settings/images?type=logo_image', Methods.GET)

    Promise.allSettled([headerPromise, logoPromise]).then(([header, logo]) => {
      if (header.status === 'rejected') return console.error('Błąd przy pobieraniu headera', header)
      if (logo.status === 'rejected') return console.error('Błąd przy pobieraniu logo', logo)

      if (header.value.isSuccess) {
        const headerFile = new File(
          [header.value.data],
          'header',
        )

        const headerUrl = URL.createObjectURL(headerFile)

        const _header = { objectUrl: headerUrl, file: headerFile }

        setHeader(_header)
      }

      if (logo.value.isSuccess) {
        const logoFile = new File(
          [logo.value.data],
          'logo',
        )
        const logoUrl = URL.createObjectURL(logoFile)

        const _logo = { objectUrl: logoUrl, file: logoFile }
        setLogo(_logo)
      }

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
