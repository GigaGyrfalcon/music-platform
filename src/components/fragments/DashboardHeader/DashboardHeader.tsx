import './dashboard-header.scss'

import { Button } from 'primereact/button'
import React from 'react'

function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <Button
        className="p-button-raised p-button-rounded p-button-plain p-button-text text-white"
        icon="pi pi-bars"
      />
      <img src="/images/placeholder-logo.png" />
      <Button
        className="p-button-raised p-button-rounded p-button-plain p-button-text text-white"
        icon="pi pi-ellipsis-v"
      />
    </header>
  )
}

export default DashboardHeader
