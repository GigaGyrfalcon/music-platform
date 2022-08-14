import React from 'react'
import { useTranslation } from 'react-i18next'

function Header() {
  const { t } = useTranslation()

  return (
    <header>
      <h1>{t('app_name')}</h1>
    </header>
  )
}

export default Header
