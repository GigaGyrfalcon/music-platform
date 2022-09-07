import './users.scss'

import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { axiosPrivate } from '../../../api'
import { MerchantSchema } from '../../../domain/merchant'
import useToast from '../../../hooks/useToast'
import { UsersTable } from '../../fragments'

function Users() {
  const toast = useToast()

  const getMerchant = async () => {
    return await axiosPrivate(`${localStorage.getItem('token')}`).get(
      '/merchant'
    )
  }
  const { data, isSuccess } = useQuery(['merchant'], getMerchant)

  if (isSuccess) {
    const parsed = MerchantSchema.safeParse(data.data)
    if (!parsed.success) {
      toast.setToast('warn', 'warning', `${parsed.error.message}`, true)
    }
  }

  return isSuccess ? <UsersTable users={data.data.users} /> : null
}

export default Users
