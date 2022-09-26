import { useContext } from 'react'

import { ConfirmDialogContext } from '../Providers'

export const useConfirmDialog = () => useContext(ConfirmDialogContext)
