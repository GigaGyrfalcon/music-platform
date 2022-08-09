import './dashboard.scss'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import axios from '../../../api'

function Dashboard() {
  const { t } = useTranslation()
  const [merchant, setMerchant] = useState({})

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const getMerchant = async () => {
      try {
        const response = await axios.get(`/merchant`, {
          signal: controller.signal,
        })
        isMounted && response.status === 200 && setMerchant(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMerchant()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <div className="dashboard">
      <h2 className="heading-2">{t('dashboard')}</h2>
      <p>This is secure page, only authorized user can have access!</p>
      {merchant && <pre>{JSON.stringify(merchant, undefined, 2)}</pre>}
    </div>
  )
}

export default Dashboard
