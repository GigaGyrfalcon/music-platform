import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import './services/i18n'

import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { AuthProvider } from './context/AuthProvider'
import { ToastProvider } from './context/ToastProvider'
import reportWebVitals from './reportWebVitals'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <Suspense fallback="Loading...">
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </Suspense>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
