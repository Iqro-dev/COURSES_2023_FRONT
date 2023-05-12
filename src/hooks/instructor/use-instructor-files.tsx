import { useState, useEffect } from 'react'
import { useApi } from '../use-api'
import { Methods } from '../../types/fetch-methods'
import { ImageObject } from '../../types/settings/image-object'

export function useInstructorsFiles(id: number) {
  const { getApiResponse } = useApi()

  const [avatar, setAvatar] = useState<ImageObject>({})
  const [qualificationsImages, setQualificationsImages] = useState<ImageObject[]>([])
  // const [otherImages, setOtherImages] = useState<ImageObject[]>([])

  const [loaded, setLoaded] = useState(false)

  const load = () => {
    const avatarPromise = getApiResponse<any>(
      `/images/instructors?${new URLSearchParams({
        id: String(id),
        type: 'profile_image',
      })}`,
      Methods.GET,
    )
    const qualificationsImagesPromise = getApiResponse<any[]>(
      `/images/instructors?${new URLSearchParams({
        id: String(id),
        type: 'qualification_image',
      })}`,
      Methods.GET,
    )
    // const otherImagesPromise = getApiResponse<any>(`/images/instructors?id=${id}`, Methods.GET)

    Promise.allSettled([avatarPromise, qualificationsImagesPromise]).then(
      ([avatar, qualifications]) => {
        if (avatar.status === 'rejected')
          return console.error('Błąd przy pobieraniu headera', avatar)
        if (qualifications.status === 'rejected')
          return console.error('Błąd przy pobieraniu logo', qualifications)
        // if (other.status === 'rejected') return console.error('Błąd przy pobieraniu logo', other)

        if (avatar.value.isSuccess) {
          console.log(avatar.value)
          const avatarFile = new File(
            [avatar.value.data],
            avatar.value.res.headers.get('content-disposition') ?? 'avatar.png',
          )

          const avatarUrl = URL.createObjectURL(avatarFile)

          const _avatar = { objectUrl: avatarUrl, file: avatarFile }

          setAvatar(_avatar)
        }

        if (qualifications.value.isSuccess) {
          console.log(qualifications.value.data)
          const qualificationImages = qualifications.value.data.map((image: any) => {
            const file = new File(
              [image],
              image.res.headers.get('content-disposition') ?? 'qualification.png',
            )

            const imageUrl = URL.createObjectURL(file)

            return { objectUrl: imageUrl, file: file }
          })

          setQualificationsImages(qualificationImages)
        }

        setLoaded(true)
      },
    )
  }

  const reload = async () => {
    setLoaded(false)
    await load()
  }

  useEffect(load, [])

  return { qualificationsImages, avatar, reload, loaded }
}
