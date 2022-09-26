import {
  ConfirmDialog,
  confirmDialog,
  ConfirmDialogProps,
} from 'primereact/confirmdialog'
import React, { createContext, useRef } from 'react'

interface ConfirmDialogProviderProps {
  children?: React.ReactNode
}

export const ConfirmDialogContext = createContext<{
  setConfirmDialog: ({
    message,
    header,
    icon,
    accept,
    reject,
  }: ConfirmDialogProps) => void
}>({
  setConfirmDialog: () => {
    return
  },
})

export const ConfirmDialogProvider: React.FC<ConfirmDialogProviderProps> = ({
  children,
}) => {
  const confirmDialogRef = useRef<ConfirmDialog>(null)

  const setConfirmDialog = ({
    message,
    header,
    icon,
    accept,
    reject,
  }: ConfirmDialogProps) =>
    confirmDialog({
      message,
      header,
      icon,
      accept,
      reject,
    })

  return (
    <ConfirmDialogContext.Provider value={{ setConfirmDialog }}>
      <ConfirmDialog ref={confirmDialogRef} />
      {children}
    </ConfirmDialogContext.Provider>
  )
}
