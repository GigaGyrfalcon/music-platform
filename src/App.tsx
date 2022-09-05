import './App.scss'

import React from 'react'
import { Route, Routes } from 'react-router-dom'

import DashboardLayout from './components/layouts/DashboardLayout'
import PublicLayout from './components/layouts/PublicLayout'
import Activate from './components/pages/Activate'
import Branches from './components/pages/Branches'
import Dashboard from './components/pages/Dashboard'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import PageNotFound from './components/pages/PageNotFound'
import Register from './components/pages/Register'
import RequiredAuth from './components/pages/RequireAuth'
import Users from './components/pages/Users'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:token" element={<Activate />} />
      </Route>
      {/* Protected routes */}
      <Route element={<RequiredAuth />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
