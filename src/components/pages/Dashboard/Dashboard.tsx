import './dashboard.scss'

import React, { useEffect, useState } from 'react'

// import { useTranslation } from 'react-i18next'
import { axiosPrivate } from '../../../api'
import useToast from '../../../hooks/useToast'
import Branches from '../../Branches'
import Users from '../../Users'

function Dashboard() {
  // const { t } = useTranslation()
  const toast = useToast()

  const [merchant, setMerchant] = useState({ users: [], branches: [] })
  // const [users, setUsers] = useState([])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const getMerchant = async () => {
      try {
        const token = localStorage.getItem('token') || ''
        const response = await axiosPrivate(token).get(`/merchant`, {
          signal: controller.signal,
        })
        if (isMounted && response.status === 200) {
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
          <Users users={merchant.users} />
          <Branches branches={merchant.branches} />
        </>
      )}

      {/* {merchant && <pre>{JSON.stringify(merchant, undefined, 2)}</pre>} */}
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export default Dashboard
