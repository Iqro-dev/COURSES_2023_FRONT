import { useState, useEffect } from 'react'
import { useApi } from '../use-api'
import { Methods } from '../../types/fetch-methods'
import { ImageObject } from '../../types/settings/image-object'

export function useInstructorsFiles(id: number) {
  const { getApiResponse } = useApi()

  const [avatar, setAvatar] = useState<ImageObject>({})
  // const [qualificationsImages, setQualificationsImages] = useState<ImageObject[]>([])
  // const [otherImages, setOtherImages] = useState<ImageObject[]>([])

  const [loaded, setLoaded] = useState(false)

  const load = () => {
    const avatarPromise = getApiResponse<any>(`/images/instructors?id=${id}`, Methods.GET)
    // const qualificationsImagesPromise = getApiResponse<any>(`/images/instructors?id=${id}`, Methods.GET)
    // const otherImagesPromise = getApiResponse<any>(`/images/instructors?id=${id}`, Methods.GET)

    Promise.allSettled([avatarPromise]).then(([avatar]) => {
      if (avatar.status === 'rejected') return console.error('Błąd przy pobieraniu headera', avatar)
      // if (qualifications.status === 'rejected') return console.error('Błąd przy pobieraniu logo', qualifications)
      // if (other.status === 'rejected') return console.error('Błąd przy pobieraniu logo', other)

      if (avatar.value.isSuccess) {
        const avatarFile = new File(
          [avatar.value.data],
          avatar.value.res.headers.get('content-disposition') ?? 'avatar.png',
        )

        const avatarUrl = URL.createObjectURL(avatarFile)

        const _avatar = { objectUrl: avatarUrl, file: avatarFile }

        setAvatar(_avatar)
      }

      setLoaded(true)
    })
  }

  const reload = async () => {
    setLoaded(false)
    await load()
  }

  useEffect(load, [])

  return { avatar, reload, loaded }
}
