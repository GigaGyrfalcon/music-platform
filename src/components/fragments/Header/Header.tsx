import { useTranslation } from 'react-i18next'

export function Header() {
  const { t } = useTranslation()

  return (
    <header>
      <h1>{t('app_name')}</h1>
    </header>
  )
}
