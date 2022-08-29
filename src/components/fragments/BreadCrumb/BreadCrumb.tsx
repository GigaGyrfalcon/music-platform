import './breadcrumb.scss'

import { BreadCrumb as PrimeBreadCrumb } from 'primereact/breadcrumb'
import React from 'react'

function BreadCrumb() {
  const items = [
    {
      label: 'Dashboard',
      url: '/dashboard',
    },
  ]

  const home = {
    icon: 'pi pi-home',
    url: '/dashboard',
  }
  return <PrimeBreadCrumb model={items} home={home} className="breadcrumb" />
}

export default BreadCrumb
