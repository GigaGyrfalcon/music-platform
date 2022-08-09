import './App.scss'

import { Button } from 'primereact/button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Activate from './components/pages/Activate'
import Dashboard from './components/pages/Dashboard'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'

function App() {
  const { t, i18n } = useTranslation()

  return (
    <div className="App">
      <h1>{t('app_name')}</h1>
      <BrowserRouter>
        <div className="flex justify-content-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/activate/:token" element={<Activate />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Button
        className="p-button-sm p-button-text mt-6 float-right"
        label={i18n.language === 'en' ? 'ქართული' : 'English'}
        icon="pi pi-book"
        onClick={() =>
          i18n.changeLanguage(i18n.language === 'en' ? 'ge' : 'en')
        }
      />
    </div>
  )
}

export default App
