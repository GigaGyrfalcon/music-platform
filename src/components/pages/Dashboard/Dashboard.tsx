import './dashboard.scss'

import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { axiosPrivate } from '../../../api'
import { MerchantSchema } from '../../../domain/merchant'
import useToast from '../../../hooks/useToast'
import { BranchesTable, UsersTable } from '../../fragments'

function Dashboard() {
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

  return isSuccess ? (
    <div className="dashboard">
      <UsersTable users={data.data.users} />
      <BranchesTable branches={data.data.branches} />
    </div>
  ) : null
}

export default Dashboard
