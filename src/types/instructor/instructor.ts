import { Parish } from '../parish/parish'

type Instructor = {
  id?: number
  firstName: string
  lastName: string
  description: string
  profilePicturePath?: string
  qualifications: string
  qualificationsAttachPaths?: string
  otherAttachPaths?: string
  parishesIds?: (number | undefined)[]
  parishes?: Parish[]
}

export type { Instructor }
