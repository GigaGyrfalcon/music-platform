import './dashboard.scss'

import React, { useEffect, useState } from 'react'

import { axiosPrivate } from '../../../api'
import { MerchantSchema } from '../../../domain/merchant'
import useToast from '../../../hooks/useToast'
import { BranchesTable, UsersTable } from '../../fragments'

function Dashboard() {
  const toast = useToast()
  const [merchant, setMerchant] = useState({ users: [], branches: [] })

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const getMerchant = async () => {
      try {
        const token = localStorage.getItem('token') || ''
        const response = await axiosPrivate(token).get('/merchant', {
          signal: controller.signal,
        })
        if (isMounted && response.status === 200) {
          const parsed = MerchantSchema.safeParse(response.data)
          if (!parsed.success) {
            toast.setToast('warn', 'warning', `${parsed.error.message}`, true)
          }
          setMerchant(response.data)
        }
      } catch (error) {
        toast.setToast('error', 'Error', error.response.data.message)
      }
    }
    getMerchant()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return merchant ? (
    <div className="dashboard">
      {merchant && (
        <>
          <UsersTable users={merchant.users} />
          <BranchesTable branches={merchant.branches} />
        </>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default Dashboard
