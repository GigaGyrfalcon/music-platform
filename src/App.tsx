import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.scss'
import Activate from './components/pages/Activate'
import Login from './components/pages/Login'
import Register from './components/pages/Register'

function App() {
  return (
    <div className="App">
      <h1>Music Platform</h1>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">About</Link>
              </li>
              <li>
                <Link to="/register">Users</Link>
              </li>
            </ul>
          </nav>

          <Routes>
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
