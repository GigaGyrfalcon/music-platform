import './dashboard-header.scss'

import { Button } from 'primereact/button'
import { Menu } from 'primereact/menu'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { axiosPrivate } from '../../../api'
import useToast from '../../../hooks/useToast'

function DashboardHeader({
  openSideBar,
}: {
  openSideBar: (visible: boolean) => void
}) {
  const toast = useToast()
  const navigate = useNavigate()
  const menu = useRef<Menu>(null)
  const items = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        toast.setToast('warn', 'Warning', 'Not implemented yet')
      },
    },
    {
      label: 'Sign Out',
      icon: 'pi pi-sign-out',
      command: async () => {
        try {
          await axiosPrivate(`${localStorage.getItem('token')}`).post(
            '/sign_out'
          )
          localStorage.removeItem('token')
          navigate('/', { replace: true })
        } catch (error) {
          toast.setToast('error', 'Error', error.response.data.message)
        }
      },
    },
  ]
  return (
    <header className="dashboard-header">
      <Button
        className="p-button-raised p-button-rounded p-button-plain p-button-text text-white"
        icon="pi pi-bars"
        onClick={() => openSideBar(true)}
      />
      <img src="/images/placeholder-logo.png" />
      <Button
        className="p-button-raised p-button-rounded p-button-plain p-button-text text-white"
        icon="pi pi-ellipsis-v"
        onClick={(event) => menu?.current?.toggle(event)}
      />

      <Menu model={items} popup ref={menu} />
    </header>
  )
}

export default DashboardHeader
