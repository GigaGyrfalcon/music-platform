import { Toast, ToastSeverityType } from 'primereact/toast'
import React, { createContext, useRef } from 'react'

interface ToastProviderProps {
  children?: React.ReactNode
}

export const ToastContext = createContext<{
  setToast: (
    severity: ToastSeverityType,
    summary: string,
    detail: string,
    sticky?: boolean
  ) => void
}>({
  setToast: () => {
    return
  },
})

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const toast = useRef<Toast>(null)

  const setToast = (
    severity: ToastSeverityType,
    summary: string,
    detail: string,
    sticky = false
  ) => toast.current?.show({ severity, summary, detail, sticky })

  return (
    <ToastContext.Provider value={{ setToast }}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  )
}
