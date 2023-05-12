import { useState, useEffect } from 'react'
import { useApi } from '../use-api'
import { Methods } from '../../types/fetch-methods'
import { ImageObject } from '../../types/settings/image-object'

export interface InstructorFiles {
  profile_image: any[]
  qualification_image: any[]
  other_image: any[]
}

export function useInstructorsFiles(id: number) {
  const { getApiResponse } = useApi()

  const [avatar, setAvatar] = useState<ImageObject>({})
  const [qualificationsImages, setQualificationsImages] = useState<ImageObject[]>([])
  const [otherImages, setOtherImages] = useState<ImageObject[]>([])

  const [loaded, setLoaded] = useState(false)

  const load = () => {
    getApiResponse<InstructorFiles>(
      `/images/instructors?${new URLSearchParams({
        id: String(id),
      })}`,
      Methods.GET,
    ).then((res) => {
      if (res.isSuccess) {
        const { profile_image, qualification_image, other_image } = res.data

        if (profile_image.length !== 0) {
          profile_image.forEach((image) => {
            getApiResponse<any>(`/${image}`, Methods.GET).then((res) =>
              setAvatar({ objectUrl: URL.createObjectURL(res.data), file: res.data }),
            )
          })
        }

        if (qualification_image.length !== 0)
          [
            qualification_image.forEach((image) => {
              getApiResponse<any>(`/${image}`, Methods.GET).then((res) =>
                setQualificationsImages((prev) => [
                  ...prev,
                  { objectUrl: URL.createObjectURL(res.data), file: res.data },
                ]),
              )
            }),
          ]

        if (other_image.length !== 0)
          [
            other_image.forEach((image) => {
              getApiResponse<any>(`/${image}`, Methods.GET).then((res) =>
                setOtherImages((prev) => [
                  ...prev,
                  { objectUrl: URL.createObjectURL(res.data), file: res.data },
                ]),
              )
            }),
          ]

        setLoaded(true)
      }
    })
  }

  const reload = async () => {
    setLoaded(false)
    await load()
  }

  useEffect(load, [])

  return { otherImages, qualificationsImages, avatar, reload, loaded }
}
