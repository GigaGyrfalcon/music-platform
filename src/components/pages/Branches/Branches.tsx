import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { axiosPrivate } from '../../../api'
import { MerchantSchema } from '../../../domain/merchant'
import useToast from '../../../hooks/useToast'
import { BranchesTable } from '../../fragments'

function Branch() {
  const toast = useToast()

  const getMerchant = async () => {
    return await axiosPrivate(`${localStorage.getItem('token')}`).get(
      '/merchant'
    )
  }

  const { data, isSuccess } = useQuery(['merchant'], getMerchant)

  useEffect(() => {
    if (isSuccess) {
      const parsed = MerchantSchema.safeParse(data.data)
      if (!parsed.success) {
        toast.setToast('warn', 'warning', `${parsed.error.message}`, true)
      }
    }
  }, [isSuccess])

  return isSuccess ? <BranchesTable branches={data.data.branches} /> : null
}

export default Branch
