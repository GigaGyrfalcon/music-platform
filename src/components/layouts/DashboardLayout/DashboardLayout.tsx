import './dashboard-layout.scss'

import { Sidebar } from 'primereact/sidebar'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { BreadCrumb, DashboardFooter, DashboardHeader } from '../../fragments'

function DashboardLayout() {
  const [visible, setVisible] = useState(false)
  return (
    <div className="dashboard-layout">
      <DashboardHeader openSideBar={setVisible} />
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <h1>Settings</h1>
        <ul>
          <li>Company Details</li>
          <li>Branches</li>
          <li>Users</li>
        </ul>
      </Sidebar>
      <BreadCrumb />
      <main>
        <Outlet />
      </main>
      <DashboardFooter />
    </div>
  )
}

export default DashboardLayout
