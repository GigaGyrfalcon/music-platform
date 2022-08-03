import './App.scss'

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Activate from './components/pages/Activate/Activate'
import Home from './components/pages/Home/Home'
import Login from './components/pages/Login/Login'
import Register from './components/pages/Register/Register'

function App() {
  return (
    <div className="App">
      <h1>Music Platform</h1>
      <BrowserRouter>
        <div className="flex justify-content-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/activate" element={<Activate />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
