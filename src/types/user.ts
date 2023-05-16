import { Admin } from './admin/admin'
import { Instructor } from './instructor/instructor'
import Roles from './roles'

type User = {
  id: number
  email: string
  role?: Roles
  status?: boolean
  lastLoginDate?: Date
  admin?: Admin
  instructor?: Instructor
}

export type { User }
