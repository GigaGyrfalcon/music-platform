import { Button } from 'primereact/button'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { i18n } = useTranslation()

  return (
    <footer>
      <p>Footer</p>

      <Button
        className="p-button-sm p-button-text mt-6 float-right"
        label={i18n.language === 'en' ? 'ქართული' : 'English'}
        icon="pi pi-book"
        onClick={() =>
          i18n.changeLanguage(i18n.language === 'en' ? 'ge' : 'en')
        }
      />
    </footer>
  )
}

export default Footer
