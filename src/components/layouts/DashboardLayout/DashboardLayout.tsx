import './dashboard-layout.scss'

import React from 'react'
import { Outlet } from 'react-router-dom'

import { BreadCrumb, DashboardFooter, DashboardHeader } from '../../fragments'

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <DashboardHeader />
      <BreadCrumb />
      <main>
        <Outlet />
      </main>
      <DashboardFooter />
    </div>
  )
}

export default DashboardLayout
