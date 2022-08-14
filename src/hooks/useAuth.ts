import { useContext, useDebugValue } from 'react'

import { AuthContext } from '../context/AuthProvider'

const useAuth = () => {
  const context = useContext(AuthContext)
  useDebugValue(context?.auth, (auth) =>
    auth?.token ? 'Logged In' : 'Logged Out'
  )
  return useContext(AuthContext)
}

export default useAuth
