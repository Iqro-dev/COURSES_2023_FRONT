import Roles from '../roles'
import { Admin } from './admin'

type AdminPost = {
  email: string
  passwordHash: string
  role: Roles
  status: boolean
  admin: Admin
}

export type { AdminPost }
