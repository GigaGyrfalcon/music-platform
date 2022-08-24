import React, { createContext } from 'react'

interface AuthProviderProps {
  children?: React.ReactNode
}

export const AuthContext = createContext<{
  setToken: (token: string) => void
  getToken: () => string
}>({
  setToken: () => {
    return
  },
  getToken: () => {
    return ''
  },
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const setToken = (token: string) => localStorage.setItem('token', token)
  const getToken = (): string => localStorage.getItem('token') || ''

  return (
    <AuthContext.Provider value={{ setToken, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}
