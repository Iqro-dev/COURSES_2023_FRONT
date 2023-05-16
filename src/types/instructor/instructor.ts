import { Parish } from '../parish/parish'

type Instructor = {
  id?: number
  firstName: string
  lastName: string
  description: string
  qualifications: string
  parishesIds?: (number | undefined)[]
  parishes?: Parish[]
}

export type { Instructor }
