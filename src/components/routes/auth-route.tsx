import { PropsWithChildren, ReactElement, useContext, useEffect } from 'react'
// import AuthService from './Services/AuthService'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../providers/auth-provider'

export function AuthRoute({ children }: PropsWithChildren): ReactElement {
  const navigate = useNavigate()
  const {
    auth: { loginStatus },
  } = useContext(AuthContext)

  const validateAuth = () => {
    if (typeof loginStatus !== 'undefined' && !loginStatus) navigate('/')
  }

  useEffect(validateAuth, [loginStatus])

  return <>{children ?? <Outlet />}</>
}

export default AuthRoute
