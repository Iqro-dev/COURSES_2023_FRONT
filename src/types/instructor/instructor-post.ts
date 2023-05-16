import Roles from '../roles'

type InstructorPost = {
  email: string
  passwordHash: string
  role: Roles
  status: boolean
  instructor: {
    firstName: string
    lastName: string
    description: string
    qualifications: string
    parishesIds: number[]
  }
}

export type { InstructorPost }
