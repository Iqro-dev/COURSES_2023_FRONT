import Roles from '../roles'

type AdminPost = {
  email: string
  passwordHash: string
  role: Roles
  status: boolean
  admin: {
    firstName: string
    lastName: string
  }
}

export type { AdminPost }
