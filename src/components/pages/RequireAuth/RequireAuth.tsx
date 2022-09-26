import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '../../../hooks'

function RequiredAuth() {
  const { getToken } = useAuth()
  const location = useLocation()

  return getToken() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequiredAuth
