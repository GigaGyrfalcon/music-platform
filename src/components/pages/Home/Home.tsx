import './home.scss'

import { Button } from 'primereact/button'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home">
      <Link className="no-underline" to="/login">
        <Button
          className="p-button-raised p-button-text p-button-large"
          icon="pi pi-sign-in"
          label="Sign In"
        />
      </Link>
      <Link className="no-underline" to="/register">
        <Button
          className="p-button-large"
          icon="pi pi-user-plus"
          label="Sign Up"
        />
      </Link>
    </div>
  )
}

export default Home
