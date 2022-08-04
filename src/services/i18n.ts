import * as i18next from 'i18next'
import HttpApi from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    lng: 'en',
    supportedLngs: ['en', 'ge'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    // debug: process.env.NODE_ENV !== 'production',
    debug: false,
  })

export default i18next
