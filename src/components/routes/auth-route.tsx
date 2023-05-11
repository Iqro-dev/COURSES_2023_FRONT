import { PropsWithChildren, ReactElement, useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../providers/auth-provider'

export function AuthRoute({ children }: PropsWithChildren): ReactElement {
  const navigate = useNavigate()

  const {
    auth: { loginStatus },
  } = useContext(AuthContext)

  useEffect(() => {
    console.log('loginStatus', loginStatus)
    if (!loginStatus && typeof loginStatus !== 'undefined') {
      navigate('/')
    }
  }, [location.pathname, loginStatus])

  return <>{children ?? <Outlet />}</>
}

export default AuthRoute
