import './home.scss'

import { Button } from 'primereact/button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function Home() {
  const { t } = useTranslation()

  return (
    <div className="home">
      <Link className="no-underline" to="/login">
        <Button
          className="p-button-raised p-button-text p-button-large"
          icon="pi pi-sign-in"
          label={t('login')}
        />
      </Link>
      <Link className="no-underline" to="/register">
        <Button
          className="p-button-large"
          icon="pi pi-plus"
          label={t('register')}
        />
      </Link>
    </div>
  )
}

export default Home
