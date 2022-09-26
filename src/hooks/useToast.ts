import { useContext } from 'react'

import { ToastContext } from '../Providers'

export const useToast = () => useContext(ToastContext)
