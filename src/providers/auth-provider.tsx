import { createContext, PropsWithChildren, useState } from 'react'
import { useApi } from '../hooks/use-api'
import { Methods } from '../types/fetch-methods'
import Roles from '../types/roles'

interface AuthUser {
  id: number
  email: string
  role: string
  lastLoginDate: string
  admin: {
    id: number
    firstName: string
    lastName: string
    phoneNumber: string
  }
}

interface DefaultContext {
  user: AuthUser
  auth: { token: string; time: number }
  login: (email: string, password: string) => Promise<{ isSuccess: boolean; code: number }>
  logout: () => void
}

const defaultContext: DefaultContext = {
  user: {} as AuthUser,
  auth: { token: '', time: 0 },
  login: async () => ({ isSuccess: false, code: 0 }),
  logout: () => '',
}

export const AuthContext = createContext(defaultContext)

export function AuthProvider({ children }: PropsWithChildren) {
  const { getApiResponse } = useApi()

  const [context, setContext] = useState<DefaultContext>(defaultContext)

  const login = async (email: string, password: string) => {
    email = email.trim()
    if (!email && !password) return { ...(await loginFromStorage()), code: 0 }

    const res = await getApiResponse<{ token: string; time: number; user: AuthUser }>(
      '/login',
      Methods.POST,
      {
        Email: email,
        Password: password,
      },
    )

    if (res.isSuccess && typeof res.data !== 'string') {
      const { token, user } = res.data

      const time = Date.now()

      localStorage.setItem('auth.role', user.role as Roles)
      localStorage.setItem('auth.id', user.id.toString())

      const { isSuccess } = await loadAuth(user.id, time)

      if (isSuccess) updateLocalStorage(token, time, email, user.id, user.role as Roles)

      setContext({
        ...context,
        user: { ...context.user, email },
        auth: { token, time },
      })

      return { isSuccess: true, code: res.code }
    }

    return { isSuccess: false, code: res.code }
  }

  const loadAuth = async (id: number, time: number) => {
    const res = await getUserData(id)

    if (!res.isSuccess) {
      return { isSuccess: false }
    }

    const auth = { ...context.auth, time }
    const user = { ...res.data, loading: false }
    setContext({ ...context, user, auth })

    return { isSuccess: true }
  }

  const getUserData = async (
    id: number,
  ): Promise<
    { isSuccess: false; code: number } | { isSuccess: true; code: number; data: AuthUser }
  > => {
    const res = await getApiResponse<AuthUser>(`/users?id=${id}`, Methods.GET)

    console.log(res)

    if (!res.isSuccess) return { isSuccess: false, code: res.code }

    return { ...res }
  }

  const loginFromStorage = async () => {
    const token = localStorage.getItem('auth.token')
    const email = localStorage.getItem('auth.email')
    const id = +(localStorage.getItem('auth.id') ?? '0')
    const time = +(localStorage.getItem('auth.time') ?? '0')
    const role = localStorage.getItem('auth.role') as Roles

    if (token && email && Date.now() < time) {
      const { isSuccess } = await loadAuth(id, time)

      if (isSuccess) {
        updateLocalStorage(token, time, email, id, role)
        return { isSuccess }
      }
    }

    return { isSuccess: false }
  }

  const updateLocalStorage = (
    token: string,
    time: number,
    email: string,
    id: number,
    role: Roles,
  ) => {
    localStorage.setItem('auth.token', token)
    localStorage.setItem('auth.time', time.toString())
    localStorage.setItem('auth.role', role)
    localStorage.setItem('auth.email', email)
    localStorage.setItem('auth.id', id.toString())
  }

  const logout = () => {
    localStorage.removeItem('auth.token')
    localStorage.removeItem('auth.time')
    localStorage.removeItem('auth.role')
    localStorage.removeItem('auth.email')
    localStorage.removeItem('auth.id')

    setContext({ ...defaultContext })
  }

  return (
    <AuthContext.Provider value={{ ...context, login, logout }}>{children}</AuthContext.Provider>
  )
}
