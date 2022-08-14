import React, { createContext, useState } from 'react'

interface AuthProviderProps {
  children?: React.ReactNode
}

type Auth = { token: string }

export const AuthContext = createContext<{
  auth: Auth
  setAuth: (auth: Auth) => void
}>({
  auth: { token: '' },
  setAuth: () => {
    return
  },
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState({ token: '' })

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
