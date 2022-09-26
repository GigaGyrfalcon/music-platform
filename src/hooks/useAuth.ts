import { useContext } from 'react'

import { AuthContext } from '../Providers'

export const useAuth = () => useContext(AuthContext)
