import './breadcrumb.scss'

import { BreadCrumb as PrimeBreadCrumb } from 'primereact/breadcrumb'

export function BreadCrumb() {
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
